import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package2, Calculator, Bell, Lightbulb, BarChart3, Wifi, Globe, ArrowRight, TrendingDown, DollarSign, Users, Play, CheckCircle, Star, Mail, MapPin, Leaf, Shield, Zap, Award, Menu, X } from 'lucide-react';

// Language translations
const translations = {
  english: {
    title: "Turning Spoilage into Strength",
    subtitle: "A smart app to reduce fruit spoilage and boost profits for small farmers",
    watchDemo: "Watch Demo Video",
    tryTool: "Try Prediction Tool",
    spoilageCrisis: "Stop the Loss. Start the Gain.",
    spoilageDescription: "30–40% of fruit harvest is lost due to poor storage and lack of shelf-life tracking. Small farmers lose thousands every month. CrateMate helps them take control, reduce spoilage, and boost income.",
    ourSolution: "Our Solution – Antimicrobial, Sustainable Packaging",
    solutionDescription: "Bamboo-based storage box – durable, eco-friendly, and biodegradable",
    researchEvidence: "Research & Evidence",
    seeInAction: "Real Stories, Real Impact",
    whatFarmersSay: "What Farmers Say",
    smartTechnology: "Smart, Simple, and Sustainable",
    whyCrateMate: "Why CrateMate?",
    contact: "Contact",
    features: "Features",
    solution: "Solution",
    research: "Research",
    demo: "Demo",
    team: "Team",
    dashboard: "Login / Sign up"
  },
  hindi: {
    title: "अधिक बचाएं, कम बर्बाद करें",
    subtitle: "छोटे किसानों के लिए फलों की बर्बादी कम करने और मुनाफा बढ़ाने के लिए एक स्मार्ट ऐप",
    watchDemo: "डेमो वीडियो देखें",
    tryTool: "भविष्यवाणी उपकरण आज़माएं",
    spoilageCrisis: "खराब होने की समस्या",
    spoilageDescription: "खराब फसल के बाद की देखभाल के कारण 30-40% फल की फसल बर्बाद हो जाती है। छोटे किसान अनट्रैक्ड शेल्फ-लाइफ और खराब भंडारण के कारण मासिक हजारों रुपये खो देते हैं। CrateMate किसानों को नियंत्रण लेने के लिए उपकरण देता है।",
    ourSolution: "हमारा समाधान – रोगाणुरोधी, टिकाऊ पैकेजिंग",
    solutionDescription: "बांस आधारित भंडारण बॉक्स – टिकाऊ, पर्यावरण-अनुकूल, और बायोडिग्रेडेबल",
    researchEvidence: "अनुसंधान और साक्ष्य",
    seeInAction: "CrateMate को काम में देखें",
    whatFarmersSay: "किसान क्या कहते हैं",
    smartTechnology: "स्मार्ट तकनीक द्वारा संचालित",
    whyCrateMate: "CrateMate क्यों?",
    contact: "संपर्क",
    features: "विशेषताएं",
    solution: "समाधान",
    research: "अनुसंधान",
    demo: "डेमो",
    team: "टीम",
    dashboard: "डैशबोर्ड"
  },
  
  marathi: {
    title: "अधिक वाचवा, कमी वाया करा",
    subtitle: "लहान शेतकऱ्यांसाठी फळांची नासाडी कमी करण्यासाठी आणि नफा वाढवण्यासाठी एक स्मार्ट अॅप",
    watchDemo: "डेमो व्हिडिओ पहा",
    tryTool: "भविष्यवाणी साधन वापरून पहा",
    spoilageCrisis: "नासाडीची समस्या",
    spoilageDescription: "अपुऱ्या कापणीनंतरच्या काळजीमुळे 30-40% फळांची पीक नष्ट होते। लहान शेतकरी अनट्रॅक्ड शेल्फ-लाइफ आणि खराब साठवणुकीमुळे मासिक हजारो गमावतात। CrateMate शेतकऱ्यांना नियंत्रण घेण्यासाठी साधने देते।",
    ourSolution: "आमचे समाधान – जंतुनाशक, टिकाऊ पॅकेजिंग",
    solutionDescription: "बांबू आधारित साठवण बॉक्स – टिकाऊ, पर्यावरणपूरक आणि बायोडिग्रेडेबल",
    researchEvidence: "संशोधन आणि पुरावे",
    seeInAction: "CrateMate ला कामात पहा",
    whatFarmersSay: "शेतकरी काय म्हणतात",
    smartTechnology: "स्मार्ट तंत्रज्ञानाने चालवलेले",
    whyCrateMate: "CrateMate का?",
    contact: "संपर्क",
    features: "वैशिष्ट्ये",
    solution: "समाधान",
    research: "संशोधन",
    demo: "डेमो",
    team: "टीम",
    dashboard: "डॅशबोर्ड"
  },

gujarati: {
    title: "વધુ બચાવો, ઓછો બગાડ કરો",
    subtitle: "નાના ખેડૂતો માટે ફળોનો બગાડ ઘટાડવા અને નફો વધારવા માટે એક સ્માર્ટ એપ",
    watchDemo: "ડેમો વિડિયો જુઓ",
    tryTool: "આગાહી સાધન અજમાવો",
    spoilageCrisis: "બગાડની સમસ્યા",
    spoilageDescription: "અપૂરતી કાપણી પછીની સંભાળને કારણે 30-40% ફળોની પાક બગડે છે। નાના ખેડૂતો અનટ્રેક્ડ શેલ્ફ-લાઇફ અને ખરાબ સંગ્રહને કારણે માસિક હજારો ગુમાવે છે। CrateMate ખેડૂતોને નિયંત્રણ લેવા માટે સાધનો આપે છે।",
    ourSolution: "અમારો ઉકેલ – એન્ટિમાઇક્રોબાયલ, ટકાઉ પેકેજિંગ",
    solutionDescription: "વાંસ આધારિત સંગ્રહ બોક્સ – ટકાઉ, પર્યાવરણ-અનુકૂળ અને બાયોડિગ્રેડેબલ",
    researchEvidence: "સંશોધન અને પુરાવા",
    seeInAction: "CrateMate ને કામમાં જુઓ",
    whatFarmersSay: "ખેડૂતો શું કહે છે",
    smartTechnology: "સ્માર્ટ ટેકનોલોજી દ્વારા સંચાલિત",
    whyCrateMate: "CrateMate કેમ?",
    contact: "સંપર્ક",
    features: "લક્ષણો",
    solution: "ઉકેલ",
    research: "સંશોધન",
    demo: "ડેમો",
    team: "ટીમ",
    dashboard: "ડૅશબોર્ડ"
  },
  
  
  tamil: {
    title: "அதிகம் சேமிக்கவும், குறைவாக வீணாக்கவும்",
    subtitle: "சிறு விவசாயிகளுக்கு பழங்களின் கெட்டுப்போதலைக் குறைத்து லாபத்தை அதிகரிக்க ஒரு ஸ்மார்ட் ஆப்",
    watchDemo: "டெமோ வீடியோவைப் பார்க்கவும்",
    tryTool: "முன்னறிவிப்பு கருவியை முயற்சிக்கவும்",
    spoilageCrisis: "கெட்டுப்போதல் நெருக்கடி",
    spoilageDescription: "போதுமான அறுவடைக்குப் பிந்தைய பராமரிப்பு இல்லாததால் 30-40% பழ அறுவடை இழக்கப்படுகிறது। சிறு விவசாயிகள் கண்காணிக்கப்படாத அடுக்கு வாழ்க்கை மற்றும் மோசமான சேமிப்பு காரணமாக மாதாந்திர ஆயிரக்கணக்கானவற்றை இழக்கின்றனர். CrateMate விவசாயிகளுக்கு கட்டுப்பாட்டை எடுக்க கருவிகளை வழங்குகிறது।",
    ourSolution: "எங்கள் தீர்வு – நுண்ணுயிர் எதிர்ப்பு, நிலையான பேக்கேஜிங்",
    solutionDescription: "மூங்கில் அடிப்படையிலான சேமிப்பு பெட்டி – நீடித்த, சுற்றுச்சூழல் நட்பு மற்றும் மக்கும்",
    researchEvidence: "ஆராய்ச்சி மற்றும் சான்றுகள்",
    seeInAction: "CrateMate ஐ செயலில் பார்க்கவும்",
    whatFarmersSay: "விவசாயிகள் என்ன சொல்கிறார்கள்",
    smartTechnology: "ஸ்மார்ட் தொழில்நுட்பத்தால் இயக்கப்படுகிறது",
    whyCrateMate: "CrateMate ஏன்?",
    contact: "தொடர்பு",
    features: "அம்சங்கள்",
    solution: "தீர்வு",
    research: "ஆராய்ச்சி",
    demo: "டெமோ",
    team: "குழு",
    dashboard: "டாஷ்போர்டு"
  },
   
telugu: {
    title: "ఎక్కువగా సేవ్ చేయండి, తక్కువగా వృథా చేయండి",
    subtitle: "చిన్న రైతుల కోసం ఫలాల పాడుబడిని తగ్గించి లాభాలను పెంచే స్మార్ట్ యాప్",
    watchDemo: "డెమో వీడియో చూడండి",
    tryTool: "అనుమానించే టూల్‌ను ప్రయత్నించండి",
    spoilageCrisis: "పాడైపోయే సంక్షోభం",
    spoilageDescription: "పరిష్కారంగా సేవల లోపం వల్ల 30-40% ఫలాల దిగుబడి నష్టం జరుగుతుంది. ట్రాక్ చేయని షెల్ఫ్ లైఫ్, చెత్త నిల్వల కారణంగా చిన్న రైతులు నెలకు వేల రూపాయలు నష్టపోతున్నారు. CrateMate రైతులకు నియంత్రణను తీసుకునేందుకు సాధనాలను ఇస్తుంది.",
    ourSolution: "మా పరిష్కారం – మైక్రోబియల్ వ్యతిరేకమైన, స్థిరమైన ప్యాకేజింగ్",
    solutionDescription: "బాంబూ ఆధారిత నిల్వ బాక్స్ – మన్నికైనది, పర్యావరణ అనుకూలమైనది మరియు బయోడిగ్రేడబుల్",
    researchEvidence: "సందర్శన మరియు ఆధారాలు",
    seeInAction: "CrateMate పనిచేస్తూ చూడండి",
    whatFarmersSay: "రైతులు ఏమంటారు",
    smartTechnology: "స్మార్ట్ సాంకేతికత ద్వారా శక్తి పొందింది",
    whyCrateMate: "CrateMate ఎందుకు?",
    contact: "సంప్రదించండి",
    features: "లక్షణాలు",
    solution: "పరిష్కారం",
    research: "సందర్శన",
    demo: "డెమో",
    team: "బృందం",
    dashboard: "డాష్‌బోర్డ్"
  },

 kannada: {
    title: "ಹೆಚ್ಚು ಉಳಿಸಿ, ಕಡಿಮೆ ವ್ಯರ್ಥಗೊಳಿಸಿ",
    subtitle: "ಸಣ್ಣ ರೈತರಿಗಾಗಿ ಹಣ್ಣುಗಳ ನಾಶವನ್ನು ಕಡಿಮೆ ಮಾಡುವ ಮತ್ತು ಲಾಭವನ್ನು ಹೆಚ್ಚಿಸುವ ಸ್ಮಾರ್ಟ್ ಅಪ್ಲಿಕೇಶನ್",
    watchDemo: "ಡೆಮೊ ವೀಡಿಯೊ ನೋಡಿ",
    tryTool: "ಅನುದಾನ ಸಾಧನವನ್ನು ಪ್ರಯತ್ನಿಸಿ",
    spoilageCrisis: "ನಾಶದ ಬಿಕ್ಕಟ್ಟು",
    spoilageDescription: "ಪೋಸ್ಟ್-ಹಾರ್ವೆಸ್ಟ್ ಕಾಳಜಿಯ ಕೊರತೆಯಿಂದ 30-40% ಹಣ್ಣು ನಾಶವಾಗುತ್ತದೆ. ಟ್ರ್ಯಾಕ್ ಮಾಡದ ಶೆಲ್ಫ್ ಲೈಫ್ ಮತ್ತು ಕೆಟ್ಟ ಸಂಗ್ರಹಣೆಯಿಂದ ಸಣ್ಣ ರೈತರು ಪ್ರತಿ ತಿಂಗಳು ಸಾವಿರಾರು ನಷ್ಟಪಡುತ್ತಿದ್ದಾರೆ. CrateMate ರೈತರಿಗೆ ನಿಯಂತ್ರಣ ತೆಗೆದುಕೊಳ್ಳಲು ಉಪಕರಣಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ.",
    ourSolution: "ನಮ್ಮ ಪರಿಹಾರ – ಸೂಕ್ಷ್ಮಜೀವಿ ವಿರೋಧಕ, ಸ್ಥಿರ ಪ್ಯಾಕೇಜಿಂಗ್",
    solutionDescription: "ಬ್ಯಾಂಬು ಆಧಾರಿತ ಸಂಗ್ರಹಣಾ ಬಾಕ್ಸ್ – ಬಾಳಿಕೆ ಬರುವದು, ಪರಿಸರ ಸ್ನೇಹಿ ಮತ್ತು ಬಯೋಡಿಗ್ರೇಡಬಲ್",
    researchEvidence: "ಸಂಶೋಧನೆ ಮತ್ತು ಸಾಕ್ಷ್ಯಗಳು",
    seeInAction: "CrateMate ಕಾರ್ಯನಿರ್ವಹಣೆಯಲ್ಲಿ ನೋಡಿ",
    whatFarmersSay: "ರೈತರು ಏನು ಹೇಳುತ್ತಾರೆ",
    smartTechnology: "ಸ್ಮಾರ್ಟ್ ತಂತ್ರಜ್ಞಾನದಿಂದ ಚಾಲಿತವಾಗಿದೆ",
    whyCrateMate: "CrateMate ಏಕೆ?",
    contact: "ಸಂಪರ್ಕಿಸಿ",
    features: "ವೈಶಿಷ್ಟ್ಯಗಳು",
    solution: "ಪರಿಹಾರ",
    research: "ಸಂಶೋಧನೆ",
    demo: "ಡೆಮೊ",
    team: "ಟೀಮ್",
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್"
  },

  bengali: {
    title: "বেশি সঞ্চয় করুন, কম অপচয় করুন",
    subtitle: "ছোট কৃষকদের জন্য ফলের অপচয় কমাতে এবং লাভ বাড়াতে একটি স্মার্ট অ্যাপ",
    watchDemo: "ডেমো ভিডিও দেখুন",
    tryTool: "ভবিষ্যদ্বাণী সরঞ্জাম ব্যবহার করুন",
    spoilageCrisis: "নষ্ট হওয়ার সংকট",
    spoilageDescription: "পর্যাপ্ত পরবর্তী পরিচর্যার অভাবে ৩০-৪০% ফল নষ্ট হয়। ট্র্যাকহীন শেলফ লাইফ ও খারাপ সংরক্ষণের কারণে ছোট কৃষকরা মাসে হাজার হাজার টাকা হারান। CrateMate কৃষকদের নিয়ন্ত্রণ নেওয়ার জন্য সরঞ্জাম সরবরাহ করে।",
    ourSolution: "আমাদের সমাধান – অ্যান্টিমাইক্রোবিয়াল, টেকসই প্যাকেজিং",
    solutionDescription: "বাঁশ ভিত্তিক সংরক্ষণ বক্স – টেকসই, পরিবেশবান্ধব ও বায়োডিগ্রেডেবল",
    researchEvidence: "গবেষণা ও প্রমাণ",
    seeInAction: "CrateMate কে কাজে দেখুন",
    whatFarmersSay: "কৃষকরা কী বলেন",
    smartTechnology: "স্মার্ট প্রযুক্তি দ্বারা চালিত",
    whyCrateMate: "CrateMate কেন?",
    contact: "যোগাযোগ",
    features: "বৈশিষ্ট্য",
    solution: "সমাধান",
    research: "গবেষণা",
    demo: "ডেমো",
    team: "দল",
    dashboard: "ড্যাশবোর্ড"
  },
  
};

