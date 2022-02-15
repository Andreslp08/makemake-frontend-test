import React from 'react';
import { Switch } from './switch';
import Logo from '../assets/images/logo-makemake.png';
import { Icon } from '@iconify/react';


export const Header:React.FC = ()=>{
    return (
        <div className='header'>
            <img src={Logo} alt="MakeMake logo" className='logo' />
            <div className='flex items-center'>
            <Icon icon="carbon:light-filled" className='color-onsurface  m-0.5' width={'12px'} />
            <Switch/>
            <Icon icon="bi:moon-fill" className='color-onsurface m-0.5' width={'12px'} />
            </div>
        </div>
    )
}

