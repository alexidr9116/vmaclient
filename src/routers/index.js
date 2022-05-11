import { lazy, Suspense } from 'react';
import {useRoutes} from 'react-router-dom';
import LoadingScreen from '../component/custom/LoadingScreen';
import MainLayout from '../page/layout/MainLayout';
import AuthGuard from "../guard/Auth";
import AdminGuard from "../guard/Admin";
import SuperAdminGuard from "../guard/SuperAdmin";
import GuestGuard from "../guard/Guest";
import UsersList from '../page/admin/UsersList';

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
            element:<AdminGuard><MainLayout/></AdminGuard>,
            children:[
                {element:<GetProducts/>, path:'get-products/:vendorId'},
                {element:<GetMachines/>, path:'get-machines'},
                {element:<SuperAdminGuard><UsersList/></SuperAdminGuard>, path:'users'}
            ]            

        },
        {
            path:'/auth',
            element:<MainLayout/>,
            children:[
                {element:<GuestGuard><Login /></GuestGuard>, index:true},
                
                {element:<GuestGuard><Login /></GuestGuard>, path:'login'},
                {element:<GuestGuard><VerifyOTP /></GuestGuard>, path:'verify-otp'}
            ]            

        },
        {
            path:'/',
            element:<MainLayout/>,
            children:[
                {element:<ClientHome/>, index:true},
                {element:<AuthGuard><AdminDashboard/></AuthGuard>, path:'dashboard'},
                {element:<Products/>, path:'get-products/:vendorId'},
                {element:<TakeProduct/>, path:'take-product/:invoice'},
                {element:<AuthGuard><Profile/></AuthGuard>, path:'profile'},
                {element:<AuthGuard><Billing/></AuthGuard>, path:'billing'}
            ]            

        }
    ])
}

const Login = Loadable(lazy(() => import("../page/auth/Login")));
const VerifyOTP = Loadable(lazy(() => import("../page/auth/VerifyOTP")));
const Profile = Loadable(lazy(() => import("../page/Profile")));
const Billing = Loadable(lazy(() => import("../page/BillingInfo")));
const ClientHome = Loadable(lazy(() => import("../page/client/Home")));
const Products = Loadable(lazy(() => import("../page/client/GetProducts")));
const TakeProduct = Loadable(lazy(() => import("../page/client/TakeProduct")));
const AdminDashboard = Loadable(lazy(() => import("../page/admin/Dashboard")));
const Users = Loadable(lazy(() => import("../page/admin/UsersList")));
const GetProducts = Loadable(lazy(() => import("../page/admin/ProductList")));
const GetMachines = Loadable(lazy(() => import("../page/admin/MachineList")));
