import {
  BrowserProvider,
  Provider,
  hexlify,
  isHexString,
  keccak256,
  toNumber,
  toUtf8Bytes,
  toUtf8String,
} from "ethers";
import {
  UNIVERSAL_PROFILE_API,
  lsp7_0_12_1_interface_id,
  lsp8_0_12_1_interface_id,
} from "./constants";
import { ERC165__factory, ERC725Y__factory } from "../types";
import { ERC725YDataKeys, INTERFACE_IDS } from "@lukso/lsp-smart-contracts";

export const fucntionHash = hexlify(
  keccak256(toUtf8Bytes("keccak256(utf8)"))
).substring(0, 10);

export const getCsv = async (fileName: string) => {
  let data;
  try {
    const response = await fetch(`data/${fileName}.csv`);

    if (response.body) {
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value).split("\n").slice(1);

      const newData: Record<string, string> = {};
      csv
        .filter((value) => value !== "")
        .forEach((value) => {
          const [salt, address] = value.split(",");
          newData[address] = salt;
        });

      data = newData;
    }
  } catch (error: any) {
    console.log(error.message);
  }

  return data;
};

export const uriToLink = (tokenUri: string) => {
  if (isHexString(tokenUri)) {
    let patchedLink = tokenUri;
    if (tokenUri.startsWith(fucntionHash)) {
      patchedLink = `0x${patchedLink.replace(fucntionHash, "")}`;
    }

    const link = toUtf8String(patchedLink);
    if (link.startsWith("ipfs://")) {
      return link.replace("ipfs://", "https://ipfs.io/ipfs/");
    }

    return link;
  } else {
    if (tokenUri?.startsWith("ipfs://")) {
      return tokenUri.replace("ipfs://", "https://ipfs.io/ipfs/");
    }

    return tokenUri;
  }
};

export const getSigner = async () => {
  if (!window.lukso) {
    return {
      provider: undefined,
      signer: undefined,
      error: (
        <>
          <h1 className="heading-inter-26-semi-bold pb-4">
            Unviersal Profile Extension missing
          </h1>
          <p className="paragraph-inter-16-regular">
            Universal Profile Browser Extension is not installed Please install
            it in order to have the full experience of creating a Salted
            Unviersal Profile.
          </p>
        </>
      ),
    };
  }

  const provider = new BrowserProvider(window.lukso);

  try {
    const signer = await provider.getSigner();
    return { provider, signer };
  } catch (error: any) {
    if (error.message.startsWith("user rejected action")) {
      return {
        provider: undefined,
        signer: undefined,
        error: (
          <>
            <h1 className="heading-inter-26-semi-bold pb-4">Import rejected</h1>
            <p className="paragraph-inter-16-regular">
              You have to go through the process of importing the Universal
              Profile. Otherwise you will not be able to use it.
            </p>
          </>
        ),
      };
    } else {
      return {
        provider: undefined,
        signer: undefined,
        error: (
          <>
            <h1 className="heading-inter-26-semi-bold pb-4">Unknown error</h1>
            <p className="paragraph-inter-16-regular">{error.message}</p>
          </>
        ),
      };
    }
  }
};

export type Result = {
  name?: string;
  description?: string;
  links?: Record<number, { title: string; url: string }>;
  tags?: Record<number, string>;
  profileImageUrl?: string;
  backgroundImageUrl?: string;
  error?: string;
};

export type Info = { promise?: Promise<Result>; result?: Result };

const hashedProfiles: Record<string, Info> = {};

export const getUniversalProfileData = (
  universalProfileAddress: string,
  chainId: number
): Promise<Result> => {
  return fetch(
    UNIVERSAL_PROFILE_API + chainId + "/address/" + universalProfileAddress
  )
    .then((response) => {
      if (!response.ok) {
        return {
          error: response.statusText,
        };
      }
      return response.json();
    })
    .then(
      ({
        LSP3Profile: {
          name = "",
          description = "",
          links = {},
          tags = {},
        } = {},
        profileImageUrl = "",
        backgroundImageUrl = "",
      }) => ({
        name,
        description,
        links,
        tags,
        profileImageUrl,
        backgroundImageUrl,
      })
    );
};

