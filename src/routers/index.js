import { lazy, Suspense } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';

import ClientLayout from '../page/layout/ClientLayout';

const Spiner = () => {
    return (<div className="flex justify-center items-center">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
            <span className="visually-hidden"></span>
        </div>
    </div>)
}
const Loadable = (Component) => (props) => {
    return (
        <Suspense fallback={<Spiner />}>
            <Component {...props} />
        </Suspense>
    )
}
export default function Router() {
    return useRoutes([

        {
            path: '/',
            element: <ClientLayout />,
            children: [
                { element: <TokenStaking />, index: true },
                { element: <TokenStaking />, path: 'token-staking' },
                { element: <TokenStaking />, path: 'nft-staking' },
            ]

        },
        // // Main Routes
        {
            path: '*',
            element: <ClientLayout />,
            children: [
            ],
        },
    ])
}
const ClientHome = Loadable(lazy(() => import("../page/client/Home")));
const TokenStaking = Loadable(lazy(() => import("../page/client/TokenStaking")));
