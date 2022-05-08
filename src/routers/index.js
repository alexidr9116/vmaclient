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
            path:'/admin',
            element:<MainLayout/>,
            children:[
                {element:<GetProducts/>, path:'get-products/:id'},
                {element:<GetMachines/>, path:'get-machines'}
            ]            

        },
        {
            path:'/',
            element:<MainLayout/>,
            children:[
                {element:<ClientHome/>, index:true},
                {element:<Products/>, path:'get-products'}
            ]            

        }
    ])
}
const ClientHome = Loadable(lazy(() => import("../page/client/Home")));
const Products = Loadable(lazy(() => import("../page/client/GetProducts")));

const GetProducts = Loadable(lazy(() => import("../page/admin/ProductList")));
const GetMachines = Loadable(lazy(() => import("../page/admin/MachineList")));