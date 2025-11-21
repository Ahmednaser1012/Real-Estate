import { useEffect, useState } from "react";
import "../../styles/loadingScreen.css";

export default function LoadingScreen({ onComplete }) {
  const [animationPhase, setAnimationPhase] = useState("falling");

  useEffect(() => {
    const fallTimer = setTimeout(() => {
      setAnimationPhase("spiral");
    }, 3500); // زيادة المدة لإتاحة وقت أطول للحروف للنزول

    const spiralTimer = setTimeout(() => {
      setAnimationPhase("complete");
      onComplete();
    }, 6000);

    return () => {
      clearTimeout(fallTimer);
      clearTimeout(spiralTimer);
    };
  }, [onComplete]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 flex items-center justify-center z-50 transition-all duration-1000 ${
          animationPhase === "spiral" ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-gray-300 rounded-full opacity-30  ${
                animationPhase === "falling" ? "animate-float-particle" : ""
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                
              }}
            />
          ))}
        </div>

        <div className="text-center relative z-10">
          <div className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-light text-gray-800 tracking-wider" style={{ fontFamily: 'thenightwatch, sans-serif' }}>
            <span
              className={`inline-block transition-all duration-700 ${
                animationPhase === "falling" ? "animate-fall-letter-1" : ""
              }`}
            >
              L
            </span>
            <span
              className={`inline-block transition-all duration-700 ${
                animationPhase === "falling" ? "animate-fall-letter-2" : ""
              }`}
            >
              e
            </span>
            <span
              className={`inline-block transition-all duration-700 ${
                animationPhase === "falling" ? "animate-fall-letter-3" : ""
              }`}
            >
              v
            </span>
            <span
              className={`inline-block transition-all duration-700 ${
                animationPhase === "falling" ? "animate-fall-letter-4" : ""
              }`}
            >
              e
            </span>
            <span
              className={`inline-block transition-all duration-700 ${
                animationPhase === "falling" ? "animate-fall-letter-5" : ""
              }`}
            >
              l
            </span>
            <span
              className={`inline-block transition-all duration-700 ${
                animationPhase === "falling" ? "animate-fall-letter-6" : ""
              }`}
            >
              s
            </span>
          </div>
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-red-500 tracking-wider mt-2" style={{ fontFamily: 'thenightwatch, sans-serif' }}>
            <span
              className={`inline-block transition-all duration-700 ${
                animationPhase === "falling" ? "animate-fade-up-1" : ""
              }`}
            >
              D
            </span>
            <span
              className={`inline-block transition-all duration-700 ${
                animationPhase === "falling" ? "animate-fade-up-2" : ""
              }`}
            >
              e
            </span>
            <span
              className={`inline-block transition-all duration-700 ${
                animationPhase === "falling" ? "animate-fade-up-3" : ""
              }`}
            >
              v
            </span>
            <span
              className={`inline-block transition-all duration-700 ${
                animationPhase === "falling" ? "animate-fade-up-4" : ""
              }`}
            >
              e
            </span>
            <span
              className={`inline-block transition-all duration-700 ${
                animationPhase === "falling" ? "animate-fade-up-5" : ""
              }`}
            >
              l
            </span>
            <span
              className={`inline-block transition-all duration-700 ${
                animationPhase === "falling" ? "animate-fade-up-6" : ""
              }`}
            >
              o
            </span>
            <span
              className={`inline-block transition-all duration-700 ${
                animationPhase === "falling" ? "animate-fade-up-7" : ""
              }`}
            >
              p
            </span>
            <span
              className={`inline-block transition-all duration-700 ${
                animationPhase === "falling" ? "animate-fade-up-8" : ""
              }`}
            >
              m
            </span>
            <span
              className={`inline-block transition-all duration-700 ${
                animationPhase === "falling" ? "animate-fade-up-9" : ""
              }`}
            >
              e
            </span>
            <span
              className={`inline-block transition-all duration-700 ${
                animationPhase === "falling" ? "animate-fade-up-10" : ""
              }`}
            >
              n
            </span>
            <span
              className={`inline-block transition-all duration-700 ${
                animationPhase === "falling" ? "animate-fade-up-11" : ""
              }`}
            >
              t
            </span>
            <span
              className={`inline-block transition-all duration-700 ${
                animationPhase === "falling" ? "animate-fade-up-12" : ""
              }`}
            >
              s
            </span>
          </div>
        </div>
      </div>

      {animationPhase === "spiral" && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-gray-800 rounded-full animate-spiral-center"></div>
          </div>

          {/* {[...Array(8)].map((_, i) => (
            <div
              key={`spiral-arm-${i}`}
              className="fixed w-2 h-96 bg-gradient-to-t from-gray-800 via-gray-600 to-transparent z-49 animate-spiral-arm"
              style={{
                left: "50%",
                top: "50%",
                transformOrigin: "0 0",
                transform: `rotate(${i * 45}deg)`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))} */}

          {[...Array(6)].map((_, i) => (
            <div
              key={`spiral-ring-${i}`}
              className="fixed border-2 border-gray-700/40 rounded-full z-48 animate-spiral-ring"
              style={{
                left: "50%",
                top: "50%",
                width: `${(i + 1) * 80}px`,
                height: `${(i + 1) * 80}px`,
                marginLeft: `-${(i + 1) * 40}px`,
                marginTop: `-${(i + 1) * 40}px`,
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}

          {/* {[...Array(20)].map((_, i) => (
            <div
              key={`spiral-particle-${i}`}
              className="fixed w-2 h-2 bg-gray-600 rounded-full z-47 animate-spiral-particle"
              style={{
                left: "50%",
                top: "50%",
                animationDelay: `${i * 0.05}s`,
              }}
            />
          ))} */}

          <div className="fixed inset-0 bg-gradient-radial from-transparent via-gray-100/50 to-white z-46 animate-spiral-expand"></div>
        </>
      )}
    </>
  );
}