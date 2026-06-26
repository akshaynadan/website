import React, { useState, useEffect, useRef } from 'react';
import { 
  Briefcase, 
  Sparkles, 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Send, 
  MessageSquare, 
  Download, 
  Clipboard, 
  RefreshCw, 
  UserCheck, 
  UserX, 
  UserPlus, 
  Eye, 
  LogOut, 
  Key, 
  Check, 
  AlertCircle, 
  Info, 
  ChevronDown, 
  ChevronRight, 
  ListFilter,
  Search,
  User,
  Trash2
} from 'lucide-react';

// Types
interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  skills: string[];
  yearsExperience: number;
  score: number; // 0 to 100
  category: 'Excellent Match' | 'Good Match' | 'Average Match' | 'Not Suitable';
  matchedSkills: string[];
  missingSkills: string[];
  bestMatchReasons: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

const DEFAULT_CANDIDATES: Candidate[] = [
  {
    id: 'cand-1',
    name: 'Aisha Mehta',
    email: 'aisha.mehta@example.com',
    phone: '+91 98765 43210',
    skills: ['Python', 'FastAPI', 'SQL', 'Docker', 'Git', 'Machine Learning'],
    yearsExperience: 4.5,
    score: 91.0,
    category: 'Excellent Match',
    matchedSkills: ['Python', 'FastAPI', 'Docker', 'SQL', 'Git', 'Machine Learning'],
    missingSkills: ['React'],
    bestMatchReasons: 'Strong Python, FastAPI, SQL, Docker, and ML project experience. Excellent background in backend API development.'
  },
  {
    id: 'cand-2',
    name: 'Rahul Nair',
    email: 'rahul.nair@example.com',
    phone: '+91 99887 77665',
    skills: ['Python', 'Django', 'SQL', 'Git', 'AWS'],
    yearsExperience: 3.0,
    score: 74.0,
    category: 'Good Match',
    matchedSkills: ['Python', 'SQL', 'Git'],
    missingSkills: ['FastAPI', 'Docker', 'React', 'Machine Learning'],
    bestMatchReasons: 'Good background in Python, Django, SQL, and AWS. Strong core programming principles.'
  },
  {
    id: 'cand-3',
    name: 'Sarah Thompson',
    email: 'sarah.t@example.com',
    phone: '+1 415 555 2671',
    skills: ['React', 'JavaScript', 'Git', 'REST API', 'SQL'],
    yearsExperience: 2.5,
    score: 58.0,
    category: 'Average Match',
    matchedSkills: ['SQL', 'Git', 'REST API'],
    missingSkills: ['Python', 'FastAPI', 'Docker', 'Machine Learning'],
    bestMatchReasons: 'Strong frontend React experience and API knowledge, but lacks Python and ML fundamentals specified in core requirements.'
  },
  {
    id: 'cand-4',
    name: 'John Carter',
    email: 'john.carter@example.com',
    phone: '+1 650 555 9822',
    skills: ['Excel', 'Recruiting', 'LinkedIn', 'Communication'],
    yearsExperience: 7.0,
    score: 31.0,
    category: 'Not Suitable',
    matchedSkills: [],
    missingSkills: ['Python', 'FastAPI', 'SQL', 'Docker', 'Git', 'Machine Learning'],
    bestMatchReasons: 'Extensive HR, sourcing, and recruiting experience, but lacks the necessary technical backend programming skills.'
  }
];

const DEFAULT_JOB_DESCRIPTION = `Python Backend Developer - AI Recruitment Tools

We are hiring a Python backend developer to help build AI-powered recruiting tools for HR teams.

The ideal candidate should have experience with:
- Python
- FastAPI
- SQL or SQLite
- Docker
- Git
- Machine Learning basics
- REST API development

Nice to have:
- Streamlit dashboards
- React frontend knowledge
- Experience building internal tools
- Cloud deployment experience`;

