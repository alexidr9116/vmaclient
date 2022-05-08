import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Page from "../../component/Page";
import SearchInput from '../../component/core/SearchInput';
import Pagination from '../../component/core/Pagination';
import EditModal from './MachineEditModal';

const id = '1234';
export default function MachineList() {
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const handleChangeSearch = () => {


    }
    const handleChangePage = () => {

    }
    const handleClose = () => {
        setModal(false)
    }
    const handleProduct = (id)=>{
        navigate(`/admin/get-products/${id}`,{replace:true});
    }
    return (
        <Page title='Machine Management'>
            <div className="flex w-full gap-2 flex-col ">
                <div className="flex w-full justify-center items-center">
                    <SearchInput handleChangeSearch={handleChangeSearch} />
                    <button className="btn btn-outline btn-sm btn-circle btn-error ml-2" onClick={() => setModal(true)}>
                        <Icon icon="fa:plus" />
                    </button>
                </div>
                <div className='grid grid-cols-1 gap-2 px-4 sm:grid-cols-2 md:grid-cols-3'>
                    <div className="card card-side bg-base-100 shadow-xl p-3">
                        <figure><img src="https://api.lorem.space/image/movie?w=200&h=280" alt="Movie" /></figure>
                        <div className="card-body gap-0 p-3">
                            <h2 className="card-title">New movie is released!</h2>
                            <p>Click the button to watch on Jetflix app.</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-info  btn-sm" onClick={()=>handleProduct(`${id}`)}>Products</button>
                                <button className="btn btn-error btn-sm">Edit</button>
                            </div>
                        </div>
                    </div>

                </div>
                <Pagination totalCount={1} handleChangePage={handleChangePage} perPageCount={10} />
            </div>
            {modal &&
                <EditModal onClose={handleClose} />
            }
        </Page>
    )
}