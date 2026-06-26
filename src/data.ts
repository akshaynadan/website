import { Project, Skill, ExperienceItem, EducationItem, CertificationItem, AwardItem } from './types';

export const PERSONAL_INFO = {
  name: "Akshay Manaparambil Nandhanan",
  title: "Software Engineer & IT Graduate",
  subTitle: "Bridging Artificial Intelligence, IoT-based innovation, and full-stack web development to build intelligent, impactful solutions.",
  location: "Thrissur, Kerala, India",
  address: "Manaparambil House, Kannikkara, Thazekkad PO, Thrissur, Kerala, 680697",
  email: "akshaynandan34@gmail.com",
  phone: "(+91) 9677557993",
  nationality: "Indian",
  dob: "23/01/1998",
  pob: "Chalakudy, India",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  aboutMe: "Ambitious IT graduate with a solid foundation in software development, data analytics, and artificial intelligence, complemented by hands-on experience in IoT-based innovation and Android app development. After completing my B.Tech degree, I cultivated strong leadership, strategic planning, and operational management skills through a managerial role, strengthening my ability to apply technological solutions within real-world business environments. Having completed certifications in AI, Cloud Computing, and Big Data, I keep my skills aligned with modern industry trends. I am focused on leveraging these multi-disciplinary strengths to develop robust, production-grade applications that solve global challenges.",
  resumeUrl: "#"
};

export const SKILLS: Skill[] = [
  // Languages & Core
  { name: "Python", level: 90, category: "Languages & Core" },
  { name: "Java", level: 82, category: "Languages & Core" },
  { name: "Kotlin", level: 75, category: "Languages & Core" },
  { name: "C++", level: 70, category: "Languages & Core" },
  { name: "SQL", level: 85, category: "Languages & Core" },
  { name: "JavaScript / TypeScript", level: 88, category: "Languages & Core" },
  { name: "HTML5 & CSS3 / XML", level: 90, category: "Languages & Core" },

  // AI, ML & Data
  { name: "Artificial Intelligence", level: 88, category: "AI, ML & Data" },
  { name: "Generative AI & LLMs", level: 85, category: "AI, ML & Data" },
  { name: "Big Data Technologies", level: 80, category: "AI, ML & Data" },
  { name: "TensorFlow & PyTorch", level: 72, category: "AI, ML & Data" },
  { name: "R Programming", level: 78, category: "AI, ML & Data" },
  { name: "Data Analytics & Power BI", level: 85, category: "AI, ML & Data" },

  // Mobile & IoT
  { name: "Android App Development", level: 86, category: "Mobile & IoT" },
  { name: "IoT Platform Integration", level: 88, category: "Mobile & IoT" },
  { name: "Firebase Authentication & DB", level: 84, category: "Mobile & IoT" },
  { name: "Android Studio IDE", level: 88, category: "Mobile & IoT" },

  // Cloud & Tools
  { name: "Cloud Computing (AWS)", level: 82, category: "Cloud & Tools" },
  { name: "Infrastructure as Code", level: 76, category: "Cloud & Tools" },
  { name: "REST APIs & JSON", level: 88, category: "Cloud & Tools" },
  { name: "Git & GitHub", level: 85, category: "Cloud & Tools" },
  { name: "Microsoft Excel & Google Sheets", level: 90, category: "Cloud & Tools" }
];

