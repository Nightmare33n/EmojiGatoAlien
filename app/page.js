"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [clickCount, setClickCount] = useState(0);
  const [showImage, setShowImage] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    setClickCount(prev => prev + 1);

    setTimeout(() => {
      setIsAnimating(false);
    }, 200);
  };

  const resetCounter = () => {
    setClickCount(0);
    setShowImage(false);
  };

  useEffect(() => {
    if (clickCount >= 10) {
      setShowImage(true);
    }
  }, [clickCount]);

  const progressPercentage = Math.min((clickCount / 10) * 100, 100);
  const remainingClicks = Math.max(10 - clickCount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-md w-full">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-white mb-2">
             Emoji Gato Alien JUGAR
          </h1>
          <p className="text-gray-300">
            {showImage
              ? "EMOJI GATO ALIEN 🎉"
              : `Haz clic ${remainingClicks} veces más para revelar el secreto...`
            }
          </p>
        </div>

        <div className="space-y-6">
          <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          <div className="text-2xl font-bold text-white">
            {clickCount} / 10 clics
          </div>

          <button
            onClick={handleClick}
            className={`
              px-8 py-4 rounded-xl font-bold text-white text-lg
              bg-gradient-to-r from-green-500 to-emerald-600
              hover:from-green-400 hover:to-emerald-500
              active:from-green-600 active:to-emerald-700
              transform transition-all duration-200
              shadow-lg hover:shadow-xl cursor-pointer
              ${isAnimating ? 'scale-95' : 'hover:scale-105'}
              ${showImage ? 'animate-pulse' : ''}
            `}
          >
            🎯 EMOJI GATO ALIEN
          </button>

          {showImage && (
            <div className="space-y-4 animate-fade-in">
              <div className="relative w-64 h-64 mx-auto animate-bounce">
                <Image
                  src="/emojigatoalien.webp"
                  alt="Emoji Gato Alien"
                  fill
                  className="object-contain rounded-xl"
                  priority
                />
              </div>

              <button
                onClick={resetCounter}
                className="px-6 py-2 bg-red-500 hover:bg-red-400 text-white rounded-lg font-medium transition-colors duration-200"
              >
                🔄 Jugar de nuevo
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
