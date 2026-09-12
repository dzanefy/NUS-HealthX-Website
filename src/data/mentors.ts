export interface Mentor {
  id: string;
  name: string;
  title: string;
  affiliation: string;
  expertise: string[];
  bio: string;
  photo: string;
  linkedIn?: string;
}

// Public professional fields only; no private signup or matching responses.
// Prepared website bios are preferred. Add approved photo URLs when available.
export const mentors: Mentor[] = [
  {
    "id": "joel-tay",
    "name": "Joel Tay",
    "title": "Founder, Voqol; Instructor",
    "affiliation": "NUS",
    "expertise": [
      "Healthcare innovation",
      "Public health",
      "Product development"
    ],
    "bio": "Joel Tay is the founder of Voqol and is an experienced Speech and Voice Therapist who has worked with people with communication and swallowing difficulties for the last 10 years. Joel graduated from NUS with a degree in psychology and a Masters in Speech-Language Pathology.\n\nHis primary clinical focus is in the treatment and prevention of voice problems. In addition to that, he also has vast experience working with people with language and speech difficulties, swallowing problems, and stuttering.\n\nOver the years he has had the opportunity to speak and educate the public about voice science and persuasive communication. He has spoken at World Voice Day Singapore, Esplanade’s Voices Festival, and worked with many schools and companies such as Ogilvy, and Hilton Hotels.\n\nJoel hopes to bridge the gap between voice science and art, and hopes to demystify the often confusing world of voice training. In recent years, his passion is to help teachers regain their voices, and to teach them how to use good vocal technique to better command a class.\n\nOn top of helping people achieve the best of their voices, Joel also records voiceovers for a number of studios and companies in Singapore. He also been requested to emcee, most notably for some performances at the Singapore Grand Prix, the Watoto Children’s Choir, and at the Victoria Concert Hall.",
    "photo": "",
    "linkedIn": "https://sg.linkedin.com/in/joel-tay-749619a0"
  },
  {
    "id": "tan-hwee-huan",
    "name": "Tan Hwee Huan",
    "title": "Doctor",
    "affiliation": "Khoo Teck Puat Hospital",
    "expertise": [
      "Clinical medicine",
      "Public health"
    ],
    "bio": "Dr Tan Hwee Huan is a diabetes specialist & Advance Care Planning facilitator She graduated from the National University of Singapore and trained in endocrinology, diabetes and metabolism at the Singapore General Hospital. She is currently Senior Consultant at Khoo Teck Puat Hospital. She works with interdisciplinary teams in diabetes care and education.",
    "photo": ""
  },
  {
    "id": "corrine-teh",
    "name": "Corrine Teh",
    "title": "Head, Innovation & Improvement Office",
    "affiliation": "Khoo Teck Puat Hospital",
    "expertise": [
      "Healthcare innovation",
      "Digital health / AI health"
    ],
    "bio": "Corrine has built a career around one conviction that meaningful transformation happens when people, processes, and purpose align. Over more than two decades in healthcare and public service, her journey began in corporate planning, business process reengineering and operational excellence, where she honed her ability to diagnose systems, redesign workflows, and lead teams through change.\nToday, as Head of the Innovation & Improvement Office at Khoo Teck Puat Hospital, she leads strategic innovation efforts and serves as Admin Lead for Centre for Healthcare Innovation@KTPH & YCH. Her work spans capability building, organisational development, and the integration of AI into clinical and operational domains. She established the hospital’s AI Unit and her stewardship helped bring Smart Clinic and Smart Ward to life. These initiatives contributed to KTPH’s recognition as one of the World’s Best Smart Hospitals 2026.",
    "photo": "",
    "linkedIn": "https://www.linkedin.com/in/corrine-teh-09aa8458"
  },
  {
    "id": "dexter-tiah",
    "name": "Dexter Tiah",
    "title": "Investment Manager",
    "affiliation": "NUS Enterprise",
    "expertise": [
      "MedTech",
      "Startups / entrepreneurship",
      "Venture capital / investment",
      "Intellectual property / patents"
    ],
    "bio": "Dexter Tiah is an investment manager with >12 years deploying capital across private equity funds, co-investments, and direct investments — over US$100M to date. He focus on rigorous financial modelling, portfolio management, and origination within Singapore's startup ecosystem.\n \nOutside his core role, he is the founder of an applied simulation and game design studio. They publish board games and design simulations for corporate learning and development, alongside public-facing workshops on financial literacy, heritage, and sustainability.",
    "photo": "",
    "linkedIn": "https://www.linkedin.com/in/dexter-tiah"
  },
  {
    "id": "martyn-chek-yew-chuan",
    "name": "Martyn Chek Yew Chuan",
    "title": "Senior Medical Social Worker",
    "affiliation": "Khoo Teck Puat Hospital",
    "expertise": [
      "Healthcare innovation",
      "Public health"
    ],
    "bio": "I’m Martyn Chek — a medical social worker, community builder, and passionate youth leader based in Singapore. With a deep belief in the power of people and partnerships, I’ve spent my career and volunteer journey supporting individuals through life’s toughest moments while empowering communities to grow stronger together.\n\nBeyond the hospital wards, I actively lead and contribute to local and regional initiatives focused on youth leadership, disaster risk reduction, social cohesion, and community health. From facilitating design-thinking workshops in Kuala Lumpur to representing Singapore in peacebuilding dialogues in Jakarta, I thrive in connecting people, ideas, and purpose.\n\nI’m passionate about creating spaces for collaboration, meaningful conversations, and innovative solutions that uplift lives — whether it’s through running support groups for stroke survivors, mentoring young changemakers, or contributing to health and social care policy reviews.\n\nLet’s connect if you’re passionate about people development, social impact, or cross-sector collaborations.",
    "photo": "",
    "linkedIn": "https://www.linkedin.com/in/martynchek/"
  },
  {
    "id": "tong-pei-yein",
    "name": "Tong Pei Yein",
    "title": "Consultant hand surgeon",
    "affiliation": "KTPH",
    "expertise": [
      "Healthcare innovation",
      "Clinical medicine",
      "Research",
      "Public health"
    ],
    "bio": "Dr Tong Pei Yein, MBBS, MMed (Ortho), FAMS (Hand Surgery), is a Hand Surgeon at Khoo Teck Puat Hospital with clinical interests in peripheral nerve surgery and wrist arthroscopy. She is involved in medical education and has received a Best Teacher Award for postgraduate education. Dr Tong contributes as faculty and organiser for local, regional, and international hand surgery courses and conferences. She is involved in patient care, surgical education, and learning in the field.",
    "photo": ""
  },
  {
    "id": "nadiah-raman",
    "name": "Nadiah Raman",
    "title": "Senior Podiatrist",
    "affiliation": "Khoo Teck Puat Hospital",
    "expertise": [
      "MedTech",
      "Healthcare innovation",
      "Public health"
    ],
    "bio": "Nadiah Raman is a practicing podiatrist at Khoo Teck Puat Hospital (KTPH), where her clinical interests centre on the management of diabetic high-risk foot conditions and limb salvage. In these areas, she works closely with colleagues across multiple disciplines, contributing to a collaborative, multidisciplinary approach to complex patient care. Her scope of practice spans both inpatient and outpatient settings, where she oversees all aspects of podiatry care. She serves as the lead for high-risk foot management at KTPH and provides dedicated support to diabetes foot services at both KTPH and Admiralty Medical Centre.\nBeyond her clinical responsibilities, Nadiah is committed to developing the next generation of podiatry professionals, actively mentoring junior podiatrists within her department. She also holds the Governance portfolio, a role in which she provides oversight of departmental policies, ensures regulatory compliance, and leads quality audits to uphold the highest standards of care delivery.\nAt the cluster level, Nadiah contributes meaningfully to the broader healthcare ecosystem within the National Healthcare Group (NHG). She supports the DEFINITE Care programme and the Lower Extremity Amputation Prevention Programme (LEAPP), both of which align closely with her clinical expertise in diabetic foot care and limb preservation. She also serves as a member of the NHG Diabetes Mellitus e-Learning Curriculum Sub-Workgroup, where she contributes to the development of educational resources aimed at strengthening the competencies of healthcare professionals in diabetes management.",
    "photo": "",
    "linkedIn": "https://www.linkedin.com/in/nadiah-raman-47b414141"
  },
  {
    "id": "zeng-yingchun",
    "name": "Zeng Yingchun",
    "title": "Assistant Professor",
    "affiliation": "NUS",
    "expertise": [
      "Healthcare innovation",
      "Research",
      "Digital health / AI health"
    ],
    "bio": "Dr Zeng Yingchun is an innovative cancer care researcher, focusing on AI in cancer survivorship outcomes. Dr. Zeng's research focuses on technology-driven innovations, particularly leveraging AI to enhance cancer care and manage chronic diseases. Her pioneering contributions to clinical medicine and nursing have advanced patient care strategies, integrating cutting-edge technologies to improve outcomes for diverse populations. Her dedication to innovation and interdisciplinary collaboration has established her as a leading figure in the field, inspiring advancements that bridge the gap between technology and healthcare.",
    "photo": ""
  },
  {
    "id": "adityarup-laha",
    "name": "Adityarup Laha",
    "title": "Student Attachment",
    "affiliation": "A*STAR Genome Institute of Singapore",
    "expertise": [
      "Biotechnology",
      "Healthcare innovation",
      "Digital health / AI health"
    ],
    "bio": "I'm Laha, a Y1 PhD Student at NUS, attached to A*STAR Genome Institute of Singapore. I come from a traditional statistics education at the Indian Statistical Institute, where I did my undergrad and Masters. My research over the last few years has been focused on genomics and transcriptomics. With nearly a decade of software engineering experience, I aim to bring together statistics and data science, computational tools, and fundamental biology to solve challenges in healthcare.",
    "photo": "",
    "linkedIn": "https://www.linkedin.com/in/adityaruplaha/"
  },
  {
    "id": "michelle-wong",
    "name": "Michelle Wong",
    "title": "Co-organiser",
    "affiliation": "Singapore Longevity and Health Meetup",
    "expertise": [
      "MedTech",
      "Biotechnology",
      "Research"
    ],
    "bio": "Our community holds events from networking sessions to short seminars on longevity science.",
    "photo": ""
  },
  {
    "id": "liu-zhenghong",
    "name": "Liu Zhenghong",
    "title": "Consultant",
    "affiliation": "Singapore general hospital",
    "expertise": [
      "MedTech",
      "Healthcare innovation",
      "Clinical medicine",
      "Research",
      "Digital health / AI health"
    ],
    "bio": "Dr Zhenghong Liu is an emergency physician with interest in sepsis and med tech. He is the healthcare innovation adviser of Air Aware Labs. Zhenghong is a Consultant Emergency Physician working in a large public hospital in Singapore. He completed the Singapore Biodesign Fellowship in 2022 and is currently working on various clinical innovation projects. Living in a country that suffers from seasonal trans-boundary haze, the impact of pollution is obvious to him, and the need for solutions vital. As a clinician taking care of patients presenting with respiratory illnesses, he sees an unmet need in this area. As an innovator involved in the healthcare technology scene, he has spotted a gap in clinical innovation- where innovators/engineers are unfamiliar with clinical settings and vice versa. He sees it as his job to fill that gap.",
    "photo": ""
  },
  {
    "id": "dr-gautam-sethi",
    "name": "Dr. Gautam Sethi",
    "title": "Associate Professor",
    "affiliation": "NUS",
    "expertise": [
      "Biotechnology",
      "Pharmaceuticals",
      "Research"
    ],
    "bio": "I am an Associate Professor in the Department of Pharmacology, Yong Loo Lin School of Medicine, National University of Singapore (NUS). My research focuses on cancer pharmacology, oncogenic signaling, inflammation, and translational drug discovery. I have published extensively in cancer biology and pharmacology and have been recognized as a Clarivate Highly Cited Researcher. I have also been consistently ranked among the world’s top 2% of scientists in the Stanford/Elsevier rankings. I am actively involved in postgraduate teaching, research supervision, and editorial activities for international biomedical journals.",
    "photo": "",
    "linkedIn": "https://www.linkedin.com/in/gautam-sethi-44484130/"
  },
  {
    "id": "tan-huiying",
    "name": "Tan Huiying",
    "title": "Head of Operations",
    "affiliation": "Volta Labs, Inc.",
    "expertise": [
      "MedTech",
      "Biotechnology",
      "Healthcare innovation",
      "Startups / entrepreneurship",
      "Product development",
      "Regulatory affairs",
      "Consulting / strategy"
    ],
    "bio": "Huiying is a life sciences and healthcare commercial leader with over 20 years of regional experience in business strategy, operations, and market development across Asia. She currently works with an innovative genomics technology company to expand its presence across the Asia-Pacific region, collaborating with laboratories and industry partners to accelerate the adoption of advanced automated genomics solutions.\n\nIn addition to her industry role, Huiying is an ICF Associate Certified Coach (ACC) and a volunteer Career Advisor with SWDA. She is passionate about mentoring youth, supporting entrepreneurs, emerging leaders and professionals, be it navigating their career journeys or building sustainable businesses.",
    "photo": "",
    "linkedIn": "https://www.linkedin.com/in/huiyingtan"
  },
  {
    "id": "seow-shih-wee",
    "name": "Seow Shih Wee",
    "title": "Senior Director (Corporate Services)",
    "affiliation": "Precision Health Research, Singapore (PRECISE)",
    "expertise": [
      "research admin and operations",
      "scientific communication"
    ],
    "bio": "As Senior Director of Corporate Services at PRECISE, the central programme management office coordinating and implementing Phase II and Phase III of Singapore’s National Precision Medicine Programme (NPM).\n\nAs Director, Corporate Services, Dr Seow is responsible for coordinating daily operations across various departments in PRECISE, and monitoring ongoing research activities and progress. Dr Seow also oversees PRECISE public communications, staff hiring, budget management matters, and liaises with various government agencies to support PRECISE operations.",
    "photo": ""
  },
  {
    "id": "mary-kan",
    "name": "Mary Kan",
    "title": "Programme Director",
    "affiliation": "MedTech Catapult",
    "expertise": [
      "MedTech",
      "Healthcare innovation",
      "Research",
      "Digital health / AI health",
      "Startups / entrepreneurship",
      "Venture capital / investment",
      "Product development",
      "Consulting / strategy"
    ],
    "bio": "Mary is the Programme Director of MedTech Catapult, a National platform that supports the productisation and commercialisation of high-value medical devices & life science instruments towards venture financing, market readiness and manufacturing\nShe has previously held roles at A*STAR spanning strategic planning, technology transfer and industry partnerships. She was also the Programme Director of Singapore Biodesign and oversaw the programme’s transition from Singapore-Stanford Biodesign to Singapore Biodesign and subsequently led SB to achieve the first Asian Global Affiliate status from Stanford Byers Center for Biodesign. Mary graduated with a PhD in Neuroscience from National University of Singapore, Master of Science in Pharmacology (Distinction) from King’s College London and Bachelors of Science (First Class Honours) from Imperial College of Science, Technology and Medicine. She is also a certified ISO13485 Lead Auditor and has attained the WSQ Diploma in Design and Development of Learning of Performance.",
    "photo": "",
    "linkedIn": "https://www.linkedin.com/in/enci-mary-kan-8b7747b2/"
  },
  {
    "id": "he-feng",
    "name": "He Feng",
    "title": "Chief Operating Officer",
    "affiliation": "Lejoy Technologies  / MyTherapist",
    "expertise": [
      "Digital health / AI health",
      "Startups / entrepreneurship",
      "Venture capital / investment",
      "Product development",
      "Consulting / strategy"
    ],
    "bio": "He Feng is the co-founder of mental health care service provider MyTherapist (jiandanxinli.com) - a Beijing-based startup that provides high quality psychotherapy and related services in China. He was also previously a management consultant at BCG with an MBA from Stanford.",
    "photo": "",
    "linkedIn": "https://www.linkedin.com/in/fenghe1/"
  },
  {
    "id": "chi-trung-nguyen",
    "name": "Chi Trung Nguyen",
    "title": "Founder Bottleneck Diagnostician",
    "affiliation": "ng ventures",
    "expertise": [
      "Startups / entrepreneurship",
      "Venture capital / investment",
      "Product development",
      "Consulting / strategy",
      "Engineering"
    ],
    "bio": "Trung Nguyen runs the Founder Bottleneck Diagnostic, helping founders name the real constraint behind stalled execution. Previously he led engineering teams at Contentful and Workpath, building zero-trust infrastructure and platform systems that let product organizations scale independently — work that repeatedly traced technical breakdowns to organizational root causes. He also founded Founders Run Club, a 300-member community in Ho Chi Minh City. Vietnamese-German, based in HCMC, he's especially drawn to mentoring health, education, and climate ventures.",
    "photo": "",
    "linkedIn": "https://www.linkedin.com/in/ctn1991/"
  },
  {
    "id": "ee-ling-lim",
    "name": "Ee Ling Lim",
    "title": "CEO",
    "affiliation": "Wavesparks",
    "expertise": [
      "Healthcare innovation",
      "Digital health / AI health",
      "Startups / entrepreneurship",
      "Venture capital / investment",
      "Consulting / strategy"
    ],
    "bio": "Ee Ling has led and oversaw the design, development, and implementation of 80+ startup programs globally.\n\nAs the Head of 500 Global's Market Launch Team, she led a global team implementing startup and innovation programs for 500 and its partners across Asia, MENA, Eurasia, and North America, helping establish 500’s first point of entry in many rising startup ecosystems. In her role, she worked with various ecosystem stakeholders - Governments, corporations, foundations, startups - to accelerate their innovation journey. She was previously managing partnerships and business development in Asia Pacific.\n\nAs the Co-Founder of Wavesparks (Young Founders Summit), an entrepreneurial school and platform for Gen Z founders, she’s implemented over 25 programs and bootcamps for youth, and is on a mission to build the largest community of entrepreneurial youth in Asia. Wavesparks helps ambitious young people turn early ideas into real ventures - through accelerator programs, mentorship, community, and pathways to networks and capital across Asia.\n \nPrior to becoming a founder, Ee Ling spent almost a decade as an Investment Banker, executing billion-dollar transactions in M&A, equity and debt capital markets. \n\nEe Ling is an experienced speaker, judge, mentor, advisor on areas related to startups, entrepreneurship, youth, and women. Ee Ling is a National Youth Council and National Youth Fund council Member. She's also an Accredited Board Director by Singapore Institute of Directors.",
    "photo": "",
    "linkedIn": "https://www.linkedin.com/in/ee-ling-lim/"
  },
  {
    "id": "ang-yee-gary",
    "name": "Ang Yee Gary",
    "title": "Family Physician",
    "affiliation": "Nhgp",
    "expertise": [
      "Healthcare innovation",
      "Clinical medicine",
      "Public health",
      "Digital health / AI health",
      "Startups / entrepreneurship",
      "Venture capital / investment"
    ],
    "bio": "Dr Ang Yee Gary (MBBS, MPH, MBA) is a public health specialist and family physician with approximately 20 years of experience in Singapore’s public healthcare sector. At National Healthcare Group Polyclinics, he combines clinical practice with work in healthcare AI, analytics and innovation. He also serves as Programme Coordinator at Newcastle Australia Institute of Higher Education, teaching health economics and healthcare finance. His work connects medicine, public health and business to improve patient outcomes and translate evidence into practical healthcare solutions.",
    "photo": "",
    "linkedIn": "https://www.linkedin.com/in/dr-ang-yee-gary"
  },
  {
    "id": "justin-fong-cheng-wah",
    "name": "Justin Fong Cheng Wah",
    "title": "Head of Marketing",
    "affiliation": "Bioactivx Pte Ltd",
    "expertise": [
      "MedTech",
      "Startups / entrepreneurship",
      "Consulting / strategy"
    ],
    "bio": "Justin Fong is an experienced communications and marketing leader, entrepreneur, trainer and mentor who has worked across the public, private and government sectors. A former SAF officer, he has held senior communications and marketing roles, including at the Prime Minister’s Office and A*STAR, and currently serves as Head of Marketing at a Singapore MedTech start-up.\n\nHaving built and operated several businesses, Justin brings practical experience in branding, marketing, leadership and turning ideas into viable ventures. As a mentor, he helps entrepreneurs clarify their value proposition, communicate their ideas confidently and navigate the realities of building a business.",
    "photo": "",
    "linkedIn": "https://www.linkedin.com/in/justin-fong-sg"
  },
  {
    "id": "neelima-gupta",
    "name": "Neelima Gupta",
    "title": "Instructor",
    "affiliation": "NUS Medicine",
    "expertise": [
      "Pharmaceuticals",
      "Healthcare innovation",
      "Research",
      "Digital health / AI health"
    ],
    "bio": "I am a biomedical educator and interdisciplinary researcher at the NUS, with a background in pharmacology, neuroscience, molecular biology, and biomedical education. My work focuses on pharmacology education, pharmacogenomics and personalised medicine, AI-enhanced learning, and human-centred healthcare innovation. I teach across undergraduate, postgraduate, medical, and continuing education programmes and contribute to curriculum development within the Department of Pharmacology. My research explores how emerging technologies, evidence-based education, and digital tools can improve learning, healthcare communication, and decision-making. I am also developing work in traditional, complementary, and integrative healthcare, with a particular interest in translating scientific evidence into practical resources for healthcare professionals and the public.",
    "photo": "",
    "linkedIn": "https://www.linkedin.com/in/neelima-gupta-phd/"
  }
];
