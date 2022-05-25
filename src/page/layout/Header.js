import { useLocation, Link, useNavigate } from "react-router-dom";
import GradientButton from "../../component/GradientButton";
import TabMenu from "./TabMenu";

const ROUTERS = [
  {
    value: "Token Staking",
    path: "/token-staking",
    icon:'./assets/token.svg',
  },
  {
    value: "NFT Staking",
    path: "/nft-staking",
    icon:'./assets/nft.svg',
  }
]

export default function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <div className="  z-50 bg-bg-2 border-b border-stone-300">
      <div className="container flex  max-w-7xl w-full justify-between px-2">
        <div className="flex ">
          {/* logo */}
          <Link to="/" className="mr-5 ">
            <div className='flex items-center gap-2'><img src="./assets/logo.svg" className="h-16 w-32" alt="logo" /></div>
          </Link>

          {/* menu */}
          <div className='hidden md:flex items-end  justify-start' >
            <TabMenu routers={ROUTERS} />
          </div>
        </div>
        <div className="flex items-center">
          <GradientButton text={'Connect Wallet'} />
        </div>
      </div>

    </div>
  );
}