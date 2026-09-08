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

export const mentors: Mentor[] = [
  {
    id: '1',
    name: 'Dr. Ian Mathews',
    title: 'Emergency Physician & Deputy Group CTO',
    affiliation: 'National University Health System',
    expertise: ['Stanford Biodesign', 'Clinical Innovation', 'Digital Health', 'Medical Devices'],
    bio: 'Dr. Ian Mathews is an Emergency Physician and the Deputy Group CTO of NUHS. A Stanford Biodesign Global Fellow, he bridges clinical practice and technology innovation. He has mentored dozens of student teams through the Biodesign process and is a passionate advocate for structured needs-finding as the foundation of impactful medical device development. He regularly leads workshops on translating clinical observations into investable product opportunities.',
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&h=500&fit=crop&auto=format',
    linkedIn: '#',
  },
  {
    id: '2',
    name: 'A/Prof Liang Zhong',
    title: 'Senior Clinician-Innovator & Lab Director',
    affiliation: 'Duke-NUS Medical School',
    expertise: ['Cardiovascular AI', 'Medical Imaging', 'Computational Modelling', 'Clinical Translation'],
    bio: "Associate Professor Liang Zhong is a Senior Clinician-Innovator at Duke-NUS Medical School and Director of the Cardiovascular System Imaging & AI Lab. Her research applies AI and computational fluid dynamics to cardiovascular diagnostics, enabling non-invasive assessment of haemodynamic forces with clinical precision. She has published extensively in Nature, The Lancet, and Circulation, and is deeply committed to mentoring the next generation of clinician-scientists.",
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&h=500&fit=crop&auto=format',
    linkedIn: '#',
  },
  {
    id: '3',
    name: 'Dr. Monika Mehta',
    title: 'Co-founder & CEO',
    affiliation: 'Zealth-AI',
    expertise: ['Health Tech Startups', 'AI in Healthcare', 'Fundraising', 'Go-to-Market Strategy'],
    bio: 'Dr. Monika Mehta is the co-founder and CEO of Zealth-AI, an Antler and Y Combinator-backed startup building AI-powered tools for chronic disease management. A physician turned entrepreneur, she brings first-hand experience of the challenges and rewards at the intersection of clinical medicine and technology. She mentors student founders on product development, investor pitching, regulatory strategy, and the realities of building a health tech startup in Southeast Asia.',
    photo: 'https://images.unsplash.com/photo-1659353888633-bc0db91345df?w=500&h=500&fit=crop&auto=format',
    linkedIn: '#',
  },
  {
    id: '4',
    name: 'Ms. Dorothea K.',
    title: 'Co-founder & CEO',
    affiliation: 'Bot MD',
    expertise: ['MedTech Sales', 'Hospital Operations', 'Market Entry', 'Executive Leadership'],
    bio: 'Dorothea is Co-founder and CEO of Bot MD, and a former senior executive at Baxter Healthcare and Medtronic. With over 15 years of experience spanning medical devices and health technology, she brings unique insights into hospital procurement cycles, navigating institutional risk aversion, and scaling MedTech businesses across Southeast Asia. She is particularly passionate about mentoring students on the commercial realities of healthcare innovation.',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop&auto=format',
    linkedIn: '#',
  },
  {
    id: '5',
    name: 'Dr. Dinesh V. Gunasekeran',
    title: 'Clinician Scientist & Healthcare Technology Leader',
    affiliation: 'MOH Office of Healthcare Innovation',
    expertise: ['Health Policy', 'Digital Health Strategy', 'AI Ethics', 'Regulatory Affairs'],
    bio: 'Dr. Dinesh V. Gunasekeran is a Commonwealth Innovation Fellow and Clinician Scientist at the MOH Office of Healthcare Innovation. He works at the intersection of technology, health policy, and clinical practice, with a focus on the responsible adoption of AI in healthcare systems. He advises student teams on navigating regulatory pathways, ethical design principles, and building technology that is both effective and equitable.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&auto=format',
    linkedIn: '#',
  },
  {
    id: '6',
    name: 'Ms. Christy Li',
    title: 'MedTech Innovator & BCI Specialist',
    affiliation: 'g.tec Medical Engineering',
    expertise: ['Brain-Computer Interfaces', 'Neural Engineering', 'Rehabilitation Technology', 'Neurotechnology'],
    bio: 'Christy Li is a leading expert in brain-computer interface technology with g.tec Medical Engineering. She has spent a decade advancing BCI applications in stroke rehabilitation, assistive communication, and neural prosthetics. She brings hands-on expertise in neural signal processing, EEG system design, and clinical validation to her mentorship, and is committed to making neurotechnology accessible to the next generation of innovators.',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop&auto=format',
    linkedIn: '#',
  },
  {
    id: '7',
    name: 'Dr. John Thng',
    title: 'Chairman & Advisor',
    affiliation: 'NUS HealthX',
    expertise: ['Healthcare Leadership', 'Strategic Advisory', 'MedTech Ecosystem', 'Interdisciplinary Education'],
    bio: "Dr. John Thng is the founding Chairman and Advisor of NUS HealthX. A distinguished clinician and healthcare leader, he provides strategic guidance to the organisation and mentors student leaders on building impactful interdisciplinary programmes. His vision of bridging the gap between clinical practice and technological innovation has shaped HealthX's identity from its inception.",
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=500&fit=crop&auto=format',
    linkedIn: '#',
  },
  {
    id: '8',
    name: 'Mr. Harry W.',
    title: 'MedTech Commercialisation Expert',
    affiliation: 'NUS Entrepreneurship Centre',
    expertise: ['Market Sizing', 'Business Development', 'Investment Readiness', 'Startup Strategy'],
    bio: "Harry is a seasoned MedTech commercialisation expert with experience spanning early-stage startups and established medical device companies. He has guided over 20 student ventures through product-market fit analysis, TAM-SAM-SOM sizing, competitive landscape evaluation, and business model development. He is a regular mentor in HealthX's Health X'perience programme and has a particular passion for helping technically-minded founders develop commercial fluency.",
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop&auto=format',
    linkedIn: '#',
  },
];
