'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Tesseract from 'tesseract.js';
import cameraIcon from '../../public/camera-icon.png';
import ScrollToTopBtn from './shared/ScrollToTopBtn';

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [extractedText, setExtractedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    let image = uploadedImage || photoRef;
    if (image) {
      const result = await Tesseract.recognize(image);
      setExtractedText(result.data.text);
    }
    setIsLoading(false);
  };

  return (
    <main className='relative w-full m-auto p-3'>
      <div className='max-w-screen-xl mx-auto'>
        <h1 className='tablet:text-center text-xl sm:text-2xl mb-2'>
          Capture Your Document
        </h1>
        <h2 className='tablet:text-center text-lg sm:text-xl font-light mb-6'>
          We Will Scan It into Text
        </h2>
        <div className='bg-white w-full max-w-[600px] h-auto border-[#A5C9A9] border-[1px] rounded-[20px] m-auto mb-5 shadow-lg'>
          <video
            className='w-full h-full rounded-[20px] border-[#8ea491] border-[1px]'
            ref={videoRef}
          ></video>
        </div>

        <button
          onClick={takePhoto}
          className='m-auto border-[#A5C9A9] border-[1px] w-14 h-14 rounded-full flex items-center justify-center shadow-lg'
        >
          <Image src={cameraIcon} alt='button to capture' className='w-6' />
        </button>

        <div className='mt-10 mb-16 text-center sm:text-lg'>
          <p className='font-normal text-center mb-3'>
            <span className='font-semibold'>OR</span> Upload An Image File:
          </p>
          <input
            className='w-full max-w-[500px] mx-auto'
            type='file'
            accept='image/*'
            onChange={imageUploadHandler}
          />
        </div>

        {!uploadedImage && !photoRef.current && (
          <p className='bg-white border-[#A5C9A9] border-[1px] rounded-[20px] mx-auto my-5 shadow-lg w-full max-w-[600px] h-[200px] flex items-center justify-center font-bold'>
            No Selected Image
          </p>
        )}
        {uploadedImage && (
          <Image
            className='bg-white border-[#A5C9A9] border-[1px] rounded-[20px] mx-auto my-5 shadow-lg w-full max-w-[600px]'
            src={uploadedImage}
            alt='Uploaded image file'
            width={414}
            height={300}
          />
        )}
        {photoRef.current && (
          <canvas
            className='bg-white w-full h-[250px] max-w-[600px] border-[#A5C9A9] border-[1px] rounded-[20px] mx-auto my-5 shadow-lg'
            ref={photoRef}
          ></canvas>
        )}

        <div className='w-full text-center mt-6'>
          <button
            className='text-sm tablet:text-base bg-[#2c2c2c] text-white font-lexend py-3 px-10 rounded-md shadow-lg'
            onClick={extractTextHandler}
          >
            Extract Text
          </button>
        </div>

        <div className='my-20 text-center sm:text-lg'>
          <span className='font-bold'>Result:</span>
          <p className='font-lexend font-light p-5 pt-3 leading-relaxed border-2 bg-white mt-5 mx-auto max-w-[600px]'>
            {isLoading ? 'Extracting...' : extractedText}
          </p>
        </div>

        <ScrollToTopBtn />
      </div>
    </main>
  );
}
