import React from 'react';
import '../styles/backgroundAnimation.css';
 
const GradientDefinitions = () => (
  <defs>
    {/* Gradient definitions with real estate colors */}
    <linearGradient id="curve1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="rgba(59, 130, 246, 0.15)" />
      <stop offset="50%" stopColor="rgba(147, 51, 234, 0.1)" />
      <stop offset="100%" stopColor="rgba(236, 72, 153, 0.05)" />
    </linearGradient>
    
    <linearGradient id="curve2" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="rgba(16, 185, 129, 0.1)" />
      <stop offset="50%" stopColor="rgba(59, 130, 246, 0.08)" />
      <stop offset="100%" stopColor="rgba(147, 51, 234, 0.05)" />
    </linearGradient>
    
    <linearGradient id="curve3" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stopColor="rgba(251, 191, 36, 0.08)" />
      <stop offset="100%" stopColor="rgba(239, 68, 68, 0.05)" />
    </linearGradient>

    {/* Radial gradient for ambient glow */}
    <radialGradient id="glow1" cx="30%" cy="30%" r="40%">
      <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
      <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
    </radialGradient>
    
    <radialGradient id="glow2" cx="70%" cy="70%" r="50%">
      <stop offset="0%" stopColor="rgba(147, 51, 234, 0.08)" />
      <stop offset="100%" stopColor="rgba(147, 51, 234, 0)" />
    </radialGradient>
  </defs>
);

 
const FlowingCurves = () => (
  <>
    {/* Bottom flowing curves */}
    <path
      d="M-200 800 Q400 600 800 700 T1600 500 Q1800 400 2000 600 L2000 1200 L-200 1200 Z"
      fill="url(#curve1)"
      className="float-curve-animation"
    />

    {/* Top flowing curves */}
    <path
      d="M-200 200 Q400 100 800 200 T1600 100 Q1800 50 2000 150 L2000 0 L-200 0 Z"
      fill="url(#curve3)"
      className="float-curve-animation-delayed"
    />
  </>
);

 
const GlowCircles = () => (
  <>
    <circle 
      cx="600" 
      cy="300" 
      r="300" 
      fill="url(#glow1)" 
      className="glow-pulse-animation"
    />
    <circle 
      cx="1300" 
      cy="700" 
      r="400" 
      fill="url(#glow2)" 
      className="glow-pulse-animation-delayed"
    />
  </>
);

 
const FloatingParticles = () => (
  <div className="absolute inset-0">
    {[...Array(25)].map((_, i) => (
      <div
        key={`particle-${i}`}
        className={`absolute rounded-full ${
          i % 4 === 0 ? "bg-blue-400/10" : 
          i % 4 === 1 ? "bg-purple-400/10" : 
          i % 4 === 2 ? "bg-emerald-400/10" : "bg-amber-400/10"
        } ${
          i % 3 === 0 ? "w-1 h-1" : 
          i % 3 === 1 ? "w-2 h-2" : "w-3 h-3"
        }`}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `particle-float ${4 + Math.random() * 6}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 5}s`,
        }}
      />
    ))}
  </div>
);

 
const GridPattern = () => (
  <div 
    className="absolute inset-0 opacity-[0.02] grid-move-animation"
    style={{
      backgroundImage: `
        linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
      `,
      backgroundSize: '50px 50px'
    }}
  />
);


export default function BackgroundAnimation() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Main flowing curves with real estate theme */}
      <div className="absolute inset-0">
        <svg 
          className="absolute inset-0 w-full h-full" 
          viewBox="0 0 1920 1080" 
          preserveAspectRatio="xMidYMid slice" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <GradientDefinitions />
          <FlowingCurves />
          <GlowCircles />
        </svg>
      </div>
      
      <FloatingParticles />

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-transparent to-slate-900/20" />
      
      <GridPattern />
    </div>
  );
}