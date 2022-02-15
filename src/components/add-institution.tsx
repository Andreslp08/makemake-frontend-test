import React from 'react';
import {ReactComponent as AddIcon} from '../assets/svg/icons/mas.svg';

interface AddInstitutionProps{
    onSelect?():void;
}

export const AddInstitution:React.FC<AddInstitutionProps> = ({onSelect})=>{
    return (
        <div className='institution-card cursor-pointer hover:scale-100 border-solid border-transparent hover:border-indigo-600 transition-colors border-2' onClick={()=>onSelect&&onSelect()}>
            <AddIcon width={"25px"} style={{fill:'var(--onbackground-color)'}} className='m-1' />
            <h3 className='font-bold color-onbackground'>Agregar sede</h3>
        </div>
    )
}