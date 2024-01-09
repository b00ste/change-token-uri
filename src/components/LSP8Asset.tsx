import { useContext, useEffect, useState } from "react";
import { ERC725YDataKeys } from "@lukso/lsp-smart-contracts";
import { toNumber, toUtf8String } from "ethers";

// types
import { LSP8IdentifiableDigitalAsset__factory } from "../types";

// context
import { BrowserExtensionContext } from "../App";

// utils
import { decodeUri, uriToLink } from "../helpers/utils";

interface Props {
  address: string;
}

const LSP8Asset: React.FC<Props> = ({ address }) => {
  const { signer, provider } = useContext(BrowserExtensionContext);

  const [assetMetadata, setAssetMetadata] = useState<{
    name: string;
    symbol: string;
    iconUrl: string;
    tokenIds: { tokenId: string | number; metadata: any }[];
  }>();

  useEffect(() => {
    const getAssetMetadata = async () => {
      if (!provider || !signer) {
        return;
      }

      const asset = LSP8IdentifiableDigitalAsset__factory.connect(
        address,
        provider
      );

      const [nameHex, symbolHex, metadataHex, baseUriHex, tokenIdFormatHex] =
        await asset.getDataBatch([
          ERC725YDataKeys.LSP4.LSP4TokenName,
          ERC725YDataKeys.LSP4.LSP4TokenSymbol,
          ERC725YDataKeys.LSP4.LSP4Metadata,
          ERC725YDataKeys.LSP8.LSP8TokenMetadataBaseURI,
          ERC725YDataKeys.LSP8.LSP8TokenIdFormat,
        ]);

      const decodedMetadataUri = decodeUri(metadataHex);
      const metadataLink = uriToLink(decodedMetadataUri);

      let result;
      let fetcedMetadata;
      try {
        result = await fetch(metadataLink);
        fetcedMetadata = await result.json();
      } catch (error) {
        console.error(error);
      }

      const decodedBaseUri = decodeUri(baseUriHex);
      const baseUriLink = uriToLink(decodedBaseUri);

      const signerAddress = await signer.getAddress();
      const tokenIds = await asset.tokenIdsOf(signerAddress);

      let newTokenIds: { tokenId: string | number; metadata: any }[] = [];

      for (let index = 0; index < tokenIds.length; index++) {
        if (tokenIdFormatHex !== "0x") {
          const tokenIdFormat = toNumber(tokenIdFormatHex);

          let tokenId = "";
          if (tokenIdFormat === 0) {
            tokenId = toNumber(tokenIds[index]).toString();
          } else if (tokenIdFormat === 1) {
            tokenId = toUtf8String(tokenIds[index]);
          }

          let fetchedTokenIdMetadata;
          try {
            result = await fetch(
              baseUriLink.endsWith("/")
                ? `${baseUriLink}${tokenId}`
                : `${baseUriLink}/${tokenId}`
            );
            fetchedTokenIdMetadata =
              result.type === "cors" ? await result.json() : {};
          } catch (error) {
            console.error(error);
          }

          newTokenIds.push({ tokenId, metadata: fetchedTokenIdMetadata });
        } else {
          let fetchedTokenIdMetadata;
          try {
            result = await fetch(
              baseUriLink.endsWith("/")
                ? `${baseUriLink}${tokenIds[index]}`
                : `${baseUriLink}/${tokenIds[index]}`
            );
            fetchedTokenIdMetadata = await result.json();
          } catch (error) {
            console.error(error);
          }

          newTokenIds.push({
            tokenId: tokenIds[index],
            metadata: fetchedTokenIdMetadata,
          });
        }
      }

      setAssetMetadata({
        name: nameHex === "0x" ? "name missing" : toUtf8String(nameHex),
        symbol: symbolHex === "0x" ? "symbol missing" : toUtf8String(symbolHex),
        iconUrl:
          fetcedMetadata &&
          fetcedMetadata.LSP4Metadata &&
          fetcedMetadata.LSP4Metadata.icon &&
          fetcedMetadata.LSP4Metadata.icon[0] &&
          fetcedMetadata.LSP4Metadata.icon[0].url
            ? uriToLink(fetcedMetadata.LSP4Metadata.icon[0].url)
            : "",
        tokenIds: newTokenIds,
      });
    };

    if (!assetMetadata) {
      getAssetMetadata();
    }
  }, [provider, signer, assetMetadata, address]);

  return (
    <>
      {assetMetadata?.tokenIds.map(({ tokenId, metadata }) => (
        <div className="m-4" key={tokenId}>
          <lukso-card
            variant="dapp"
            size="small"
            background-url={
              (metadata &&
                metadata.LSP4Metadata &&
                metadata.LSP4Metadata.images &&
                metadata.LSP4Metadata.images[0] &&
                metadata.LSP4Metadata.images[0][0] &&
                metadata.LSP4Metadata.images[0][0].url) ||
              assetMetadata.iconUrl ||
              "assets/images/sample-background.png"
            }
            custom-class="rounded-24"
          >
            <div
              slot="content"
              className="p-6 flex flex-col items-start min-w-72 h-32"
            >
              <div className="flex flex-col items-start justify-center">
                <p className="text-purple-41 font-500 text-14">
                  {`${assetMetadata?.name} (${assetMetadata?.symbol})` ||
                    "loading"}
                </p>
                <p className="text-purple-41 font-500 text-14">
                  {tokenId || "loading"}
                </p>
              </div>
            </div>
          </lukso-card>
        </div>
      ))}
    </>
  );
};

export default LSP8Asset;
