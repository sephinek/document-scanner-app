import { FaArrowUp } from 'react-icons/fa6';

export default function ScrollToTopBtn() {
  const scrollToTopBtnHandler = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className='absolute bottom-2 right-4 border-[#A5C9A9] border-2 w-10 h-10 rounded-full flex justify-center items-center'
      onClick={scrollToTopBtnHandler}
    >
      <FaArrowUp className='text-[#A5C9A9] text-lg' />
    </button>
  );
}
