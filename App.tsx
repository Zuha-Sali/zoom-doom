import React, { useState, useEffect, useRef } from 'react';
import { Zap, RotateCcw, Eye, Volume2, Skull } from 'lucide-react';

interface GameImage {
  id: string;
  fullUrl: string;
  type: 'crust' | 'fruit';
  correctAnswer: string;
  name: string;
  cropX: number;
  cropY: number;
  scale: number;
}

const IMAGES: GameImage[] = [
  // Crust Images (Bread Crust, Rusk, Pizza Crust)
  {
    id: 'crust1',
    fullUrl: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'crust',
    correctAnswer: 'bread-crust',
    name: 'Artisan Bread Crust',
    cropX: 65,
    cropY: 40,
    scale: 6
  },
  {
    id: 'crust2',
    fullUrl: 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'crust',
    correctAnswer: 'rusk',
    name: 'Rustic Rusk',
    cropX: 45,
    cropY: 55,
    scale: 5.5
  },
  {
    id: 'crust3',
    fullUrl: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'crust',
    correctAnswer: 'pizza-crust',
    name: 'Pizza Crust Edge',
    cropX: 30,
    cropY: 70,
    scale: 7
  },
  {
    id: 'crust4',
    fullUrl: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'crust',
    correctAnswer: 'bread-crust',
    name: 'Sourdough Texture',
    cropX: 80,
    cropY: 25,
    scale: 8
  },
  {
    id: 'crust5',
    fullUrl: 'https://images.pexels.com/photos/4110039/pexels-photo-4110039.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'crust',
    correctAnswer: 'rusk',
    name: 'Baguette Rusk',
    cropX: 55,
    cropY: 45,
    scale: 6.5
  },
  {
    id: 'crust6',
    fullUrl: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'crust',
    correctAnswer: 'pizza-crust',
    name: 'Crispy Pizza Edge',
    cropX: 75,
    cropY: 35,
    scale: 7.5
  },
  
  // Green Fruit Interior Images (Kiwi, Cucumber, Green Grape)
  {
    id: 'fruit1',
    fullUrl: 'https://images.pexels.com/photos/128420/pexels-photo-128420.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'fruit',
    correctAnswer: 'cucumber',
    name: 'Cucumber Interior',
    cropX: 50,
    cropY: 50,
    scale: 8
  },
  {
    id: 'fruit2',
    fullUrl: 'https://images.pexels.com/photos/357573/pexels-photo-357573.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'fruit',
    correctAnswer: 'kiwi',
    name: 'Kiwi Cross-Section',
    cropX: 45,
    cropY: 55,
    scale: 7
  },
  {
    id: 'fruit3',
    fullUrl: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'fruit',
    correctAnswer: 'green-grape',
    name: 'Green Grape Interior',
    cropX: 60,
    cropY: 40,
    scale: 9
  },
  {
    id: 'fruit4',
    fullUrl: 'https://images.pexels.com/photos/128420/pexels-photo-128420.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'fruit',
    correctAnswer: 'cucumber',
    name: 'Cucumber Seeds',
    cropX: 35,
    cropY: 65,
    scale: 10
  },
  {
    id: 'fruit5',
    fullUrl: 'https://images.pexels.com/photos/357573/pexels-photo-357573.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'fruit',
    correctAnswer: 'kiwi',
    name: 'Kiwi Flesh Texture',
    cropX: 70,
    cropY: 30,
    scale: 8.5
  },
  {
    id: 'fruit6',
    fullUrl: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'fruit',
    correctAnswer: 'green-grape',
    name: 'Green Grape Flesh',
    cropX: 25,
    cropY: 75,
    scale: 7.5
  }
];

