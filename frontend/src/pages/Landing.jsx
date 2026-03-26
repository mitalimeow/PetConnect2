import React from 'react';
import PixelBlast from '../components/backgrounds/PixelBlast';
import CountUp from '../components/animations/CountUp';
import cutePetsImg from '../assets/cute-pets.png';

const Landing = () => {
  return (
    <div className="relative w-full min-h-[calc(100vh-80px)] overflow-hidden">
      {/* Background layer */}
      <div className="absolute inset-0 z-0 opacity-80">
        <PixelBlast
          variant="square"
          pixelSize={4}
          color="#ffb7b2"
          patternScale={2}
          patternDensity={1}
          pixelSizeJitter={0}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid={false}
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.5}
          edgeFade={0.25}
          transparent
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[80vh] pointer-events-none">
        {/* Left Column: Text & Stats */}
        <div className="flex flex-col justify-center space-y-10 mt-12 md:mt-0 pointer-events-auto">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-handwritten font-bold text-foreground">
              Connecting <span className="text-pastel-pink">Hearts.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 font-medium max-w-lg">
              Because every animal deserves a home.
            </p>
          </div>

          {/* Stats section */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/80">
            <div className="text-center md:text-left">
              <div style={{ fontFamily: '"Lilita One", sans-serif', color: '#3a3a3a' }}>
                <CountUp
                  from={0}
                  to={45607}
                  separator=","
                  direction="up"
                  duration={1.5}
                  className="text-5xl md:text-6xl font-normal block !leading-none tracking-wide"
                />
              </div>
              <p className="text-sm md:text-base text-gray-500 font-semibold uppercase tracking-wide mt-2">pet lovers</p>
            </div>
            <div className="text-center md:text-left">
              <div style={{ fontFamily: '"Lilita One", sans-serif', color: '#3a3a3a' }}>
                <CountUp
                  from={0}
                  to={5907}
                  separator=","
                  direction="up"
                  duration={1.5}
                  className="text-5xl md:text-6xl font-normal block !leading-none tracking-wide"
                />
              </div>
              <p className="text-sm md:text-base text-gray-500 font-semibold uppercase tracking-wide mt-2">pet owners</p>
            </div>
            <div className="text-center md:text-left">
              <div style={{ fontFamily: '"Lilita One", sans-serif', color: '#3a3a3a' }}>
                <CountUp
                  from={0}
                  to={406}
                  separator=","
                  direction="up"
                  duration={1.5}
                  className="text-5xl md:text-6xl font-normal block !leading-none tracking-wide"
                />
              </div>
              <p className="text-sm md:text-base text-gray-500 font-semibold uppercase tracking-wide mt-2">trusted vets</p>
            </div>
          </div>
        </div>

        {/* Right Column: Illustration */}
        <div className="relative flex justify-center items-center pb-12 md:pb-0 pointer-events-auto">
          <div className="absolute w-72 h-72 md:w-96 md:h-96 bg-pastel-blue/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
          <img 
            src={cutePetsImg} 
            alt="Cute Pets illustration" 
            className="w-full max-w-lg object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 filter contrast-[0.95]"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
