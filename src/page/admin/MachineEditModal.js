import { Icon } from "@iconify/react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import LoadingScreen from "../../component/custom/LoadingScreen";
import Image from "../../component/Image";
import AlertModal from '../../component/core/AlertModal';
import { API_ADMIN, API_CLIENT, ASSETS_URL, SEND_DELETE_REQUEST, SEND_GET_REQUEST, SEND_POST_REQUEST, SEND_PUT_REQUEST } from "../../utils/API";

export default function MachineEditModal({ onClose, machine, id = 'add' }) {

    const [loading, setLoading] = useState(false);
    const [removeModal, setRemoveModal] = useState(false);
    const defaultValues = useMemo(() => ({
        img: machine?.img || "",
        vendorId: machine?.vendorId || "",
        slotCount: machine?.slotCount || "",
        title: machine?.title || "",
        description: machine?.description || "",
        deviceNumber:machine?.deviceNumber|| "",
        type: machine?.type || 'ble',
        
    }), [machine]);


    const { register, handleSubmit, setValue, watch, reset, formState: { errors, isSubmitting } } = useForm({ defaultValues });
    const img = watch('img');
    const deviceType = watch('type');
    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setValue('img', e.target.files[0]);
        }
    }
    const handleRemoveOk = () => {
        SEND_DELETE_REQUEST(`${API_ADMIN.deleteMiniVendor}`, id).then(res => {
            if (res.status === 200) {
                toast.success(res.message)
                setRemoveModal(false)
                onClose();
            }
            else {
                toast.error(res.message)
            }
        })
    }
    const handleRemove = () => {
        setRemoveModal(true);
    }
    const onSubmit = (data) => {
        console.log(data);
        setLoading(true);
        let iData = new FormData();
        if (typeof img === "object") {

            iData.append("img", img);
            iData.append("vendorId", data.vendorId);
            iData.append("slotCount", data.slotCount);
            iData.append("title", data.title);
            iData.append("type", data.type);
            iData.append("description", data.description);
            iData.append("id", id);
            iData.append('deviceNumber',data.deviceNumber);
            SEND_PUT_REQUEST(API_ADMIN.addMiniVendor, iData).then(res => {
                setLoading(false);
                if (res.status === 200) {
                    toast.success(res.message)
                    onClose()
                }
                else {
                    toast.error(res.message)
                }

            }).catch(err => {
                toast.error("Internal Server Error")
            });;
        }
        else {

            if (id === "add") {
                toast.error("Choose Image File");
                setLoading(false);
                return;
            }
            else {
                SEND_PUT_REQUEST(API_ADMIN.editMiniVendor, { ...data, id }).then(res => {
                    setLoading(false);
                    if (res.status === 200) {
                        toast.success(res.message)
                        onClose()
                    }
                    else {
                        toast.error(res.message)
                    }

                }).catch(err => {
                    setLoading(false);
                    console.log(err);
                    toast.error("Server Error")
                });
            }

        }
    }

    useEffect(() => {
        if (id !== "add" && machine !== null) {
            reset(defaultValues)
            setValue('img', `${ASSETS_URL.root}${machine.img}`);
        }
    }, [id, machine, reset, defaultValues, setValue])

    return (
        <div className={`modal modal-open bg-black/0 `}>
            <div className=" fixed inset-0 bg-black/80" onClick={onClose} />
            <div className='z-50 bg-white rounded-xl py-5 px-3'>
                <p className="text-center font-bold text-xl mb-3">{id === "add" ? `Add New Vendor Machine` : `Edit Vendor Machine`} </p>
                <form className="flex flex-col items-center gap-3 p-2"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className='grid grid-cols-2 w-full'>
                        <div>
                            <div className="w-full ">
                                <p className="">VendorID*</p>
                                <input className="input h-10 border border-stone-300 w-full" required {...register("vendorId")} />
                            </div>

                            <div className="w-full">
                                <p className="">Slot Count*</p>
                                <input type='number' className="input h-10 border border-stone-300 w-full" required  {...register("slotCount")} />
                            </div>
                            <div className="w-full ">
                                <p className="">VendorType*</p>
                                <select className="select select-sm h-10 select-info w-full mb-2" {...register("type")} >
                                    <option value='ble'  >Bluetooth</option>
                                    <option value='sms'  >SMS</option>
                                    <option value='4g'  >4G</option>
                                    <option value='wifi'  >Wi-fi</option>

                                </select>
                            </div>
                        </div>
                        <div className="card p-3  gap-5  h-full">
                            {/* avatar */}
                            <div className="mx-auto relative mt-4">

                                <Image className="w-36 h-36 rounded-lg outline-dashed outline-stone-300 outline-offset-4 outline-1"
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
                    {deviceType === 'sms' &&
                        <div className="w-full ">
                            <p className="">Device Number</p>
                            <input className="input h-10 border border-stone-300 w-full" required  {...register("deviceNumber")} />
                        </div>
                    }

                    <div className="w-full">
                        <p className="">Vendor Description</p>
                        <textarea className="textarea textarea-bordered  w-full " placeholder="Description" required  {...register("description")} />
                    </div>
                    <div className="w-full grid grid-cols-3 gap-2">
                        <button className={`btn btn-sm btn-info ${isSubmitting && 'loading'}`} type="submit">
                            Save
                        </button>
                        <button className={`btn  btn-sm btn-info `} onClick={handleRemove} type='button' disabled={(id === 'add')}>
                            Delete
                        </button>
                        <button className={`btn  btn-sm btn-info  `} onClick={onClose}>
                            Cancel
                        </button>
                    </div>

                </form>
            </div>
            {removeModal && <AlertModal onCancel={() => setRemoveModal(false)} onAccept={handleRemoveOk} title="Do you want to remove, Sure?" description="If you have proceed this operation, the data will be removed from  database" />}
            {loading && <LoadingScreen message='Saving' />}
        </div>
    )
}