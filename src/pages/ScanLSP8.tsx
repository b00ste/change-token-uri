import { FormEvent, useContext, useState } from "react";
import { JsonRpcProvider, isAddress, toBeHex } from "ethers";

// context
import { BrowserExtensionContext } from "../App";

// types
import { LSP8DropsDigitalAsset__factory } from "../types";
import { getUniversalProfileData } from "../helpers/utils";

const universal_cloud = "https://wallet.universalprofile.cloud/";

const ScanLSP8 = () => {
  const { provider } = useContext(BrowserExtensionContext);

  const [isOpen, setIsOpen] = useState(false);

  const [tokenAddress, setTokenAddress] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [tokenIdsScanned, setTokenIdsScanned] = useState<number>();
  const [tokenDetails, setTokenDetails] = useState<{
    totalSupply: number;
    balance: number;
  }>();
  const [holders, setHolders] =
    useState<
      Record<
        string,
        { name: string; profileImageUrl: string; tokenIds: string[] }
      >
    >();
  const [pageNumber, setPageNumber] = useState(0);

  const onTokenAddressInput = (event: React.FormEvent<HTMLInputElement>) => {
    const userInput = event.currentTarget.value;
    setTokenAddress(userInput);
  };

  const scanAsset = async () => {
    setIsLoading(true);
    const provider1 = new JsonRpcProvider("https://rpc.lukso.gateway.fm");
    if (!provider || !tokenAddress) {
      return;
    }

    const asset = LSP8DropsDigitalAsset__factory.connect(
      tokenAddress,
      provider1
    );

    const totalSupply = Number(await asset.totalSupply());
    const balance = Number.parseFloat(
      ((await provider.getBalance(tokenAddress)) / 10n ** 18n).toString()
    );

    setTokenDetails({
      totalSupply,
      balance,
    });

    let allTokenIds = new Array(totalSupply)
      .fill("")
      .map((_, index) => toBeHex(index + 1, 32));

    let foundHolders: Record<
      string,
      { name: string; profileImageUrl: string; tokenIds: string[] }
    > = {};
    for (let index = 1; index <= totalSupply; index++) {
      const tokenId = toBeHex(index, 32);

      if (!allTokenIds.includes(tokenId)) {
        continue;
      }

      const tokenIdOwner = await asset.tokenOwnerOf(tokenId);
      const tokenIds = await asset.tokenIdsOf(tokenIdOwner);
      const { name, profileImageUrl } = await getUniversalProfileData(
        tokenIdOwner,
        42
      );

      foundHolders[tokenIdOwner] = {
        name: name || "anon",
        profileImageUrl: profileImageUrl || "default",
        tokenIds,
      };

      allTokenIds = allTokenIds.filter(
        (tokenIdToFilter) => !tokenIds.includes(tokenIdToFilter)
      );

      setTokenIdsScanned(totalSupply - allTokenIds.length);
    }

    setHolders(foundHolders);
    setIsLoading(false);
  };

  return (
    <>
      {provider ? (
        <>
          {isOpen ? (
            <lukso-modal is-open size="medium">
              <div className="p-6 flex flex-col items-center max-h-full">
                <div className="w-96">
                  <lukso-input
                    placeholder="Token Address"
                    custom-class="mb-4"
                    is-full-width
                    onInput={(event) =>
                      onTokenAddressInput(
                        event as unknown as FormEvent<HTMLInputElement>
                      )
                    }
                    value={tokenAddress}
                  />
                </div>
                {isAddress(tokenAddress) ? (
                  <lukso-button
                    custom-class="mb-4"
                    variant="landing"
                    size="medium"
                    type="button"
                    count="0"
                    onClick={async () => await scanAsset()}
                  >
                    Scan
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
                    Scan
                  </lukso-button>
                )}
                {isLoading && tokenDetails ? (
                  <div className="w-full mb-4 px-12">
                    <div className="flex flex-row justify-between mb-2 px-4">
                      <p className="mr-4">Token IDs scanned:</p>
                      <p>
                        {tokenIdsScanned}/{tokenDetails.totalSupply}
                      </p>
                    </div>
                    <lukso-progress
                      variant="warning"
                      min={0}
                      max={tokenDetails.totalSupply}
                      current={tokenIdsScanned}
                    />
                  </div>
                ) : (
                  <></>
                )}
                {tokenDetails ? (
                  <div className="mb-4">
                    <div className="flex flex-row justify-between">
                      <p className="mr-4">Balance:</p>
                      <p>{tokenDetails.balance}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p className="mr-4">Total supply:</p>
                      <p>{tokenDetails.totalSupply}</p>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <div>
                  <div className="mb-4">
                    {holders ? (
                      <>
                        <div className="flex flex-row justify-between mb-4">
                          <p className="mr-4">Total Owners:</p>
                          <p>{Object.getOwnPropertyNames(holders).length}</p>
                        </div>
                        <div className="flex flex-row mb-2">
                          <div className="flex flex-col mr-4 w-52">
                            {Object.getOwnPropertyNames(holders)
                              .sort(
                                (address_a, address_b) =>
                                  holders[address_b].tokenIds.length -
                                  holders[address_a].tokenIds.length
                              )
                              .slice(5 * pageNumber, 5 * (pageNumber + 1))
                              .map((address) => {
                                return (
                                  <div
                                    className="flex flex-row justify-between items-center"
                                    key={address}
                                  >
                                    <div className="flex flex-row justify-start items-center">
                                      <lukso-profile
                                        size="small"
                                        has-identicon
                                        profile-url={
                                          holders[address].profileImageUrl
                                        }
                                        profile-address={address}
                                        class="mr-2 mb-1 hover:cursor-pointer"
                                        onClick={() => {
                                          const newWindow = window.open(
                                            `${universal_cloud}${address}`,
                                            "_blank",
                                            "noopener,noreferrer"
                                          );
                                          if (newWindow)
                                            newWindow.opener = null;
                                        }}
                                      />
                                      <lukso-username
                                        name={holders[address].name}
                                        class="hover:cursor-pointer"
                                        onClick={() => {
                                          const newWindow = window.open(
                                            `${universal_cloud}${address}`,
                                            "_blank",
                                            "noopener,noreferrer"
                                          );
                                          if (newWindow)
                                            newWindow.opener = null;
                                        }}
                                      />
                                    </div>
                                    <p>{holders[address].tokenIds.length}</p>
                                  </div>
                                );
                              })}
                          </div>
                          <div className="flex flex-col w-52">
                            {Object.getOwnPropertyNames(holders)
                              .sort(
                                (address_a, address_b) =>
                                  holders[address_b].tokenIds.length -
                                  holders[address_a].tokenIds.length
                              )
                              .slice(5 * (pageNumber + 1), 5 * (pageNumber + 2))
                              .map((address) => {
                                return (
                                  <div
                                    className="flex flex-row justify-between items-center"
                                    key={address}
                                  >
                                    <div className="flex flex-row justify-start items-center">
                                      <lukso-profile
                                        size="small"
                                        has-identicon
                                        profile-url={
                                          holders[address].profileImageUrl
                                        }
                                        profile-address={address}
                                        class="mr-2 mb-1 hover:cursor-pointer"
                                        onClick={() => {
                                          const newWindow = window.open(
                                            `${universal_cloud}${address}`,
                                            "_blank",
                                            "noopener,noreferrer"
                                          );
                                          if (newWindow)
                                            newWindow.opener = null;
                                        }}
                                      />
                                      <lukso-username
                                        name={holders[address].name}
                                        class="hover:cursor-pointer"
                                        onClick={() => {
                                          const newWindow = window.open(
                                            `${universal_cloud}${address}`,
                                            "_blank",
                                            "noopener,noreferrer"
                                          );
                                          if (newWindow)
                                            newWindow.opener = null;
                                        }}
                                      />
                                    </div>
                                    <p>{holders[address].tokenIds.length}</p>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  {holders &&
                  Object.getOwnPropertyNames(holders).length > 10 ? (
                    <div className="flex flex-row justify-between mb-4">
                      {pageNumber > 0 ? (
                        <lukso-button
                          variant="landing"
                          size="medium"
                          onClick={() => setPageNumber(pageNumber - 1)}
                        >
                          Previous
                        </lukso-button>
                      ) : (
                        <lukso-button variant="landing" size="medium" disabled>
                          Previous
                        </lukso-button>
                      )}
                      {pageNumber <
                      Object.getOwnPropertyNames(holders).length / 10 ? (
                        <lukso-button
                          variant="landing"
                          size="medium"
                          onClick={() => setPageNumber(pageNumber + 1)}
                        >
                          Next
                        </lukso-button>
                      ) : (
                        <lukso-button variant="landing" size="medium" disabled>
                          Next
                        </lukso-button>
                      )}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <lukso-button
                  variant="landing"
                  size="medium"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </lukso-button>
              </div>
            </lukso-modal>
          ) : (
            <></>
          )}
          <lukso-button
            variant="landing"
            size="medium"
            onClick={() => setIsOpen(true)}
          >
            Scan LSP8
          </lukso-button>
        </>
      ) : (
        <>
          {isOpen ? (
            <lukso-modal is-open size="small">
              <div className="p-6 flex flex-col items-center">
                <p className="paragraph-inter-16-regular">
                  Please connect with your Universal Profile Browser Extension
                  in order to deploy an asset
                </p>
                <lukso-button
                  variant="landing"
                  size="medium"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </lukso-button>
              </div>
            </lukso-modal>
          ) : (
            <></>
          )}
          <lukso-button
            variant="landing"
            size="medium"
            onClick={() => setIsOpen(true)}
          >
            Scan LSP8
          </lukso-button>
        </>
      )}
    </>
  );
};

export default ScanLSP8;
