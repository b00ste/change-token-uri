import { FormEvent, LegacyRef, useEffect, useRef, useState } from "react";
import {
  Contract,
  hexlify,
  isHexString,
  toUtf8Bytes,
  toUtf8String,
} from "ethers";

// components
import Connect from "./components/Connect";

// types
import { LSP8DropsDigitalAsset, LSP8DropsDigitalAsset__factory } from "./types";

// utils
import { getSigner } from "./helpers/utils";

const options = [
  { id: 1, value: "utf8" },
  { id: 2, value: "hex" },
];

function App() {
  const [error, setError] = useState<JSX.Element>();
  const [connected, setConnected] = useState(false);

  const [address, setAddress] = useState<string>();
  const [uri, setUri] = useState<string>();
  const ref = useRef<HTMLElement>();

  const [value, setValue] = useState(options[0]);

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

    if (value.value === "utf8") {
      await lsp8.setDefaultTokenUri(toUtf8Bytes(uri), { gasLimit: 250_000 });
    }

    if (value.value === "hex") {
      if (!isHexString(uri)) {
        console.log(`Uri is not hex. Value: ${uri}`);
      }
      await lsp8.setDefaultTokenUri(uri, { gasLimit: 250_000 });
    }
  };

  useEffect(() => {
    const meth = ({ detail: { value: _value = options[0] } = {} }) => {
      setValue(
        options.find(({ value }) => _value.value === value) || options[0]
      );
    };
    const select = ref.current as any;
    select?.addEventListener("on-select", meth);
    return () => {
      select?.removeEventListener("on-select", meth);
    };
  }, [ref, value]);

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
              custom-class="mb-4"
              onInput={(event) =>
                onAddressInput(event as unknown as FormEvent<HTMLInputElement>)
              }
              value={address}
            />
            <lukso-input
              placeholder="New Token URI"
              custom-class="mb-4"
              onInput={(event) =>
                onUriInput(event as unknown as FormEvent<HTMLInputElement>)
              }
              value={uri}
            />
            <div className="flex items-center">
              <lukso-select
                ref={ref as unknown as LegacyRef<HTMLElement>}
                id="select"
                selected={JSON.stringify(value)}
                value={JSON.stringify(value)}
                options={JSON.stringify(options)}
                open-top
              />
              {connected ? (
                <lukso-button
                  custom-class="ml-4"
                  variant="landing"
                  size="medium"
                  type="button"
                  count="0"
                  onClick={async (event) => await changeTokenUri(event)}
                >
                  Change URI
                </lukso-button>
              ) : (
                <lukso-button
                  custom-class="ml-4"
                  variant="landing"
                  size="medium"
                  type="button"
                  count="0"
                  disabled
                >
                  Change URI
                </lukso-button>
              )}
            </div>
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
