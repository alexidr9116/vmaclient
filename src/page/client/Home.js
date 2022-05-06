import { useState } from "react";
import {QrReader}  from "react-qr-reader";
import { useNavigate } from "react-router-dom";
import Page from "../../component/Page";

export default function ClientHome() {
    const [barcode,setBarcode]= useState('');
    const [checked,setChecked] = useState(false);
    const navigate = useNavigate();
    const handleResult = (result,err)=>{
        if(!!result){
            setBarcode(result?.text);
        }
        console.log(result, err)
    }
    const handleClick = ()=>{
        navigate('/get-products',{replace:true})
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
                <button className="btn  btn-outline btn-info" disabled={barcode===''} onClick = {handleClick}>Get Products</button>
                
            </div>
        </Page>
    );
}