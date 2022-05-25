import { Link, useLocation, useNavigate } from "react-router-dom";

export default function TabMenu({ routers = [] }) {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    return (
        <div className="flex w-full gap-4">
            {
                routers.map((router, index) => (
                    <Link to={router.path} key={index}>
                        <div className={`flex gap-2  font-bold text-lg pb-3 px-2 ${(pathname === router.path) ? 'border-b-2 border-accent' : ''}`}><img src = {`${router.icon}`} alt=""/> {router.value}</div>
                    </Link>
                ))
            }

        </div>
    )
}