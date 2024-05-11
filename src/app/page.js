'use client';
import { useEffect, useRef, useState } from 'react';
import cameraIcon from '../../public/camera-icon.png';
import Image from 'next/image';

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const videoRef = useRef(null);
  const photoRef = useRef(null);

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

  const extractTextHandler = (e) => {
    console.log(e);
  };

  return (
    <main className='h-full max-w-[350px] m-auto p-3'>
      <h1 className='text-xl mb-2'>Capture Your Document</h1>
      <h2 className='text-lg font-light mb-5'>We Will Scan It into Text</h2>
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

      <div className='my-10'>
        <p className='font-light text-center mb-3'>
          <span className='font-semibold'>OR</span> Upload An Image File:
        </p>
        <input type='file' accept='image/*' onChange={imageUploadHandler} />
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

      <div className='w-full text-center mt-16'>
        <button
          className='bg-[#2c2c2c] text-white py-3 px-10 rounded-md shadow-lg mb-10'
          onClick={extractTextHandler}
        >
          Extract Text
        </button>
      </div>
    </main>
  );
}