const LandingPage = () => {
  const [currentLanguage, setCurrentLanguage] = useState('english');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[currentLanguage as keyof typeof translations];

  // Smooth scroll function
  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const features = [
    {
      icon: Calculator,
      title: "Shelf-Life Prediction",
      description: "Predict how many days your fruits will last based on type, variety, harvest condition, and storage method.",
      link: "/shelf-life-prediction",
      color: "bg-blue-500"
    },
    {
      icon: Bell,
      title: "Spoilage Alerts",
      description: "Get timely notifications before fruits go bad, helping you prioritize sales and reduce waste.",
      link: "/spoilage-alerts",
      color: "bg-orange-500"
    },
    {
      icon: Lightbulb,
      title: "Smart Storage Tips",
      description: "Learn optimal storage techniques using AI-based recommendations tailored to your conditions.",
      link: "/storage-tips",
      color: "bg-green-500"
    },
    {
      icon: Wifi,
      title: "Connectivity & Sync",
      description: "Works offline, syncs online. Your data is always safe and up to date.",
      link: "/offline-mode",
      color: "bg-purple-500"
    },
    {
      icon: Globe,
      title: "Local Language Support",
      description: "Available in Hindi and regional languages for better accessibility.",
      link: "/language-support",
      color: "bg-indigo-500"
    },
    {
      icon: BarChart3,
      title: "Inventory Tracker",
      description: "Know what's in stock, track harvest dates, and monitor expiration timelines.",
      link: "/inventory-tracker",
      color: "bg-red-500"
    }
  ];

  const stats = [
    { icon: TrendingDown, value: "30%", label: "Fruit Spoilage Reduced" },
    { icon: DollarSign, value: "₹5,000 ($60)", label: "Monthly Savings Potential" },
    { icon: Users, value: "50,000", label: "Target Farmers" }
  ];

  const testimonials = [
    {
      name: "Rakesh Kumar",
      location: "Local Farmer, Haryana",
      quote: "I lose at least 3-4 papayas out of 10 when storing in plastic crates, whereas using TheGreenCrate, I only lost 1.",
      rating: 5,
      image: "/Rakesh Kumar local farmer pix.png"
    },
    {
      name: "Satish",
      location: "Shop Owner, Haryana",
      quote: "The papayas that would normally spoil in 3-4 days now have a shelf-life for 7-8 days without rotting/spoiling.",
      rating: 5,
      image: "/satish shop owner pic.png"
    }
  ];

  const teamMembers = [
    {
      name: "Samrita Khurana",
      role: "Co-founder, Tech & Development",
      bio: "CrateMate started as a simple idea to help reduce fruit spoilage and support small farmers with something practical. From the beginning, I wanted the app to be more than just a set of screens. It needed to feel easy, familiar, and useful for someone who might be using a smartphone for the first time, or who just wanted a clear way to track their fruits and make decisions faster. Every feature, from shelf-life prediction to inventory tracking, was built to solve a real problem we heard during our research. CrateMate exists because farmers deserve better tools. Not overly complex apps, but simple, reliable solutions that actually help with what they face every day. Because every fruit, and every effort, counts.",
      email: "khurana.samrita@gmail.com",
      image: "/samrita pic.jpeg"
    },
    {
      name: "Sahaj Khurana",
      role: "Co-founder, Research & Community",
      bio: "I've always been interested in understanding how problems work at their core. When we started working on CrateMate, I wanted to go beyond assumptions, so I spoke directly with farmers, listened to their stories, and tried to understand what really happens after harvest. I found that the issue wasn't just spoilage, it was also about the lack of awareness, timing, and access to simple tools that could actually help. That research shaped how we built CrateMate. Everything we created came from real conversations and real needs, not just ideas on paper.",
      email: "sahajkhurana07@gmail.com",
      image: "/sahaj pic.jpg"
    }
  ];

  const competitorData = [
    {
      competitor: "Traditional Plastic Packaging",
      product: "Plastic crates & boxes",
      sustainability: "Non-biodegradable",
      antimicrobial: "No protection from microbes",
      costEffective: "Cheap"
    },
    {
      competitor: "Cardboard Fruit Packaging",
      product: "Paper-based boxes",
      sustainability: "Biodegradable",
      antimicrobial: "No treatment",
      costEffective: "Cheap but not durable"
    },
    {
      competitor: "Our Bamboo Box",
      product: "Bamboo-based, treated",
      sustainability: "100% Biodegradable",
      antimicrobial: "Extends fruit shelf life",
      costEffective: "Cost-effective, much more durable"
    }
  ];

  const experimentData = [
    { treatment: "A1 (Control)", day1: 400.1, day2: 373.0, day3: 346.5, day4: 323.4, day5: 305.0, massLost: 23.8 },
    { treatment: "A2 (Lactic Acid) - 2% conc.", day1: 467.5, day2: 447.3, day3: 427.2, day4: 408.8, day5: 393.7, massLost: 15.7 },
    { treatment: "A3 (Citric Acid) - 2% conc.", day1: 465.4, day2: 450.1, day3: 434.0, day4: 420.9, day5: 406.3, massLost: 12.7 },
    { treatment: "A4 (Lactic + Citric Acid) - 1% conc. each", day1: 951.3, day2: 903.2, day3: 878.3, day4: 855.6, day5: 842.9, massLost: 11.4 }
  ];

  const pricingData = [
    { item: "Cost of Production", inr: "₹45 – ₹60 ($0.54 – $0.72)", usd: "$0.54 – $0.72" },
    { item: "Start-up Cost", inr: "₹45,000 – ₹50,000 ($542 – $602)", usd: "$542 – $602" },
    { item: "Competitor Price", inr: "₹400 – ₹700 ($4.82 – $8.43)", usd: "$4.82 – $8.43" },
    { item: "Our Price", inr: "₹87 ($1.05)", usd: "$1.05" },
    { item: "Profit per Crate", inr: "> ₹27 (> $0.33)", usd: "> $0.33" },
    { item: "Profit Margin", inr: "~30%", usd: "~30%" }
  ];

  const subscriptionPlans = [
    { tier: "Basic", inr: "₹299 (~$3.60)", usd: "~$3.60", description: "For up to 50 crates" },
    { tier: "Standard", inr: "₹599 (~$7.20)", usd: "~$7.20", description: "For up to 100 crates" },
    { tier: "Professional", inr: "₹999 (~$12.00)", usd: "~$12.00", description: "For up to 200 crates" },
    { tier: "Enterprise", inr: "₹1,499+ (~$18.00+)", usd: "~$18.00+", description: "Custom plans for bulk operations" }
  ];

  const languages = [
  { value: 'english', label: 'English' },
  { value: 'hindi', label: 'हिंदी (Hindi)' },
  { value: 'marathi', label: 'मराठी (Marathi)' },
  { value: 'gujarati', label: 'ગુજરાતી (Gujarati)' },
  { value: 'tamil', label: 'தமிழ் (Tamil)' },
  { value: 'telugu', label: 'తెలుగు (Telugu)' },
  { value: 'kannada', label: 'ಕನ್ನಡ (Kannada)' },
  { value: 'bengali', label: 'বাংলা (Bengali)' }
];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50" style={{ scrollBehavior: 'smooth' }}>
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Package2 className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">CrateMate</h1>
                <p className="text-xs text-gray-500">Smart Fruit Management</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 items-center">
              <button onClick={() => smoothScrollTo('solution')} className="text-gray-600 hover:text-green-600 transition-colors">{t.solution}</button>
              <button onClick={() => smoothScrollTo('research')} className="text-gray-600 hover:text-green-600 transition-colors">{t.research}</button>
              <button onClick={() => smoothScrollTo('features')} className="text-gray-600 hover:text-green-600 transition-colors">{t.features}</button>
              <button onClick={() => smoothScrollTo('demo')} className="text-gray-600 hover:text-green-600 transition-colors">{t.demo}</button>
              <button onClick={() => smoothScrollTo('team')} className="text-gray-600 hover:text-green-600 transition-colors">{t.team}</button>
              <button onClick={() => smoothScrollTo('contact')} className="text-gray-600 hover:text-green-600 transition-colors">{t.contact}</button>
              
              {/* Language Selector */}
              <select
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>{lang.label}</option>
                ))}
              </select>
              
              <Link to="/app" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                {t.dashboard}
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <Link to="/app" className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                {t.dashboard}
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600 hover:text-gray-900"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-4">

                <button onClick={() => { smoothScrollTo('solution'); setMobileMenuOpen(false); }} className="text-left text-gray-600 hover:text-green-600 transition-colors">{t.solution}</button>
                <button onClick={() => { smoothScrollTo('research'); setMobileMenuOpen(false); }} className="text-left text-gray-600 hover:text-green-600 transition-colors">{t.research}</button>
                <button onClick={() => { smoothScrollTo('features'); setMobileMenuOpen(false); }} className="text-left text-gray-600 hover:text-green-600 transition-colors">{t.features}</button>
                <button onClick={() => { smoothScrollTo('demo'); setMobileMenuOpen(false); }} className="text-left text-gray-600 hover:text-green-600 transition-colors">{t.demo}</button>
                <button onClick={() => { smoothScrollTo('team'); setMobileMenuOpen(false); }} className="text-left text-gray-600 hover:text-green-600 transition-colors">{t.team}</button>
                <button onClick={() => { smoothScrollTo('contact'); setMobileMenuOpen(false); }} className="text-left text-gray-600 hover:text-green-600 transition-colors">{t.contact}</button>
                
                <select
                  value={currentLanguage}
                  onChange={(e) => setCurrentLanguage(e.target.value)}
                  className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-green-500 focus:border-green-500 w-full"
                >
                  {languages.map((lang) => (
                    <option key={lang.value} value={lang.value}>{lang.label}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {t.title.split(',')[0]}, <span className="text-green-600">{t.title.split(',')[1]}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://youtu.be/40JY8hOzYJk"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Play className="h-5 w-5" />
              <span>{t.watchDemo}</span>
            </a>
            <Link
              to="/shelf-life-prediction"
              state={{ returnTo: '/' }}
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold border-2 border-green-600 hover:bg-green-50 transition-colors flex items-center justify-center space-x-2"
            >
              <Calculator className="h-5 w-5" />
              <span>{t.tryTool}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Problem & Impact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t.spoilageCrisis}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.spoilageDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center p-8 bg-gradient-to-br from-green-50 to-orange-50 rounded-2xl">
                  <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Solution Section */}
      <section id="solution" className="py-20 bg-gradient-to-br from-green-100 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t.ourSolution}
            </h2>
            <p className="text-xl text-gray-600">
              {t.solutionDescription}
            </p>
          </div>

          {/* Product Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img 
                src="/product prototype.png" 
                alt="Bamboo Crate Prototype 1"
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">Bamboo Storage Crate - Prototype 1</h3>
                <p className="text-sm text-gray-600">Well-ventilated bamboo crate with optimal air circulation</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img 
                src="/product prototype 2.png" 
                alt="Bamboo Crate Prototype 2"
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">Bamboo Storage Crate - Prototype 2</h3>
                <p className="text-sm text-gray-600">Stackable design with treatment-infused cushioning</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Bamboo-based</h3>
              <p className="text-sm text-gray-600">100% biodegradable and sustainable material</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                <Wifi className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Well Ventilated</h3>
              <p className="text-sm text-gray-600">Optimal air circulation design</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Treatment Packages</h3>
              <p className="text-sm text-gray-600">Antimicrobial solutions included</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="bg-orange-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                <Zap className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Treated Cushioning</h3>
              <p className="text-sm text-gray-600">Treatment-infused protective padding</p>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Bamboo Advantages</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                    <span className="text-gray-700"><strong>Natural ethylene inhibitor:</strong> Targets Yang Cycle</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                    <span className="text-gray-700">100% biodegradable and sustainable</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                    <span className="text-gray-700">Superior durability compared to cardboard</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Plastic Problems</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <TrendingDown className="h-5 w-5 text-red-600 mt-1" />
                    <span className="text-gray-700"><strong>Reactive Oxygen Species (ROS) load:</strong> Released upon aging</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <TrendingDown className="h-5 w-5 text-red-600 mt-1" />
                    <span className="text-gray-700">Exposure to sunlight degrades fruit quality</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <TrendingDown className="h-5 w-5 text-red-600 mt-1" />
                    <span className="text-gray-700">Non-biodegradable environmental impact</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t.researchEvidence}
            </h2>
            <p className="text-xl text-gray-600">
              Our solution is backed by scientific research and real-world testing
            </p>
          </div>

          {/* Competitive Analysis Image */}
          <div className="mb-16">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img 
                src="/competitive product analysis.png" 
                alt="Competitive Product Analysis"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Secondary Research */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Secondary Research</h3>
            <div className="bg-blue-50 rounded-2xl p-8 mb-8">
              <h4 className="text-xl font-semibold text-blue-900 mb-4">
                'Biocontrol Processes in Fruits and Fresh Produce, the Use of Lactic Acid Bacteria as a Sustainable Option' - Frontiers
              </h4>
              <div className="space-y-4">
                <blockquote className="border-l-4 border-blue-500 pl-4 italic text-blue-800">
                  "Between 25 and 40% of fruits and vegetables are lost before consumption because of inadequate post-harvest treatments"
                </blockquote>
                <blockquote className="border-l-4 border-blue-500 pl-4 italic text-blue-800">
                  "Lactic Acid Bacteria (LAB) and Citric Acid have an antagonistic capacity against pathogenic bacteria and are generally recognized as safe (GRAS) by the Food and Drug Administration (FDA) of the United States"
                </blockquote>
              </div>
            </div>

            {/* Competitor Comparison Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b">
                <h4 className="text-lg font-semibold text-gray-900">Competitive Analysis</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Competitor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sustainability</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Antimicrobial Feature</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost-Effective</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {competitorData.map((row, index) => (
                      <tr key={index} className={index === 2 ? 'bg-green-50' : ''}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.competitor}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.product}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.sustainability}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.antimicrobial}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.costEffective}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Primary Research */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Primary Research</h3>
            <div className="bg-green-50 rounded-2xl p-8">
              <h4 className="text-xl font-semibold text-green-900 mb-6">
                Experimental Results: Chemical Treatment Effectiveness
              </h4>
              <p className="text-green-800 mb-6">
                We conducted experiments to investigate which chemical treatment is most effective in preserving papayas, via mass loss analysis and microbial analysis.
              </p>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Papayas & Treatment</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Day 1 (g)</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Day 2 (g)</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Day 3 (g)</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Day 4 (g)</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Day 5 (g)</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">% Mass Lost</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {experimentData.map((row, index) => (
                        <tr key={index} className={index === 3 ? 'bg-green-50' : ''}>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.treatment}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{row.day1}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{row.day2}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{row.day3}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{row.day4}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{row.day5}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-bold text-center">
                            <span className={index === 3 ? 'text-green-600' : 'text-gray-900'}>{row.massLost}%</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-green-100 rounded-lg">
                <p className="text-green-800 font-semibold">
                  🏆 Best Result: Lactic + Citric Acid combination showed only 11.4% mass loss - the lowest among all treatments!
                </p>
              </div>
            </div>
          </div>

          {/* Cost & Revenue Analysis */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Cost & Revenue Analysis</h3>
            
            {/* Product Pricing */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-6">🧺 Product Cost & Pricing (Per Crate)</h4>
                <div className="space-y-4">
                  {pricingData.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-700 font-medium">{item.item}</span>
                      <div className="text-right">
                        <div className="text-gray-900 font-semibold">{item.inr}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-green-100 rounded-lg">
                  <p className="text-green-800 font-bold text-center">
                    ✅ 85% lower than competitors' average pricing
                  </p>
                </div>
              </div>

              {/* Subscription Plans */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-6">Monthly "Anti-microbial Solution" Subscription Plans</h4>
                <div className="space-y-4">
                  {subscriptionPlans.map((plan, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-green-300 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-semibold text-gray-900">{plan.tier}</h5>
                        <div className="text-right">
                          <div className="text-gray-900 font-bold">{plan.inr}/month</div>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">{plan.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Smart Features for Smart Farming
            </h2>
            <p className="text-xl text-gray-600">
              Powerful tools designed specifically for small-scale fruit farmers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={index}
                  to={feature.link}
                  state={{ returnTo: '/' }}
                  className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className={`${feature.color} p-4 rounded-xl w-16 h-16 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className="flex items-center text-green-600 font-semibold group-hover:text-green-700">
                    <span>Try it now</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t.seeInAction}
            </h2>
            <p className="text-xl text-gray-600">
              Watch CrateMate help farmers reduce waste and earn more.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Add Fruits to Inventory</h3>
                  <p className="text-gray-600">Input type, variety, quantity, harvest date, and storage conditions</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Get AI Predictions</h3>
                  <p className="text-gray-600">Receive accurate shelf-life predictions based on multiple factors</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Receive Smart Alerts</h3>
                  <p className="text-gray-600">Get notified before spoilage to prioritize sales</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Follow Storage Tips</h3>
                  <p className="text-gray-600">Learn optimal storage techniques to extend shelf life</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-100 to-orange-100 p-8 rounded-2xl">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <Package2 className="h-6 w-6 text-green-600" />
                  <h4 className="font-semibold text-gray-900">Live Demo</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm text-gray-700">Red Lady Papayas</span>
                    <span className="text-sm font-semibold text-green-600">7 days left</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="text-sm text-gray-700">Alphonso Mangoes</span>
                    <span className="text-sm font-semibold text-orange-600">2 days left</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="text-sm text-gray-700">Cavendish Bananas</span>
                    <span className="text-sm font-semibold text-red-600">Expired</span>
                  </div>
                </div>
                <Link
                  to="/inventory-tracker"
                  state={{ returnTo: '/' }}
                  className="block w-full bg-green-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors mt-4"
                >
                  Try Full Tracker
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t.whatFarmersSay}
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from farmers using CrateMate
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic text-lg">"{testimonial.quote}"</p>
                <div className="flex items-center space-x-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">{testimonial.name}</p>
                    <p className="text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Video Section */}
          <div className="mt-16 text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Watch Our Farmer Interviews</h3>
              <p className="text-gray-600 mb-6">
                See how real farmers are benefiting from our bamboo crate solution
              </p>
              <a
                href="https://youtu.be/iflsaTUzBao"  
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                <Play className="h-5 w-5" />
                <span>Watch Farmer Testimonials</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t.smartTechnology}
            </h2>
            <p className="text-xl text-gray-600">
             Designed to work anywhere, for anyone, in real conditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-gray-100">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-6">
                <Wifi className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Seamless Connectivity</h3>
              <p className="text-gray-600">Works best with internet; auto-syncs your data when connected</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-gray-100">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-6">
                <Globe className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Multi-Language</h3>
              <p className="text-gray-600">Hindi, Marathi, Gujarati, and more regional languages</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-gray-100">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-6">
                <Calculator className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">AI Predictions</h3>
              <p className="text-gray-600">Machine learning algorithms for accurate shelf-life prediction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t.whyCrateMate}
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              We saw so much good fruit going to waste, not because it wasn't fresh, but because there was no easy way to keep track of it. After talking to fruit sellers and farmers, we understood how frustrating it is to lose something you worked hard for. That's what pushed us to create CrateMate. Something simple and helpful that fits into their everyday routine and actually makes a difference. It's built from their stories and shaped by what they truly need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                    <p className="text-green-600 font-medium">{member.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">{member.bio}</p>
                <a 
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium"
                >
                  <Mail className="h-4 w-4" />
                  <span>{member.email}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <Package2 className="h-8 w-8 text-green-400" />
                <div>
                  <h3 className="text-xl font-bold">CrateMate</h3>
                  <p className="text-gray-400">Smart Fruit Management</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6">
                Supporting small farmers with simple tech that reduces spoilage and improves earnings
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-green-400" />
                  <span>khurana.samrita@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-green-400" />
                  <span>sahajkhurana07@gmail.com</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">{t.features}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/shelf-life-prediction" state={{ returnTo: '/' }} className="hover:text-white">Shelf-Life Prediction</Link></li>
                <li><Link to="/spoilage-alerts" state={{ returnTo: '/' }} className="hover:text-white">Spoilage Alerts</Link></li>
                <li><Link to="/storage-tips" state={{ returnTo: '/' }} className="hover:text-white">Storage Tips</Link></li>
                <li><Link to="/inventory-tracker" state={{ returnTo: '/' }} className="hover:text-white">Inventory Tracker</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="https://youtu.be/40JY8hOzYJk" target="_blank" rel="noopener noreferrer" className="hover:text-white">Watch Demo</a></li>
                <li><Link to="/language-support" state={{ returnTo: '/' }} className="hover:text-white">Language Support</Link></li>
                <li><Link to="/offline-mode" state={{ returnTo: '/' }} className="hover:text-white">Connectivity & Sync</Link></li>
                <li><button onClick={() => smoothScrollTo('team')} className="hover:text-white">Contact Team</button></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 CrateMate. Built with ❤️ for farmers everywhere.</p>
          </div>
        </div>
      </footer>

      {/* Bolt.new Badge
      <div className="fixed bottom-4 right-4 z-50"> */}
        {/* <a
          href="https://bolt.new"
          target="_blank"
          rel="noopener noreferrer"
          className="block transition-transform hover:scale-105"
        >
          <img
            src="/black_circle_360x360.png"
            alt="Made with Bolt.new"
            className="w-12 h-12 md:w-16 md:h-16 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          />
        </a> */}
      {/* </div> */}
    </div>
  );
};

export default LandingPage;