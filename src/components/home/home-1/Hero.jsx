import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import  Image1  from "../../../assets/Hero/feeek1.jpg"
import  Image2  from "../../../assets/Hero/feeek2.jpg"
import  Image3  from "../../../assets/Hero/feeek3.jpg"
// import  Image4  from "../../../assets/Hero/feeek4.jpg"
// import  Image5  from "../../../assets/Hero/feeek5.jpg"
// import  Image6  from "../../../assets/Hero/feeek6.jpg"
import  Image7  from "../../../assets/Hero/feeek7.jpg"

const slides = [
  {
    id: 1,
    image: Image7,
    // mainTitle: "Levels",
    // title: "Luxury Living",
    // subtitle: "Experience premium real estate",
  },
  {
    id: 2,
    image: Image1,
    // mainTitle: "Levels",
    // title: "Modern Design",
    // subtitle: "Contemporary spaces for modern life",
  },
  {
    id: 3,
    image: Image2,
    mainTitle: "Levels",
    title: "Future Projects",
    subtitle: "Building tomorrow's communities",
  },
  {
    id: 4,
    image: Image3,
    mainTitle: "Levels",
    title: "Premium Views",
    subtitle: "Elevated living experiences",
  },
]

export default function ImageSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setTimeout(() => setIsAnimating(false), 1200)
  }, [isAnimating])

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(timer)
  }, [nextSlide])

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setTimeout(() => setIsAnimating(false), 1200)
  }

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return
    setIsAnimating(true)
    setCurrentSlide(index)
    setTimeout(() => setIsAnimating(false), 1200)
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1200 ease-in-out ${
            index === currentSlide
              ? "opacity-100 scale-100 rotate-0"
              : index === (currentSlide - 1 + slides.length) % slides.length
                ? "opacity-0 scale-110 -translate-x-full rotate-1"
                : index === (currentSlide + 1) % slides.length
                  ? "opacity-0 scale-110 translate-x-full -rotate-1"
                  : "opacity-0 scale-105 rotate-0"
          }`}
        >
          <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/50" />
          <div className="absolute inset-0 backdrop-blur-[0.5px]" />
        </div>
      ))}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-20 h-20 border border-white/5"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              animation: `float ${4 + i * 0.3}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.2}s`,
              transform: `rotate(${45 + i * 15}deg)`,
            }}
          />
        ))}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center text-white">
          <h1
            className={`text-8xl md:text-9xl font-light tracking-wider mb-4 transition-all duration-1200 ${
              isAnimating ? "opacity-0 translate-y-20 scale-95" : "opacity-100 translate-y-0 scale-100"
            }`}
            style={{
              textShadow: "0 0 30px rgba(255,255,255,0.3), 0 0 60px rgba(255,255,255,0.1)",
            }}
          >
            {slides[currentSlide].mainTitle}
          </h1>
          <div
            className={`transition-all duration-1200 delay-300 ${
              isAnimating ? "opacity-0 translate-y-20 scale-95" : "opacity-100 translate-y-0 scale-100"
            }`}
          >
            <h2 className="text-2xl md:text-3xl font-light mb-2 tracking-wide">{slides[currentSlide].title}</h2>
            <p className="text-lg md:text-xl opacity-90 tracking-wide">{slides[currentSlide].subtitle}</p>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        disabled={isAnimating}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 disabled:opacity-50 border border-white/20"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={nextSlide}
        disabled={isAnimating}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 disabled:opacity-50 border border-white/20"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isAnimating}
            className={`relative w-12 h-1 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white scale-110" : "bg-white/30 hover:bg-white/50"
            }`}
          >
            {index === currentSlide && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" />
            )}
          </button>
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <style jsx>{`
          @keyframes float {
            0% { transform: translateY(0px) scale(1); opacity: 0.6; }
            50% { transform: translateY(-20px) scale(1.1); opacity: 1; }
            100% { transform: translateY(0px) scale(1); opacity: 0.6; }
          }
        `}</style>
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${
              i % 3 === 0 ? "bg-blue-400/20" : i % 3 === 1 ? "bg-purple-400/20" : "bg-white/20"
            } ${i % 4 === 0 ? "w-2 h-2" : i % 4 === 1 ? "w-1 h-1" : "w-3 h-3"}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite alternate`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* <div className="absolute top-8 right-8 z-20 text-white/70 text-sm font-light">
        <span className="text-white font-medium">{String(currentSlide + 1).padStart(2, "0")}</span>
        <span className="mx-2">/</span>
        <span>{String(slides.length).padStart(2, "0")}</span>
      </div> */}
    </div>
  )
}
