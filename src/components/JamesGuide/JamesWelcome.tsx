import React, { useState, useEffect } from 'react';
import { Play, Volume2, VolumeX, X } from 'lucide-react';

interface JamesWelcomeProps {
  onClose: () => void;
  onStartChat: () => void;
}

const JamesWelcome: React.FC<JamesWelcomeProps> = ({ onClose, onStartChat }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Preloaded welcome message for slow internet
  const welcomeMessage = {
    text: "Hello! I'm James, your CrateMate guide. I'm here to help you make the most of our smart fruit management platform. Whether you're a farmer looking to reduce spoilage or a seller wanting to optimize your inventory, I'll guide you through every feature. Click 'Start Chat' to begin!",
    videoUrl: null, // Will be populated when video is ready
    thumbnailUrl: '/james-thumbnail.jpg', // Placeholder thumbnail
  };

  const handlePlayWelcome = () => {
    setIsPlaying(true);
    // In a real implementation, this would trigger the welcome video
    setTimeout(() => {
      setIsPlaying(false);
    }, 5000); // Simulate 5-second video
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold text-lg">J</span>
            </div>
            <div>
              <h3 className="font-semibold">Meet James</h3>
              <p className="text-xs text-blue-100">Your CrateMate Guide</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Video/Avatar Section */}
        <div className="p-6">
          <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl overflow-hidden aspect-video mb-4">
            {isPlaying ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-pulse">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">J</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold text-2xl">J</span>
                  </div>
                  <button
                    onClick={handlePlayWelcome}
                    className="bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 transition-all duration-200 shadow-lg"
                  >
                    <Play className="h-6 w-6 text-blue-600" />
                  </button>
                </div>
              </div>
            )}
            
            <div className="absolute bottom-2 right-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="bg-black bg-opacity-50 text-white p-1 rounded"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Welcome Text */}
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Welcome to CrateMate!
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {welcomeMessage.text}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={onStartChat}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
            >
              Start Chat with James
            </button>
            
            <button
              onClick={onClose}
              className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Maybe Later
            </button>
          </div>

          {/* Features Preview */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center mb-3">James can help you with:</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-center">
                Adding Fruits
              </div>
              <div className="bg-green-50 text-green-700 px-2 py-1 rounded text-center">
                Storage Tips
              </div>
              <div className="bg-orange-50 text-orange-700 px-2 py-1 rounded text-center">
                Spoilage Alerts
              </div>
              <div className="bg-purple-50 text-purple-700 px-2 py-1 rounded text-center">
                Analytics
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JamesWelcome;