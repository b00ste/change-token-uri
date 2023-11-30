import {
  FormEvent,
  LegacyRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { concat, hexlify, randomBytes, toBeHex, toNumber } from "ethers";
import {
  ERC725YDataKeys,
  INTERFACE_IDS,
  OPERATION_TYPES,
} from "@lukso/lsp-smart-contracts";

// context
import { BrowserExtensionContext } from "../App";

// types
import {
  LSP16UniversalFactory__factory,
  LSP8MintableInit__factory,
  UniversalProfile__factory,
  UniversalProfile,
  LSP16UniversalFactory,
} from "../types";

// constants
import {
  LSP16_ADDRESS,
  LSP8_MINTABLE_INIT_ADDRESS,
} from "../helpers/constants";

interface Props {
  setError: React.Dispatch<React.SetStateAction<JSX.Element | undefined>>;
}

const options = [
  {
    id: 0,
    value: "0 - uint256",
    description:
      "Each NFT is represented with a unique number. This number is an incrementing count, where each minted token is assigned the next number.",
  },
  {
    id: 1,
    value: "1 - string",
    description:
      "Each NFT is represented using a unique name (as a short UTF8 encoded string, no more than 32 characters long)",
  },
  {
    id: 2,
    value: "2 - bytes32",
    description:
      "Each NFT is represented using a 32 bytes long unique identifier.",
  },
  {
    id: 3,
    value: "3 - bytes32",
    description: "Each NFT is represented using a 32 bytes hash digest.",
  },
  {
    id: 4,
    value: "4 - address",
    description:
      "Each NFT is represented as its own smart contract that can hold its own metadata (e.g `ERC725Y` compatible).",
  },
];

const DeployLSP8: React.FC<Props> = ({ setError }) => {
  const { signer } = useContext(BrowserExtensionContext);

  const [tokenName, setTokenName] = useState<string>();
  const [tokenSymbol, setTokenSymbol] = useState<string>();
  const [tokenOwner, setTokenOwner] = useState<string>();

  const tokeIdTypeRef = useRef<HTMLElement>();
  const [tokenIdType, setTokenIdType] = useState(options[0]);

  const onTokenNameInput = (event: React.FormEvent<HTMLInputElement>) => {
    const userInput = event.currentTarget.value;
    setTokenName(userInput);
  };

  const onTokenSymbolInput = (event: React.FormEvent<HTMLInputElement>) => {
    const userInput = event.currentTarget.value;
    setTokenSymbol(userInput);
  };

  const onTokenOwnerInput = (event: React.FormEvent<HTMLInputElement>) => {
    const userInput = event.currentTarget.value;
    setTokenOwner(userInput);
  };

  // `lukso-select` token standard update
  useEffect(() => {
    const meth = ({ detail: { value: _value = options[0] } = {} }) => {
      setTokenIdType(
        options.find(({ value }) => _value.value === value) || options[0]
      );
    };
    const select = tokeIdTypeRef.current as any;
    select?.addEventListener("on-select", meth);
    return () => {
      select?.removeEventListener("on-select", meth);
    };
  }, [tokeIdTypeRef, tokenIdType]);

  // deploy asset
  const deployAsset = async (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (!signer) {
      return;
    }

    const signerAddress = await signer.getAddress();
    const salt = hexlify(randomBytes(32));

    const deploymentCallbackCalldata =
      new LSP8MintableInit__factory().interface.encodeFunctionData(
        "initialize",
        [tokenName, tokenSymbol, tokenOwner, tokenIdType.id]
      );

    const deploymentCalldata =
      new LSP16UniversalFactory__factory().interface.encodeFunctionData(
        "deployERC1167ProxyAndInitialize",
        [LSP8_MINTABLE_INIT_ADDRESS, salt, deploymentCallbackCalldata]
      );

    const universalProfile = new UniversalProfile__factory(signer).attach(
      signerAddress
    ) as UniversalProfile;

    const executeCalldata = universalProfile.interface.encodeFunctionData(
      "execute",
      [OPERATION_TYPES.CALL, LSP16_ADDRESS, 0, deploymentCalldata]
    );

    const lsp4DataKeysCalldata = universalProfile.interface.encodeFunctionData(
      "setDataBatch",
      [
        [
          /// ------ LSP4 ------
          ERC725YDataKeys.LSP4["LSP4Creators[]"].length,
          concat([
            ERC725YDataKeys.LSP4["LSP4Creators[]"].index,
            toBeHex(0, 16),
          ]),
          concat([ERC725YDataKeys.LSP4.LSP4CreatorsMap, signerAddress]),
          /// ------------------
        ],
        [
          /// ------ LSP4 ------
          toBeHex(1, 16),
          signerAddress,
          concat([INTERFACE_IDS.LSP0ERC725Account, toBeHex(0, 16)]),
          /// ------------------
        ],
      ]
    );

    const assetAddress = await (
      new LSP16UniversalFactory__factory(signer).attach(
        LSP16_ADDRESS
      ) as LSP16UniversalFactory
    ).computeERC1167Address(
      LSP8_MINTABLE_INIT_ADDRESS,
      salt,
      true,
      deploymentCallbackCalldata
    );

    const issuedAssetsCountHex = await universalProfile.getData(
      ERC725YDataKeys.LSP12["LSP12IssuedAssets[]"].length
    );
    const issuedAssetsCount =
      issuedAssetsCountHex === "0x" ? 0 : toNumber(issuedAssetsCountHex);

    const lsp12DataKeysCalldata = universalProfile.interface.encodeFunctionData(
      "setDataBatch",
      [
        [
          /// ------ LSP12IssuedAssets ------
          ERC725YDataKeys.LSP12["LSP12IssuedAssets[]"].length,
          concat([
            ERC725YDataKeys.LSP12["LSP12IssuedAssets[]"].index,
            toBeHex(issuedAssetsCount, 16),
          ]),
          concat([ERC725YDataKeys.LSP12.LSP12IssuedAssetsMap, assetAddress]),
          /// -------------------------------
        ],
        [
          /// ------ LSP12IssuedAssets ------
          toBeHex(issuedAssetsCount + 1, 16),
          assetAddress,
          concat([
            INTERFACE_IDS.LSP8IdentifiableDigitalAsset,
            toBeHex(issuedAssetsCount, 16),
          ]),
          /// -------------------------------
        ],
      ]
    );

    await universalProfile.batchCalls([
      executeCalldata,
      lsp4DataKeysCalldata,
      lsp12DataKeysCalldata,
    ]);
  };

  return (
    <>
      {signer ? (
        <lukso-card variant="with-header" size="medium">
          <div slot="header" className="p-6">
            <p className="heading-inter-17-semi-bold">
              Deploy a LSP8 Identifiable Digital Asset
            </p>
          </div>
          <div slot="content" className="p-6 flex flex-col items-center">
            <lukso-input
              placeholder="Token Name"
              custom-class="mb-4"
              onInput={(event) =>
                onTokenNameInput(
                  event as unknown as FormEvent<HTMLInputElement>
                )
              }
              value={tokenName}
            />
            <lukso-input
              placeholder="Token Symbol"
              custom-class="mb-4"
              onInput={(event) =>
                onTokenSymbolInput(
                  event as unknown as FormEvent<HTMLInputElement>
                )
              }
              value={tokenSymbol}
            />
            <lukso-input
              placeholder="Token Owner"
              custom-class="mb-4"
              onInput={(event) =>
                onTokenOwnerInput(
                  event as unknown as FormEvent<HTMLInputElement>
                )
              }
              value={tokenOwner}
            />
            <div className="mb-4">
              <lukso-select
                ref={tokeIdTypeRef as unknown as LegacyRef<HTMLElement>}
                id="select"
                value={JSON.stringify(tokenIdType)}
                options={JSON.stringify(options)}
              />
            </div>
            <p className="mb-4 text-center w-80">{tokenIdType.description}</p>
            {tokenName && tokenSymbol && tokenOwner ? (
              <lukso-button
                custom-class="mb-4"
                variant="landing"
                size="medium"
                type="button"
                count="0"
                onClick={async (event) => await deployAsset(event)}
              >
                Deploy Asset
              </lukso-button>
            ) : (
              <lukso-button
                custom-class="mb-4"
                variant="landing"
                size="medium"
                type="button"
                count="0"
                disabled
              >
                Deploy Asset
              </lukso-button>
            )}
          </div>
        </lukso-card>
      ) : (
        <lukso-card variant="basic" size="medium">
          <div
            slot="content"
            className="p-6 flex justify-center content-center"
          >
            <p>
              Please connect with your Universal Profile Browser Extension in
              order to deploy an asset
            </p>
          </div>
        </lukso-card>
      )}
    </>
  );
};

export default DeployLSP8;
