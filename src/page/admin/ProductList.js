import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useParams } from 'react-router-dom';
import Page from "../../component/Page";
import SearchInput from '../../component/core/SearchInput';
import Pagination from '../../component/core/Pagination';
import EditModal from './ProductEditModal';
import TextMaxLine from '../../component/core/TextMaxLine';
import Image from '../../component/Image';


export default function ProductList() {
    const {id}= useParams();
    const [modal, setModal] = useState(false);
    const handleChangeSearch = () => {


    }
    const handleChangePage = () => {

    }
    const handleClose = () => {
        setModal(false)
    }
    return (
        <Page title='Machine Management'>
            <div className="flex w-full gap-2 flex-col">
                <div className="flex w-full justify-center items-center">
                    <SearchInput handleChangeSearch={handleChangeSearch} />
                    <button className="btn btn-outline btn-sm btn-circle btn-error ml-2" onClick={() => setModal(true)}>
                        <Icon icon="fa:plus" />
                    </button>
                </div>
                <div className='grid grid-cols-2 gap-2 px-4 sm:grid-cols-4 md:grid-cols-6'>
                    <div className="card w-full bg-base-100 shadow-xl">
                        <figure><Image src="https://api.lorem.space/image/shoes?w=200&h=100" alt="Shoes" /></figure>
                        <div className="card-body p-2 text-center">
                            <TextMaxLine maxLine={1}>
                            Product Name & Unit
                            </TextMaxLine>
                            <p>$120</p>
                            
                        </div>
                    </div>
                    <div className="card w-full bg-base-100 shadow-xl">
                        <figure><Image src="https://api.lorem.space/image/shoes?w=200&h=100" alt="Shoes" /></figure>
                        <div className="card-body p-2 text-center">
                            <label >
                            Product Name 
                            </label>
                            <p>$120</p>
                            
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