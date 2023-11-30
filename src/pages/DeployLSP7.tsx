import { FormEvent, useContext, useState } from "react";
import { ERC725YDataKeys, INTERFACE_IDS } from "@lukso/lsp-smart-contracts";
import {
  BytesLike,
  concat,
  hexlify,
  randomBytes,
  toBeHex,
  toNumber,
} from "ethers";

// context
import { BrowserExtensionContext } from "../App";

// types
import {
  LSP16UniversalFactory__factory,
  LSP7MintableInit__factory,
  UniversalProfile__factory,
  UniversalProfile,
  LSP16UniversalFactory,
} from "../types";

// constants
import {
  LSP16_ADDRESS,
  LSP7_MINTABLE_INIT_ADDRESS,
} from "../helpers/constants";

interface Props {
  setError: React.Dispatch<React.SetStateAction<JSX.Element | undefined>>;
}

const DeployLSP7: React.FC<Props> = ({ setError }) => {
  const { signer, provider } = useContext(BrowserExtensionContext);

  const [tokenName, setTokenName] = useState<string>();
  const [tokenSymbol, setTokenSymbol] = useState<string>();
  const [tokenOwner, setTokenOwner] = useState<string>();
  const [divisibleToken, setDivisibleToken] = useState(true);

  const [progress, setProgress] = useState({
    proxyDeployed: false,
    lsp4DataKeysSet: false,
    lsp12DataKeysSet: false,
  });

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

  const onTokenDivisibilityUpdate = (event: FormEvent<HTMLFormElement>) => {
    const { checked } = event.target as HTMLFormElement;
    setDivisibleToken(!checked);
  };

  const deployProxy = async () => {
    const salt = hexlify(randomBytes(32));

    const deploymentCallbackCalldata =
      new LSP7MintableInit__factory().interface.encodeFunctionData(
        "initialize",
        [tokenName, tokenSymbol, tokenOwner, divisibleToken]
      );

    const unveirsalFactory = new LSP16UniversalFactory__factory(signer).attach(
      LSP16_ADDRESS
    ) as LSP16UniversalFactory;

    // Compute Asset Contract address
    const assetAddress = await unveirsalFactory.computeERC1167Address(
      LSP7_MINTABLE_INIT_ADDRESS,
      salt,
      true,
      deploymentCallbackCalldata
    );

    // Deploy Asset Contract as proxy
    await unveirsalFactory.deployERC1167ProxyAndInitialize(
      LSP7_MINTABLE_INIT_ADDRESS,
      salt,
      deploymentCallbackCalldata
    );

    setProgress({
      ...progress,
      proxyDeployed: true,
    });

    return assetAddress;
  };

  const setLsp4DataKeys = async (
    universalProfile: UniversalProfile,
    signerAddress: BytesLike
  ) => {
    if (!signer) {
      return;
    }

    await universalProfile.setDataBatch(
      [
        /// ------ LSP4Creators ------
        ERC725YDataKeys.LSP4["LSP4Creators[]"].length,
        concat([ERC725YDataKeys.LSP4["LSP4Creators[]"].index, toBeHex(0, 16)]),
        concat([ERC725YDataKeys.LSP4.LSP4CreatorsMap, signerAddress]),
        /// --------------------------
      ],
      [
        /// ------ LSP4Creators ------
        toBeHex(1, 16),
        signerAddress,
        concat([INTERFACE_IDS.LSP0ERC725Account, toBeHex(0, 16)]),
        /// --------------------------
      ]
    );

    setProgress({
      ...progress,
      lsp4DataKeysSet: true,
    });
  };

  const setLsp12DataKeys = async (
    universalProfile: UniversalProfile,
    assetAddress: BytesLike
  ) => {
    const issuedAssetsCountHex = await universalProfile.getData(
      ERC725YDataKeys.LSP12["LSP12IssuedAssets[]"].length
    );
    const issuedAssetsCount =
      issuedAssetsCountHex === "0x" ? 0 : toNumber(issuedAssetsCountHex);

    await universalProfile.setDataBatch(
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
          INTERFACE_IDS.LSP7DigitalAsset,
          toBeHex(issuedAssetsCount, 16),
        ]),
        /// -------------------------------
      ]
    );

    setProgress({
      ...progress,
      lsp12DataKeysSet: true,
    });
  };

  // deploy asset
  const deployAsset = async (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (!signer || !provider) {
      return;
    }

    const signerAddress = await signer.getAddress();
    const universalProfile = new UniversalProfile__factory(signer).attach(
      signerAddress
    ) as UniversalProfile;

    // Deploy Asset Contract as proxy
    const assetAddress = await deployProxy();

    // Update LSP4 Data Keys
    await setLsp4DataKeys(universalProfile, signerAddress);

    // Update LSP4 Data Keys
    await setLsp12DataKeys(universalProfile, assetAddress);
  };

  return (
    <>
      {signer && provider ? (
        <lukso-card variant="with-header" size="medium">
          <div slot="header" className="p-6">
            <p className="heading-inter-17-semi-bold">
              Deploy a LSP7 Digital Asset
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
              <lukso-checkbox
                name="input"
                type="text"
                size="small"
                onInput={(event) =>
                  onTokenDivisibilityUpdate(
                    event as unknown as FormEvent<HTMLFormElement>
                  )
                }
              >
                Divisible Token
              </lukso-checkbox>
            </div>
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

export default DeployLSP7;
