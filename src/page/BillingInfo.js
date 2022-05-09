import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../hook/useAuth";
import { useEffect, useMemo } from "react";
import toast from 'react-hot-toast';
import Page from '../component/Page'; 
import { API_BILLING, SEND_POST_REQUEST, SEND_PUT_REQUEST } from "../utils/API";
import LoadingScreen from '../component/custom/LoadingScreen';

export default function BillingInfo() {
    const { user } = useAuth();
    const [checked,setChecked] = useState((user?.role.includes("admin")));
    const [loading,setLoading] = useState(false);
  
    const defaultValues = useMemo(() => ({
      
        invoiceAlias: user?.invoiceAlias || "",
        payUsername: user?.payUsername || "",
        payPassword: user?.payPassword || "",
        payPassphrase: user?.payPassphrase || "",

    }), [user]);
    const { register, reset, handleSubmit, setValue, watch, formState: { isSubmitting } } = useForm(defaultValues);

    const onSubmit = (data) => {
        setLoading(true)
        SEND_POST_REQUEST(API_BILLING.saveBillingInfo,{...data,role:"admin"}).then(res=>{
            setLoading(false);
            if(res.status === 200){
                toast.success(res.message);
            }
            else{
                toast.error(res.message);
            }
        });

    }
    useEffect(() => {
        if (user)
            reset(defaultValues);
    }, [user, defaultValues, reset]);

    return (
        <Page title={`Billing Info`}>
            <div className="container px-5 py-8 text-gray-700">
                <p className=" font-bold text-2xl mb-5"> {`Billing Info (admin only)`}</p>
                <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-5 rounded-2xl shadow-lg bg-white">

                    <div className=" md:col-span-2   p-6 gap-3">

                        <div className="w-full">
                            <label className="label cursor-pointer">
                                <span className="label-text mx-2">work with admin</span>
                                <input type="checkbox" className="toggle toggle-accent" onChange={() => {setChecked(!checked) }} checked={checked} />
                            </label>
                        </div>
                        <div className="grid md:grid-cols-2 gap-5 mb-5">
                            
                            <div className="w-full">
                                <p className="font-bold text-sm pl-2"> {`Username`}</p>
                                <input className="input h-10 border border-stone-300 w-full" disabled={!checked} required
                                    {...register("payUsername")} />
                            </div>
                            <div className="w-full">
                                <p className="font-bold text-sm pl-2"> {`Password`}</p>
                                <input className="input h-10 border border-stone-300 w-full "
                                    {...register("payPassword")}   disabled={!checked} />
                            </div>
                            <div className="w-full">
                                <p className="font-bold text-sm pl-2"> {`InvoiceAlias`}</p>
                                <input className="input h-10 border border-stone-300 w-full" required  disabled={!checked} 
                                    {...register("invoiceAlias")} />
                            </div>
                            <div className="w-full">
                                <p className="font-bold text-sm pl-2"> {`Passphrase`}</p>
                                <input className="input h-10 border border-stone-300 w-full" required  disabled={!checked} 
                                    {...register("payPassphrase")} />
                            </div>

                        </div>
                        <div className="flex ">
                            <button type="submit" className={`btn btn-info px-5 ml-auto ${loading && 'loading'}`} disabled={!checked}  >Save</button>
                        </div>
                    </div>
                </form>
            </div>
            {loading && <LoadingScreen message="Saving.."/>}
        </Page>
    )


}
