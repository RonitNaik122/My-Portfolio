import React from 'react';

const Hero = () => {
  return (
    <section className="relative w-full h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#0a0f30] to-[#000000] text-white overflow-hidden">
      {/* Blurred Shapes */}
      <div className="absolute -top-32 left-10 w-96 h-96 bg-[#1a1a6f] rounded-full opacity-30 blur-3xl" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-[#3c3ca1] rounded-full opacity-20 blur-2xl" />
      <div className="absolute bottom-0 w-full h-72 bg-[#191970] rounded-t-[100px] opacity-30 blur-[120px]" />

      {/* Main Content */}
      <div className="z-10 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">RONIT NAIK</h1>
        <h2 className="text-xl md:text-2xl text-[#b0aaff] font-semibold mb-4">
          Computer Science Student
        </h2>
        <p className="text-sm md:text-base text-gray-300">
          ronitnaik122@gmail.com &nbsp; • &nbsp; +91 9920228221
        </p>
        <p className="text-sm md:text-base text-gray-400 mt-1">Mumbai, India</p>
      </div>
    </section>
  );
};

export default Hero;
