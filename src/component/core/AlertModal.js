import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
AlertModal.propTypes = {
    title:PropTypes.string,
    description:PropTypes.string,
    onAccept:PropTypes.func,
    onCancel:PropTypes.func
}
export default function AlertModal({ title,description, onAccept, onCancel }) {
    return (
        <div className={`modal modal-open bg-black/0 `}>
            <div className=" fixed inset-0 bg-black/80" onClick={onCancel} />
            <div className='z-50 bg-white rounded-xl py-5 px-3'>
                <div className="flex gap-2">
                    <div className="">
                        <Icon icon ="fa:fa-angellist" width={30} height={30} className="text-sky-500" />   
                    </div>
                    <div className="">
                        <label className="text-stone-700">{title}</label>
                        <p className="text-stone-500">{description}</p>
                    </div> 
                </div>
                <div className="w-full flex gap-2 justify-between mt-2">
                    <button className={`btn btn-info w-1/2 -ml-1 uppercase btn-sm`} onClick={onAccept}>
                        Ok
                    </button>
                    <button className={`btn btn-info w-1/2  btn-sm uppercase`} onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}