import { lazy, Suspense } from 'react';
import {useRoutes} from 'react-router-dom';
import LoadingScreen from '../component/custom/LoadingScreen';
import MainLayout from '../page/layout/MainLayout';

const Loadable = (Component)=>(props)=>
{
    return (
        <Suspense fallback = {<LoadingScreen />}>

            <Component {...props} />
        </Suspense>
    )
}
export default function Router(){
    return useRoutes([
        {
            path:'/',
            element:<MainLayout/>,
            children:[
                {element:<ClientHome/>, index:true},
                {element:<GetProducts/>, path:'get-products'}
            ]            

        }
    ])
}
const ClientHome = Loadable(lazy(() => import("../page/client/Home")));
const GetProducts = Loadable(lazy(() => import("../page/client/GetProducts")));