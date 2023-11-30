import { useState } from "react";

interface Props {
  selectedToken: string;
}

const AssetMetadata: React.FC<Props> = ({ selectedToken }) => {
  const [assetMetadata, setAssetMetadata] = useState<{
    name: string;
    description: string;
    links: { title: string; url: string };
    tokenUri: string;
  }>();

  return (
    <div className="mb-4">
      <lukso-card
        variant="dapp"
        size="medium"
        background-url="images/sample-background.jpg"
      >
        <div
          slot="content"
          className="p-6 flex justify-center content-center"
        ></div>
      </lukso-card>
    </div>
  );
};

export default AssetMetadata;
