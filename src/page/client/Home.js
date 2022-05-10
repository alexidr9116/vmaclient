import { useState } from "react";
import { QrReader } from "react-qr-reader";
import { useNavigate } from "react-router-dom";
import {useTranslation} from 'react-i18next';
import Page from "../../component/Page";

export default function ClientHome() {
    const [barcode, setBarcode] = useState('');
    const [checked, setChecked] = useState(false);
    const [useCamera,setUseCamera] = useState(false);
    const {t} = useTranslation();
    const navigate = useNavigate();
    const handleResult = (result, err) => {
        if (!!result) {
            setBarcode(result?.text);
        }
        console.log(result, err)
    }
    const handleClick = () => {
        navigate(`/get-products/${barcode}`, { replace: true })
    }
    return (
        <Page title='Client Home'>
            <div className="flex flex-col items-center py-4 gap-4">
                <div className="">
                    <label className="label cursor-pointer">

                        <input type="checkbox" className="toggle toggle-accent" onChange={() => { setUseCamera(!useCamera) }} checked={useCamera} />
                        <span className="label-text mx-2">{t('home.scan_qr')} </span>
                    </label>
                </div>
                <div className="w-[320px] h-[320px] border border-stone" >
                    {useCamera &&
                        <QrReader
                            constraints={{ facingMode: (checked ? 'user' : 'environment') }}
                            key={(checked ? 'user' : 'environment')}
                            onResult={handleResult}
                            delay={500}
                            style={{ width: "100%", height: "100%" }}
                        />
                    }
                </div>
                <div className="">
                    <label className="label cursor-pointer">

                        <input type="checkbox" className="toggle toggle-accent" onChange={() => { setChecked(!checked) }} checked={checked} />
                        <span className="label-text mx-2">{checked?t('home.switch_back_camera'):t('home.switch_front_camera')}</span>
                    </label>
                </div>
                <input type="text" placeholder="QR code or ID" className="input input-bordered input-md w-full max-w-xs" value={barcode} onChange={(e) => setBarcode(e.target.value)} />
                <button className="btn  btn-outline btn-info" disabled={barcode === ''} onClick={handleClick}>{t('home.get_products')}</button>

            </div>
        </Page>
    );
}