export const PROJECTS: Project[] = [
  {
    id: "talentlens-ai",
    title: "TalentLens AI Recruitment Assistant",
    description: "A comprehensive AI recruitment assistant built with Python, Streamlit, FastAPI, SQLite, and the OpenAI API for candidate ranking and chat.",
    longDescription: "TalentLens AI is an intelligent recruitment helper designed to streamline hiring workflows. It enables recruiters to upload candidate resumes, compare them semantically with a targeted job description, rank candidates dynamically, inspect profile details, chat with an interactive AI recruitment assistant, and export shortlisted applicants.",
    tags: ["Python", "FastAPI", "OpenAI API", "Streamlit", "SQLite", "Semantic Search"],
    category: "AI & Data",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
    githubUrl: "https://github.com/akshaynadan/TalentLens_AI_Recruitment",
    features: [
      "Streamlined resume parsing and semantic content indexing",
      "Dynamic candidate-to-job matching & multi-criteria similarity ranking",
      "Interactive context-aware conversation agent powered by OpenAI's API",
      "Candidate profile comparison and filtered data panel views",
      "Structured shortlisting and CSV/Excel export tools"
    ],
    techStack: ["Python", "FastAPI", "Streamlit", "OpenAI SDK", "SQLite", "Pandas", "Uvicorn"]
  },
  {
    id: "currency-converter-mobile",
    title: "Currency Convertor Mobile Application",
    description: "An enterprise-grade, highly optimized mobile currency conversion utility built natively to offer cached rates and minimize friction.",
    longDescription: "A sophisticated native Android application designed to provide instantaneous financial calculations for global travelers and business professionals. It fetches live global exchange feeds, implements local storage caching for offline functionality, and handles multi-currency conversion grids smoothly.",
    tags: ["Android SDK", "Kotlin", "RESTful APIs", "XML Layouts", "Local Cache"],
    category: "IoT & Mobile",
    image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&q=80&w=800",
    githubUrl: "https://github.com/akshaynadan/Currency_Convertor_Mobile_Application",
    features: [
      "Real-time exchange rate updates with offline-first local edge-caching",
      "Asynchronous network calls via Retrofit with complete error handshakes",
      "Responsive and adaptive native Android XML styling",
      "Flexible multi-currency comparison grids with dynamic source switching"
    ],
    techStack: ["Kotlin", "Android SDK", "Retrofit 2", "XML Styles", "Local Storage", "JUnit"]
  },
  {
    id: "lyra-app",
    title: "LYRA Competition & Social Platform",
    description: "A community social media and competition platform featuring responsive feed grids and client-side persistence.",
    longDescription: "LYRA is an elegant community hub showcasing modern frontend architecture. It integrates responsive posting feeds, custom voting mechanisms for competitions, and localized user-profile configurations powered by persistent browser state.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Local Storage", "Web APIs"],
    category: "Web Apps",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800",
    githubUrl: "https://github.com/akshaynadan/LYRA_APP",
    features: [
      "Fully interactive user post creation and responsive feed grids",
      "Dynamic voting system for community competitions with instant state updates",
      "Zero-dependency persistence using browser localStorage",
      "Clean UI visual elements styled with modern Tailwind CSS utility structures"
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Lucide Icons", "Web Storage API"]
  },
  {
    id: "my-python-code",
    title: "Python Algorithmic Scripting Suite",
    description: "A collection of computational algorithm implementations, automation modules, and standard library scripting utilities.",
    longDescription: "An organized code repository highlighting mastery of Python. It compiles clean-coded algorithms, structural scripting modules, filesystem automation routines, and data processing models demonstrating robust logical problem-solving.",
    tags: ["Python 3", "Algorithms", "Automation", "Data Parsing", "Scripting"],
    category: "Web Apps",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
    githubUrl: "https://github.com/akshaynadan/My_python_code",
    features: [
      "Optimized standard and advanced algorithms demonstrating pure logical flow",
      "Filesystem batch processing and task scheduling automation utilities",
      "Flexible data parsing patterns using native regex and JSON models",
      "Structured documentation and scalable modular script setups"
    ],
    techStack: ["Python 3", "JSON Parsers", "Standard Libraries", "Unit Testing", "Regex Utilities"]
  }
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Operations Manager",
    company: "Ganapathy Bavan – Guruvayor, India",
    period: "10/2021 – 03/2025",
    description: [
      "Directed day-to-day operations of an established high-volume restaurant, mastering operational efficiency.",
      "Cultivated deep cross-functional expertise in leadership, active communication, conflict resolution, and complex problem-solving.",
      "Spearheaded strategic planning, supplier negotiations, and team workflows to drive continuous revenue growth and guest satisfaction.",
      "Maintained business systems and administrative frameworks, demonstrating the capability to align real-world commerce with tech solutions."
    ],
    skills: ["Operational Leadership", "Strategic Planning", "Team Management", "Problem Solving", "Conflict Resolution"]
  },
  {
    id: "exp-2",
    role: "Software Engineering Intern",
    company: "Manfree Technologies – Coimbatore, India",
    period: "05/2018 – 06/2018",
    description: [
      "Explored core programming architectures with Python, focusing on structural clean code principles.",
      "Developed custom programmatic models implementing flow controls, logical loops, and script modules.",
      "Acquired hands-on insights on Python IDE configurations, testing routines, and object-oriented scripting."
    ],
    skills: ["Python", "Python IDEs", "Flow Control Algorithms", "Modular Scripting", "Software Architecture"]
  },
  {
    id: "exp-3",
    role: "Android Development Trainee",
    company: "Liz Tech – Coimbatore, India",
    period: "06/2017 – 06/2017",
    description: [
      "Mastered foundational android development architectures utilizing Java, Kotlin, and XML layouts.",
      "Successfully integrated Firebase Authentication workflows to enable user signup/signin capabilities.",
      "Formulated comprehensive software unit testing modules with the JUnit testing library."
    ],
    skills: ["Android SDK", "Java", "Kotlin", "XML Layouts", "Firebase Authentication", "JUnit Testing"]
  },
  {
    id: "exp-4",
    role: "Software Intern",
    company: "Hewlett Packard (HP) – Coimbatore, India",
    period: "2016 – 2017",
    description: [
      "Gained hands-on professional introduction to native mobile app architectures within Android Studio.",
      "Configured secure, scalable cloud hosting configurations and asset containers with AWS.",
      "Co-developed initial wireframe interfaces and debugged runtime activity life cycles in sandbox devices."
    ],
    skills: ["Android Studio", "Mobile UI Design", "AWS Cloud Services", "Debugging", "API Integration"]
  }
];

