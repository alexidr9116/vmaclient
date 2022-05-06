import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
 

export default function MainLayout(){
    return (
        <main className='max-w-md px-auto container'>
            <Header />
            <Outlet />
            <Footer />
        </main>
    );
}