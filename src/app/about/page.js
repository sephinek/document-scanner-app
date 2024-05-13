'use client';
import ScrollToTopBtn from '../shared/ScrollToTopBtn';

export default function About() {
  return (
    <main className='relative w-full m-auto grow p-3 mx-auto my-5 pb-10'>
      <div className='max-w-screen-md mx-auto'>
        <h2 className='text-xl sm:text-3xl mb-5 text-center'>About Us</h2>
        <div className='flex flex-col justify-start gap-6 p-3 sm:text-lg'>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Venenatis cras sed felis eget velit aliquet sagittis. Eu volutpat
            odio facilisis. Eu volutpat odio facilisis.
          </p>

          <p>
            Vel quam elementum pulvinar etiam non quam lacus. Congue quisque
            egestas diam in arcu cursus euismod quis viverra. Amet volutpat
            consequat mauris nunc congue nisi. Pellentesque habitant morbi
            tristique senectus et netus et malesuada. Volutpat ac tincidunt
            vitae semper quis lectus nulla at. Id nibh tortor id aliquet.
          </p>

          <p>
            Auctor augue mauris augue neque gravida in fermentum et. Odio ut sem
            nulla pharetra diam. Vitae elementum curabitur vitae nunc sed velit.
            Proin sagittis nisl rhoncus mattis rhoncus urna neque viverra. Nec
            dui nunc mattis enim ut tellus elementum sagittis. Accumsan lacus
            vel facilisis volutpat est. Id venenatis.
          </p>
        </div>
      </div>

      <ScrollToTopBtn />
    </main>
  );
}
