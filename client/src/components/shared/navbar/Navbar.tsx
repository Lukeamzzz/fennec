import React from 'react';
import Link from 'next/link';
import OrangeButton from '@/stories/ArrowButton';
import WhiteButton from '@/stories/WhiteButton';
import BasicLink from '@/stories/BasicLink';

const Navbar = () => {
  return (
    <div className='w-full h-fit py-6 flex flex-row justify-center px-40 items-center fixed z-50 bg-neutral-50 shadow'>
        <div className='w-1/3'>
            <Link href="/">
                <img src="./images/Fennec-logo-trans.png" alt="Logo Fennec" className='w-40' />
            </Link>
        </div>
        <nav className='w-1/3 flex flex-row justify-center items-center gap-x-8'>
            <BasicLink text='Planes' href='/plans'></BasicLink>

            <BasicLink text='Soluciones' href='/solutions'></BasicLink>

            <BasicLink text='Nosotros' href='/about'></BasicLink>
        </nav>
        <div className='flex flex-row justify-end items-center gap-x-2 w-1/3'>
          <WhiteButton text='Iniciar Sesión'></WhiteButton>
          <OrangeButton text='Comenzar' className='py-3 px-9'></OrangeButton> 
        </div>
    </div>
  )
}

export default Navbar;