export const useUniversalProfileData = (
  universalProfileAddress: string,
  chainId: number
): Result => {
  let info: Info = hashedProfiles[universalProfileAddress];
  if (info) {
    if (info.promise) {
      throw info.promise;
    }
    return info.result || {};
  }
  const promise = getUniversalProfileData(universalProfileAddress, chainId);
  info = hashedProfiles[universalProfileAddress] = {
    promise,
  };
  throw promise.then((result) => {
    info.result = result;
    delete info.promise;
  });
};

export const decodeUri = (uri: string) => {
  const keccak256_utf8_hash = "0x6f357c6a";
  const keccak256_bytes_hash = "0x8019f9b1";
  const ecdsa_hash = "0xac75a10e";
  const verifiableUriIdentifier = "0x0000";

  if (uri.startsWith(verifiableUriIdentifier)) {
    if (uri.length < 50) {
      console.error("Invalid length verifiable uri");
      return "";
    }

    const verificationMethod = `0x${uri.substring(6, 14)}`;

    if (
      ![keccak256_utf8_hash, keccak256_bytes_hash, ecdsa_hash].includes(
        verificationMethod
      )
    ) {
      console.error("Wrong verification method for verifiable uri");
      return "";
    }

    const verificationDataLength = toNumber(`0x${uri.substring(14, 18)}`) * 2;

    if (uri.length < 18 + verificationDataLength) {
      console.error(
        `Invalid length. Expected min lenght: ${18 + verificationDataLength}`
      );
      return "";
    }

    // const verificationData = `0x${uri.substring(
    //   18,
    //   18 + verificationDataLength
    // )}`;
    const decodedUri = toUtf8String(
      `0x${uri.substring(18 + verificationDataLength)}`
    );

    return decodedUri;
  } else if (uri.startsWith(keccak256_utf8_hash)) {
    let decodedUri = "";
    try {
      if (uri.length > 74) {
        decodedUri = toUtf8String(`0x${uri.substring(74)}`);
      } else {
        decodedUri = toUtf8String(`0x${uri.substring(10)}`);
      }
    } catch {
      console.error("Couldn't decode URI");
    }

    return decodedUri;
  } else {
    return "";
  }
};

export const getMetadata = async (address: string, provider: Provider) => {
  const addressCode = await provider.getCode(address);
  if (addressCode.length === 0) {
    return {
      name: "anonymous",
      imageUrl: "",
    };
  }

  const erc165 = ERC165__factory.connect(address, provider);

  let supportsLSP0;
  try {
    supportsLSP0 = await erc165.supportsInterface(
      INTERFACE_IDS.LSP0ERC725Account
    );
  } catch (error) {
    console.error(error);
  }

  if (supportsLSP0) {
    const { chainId } = await provider.getNetwork();
    const { name, backgroundImageUrl } = await getUniversalProfileData(
      address,
      Number(chainId)
    );

    return {
      name,
      imageUrl: backgroundImageUrl,
    };
  }

  let supportsLSP7;
  let supportsLSP8;
  try {
    supportsLSP7 =
      (await erc165.supportsInterface(INTERFACE_IDS.LSP7DigitalAsset)) ||
      (await erc165.supportsInterface(lsp7_0_12_1_interface_id));
    supportsLSP8 =
      (await erc165.supportsInterface(
        INTERFACE_IDS.LSP8IdentifiableDigitalAsset
      )) || (await erc165.supportsInterface(lsp8_0_12_1_interface_id));
  } catch (error) {
    console.error(error);
  }

  if (supportsLSP7 || supportsLSP8) {
    const erc725y = ERC725Y__factory.connect(address, provider);
    const verifiableUriHex = await erc725y.getData(
      ERC725YDataKeys.LSP4.LSP4Metadata
    );
    const decodedUri = decodeUri(verifiableUriHex);
    const link = uriToLink(decodedUri);

    const result = await fetch(link);
    const fetchedMetadata =
      result.type === "cors" ? await result.json() : undefined;

    if (!fetchedMetadata) {
      return {
        name: "anonymous",
        imageUrl: "",
      };
    } else if (fetchedMetadata.LSP4Metadata) {
      const { name, images } = fetchedMetadata.LSP4Metadata;

      return {
        name,
        imageUrl: images[0][0].url,
      };
    } else {
      return {
        name: "anonymous",
        imageUrl: "",
      };
    }
  } else {
    return {
      name: "anonymous",
      imageUrl: "",
    };
  }
};
