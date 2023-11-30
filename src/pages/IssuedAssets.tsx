import { concat, isAddress, toBeHex, toNumber } from "ethers";
import { Suspense, useContext, useEffect, useState, Fragment } from "react";
import { ERC725YDataKeys } from "@lukso/lsp-smart-contracts";

// types
import { ERC725Y, ERC725Y__factory } from "../types";

// context
import { BrowserExtensionContext } from "../App";
import AssetMetadata from "../components/AssetMetadata";

interface Props {
  setError: React.Dispatch<React.SetStateAction<JSX.Element | undefined>>;
}

// Component should be showed only after user connected with browser extansion
const IssuedAssets: React.FC<Props> = ({ setError }) => {
  const { signer } = useContext(BrowserExtensionContext);

  const [issuedAssets, setIssuedAssets] =
    useState<{ address: string; interfaceId: string }[]>();
  const [selectedToken, setSelectedToken] = useState<string>();

  // const [tokenAddress, setTokenAddress] = useState<string>();
  // const [tokenUri, setTokenUri] = useState<string>();
  // const [isTokenOwner, setIsTokenOwner] = useState(false);

  // const [fetchedUri, setFetchedUri] = useState<JSX.Element>();

  // const ref = useRef<HTMLElement>();

  // const [value, setValue] = useState(options[0]);

  // const onTokenAddressInput = (event: React.FormEvent<HTMLInputElement>) => {
  //   const userInput = event.currentTarget.value;
  //   setTokenAddress(userInput);
  // };

  // const onTokenUriInput = (event: React.FormEvent<HTMLInputElement>) => {
  //   const userInput = event.currentTarget.value;
  //   setTokenUri(userInput);
  // };

  // const changeDefaultUri = async (
  //   event: React.MouseEvent<HTMLElement, MouseEvent>
  // ) => {
  //   event.preventDefault();

  //   const { signer, error } = await getSigner();

  //   if (error) {
  //     setError(error);
  //     return;
  //   }

  //   if (!isAddress(tokenAddress)) {
  //     setError(
  //       <>
  //         <h1 className="heading-inter-26-semi-bold pb-4">Address not found</h1>
  //         <p className="paragraph-inter-16-regular">
  //           Please input a valid token address.
  //         </p>
  //       </>
  //     );
  //     return;
  //   }

  //   if (!tokenUri) {
  //     setError(
  //       <>
  //         <h1 className="heading-inter-26-semi-bold pb-4">
  //           New token URI not found
  //         </h1>
  //         <p className="paragraph-inter-16-regular">
  //           Please input a new token URI
  //         </p>
  //       </>
  //     );
  //     return;
  //   }

  //   const token = new Contract(
  //     tokenAddress,
  //     LSP8DropsDigitalAsset__factory.abi
  //   ).connect(signer) as LSP8DropsDigitalAsset;

  //   if (value.value === "utf8") {
  //     await token.setDefaultTokenUri(
  //       concat([fucntionHash, toUtf8Bytes(tokenUri)])
  //     );
  //   }

  //   if (value.value === "hex") {
  //     if (!isHexString(tokenUri)) {
  //       console.log(`Uri is not hex. Value: ${tokenUri}`);
  //     }

  //     await token.setDefaultTokenUri(concat([fucntionHash, tokenUri]));
  //   }
  // };

  // const changeDataKeyUri = async (
  //   event: React.MouseEvent<HTMLElement, MouseEvent>
  // ) => {
  //   event.preventDefault();

  //   const { signer, error } = await getSigner();

  //   if (error) {
  //     setError(error);
  //     return;
  //   }

  //   if (!isAddress(tokenAddress)) {
  //     setError(
  //       <>
  //         <h1 className="heading-inter-26-semi-bold pb-4">Address not found</h1>
  //         <p className="paragraph-inter-16-regular">
  //           Please input a valid token address.
  //         </p>
  //       </>
  //     );
  //     return;
  //   }

  //   if (!tokenUri) {
  //     setError(
  //       <>
  //         <h1 className="heading-inter-26-semi-bold pb-4">
  //           New token URI not found
  //         </h1>
  //         <p className="paragraph-inter-16-regular">
  //           Please input a new token URI
  //         </p>
  //       </>
  //     );
  //     return;
  //   }

  //   const token = new Contract(
  //     tokenAddress,
  //     LSP8DropsDigitalAsset__factory.abi
  //   ).connect(signer) as LSP8DropsDigitalAsset;

  //   if (value.value === "utf8") {
  //     await token.setData(
  //       "0x1a7628600c3bac7101f53697f48df381ddc36b9015e7d7c9c5633d1252aa2843",
  //       concat([fucntionHash, toUtf8Bytes(tokenUri)])
  //     );
  //   }

  //   if (value.value === "hex") {
  //     if (!isHexString(tokenUri)) {
  //       console.log(`Uri is not hex. Value: ${tokenUri}`);
  //     }

  //     await token.setData(
  //       "0x1a7628600c3bac7101f53697f48df381ddc36b9015e7d7c9c5633d1252aa2843",
  //       concat([fucntionHash, tokenUri])
  //     );
  //   }
  // };

  // const getTokenUri = async (
  //   event: React.MouseEvent<HTMLElement, MouseEvent>
  // ) => {
  //   event.preventDefault();

  //   const { signer, error } = await getSigner();

  //   if (error) {
  //     setError(error);
  //     return;
  //   }

  //   if (!isAddress(tokenAddress)) {
  //     setError(
  //       <>
  //         <h1 className="heading-inter-26-semi-bold pb-4">Address not found</h1>
  //         <p className="paragraph-inter-16-regular">
  //           Please input a valid token address.
  //         </p>
  //       </>
  //     );
  //     return;
  //   }

  //   const token = new Contract(
  //     tokenAddress,
  //     LSP8DropsDigitalAsset__factory.abi
  //   ).connect(signer) as LSP8DropsDigitalAsset;

  //   const defaultUri = await token.defaultTokenUri();
  //   const dataKeyUri = await token.getData(
  //     "0x1a7628600c3bac7101f53697f48df381ddc36b9015e7d7c9c5633d1252aa2843"
  //   );

  //   setFetchedUri(
  //     <>
  //       <p>Default URI</p>
  //       <a
  //         href={uriToLink(defaultUri)}
  //         target="_blank"
  //         rel="noreferrer"
  //         className=" hover:underline text-purple-51 hover:text-purple-41"
  //       >
  //         {uriToLink(defaultUri)}
  //       </a>
  //       <p>Data Key URI</p>
  //       <a
  //         href={uriToLink(dataKeyUri)}
  //         target="_blank"
  //         rel="noreferrer"
  //         className=" hover:underline text-purple-51 hover:text-purple-41"
  //       >
  //         {uriToLink(dataKeyUri)}
  //       </a>
  //     </>
  //   );
  // };

  // // `lukso-select` value update
  // useEffect(() => {
  //   const meth = ({ detail: { value: _value = options[0] } = {} }) => {
  //     setValue(
  //       options.find(({ value }) => _value.value === value) || options[0]
  //     );
  //   };
  //   const select = ref.current as any;
  //   select?.addEventListener("on-select", meth);
  //   return () => {
  //     select?.removeEventListener("on-select", meth);
  //   };
  // }, [ref, value]);

  // // check tokenAddress owner
  // useEffect(() => {
  //   if (connected && isAddress(tokenAddress)) {
  //     const updateIsTokenOwner = async () => {
  //       const { signer, error } = await getSigner();

  //       if (error) {
  //         setError(error);
  //         return;
  //       }

  //       const token = new Contract(
  //         tokenAddress,
  //         LSP8DropsDigitalAsset__factory.abi
  //       ).connect(signer) as LSP8DropsDigitalAsset;

  //       if ((await token.owner()) === (await signer.getAddress())) {
  //         setIsTokenOwner(true);
  //       }
  //     };

  //     updateIsTokenOwner();
  //   }
  // }, [tokenAddress, connected]);

  // fetch `LSP12IssuedAssets[]`
  useEffect(() => {
    const fetchIssuedAssets = async () => {
      if (!signer) {
        return;
      }

      const signerAddress = await signer.getAddress();
      const erc725y = new ERC725Y__factory()
        .attach(signerAddress)
        .connect(signer) as ERC725Y;

      const issuedAssetsCountHex = await erc725y.getData(
        ERC725YDataKeys.LSP12["LSP12IssuedAssets[]"].length
      );

      const issuedAssetsCount =
        issuedAssetsCountHex === "0x" ? 0 : toNumber(issuedAssetsCountHex);

      const newIssuedAssets: { address: string; interfaceId: string }[] = [];
      for (let index = 0; index < issuedAssetsCount; index++) {
        const issuedAsset = await erc725y.getData(
          concat([
            ERC725YDataKeys.LSP12["LSP12IssuedAssets[]"].index,
            toBeHex(index, 16),
          ])
        );

        const assetMap = await erc725y.getData(
          concat([ERC725YDataKeys.LSP12.LSP12IssuedAssetsMap, issuedAsset])
        );

        const interfaceId =
          assetMap.length > 10 ? assetMap.substring(0, 10) : "0x00000000";

        if (isAddress(issuedAsset)) {
          newIssuedAssets.push({ address: issuedAsset, interfaceId });
        }
      }

      setIssuedAssets(newIssuedAssets);
    };

    if (signer) {
      fetchIssuedAssets();
    }
  }, [signer]);

  return (
    <Suspense>
      {signer ? (
        <>
          <div className="mb-4">
            <lukso-card variant="basic" size="medium">
              <div slot="content" className="p-6 flex flex-col items-center">
                {issuedAssets && issuedAssets.length ? (
                  <>
                    {issuedAssets.map(({ address }) => (
                      <div key={address} className="flex">
                        <div className="hover:cursor-pointer hover:opacity-80 underline-offset-1">
                          <lukso-username
                            address-color="purple-51"
                            className="underline-offset-1"
                            custom-class="underline-offset-1"
                            address={address}
                            onClick={() => setSelectedToken(address)}
                          />
                        </div>
                        <span
                          className={`${
                            selectedToken === address
                              ? "opacity-100"
                              : "opacity-0 hidden"
                          } transition-opacity ml-2`}
                        >
                          ✅
                        </span>
                      </div>
                    ))}
                  </>
                ) : (
                  <p>
                    You have no Issued Assets stored on your Universal Profile
                  </p>
                )}
              </div>
            </lukso-card>
          </div>

          {selectedToken ? (
            <AssetMetadata selectedToken={selectedToken} />
          ) : (
            <></>
          )}
        </>
      ) : (
        <lukso-card variant="basic" size="medium">
          <div
            slot="content"
            className="p-6 flex justify-center content-center"
          >
            <p>
              Please connect with your Universal Profile Browser Extension in
              order to see the Issued Assets
            </p>
          </div>
        </lukso-card>
      )}

      {/* <lukso-card variant="basic" custom-class="" size="medium">
            <div slot="content" className="p-6 flex flex-col items-center">
              <lukso-input
                placeholder="Token Address"
                custom-class="mb-4"
                onInput={(event) =>
                  onTokenAddressInput(
                    event as unknown as FormEvent<HTMLInputElement>
                  )
                }
                value={tokenAddress}
              />
              <lukso-input
                placeholder="New Token URI"
                custom-class="mb-4"
                onInput={(event) =>
                  onTokenUriInput(
                    event as unknown as FormEvent<HTMLInputElement>
                  )
                }
                value={tokenUri}
              />
              <div className="flex items-center mb-4">
                <lukso-select
                  ref={ref as unknown as LegacyRef<HTMLElement>}
                  id="select"
                  value={JSON.stringify(value)}
                  options={JSON.stringify(options)}
                  open-top
                />
                {connected && isTokenOwner ? (
                  <>
                    <lukso-button
                      custom-class="ml-4"
                      variant="landing"
                      size="medium"
                      type="button"
                      count="0"
                      onClick={async (event) => await changeDefaultUri(event)}
                    >
                      Change Default URI
                    </lukso-button>
                    <lukso-button
                      custom-class="ml-4"
                      variant="landing"
                      size="medium"
                      type="button"
                      count="0"
                      onClick={async (event) => await changeDataKeyUri(event)}
                    >
                      Change Data Key URI
                    </lukso-button>
                  </>
                ) : (
                  <>
                    <lukso-button
                      custom-class="ml-4"
                      variant="landing"
                      size="medium"
                      type="button"
                      count="0"
                      disabled
                    >
                      Change Default URI
                    </lukso-button>
                    <lukso-button
                      custom-class="ml-4"
                      variant="landing"
                      size="medium"
                      type="button"
                      count="0"
                      disabled
                    >
                      Change Data Key URI
                    </lukso-button>
                  </>
                )}
              </div>
              <div className="flex flex-col items-center mb-4">
                {connected ? (
                  <lukso-button
                    custom-class="mb-4"
                    variant="landing"
                    size="medium"
                    type="button"
                    count="0"
                    onClick={async (event) => getTokenUri(event)}
                  >
                    Fetch Token URI
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
                    Fetch Token URI
                  </lukso-button>
                )}
                {fetchedUri ? fetchedUri : <></>}
              </div>
            </div>
          </lukso-card> */}
    </Suspense>
  );
};

export default IssuedAssets;
