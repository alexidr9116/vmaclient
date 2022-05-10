import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom'
import TextMaxLine from '../../component/core/TextMaxLine';
import Image from '../../component/Image';
import Page from '../../component/Page'
import { API_CLIENT, ASSETS_URL, SEND_GET_REQUEST } from '../../utils/API';

export default function TakeProduct() {
    const { invoice } = useParams();
    const [history, setHistory] = useState({});
    const [vendor, setVendor] = useState({});
    useEffect(() => {
        SEND_GET_REQUEST(`${API_CLIENT.getPayHistory}${invoice}`).then(res => {
            if (res.status === 200) {
                console.log(res.data);
                setVendor(res.data.vendor);
                setHistory(res.data.history);
            }
            else {
                toast.error(res?.message || "Received error from system");
            }
        })
    }, [invoice])
    return (
        <Page title="Take Product">
            <div className="flex flex-col gap-2 w-full text-center p-4 items-center">

                <div className="card w-full bg-base-100 shadow-xl sm:w-[400px]" >
                    <label className='text-lg'>VendorID: {vendor?.vendorId}</label>
                    <label className='text-sm text-stone-500'>VendorType: {vendor?.type}</label>
                    <figure>
                        {history?.product?.status === 0 &&
                            <Image alt={`product`} className="h-[130px] max-w-[350px]" src={`${ASSETS_URL.image}empty.jpg`} />
                        }
                        {history?.product?.status === 1 &&
                            <Image alt={`product`} className="h-[130px] max-w-[350px]" src={`${ASSETS_URL.root}${history?.product?.img}`} />
                        }


                    </figure>

                    <div className={`card-body p-1 text-center ${history?.product?.status === 0 ?
                        'text-stone-400' : 'text-black'}`}>
                        <div className='w-full'>
                            <label className="badge badge-error badge-outline ">Slot Index:{history?.product?.index}</label>
                        </div>
                        <TextMaxLine maxLine={1}>
                            {history?.productName}
                        </TextMaxLine>
                        <p className='text-stone-500'>${history?.cost}</p>

                        <div className='w-full mb-2'>
                            <button className='btn btn-info btn-sm rounded-md btn-outline' disabled={(history?.status !== "paid")} onClick={() => { }}>Get Product</button>
                        </div>

                    </div>
                </div>
            </div>
        </Page>
    )
}