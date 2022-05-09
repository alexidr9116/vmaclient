import PropTypes from 'prop-types';
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import useAuth from "../../hook/useAuth";
import Drawer from '../../component/Drawer';
import DropdownMenu from '../../component/DropdownMenu';

import { ASSETS_URL } from '../../utils/API';


Header.propTypes = {
  dashboard: PropTypes.bool
}
const languages = {
  mn: {
    language: 'mn', icon: 'twemoji:flag-mongolia'
  },
  en: {
    language: 'en', icon: 'twemoji:flag-for-flag-united-kingdom'
  }
}
export default function Header({ dashboard = false }) {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [drawer, setDrawer] = useState();
  const [language, setLanguage] = useState(languages.mn);
  const [changePassword, setChangePassword] = useState(false);
  const handleBilling = () => {
    if (user && user !== null && user.role.includes('admin')) {
      navigate('/billing', { replace: true })
    }
    else {
      toast.error("Login with Admin or Super Admin role")
    }
  }
  const handleProfile = () => {
    if (user && user !== null) {
      navigate('/profile', { replace: true })
    }
    else {
      toast.error("You must login with mobile")
    }
  }
  const handleLanguage = (lang, i) => {
    localStorage.setItem("language", lang);
    setLanguage({ language: lang, icon: i });
    // i18n.changeLanguage(lang);
  };
  const handlePassword = () => {
    setChangePassword(true);
  }
  useEffect(() => {
    const lang = localStorage.getItem("language") || "en";
    setLanguage(lang === "en" ? languages.en : languages.mn);
  }, [])
  useEffect(() => {

  }, []);
  return (
    <div className="p-2  z-50">
      <div className="container flex justify-between  max-w-6xl">
        <Link to="/" className="mr-5">
          <img src="../../assets/logo.png" className="h-16" alt="logo" />
        </Link>

        <div className="flex items-center">
          {/* Log in Button */}
          {user === null && <>
            <Link to="/auth/login" className="btn rounded-2xl btn-outline btn-sm sm:w-32  btn-info">Login</Link>
            <div className="divider divider-horizontal h-10 my-auto" /></>
          }
          <DropdownMenu
            summary={
              <label className="flex items-center gap-2 mx-2">
                {user !== null && user.avatar && user.avatar !== '' &&
                  <img src={`${ASSETS_URL.root}${user.avatar}`} alt="avatar"
                    className="rounded-full w-10 h-10 " width={40} height={40}
                  />
                }
                {(!user || user === null || user.avatar === '') &&
                  <img src={'../../assets/avatar.jpg'} alt="avatar"
                    className="rounded-full w-10 h-10 " width={40} height={40}
                  />
                }

                <div className="hidden md:block">
                  <p className="text-sm font-bold">{user !== null ? user.name : ""}</p>
                  <p className="text-sm">{user !== null ? user.mobile : ""}</p>
                </div>
              </label>
            }
          >
            <div className="shadow bg-base-100 rounded px-2 py-1 mt-2 min-w-max last:border-none">
              <div className=' py-1'>
                <button className='btn btn-sm btn-ghost w-full justify-start gap-3' onClick={handleProfile}>
                  Profile
                </button>
              </div>
              <div className='border-t py-1'>
                <button className='btn btn-sm btn-ghost w-full justify-start gap-3' onClick={handleBilling}>
                  Billing Info
                </button>
              </div>
              {
                user && isAuthenticated && user.role.includes('admin')&&
                <div className='border-t py-1'>
                  <button className='btn btn-sm w-full btn-ghost  justify-start gap-3' onClick={() => { navigate('/admin/get-machines', { replace: true }) }}>
                    Vendor Machines
                  </button>
                </div>
              }
              {
                user && isAuthenticated &&
                <div className='py-1 border-t'>
                  <button className='btn btn-sm w-full btn-ghost  justify-start gap-3' onClick={() => {
                    logout();
                  }}>
                    Log out
                  </button>
                </div>
              }
            </div>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex shadow w-full mt-1">
        <span className="bg-gray-300 h-[1px] flex-grow" />

      </div>
      {/* drawer */}
      {dashboard && isAuthenticated &&
        <Drawer
          side="left"
          onClose={() => { setDrawer(false) }}
          open={drawer}
          className="bg-white w-[300px]"
        >

        </Drawer>
      }

    </div>
  );
}