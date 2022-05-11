import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Page from "../../component/Page";
import SearchInput from '../../component/core/SearchInput';
import Pagination from '../../component/core/Pagination';
import EditModal from './MachineEditModal';
import { API_ADMIN, ASSETS_URL, SEND_GET_REQUEST, SEND_POST_REQUEST } from '../../utils/API';
import Image from '../../component/Image';
import toast from 'react-hot-toast';
import AlertModal from '../../component/core/AlertModal';

export default function MachineList() {
    const navigate = useNavigate();
    const [owner,setOwner] = useState({});
    const [promptModal,setPromptModal] = useState(false);
    const [modal, setModal] = useState(false);
    const [id, setId] = useState("add");
    const [adminList, setAdminList] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [current, setCurrent] = useState(null);
    const [filtered, setFiltered] = useState([]);
    const handleChangeSearch = (value) => {
        setFiltered(vendors.filter((vendor) => (vendor.title.includes(value) || vendor.type.includes(value) || vendor.description.includes(value))));

    }
    const handleChangePage = () => {
    }
    const handleClose = () => {
        setModal(false)
        loadList();
    }
    const handleProduct = (vendorId) => {
        navigate(`/admin/get-products/${vendorId}`, { replace: true });
    }
    const handleEdit = (id, c) => {
        setId(id);
        setCurrent(c);
        setModal(true);
    }
    const loadList = () => {
        SEND_GET_REQUEST(API_ADMIN.getMiniVendors).then(res => {
            if (res.status === 200 && res.data && res.data.data) {
                const data = res.data.data;
                setVendors(data);
                setFiltered(data)
            }
        })

    }
    const handleChange = (value,item)=>{
        
        setOwner(value);
        setCurrent(item);
        setPromptModal(true);
    }
    const handleChangeOk = ()=>{
        SEND_POST_REQUEST(API_ADMIN.changeVendorOwner,{id:current._id, owner}).then((res)=>{
            setPromptModal(false);
            if(res.status === 200){
                setVendors((prev) => (prev.map((vendor, index) => {
                    if (vendor._id === current._id) {
                        vendor.owner = owner;
                    }
                    return vendor;
                  })));
                toast.success(res.message);
            }
            else{
                toast.error(res.message);
            }
        })
    }
    useEffect(() => {
        SEND_POST_REQUEST(API_ADMIN.admins, {}).then(res => {
            if (res.status === 200) {
                setAdminList(res.data.users);
                loadList();
            }
            else {

            }
        })

    }, [])


    return (
        <Page title='Machine Management'>
            <div className="flex w-full gap-2 flex-col ">
                <div className="flex w-full justify-center items-center">
                    <SearchInput handleChangeSearch={handleChangeSearch} />
                    <button className="btn btn-outline btn-sm btn-circle btn-error ml-2" onClick={() => {
                        setCurrent(null);
                        setModal(true);
                    }}>
                        <Icon icon="fa:plus" />
                    </button>
                </div>
                <div className='grid grid-cols-1 gap-2 px-4 sm:grid-cols-2 lg:grid-cols-3'>
                    {filtered && filtered.map((vendor, index) => (

                        <div className="card card-side bg-base-100 shadow-xl p-3" key={index}>
                            <figure><Image className="h-[200px] w-[130px]" src={`${ASSETS_URL.root}${vendor.img}`} alt="Vendor" /></figure>
                            <div className="card-body gap-0 p-3">
                                <h2 className="card-title">{vendor.title} <label className='badge badge-outline badge-info'>
                                    {vendor.type}
                                </label></h2>

                                <p>{vendor.description}.<br/>
                                
                                <select className="select select-info select-sm w-full max-w-xs" value = {vendor.owner} onChange = {(e)=>handleChange(e.target.value,vendor)}>
                                    <option disabled >Select Owner</option>
                                    {adminList.map((admin, index) => (
                                        <option key={index} value={admin._id}>{admin.firstName} {admin.lastName} - {admin.mobile}</option>
                                    ))}
                                </select>
                                </p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-info  btn-sm" onClick={() => handleProduct(`${vendor.vendorId}`)}>Products</button>
                                    <button className="btn btn-error btn-sm" onClick={() => handleEdit(`${vendor._id}`, vendor)}>Edit</button>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
                {/* <Pagination totalCount={1} handleChangePage={handleChangePage} perPageCount={10} /> */}
            </div>
            {modal &&
                <EditModal onClose={handleClose} id={id} machine={current} />
            }
            
            {promptModal &&
                <AlertModal onAccept={handleChangeOk} title={"Do you want to change this vendor's owner, really?"} description={"If you proceed this operation, the vendor's owner will be change. "} 
                onCancel = {()=>setPromptModal(false)} />
            }
        </Page>
    )
}