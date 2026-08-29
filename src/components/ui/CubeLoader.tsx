
export default function CubeLoader() {
  return (
    <div className='flex flex-col items-center justify-center gap-12 p-12 min-h-[400px] cube-perspective-container'>

      {/* 3D Scene Wrapper */}
      <div className='relative w-24 h-24 flex items-center justify-center cube-preserve-3d'>

        {/* THE SPINNING CUBE CONTAINER */}
        <div className='relative w-full h-full cube-preserve-3d cube-animate-spin'>

          {/* Internal Core */}
          <div className='absolute inset-0 m-auto w-8 h-8 bg-[#F05A17] rounded-full blur-md shadow-[0_0_30px_rgba(240,90,23,0.6)] cube-animate-pulse-fast' />

          {/* Front */}
          <div className='cube-side-wrapper cube-front'>
            <div className='cube-face border-2' style={{ background: 'rgba(16,20,24,0.6)', borderColor: '#1D2125', boxShadow: '0 0 15px rgba(0,0,0,0.8)' }} />
          </div>

          {/* Back */}
          <div className='cube-side-wrapper cube-back'>
            <div className='cube-face border-2' style={{ background: 'rgba(16,20,24,0.6)', borderColor: '#1D2125', boxShadow: '0 0 15px rgba(0,0,0,0.8)' }} />
          </div>

          {/* Right */}
          <div className='cube-side-wrapper cube-right'>
            <div className='cube-face border-2' style={{ background: 'rgba(29,33,37,0.4)', borderColor: '#1D2125', boxShadow: '0 0 15px rgba(240,90,23,0.15)' }} />
          </div>

          {/* Left */}
          <div className='cube-side-wrapper cube-left'>
            <div className='cube-face border-2' style={{ background: 'rgba(29,33,37,0.4)', borderColor: '#1D2125', boxShadow: '0 0 15px rgba(240,90,23,0.15)' }} />
          </div>

          {/* Top */}
          <div className='cube-side-wrapper cube-top'>
            <div className='cube-face border-2' style={{ background: 'rgba(240,90,23,0.08)', borderColor: '#1D2125', boxShadow: '0 0 15px rgba(240,90,23,0.2)' }} />
          </div>

          {/* Bottom */}
          <div className='cube-side-wrapper cube-bottom'>
            <div className='cube-face border-2' style={{ background: 'rgba(240,90,23,0.08)', borderColor: '#1D2125', boxShadow: '0 0 15px rgba(240,90,23,0.2)' }} />
          </div>
        </div>

        {/* Floor Shadow */}
        <div className='absolute -bottom-20 w-24 h-8 bg-black/60 blur-xl rounded-[100%] cube-animate-shadow-breathe' />
      </div>

      {/* Loading Text */}
      <div className='flex flex-col items-center gap-1 mt-2'>
        <h3 className='text-sm font-semibold tracking-[0.3em] uppercase' style={{ color: '#F05A17' }}>
          Loading
        </h3>
        <p className='text-xs text-[#A8A29C]'>
          Preparing your experience, please wait...
        </p>
      </div>

      <style>{`
        .cube-perspective-container {
          perspective: 1200px;
        }

        .cube-preserve-3d {
          transform-style: preserve-3d;
        }

        @keyframes cubeSpin {
          0%   { transform: rotateX(0deg)   rotateY(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }

        @keyframes cubeBreathe {
          0%, 100% { transform: translateZ(48px); opacity: 0.8; }
          50%       { transform: translateZ(80px); opacity: 0.4; border-color: rgba(255,255,255,0.8); }
        }

        @keyframes cubePulseFast {
          0%, 100% { transform: scale(0.8); opacity: 0.5; }
          50%       { transform: scale(1.2); opacity: 1; }
        }

        @keyframes cubeShadowBreathe {
          0%, 100% { transform: scale(1);   opacity: 0.4; }
          50%       { transform: scale(1.5); opacity: 0.2; }
        }

        .cube-animate-spin {
          animation: cubeSpin 8s linear infinite;
        }

        .cube-animate-pulse-fast {
          animation: cubePulseFast 2s ease-in-out infinite;
        }

        .cube-animate-shadow-breathe {
          animation: cubeShadowBreathe 3s ease-in-out infinite;
        }

        .cube-side-wrapper {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          transform-style: preserve-3d;
        }

        .cube-face {
          width: 100%;
          height: 100%;
          position: absolute;
          animation: cubeBreathe 3s ease-in-out infinite;
          backdrop-filter: blur(2px);
        }

        .cube-front  { transform: rotateY(0deg); }
        .cube-back   { transform: rotateY(180deg); }
        .cube-right  { transform: rotateY(90deg); }
        .cube-left   { transform: rotateY(-90deg); }
        .cube-top    { transform: rotateX(90deg); }
        .cube-bottom { transform: rotateX(-90deg); }
      `}</style>
    </div>
  );
}
