'use client';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import menuIcon from '../../../public/menu-icon.png';
import Image from 'next/image';

export default function Header() {
  const [mobileNavbar, setMobileNavbar] = useState(false);
  const navRef = useRef(null);

  const mobileNavbarHandler = () => {
    setMobileNavbar((open) => !open);
  };

  const linkClickHandler = () => {
    setMobileNavbar(false);
  };

  const navCloseHandler = (e) => {
    if (mobileNavbar && !navRef.current?.contains(e.target)) {
      setMobileNavbar(false);
    }
  };

  useEffect(() => {
    const navCloseHandler = (e) => {
      if (mobileNavbar && !navRef.current?.contains(e.target)) {
        setMobileNavbar(false);
      }
    };

    window.addEventListener('mousedown', navCloseHandler);

    return () => {
      window.removeEventListener('mousedown', navCloseHandler);
    };
  }, [mobileNavbar]);

  return (
    <header className='flex-none font-lexend h-[50px] w-full relative bg-[#ADDFB2]'>
      <div className='h-full max-w-screen-xl mx-auto'>
        <div className='m-auto max-w-[90%] h-full flex items-center justify-between'>
          <Link
            href='/'
            className='font-logo font-black text-lg md:text-2xl tracking-tight text-black'
          >
            Document Scanner
          </Link>

          <nav ref={navRef}>
            {/* Desktop Navbar */}
            <ul className='hidden tablet:block'>
              <div className='flex gap-8 text-sm'>
                <Link href='/'>
                  <li className='hover:text-green-700'>Home</li>
                </Link>
                <Link href='/about'>
                  <li className='hover:text-green-700'>About</li>
                </Link>
              </div>
            </ul>

            {/* Mobile Navbar */}
            <Image
              src={menuIcon}
              alt='mobile menu icon'
              className={`block tablet:hidden ${
                mobileNavbar ? 'text-green-500' : 'text-black'
              } cursor-pointer hover:scale-105`}
              onClick={mobileNavbarHandler}
            />

            {mobileNavbar && (
              <ul className='block tablet:hidden z-10 absolute top-[100%] left-0 flex-col gap-20 bg-slate-400 text-white w-full cursor-pointer text-sm sm:text-base'>
                <Link href='/'>
                  <li
                    className='py-5 text-center hover:bg-slate-700'
                    onClick={linkClickHandler}
                  >
                    Home
                  </li>
                </Link>
                <Link href='/about'>
                  <li
                    className='py-5 text-center hover:bg-slate-700'
                    onClick={linkClickHandler}
                  >
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
