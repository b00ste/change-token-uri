import { FormEvent, useState } from "react";
import { Contract } from "ethers";

// components
import Connect from "./components/Connect";

// types
import { LSP8DropsDigitalAsset, LSP8DropsDigitalAsset__factory } from "./types";

// utils
import { getSigner } from "./helpers/utils";

function App() {
  const [error, setError] = useState<JSX.Element>();
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState<string>();
  const [uri, setUri] = useState<string>();

  const onAddressInput = (event: React.FormEvent<HTMLInputElement>) => {
    const userInput = event.currentTarget.value;
    setAddress(userInput);
  };

  const onUriInput = (event: React.FormEvent<HTMLInputElement>) => {
    const userInput = event.currentTarget.value;
    setUri(userInput);
  };

  const changeTokenUri = async (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.preventDefault();

    const { signer, error } = await getSigner();

    if (error) {
      setError(error);
      return;
    }

    if (!address || !uri) {
      return;
    }

    const lsp8 = new Contract(
      address,
      LSP8DropsDigitalAsset__factory.abi
    ).connect(signer) as LSP8DropsDigitalAsset;

    await lsp8.setDefaultTokenUri(uri, { gasLimit: 250_000 });
  };

  return (
    <div className="min-h-screen relative">
      <Connect setError={setError} setConnected={setConnected} />{" "}
      <div className="m-4 flex justify-center content-center">
        <lukso-card variant="with-header" custom-class="" size="medium">
          <div slot="header" className="p-6">
            <h1 className="heading-inter-26-semi-bold p-2">Change token URI</h1>
          </div>
          <div slot="content" className="p-6 flex flex-col items-center">
            <lukso-input
              placeholder="Token Address"
              custom-class="mb-2"
              onInput={(event) =>
                onAddressInput(event as unknown as FormEvent<HTMLInputElement>)
              }
              value={address}
            />
            <lukso-input
              placeholder="New Token URI"
              custom-class="mb-2"
              onInput={(event) =>
                onUriInput(event as unknown as FormEvent<HTMLInputElement>)
              }
              value={uri}
            />
            {connected ? (
              <lukso-button
                variant="landing"
                size="medium"
                type="button"
                count="0"
                onClick={(event) => changeTokenUri(event)}
              >
                Change URI
              </lukso-button>
            ) : (
              <lukso-button
                variant="landing"
                size="medium"
                type="button"
                count="0"
                disabled
                onClick={(event) => changeTokenUri(event)}
              >
                Change URI
              </lukso-button>
            )}
          </div>
        </lukso-card>
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
