import { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BrowserProvider, Signer } from "ethers";

// components
import Navbar from "./components/Navbar";

// pages
import Home from "./pages/Home";
import DeployLSP7 from "./pages/DeployLSP7";
import DeployLSP8 from "./pages/DeployLSP8";
import IssuedAssets from "./pages/IssuedAssets";

// helpers
import { getSigner, getUniversalProfileData } from "./helpers/utils";

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
          variant="profile"
          background-url={backgroundImageUrl}
          profile-url={profileImageUrl}
          profile-address={signer.address}
          size="medium"
        >
          <div slot="header" className="p-6"></div>
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
        </lukso-card>
      );
    }
  };

  return (
    <Router>
      <div className="min-h-screen relative">
        <Navbar setError={setError} />

        <div className="m-4 flex flex-col justify-center content-center">
          <div className="my-4">
            {!account ? (
              <lukso-card variant="basic" size="medium">
                <div
                  slot="content"
                  className="p-6 flex flex-row items-center justify-center"
                >
                  <p className="paragraph-inter-20-regular">
                    Please connect with the browser extansion in order to use
                    the app.
                  </p>
                  <lukso-button
                    variant="landing"
                    custom-class="ml-4"
                    onClick={async () => await connect()}
                  >
                    Connect
                  </lukso-button>
                </div>
              </lukso-card>
            ) : (
              account
            )}
          </div>

          <BrowserExtensionContext.Provider value={{ signer, provider }}>
            <Routes>
              <Route path="/" element={<Home />} />

              <Route
                path="/deploy-lsp7"
                element={<DeployLSP7 setError={setError} />}
              />

              <Route
                path="/deploy-lsp8"
                element={<DeployLSP8 setError={setError} />}
              />

              <Route
                path="/issued-assets"
                element={<IssuedAssets setError={setError} />}
              />
            </Routes>
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
    </Router>
  );
}

export default App;
