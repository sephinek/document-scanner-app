'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Tesseract from 'tesseract.js';
import { FaArrowUp } from 'react-icons/fa6';
import cameraIcon from '../../public/camera-icon.png';

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [extractedText, setExtractedText] = useState('');

  const imageUploadHandler = (e) => {
    const image = URL.createObjectURL(e.target.files[0]);
    setUploadedImage(image);
  };

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then((stream) => {
        const video = videoRef.current;
        video.srcObject = stream;
        video.onloadedmetadata = () => {
          video.play();
        };
      })
      .catch((err) => {
        console.error(`${err.name}: ${err.message}`);
      });
  };

  const takePhoto = () => {
    const width = 414;
    const height = width / (16 / 9);

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    const ctx = photo.getContext('2d');
    ctx.drawImage(video, 0, 0, width, height);
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const extractTextHandler = async () => {
    console.log('extract clicked');
    let image = uploadedImage || photoRef;
    if (image) {
      const result = await Tesseract.recognize(image);
      setExtractedText(result.data.text);
    }
  };

  const toTheTopBtnHandler = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className='relative h-full max-w-[350px] m-auto p-3'>
      <h1 className='text-xl mb-2'>Capture Your Document</h1>
      <h2 className='text-lg font-light mb-10'>We Will Scan It into Text</h2>
      <div className='bg-white w-full h-auto border-[#A5C9A9] border-[1px] rounded-[20px] m-auto mb-5 shadow-lg'>
        <video
          className='w-full h-full rounded-[20px] border-[#A5C9A9] border-[1px]'
          ref={videoRef}
        ></video>
      </div>

      <button
        onClick={takePhoto}
        className='m-auto border-[#A5C9A9] border-[1px] w-16 h-16 rounded-full flex items-center justify-center shadow-lg'
      >
        <Image src={cameraIcon} alt='button to capture' className='w-6' />
      </button>

      <div className='mt-10 mb-16'>
        <p className='font-light text-center mb-3'>
          <span className='font-semibold'>OR</span> Upload An Image File:
        </p>
        <input
          className='w-full'
          type='file'
          accept='image/*'
          onChange={imageUploadHandler}
        />
      </div>

      {!uploadedImage ? (
        <canvas
          className='bg-white w-full h-[250px] border-[#A5C9A9] border-[1px] rounded-[20px] mx-auto my-5 shadow-lg'
          ref={photoRef}
        ></canvas>
      ) : (
        <Image
          className='bg-white border-[#A5C9A9] border-[1px] rounded-[20px] mx-auto my-5 shadow-lg'
          src={uploadedImage}
          alt='Uploaded image file'
          width={414}
          height={250}
        />
      )}

      <div className='w-full text-center mt-6'>
        <button
          className='bg-[#2c2c2c] text-white font-lexend py-3 px-10 rounded-md shadow-lg'
          onClick={extractTextHandler}
        >
          Extract Text
        </button>
      </div>

      <div className='my-20 text-center'>
        <span className='font-bold'>Result:</span>
        <p className='font-lexend font-light p-5 pt-3 leading-relaxed border-2 mt-5'>
          {extractedText}
        </p>
      </div>

      <button
        className='absolute bottom-2 right-2 border-[#A5C9A9] border-2 w-8 h-8 rounded-full flex justify-center items-center'
        onClick={toTheTopBtnHandler}
      >
        <FaArrowUp className='text-[#A5C9A9]' />
      </button>
    </main>
  );
}
