import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Package2, ArrowLeft, Globe, Volume2, CheckCircle, Users, Smartphone } from 'lucide-react';

const LanguageSupport = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const returnTo = location.state?.returnTo || '/';

  const languages = [
    { code: 'english', name: 'English', nativeName: 'English', flag: '🇺🇸', speakers: '125M+' },
    { code: 'hindi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳', speakers: '600M+' },
    { code: 'marathi', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳', speakers: '83M+' },
    { code: 'gujarati', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳', speakers: '56M+' },
    { code: 'tamil', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', speakers: '75M+' },
    { code: 'telugu', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', speakers: '82M+' },
    { code: 'kannada', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳', speakers: '44M+' },
    { code: 'bengali', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳', speakers: '230M+' }
  ];

  const features = [
    {
      icon: Globe,
      title: 'Multi-Language Interface',
      description: 'Complete app interface translated into local languages for better understanding.',
    },
    {
      icon: Volume2,
      title: 'Voice Instructions',
      description: 'Audio guidance in local languages for farmers with limited literacy.',
    },
    {
      icon: Smartphone,
      title: 'Smart Input',
      description: 'Voice-to-text input in regional languages for easy data entry.',
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Connect with local farming communities in your preferred language.',
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() => {
                if (window.history.length > 1) {
                  navigate(-1);
                } else {
                  navigate('/');
                }
              }}
              className="flex items-center space-x-3 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </button>

            <div className="flex items-center space-x-3">
              <Package2 className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">CrateMate</h1>
                <p className="text-xs text-gray-500">Language Support</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="bg-indigo-100 p-4 rounded-full w-20 h-20 mx-auto mb-6">
            <Globe className="h-12 w-12 text-indigo-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Language Support
          </h1>
          <p className="text-xl text-gray-600">
            CrateMate speaks your language for better accessibility
          </p>
        </div>

        {/* Language Selection */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Languages For Titles!</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {languages.map((language) => (
              <div
                key={language.code}
                className="p-4 rounded-xl border-2 border-gray-200 bg-white hover:border-indigo-300 transition-colors"
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">{language.flag}</div>
                  <h3 className="font-semibold text-gray-900">{language.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{language.nativeName}</p>
                  <p className="text-xs text-gray-500 mb-2">{language.speakers} speakers</p>
                  <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Available
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Icon className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Coming soon!
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Voice Features */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Voice Features coming soon!</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Voice Instructions</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Volume2 className="h-5 w-5 text-indigo-600" />
                  <span className="text-gray-700">Step-by-step audio guidance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Volume2 className="h-5 w-5 text-indigo-600" />
                  <span className="text-gray-700">Alert notifications in local language</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Volume2 className="h-5 w-5 text-indigo-600" />
                  <span className="text-gray-700">Storage tips read aloud</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Voice Input</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Smartphone className="h-5 w-5 text-indigo-600" />
                  <span className="text-gray-700">Speak to add fruit details</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Smartphone className="h-5 w-5 text-indigo-600" />
                  <span className="text-gray-700">Voice search in inventory</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Smartphone className="h-5 w-5 text-indigo-600" />
                  <span className="text-gray-700">Hands-free operation</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Regional Impact */}
        <div className="bg-gradient-to-r from-green-600 to-indigo-600 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-6 text-center">Breaking Language Barriers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-white bg-opacity-20 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">Inclusive Design</h3>
              <p className="text-sm text-green-100">
                Making technology accessible to farmers regardless of their language or literacy level
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">Cultural Sensitivity</h3>
              <p className="text-sm text-green-100">
                Respecting local languages and cultural contexts in agricultural practices
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">Better Adoption</h3>
              <p className="text-sm text-green-100">
                Higher app adoption rates when farmers can use it in their native language
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSupport;
