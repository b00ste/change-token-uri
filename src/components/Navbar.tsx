import { PropsWithChildren } from "react";

interface Props {
  setError: React.Dispatch<React.SetStateAction<JSX.Element | undefined>>;
}

const Navbar: React.FC<PropsWithChildren<Props>> = ({ setError, children }) => {
  return (
    <lukso-navbar
      logo-url="assets/images/up-logo.png"
      title={`LSP7&LSP8\nMANAGER`}
      has-menu
    >
      <div slot="desktop" className="flex flex-row">
        {children}
      </div>
      <div slot="mobile">
        <div className="flex flex-col items-center justify-center h-screen pb-32">
          {children}
        </div>
      </div>
    </lukso-navbar>
  );
};

export default Navbar;
