import { Suspense, useContext, useEffect, useState } from "react";

// context
import { BrowserExtensionContext } from "../App";
import { Log, concat, keccak256, toUtf8Bytes } from "ethers";
import { LSP1_TYPE_IDS } from "@lukso/lsp-smart-contracts";
import { getMetadata } from "../helpers/utils";

export type TypeIdName = keyof typeof LSP1_TYPE_IDS;

// Component should be showed only after user connected with browser extansion
const UniversalReceiverLogs: React.FC = () => {
  const { signer, provider } = useContext(BrowserExtensionContext);

  const [unviersalReceiverLogs, setUnviersalReceiverLogs] = useState<Log[]>();
  const [currentPage, setCurrentPage] = useState<number>(0);

  // fetch `LSP5ReceivedAssets[]`
  useEffect(() => {
    const fetchUnviersalReceiverLogs = async () => {
      if (!signer || !provider) {
        return;
      }

      const unviersalReceiverTopic = keccak256(
        toUtf8Bytes("UniversalReceiver(address,uint256,bytes32,bytes,bytes)")
      );

      // const provider = new JsonRpcProvider("https://rpc.mainnet.lukso.network");
      const signerAddress = await signer.getAddress();
      const currentBlock = await provider.getBlockNumber();

      const logs = await provider.getLogs({
        fromBlock: 0,
        toBlock: currentBlock,
        topics: [unviersalReceiverTopic],
        address: signerAddress,
      });
      console.log(logs);

      setUnviersalReceiverLogs(
        logs.sort(
          ({ blockNumber: blockNumber1 }, { blockNumber: blockNumber2 }) =>
            blockNumber2 - blockNumber1
        )
      );
    };

    if (!unviersalReceiverLogs) {
      fetchUnviersalReceiverLogs();
    }
  }, [signer, provider, unviersalReceiverLogs]);

  const getTransactionRow = ({ topics, transactionHash }: Log) => {
    if (!provider) {
      return <></>;
    }

    const from = `0x${topics[1].substring(26, 66)}`;
    const value = Number.parseFloat(BigInt(topics[2]).toString()) / 10 ** 18;
    const typeId = Object.getOwnPropertyNames(LSP1_TYPE_IDS).filter(
      (typeId) => LSP1_TYPE_IDS[typeId as TypeIdName] === topics[3]
    );

    let name;
    let imageUrl;
    getMetadata(from, provider).then((result) => {
      console.log(result);
      name = result.name;
      imageUrl = result?.imageUrl;
    });

    return (
      <div key={keccak256(concat([transactionHash, ...topics]))}>
        <lukso-profile
          size="small"
          profile-url={imageUrl}
          profile-address={from}
          has-identicon
        />
        <lukso-username name={name} address={from} />
        <p>{`From: 0x${from}`}</p>
        <p>{`Value: ${value} LYX`}</p>
        <p>{`Type ID: ${typeId}`}</p>
      </div>
    );
  };

  return (
    <Suspense>
      {signer ? (
        <div>
          <p className="w-screen text-start m-4 font-600 text-24">
            Unviersal Receiver Logs
          </p>
          <div className="flex flex-row justify-between">
            {currentPage === 0 ? (
              <lukso-button
                onClick={() =>
                  currentPage !== 0 ? setCurrentPage(currentPage - 1) : null
                }
                disabled
              >
                Previus Page
              </lukso-button>
            ) : (
              <lukso-button
                onClick={() =>
                  currentPage !== 0 ? setCurrentPage(currentPage - 1) : null
                }
              >
                Previus Page
              </lukso-button>
            )}
            {currentPage === (unviersalReceiverLogs?.length || 0) / 50 ? (
              <lukso-button
                onClick={() =>
                  currentPage !== (unviersalReceiverLogs?.length || 0) / 50
                    ? setCurrentPage(currentPage + 1)
                    : null
                }
                disabled
              >
                Next Page
              </lukso-button>
            ) : (
              <lukso-button
                onClick={() =>
                  currentPage !== (unviersalReceiverLogs?.length || 0) / 50
                    ? setCurrentPage(currentPage + 1)
                    : null
                }
              >
                Next Page
              </lukso-button>
            )}
          </div>
          <>
            {unviersalReceiverLogs
              ?.slice(currentPage * 50, currentPage * 50 + 50)
              .map((log) => getTransactionRow(log))}
          </>
        </div>
      ) : (
        <></>
      )}
    </Suspense>
  );
};

export default UniversalReceiverLogs;
