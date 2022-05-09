import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Page from "../../component/Page";
import SearchInput from '../../component/core/SearchInput';
import Pagination from '../../component/core/Pagination';
import EditModal from './MachineEditModal';
import { API_ADMIN, ASSETS_URL, SEND_GET_REQUEST, SEND_POST_REQUEST } from '../../utils/API';
import Image from '../../component/Image';
 
export default function MachineList() {
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const [id,setId] = useState("add");
    const [vendors, setVendors] = useState([]);
    const [current,setCurrent] = useState(null);
    const [filtered, setFiltered] = useState([]);
    const handleChangeSearch = () => {


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
    const handleEdit = (id,c) => {
        setId(id);
        setCurrent(c);
        setModal(true);
    }
    const loadList = ()=>{
        SEND_GET_REQUEST(API_ADMIN.getMiniVendors).then(res => {
            if (res.status === 200 && res.data && res.data.data) {
                const data = res.data.data;
                setVendors(data);
                setFiltered(data)
            }
        })
    }
    useEffect(() => {
        loadList();
    },[])
    return (
        <Page title='Machine Management'>
            <div className="flex w-full gap-2 flex-col ">
                <div className="flex w-full justify-center items-center">
                    <SearchInput handleChangeSearch={handleChangeSearch} />
                    <button className="btn btn-outline btn-sm btn-circle btn-error ml-2" onClick={() =>  {
                        setCurrent(null);
                        setModal(true);
                    }}>
                        <Icon icon="fa:plus" />
                    </button>
                </div>
                <div className='grid grid-cols-1 gap-2 px-4 sm:grid-cols-2 lg:grid-cols-3'>
                    {filtered && filtered.map((vendor, index) => (

                        <div className="card card-side bg-base-100 shadow-xl p-3" key = {index}>
                            <figure><Image className="h-[200px] w-[130px]"  src={`${ASSETS_URL.root}${vendor.img}`} alt="Vendor" /></figure>
                            <div className="card-body gap-0 p-3">
                                <h2 className="card-title">{vendor.title}</h2>
                                <p>{vendor.description}.</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-info  btn-sm" onClick={() => handleProduct(`${vendor.vendorId}`)}>Products</button>
                                    <button className="btn btn-error btn-sm" onClick = {()=>handleEdit(`${vendor._id}`, vendor)}>Edit</button>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
                <Pagination totalCount={1} handleChangePage={handleChangePage} perPageCount={10} />
            </div>
            {modal &&
                <EditModal onClose={handleClose} id = {id} machine = {current}/>
            }
        </Page>
    )
}