function App() {
  const [currentImage, setCurrentImage] = useState<GameImage | null>(null);
  const [gameState, setGameState] = useState<'guessing' | 'revealed'>('guessing');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhanceLevel, setEnhanceLevel] = useState(1);
  const [showDramaticEffect, setShowDramaticEffect] = useState(false);
  const [doomLevel, setDoomLevel] = useState(1);
  const [userGuess, setUserGuess] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * IMAGES.length);
    return IMAGES[randomIndex];
  };

  const startNewRound = () => {
    setCurrentImage(getRandomImage());
    setGameState('guessing');
    setIsEnhancing(false);
    setEnhanceLevel(1);
    setShowDramaticEffect(false);
    setDoomLevel(Math.floor(Math.random() * 5) + 1);
    setUserGuess(null);
    setIsCorrect(null);
  };

  const handleGuess = (guess: string) => {
    setUserGuess(guess);
    setIsCorrect(currentImage?.correctAnswer === guess);
    setShowDramaticEffect(true);
    setGameState('revealed');
    
    // Dramatic reveal effect
    setTimeout(() => setShowDramaticEffect(false), 1500);
  };

  const handleSkip = () => {
    setUserGuess(null);
    setIsCorrect(null);
    setShowDramaticEffect(true);
    setGameState('revealed');
    
    setTimeout(() => setShowDramaticEffect(false), 1500);
  };

  const handleEnhance = () => {
    if (isEnhancing) return;
    
    setIsEnhancing(true);
    setEnhanceLevel(prev => prev + 1);
    setDoomLevel(prev => prev + 1);
    
    // Stop enhancing after random time (3-6 seconds) - completely useless
    const randomTime = Math.random() * 3000 + 3000;
    setTimeout(() => {
      setIsEnhancing(false);
    }, randomTime);
  };

  useEffect(() => {
    startNewRound();
  }, []);

  if (!currentImage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900 flex items-center justify-center">
        <div className="text-2xl text-white">INITIALIZING DOOM...</div>
      </div>
    );
  }

  const getOptionsForType = (type: 'crust' | 'fruit') => {
    if (type === 'crust') {
      return [
        { id: 'bread-crust', label: '🍞 BREAD CRUST', color: 'from-amber-700 to-orange-600 hover:from-amber-600 hover:to-orange-500 border-orange-400' },
        { id: 'rusk', label: '🥖 RUSK', color: 'from-yellow-700 to-amber-600 hover:from-yellow-600 hover:to-amber-500 border-amber-400' },
        { id: 'pizza-crust', label: '🍕 PIZZA CRUST', color: 'from-red-700 to-orange-600 hover:from-red-600 hover:to-orange-500 border-red-400' }
      ];
    } else {
      return [
        { id: 'kiwi', label: '🥝 KIWI', color: 'from-green-700 to-lime-600 hover:from-green-600 hover:to-lime-500 border-lime-400' },
        { id: 'cucumber', label: '🥒 CUCUMBER', color: 'from-emerald-700 to-green-600 hover:from-emerald-600 hover:to-green-500 border-green-400' },
        { id: 'green-grape', label: '🍇 GREEN GRAPE', color: 'from-teal-700 to-emerald-600 hover:from-teal-600 hover:to-emerald-500 border-emerald-400' }
      ];
    }
  };

  const getCorrectAnswerLabel = (answer: string) => {
    const allOptions = [
      ...getOptionsForType('crust'),
      ...getOptionsForType('fruit')
    ];
    return allOptions.find(opt => opt.id === answer)?.label || answer;
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900 transition-all duration-1000 ${showDramaticEffect ? 'animate-pulse bg-red-600' : ''}`}>
      {/* Dramatic Header */}
      <div className="text-center py-8">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-500 to-yellow-400 mb-2 tracking-wider drop-shadow-lg">
          ZOOM & DOOM
        </h1>
        <p className="text-xl text-gray-300 font-mono tracking-wider">
          {gameState === 'guessing' ? 'MICROSCOPIC ANALYSIS IN PROGRESS...' : 'SPECIMEN IDENTIFIED'}
        </p>
        <div className="flex items-center justify-center gap-4 mt-2">
          <div className="flex items-center gap-2 text-red-400">
            <Skull className="w-5 h-5" />
            <span className="font-mono">DOOM LEVEL: {doomLevel}</span>
          </div>
        </div>
        {isEnhancing && (
          <div className="mt-4 text-green-400 font-mono text-lg animate-bounce">
            ENHANCING DOOM... LEVEL {enhanceLevel} {'.'.repeat(enhanceLevel % 4)}
          </div>
        )}
      </div>

      {/* Main Game Area */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <div className="bg-black/50 backdrop-blur-sm rounded-3xl p-8 border border-red-700 shadow-2xl shadow-red-900/50">
          
          {/* Image Display */}
          <div className="relative mb-8">
            <div className={`relative w-full h-96 rounded-2xl overflow-hidden border-4 transition-all duration-500 ${
              gameState === 'revealed' ? 
                (isCorrect === true ? 'border-green-400 shadow-lg shadow-green-400/20' : 
                 isCorrect === false ? 'border-red-400 shadow-lg shadow-red-400/20' : 
                 'border-yellow-400 shadow-lg shadow-yellow-400/20') : 
                'border-red-400 shadow-lg shadow-red-400/20'
            } ${isEnhancing ? 'animate-pulse' : ''}`}>
              
              {gameState === 'guessing' ? (
                // Zoomed/Cropped View
                <div 
                  className={`w-full h-full bg-cover bg-center transition-transform duration-300 ${
                    isEnhancing ? 'animate-spin scale-110' : ''
                  }`}
                  style={{
                    backgroundImage: `url(${currentImage.fullUrl})`,
                    backgroundPosition: `${currentImage.cropX}% ${currentImage.cropY}%`,
                    transform: `scale(${currentImage.scale + (isEnhancing ? enhanceLevel * 0.3 : 0)})`,
                    filter: `contrast(${120 + (isEnhancing ? enhanceLevel * 10 : 0)}%) saturate(${100 + (isEnhancing ? enhanceLevel * 20 : 0)}%)`,
                  }}
                />
              ) : (
                // Full Image Reveal
                <div 
                  className="w-full h-full bg-cover bg-center animate-in fade-in duration-1000"
                  style={{
                    backgroundImage: `url(${currentImage.fullUrl})`,
                    backgroundPosition: 'center',
                  }}
                />
              )}

              {/* Scanning Lines Effect */}
              {gameState === 'guessing' && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-400/10 to-transparent animate-pulse" />
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-400 to-transparent animate-pulse" />
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-400 to-transparent animate-pulse" />
                  <div className="absolute top-1/2 left-0 w-full h-px bg-red-400/50 animate-ping" />
                </div>
              )}

              {/* Revealed Badge */}
              {gameState === 'revealed' && (
                <div className="absolute top-4 right-4 space-y-2">
                  <div className={`px-6 py-2 rounded-full border shadow-lg animate-in slide-in-from-top-2 ${
                    isCorrect === true ? 'bg-gradient-to-r from-green-500 to-emerald-600 border-green-400' :
                    isCorrect === false ? 'bg-gradient-to-r from-red-500 to-red-600 border-red-400' :
                    'bg-gradient-to-r from-yellow-500 to-orange-600 border-yellow-400'
                  }`}>
                    <div className="flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      <span className="font-bold text-white uppercase tracking-wide">
                        {currentImage.name}
                      </span>
                    </div>
                  </div>
                  {userGuess && (
                    <div className={`px-4 py-1 rounded-full text-sm font-mono ${
                      isCorrect ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                    }`}>
                      {isCorrect ? '✓ CORRECT!' : '✗ WRONG!'}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Technical Readout */}
            <div className="mt-4 bg-black/70 rounded-lg p-4 border border-red-600 font-mono text-sm">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-400">
                <div>STATUS: <span className="text-red-400">{gameState === 'guessing' ? 'ANALYZING' : 'DOOMED'}</span></div>
                <div>ZOOM: <span className="text-orange-400">{Math.round(currentImage.scale * 100)}%</span></div>
                <div>ENHANCE: <span className="text-yellow-400">LEVEL {enhanceLevel}</span></div>
                <div>CONFUSION: <span className="text-red-400">MAXIMUM</span></div>
              </div>
            </div>
          </div>

          {/* Control Panel */}
          <div className="space-y-6">
            {gameState === 'guessing' ? (
              <>
                {/* Category Indicator */}
                <div className="text-center">
                  <div className="inline-block bg-black/70 px-6 py-2 rounded-full border border-red-600">
                    <span className="text-red-400 font-mono text-lg">
                      CATEGORY: {currentImage.type === 'crust' ? 'CRUST SPECIMEN' : 'FRUIT INTERIOR'}
                    </span>
                  </div>
                </div>

                {/* Guess Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {getOptionsForType(currentImage.type).map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleGuess(option.id)}
                      className={`group relative bg-gradient-to-r ${option.color} text-white font-bold py-6 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl border`}
                    >
                      <span className="relative z-10 text-lg tracking-wide">{option.label}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                    </button>
                  ))}
                </div>

                {/* Utility Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={handleEnhance}
                    disabled={isEnhancing}
                    className={`group relative bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 disabled:from-red-900 disabled:to-red-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-red-500/25 border border-red-400 disabled:opacity-50 disabled:cursor-not-allowed ${
                      isEnhancing ? 'animate-pulse' : ''
                    }`}
                  >
                    <div className="flex items-center justify-center gap-3">
                      <Zap className={`w-5 h-5 ${isEnhancing ? 'animate-spin' : ''}`} />
                      <span className="text-lg tracking-wide">
                        {isEnhancing ? 'DOOMING...' : 'ENHANCE DOOM'}
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={handleSkip}
                    className="group relative bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-gray-500/25 border border-gray-400"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <Volume2 className="w-5 h-5" />
                      <span className="text-lg tracking-wide">SURRENDER</span>
                    </div>
                  </button>
                </div>
              </>
            ) : (
              /* Revealed State */
              <div className="text-center space-y-6">
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                  IT WAS {getCorrectAnswerLabel(currentImage.correctAnswer)}!
                </div>
                
                {userGuess && (
                  <div className={`text-2xl font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                    You guessed: {getCorrectAnswerLabel(userGuess)}
                    <div className="text-lg mt-2">
                      {isCorrect ? '🎉 CORRECT! You survived the doom!' : '💀 WRONG! The doom claims another victim!'}
                    </div>
                  </div>
                )}
                
                <p className="text-xl text-gray-300 font-mono">
                  {currentImage.type === 'crust' ? 'CARBOHYDRATE SPECIMEN CONFIRMED' : 'ORGANIC FRUIT MATTER DETECTED'}
                </p>
                <div className="text-lg text-red-400 font-mono animate-pulse">
                  DOOM LEVEL: {doomLevel} • CONFUSION: ACHIEVED
                </div>
                
                <button
                  onClick={startNewRound}
                  className="group relative bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-600 hover:to-purple-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 border border-purple-400"
                >
                  <div className="flex items-center justify-center gap-3">
                    <RotateCcw className="w-5 h-5" />
                    <span className="text-xl tracking-wide">NEXT DOOM</span>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-400 font-mono text-sm">
          <p>⚠️ Warning: This application will doom your productivity ⚠️</p>
          <p className="mt-2">Enhance button effectiveness: 0% • Confusion level: MAXIMUM • Doom: INEVITABLE</p>
          <p className="mt-1 text-red-400">Can you tell bread crust from cucumber seeds? Probably not.</p>
        </div>
      </div>
    </div>
  );
}

export default App;