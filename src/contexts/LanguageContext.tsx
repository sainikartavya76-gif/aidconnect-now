import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "hi";

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
  };
}

export const translations: Translations = {
  // Header
  aidlink: { en: "AidLink", hi: "एडलिंक" },
  
  // Home Page
  heroTitle: { en: "Connecting Skills to Emergencies", hi: "कौशल को आपातकाल से जोड़ना" },
  heroSubtitle: { en: "During emergencies, the right help at the right time can save lives.", hi: "आपातकाल में, सही समय पर सही मदद जीवन बचा सकती है।" },
  tagline: { en: "Right Skill. Right Place. Right Time.", hi: "सही कौशल। सही जगह। सही समय।" },
  becomeVolunteer: { en: "Become a Volunteer", hi: "स्वयंसेवक बनें" },
  requestHelp: { en: "Request Emergency Help", hi: "आपातकालीन सहायता माँगें" },
  howItWorks: { en: "How AidLink Works", hi: "एडलिंक कैसे काम करता है" },
  trustedVolunteers: { en: "Trusted Volunteers", hi: "विश्वसनीय स्वयंसेवक" },
  trustedVolunteersDesc: { en: "Verified citizens with validated skills ready to respond when needed most.", hi: "सत्यापित नागरिक जो जरूरत पड़ने पर मदद के लिए तैयार हैं।" },
  smartMatching: { en: "Rule-Based Smart Matching", hi: "नियम-आधारित स्मार्ट मिलान" },
  smartMatchingDesc: { en: "Connects the right skills to the right emergencies based on location, availability, and expertise.", hi: "स्थान, उपलब्धता और विशेषज्ञता के आधार पर सही कौशल को सही आपातकाल से जोड़ता है।" },
  taskCoordination: { en: "Task Coordination", hi: "कार्य समन्वय" },
  taskCoordinationDesc: { en: "Clear status tracking and communication for organized emergency response.", hi: "संगठित आपातकालीन प्रतिक्रिया के लिए स्पष्ट स्थिति ट्रैकिंग।" },
  prototypeDemo: { en: "Prototype for hackathon demonstration", hi: "हैकाथॉन प्रदर्शन के लिए प्रोटोटाइप" },

  // Navigation
  home: { en: "Home", hi: "होम" },
  volunteer: { en: "Volunteer", hi: "स्वयंसेवक" },
  emergency: { en: "Emergency", hi: "आपातकाल" },
  matching: { en: "Matching", hi: "मिलान" },
  tasks: { en: "Tasks", hi: "कार्य" },

  // Volunteer Form
  volunteerTitle: { en: "Become a Volunteer", hi: "स्वयंसेवक बनें" },
  volunteerSubtitle: { en: "Register your skills to help during emergencies.", hi: "आपातकाल में मदद के लिए अपने कौशल पंजीकृत करें।" },
  fullName: { en: "Full Name", hi: "पूरा नाम" },
  enterName: { en: "Enter your name", hi: "अपना नाम दर्ज करें" },
  city: { en: "City", hi: "शहर" },
  enterCity: { en: "Enter your city", hi: "अपना शहर दर्ज करें" },
  selectSkills: { en: "Select Your Skills", hi: "अपने कौशल चुनें" },
  availabilityStatus: { en: "Availability Status", hi: "उपलब्धता स्थिति" },
  available: { en: "Available", hi: "उपलब्ध" },
  busy: { en: "Busy", hi: "व्यस्त" },
  availableForTasks: { en: "You're available for tasks", hi: "आप कार्यों के लिए उपलब्ध हैं" },
  currentlyBusy: { en: "You're currently busy", hi: "आप वर्तमान में व्यस्त हैं" },
  skillVerification: { en: "Skill Verification (Optional)", hi: "कौशल सत्यापन (वैकल्पिक)" },
  uploadCertificate: { en: "Upload certificate or ID", hi: "प्रमाणपत्र या आईडी अपलोड करें" },
  certificateUploaded: { en: "Certificate Uploaded", hi: "प्रमाणपत्र अपलोड हो गया" },
  registerAsVolunteer: { en: "Register as Volunteer", hi: "स्वयंसेवक के रूप में पंजीकरण करें" },
  registrationComplete: { en: "Registration Complete!", hi: "पंजीकरण पूर्ण!" },
  thankYouVolunteer: { en: "Thank you for volunteering. Your profile has been saved.", hi: "स्वयंसेवा के लिए धन्यवाद। आपकी प्रोफाइल सहेज ली गई है।" },
  verificationStatus: { en: "Verification Status", hi: "सत्यापन स्थिति" },

  // Skills
  firstAid: { en: "First Aid", hi: "प्राथमिक चिकित्सा" },
  medicalHelp: { en: "Medical Help", hi: "चिकित्सा सहायता" },
  driving: { en: "Driving", hi: "ड्राइविंग" },
  rescueOperations: { en: "Rescue Operations", hi: "बचाव कार्य" },
  logistics: { en: "Logistics", hi: "लॉजिस्टिक्स" },
  technicalSupport: { en: "Electrical/Technical Support", hi: "तकनीकी सहायता" },
  communicationSupport: { en: "Communication Support", hi: "संचार सहायता" },

  // Emergency Form
  emergencyTitle: { en: "Request Help", hi: "सहायता का अनुरोध" },
  emergencySubtitle: { en: "Submit an emergency request for NGO or coordinator response.", hi: "NGO या समन्वयक प्रतिक्रिया के लिए आपातकालीन अनुरोध सबमिट करें।" },
  emergencyType: { en: "Emergency Type", hi: "आपातकाल का प्रकार" },
  location: { en: "Location", hi: "स्थान" },
  enterLocation: { en: "Enter location or address", hi: "स्थान या पता दर्ज करें" },
  requiredSkill: { en: "Required Skill", hi: "आवश्यक कौशल" },
  urgencyLevel: { en: "Urgency Level", hi: "तात्कालिकता स्तर" },
  additionalDetails: { en: "Additional Details (Optional)", hi: "अतिरिक्त विवरण (वैकल्पिक)" },
  describeEmergency: { en: "Describe the emergency situation...", hi: "आपातकालीन स्थिति का वर्णन करें..." },
  submitRequest: { en: "Submit Emergency Request", hi: "आपातकालीन अनुरोध सबमिट करें" },
  requestSubmitted: { en: "Request Submitted!", hi: "अनुरोध सबमिट हो गया!" },
  matchingVolunteers: { en: "Your emergency request has been logged. Go to Matching to assign volunteers.", hi: "आपका आपातकालीन अनुरोध दर्ज हो गया है। स्वयंसेवकों को असाइन करने के लिए मिलान पर जाएं।" },
  submitAnother: { en: "Submit Another Request", hi: "एक और अनुरोध सबमिट करें" },

  // Emergency Types
  flood: { en: "Flood", hi: "बाढ़" },
  fire: { en: "Fire", hi: "आग" },
  medical: { en: "Medical", hi: "चिकित्सा" },
  accident: { en: "Accident", hi: "दुर्घटना" },
  infrastructure: { en: "Infrastructure Damage", hi: "बुनियादी ढांचा क्षति" },
  other: { en: "Other", hi: "अन्य" },

  // Urgency Levels
  low: { en: "Low", hi: "कम" },
  medium: { en: "Medium", hi: "मध्यम" },
  high: { en: "High", hi: "उच्च" },

  // Matching Page
  matchingTitle: { en: "Smart Matching", hi: "स्मार्ट मिलान" },
  matchingSubtitle: { en: "Rule-based volunteer matching for emergencies.", hi: "आपातकाल के लिए नियम-आधारित स्वयंसेवक मिलान।" },
  matchedVolunteers: { en: "Matched Volunteers", hi: "मिलान किए गए स्वयंसेवक" },
  matchScore: { en: "Match Score", hi: "मिलान स्कोर" },
  skillMatch: { en: "Skill Match", hi: "कौशल मिलान" },
  nearby: { en: "Nearby", hi: "नजदीक" },
  assignVolunteer: { en: "Assign Volunteer", hi: "स्वयंसेवक असाइन करें" },
  assigned: { en: "Assigned", hi: "असाइन किया गया" },
  away: { en: "away", hi: "दूर" },
  noEmergencies: { en: "No emergency requests yet. Create one from the Emergency tab.", hi: "अभी तक कोई आपातकालीन अनुरोध नहीं। आपातकाल टैब से एक बनाएं।" },
  noVolunteers: { en: "No volunteers registered yet. Encourage people to sign up!", hi: "अभी तक कोई स्वयंसेवक पंजीकृत नहीं। लोगों को साइन अप करने के लिए प्रोत्साहित करें!" },
  noMatchingVolunteers: { en: "No matching volunteers found for this emergency.", hi: "इस आपातकाल के लिए कोई मिलान स्वयंसेवक नहीं मिला।" },
  simulatedDataDisclaimer: { en: "Data shown is simulated for prototype demonstration. Matching logic uses rule-based criteria: skill match, location proximity, and availability.", hi: "दिखाया गया डेटा प्रोटोटाइप प्रदर्शन के लिए सिमुलेटेड है।" },

  // Task Tracking
  taskTracking: { en: "Task Tracking", hi: "कार्य ट्रैकिंग" },
  taskTrackingSubtitle: { en: "Monitor and coordinate emergency response tasks.", hi: "आपातकालीन प्रतिक्रिया कार्यों की निगरानी और समन्वय करें।" },
  taskStatusFlow: { en: "Task Status Flow", hi: "कार्य स्थिति प्रवाह" },
  inProgress: { en: "In Progress", hi: "प्रगति पर" },
  completed: { en: "Completed", hi: "पूर्ण" },
  activity: { en: "Activity", hi: "गतिविधि" },
  lastUpdated: { en: "Last Updated", hi: "अंतिम अपडेट" },
  progress: { en: "Progress", hi: "प्रगति" },
  startTask: { en: "Start Task", hi: "कार्य शुरू करें" },
  markComplete: { en: "Mark Complete", hi: "पूर्ण चिह्नित करें" },
  noTasks: { en: "No tasks yet. Assign volunteers from the Matching page.", hi: "अभी तक कोई कार्य नहीं। मिलान पेज से स्वयंसेवक असाइन करें।" },

  // Common
  name: { en: "Name", hi: "नाम" },
  skills: { en: "Skills", hi: "कौशल" },
  pending: { en: "Pending", hi: "लंबित" },
  verified: { en: "Verified", hi: "सत्यापित" },
  type: { en: "Type", hi: "प्रकार" },
  requestStatus: { en: "Request Status", hi: "अनुरोध स्थिति" },
  pleaseComplete: { en: "Please complete all fields", hi: "कृपया सभी फ़ील्ड भरें" },
  requiredFields: { en: "Name, city, and at least one skill are required.", hi: "नाम, शहर और कम से कम एक कौशल आवश्यक है।" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) return key;
    return translation[language] || translation.en || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
