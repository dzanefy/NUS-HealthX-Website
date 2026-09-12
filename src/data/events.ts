export interface Speaker {
  name: string;
  title: string;
  affiliation: string;
}

export interface XPosureEvent {
  id: string;
  slug: string;
  title: string;
  shortDate: string;
  dateISO: string;
  location: string;
  speakers: Speaker[];
  thumbnail: string;
  excerpt: string;
  body: string[];
  tags: string[];
  registerUrl?: string;
  upcoming: boolean;
  acknowledgements?: string;
  articleImageUrl?: string;
  category?: string;
  subPillar?: string;
  audience?: string;
}

export const xposureEvents: XPosureEvent[] = [
  {
    id: 'next-xposure-placeholder',
    slug: 'next-xposure-session',
    title: "Health X'posure: Next Session",
    shortDate: 'Coming soon',
    dateISO: '2026-10-01',
    location: 'NUS (details to be announced)',
    speakers: [],
    thumbnail: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=500&fit=crop&auto=format',
    excerpt: 'We are preparing the next Health X\'posure session. Register your interest and we will share the details when the programme is confirmed.',
    body: ['This is a placeholder for the next Health X\'posure event. More details, including the date, speakers, and registration information, will be added soon.'],
    tags: ['Coming soon', 'Health X\'posure'],
    registerUrl: '#register-interest',
    upcoming: true,
  },
  {
    id: '1',
    slug: 'ai-healthcare-masterclass',
    title: 'AI in Healthcare Masterclass',
    shortDate: '16 January 2026',
    dateISO: '2026-01-16',
    location: 'NUS School of Medicine, Singapore',
    speakers: [
      {
        name: 'A/Prof Liang Zhong',
        title: 'Senior Clinician-Innovator, Director of Cardiovascular System Imaging & AI Lab',
        affiliation: 'Duke-NUS Medical School',
      },
      {
        name: 'Dr Dinesh V. Gunasekeran',
        title: 'Healthcare Technology Leader, Clinician Scientist, Commonwealth Innovation Fellow',
        affiliation: 'MOH Office of Healthcare Innovation',
      },
    ],
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop&auto=format',
    excerpt:
      'An immersive masterclass exploring how artificial intelligence is transforming clinical workflows, diagnostics, and medical decision-making in real-world healthcare settings.',
    body: [
      'The AI in Healthcare Masterclass on 16 January 2026 brought together students, clinicians, and technologists for a thought-provoking exploration of how artificial intelligence is reshaping modern medicine. The event was held at NUS School of Medicine and attracted over 90 participants from across disciplines.',
      'A/Prof Liang Zhong, Senior Clinician-Innovator at Duke-NUS Medical School and Director of the Cardiovascular System Imaging & AI Lab, opened with a compelling overview of AI applications in cardiovascular diagnostics. She shared ongoing clinical trials at local hospitals and discussed the technical underpinnings of AI-powered imaging systems that are already improving patient outcomes, including her team\'s work on non-invasive haemodynamic modelling.',
      'Dr Dinesh V. Gunasekeran, Commonwealth Innovation Fellow and Clinician Scientist at the MOH Office of Healthcare Innovation, followed with an engaging session on translating AI innovations into deployable clinical solutions. He addressed the ethical dimensions of AI adoption, including algorithmic bias, data privacy, and clinician oversight, and shared frameworks for responsible innovation in high-stakes environments.',
      'Participants gained practical perspectives on the intersection of medicine, technology, and entrepreneurship. Breakout discussions covered topics including regulatory pathways for AI medical devices under HSA\'s SaMD framework, strategies for building interdisciplinary research teams, and the future of AI-augmented clinical decision support.',
      'The session concluded with a panel Q&A, after which many participants stayed to continue conversations. It was a testament to the genuine intellectual energy the event generated.',
    ],
    tags: ['Artificial Intelligence', 'Healthcare Technology', 'Clinical Innovation'],
    upcoming: false,
  },
  {
    id: '2',
    slug: 'medtech-business-masterclass',
    title: 'MedTech Business Masterclass',
    shortDate: '27 October 2025',
    dateISO: '2025-10-27',
    location: 'NUS School of Medicine, Singapore',
    speakers: [
      {
        name: 'Dr. Ian Mathews',
        title: 'Emergency Physician, Deputy Group CTO, Stanford Biodesign Global Fellow',
        affiliation: 'National University Health System',
      },
      {
        name: 'Dr. Monika Mehta',
        title: 'Co-founder & CEO, Antler & Y Combinator-backed founder',
        affiliation: 'Zealth-AI',
      },
      {
        name: 'Ms. Dorothea K.',
        title: 'Co-founder & CEO; Former Baxter Healthcare & Medtronic Executive',
        affiliation: 'Bot MD',
      },
    ],
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop&auto=format',
    excerpt:
      'An engaging deep-dive into how MedTech innovations are brought from concept to market, featuring three seasoned clinician-entrepreneurs sharing candid lessons from the startup trenches.',
    body: [
      'The MedTech Business Masterclass on 27 October 2025 offered participants an unparalleled window into healthcare entrepreneurship. Three distinguished speakers, each with deep experience building and scaling MedTech ventures, shared their journeys, hard-won lessons, and practical frameworks with an audience of over 80 students and professionals.',
      'Dr. Ian Mathews, Stanford Biodesign Global Fellow and Deputy Group CTO of NUHS, opened the session by framing the challenge of translating clinical problems into investable solutions. Drawing from his dual role as a practising emergency physician and technology leader, he walked participants through the Stanford Biodesign process, emphasising that rigorous needs-finding, not technology fascination, is the foundation of impactful medical device development.',
      'Dr. Monika Mehta, whose startup Zealth-AI has been backed by both Antler and Y Combinator, spoke candidly about the challenges of building an AI-first healthcare company in Southeast Asia. She discussed product-market fit in conservative healthcare systems, regulatory strategy across multiple markets, and what institutional investors look for in early-stage MedTech ventures.',
      'Ms. Dorothea K., Co-founder of Bot MD and former senior executive at both Baxter Healthcare and Medtronic, brought perspective from two worlds: large corporates and the startup ecosystem. She shared hard-won insights on selling technology to risk-averse hospital procurement teams, navigating enterprise sales cycles, and building a team culture that can sustain the ups and downs of a healthcare startup.',
      'The masterclass also provided a platform for students and innovators to network, exchange ideas, and gain insights into design thinking, commercialisation pathways, and the realities of building in healthcare.',
    ],
    tags: ['MedTech', 'Entrepreneurship', 'Business Strategy'],
    upcoming: false,
  },
  {
    id: '3',
    slug: 'bci-workshop',
    title: 'Brain-Computer Interfacing Workshop',
    shortDate: '15 September 2025',
    dateISO: '2025-09-15',
    location: 'NUS University Cultural Centre, Singapore',
    speakers: [
      {
        name: 'Ms. Christy Li',
        title: 'MedTech Innovator & BCI Specialist',
        affiliation: 'g.tec Medical Engineering',
      },
    ],
    thumbnail: 'https://images.unsplash.com/photo-1559757175262-86d8bf4b05e6?w=800&h=500&fit=crop&auto=format',
    excerpt:
      "HealthX AY25/26 kicked off with an inspiring workshop on Brain-Computer Interfaces, exploring how neuroscience and technology converge to revolutionise healthcare and human-computer interaction.",
    body: [
      'Team HealthX kicked off AY25/26 with an inspiring workshop on the future of Brain-Computer Interfaces (BCI), held on 15 September 2025 in collaboration with g.tec Medical Engineering. The event brought the NUS community together to explore how neuroscience and technology converge to revolutionise healthcare and human-computer interaction.',
      'Participants enjoyed an engaging keynote by Ms. Christy Li, a leading BCI specialist with g.tec Medical Engineering, who provided an accessible yet technically rigorous introduction to neural signal acquisition, EEG processing pipelines, and the clinical applications of BCI systems. Her talk covered everything from cochlear implants and deep brain stimulation to next-generation non-invasive brain-machine interfaces.',
      'Following the keynote, attendees rotated through hands-on demonstration stations with cutting-edge neural devices. Groups experienced real-time EEG signal visualisation, participated in a motor imagery BCI classification task, and learned how raw neural signals are decoded into actionable commands for assistive technology.',
      'The workshop concluded with an open networking session bringing together MedTech experts, clinicians, researchers, and students. Discussions ranged from the regulatory challenges of first-in-human BCI trials to the long-term vision of closed-loop neural prosthetics for motor rehabilitation and communication.',
      'The event showcased the transformative potential of BCIs in healthcare, rehabilitation, and research, and inspired many participants to pursue further projects in neurotechnology.',
    ],
    tags: ['Neurotechnology', 'Brain-Computer Interface', 'Hands-on Workshop'],
    upcoming: false,
  },
  {
    id: '4',
    slug: 'nus-kcl-challenge',
    title: 'NUS KCL Medical Innovation Challenge',
    shortDate: '26 February 2025',
    dateISO: '2025-02-26',
    location: "King's College London & NUS (Hybrid)",
    speakers: [],
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop&auto=format',
    excerpt:
      "A cross-institutional hackathon between NUS and King's College London, with interdisciplinary teams tackling real clinical challenges across two world-class universities.",
    body: [
      "The NUS KCL Medical Innovation Challenge on 26 February 2025 brought together students from the National University of Singapore and King's College London for a high-energy, cross-institutional hackathon focused on solving pressing healthcare problems.",
      "Teams of four to six students spanning medicine, engineering, business, computing, and design were presented with real clinical problem statements sourced from practising physicians at both institutions. Over 48 hours, teams developed, prototyped, and pitched innovative solutions to a panel of judges comprising clinicians, investors, and MedTech entrepreneurs.",
      "The challenge was HealthX's first formal international collaboration, building on our partnership with King's College London. It created a unique opportunity for students from two world-class universities to learn from each other's healthcare systems, regulatory environments, and innovation cultures.",
      "Winning teams received mentorship opportunities and were fast-tracked into HealthX's incubation support pathway, with ongoing guidance to refine their solutions for real-world deployment or further clinical validation.",
    ],
    tags: ['Hackathon', 'International Collaboration', 'Innovation Challenge'],
    upcoming: false,
  },
  {
    id: '5',
    slug: 'regenerative-medicine-sharing',
    title: 'Innovation Sharing 2: Regenerative Medicine',
    shortDate: '7 February 2025',
    dateISO: '2025-02-07',
    location: 'NUS Yong Siew Toh Conservatory, Singapore',
    speakers: [],
    thumbnail: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=500&fit=crop&auto=format',
    excerpt:
      'A deep dive into the frontier of regenerative medicine, including stem cell therapies, tissue engineering, and the clinical translation of biological innovations.',
    body: [
      'The second Innovation Sharing session of AY24/25 focused on regenerative medicine, one of the most promising frontiers in modern healthcare. Held on 7 February 2025, the session attracted over 60 students and researchers from NUS and its affiliated institutions.',
      'Distinguished speakers shared insights on stem cell biology, induced pluripotent stem cells (iPSCs), tissue engineering scaffolds, and the considerable challenges of bringing regenerative therapies from bench to bedside through clinical trials and regulatory approval pathways.',
      'Participants explored real-world applications including cartilage regeneration, organoid culture systems for precision drug testing, and the emerging field of gene editing combined with advanced cell therapy. Rich discussions explored the ethical dimensions of regenerative medicine, particularly around germline editing and equitable global access to advanced biological therapies.',
      "The session reinforced HealthX's commitment to exposing students to the full breadth of MedTech innovation, from cutting-edge basic science all the way to the practical realities of clinical translation and commercialisation.",
    ],
    tags: ['Regenerative Medicine', 'Biotechnology', 'Research'],
    upcoming: false,
  },
  {
    id: '6',
    slug: 'mingle-jingle-networking',
    title: 'Mingle and Jingle MedTech Networking Event',
    shortDate: '25 January 2025',
    dateISO: '2025-01-25',
    location: 'NUS University Town, Singapore',
    speakers: [],
    thumbnail: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=500&fit=crop&auto=format',
    excerpt:
      "A festive networking evening connecting students, clinicians, and industry leaders through lightning talks, structured conversations, and the warmth of the HealthX community.",
    body: [
      'The Mingle and Jingle MedTech Networking Event on 25 January 2025 brought the HealthX community together for an evening of connection, celebration, and collaboration at NUS University Town. Over 100 students, clinicians, and industry professionals gathered to ring in the new semester together.',
      'The event featured a curated series of lightning talks from HealthX members sharing their ongoing projects and research, followed by an extended networking session with structured conversation starters designed to spark cross-disciplinary connections that might not form organically.',
      'Industry guests included representatives from local MedTech startups, hospital innovation offices, and venture capital firms specialising in healthcare. Several attendees went on to form lasting mentorship relationships and project collaborations that continued well beyond the event.',
      "The evening was relaxed, festive, and inclusive. It exemplified HealthX's core philosophy: creating spaces where meaningful professional relationships form organically across the often-siloed disciplines of medicine, technology, and business.",
    ],
    tags: ['Networking', 'Community', 'MedTech'],
    upcoming: false,
  },
  {
    id: '7',
    slug: 'design-for-medicine',
    title: 'Design for Medicine',
    shortDate: '17 Nov 2024 – 17 Jul 2025',
    dateISO: '2024-11-17',
    location: 'NUS School of Design & Environment, Singapore',
    speakers: [],
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop&auto=format',
    excerpt:
      'An eight-month immersive programme pairing interdisciplinary teams with clinical mentors to develop user-centred solutions to real unmet healthcare needs.',
    body: [
      "Design for Medicine is HealthX's flagship long-form programme, running from November 2024 through July 2025. The programme pairs students from design, engineering, computing, and medicine with clinical mentors to develop user-centred solutions to real, validated healthcare problems.",
      'Participants undergo intensive training in ethnographic research, design thinking, rapid prototyping, and clinical validation methodology. Teams make regular visits to hospitals and clinics to observe workflows, conduct patient and clinician interviews, and iteratively refine their understanding of unmet needs before committing to a design direction.',
      'Over eight months, teams progress through structured phases: problem discovery, needs validation, ideation sprints, prototyping, and pilot testing with real clinical stakeholders. Faculty advisors, clinician mentors, and industry experts provide structured guidance at each phase gate.',
      'The programme culminates in a public showcase where teams present their validated prototypes to investors, hospital administrators, and the broader NUS community. Selected teams receive continued support to pursue commercialisation, further clinical study, or licensing partnerships.',
    ],
    tags: ['Design Thinking', 'Human-Centred Design', 'Long-form Programme'],
    upcoming: false,
  },
  {
    id: '8',
    slug: 'innovation-sharing-1',
    title: 'Innovation Sharing 1: Medical Innovation',
    shortDate: '15 November 2024',
    dateISO: '2024-11-15',
    location: 'NUS Yong Siew Toh Conservatory, Singapore',
    speakers: [],
    thumbnail: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=500&fit=crop&auto=format',
    excerpt:
      "The inaugural Innovation Sharing session of AY24/25 set the intellectual foundation for a year of interdisciplinary exploration across the MedTech landscape.",
    body: [
      "The first Innovation Sharing session of AY24/25, held on 15 November 2024, opened HealthX's flagship knowledge series with a broad and energising exploration of the medical innovation landscape. The session was designed to orient new members and returning students to the key themes, challenges, and opportunities shaping healthcare technology today.",
      "Speakers covered Singapore's MedTech ecosystem, funding pathways for student-led projects, the role of multidisciplinary collaboration in driving meaningful innovation, and an honest overview of what it takes to build solutions that actually reach patients.",
      'Interactive breakout sessions allowed participants to discuss areas of personal interest, including AI and clinical decision support, medical devices, biotechnology, and digital health platforms, and to identify potential collaborators for the year ahead.',
      "The session established the intellectual and social foundation for HealthX's AY24/25 programme year, and inspired participants to think broadly and ambitiously about their potential contributions to healthcare innovation.",
    ],
    tags: ['Medical Innovation', 'Knowledge Sharing', 'Community'],
    upcoming: false,
  },
  {
    id: '9',
    slug: '3d-printing-workshop',
    title: '3D Printing Workshop',
    shortDate: '19 September 2024',
    dateISO: '2024-09-19',
    location: 'NUS Faculty of Engineering, Singapore',
    speakers: [],
    thumbnail: 'https://images.unsplash.com/photo-1581093804475-577d72e38aa0?w=800&h=500&fit=crop&auto=format',
    excerpt:
      'A hands-on introduction to medical 3D printing, from biocompatible materials to patient-specific device fabrication, anatomical models, and surgical planning applications.',
    body: [
      "HealthX's 3D Printing Workshop on 19 September 2024 gave participants a comprehensive introduction to additive manufacturing in medicine. Hosted at NUS Faculty of Engineering, the workshop attracted over 50 students from engineering, medicine, and design, reflecting the interdisciplinary spirit that defines HealthX.",
      'Participants learned about the materials science behind medical-grade 3D printing, including biocompatible polymers, photosensitive resins, and the emerging field of bioprinting living tissue constructs. Hands-on stations allowed teams to design, slice, and print small anatomical models under faculty expert guidance.',
      'The workshop also explored the breadth of clinical applications: patient-specific implants and surgical guides, hearing aids and orthotics, phantom models for medical training, and novel drug delivery systems. Regulatory considerations around HSA and FDA approval for 3D-printed medical devices were discussed in practical depth.',
      '3D printing emerged clearly as an accessible entry point for students interested in medical device innovation. It has low barriers to experimentation, rapid prototyping cycles, and genuine clinical impact when applied thoughtfully.',
    ],
    tags: ['3D Printing', 'Medical Devices', 'Hands-on Workshop'],
    upcoming: false,
  },
  {
    id: '10',
    slug: 'nuhs-innovation-showcase',
    title: 'NUHS Innovation Showcase',
    shortDate: '7 October 2024',
    dateISO: '2024-10-07',
    location: 'National University Hospital, Singapore',
    speakers: [],
    thumbnail: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=500&fit=crop&auto=format',
    excerpt:
      "An exclusive behind-the-scenes look at NUHS's innovation ecosystem, with live demonstrations of cutting-edge clinical technologies and engineers and clinicians on hand to share their journeys.",
    body: [
      "The NUHS Innovation Showcase on 7 October 2024 gave HealthX members an exclusive window into one of Singapore's most active healthcare innovation ecosystems. Held at the National University Hospital, the event featured live demonstrations from NUHS's internal innovation teams and affiliated startups.",
      'Participants observed cutting-edge clinical technologies in action: AI-powered radiology tools, automated pharmacy dispensing systems, remote patient monitoring platforms, robotic-assisted surgical devices, and smart ward management systems. Engineers and clinicians from NUHS were on hand to explain how these systems were developed, validated, and integrated into real clinical workflows.',
      "The showcase also featured a panel of NUHS staff innovators who shared their journeys from identifying clinical problems to building, testing, and deploying solutions within the hospital environment, navigating institutional procurement, clinical governance, and change management along the way.",
      "For many participants, the event was a powerful demonstration of what's possible when clinicians are empowered to innovate from within the healthcare system, and a compelling argument for pursuing careers at the genuine intersection of medicine and technology.",
    ],
    tags: ['Innovation Showcase', 'Hospital Innovation', 'Clinical Technology'],
    upcoming: false,
  },
];