export const EDUCATION: EducationItem[] = [
  {
    id: "edu-1",
    degree: "Training in Artificial Intelligence",
    institution: "Advanced AI Cohort (Thrissur, India)",
    period: "07/2025 – 05/2026",
    location: "Thrissur, Kerala, India",
    details: [
      "Deeply mastered Generative AI tools, LLM-based architectures, prompting frameworks, and application development.",
      "Configured LLM fine-tuning schedules, evaluation workflows, and vector storage clients.",
      "Practiced robust Python data science programming with core machine learning tools like TensorFlow, PyTorch, and Jupyter notebooks."
    ]
  },
  {
    id: "edu-2",
    degree: "Bachelor of Technology in Information Technology",
    institution: "Dr. N.G.P Institute of Technology (Anna University)",
    period: "2016 – 2020",
    location: "Coimbatore, India",
    details: [
      "Graduated with a highly competitive final grade of 7.28 (EQF level 7 equivalency).",
      "Course specifics: Data Structures, Database Management Systems, Operating Systems, Software Engineering, Web Programming, Artificial Intelligence, Grid & Cloud Computing, Cryptology & Network Security, Software Project Management, and Business Intelligence.",
      "Explored deep electronics & communication: Mobile Computing, Wireless Communication, Digital Signal Processing, Distributed Systems, Microprocessors & Microcontrollers."
    ]
  },
  {
    id: "edu-3",
    degree: "Higher Secondary Education (Computer Science Focus)",
    institution: "Little Flower Convent Matric Higher Secondary School",
    period: "2004 – 2016",
    location: "Tiruppur, India",
    details: [
      "Acquired comprehensive foundations in Mathematics, Physics, Chemistry, and Computer Science.",
      "Studied programming foundations, algorithms, and logical representations early."
    ]
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: "cert-1",
    title: "AI Course Completion (Deep Learning Concepts)",
    issuer: "Deeplearning.AI / Coursera",
    date: "27/01/2025",
    description: [
      "Gained verified expertise in Artificial Intelligence foundations, neural network architectures, and conceptual prompt interfaces.",
      "Completed modules covering deep learning strategies, predictive models, and custom applications."
    ],
    credentialUrl: "https://coursera.org/share/49ad04a907fcb71a833ebeebfb9d4567"
  },
  {
    id: "cert-2",
    title: "Big Data Technologies (Hive, Querying, & ETL)",
    issuer: "IIT Kharagpur",
    date: "28/12/2018",
    description: [
      "Configured robust ETL (Extract, Transform, Load) pipelines for large scale multi-source dataset streams.",
      "Mastered Hive queries, schema representations, and database structures in data lakes and cloud warehouses."
    ]
  },
  {
    id: "cert-3",
    title: "Cloud Computing (IaaS, PaaS, SaaS, & IaC)",
    issuer: "Cloud Bull",
    date: "19/09/2017",
    description: [
      "Evaluated differences between core cloud models: Infrastructure, Platform, and Software as a Service.",
      "Engineered automated infrastructure using modern IaC tools including Terraform and AWS CloudFormation templates."
    ]
  },
  {
    id: "cert-4",
    title: "Yoga for Youth Empowerment (Mindfulness & Wellness)",
    issuer: "Dr. N.G.P Institute of Technology",
    date: "2017",
    description: [
      "Certified in holistic physical and mental mindfulness exercises.",
      "Practiced and mastered stress management under load, concentration techniques, and mental clarity through yoga."
    ]
  }
];

export const AWARDS: AwardItem[] = [
  {
    id: "award-1",
    title: "Tryst Event Presenter (IIT Delhi)",
    issuer: "Indian Institute of Technology Delhi",
    date: "20/01/2019",
    description: "Invited to present the smart IoT & Data Analytics project 'Trash Master' to academic and industrial panels at the annual national IIT Delhi Tryst conference."
  },
  {
    id: "award-2",
    title: "Eminent World Record Achievement",
    issuer: "Microsoft Research Community (Chennai) & Wikitechy",
    date: "02/10/2016",
    description: "Achieved an Eminent World Record for participation and success in the 'World's Biggest International Hands-on Ethical Hacking Workshop' hosted in Chennai."
  },
  {
    id: "award-3",
    title: "National Creativity Aptitude Test Participant",
    issuer: "NCAT",
    date: "2017",
    description: "Successfully participated in the national level creative aptitude evaluation under Category 1, scoring high logical aptitude ranks."
  },
  {
    id: "award-4",
    title: "District Level Basketball Championship Winner/Runner-up",
    issuer: "Zonal School Division",
    date: "2016",
    description: "Secured runner-up ranking at the District level and emerged winner at both Zonal and inter-school divisions."
  }
];
