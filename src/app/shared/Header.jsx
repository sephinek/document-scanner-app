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
    <header className='h-[50px] w-full relative bg-[#ADDFB2] px-3'>
      <div className='h-full max-w-[350px] m-auto flex items-center justify-between'>
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
            <ul className='absolute top-[100%] left-0 flex-col gap-20 bg-gray-500 text-white w-full cursor-pointer'>
              <Link href='/'>
                <li
                  className='py-5 text-center hover:bg-white hover:text-black hover:border-slate-100'
                  onClick={linkClickHandler}
                >
                  Home
                </li>
              </Link>
              <Link href='/about'>
                <li
                  className='py-5 text-center hover:bg-white hover:text-black hover:border-slate-100'
                  onClick={linkClickHandler}
                >
                  About
                </li>
              </Link>
              <Link href='/history'>
                <li
                  className='py-5 text-center hover:bg-white hover:text-black hover:border-slate-100'
                  onClick={linkClickHandler}
                >
                  History
                </li>
              </Link>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
}
