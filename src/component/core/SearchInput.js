import { Icon } from "@iconify/react";
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
SearchInput.propTypes = {
    handleChangeSearch:PropTypes.func,
}
export default function SearchInput({handleChangeSearch}){
    const {t} = useTranslation();
    const handleChange=(e)=>{
        handleChangeSearch(e.target.value)
    }
    return(
        <div className = "flex items-center  border rounded-lg ">
            <div className="flex-none ml-2"><Icon icon = "fa:search"  className="text-info"/></div>
            <input type = "text" className="input input-sm grow" onChange={handleChange} />
            <button className="btn btn-sm btn-info flex-none btn-outline border-l-radius" >{t('words.search')}</button>
        </div>
    )
}