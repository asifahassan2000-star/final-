// Comprehensive knowledge engine for UCP Bot (Bahawalpur Campus)
// Provides instant, offline, zero-latency answers with emojis and friendly, effective summaries.

export interface BotResponse {
  reply: string;
  suggestions?: string[];
  actionLink?: { label: string; url: string };
}

export function getInstantBotResponse(userQuery: string): BotResponse {
  const q = userQuery.toLowerCase().trim();

  // 1. Greetings
  if (/^(hi|hello|hey|salam|assalam|aoa|greetings|hola|subha bakhair)/i.test(q)) {
    return {
      reply: "👋 Hello and welcome to UCP Bahawalpur! I'm **UCP Bot** 🎓. How can I assist your academic journey today? Feel free to ask about our degree programs, fee plans, admissions, or scholarships!",
      suggestions: ["Degree Programs 🎓", "Fee Structure 💰", "Scholarships 🏆", "Admission Apply 📝"]
    };
  }

  // 2. Who are you / Bot identity
  if (/who are you|what is your name|your name|ucp bot|about you/i.test(q)) {
    return {
      reply: "🤖 I'm **UCP Bot**, your official 24/7 smart assistant for the **University of Central Punjab (UCP) Bahawalpur Campus**! I'm trained on all campus degrees, fee structures, admissions, and facilities to help you instantly ✨.",
      suggestions: ["Campus Location 📍", "Programs 🎓", "Contact Numbers 📞"]
    };
  }

  // 3. Artificial Intelligence / ADP AI / BS AI
  if (/artificial intelligence|\bai\b|adp ai|adp artificial/i.test(q)) {
    return {
      reply: "🤖 **ADP Artificial Intelligence** is a flagship 2-year program (4 semesters, **75 Total Credit Hours**)! It covers machine learning, algorithmic problem solving, Python toolkits, big data, and intelligent systems development with pathways into BS AI/CS 🚀.",
      suggestions: ["ADP AI Subjects 📚", "AI Career Prospects 💼", "Fee for ADP AI 💵", "Apply for AI 📝"],
      actionLink: { label: "View ADP AI Curriculum", url: "#academics" }
    };
  }

  // 4. Computer Science / ADP CS / BS CS
  if (/computer science|\bcs\b|bs cs|adp cs|software engineering|\bse\b|cyber security|data science/i.test(q)) {
    return {
      reply: "💻 **Computing Programs at UCP Bahawalpur**:\n• **BS Computer Science** (4 Years, 132 CH)\n• **ADP Computer Science** (2 Years, 75 CH)\n• **ADP Software Engineering** (2 Years, 74 CH)\n• **ADP Cyber Security** (2 Years, 75 CH)\n• **ADP Data Science** (2 Years, 78 CH)\n• **ADP Artificial Intelligence** (2 Years, 75 CH)\nEquipped with cutting-edge software & AI development labs ⚡!",
      suggestions: ["BS CS Details 💻", "ADP CS Details 🖥️", "Computing Fee 💰", "Eligibility Criteria 📋"],
      actionLink: { label: "Explore Computing Faculty", url: "#academics" }
    };
  }

  // 5. Business / BBA / Accounting / Finance / Analytics
  if (/bba|business administration|accounting|finance|analytics|business analytics|commerce/i.test(q)) {
    return {
      reply: "📊 **Business & Management Programs**:\n• **BBA** (4 Years, 132 CH)\n• **BS Business Analytics** (4 Years, 133 CH)\n• **BS Accounting & Finance** (4 Years, 126 CH)\n• **ADP Business Administration** (2 Years, 66 CH)\n• **ADP Accounting & Finance** (2 Years, 66 CH)\n• **ADP Business Analytics** (2 Years, 64 CH)\nDesigned with corporate industry case studies and internship pathways 📈!",
      suggestions: ["BBA Roadmap 📊", "BS Analytics 📉", "Business Fee 💳", "Apply Now 🚀"],
      actionLink: { label: "View Business Programs", url: "#academics" }
    };
  }

  // 6. Natural Sciences & Bio (Biotech, Biochem, Chemistry, Physics, Math, Zoology, ADS)
  if (/biotechnology|biochem|biochemistry|biology|zoology|chemistry|physics|math|mathematics|botany|\bads\b|pre-medical|pre medical/i.test(q)) {
    return {
      reply: "🔬 **Faculty of Science & Technology**:\n• **BS Biotechnology** (128 CH) & **BS Biochemistry** (128 CH)\n• **BS Chemistry** (128 CH), **BS Physics** (127 CH), **BS Math** (126 CH), **BS Zoology** (126 CH)\n• **ADS Zoology, Botany & Chemistry** (71 CH)\n• **ADS Double Maths & Physics** (70 CH)\n• **ADP Biotech & Biochem** (70 CH each)\nFeaturing modern research laboratories and expert faculty 🧬!",
      suggestions: ["BS Biotechnology 🧬", "ADS Pre-Medical 🧪", "Science Fees 💰", "Apply Now 📝"]
    };
  }

  // 7. Humanities / English / Psychology
  if (/english|psychology|humanities|social sciences/i.test(q)) {
    return {
      reply: "📚 **Humanities & Social Sciences**:\n• **BS English Language & Literature** (132 CH)\n• **BS Psychology** (132 CH) with psychological testing lab\n• **ADP English** (66 CH)\n• **ADP Psychology** (63 CH)\nGreat careers in clinical therapy, media, corporate communications, and research 🌟!",
      suggestions: ["BS Psychology 🧠", "BS English 📖", "Fee Details 💵"]
    };
  }

  // 8. All Programs list
  if (/all programs|all courses|which programs|list of programs|degrees offered|what programs|what degrees/i.test(q)) {
    return {
      reply: "🎓 **UCP Bahawalpur offers 27 Accredited Degrees**:\n• **Bachelors (4-Yr)**: BBA, BS CS, BS Business Analytics, BS Accounting & Finance, BS English, BS Psychology, BS Chemistry, BS Physics, BS Math, BS Biotech, BS Biochem, BS Zoology, BS Economics.\n• **Associate Degrees (2-Yr)**: ADP AI, ADP CS, ADP SE, ADP Cyber Security, ADP Data Science, ADP BBA, ADP A&F, ADP Analytics, ADP Psychology, ADP English, ADP Biotech, ADP Biochem, ADS Medical & Non-Medical 🏛️!",
      suggestions: ["ADP Degrees 📜", "BS Degrees 🎓", "Fee Structure 💰", "Apply Now 🚀"]
    };
  }

  // 9. Fee Structure / Fees / Cost / Price
  if (/fee|fees|cost|tuition|charges|dues|price|expensive|installment|per credit/i.test(q)) {
    return {
      reply: "💰 **Fee Structure Highlights**:\n• **Admission Fee**: Rs. 9,000 (one-time)\n• **Registration Fee**: Rs. 2,500 (one-time)\n• **Tuition per Credit Hour**: Rs. 4,100 to Rs. 6,800 (program dependent)\n• **Associate Degrees (2-Yr)**: Approx. Rs. 2.8 Lakh to Rs. 5.4 Lakh total\n• **Bachelors (4-Yr)**: Approx. Rs. 6.4 Lakh to Rs. 8.8 Lakh total\n✨ *Generous merit & PGC concessions reduce your actual fees substantially!*",
      suggestions: ["Check Scholarships 🏆", "PGC Discount 🎓", "Calculate Fee 🧮"],
      actionLink: { label: "Official Fee Breakdown", url: "#fee-structure" }
    };
  }

  // 10. Scholarships & Financial Aid
  if (/scholarship|concession|discount|financial aid|kinship|pgc student|merit|free education/i.test(q)) {
    return {
      reply: "🏆 **UCP Scholarship Opportunities**:\n• **Merit Scholarships**: Up to 100% tuition waiver based on intermediate marks!\n• **PGC Alumni Concession**: Special 25% to 50% waiver for Punjab Group students 🎓\n• **Kinship Concession**: 25% waiver for real siblings\n• **Sports & Talent**: Exceptional sports achievers receive full concessions\n• **Need-Based Aid**: Available through the Student Financial Aid Office ✨!",
      suggestions: ["Eligibility for 100% 🏅", "PGC Discount 🎒", "Apply for Admission 📝"]
    };
  }

  // 11. Admission / Eligibility / Requirements / Last date / How to apply
  if (/admission|apply|eligibility|criteria|requirement|last date|deadline|how to apply|documents/i.test(q)) {
    return {
      reply: "📝 **Admissions are Open for Upcoming Session!**\n• **Eligibility**: Minimum 50% marks in Intermediate (HSSC/A-Levels/ICS/FA) or equivalent.\n• **Required Documents**: Matric & Inter result cards, CNIC/B-Form, photographs.\n• **How to Apply**: Click 'Apply Now' in the header or visit the UCP Bahawalpur Admissions Office directly 🏛️!",
      suggestions: ["Online Apply Form 🚀", "Campuses & Office 📍", "Call Helpdesk 📞"],
      actionLink: { label: "Launch Online Application", url: "#admissions" }
    };
  }

  // 12. Location / Address / Campus
  if (/location|address|where is|map|situated|campus address|directions/i.test(q)) {
    return {
      reply: "📍 **UCP Bahawalpur Campus Location**:\nConstituent College, UCP Campus, Airport Road, Bahawalpur, Punjab, Pakistan.\n\nOfficial Google Maps: https://maps.app.goo.gl/ud9Sz3ZLR7zt9aiT7 🗺️\nDedicated university transport shuttles connect all major hubs across Bahawalpur & surrounding districts 🚌!",
      suggestions: ["Open Map 📍", "Transport Routes 🚍", "Contact Helpline 📞"]
    };
  }

  // 13. Contact numbers / Phone / WhatsApp / Email
  if (/contact|phone|number|mobile|telephone|call|email|whatsapp|helpline|support/i.test(q)) {
    return {
      reply: "📞 **Official UCP Contact Channels**:\n• **Campus Phone**: 062-2202030 / 062-2202050\n• **Facebook**: UNIVERSITY OF CENTRAL PUNJAB BAHAWALPUR CAMPUS (facebook.com/profile.php?id=61583228356324)\n• **Website Portal**: bit.ly/ucpbahawalpur\n• **Email**: info@ucp.edu.pk\n• **Office Hours**: Monday to Friday, 9:00 AM - 5:00 PM ⏰!",
      suggestions: ["Admissions Office 🏫", "Program Guide 📚", "Fee Breakdown 💰"]
    };
  }

  // 14. Facilities / Labs / Library / Transport / Hostel
  if (/facilities|lab|labs|library|transport|bus|hostel|cafeteria|sports|ground/i.test(q)) {
    return {
      reply: "🏛️ **World-Class Campus Facilities**:\n• **Computing & AI Labs**: High-performance machines with GPU setups\n• **Science Laboratories**: Specialized Biotech, Chemistry & Physics equipment\n• **Digital Library**: Access to HEC digital database & international research papers\n• **Air-Conditioned Transport**: Serving all corners of Bahawalpur\n• **Cafeteria & Sports Complex**: Healthy dining & recreational grounds ⚽!",
      suggestions: ["Explore Campus Life 🌿", "Admissions Help 📝", "Contact Office 📞"]
    };
  }

  // 15. Leadership / Rector / Director / Chairman
  if (/leader|leadership|chairman|rector|director|mian amir|aurangzaib|hamid iqbal|principal/i.test(q)) {
    return {
      reply: "👔 **UCP Executive Leadership**:\n• **Prof. Hamid Iqbal**: Director UCP Bahawalpur\n• **Prof. Dr. Aurangzaib Virk**: Head UCP Bahawalpur Campus (Principal)\n• **Mian Amir Mahmood**: Founder, UCP & Punjab Group of Colleges\nDedicated to academic integrity, visionary research, and student mentorship 🌟!",
      suggestions: ["Read Leadership Messages 📜", "Campus Mission 🎯", "Browse Degrees 🎓"]
    };
  }

  // 16. Fallback response (friendly, helpful, concise, with emoji)
  return {
    reply: `💡 I'm here to help with everything about **UCP Bahawalpur**! You can ask me about:\n• Any degree roadmap (e.g. "Tell me about ADP AI" or "BBA subjects")\n• Tuition fees and total costs\n• Merit & PGC scholarships up to 100%\n• Admission eligibility and deadlines 🎓\n\nWhat would you like to explore next? 😊`,
    suggestions: [
      "ADP Artificial Intelligence 🤖",
      "BS Computer Science 💻",
      "Fee & Scholarships 💰",
      "Admission Eligibility 📋",
      "Contact Helpline 📞"
    ]
  };
}
