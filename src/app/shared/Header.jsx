'use client';
import Link from 'next/link';
import { useState } from 'react';
import menuIcon from '../../../public/menu-icon.png';
import Image from 'next/image';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const linkClickHandler = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className='flex-none font-lexend h-[50px] w-full relative bg-[#ADDFB2]'>
      <div className='h-full max-w-screen-xl mx-auto'>
        <div className='m-auto max-w-[90%] h-full flex items-center  justify-between'>
          <Link
            href='/'
            className='font-logo font-black text-lg md:text-2xl tracking-tight text-black'
          >
            Document Scanner
          </Link>

          <nav>
            <Image
              src={menuIcon}
              alt='mobile menu icon'
              className={`${
                mobileMenuOpen ? 'text-green-500' : 'text-black'
              } cursor-pointer hover:scale-105`}
              onClick={() => setMobileMenuOpen((view) => !view)}
            />

            {mobileMenuOpen && (
              <ul className='z-10 absolute top-[100%] left-0 flex-col gap-20 bg-gray-500 text-white w-full cursor-pointer'>
                <Link href='/'>
                  <li className='py-5 text-center' onClick={linkClickHandler}>
                    Home
                  </li>
                </Link>
                <Link href='/about'>
                  <li className='py-5 text-center' onClick={linkClickHandler}>
                    About
                  </li>
                </Link>
              </ul>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
