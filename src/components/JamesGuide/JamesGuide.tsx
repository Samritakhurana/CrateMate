import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Minimize2, Maximize2, HelpCircle, Send, Loader, User, Bot } from 'lucide-react';
import toast from 'react-hot-toast';

interface JamesGuideProps {
  isFirstVisit?: boolean;
  onClose?: () => void;
  showWelcomePopup?: boolean;
}

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const JamesGuide: React.FC<JamesGuideProps> = ({ isFirstVisit = false, onClose, showWelcomePopup = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasShownWelcome, setHasShownWelcome] = useState(false);
  const [showWelcome, setShowWelcome] = useState(showWelcomePopup);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Comprehensive knowledge base for CrateMate
  const knowledgeBase: Record<string, string> = {
    // Welcome and general
    'welcome': "Hi! I'm James, your CrateMate assistant. I'm here to help you reduce fruit spoilage and maximize your profits! I can guide you through adding fruits, understanding alerts, storage tips, analytics, and much more. What would you like to learn about today?",
    
    // Adding fruits
    'add fruit': "To add fruits to CrateMate: 1) Click the green 'Add New Fruit' button on your dashboard, 2) Select your fruit type (Papaya, Mango, Banana, etc.), 3) Choose the variety if available, 4) Enter quantity and harvest date, 5) Select storage method and condition, 6) Optionally add location and environmental data. Our AI will automatically predict shelf life and suggest optimal storage conditions!",
    'add fruits': "To add fruits to CrateMate: 1) Click the green 'Add New Fruit' button on your dashboard, 2) Select your fruit type (Papaya, Mango, Banana, etc.), 3) Choose the variety if available, 4) Enter quantity and harvest date, 5) Select storage method and condition, 6) Optionally add location and environmental data. Our AI will automatically predict shelf life and suggest optimal storage conditions!",
    'how to add': "To add fruits to CrateMate: 1) Click the green 'Add New Fruit' button on your dashboard, 2) Select your fruit type (Papaya, Mango, Banana, etc.), 3) Choose the variety if available, 4) Enter quantity and harvest date, 5) Select storage method and condition, 6) Optionally add location and environmental data. Our AI will automatically predict shelf life and suggest optimal storage conditions!",
    'adding fruit': "To add fruits to CrateMate: 1) Click the green 'Add New Fruit' button on your dashboard, 2) Select your fruit type (Papaya, Mango, Banana, etc.), 3) Choose the variety if available, 4) Enter quantity and harvest date, 5) Select storage method and condition, 6) Optionally add location and environmental data. Our AI will automatically predict shelf life and suggest optimal storage conditions!",
    
    // Shelf life prediction
    'shelf life': "Our AI-powered shelf life prediction considers multiple factors: fruit type, variety, condition (excellent/good/fair/poor), storage method, temperature, and humidity. The algorithm is trained on agricultural research and real-world data. For example, Red Lady papayas in excellent condition stored refrigerated can last 8-10 days, while the same fruit at room temperature might only last 5-6 days.",
    'prediction': "Our AI-powered shelf life prediction considers multiple factors: fruit type, variety, condition (excellent/good/fair/poor), storage method, temperature, and humidity. The algorithm is trained on agricultural research and real-world data. For example, Red Lady papayas in excellent condition stored refrigerated can last 8-10 days, while the same fruit at room temperature might only last 5-6 days.",
    'how long': "Shelf life depends on many factors! Our AI considers fruit type, variety, condition, storage method, temperature, and humidity. Generally: Papayas last 5-10 days, Mangoes 3-7 days, Bananas 3-5 days, Apples 7-14 days, but this varies greatly based on storage conditions. Use our prediction tool for accurate estimates!",
    'expiry': "Expiry dates are calculated by adding the predicted shelf life to your harvest date. Our system automatically updates fruit status as they approach expiry and sends alerts 2 days before. You can view expiry dates in your inventory and get notifications to prioritize sales.",
    
    // Spoilage alerts
    'alerts': "Our spoilage alert system is your early warning system! CrateMate automatically monitors all your fruits and sends alerts 2 days before expiry. You'll get notifications for fruits that are expiring soon, already expired, or need special attention. This helps you prioritize sales and reduce waste significantly. You can customize alert timing in settings.",
    'spoilage': "Spoilage alerts help prevent waste! We monitor your inventory 24/7 and notify you when: 1) Fruits will expire in 2 days (warning), 2) Fruits have expired (urgent action needed), 3) Storage conditions need adjustment. Alerts appear on your dashboard and in the alerts section with priority levels (high/medium/low).",
    'notifications': "CrateMate sends three types of notifications: 1) Spoilage warnings (2 days before expiry), 2) Expiry alerts (when fruits expire), 3) Storage tips (helpful recommendations). All notifications appear in your alerts section and can be marked as read or deleted. You can customize notification preferences in settings.",
    'warning': "Warning alerts appear when fruits will expire within 2 days. These help you prioritize which fruits to sell first. The system considers your entire inventory and ranks urgency by days remaining. Take action by selling, processing into value-added products, or moving to better storage conditions.",
    
    // Inventory management
    'inventory': "The inventory tracker gives you a complete overview of all your fruits. You can search by fruit type or location, filter by status (fresh/warning/expired), and sort by expiry date, quantity, or fruit type. Each entry shows quantity, harvest date, storage location, days until expiry, and current condition. Use the remove button to delete items when sold or spoiled.",
    'track': "Track your fruits easily! The inventory section shows all your fruits with real-time status updates. Green means fresh (3+ days left), orange means expiring soon (1-2 days), red means expired. You can search, filter, and sort to find specific fruits quickly. Each fruit shows its location, quantity, and exact expiry countdown.",
    'manage': "Manage your inventory efficiently by: 1) Regularly checking the inventory section, 2) Using filters to find expiring fruits, 3) Updating quantities when you sell fruits, 4) Removing expired items, 5) Adding new harvests promptly. The system helps you prioritize sales and minimize waste through smart organization.",
    'search': "Search your inventory by typing fruit names, varieties, or storage locations in the search bar. You can also filter by status (all/fresh/warning/expired) and sort by expiry date, fruit type, or quantity. This helps you quickly find specific fruits or identify which ones need immediate attention.",
    
    // Storage tips
    'storage': "Our storage tips are based on agricultural research and best practices. Each fruit type has specific temperature, humidity, and handling requirements. For example: Papayas need 10-13°C and 85-90% humidity, Mangoes prefer 12-15°C, Bananas should be stored at 13-15°C. Following these tips can extend shelf life by 20-40%!",
    'temperature': "Optimal temperatures vary by fruit: Papayas 10-13°C, Mangoes 12-15°C, Bananas 13-15°C, Apples 0-4°C, Oranges 3-9°C. Too cold causes chilling injury, too warm accelerates ripening. Refrigerated storage generally extends life but some fruits like bananas shouldn't be refrigerated when green.",
    'humidity': "Most fruits need 85-95% relative humidity to prevent moisture loss and skin shriveling. Too low humidity causes wilting, too high promotes mold growth. Use perforated plastic bags in refrigerated storage to maintain humidity while allowing air circulation. Proper humidity can extend shelf life significantly.",
    'tips': "Key storage tips: 1) Handle fruits gently to avoid bruising, 2) Maintain proper temperature for each fruit type, 3) Ensure good ventilation, 4) Keep ethylene producers (bananas, apples) separate from sensitive fruits, 5) Check daily and remove spoiled fruits, 6) Use first-in-first-out rotation, 7) Store in clean, food-grade containers.",
    
    // Analytics and insights
    'analytics': "The analytics dashboard shows your performance metrics: total fruits managed, spoilage rate, revenue saved, and efficiency score. You can track trends over time and see how CrateMate helps reduce waste and increase profits. Metrics update in real-time as you add/remove fruits. It's like having business intelligence specifically for fruit management!",
    'metrics': "Key metrics include: 1) Total fruits (current inventory count), 2) Spoilage rate (percentage of expired fruits), 3) Revenue saved (estimated value of fresh fruits), 4) Efficiency score (percentage successfully sold before spoiling). These help you measure improvement and identify areas for optimization.",
    'performance': "Track your performance with detailed analytics! See daily, weekly, and monthly trends in spoilage reduction, revenue saved, and efficiency improvements. The system calculates your success rate and shows how much money you're saving by preventing waste. Use these insights to optimize your fruit management strategy.",
    'reports': "Analytics reports show: spoilage trends, revenue impact, efficiency scores, and waste reduction over time. You can see which fruit types perform best, identify seasonal patterns, and measure the ROI of better storage practices. Reports help justify investments in storage equipment and demonstrate business improvements.",
    
    // Market prices
    'market': "Our market prices feature shows real-time pricing information for different fruit types, varieties, and quality grades across various markets in India. This helps you decide the best time and place to sell your fruits for maximum profit. Prices are updated regularly and include premium, good, and average quality grades.",
    'prices': "Market prices vary by fruit type, variety, quality grade, and location. For example, premium Alphonso mangoes might fetch ₹120/kg in Pune, while average quality gets ₹60/kg. Use this data to time your sales, choose the best markets, and understand quality premiums. Knowledge is power in agriculture!",
    'selling': "Optimize your selling strategy using market data! Check current prices for your fruit types, compare different markets, and understand quality premiums. Sell premium quality fruits at premium markets, and time your sales when prices are favorable. The system helps you maximize revenue from your harvest.",
    'profit': "Maximize profits by: 1) Using market price data to time sales, 2) Maintaining fruit quality for premium prices, 3) Reducing spoilage through better storage, 4) Choosing the right markets for your fruit grades, 5) Processing lower-grade fruits into value-added products. CrateMate helps optimize every aspect of profitability.",
    
    // Specific fruit types
    'papaya': "Papayas are tropical fruits that need careful handling. Store at 10-13°C with 85-90% humidity. Red Lady variety typically lasts 7-8 days, Sunrise Solo 6-7 days. Avoid temperatures below 7°C to prevent chilling injury. Handle gently as they bruise easily. Ripe papayas should be sold quickly as they deteriorate rapidly.",
    'mango': "Mangoes should be stored at 12-15°C for optimal ripening. Alphonso variety is premium and lasts 5-6 days when ripe, Kesar lasts 4-5 days. Don't refrigerate unripe mangoes as it stops the ripening process. Keep away from direct sunlight and ensure good ventilation. Sell at optimal ripeness for best prices.",
    'banana': "Bananas need special care! Store at 13-15°C to slow ripening. Never refrigerate green bananas as it stops ripening permanently. Cavendish variety lasts 4-5 days, Robusta 3-4 days. Keep separate from other fruits as bananas produce ethylene gas that accelerates ripening in nearby fruits.",
    'apple': "Apples store exceptionally well at 0-4°C with 90-95% humidity. They can maintain quality for weeks or even months under proper conditions. Red Delicious and Granny Smith are popular varieties. Keep in ventilated containers and check regularly for spoiled apples that can affect others.",
    'orange': "Oranges and citrus fruits store well at 3-9°C with good ventilation. Valencia oranges last 2-3 weeks, Navel oranges slightly less. Avoid plastic bags that trap moisture and cause mold. Check regularly and remove any with soft spots. Citrus fruits are generally hardy but need proper air circulation.",
    
    // Technical features
    'data': "Your data is securely stored in the cloud and syncs across all your devices when you're connected to the internet. You can export your data for backup from the settings menu. All data is encrypted and protected with industry-standard security measures.",
    'sync': "Data synchronization happens when you're connected to the internet. Your fruits, alerts, and analytics sync to the cloud for backup and access from multiple devices. The app requires an internet connection for full functionality.",
    'backup': "Your data is automatically backed up to the cloud when you're online. You can also export your data manually from settings for additional backup. The export includes all fruits, alerts, and analytics in JSON format. Import feature lets you restore data on new devices.",
    'languages': "CrateMate supports multiple Indian languages including Hindi, Marathi, Gujarati, Tamil, Telugu, Kannada, and Bengali. This makes the app accessible to farmers regardless of their preferred language. Voice instructions and text input are available in regional languages for better usability.",
    
    // Business benefits
    'benefits': "CrateMate helps you: 1) Reduce spoilage by 30-50% through better tracking, 2) Increase profits by optimizing sales timing, 3) Save time with automated alerts and predictions, 4) Make data-driven decisions with analytics, 5) Access market prices for better selling strategies, 6) Learn proper storage techniques for each fruit type.",
    'roi': "Return on investment comes from: reduced spoilage (save 30-50% of potential losses), better selling prices (through quality maintenance and market timing), time savings (automated tracking vs manual), improved decision making (data-driven insights), and knowledge transfer (learning proper storage techniques). Most users see ROI within the first month!",
    'waste reduction': "Reduce waste significantly by: getting early warnings before spoilage, learning optimal storage conditions for each fruit type, prioritizing sales of expiring fruits, maintaining proper temperature and humidity, handling fruits carefully to prevent damage, and using data to improve your processes over time.",
    
    // Troubleshooting
    'problem': "Common issues and solutions: 1) Fruits spoiling faster than predicted - check storage temperature and humidity, 2) Not receiving alerts - verify notification settings, 3) Incorrect shelf life - ensure you're entering accurate harvest dates and conditions, 4) Data not syncing - check internet connection. Contact support if issues persist!",
    'help': "I'm here to help with anything related to CrateMate! You can ask me about adding fruits, understanding alerts, using the inventory tracker, storage tips, analytics, market prices, or any other feature. Just type your question and I'll provide detailed guidance. What specific help do you need?",
    'support': "For additional support: 1) Ask me any questions about CrateMate features, 2) Check the settings page for app information, 3) Export your data for backup, 4) Contact support at support@cratemate.app, 5) Call +91 98765 43210 for urgent issues. I'm available to help with any questions!",
    
    // Getting started
    'start': "Getting started with CrateMate: 1) Add your first fruit using the green 'Add New Fruit' button, 2) Enter all details for accurate predictions, 3) Check your dashboard for overview and alerts, 4) Explore inventory to see all your fruits, 5) Review analytics to track your progress, 6) Use market prices to optimize selling. Start with just a few fruits to learn the system!",
    'first time': "Welcome to CrateMate! As a first-time user: 1) Start by adding a few fruits to see how the system works, 2) Explore the dashboard to understand the interface, 3) Check out storage tips for your fruit types, 4) Set up your farm profile for personalized recommendations, 5) Ask me any questions - I'm here to help you succeed!",
    'tutorial': "Here's a quick tutorial: 1) Dashboard shows overview and quick actions, 2) Add Fruit lets you input new inventory, 3) Inventory shows all fruits with status, 4) Alerts notify you of important events, 5) Analytics track your performance, 6) Settings let you customize the app. Navigation is at the bottom of the screen. Try adding your first fruit!",
    
    // Advanced features
    'farm profile': "Set up your farm profile to get personalized recommendations! Include your farm name, location, size, primary crops, and contact information. This helps CrateMate provide location-specific advice, connect you with local markets, and customize features for your farming operation.",
    'settings': "Customize CrateMate in settings: change language preferences, adjust notification timing (1-5 days before expiry), export/import data for backup, view app information, and contact support. Settings help you tailor the app to your specific needs and preferences.",
    'export': "Export your data for backup or analysis! Go to Settings > Data Management > Export Data. This creates a JSON file with all your fruits, alerts, and analytics. You can import this file on other devices or keep it as backup. Regular exports ensure you never lose important data.",
    'feedback': "We value your feedback! Share suggestions, report bugs, or request features through the feedback system. Your input helps us improve CrateMate for all farmers. We regularly update the app based on user feedback and agricultural research.",
    
    // Seasonal advice
    'season': "Seasonal considerations: Summer requires more frequent monitoring due to heat, monsoon season needs extra attention to humidity and mold prevention, winter allows longer storage for most fruits. Adjust your storage strategies based on local weather patterns and seasonal price fluctuations.",
    'weather': "Weather affects fruit storage significantly! Hot weather accelerates ripening and spoilage, high humidity can cause mold, low humidity causes dehydration. Monitor local weather and adjust storage conditions accordingly. CrateMate's predictions account for typical seasonal variations.",
    
    // Quality management
    'quality': "Maintain fruit quality by: 1) Harvesting at optimal maturity, 2) Handling gently to prevent bruising, 3) Storing at correct temperature and humidity, 4) Ensuring good ventilation, 5) Regular inspection and removal of damaged fruits, 6) Using proper packaging materials, 7) Following first-in-first-out rotation.",
    'grading': "Fruit grading affects prices significantly! Premium grade fruits can fetch 20-30% higher prices. Grade based on size, color, firmness, absence of defects, and overall appearance. Store different grades separately and market them to appropriate buyers for maximum returns.",
    
    // Default responses for unmatched queries
    'default': "I'd be happy to help you with that! CrateMate offers comprehensive fruit management features including shelf-life prediction, spoilage alerts, inventory tracking, storage tips, analytics, and market prices. Could you be more specific about what you'd like to know? You can ask about any feature, fruit type, or farming practice related to fruit storage and management."
  };

  const suggestedQuestions = [
    "How do I add fruits?",
    "How do spoilage alerts work?",
    "What is shelf life prediction?",
    "Show me storage tips",
    "How does inventory tracking work?",
    "Explain the analytics dashboard",
    "How do market prices help?",
    "What are the benefits of CrateMate?",
    "How do I reduce fruit waste?",
    "Tell me about papaya storage",
    "What languages are supported?",
    "How do I set up my farm profile?",
    "How can I maximize profits?",
    "What's the ROI of using CrateMate?"
  ];

  useEffect(() => {
    if (showWelcomePopup && !hasShownWelcome) {
      setShowWelcome(true);
      setHasShownWelcome(true);
    }
  }, [showWelcomePopup, hasShownWelcome]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const handleWelcomeMessage = () => {
    const welcomeText = knowledgeBase['welcome'];
    
    setConversation([{
      role: 'assistant',
      content: welcomeText,
      timestamp: new Date(),
    }]);
  };

  const findBestResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Direct keyword matching
    for (const [key, response] of Object.entries(knowledgeBase)) {
      if (key === 'default') continue;
      
      // Check for exact phrase matches
      if (lowerMessage.includes(key.toLowerCase())) {
        return response;
      }
      
      // Check for word matches
      const keyWords = key.toLowerCase().split(' ');
      const messageWords = lowerMessage.split(' ');
      const matchCount = keyWords.filter(word => messageWords.includes(word)).length;
      
      if (matchCount === keyWords.length && keyWords.length > 1) {
        return response;
      }
    }
    
    // Fuzzy matching for common variations
    const fuzzyMatches: Record<string, string[]> = {
      'add fruit': ['add', 'new', 'create', 'input', 'enter', 'fruit', 'fruits'],
      'alerts': ['alert', 'notification', 'notify', 'warning', 'remind'],
      'storage': ['store', 'keep', 'preserve', 'maintain', 'temperature', 'humidity'],
      'inventory': ['list', 'track', 'manage', 'view', 'see', 'show'],
      'analytics': ['data', 'report', 'statistics', 'performance', 'metrics'],
      'help': ['help', 'assist', 'guide', 'support', 'how', 'what', 'explain'],
      'market': ['price', 'sell', 'selling', 'market', 'profit', 'money'],
      'shelf life': ['shelf', 'life', 'last', 'expire', 'expiry', 'fresh'],
      'spoilage': ['spoil', 'rot', 'bad', 'waste', 'damage'],
      'benefits': ['benefit', 'advantage', 'why', 'good', 'useful']
    };
    
    for (const [key, keywords] of Object.entries(fuzzyMatches)) {
      const matchCount = keywords.filter(keyword => lowerMessage.includes(keyword)).length;
      if (matchCount >= 2) {
        return knowledgeBase[key] || knowledgeBase['default'];
      }
    }
    
    return knowledgeBase['default'];
  };

  const simulateTyping = async (text: string): Promise<void> => {
    setIsTyping(true);
    // Simulate typing delay based on text length
    const delay = Math.min(Math.max(text.length * 15, 800), 2000);
    await new Promise(resolve => setTimeout(resolve, delay));
    setIsTyping(false);
  };

  const handleUserMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: ConversationMessage = {
      role: 'user',
      content: message,
      timestamp: new Date(),
    };
    
    setConversation(prev => [...prev, userMessage]);
    setUserInput('');
    
    // Find appropriate response
    const responseText = findBestResponse(message);
    
    // Simulate typing
    await simulateTyping(responseText);
    
    // Add assistant response
    const assistantMessage: ConversationMessage = {
      role: 'assistant',
      content: responseText,
      timestamp: new Date(),
    };
    
    setConversation(prev => [...prev, assistantMessage]);
  };

  const handleSuggestedQuestion = (question: string) => {
    handleUserMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (userInput.trim()) {
        handleUserMessage(userInput);
      }
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  const handleWelcomeStart = () => {
    setShowWelcome(false);
    setIsOpen(true);
    handleWelcomeMessage();
  };

  const handleWelcomeDismiss = () => {
    setShowWelcome(false);
  };

  // Welcome popup
  if (showWelcome) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-in fade-in duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">J</span>
              </div>
              <div>
                <h3 className="font-semibold">Meet James</h3>
                <p className="text-xs text-blue-100">Your CrateMate Assistant</p>
              </div>
            </div>
            <button
              onClick={handleWelcomeDismiss}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-blue-600">J</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Hi! I'm James 👋
              </h3>
              <p className="text-gray-600 leading-relaxed">
                I'm here to help you with your CrateMate journey! I can assist you with adding fruits, understanding alerts, storage tips, analytics, and answer any questions about reducing fruit spoilage.
              </p>
            </div>

            {/* Features Preview */}
            <div className="mb-6">
              <p className="text-sm text-gray-500 text-center mb-3">I can help you with:</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-center">
                  Adding Fruits
                </div>
                <div className="bg-green-50 text-green-700 px-3 py-2 rounded-lg text-center">
                  Storage Tips
                </div>
                <div className="bg-orange-50 text-orange-700 px-3 py-2 rounded-lg text-center">
                  Spoilage Alerts
                </div>
                <div className="bg-purple-50 text-purple-700 px-3 py-2 rounded-lg text-center">
                  Analytics
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleWelcomeStart}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
              >
                Start Chat with James
              </button>
              
              <button
                onClick={handleWelcomeDismiss}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Chat button (positioned on left)
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 left-4 z-50 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      >
        <MessageCircle className="h-6 w-6" />
        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
          J
        </div>
      </button>
    );
  }

  // Chat interface (positioned on left)
  return (
    <div className={`fixed bottom-24 left-4 z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-2xl">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-bold">J</span>
          </div>
          <div>
            <h3 className="font-semibold">James - CrateMate Assistant</h3>
            <p className="text-xs text-blue-100">
              Always here to help! 🌱
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </button>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Chat Section */}
          <div className="flex-1 flex flex-col h-[520px]">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {conversation.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[85%] ${
                    message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-green-100 text-green-600'
                    }`}>
                      {message.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>
                    <div
                      className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white rounded-br-md'
                          : 'bg-gray-100 text-gray-800 rounded-bl-md'
                      }`}
                    >
                      {message.content}
                      <div className={`text-xs mt-2 opacity-70 ${
                        message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-md">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {conversation.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  <HelpCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Ask James anything about CrateMate!</p>
                  <p className="text-xs text-gray-400 mt-1">I'm here to help you succeed! 🌱</p>
                </div>
              )}
              
              <div ref={chatEndRef} />
            </div>

            {/* Suggested Questions */}
            {conversation.length <= 1 && (
              <div className="p-3 border-t border-gray-200 bg-gray-50">
                <p className="text-xs text-gray-600 mb-2">Popular questions:</p>
                <div className="flex flex-wrap gap-1">
                  {suggestedQuestions.slice(0, 4).map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full hover:bg-blue-200 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Section */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask James about CrateMate..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  disabled={isTyping}
                />
                <button
                  onClick={() => userInput.trim() && handleUserMessage(userInput)}
                  disabled={!userInput.trim() || isTyping}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isTyping ? <Loader className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                James is here to help with any CrateMate questions! 🌱
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default JamesGuide;