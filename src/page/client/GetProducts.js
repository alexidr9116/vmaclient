import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { useParams } from 'react-router-dom';
import Page from "../../component/Page";
import SearchInput from '../../component/core/SearchInput';
import Pagination from '../../component/core/Pagination'; 
import TextMaxLine from '../../component/core/TextMaxLine';
import Image from '../../component/Image';
import { API_ADMIN, API_CLIENT, ASSETS_URL, SEND_GET_REQUEST } from '../../utils/API';

export default function GetProducts() {
    const { vendorId } = useParams();
    const [current, setCurrent] = useState(null);
    const [filtered, setFiltered] = useState([]);
    const [products, setProducts] = useState([]);
    const [modal, setModal] = useState(false);
    const handleChangeSearch = () => {


    }
    const handleEdit = (product) => {
        setCurrent(product)
        setModal(true);
    }
    const handleChangePage = () => {

    }
    const handleClose = () => {
        setModal(false)
        loadList();
    }
    const loadList = () => {
        if (vendorId)
            SEND_GET_REQUEST(`${API_CLIENT.getProducts}${vendorId}`).then(res => {
                console.log(res)
                if (res.status === 200 && res.data && res.data.data) {
                    const data = res.data.data;
                    setProducts(data)
                    setFiltered(data)
                }

            })
    }
    useEffect(() => {
        loadList();
    }, [])
    return (
        <Page title='Machine Management'>
            <div className="flex w-full gap-2 flex-col">
                <div className="flex w-full justify-center items-center">
                    <SearchInput handleChangeSearch={handleChangeSearch} />
                    <button className="btn btn-outline btn-sm btn-circle btn-error ml-2" onClick={() => {
                        setCurrent(null);
                        setModal(true);
                    }}>
                        <Icon icon="fa:plus" />
                    </button>
                </div>
                <div className='grid grid-cols-2 gap-2 px-4 sm:grid-cols-4 md:grid-cols-6'>
                    {
                        filtered.map((product, index) => {
                            return (

                                <div className="card w-full bg-base-100 shadow-xl" key={index} onClick={() => handleEdit(product)}>
                                    <figure>
                                        {product.status === 0 &&
                                            <Image className="max-h-[130px]" src={`${ASSETS_URL.image}empty.jpg`} alt="Product" />
                                        }
                                        {product.status === 1 &&
                                            <Image className="max-h-[130px]" src={`${ASSETS_URL.root}${product.img}`} alt="Product" />
                                        }
                                    </figure>
                                    <div className={`card-body p-1 text-center ${product.status === 0 ? 'text-stone-400' : 'text-black'}`}>
                                        <TextMaxLine maxLine={1}>
                                            {product.title}
                                        </TextMaxLine>
                                        <p>${product.price}</p>
                                        <div className='w-full'>
                                            <label className="badge badge-info badge-outline">Slot Index:{product.index}</label>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <Pagination totalCount={1} handleChangePage={handleChangePage} perPageCount={10} />
            </div>
         </Page>
    )
}