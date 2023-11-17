import { FormEvent, LegacyRef, useEffect, useRef, useState } from "react";
import {
  Contract,
  concat,
  hexlify,
  isHexString,
  keccak256,
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

const fucntionHash = hexlify(
  keccak256(toUtf8Bytes("keccak256(utf8)"))
).substring(0, 10);

function App() {
  const [error, setError] = useState<JSX.Element>();
  const [connected, setConnected] = useState(false);

  const [address, setAddress] = useState<string>();
  const [uri, setUri] = useState<string>();

  const [fetchedUri, setFetchedUri] = useState<JSX.Element>();

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

  const changeDefaultUri = async (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.preventDefault();

    const { signer, error } = await getSigner();

    if (error) {
      setError(error);
      return;
    }

    if (!address) {
      setError(
        <>
          <h1 className="heading-inter-26-semi-bold pb-4">Address not found</h1>
          <p className="paragraph-inter-16-regular">
            Please input a token address
          </p>
        </>
      );
      return;
    }

    if (!uri) {
      setError(
        <>
          <h1 className="heading-inter-26-semi-bold pb-4">
            New token URI not found
          </h1>
          <p className="paragraph-inter-16-regular">
            Please input a new token URI
          </p>
        </>
      );
      return;
    }

    const lsp8 = new Contract(
      address,
      LSP8DropsDigitalAsset__factory.abi
    ).connect(signer) as LSP8DropsDigitalAsset;

    if (value.value === "utf8") {
      await lsp8.setDefaultTokenUri(concat([fucntionHash, toUtf8Bytes(uri)]));
    }

    if (value.value === "hex") {
      if (!isHexString(uri)) {
        console.log(`Uri is not hex. Value: ${uri}`);
      }

      await lsp8.setDefaultTokenUri(concat([fucntionHash, uri]));
    }
  };

  const changeDataKeyUri = async (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.preventDefault();

    const { signer, error } = await getSigner();

    if (error) {
      setError(error);
      return;
    }

    if (!address) {
      setError(
        <>
          <h1 className="heading-inter-26-semi-bold pb-4">Address not found</h1>
          <p className="paragraph-inter-16-regular">
            Please input a token address
          </p>
        </>
      );
      return;
    }

    if (!uri) {
      setError(
        <>
          <h1 className="heading-inter-26-semi-bold pb-4">
            New token URI not found
          </h1>
          <p className="paragraph-inter-16-regular">
            Please input a new token URI
          </p>
        </>
      );
      return;
    }

    const lsp8 = new Contract(
      address,
      LSP8DropsDigitalAsset__factory.abi
    ).connect(signer) as LSP8DropsDigitalAsset;

    if (value.value === "utf8") {
      await lsp8.setData(
        "0x1a7628600c3bac7101f53697f48df381ddc36b9015e7d7c9c5633d1252aa2843",
        concat([fucntionHash, toUtf8Bytes(uri)])
      );
    }

    if (value.value === "hex") {
      if (!isHexString(uri)) {
        console.log(`Uri is not hex. Value: ${uri}`);
      }

      await lsp8.setData(
        "0x1a7628600c3bac7101f53697f48df381ddc36b9015e7d7c9c5633d1252aa2843",
        concat([fucntionHash, uri])
      );
    }
  };

  const getTokenUri = async (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.preventDefault();

    const { signer, error } = await getSigner();

    if (error) {
      setError(error);
      return;
    }

    if (!address) {
      setError(
        <>
          <h1 className="heading-inter-26-semi-bold pb-4">Address not found</h1>
          <p className="paragraph-inter-16-regular">
            Please input a token address
          </p>
        </>
      );
      return;
    }

    const lsp8 = new Contract(
      address,
      LSP8DropsDigitalAsset__factory.abi
    ).connect(signer) as LSP8DropsDigitalAsset;

    const defaultUri = await lsp8.defaultTokenUri();
    const dataKeyUri = await lsp8.getData(
      "0x1a7628600c3bac7101f53697f48df381ddc36b9015e7d7c9c5633d1252aa2843"
    );

    setFetchedUri(
      <>
        <p>Default URI</p>
        <a
          href={uriToLink(defaultUri)}
          target="_blank"
          rel="noreferrer"
          className=" hover:underline text-purple-51 hover:text-purple-41"
        >
          {uriToLink(defaultUri)}
        </a>
        <p>Data Key URI</p>
        <a
          href={uriToLink(dataKeyUri)}
          target="_blank"
          rel="noreferrer"
          className=" hover:underline text-purple-51 hover:text-purple-41"
        >
          {uriToLink(dataKeyUri)}
        </a>
      </>
    );
  };

  const uriToLink = (uri: string) => {
    console.log(fucntionHash);
    console.log(uri);

    let patchedLink = uri;
    if (uri.startsWith(fucntionHash)) {
      patchedLink = `0x${patchedLink.replace(fucntionHash, "")}`;
    }

    const link = toUtf8String(patchedLink);
    if (link.startsWith("ipfs://")) {
      return link.replace("ipfs://", "https://ipfs.io/ipfs/");
    }

    return link;
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
        <lukso-card variant="basic" custom-class="" size="medium">
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
            <div className="flex items-center mb-4">
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
                  onClick={async (event) => await changeDefaultUri(event)}
                >
                  Change Default URI
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
                  Change Default URI
                </lukso-button>
              )}
              {connected ? (
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
              ) : (
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