export default function TalentLensEmulator() {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('hr');
  const [password, setPassword] = useState<string>('talentlens123');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Core Application Data
  const [candidates, setCandidates] = useState<Candidate[]>(DEFAULT_CANDIDATES);
  const [jobDescription, setJobDescription] = useState<string>(DEFAULT_JOB_DESCRIPTION);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'chat' | 'export'>('dashboard');
  const [expandedCandidateId, setExpandedCandidateId] = useState<string | null>(null);

  // File Upload states (Simulated)
  const [resumeUploadStatus, setResumeUploadStatus] = useState<string | null>(null);
  const [isDraggingResume, setIsDraggingResume] = useState<boolean>(false);
  const [isDraggingJob, setIsDraggingJob] = useState<boolean>(false);

  // Add Candidate Modal/Form
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newCandName, setNewCandName] = useState<string>('');
  const [newCandEmail, setNewCandEmail] = useState<string>('');
  const [newCandPhone, setNewCandPhone] = useState<string>('');
  const [newCandSkills, setNewCandSkills] = useState<string>('');
  const [newCandExp, setNewCandExp] = useState<number>(2);

  // Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init-1',
      sender: 'assistant',
      text: 'Hello! I am your TalentLens AI Assistant. I have indexed the resumes and the current job description. Ask me anything about the candidate pool!',
      timestamp: '1:30 PM'
    }
  ]);
  const [userInput, setUserInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Toast Notification
  const [toast, setToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isTyping]);

  // Derived dashboard analytics
  const totalResumes = candidates.length;
  const totalShortlisted = candidates.filter(c => c.score >= 70).length;
  const totalRejected = candidates.filter(c => c.score < 50).length;

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().toLowerCase() === 'hr' && password === 'talentlens123') {
      setIsLoggedIn(true);
      setLoginError(null);
      triggerToast('Logged in as Human Resources!');
    } else {
      setLoginError('Invalid HR username or password. Please try again.');
      triggerToast('Authentication failed');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    triggerToast('Logged out of HR Session');
  };

  const handleClearAll = () => {
    setCandidates([]);
    triggerToast('Cleared all candidates from workspace');
  };

  const handleResetData = () => {
    setCandidates(DEFAULT_CANDIDATES);
    setJobDescription(DEFAULT_JOB_DESCRIPTION);
    setChatMessages([
      {
        id: 'msg-init-1',
        sender: 'assistant',
        text: 'Hello! I am your TalentLens AI Assistant. I have indexed the resumes and the current job description. Ask me anything about the candidate pool!',
        timestamp: '1:30 PM'
      }
    ]);
    triggerToast('All demo resume analytics restored!');
  };

  // Simulate parsing new candidate skills based on description matching
  const handleAddCandidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCandName.trim() || !newCandEmail.trim()) {
      triggerToast('Name and Email are required.');
      return;
    }

    const skillsArray = newCandSkills
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    // Dynamic scoring algorithm
    const coreRequirements = ['Python', 'FastAPI', 'SQL', 'Docker', 'Git', 'Machine Learning'];
    const matched = skillsArray.filter(skill => 
      coreRequirements.some(req => req.toLowerCase() === skill.toLowerCase())
    );
    const missing = coreRequirements.filter(req => 
      !skillsArray.some(skill => skill.toLowerCase() === req.toLowerCase())
    );

    // Calculation: Base score from matched skills (65%), experience (20%), other skills (15%)
    let computedScore = Math.min(100, Math.round(
      (matched.length / coreRequirements.length) * 65 + 
      Math.min(newCandExp, 8) * 4 + 
      Math.min(skillsArray.length * 3, 15)
    ));

    if (computedScore < 15) computedScore = 15; // floor

    let matchCategory: Candidate['category'] = 'Average Match';
    if (computedScore >= 85) matchCategory = 'Excellent Match';
    else if (computedScore >= 70) matchCategory = 'Good Match';
    else if (computedScore >= 50) matchCategory = 'Average Match';
    else matchCategory = 'Not Suitable';

    const newCandidate: Candidate = {
      id: `cand-${Date.now()}`,
      name: newCandName,
      email: newCandEmail,
      phone: newCandPhone || '+91 90000 12345',
      skills: skillsArray,
      yearsExperience: Number(newCandExp) || 0,
      score: computedScore,
      category: matchCategory,
      matchedSkills: matched,
      missingSkills: missing,
      bestMatchReasons: matched.length > 0 
        ? `Matches ${matched.join(', ')}. Has ${newCandExp} years of experience.` 
        : 'Sufficient communication skills, but lacks backend development specifications.'
    };

    setCandidates([newCandidate, ...candidates]);
    setNewCandName('');
    setNewCandEmail('');
    setNewCandPhone('');
    setNewCandSkills('');
    setNewCandExp(2);
    setShowAddForm(false);
    triggerToast(`Successfully parsed and indexed ${newCandidate.name}!`);
  };

  const handleDeleteCandidate = (id: string, name: string) => {
    setCandidates(candidates.filter(c => c.id !== id));
    triggerToast(`Removed candidate ${name}`);
  };

  // Chat reply engine
  const handleSendMessage = (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const query = customQuery || userInput;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    if (!customQuery) setUserInput('');
    setIsTyping(true);

    // AI Response Simulation
    setTimeout(() => {
      let responseText = "I couldn't find specific information on that. Try asking 'Show top candidates', 'Who has the most experience?', or 'Why was Aisha Mehta selected?'";
      const normQuery = query.toLowerCase();

      if (normQuery.includes('top candidates') || normQuery.includes('show candidates') || normQuery.includes('rank')) {
        responseText = candidates.length > 0 
          ? `Here is the current ranking based on matching criteria:\n\n` + 
            candidates.map((c, i) => `${i+1}. **${c.name}** - ${c.score}% (${c.category})\nSkills: ${c.skills.join(', ')}`).join('\n\n')
          : "There are currently no candidates in the workspace database.";
      } else if (normQuery.includes('most experience') || normQuery.includes('senior')) {
        if (candidates.length > 0) {
          const sortedByExp = [...candidates].sort((a, b) => b.yearsExperience - a.yearsExperience);
          const topExp = sortedByExp[0];
          responseText = `**${topExp.name}** has the most professional experience with **${topExp.yearsExperience} years** listed. Check their scorecard for skills distribution.`;
        } else {
          responseText = "No candidates found to analyze experience.";
        }
      } else if (normQuery.includes('python')) {
        const pythonDevs = candidates.filter(c => c.skills.some(s => s.toLowerCase().includes('python')));
        responseText = pythonDevs.length > 0
          ? `Candidates matching **Python** skills:\n\n` + 
            pythonDevs.map(c => `• **${c.name}** (${c.score}% Match)\n  Skills: ${c.skills.join(', ')}`).join('\n\n')
          : "No candidates currently in the dashboard match Python.";
      } else if (normQuery.includes('aisha') || normQuery.includes('mehta')) {
        const aisha = candidates.find(c => c.name.toLowerCase().includes('aisha'));
        if (aisha) {
          responseText = `**Aisha Mehta** is our highest ranking candidate with a **${aisha.score}% match score**.\n\n` +
            `**Key Strengths:**\n` +
            `• Core Matches: ${aisha.matchedSkills.join(', ')}\n` +
            `• Experience: ${aisha.yearsExperience} Years\n\n` +
            `**AI Recommendation:**\n${aisha.bestMatchReasons}`;
        } else {
          responseText = "Aisha Mehta has been removed from the current dataset. Click 'Reset demo data' to restore her.";
        }
      } else if (normQuery.includes('rahul') || normQuery.includes('nair')) {
        const rahul = candidates.find(c => c.name.toLowerCase().includes('rahul'));
        if (rahul) {
          responseText = `**Rahul Nair** is a strong contender with a **${rahul.score}% match score**.\n\n` +
            `**Key Strengths:**\n` +
            `• Core Matches: ${rahul.matchedSkills.join(', ')}\n` +
            `• Experience: ${rahul.yearsExperience} Years\n\n` +
            `**AI Recommendation:**\n${rahul.bestMatchReasons}`;
        }
      } else if (normQuery.includes('sarah') || normQuery.includes('thompson')) {
        const sarah = candidates.find(c => c.name.toLowerCase().includes('sarah'));
        if (sarah) {
          responseText = `**Sarah Thompson** has a **${sarah.score}% match score** (Average Match).\n\n` +
            `She shows excellent frontend expertise (React, JS) but lacks Python, FastAPI, Docker, and Machine Learning backend components specified in the core job requirements. She might be suitable for an interface or fullstack hybrid role.`;
        }
      } else if (normQuery.includes('john') || normQuery.includes('carter')) {
        const john = candidates.find(c => c.name.toLowerCase().includes('john'));
        if (john) {
          responseText = `**John Carter** has a **${john.score}% match score** (Not Suitable).\n\n` +
            `While John has a solid background with 7 years of HR/Recruiting experience, he does not possess the technical software engineering stack required for this developer role.`;
        }
      }

      const botMsg: ChatMessage = {
        id: `msg-${Date.now()}-bot`,
        sender: 'assistant',
        text: responseText,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  // Simulated drag-and-drop actions
  const handleDragOverResume = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingResume(true);
  };

  const handleDragLeaveResume = () => {
    setIsDraggingResume(false);
  };

  const handleDropResume = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingResume(false);
    setResumeUploadStatus('Processing 2 newly dropped resumes...');
    triggerToast('Resumes received. Analyzing content...');

    setTimeout(() => {
      // Add simulated parsed candidate
      const parsedCand: Candidate = {
        id: `cand-${Date.now()}`,
        name: 'Devin Harris',
        email: 'devin.harris@example.com',
        phone: '+91 91234 56789',
        skills: ['Python', 'FastAPI', 'Docker', 'SQLite', 'Git'],
        yearsExperience: 4.0,
        score: 86.0,
        category: 'Excellent Match',
        matchedSkills: ['Python', 'FastAPI', 'Docker', 'SQL', 'Git'],
        missingSkills: ['Machine Learning'],
        bestMatchReasons: 'Strong technical fit with Python, FastAPI, and Docker. Highly comparable with target developer requisites.'
      };

      setCandidates(prev => [parsedCand, ...prev]);
      setResumeUploadStatus(null);
      triggerToast('Devin Harris was successfully parsed & matched at 86%!');
    }, 2000);
  };

  const handleDragOverJob = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingJob(true);
  };

  const handleDragLeaveJob = () => {
    setIsDraggingJob(false);
  };

  const handleDropJob = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingJob(false);
    triggerToast('New job description file uploaded successfully!');
  };

  // Convert current candidate array into CSV format for copy
  const getCSVContent = () => {
    const headers = 'Name,Email,Phone,Skills,Years Experience,Score,Category,Matched Skills,Missing Skills\n';
    const rows = candidates.map(c => 
      `"${c.name}","${c.email}","${c.phone}","${c.skills.join(', ')}",${c.yearsExperience},${c.score},"${c.category}","${c.matchedSkills.join(', ')}","${c.missingSkills.join(', ')}"`
    ).join('\n');
    return headers + rows;
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(getCSVContent());
    triggerToast('CSV data copied to clipboard!');
  };

  const handleDownloadCSVFile = () => {
    const blob = new Blob([getCSVContent()], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'demo_candidates.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('CSV file downloaded!');
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch w-full">
      
      {/* Left Info Card */}
      <div className="xl:col-span-4 flex flex-col justify-center text-left space-y-6">
        <div>
          <span className="text-[10px] font-mono tracking-wider uppercase font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">
            Interactive Showcase
          </span>
          <h4 className="font-display text-2xl font-bold text-slate-900 mt-3 mb-2">
            TalentLens AI Emulator
          </h4>
          <p className="text-slate-650 text-sm leading-relaxed">
            Experience Akshay's <strong>TalentLens AI Recruitment Assistant</strong>. This emulator replicates the resume scoring engine, candidate shortlist pipeline, and interactive conversational chatbot that analyzes candidates against specific role requirements.
          </p>
        </div>

        <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-5 space-y-4">
          <h5 className="text-xs font-mono font-bold text-indigo-950 uppercase tracking-wider flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-indigo-700" />
            TalentLens Simulation Walkthrough
          </h5>
          <ul className="space-y-2.5 text-xs text-slate-700">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
              <span><strong>Secure Access:</strong> Sign in with the authentic credentials (<code>hr</code> / <code>talentlens123</code>) displayed in the helper block.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
              <span><strong>Interactive Drop:</strong> Try dragging files into the resume sandbox area to trigger an automatic AI resume parsing simulation!</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
              <span><strong>AI Conversational Agent:</strong> Head over to the Chat Assistant tab to run natural language queries or quick preset comparisons.</span>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            <span className="w-8 h-8 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center text-xs">🔍</span>
            <span className="w-8 h-8 rounded-full border-2 border-white bg-teal-100 flex items-center justify-center text-xs">💬</span>
            <span className="w-8 h-8 rounded-full border-2 border-white bg-amber-100 flex items-center justify-center text-xs">📊</span>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            Modeled precisely after verified screen layouts and production-grade specifications.
          </p>
        </div>
      </div>

      {/* Right Browser Emulator Frame */}
      <div className="xl:col-span-8 flex justify-center items-center">
        <div className="relative w-full max-w-4xl h-[640px] rounded-2xl border border-slate-200 bg-slate-50 shadow-2xl overflow-hidden flex flex-col">
          
          {/* macOS Browser Header bar */}
          <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex items-center gap-3 select-none shrink-0">
            {/* Dots */}
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-green-400 hover:bg-green-500 transition-colors" />
            </div>
            
            {/* Tab */}
            <div className="flex gap-1 ml-4 text-[11px] font-medium text-slate-600">
              <div className="px-3 py-1 bg-white border border-slate-200 border-b-transparent rounded-t-lg flex items-center gap-1.5 shadow-sm">
                <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                TalentLens AI Recruiter
              </div>
            </div>

            {/* Address Bar */}
            <div className="flex-1 max-w-md mx-auto bg-white border border-slate-200 rounded-md px-3 py-1 text-center text-[10px] text-slate-500 font-mono flex items-center justify-between shadow-inner">
              <span className="opacity-40">🔒</span>
              <span className="select-all">talentlens-ai.workspace/hr-dashboard</span>
              <RefreshCw onClick={handleResetData} className="w-3 h-3 opacity-40 hover:opacity-100 cursor-pointer transition-opacity" title="Reset Demo Data" />
            </div>
          </div>

          {/* MAIN SIMULATOR CONTAINER */}
          <div className="flex-1 flex overflow-hidden relative bg-white text-slate-900">
            
            {/* Toast Notifications */}
            {toast && (
              <div className="absolute top-4 right-4 bg-slate-900 text-white text-xs py-2.5 px-4 rounded-xl shadow-xl flex items-center gap-2.5 z-50 animate-fade-in border border-slate-800 font-mono">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{toast}</span>
              </div>
            )}

            {/* HR LOGIN SCREEN */}
            {!isLoggedIn ? (
              <div className="flex-1 flex flex-col md:flex-row overflow-y-auto">
                
                {/* Left side info column */}
                <div className="w-full md:w-5/12 bg-slate-900 p-8 text-left flex flex-col justify-between relative overflow-hidden text-white">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.18),rgba(255,255,255,0))]" />
                  
                  {/* Brand Block */}
                  <div className="flex items-center gap-2.5 z-10">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                      T
                    </div>
                    <span className="font-display font-bold text-lg tracking-wide">TalentLens AI</span>
                  </div>

                  <div className="my-8 md:my-0 z-10 space-y-4">
                    <h2 className="text-3xl font-bold font-display tracking-tight leading-tight">
                      Intelligent Hiring Workspace
                    </h2>
                    <p className="text-slate-400 text-xs leading-relaxed font-normal">
                      A semantic screening system powered by parsing pipelines, customized matching scoreboards, and recruitment chat assistance.
                    </p>
                  </div>

                  <div className="text-[10px] text-slate-500 font-mono z-10">
                    © 2026 TalentLens • Secure HR Ingress
                  </div>
                </div>

                {/* Right side form column */}
                <div className="flex-1 p-8 md:p-12 flex flex-col justify-center text-left bg-white overflow-y-auto">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    System Authentication
                  </span>
                  <h3 className="font-display text-2xl font-bold text-slate-900 mb-2">
                    HR Login
                  </h3>
                  <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                    Review resumes, score matches, and shortlist candidates faster. Log in below to enter the secure recruitment suite.
                  </p>

                  {/* Helper Alert Banner matching screenshot */}
                  <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-6 flex items-start gap-3 text-left">
                    <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-indigo-950 font-mono leading-none mb-1">Default HR credentials:</p>
                      <p className="text-xs text-indigo-700 font-mono leading-none">
                        username: <strong className="font-bold">hr</strong>, password: <strong className="font-bold">talentlens123</strong>
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-4">
                    {loginError && (
                      <div className="p-3 bg-red-50 border border-red-100 text-red-700 text-xs rounded-lg font-medium flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                        <span>{loginError}</span>
                      </div>
                    )}

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-700 block">Username</label>
                      <input 
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="e.g. hr"
                        className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-700 block">Password</label>
                      <div className="relative">
                        <input 
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="talentlens123"
                          className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2 pr-10 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-2 text-slate-400 hover:text-slate-600 focus:outline-none"
                        >
                          <span className="text-[10px] font-bold font-mono">
                            {showPassword ? 'Hide' : 'Show'}
                          </span>
                        </button>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-lg shadow-indigo-900/10 transition-colors cursor-pointer text-center"
                      >
                        Login
                      </button>
                    </div>

                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() => {
                          setIsLoggedIn(true);
                          triggerToast('Bypassed with Admin Credentials!');
                        }}
                        className="text-[10px] text-indigo-600 hover:underline"
                      >
                        Bypass Secure Authentication (Simulated Access)
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              /* LOGGED IN MAIN RECRUITER AREA */
              <div className="flex-1 flex overflow-hidden">
                
                {/* Left Sidebar */}
                <div className="w-48 bg-[#0F1E36] text-white flex flex-col justify-between text-left p-4 select-none shrink-0 border-r border-slate-800">
                  <div className="space-y-6">
                    {/* Brand header */}
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md bg-indigo-600 flex items-center justify-center text-white text-[11px] font-bold">
                        T
                      </div>
                      <span className="font-display font-bold text-sm tracking-wide">TalentLens AI</span>
                    </div>

                    <div className="space-y-1 bg-slate-800/40 p-2 rounded-lg">
                      <p className="text-[10px] text-slate-400 font-mono leading-none mb-0.5">Logged in as</p>
                      <p className="text-[11px] font-bold text-emerald-400 leading-none">HR Recruiter</p>
                    </div>

                    {/* Navigation tab menu */}
                    <nav className="space-y-1">
                      <button
                        onClick={() => setActiveTab('dashboard')}
                        className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${activeTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                      >
                        <Briefcase className="w-3.5 h-3.5" />
                        Analyze Resumes
                      </button>

                      <button
                        onClick={() => setActiveTab('chat')}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${activeTab === 'chat' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                      >
                        <span className="flex items-center gap-2.5">
                          <MessageSquare className="w-3.5 h-3.5" />
                          Chat Assistant
                        </span>
                        <span className="text-[9px] font-mono bg-emerald-500 text-slate-900 px-1 py-0.2 rounded-md font-bold">
                          AI
                        </span>
                      </button>

                      <button
                        onClick={() => setActiveTab('export')}
                        className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${activeTab === 'export' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                      >
                        <Download className="w-3.5 h-3.5" />
                        Export Results
                      </button>
                    </nav>
                  </div>

                  {/* Actions footer block inside Sidebar matching screenshot */}
                  <div className="space-y-2 border-t border-slate-800 pt-3">
                    <button
                      onClick={handleClearAll}
                      className="w-full py-1.5 bg-slate-800/80 hover:bg-red-900/40 text-red-200 border border-red-900/30 text-[10px] rounded transition-all cursor-pointer font-mono font-medium"
                    >
                      Clear All Candidates
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-1.5 py-1.5 bg-slate-900 hover:bg-slate-950 text-slate-400 hover:text-white text-[10px] rounded transition-all cursor-pointer font-medium"
                    >
                      <LogOut className="w-3 h-3" />
                      Logout
                    </button>
                  </div>
                </div>

                {/* Main Workspace Frame */}
                <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
                  
                  {/* Top Bar matching exact metrics structure */}
                  <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between select-none shrink-0">
                    <div className="text-left">
                      <h4 className="text-sm font-bold text-slate-800">
                        {activeTab === 'dashboard' && 'Workspace Dashboard'}
                        {activeTab === 'chat' && 'Recruiter AI Assistant'}
                        {activeTab === 'export' && 'Shortlist & Exports'}
                      </h4>
                      <p className="text-[10px] text-slate-400">
                        Upload resumes, match them to a role, and review the strongest candidates.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleResetData}
                        className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md text-[10px] font-mono font-semibold text-slate-600 border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                        title="Restore 4 Default Resumes"
                      >
                        <RefreshCw className="w-3 h-3" />
                        Reset demo data
                      </button>
                    </div>
                  </div>

                  {/* Top Analytics Card Widget Strip (Shown on all pages for consistency) */}
                  <div className="bg-white border-b border-slate-200 px-6 py-3.5 grid grid-cols-3 gap-4 shrink-0 select-none text-left">
                    <div className="bg-indigo-50/40 border border-indigo-100 p-3 rounded-xl">
                      <span className="text-[9px] font-mono text-indigo-500 uppercase tracking-wider block font-bold leading-none mb-1">Resumes Uploaded</span>
                      <span className="text-xl font-black text-indigo-900 leading-none">{totalResumes}</span>
                    </div>
                    <div className="bg-emerald-50/40 border border-emerald-100 p-3 rounded-xl">
                      <span className="text-[9px] font-mono text-emerald-500 uppercase tracking-wider block font-bold leading-none mb-1">Shortlisted</span>
                      <span className="text-xl font-black text-emerald-900 leading-none">{totalShortlisted}</span>
                    </div>
                    <div className="bg-rose-50/40 border border-rose-100 p-3 rounded-xl">
                      <span className="text-[9px] font-mono text-rose-500 uppercase tracking-wider block font-bold leading-none mb-1">Rejected</span>
                      <span className="text-xl font-black text-rose-900 leading-none">{totalRejected}</span>
                    </div>
                  </div>

                  {/* ACTIVE TAB VIEW CONTENT */}
                  <div className="flex-1 p-6 overflow-y-auto text-left space-y-6">
                    
                    {/* TAB: DASHBOARD & ANALYSIS */}
                    {activeTab === 'dashboard' && (
                      <div className="space-y-6">
                        
                        {/* Drag and drop boxes matching the screenshot layout */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          
                          {/* Resume Drop Box */}
                          <div className="space-y-2">
                            <label className="text-[11px] font-bold text-slate-700 block">Upload resumes</label>
                            <div
                              onDragOver={handleDragOverResume}
                              onDragLeave={handleDragLeaveResume}
                              onDrop={handleDropResume}
                              className={`border-2 border-dashed rounded-xl p-5 text-center flex flex-col items-center justify-center min-h-[140px] transition-all relative ${
                                isDraggingResume ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-300 bg-white hover:border-indigo-400'
                              }`}
                            >
                              {resumeUploadStatus ? (
                                <div className="space-y-2">
                                  <RefreshCw className="w-6 h-6 text-indigo-600 animate-spin mx-auto" />
                                  <p className="text-xs font-semibold text-slate-700 font-mono">{resumeUploadStatus}</p>
                                </div>
                              ) : (
                                <div className="space-y-3">
                                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-600">
                                    <Upload className="w-5 h-5 text-indigo-500" />
                                  </div>
                                  <div>
                                    <p className="text-xs font-bold text-slate-700">Drag and drop resumes here</p>
                                    <p className="text-[9px] text-slate-400 font-mono mt-0.5">Limit 200MB per file • PDF, DOCX</p>
                                  </div>
                                  <label className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[10px] font-bold cursor-pointer transition-colors inline-block">
                                    Browse files
                                    <input 
                                      type="file" 
                                      multiple 
                                      className="hidden" 
                                      onChange={() => {
                                        setResumeUploadStatus('Processing selected file...');
                                        setTimeout(() => {
                                          const parsed: Candidate = {
                                            id: `cand-${Date.now()}`,
                                            name: 'Liam Vance',
                                            email: 'liam.vance@example.com',
                                            phone: '+1 408 555 1290',
                                            skills: ['Python', 'SQL', 'FastAPI', 'Docker'],
                                            yearsExperience: 3.5,
                                            score: 80.0,
                                            category: 'Good Match',
                                            matchedSkills: ['Python', 'SQL', 'FastAPI', 'Docker'],
                                            missingSkills: ['Machine Learning', 'Git'],
                                            bestMatchReasons: 'Good coverage of requirements. Decent experience in modern backend deployment workflows.'
                                          };
                                          setCandidates(prev => [parsed, ...prev]);
                                          setResumeUploadStatus(null);
                                          triggerToast('Liam Vance was successfully parsed & matched at 80%!');
                                        }, 1500);
                                      }}
                                    />
                                  </label>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Job Description editor box */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <label className="text-[11px] font-bold text-slate-700 block">Job description</label>
                              <button 
                                onClick={() => {
                                  setJobDescription(DEFAULT_JOB_DESCRIPTION);
                                  triggerToast('Reset to default developer role!');
                                }}
                                className="text-[9px] font-mono text-indigo-600 hover:underline"
                              >
                                Reset to Default
                              </button>
                            </div>
                            <div
                              onDragOver={handleDragOverJob}
                              onDragLeave={handleDragLeaveJob}
                              onDrop={handleDropJob}
                              className={`border-2 border-dashed rounded-xl overflow-hidden transition-all text-left ${
                                isDraggingJob ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-300'
                              }`}
                            >
                              <textarea
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                rows={6}
                                className="w-full bg-white text-slate-800 p-3 text-xs font-mono border-none focus:ring-0 outline-none resize-none leading-relaxed"
                                placeholder="Paste or drag role definition details here..."
                              />
                            </div>
                          </div>

                        </div>

                        {/* Candidates Table List Toolbar */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-left">
                          
                          <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                            <h5 className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                              <ListFilter className="w-4 h-4 text-indigo-600" />
                              Ranked Candidate Matches
                            </h5>
                            
                            <button
                              onClick={() => setShowAddForm(true)}
                              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                            >
                              <UserPlus className="w-3.5 h-3.5" />
                              Add Candidate manually
                            </button>
                          </div>

                          {/* Candidate quick form */}
                          {showAddForm && (
                            <form onSubmit={handleAddCandidate} className="p-5 border-b border-indigo-100 bg-indigo-50/20 grid grid-cols-2 gap-4 animate-fade-in text-left">
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-600">Full Name</label>
                                <input 
                                  type="text" 
                                  required
                                  value={newCandName}
                                  onChange={(e) => setNewCandName(e.target.value)}
                                  placeholder="e.g. Aisha Mehta"
                                  className="w-full bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-600">Email address</label>
                                <input 
                                  type="email" 
                                  required
                                  value={newCandEmail}
                                  onChange={(e) => setNewCandEmail(e.target.value)}
                                  placeholder="aisha@example.com"
                                  className="w-full bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-600 font-sans">Skills (Comma-separated)</label>
                                <input 
                                  type="text" 
                                  value={newCandSkills}
                                  onChange={(e) => setNewCandSkills(e.target.value)}
                                  placeholder="Python, FastAPI, Docker, SQL, Git"
                                  className="w-full bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
                                />
                              </div>
                              <div className="space-y-1 grid grid-cols-2 gap-2">
                                <div>
                                  <label className="text-[10px] font-bold text-slate-600">Experience (Years)</label>
                                  <input 
                                    type="number" 
                                    value={newCandExp}
                                    onChange={(e) => setNewCandExp(parseFloat(e.target.value) || 0)}
                                    placeholder="e.g. 4.5"
                                    step="0.5"
                                    className="w-full bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
                                  />
                                </div>
                                <div className="flex items-end justify-end gap-2">
                                  <button
                                    type="button"
                                    onClick={() => setShowAddForm(false)}
                                    className="px-3 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg text-[10px] font-bold text-slate-700 cursor-pointer"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[10px] font-bold cursor-pointer"
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
                            </form>
                          )}

                          {/* Candidates Listings Table */}
                          <div className="overflow-x-auto">
                            {candidates.length === 0 ? (
                              <div className="p-8 text-center text-slate-400 text-xs">
                                No candidate resumes analyzed yet. Drag a resume file in or click "Reset demo data".
                              </div>
                            ) : (
                              <table className="w-full text-left border-collapse">
                                <thead>
                                  <tr className="bg-slate-100 text-[10px] font-mono text-slate-500 uppercase font-bold border-b border-slate-200 select-none">
                                    <th className="py-2.5 px-4 text-center">Rank</th>
                                    <th className="py-2.5 px-4">Candidate</th>
                                    <th className="py-2.5 px-4 text-center">Match Score</th>
                                    <th className="py-2.5 px-4">Category</th>
                                    <th className="py-2.5 px-4 text-right">Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {candidates
                                    .sort((a, b) => b.score - a.score)
                                    .map((c, index) => {
                                      const isExpanded = expandedCandidateId === c.id;
                                      return (
                                        <React.Fragment key={c.id}>
                                          <tr className="border-b border-slate-100 hover:bg-indigo-50/35 transition-colors">
                                            <td className="py-3 px-4 text-center font-mono font-bold text-slate-400">
                                              {index + 1}
                                            </td>
                                            <td className="py-3 px-4">
                                              <div>
                                                <span className="text-xs font-bold text-slate-800 block">{c.name}</span>
                                                <span className="text-[10px] text-slate-400 block font-mono">{c.yearsExperience} Years • {c.email}</span>
                                              </div>
                                            </td>
                                            <td className="py-3 px-4 text-center">
                                              <span className={`text-xs font-black font-mono px-2 py-0.5 rounded-md ${
                                                c.score >= 85 ? 'text-emerald-700 bg-emerald-50' :
                                                c.score >= 70 ? 'text-indigo-700 bg-indigo-50' :
                                                c.score >= 50 ? 'text-amber-700 bg-amber-50' : 'text-slate-500 bg-slate-100'
                                              }`}>
                                                {c.score.toFixed(1)}%
                                              </span>
                                            </td>
                                            <td className="py-3 px-4">
                                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block ${
                                                c.category === 'Excellent Match' ? 'text-emerald-700 bg-emerald-100' :
                                                c.category === 'Good Match' ? 'text-indigo-700 bg-indigo-100' :
                                                c.category === 'Average Match' ? 'text-amber-700 bg-amber-100' : 'text-slate-500 bg-slate-100'
                                              }`}>
                                                {c.category}
                                              </span>
                                            </td>
                                            <td className="py-3 px-4 text-right">
                                              <div className="flex items-center justify-end gap-1.5">
                                                <button
                                                  onClick={() => setExpandedCandidateId(isExpanded ? null : c.id)}
                                                  className="p-1 text-slate-400 hover:text-indigo-600 rounded hover:bg-slate-100"
                                                  title="View Scorecard details"
                                                >
                                                  <Eye className="w-4 h-4" />
                                                </button>
                                                <button
                                                  onClick={() => handleDeleteCandidate(c.id, c.name)}
                                                  className="p-1 text-slate-400 hover:text-red-600 rounded hover:bg-slate-100"
                                                  title="Delete Candidate"
                                                >
                                                  <Trash2 className="w-4 h-4" />
                                                </button>
                                              </div>
                                            </td>
                                          </tr>

                                          {/* Expandable details card drawer */}
                                          {isExpanded && (
                                            <tr className="bg-indigo-50/15">
                                              <td colSpan={5} className="py-4 px-6 border-b border-indigo-100">
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                                                  
                                                  <div className="space-y-2">
                                                    <h6 className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Matched Requisites</h6>
                                                    <div className="flex flex-wrap gap-1.5">
                                                      {c.matchedSkills.length === 0 ? (
                                                        <span className="text-[10px] text-slate-400 italic">None matched</span>
                                                      ) : (
                                                        c.matchedSkills.map(s => (
                                                          <span key={s} className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded text-[10px] font-semibold font-mono flex items-center gap-1">
                                                            <Check className="w-3 h-3" /> {s}
                                                          </span>
                                                        ))
                                                      )}
                                                    </div>
                                                  </div>

                                                  <div className="space-y-2">
                                                    <h6 className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Missing Requisites</h6>
                                                    <div className="flex flex-wrap gap-1.5">
                                                      {c.missingSkills.length === 0 ? (
                                                        <span className="text-[10px] text-emerald-600 italic">Fully matching</span>
                                                      ) : (
                                                        c.missingSkills.map(s => (
                                                          <span key={s} className="px-2 py-0.5 bg-rose-50 text-rose-600 border border-rose-100 rounded text-[10px] font-semibold font-mono flex items-center gap-1">
                                                            <XCircle className="w-3 h-3 text-rose-400" /> {s}
                                                          </span>
                                                        ))
                                                      )}
                                                    </div>
                                                  </div>

                                                  <div className="space-y-2">
                                                    <h6 className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1">
                                                      <Sparkles className="w-3 h-3 text-indigo-600" />
                                                      AI Match Reasons
                                                    </h6>
                                                    <p className="text-xs text-slate-600 leading-relaxed italic">
                                                      "{c.bestMatchReasons}"
                                                    </p>
                                                  </div>

                                                </div>
                                              </td>
                                            </tr>
                                          )}
                                        </React.Fragment>
                                      );
                                    })}
                                </tbody>
                              </table>
                            )}
                          </div>

                        </div>
                      </div>
                    )}

                    {/* TAB: INTERACTIVE CHAT ASSISTANT */}
                    {activeTab === 'chat' && (
                      <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[380px] overflow-hidden text-left font-sans">
                        
                        {/* Header bar */}
                        <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between select-none shrink-0">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs font-bold text-slate-700">TalentLens Recruitment Engine (GPT-4 Proxy)</span>
                          </div>
                          <span className="text-[9px] font-mono text-slate-400">Context: {candidates.length} Resumes parsed</span>
                        </div>

                        {/* Suggestions shortcut grid */}
                        <div className="bg-indigo-50/30 px-4 py-2.5 border-b border-slate-100 flex flex-wrap gap-2 select-none shrink-0 text-left">
                          <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider font-bold pt-1.5">Quick Questions:</span>
                          {[
                            'Show the top candidates.',
                            'Who has the most experience?',
                            'Show candidates with Python.',
                            'Why was Aisha Mehta selected?'
                          ].map(prompt => (
                            <button
                              key={prompt}
                              onClick={(e) => handleSendMessage(e, prompt)}
                              className="px-2.5 py-1 bg-white border border-indigo-100 text-indigo-700 hover:bg-indigo-50 rounded-lg text-[10px] font-medium transition-all cursor-pointer font-sans"
                            >
                              {prompt}
                            </button>
                          ))}
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/30">
                          {chatMessages.map(msg => (
                            <div
                              key={msg.id}
                              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed text-left ${
                                msg.sender === 'user' 
                                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                                  : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
                              }`}>
                                <p className="whitespace-pre-wrap">{msg.text}</p>
                                <span className={`text-[8px] block mt-1 text-right ${
                                  msg.sender === 'user' ? 'text-indigo-200' : 'text-slate-400'
                                }`}>
                                  {msg.timestamp}
                                </span>
                              </div>
                            </div>
                          ))}

                          {isTyping && (
                            <div className="flex justify-start">
                              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-3 shadow-sm flex items-center gap-1.5 shrink-0">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                              </div>
                            </div>
                          )}
                          <div ref={chatEndRef} />
                        </div>

                        {/* Input Footer Form */}
                        <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-100 flex items-center gap-2 shrink-0">
                          <input 
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Ask about candidate skills, experience details, or matching reasons..."
                            className="flex-1 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
                          />
                          <button
                            type="submit"
                            className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors cursor-pointer"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </form>

                      </div>
                    )}

                    {/* TAB: EXPORT DATA RESULTS */}
                    {activeTab === 'export' && (
                      <div className="space-y-6 text-left">
                        
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
                          <div className="flex items-center justify-between">
                            <h5 className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                              <Clipboard className="w-4 h-4 text-indigo-600" />
                              Export Datasets (demo_candidates.csv)
                            </h5>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={handleCopyToClipboard}
                                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded border border-slate-200 text-[10px] font-semibold flex items-center gap-1 cursor-pointer"
                              >
                                <Clipboard className="w-3.5 h-3.5" />
                                Copy to Clipboard
                              </button>
                              <button
                                onClick={handleDownloadCSVFile}
                                className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[10px] font-semibold flex items-center gap-1 cursor-pointer"
                              >
                                <Download className="w-3.5 h-3.5" />
                                Download CSV
                              </button>
                            </div>
                          </div>

                          <p className="text-xs text-slate-500 leading-relaxed font-normal">
                            This structured csv payload can be fed straight into spreadsheets or custom recruiting engines. Contains individual match scores and parsing metrics generated during evaluation.
                          </p>

                          {/* Preview container */}
                          <div className="bg-slate-900 rounded-lg p-4 font-mono text-[9px] text-emerald-400 overflow-x-auto whitespace-pre h-44 border border-slate-800 leading-relaxed">
                            {getCSVContent()}
                          </div>
                        </div>

                        {/* Recommendation list */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
                          <h5 className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                            Final AI Recommendation
                          </h5>
                          
                          <div className="space-y-3.5 text-xs text-slate-700 font-normal leading-relaxed">
                            <p>
                              Based on the indexed database, we suggest shortlisting <strong className="text-indigo-600 font-bold">{candidates.filter(c => c.score >= 70).map(c => c.name).join(' and ')}</strong>.
                            </p>
                            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                              <p className="font-semibold text-slate-800">Shortlist summary & reasoning:</p>
                              <ul className="list-disc pl-4 space-y-1 text-slate-600">
                                {candidates.filter(c => c.score >= 70).map(c => (
                                  <li key={c.id}>
                                    <strong>{c.name} ({c.score.toFixed(1)}%)</strong>: {c.bestMatchReasons}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                      </div>
                    )}

                  </div>

                </div>

              </div>
            )}

          </div>

        </div>
      </div>

    </div>
  );
}
