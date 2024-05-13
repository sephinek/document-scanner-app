import { Koh_Santepheap, Lexend } from 'next/font/google';
import './globals.css';
import Header from './shared/Header';
import Footer from './shared/Footer';

const kohSantepheap = Koh_Santepheap({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-kohSantepheap',
});

const lexend = Lexend({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-lexend',
});

export const metadata = {
  title: 'Document Scanner',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${kohSantepheap.variable} ${lexend.variable} font-normal flex flex-col`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
