import { Icon } from "@iconify/react";
import { forwardRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Image from "../../component/Image";
import Page from "../../component/Page";

import { API_ADMIN, ASSETS_URL, SEND_DELETE_REQUEST,  SEND_POST_REQUEST } from "../../utils/API";
import Accordion from '../../component/Accordion';

import Pagination from "../../component/core/Pagination";
import SearchInput from "../../component/core/SearchInput";
import AlertModal from "../../component/core/AlertModal";

import toast from "react-hot-toast";
export default function UsersList() {

  const [users, setUsers] = useState([]);
  const [current, setCurrent] = useState({});
  const [filtered, setFiltered] = useState([]);
  const { t } = useTranslation();
  const [prompt, setPrompt] = useState(false);
  const [promptTitle, setPromptTitle] = useState("");
  const [promptActive, setPromptActive] = useState(false);
  const pagePerCount = 10;
  useEffect(() => {
    SEND_POST_REQUEST(API_ADMIN.users, {}).then(res => {
      if (res.status === 200) {
        const list = res.data.users;

        setUsers(list);
        setFiltered(list.slice(0, Math.min(pagePerCount, list.length)))
      }
    });

  }, [])
  const handleChangeSearch = (text) => {
    setFiltered(users.filter((user) => (user.mobile.includes(text) || user.email.includes(text) || user.firstName.includes(text) || user.lastName.includes(text))));
  }
  const handleChangePage = (index) => {
    setFiltered(users.slice((index - 1) * pagePerCount, Math.min((index) * pagePerCount, users.length)));
  }
  const handleActiveOk = () => {
    SEND_POST_REQUEST(API_ADMIN.changeUserStatus,{id:current._id}).then(res=>{
      if(res.status === 200){
        toast.success(res.message);
        setUsers((prev) => (prev.map((user, index) => {
          if (user._id === current._id) {
            user.status = (user.status === "active" ? "inactive" : "active");
          } 
          return user;
        })));
      }
      else{
        toast.error(res.message);
      }
      setPromptActive(false);
    });
    

  }
  const handleActive = (user, index) => {
    setCurrent(user);
    setPromptActive(true);
    setPromptTitle("Do you want to change this user's status, really?")
  }
  const handleRemove = (user, index) => {
    setCurrent(user);
    setPrompt(true);
    setPromptTitle("Do you want to delete this user from system, really?")
  }
  const handleRemoveOk = () => {

    SEND_DELETE_REQUEST(API_ADMIN.removeUser,current._id).then(res=>{
      if(res.status === 200){
        toast.success(res.message);
        setUsers((prev) => (prev.filter(user=> user._id!==current._id)));
      }
      else{
        toast.error(res.message);
      }
      setPrompt(false);
    });
  }
  return (
    <Page title='UserManagement'>
      {/* Date chooser */}

      <div className="container p-2">
        <div className="flex w-full justify-center">
          <SearchInput handleChangeSearch={handleChangeSearch} />
          
        </div>
        <div className="divider" />
        {filtered.length === 0 && <div className="text-center p-4 text-lg">No Users Found</div>}
        {filtered.map((user, index) => {

          return (
            <Accordion
              key={index}
              summaryClassName=""
              className="shadow-sm mb-1"
              prepend={
                <Icon icon={'fa6-solid:user'} width={20} className="text-sky-400" />
              }
              title={

                <div className="flex justify-between  w-full   items-center">
                  <div>
                    <p className="text-xl font-bold text-stone-700">
                      {user.email}
                    </p>
                    <p className="whitespace-nowrap text-sky-400"> {user.mobile}</p>
                  </div>
                  <div className="mb-2">
                    {user.status === "active" && <label className="badge badge-info text-white">{user.status}</label>}
                    {user.status !== "active" && <label className="badge badge-error whitespace-nowrap  text-white">{user.status}</label>}
                  </div>
                </div>

              }
            >
              <div className="flex gap-2 w-full p-2 justify-between">

                <Image effect="blur" src={`${ASSETS_URL.root}${user.avatar}`} height={70} width={70} />
                <div className="flex flex-col">
                  <label className="first-letter:uppercase">{user.firstName} {user.lastName}</label>
                  <label className="first-letter:uppercase">{user.address}</label>
                  <label className="first-letter:uppercase">{user.mobile}</label>
                </div>
                <div className="flex flex-col">
                  <label className="label cursor-pointer">
                    <input type="checkbox" className="toggle toggle-accent" onChange={() => handleActive(user, index)} checked={user.status === "active"} />
                    <span className="label-text mx-2">{t("words.active")} </span>
                  </label>
                  <button className="btn btn-outline btn-error btn-sm" onClick = {()=>handleRemove(user,index)}>{t("words.remove")}</button>
                </div>
              </div>
            </Accordion>
          )
        })}
        {filtered.length > 0 &&
          <Pagination totalCount={users.length} handleChangePage={handleChangePage} perPageCount={pagePerCount} />
        }
        {promptActive &&
          <AlertModal onAccept={handleActiveOk} title={promptTitle} description={"If you proceed this operation, the user status will be change from db. "}
            onCancel={() => setPromptActive(false)} />
        }
        {prompt &&
          <AlertModal onAccept={handleRemoveOk} title={promptTitle} description={"If you proceed this operation, the user data will be remove from db. "}
            onCancel={() => setPrompt(false)} />
        }
      </div>
    </Page>
  )
}