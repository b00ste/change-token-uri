import { concat, isAddress, toBeHex, toNumber } from "ethers";
import React, {
  Suspense,
  useContext,
  useEffect,
  useState,
  Fragment,
} from "react";
import { ERC725YDataKeys, INTERFACE_IDS } from "@lukso/lsp-smart-contracts";

// types
import { ERC725Y, ERC725Y__factory } from "../types";

// context
import { BrowserExtensionContext } from "../App";

// components
import LSP7Asset from "../components/LSP7Asset";
import LSP8Asset from "../components/LSP8Asset";
import {
  lsp7_0_12_1_interface_id,
  lsp8_0_12_1_interface_id,
} from "../helpers/constants";

interface Props {
  setError: React.Dispatch<React.SetStateAction<JSX.Element | undefined>>;
}

// Component should be showed only after user connected with browser extansion
const ReceivedAssets: React.FC<Props> = ({ setError }) => {
  const { signer } = useContext(BrowserExtensionContext);

  const [receivedAssets, setReceivedAssets] =
    useState<{ address: string; interfaceId: string }[]>();

  // fetch `LSP5ReceivedAssets[]`
  useEffect(() => {
    const fetchReceivedAssets = async () => {
      if (!signer) {
        return;
      }

      const signerAddress = await signer.getAddress();
      const erc725y = new ERC725Y__factory()
        .attach(signerAddress)
        .connect(signer) as ERC725Y;

      const receivedAssetsCountHex = await erc725y.getData(
        ERC725YDataKeys.LSP5["LSP5ReceivedAssets[]"].length
      );

      const receivedAssetsCount =
        receivedAssetsCountHex === "0x" ? 0 : toNumber(receivedAssetsCountHex);

      const newReceivedAssets: { address: string; interfaceId: string }[] = [];
      for (let index = 0; index < receivedAssetsCount; index++) {
        const receivedAsset = await erc725y.getData(
          concat([
            ERC725YDataKeys.LSP5["LSP5ReceivedAssets[]"].index,
            toBeHex(index, 16),
          ])
        );

        const assetMap = await erc725y.getData(
          concat([ERC725YDataKeys.LSP5.LSP5ReceivedAssetsMap, receivedAsset])
        );

        const interfaceId =
          assetMap.length > 10 ? assetMap.substring(0, 10) : "0x00000000";

        if (isAddress(receivedAsset)) {
          newReceivedAssets.push({ address: receivedAsset, interfaceId });
        }
      }

      setReceivedAssets(newReceivedAssets);
    };

    if (signer) {
      fetchReceivedAssets();
    }
  }, [signer]);

  return (
    <Suspense>
      {signer ? (
        <>
          <p className="w-screen text-start m-4 font-600 text-24">
            Recieved Tokens
          </p>
          <div className="flex flex-wrap justify-center">
            {receivedAssets
              ?.filter(({ interfaceId }) =>
                [
                  INTERFACE_IDS.LSP7DigitalAsset,
                  lsp7_0_12_1_interface_id,
                ].includes(interfaceId)
              )
              .map(({ address }) => (
                <Fragment key={address}>
                  <LSP7Asset address={address} />
                </Fragment>
              ))}
          </div>
          <p className="w-screen text-start m-4 font-600 text-24">
            Recieved Collectibles
          </p>
          <div className="flex flex-wrap justify-center">
            {receivedAssets
              ?.filter(({ interfaceId }) =>
                [
                  INTERFACE_IDS.LSP8IdentifiableDigitalAsset,
                  lsp8_0_12_1_interface_id,
                ].includes(interfaceId)
              )
              .map(({ address, interfaceId }) => (
                <Fragment key={address}>
                  <LSP8Asset address={address} />
                </Fragment>
              ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </Suspense>
  );
};

export default ReceivedAssets;
