import { useState } from "react";
import {QrReader}  from "react-qr-reader";
import Page from "../../component/Page";

export default function ClientHome() {
    const [barcode,setBarcode]= useState('');
    const [checked,setChecked] = useState(false);
    const handleResult = (result,err)=>{
        console.log(result, err)
    }
    return (
        <Page title='Client Home'>
            <div className="flex flex-col items-center py-4 gap-4">
                <div className="">
                    <label className="label cursor-pointer">
                    
                        <input type="checkbox" className="toggle toggle-accent" onChange={() => {setChecked(!checked) }} checked={checked} />
                        <span className="label-text mx-2">Use Front Camera </span>
                    </label>
                </div>
                <div className="w-[320px] h-[320px] border border-stone" >
                    <QrReader 
                        constraints={{facingMode:(checked?'user':'environment')}}
                        key = {(checked?'user':'environment')}
                        onResult={handleResult}
                        delay = {500}
                        style = {{width:"100%",height:"100%"}}
                    />
                </div>
                <input type="text" placeholder="QR code or ID" className ="input input-bordered input-md w-full max-w-xs"  value = {barcode} onChange = {(e)=>setBarcode(e.target.value)} />
                <button className="btn  btn-outline btn-info" disabled={barcode===''}>Get Products</button>
                
            </div>
        </Page>
    );
}