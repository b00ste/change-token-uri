import { Link } from "react-router-dom";

interface Props {
  setError: React.Dispatch<React.SetStateAction<JSX.Element | undefined>>;
}

const Navbar: React.FC<Props> = ({ setError }) => {
  return (
    <lukso-navbar
      logo-url="assets/images/up-logo.png"
      title={`LSP7&LSP8\nMANAGER`}
      has-menu
    >
      <div slot="desktop" className="flex flex-row">
        <Link to="/">
          <lukso-button custom-class="mr-2" variant="landing">
            Home
          </lukso-button>
        </Link>
        <Link to="/deploy-lsp7">
          <lukso-button custom-class="mx-2" variant="landing">
            Deploy LSP7
          </lukso-button>
        </Link>
        <Link to="/deploy-lsp8">
          <lukso-button custom-class="mx-2" variant="landing">
            Deploy LSP8
          </lukso-button>
        </Link>
        <Link to="/issued-assets">
          <lukso-button custom-class="mx-2" variant="landing">
            Issued Assets
          </lukso-button>
        </Link>
      </div>
      <div slot="mobile">
        <div className="flex flex-col items-center justify-center h-screen pb-32">
          <Link to="/">
            <lukso-button custom-class="my-2" variant="landing">
              Home
            </lukso-button>
          </Link>
          <Link to="/deploy-lsp7">
            <lukso-button custom-class="my-2" variant="landing">
              Deploy LSP7
            </lukso-button>
          </Link>
          <Link to="/deploy-lsp8">
            <lukso-button custom-class="my-2" variant="landing">
              Deploy LSP8
            </lukso-button>
          </Link>
          <Link to="/issued-assets">
            <lukso-button custom-class="my-2" variant="landing">
              Issued Assets
            </lukso-button>
          </Link>
        </div>
      </div>
    </lukso-navbar>
  );
};

export default Navbar;
