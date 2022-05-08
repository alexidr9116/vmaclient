import { Icon } from "@iconify/react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import LoadingScreen from "../../component/custom/LoadingScreen";
import Image from "../../component/Image";

export default function MachineEditModal({onClose, id = ''}) {
    const [machine, setMachine] = useState({});
    const [loading,setLoading] = useState(false);

    const defaultValues = useMemo(() => ({
        img: machine?.img || "",
        vendorId:machine?.vendorId||"",
        slotCount:machine?.slotCount||"",
        title:machine?.title||"",
        description:machine?.description||"",
         
    }), [machine]);
    

    const { register, handleSubmit, setValue, watch, reset, formState: { errors, isSubmitting } } = useForm({defaultValues});
    const img = watch('img');
    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setValue('img', e.target.files[0]);
        }
    }
    const onSubmit = (data)=>{
        console.log(data);
    }
    return (
        <div className={`modal modal-open bg-black/0 `}>
            <div className=" fixed inset-0 bg-black/80" onClick={onClose} />
            <div className='z-50 bg-white rounded-xl py-5 px-3'>
                <p className="text-center font-bold text-xl mb-3">{id === "" ? `Add New Vendor Machine` : `Edit Vendor Machine`} </p>
                <form className="flex flex-col items-center gap-3 p-2"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className='grid grid-cols-2'>
                        <div>
                            <div className="w-full mb-3">
                                <p className="">VendorID*</p>
                                <input className="input h-10 border border-stone-300 w-full" required {...register("vendorId")} />
                            </div>
                            <div className="w-full">
                                <p className="">Slot Count*</p>
                                <input  type = 'number' className="input h-10 border border-stone-300 w-full" required  {...register("slotCount")} />
                            </div> 
                        </div>
                        <div className="card p-3  gap-5  h-full">
                            {/* avatar */}
                            <div className="mx-auto relative">

                                <Image className="w-32 h-32 rounded-lg outline-dashed outline-stone-300 outline-offset-4 outline-1"
                                    src={typeof img === 'string' ? img : (img ? URL.createObjectURL(img) : '')}
                                />

                                <input hidden id="img" type="file" accept="image/*" onChange={imageChange} />
                                <label htmlFor="img" className="rounded-lg border bg-gray-50 w-9 h-9 cursor-pointer flex absolute bottom-0 right-0">
                                    <Icon icon={'fa:pencil'} width={20} className="m-auto text-stone-500" />
                                </label>
                            </div>

                        </div>
                    </div>

                    <div className="w-full ">
                        <p className="">Vendor Title</p>
                        <input className="input h-10 border border-stone-300 w-full" required  {...register("title")} />
                    </div>
                    <div className="w-full">
                        <p className="">Vendor Description</p>
                        <textarea className="textarea textarea-bordered  w-full " placeholder="Description" required  {...register("description")} />
                    </div>
                    <div className="w-full flex gap-2 justify-between mt-2">
                        <button className={`btn btn-sm btn-info w-1/2 -ml-1   ${isSubmitting && 'loading'}`} type="submit">
                            Save
                        </button>
                        <button className={`btn  btn-sm btn-info w-1/2   `} onClick={onClose}>
                            Cancel
                        </button>
                    </div>

                </form>

            </div>
            {loading && <LoadingScreen message='Saving' />}
        </div>
    )
}