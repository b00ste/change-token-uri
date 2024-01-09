import { useContext, useEffect, useState } from "react";

// types
import { LSP7DigitalAsset__factory } from "../types";

// context
import { BrowserExtensionContext } from "../App";
import { ERC725YDataKeys } from "@lukso/lsp-smart-contracts";
import { toUtf8String } from "ethers";
import { decodeUri, uriToLink } from "../helpers/utils";

interface Props {
  address: string;
}

const LSP7Asset: React.FC<Props> = ({ address }) => {
  const { signer, provider } = useContext(BrowserExtensionContext);

  const [assetMetadata, setAssetMetadata] = useState<{
    name: string;
    symbol: string;
    iconUrl: string;
    balance: number;
  }>();

  useEffect(() => {
    const getAssetMetadata = async () => {
      if (!provider || !signer) {
        return;
      }

      const asset = LSP7DigitalAsset__factory.connect(address, provider);

      const [nameHex, symbolHex, metadataHex] = await asset.getDataBatch([
        ERC725YDataKeys.LSP4.LSP4TokenName,
        ERC725YDataKeys.LSP4.LSP4TokenSymbol,
        ERC725YDataKeys.LSP4.LSP4Metadata,
      ]);

      const decodedUri = decodeUri(metadataHex);
      const link = uriToLink(decodedUri);

      let result;
      let fetcedMetadata;
      try {
        result = await fetch(link);
        fetcedMetadata = result.type === "cors" ? await result.json() : {};
      } catch (error) {
        console.error(error);
      }

      const signerAddress = await signer.getAddress();
      const balance = Number(await asset.balanceOf(signerAddress));

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
        balance,
      });
    };

    if (!assetMetadata) {
      getAssetMetadata();
    }
  }, [provider, signer, assetMetadata, address]);

  return (
    <div className="m-4">
      <lukso-card
        variant="basic"
        size="small"
        custom-class="rounded-24"
        is-fixed-width
      >
        <div
          slot="content"
          className="p-4 flex items-center justify-center w-64 h-32"
        >
          <lukso-profile profile-url={assetMetadata?.iconUrl} size="medium" />
          <div className="flex flex-col items-start justify-center">
            <p className="ml-2 text-purple-41 font-500 text-14">
              {assetMetadata?.name || "loading"}
            </p>
            <p className="ml-2 text-purple-41 font-500 text-14">
              {`${assetMetadata?.balance} ${assetMetadata?.symbol}` ||
                "loading"}
            </p>
          </div>
        </div>
      </lukso-card>
    </div>
  );
};

export default LSP7Asset;
