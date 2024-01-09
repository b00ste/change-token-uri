import { useState, createContext } from "react";
import { BrowserProvider, Signer } from "ethers";

// components
import Navbar from "./components/Navbar";
import DeployLSP7 from "./pages/DeployLSP7";
import DeployLSP8 from "./pages/DeployLSP8";
import IssuedAssets from "./pages/IssuedAssets";

// helpers
import { getSigner, getUniversalProfileData } from "./helpers/utils";
import ReceivedAssets from "./pages/ReceivedAssets";
import UniversalReceiverLogs from "./pages/UniversalReceiverLogs";

export const BrowserExtensionContext = createContext<{
  provider?: BrowserProvider;
  signer?: Signer;
}>({});

function App() {
  const [error, setError] = useState<JSX.Element>();
  const [provider, setProvider] = useState<BrowserProvider>();
  const [signer, setSigner] = useState<Signer>();
  const [account, setAccount] = useState<JSX.Element>();

  const connect = async () => {
    const { signer, provider, error } = await getSigner();

    if (error) {
      setError(error);
    } else {
      setSigner(signer);
      setProvider(provider);

      const {
        name,
        description,
        links,
        tags,
        profileImageUrl,
        backgroundImageUrl,
        error: fetchError,
      } = await getUniversalProfileData(
        signer.address,
        Number((await provider.getNetwork()).chainId)
      );

      if (fetchError) {
        setError(
          <>
            <h1 className="heading-inter-26-semi-bold pb-4">
              Failed to fetch LSP3 Profile Metadata
            </h1>
            <p className="paragraph-inter-16-regular">{fetchError}</p>
          </>
        );
      }

      setAccount(
        <lukso-card
          variant="profile-2"
          background-url={backgroundImageUrl}
          profile-url={profileImageUrl}
          profile-address={signer.address}
          size="medium"
        >
          <div slot="content" className="px-6 pb-9 flex flex-col items-center">
            <lukso-username
              name={name || "anonymous"}
              address={signer.address}
            />
            <div className="hover:cursor-pointer hover:opacity-80">
              <lukso-username
                address={signer.address}
                address-color="purple-51"
                onClick={() => {
                  navigator.clipboard.writeText(signer.address);
                }}
              />
            </div>
            <div className="mt-2 mb-2 pt-2 border-t-2 flex">
              {links ? (
                Object.getOwnPropertyNames(links).map((index) => (
                  <div className="mx-1" key={index}>
                    {"| "}
                    <a
                      href={links[Number(index)].url}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline text-purple-51 hover:text-purple-41 font-600"
                    >
                      {links[Number(index)].title}
                    </a>
                  </div>
                ))
              ) : (
                <></>
              )}
              {" |"}
            </div>
            <div className="mt-2 mb-2 pt-4 border-t-2 flex">
              {tags ? (
                Object.getOwnPropertyNames(tags).map((index) => (
                  <div className="mx-1" key={tags[Number(index)]}>
                    <lukso-tag size="small">{tags[Number(index)]}</lukso-tag>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
            <em className="mt-2 pt-2 border-t-2">{description}</em>
          </div>
          <div
            slot="bottom"
            className="p-6 flex flex-row flex-wrap justify-center"
          >
            <div className="mx-2">
              <DeployLSP7 setError={setError} />
            </div>
            <div className="mx-2">
              <DeployLSP8 setError={setError} />
            </div>
          </div>
        </lukso-card>
      );
    }
  };

  const disconnect = () => {
    setSigner(undefined);
    setProvider(undefined);
    setAccount(undefined);
  };

  return (
    <div className="">
      <Navbar setError={setError}>
        {!account ? (
          <lukso-button
            variant="landing"
            custom-class="m-2"
            onClick={async () => await connect()}
          >
            Connect
          </lukso-button>
        ) : (
          <lukso-button
            variant="landing"
            custom-class="m-2"
            onClick={async () => disconnect()}
          >
            Disconnect
          </lukso-button>
        )}
      </Navbar>

      <div className="mx-4 pb-4 flex flex-col justify-center content-center">
        <BrowserExtensionContext.Provider value={{ signer, provider }}>
          <div className="my-4">
            {!account ? (
              <lukso-card variant="basic" size="medium" is-fixed-height>
                <div
                  slot="content"
                  className="p-6 flex flex-row items-center justify-center content-center h-full"
                >
                  <p className="paragraph-inter-20-regular">
                    Please connect with the browser extansion in order to use
                    the app.
                  </p>
                </div>
              </lukso-card>
            ) : (
              account
            )}
          </div>

          <IssuedAssets setError={setError} />
          <ReceivedAssets setError={setError} />
          {/* <UniversalReceiverLogs /> */}
        </BrowserExtensionContext.Provider>
      </div>
      {error ? (
        <lukso-modal is-open>
          <div className="p-6">
            {error}
            <p className="pt-6">
              <lukso-button
                is-full-width
                variant="landing"
                onClick={() => setError(undefined)}
              >
                Close
              </lukso-button>
            </p>
          </div>
        </lukso-modal>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
