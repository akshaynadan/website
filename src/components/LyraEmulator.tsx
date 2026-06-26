import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Sparkles, 
  Users, 
  Trophy, 
  User, 
  ShieldAlert, 
  Plus, 
  ThumbsUp, 
  Flag, 
  LogOut, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle, 
  Camera, 
  Palette, 
  PenTool, 
  Film, 
  Music as MusicIcon, 
  Code as CodeIcon,
  Search,
  Calendar,
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';

// Types
interface Post {
  id: string;
  title: string;
  type: string;
  description: string;
  community: string;
  mediaUrl?: string;
  author: string;
  role: string;
  likes: number;
  hasLiked?: boolean;
  isReported?: boolean;
  date: string;
}

interface Community {
  id: string;
  name: string;
  tag: string;
  description: string;
  members: number;
  joined: boolean;
  category: string;
}

interface Competition {
  id: string;
  title: string;
  community: string;
  reward: string;
  deadline: string;
  organizer: string;
  submissions: number;
  joined: boolean;
  progress: number; // percentage
}

export default function LyraEmulator() {
  // Authentication & Session States
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [role, setRole] = useState<'user' | 'organization'>('user');
  
  // Login Form Input States
  const [fullName, setFullName] = useState<string>('Akshay Kumar');
  const [email, setEmail] = useState<string>('akshay@example.com');
  const [mobile, setMobile] = useState<string>('9876543210');
  const [orgName, setOrgName] = useState<string>('PixelForge Labs');
  const [orgEmail, setOrgEmail] = useState<string>('team@pixelforge.example');
  const [orgProof, setOrgProof] = useState<string>('U74899TN2026PTC001234');
  
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [otpCode, setOtpCode] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'feed' | 'communities' | 'competitions' | 'profile' | 'security'>('feed');

  // Application Data States (Dynamic)
  const [communities, setCommunities] = useState<Community[]>([
    { id: 'photography', name: 'Photography', tag: 'Visual Arts', description: 'Portraits, product shoots, street stories, and editing critiques.', members: 1840, joined: true, category: 'Photography' },
    { id: 'design', name: 'Design', tag: 'Creative Tech', description: 'Interface shots, brand systems, motion ideas, and hiring challenges.', members: 1320, joined: true, category: 'Design' },
    { id: 'writing', name: 'Writing', tag: 'Storytelling', description: 'Short essays, campaign scripts, copywriting, and poetry prompts.', members: 880, joined: false, category: 'Writing' },
    { id: 'film', name: 'Film', tag: 'Production', description: 'Short films, reels, scene breakdowns, and review circles.', members: 970, joined: false, category: 'Film' },
    { id: 'music', name: 'Music', tag: 'Audio', description: 'Original tracks, scores, remix contests, and studio feedback.', members: 740, joined: false, category: 'Music' },
    { id: 'code', name: 'Code', tag: 'Engineering', description: 'Apps, experiments, open problems, and product prototypes.', members: 1180, joined: false, category: 'Code' }
  ]);

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 'post-1',
      title: 'Hiring board redesign concept',
      type: 'Image',
      description: 'A comprehensive modern redesign focusing on fluid animations and responsive mobile states. Designed in Figma using a clean design system.',
      community: 'Design',
      mediaUrl: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=800&q=80',
      author: 'Arjun S.',
      role: 'Design Lead',
      likes: 96,
      date: 'Jun 26, 2026 11:20 am'
    }
  ]);

  const [competitions, setCompetitions] = useState<Competition[]>([
    {
      id: 'comp-1',
      title: 'Urban texture challenge',
      community: 'Photography',
      reward: 'Rs. 15,000 and internship shortlist',
      deadline: '2026-07-18',
      organizer: 'Northstar Studios',
      submissions: 64,
      joined: false,
      progress: 45
    },
    {
      id: 'comp-2',
      title: 'Portfolio case study sprint',
      community: 'Design',
      reward: 'Hiring interview and mentor review',
      deadline: '2026-07-04',
      organizer: 'PixelForge Labs',
      submissions: 42,
      joined: false,
      progress: 72
    },
    {
      id: 'comp-3',
      title: 'Community safety feature build',
      community: 'Code',
      reward: 'Rs. 25,000 and contract project',
      deadline: '2026-07-28',
      organizer: 'CivicStack',
      submissions: 27,
      joined: false,
      progress: 15
    }
  ]);

  // Feed Filter State
  const [feedCategory, setFeedCategory] = useState<string>('All');

  // Create Post Form States
  const [newPostTitle, setNewPostTitle] = useState<string>('');
  const [newPostType, setNewPostType] = useState<string>('Image');
  const [newPostDesc, setNewPostDesc] = useState<string>('');
  const [newPostCommunity, setNewPostCommunity] = useState<string>('Design');
  const [newPostMedia, setNewPostMedia] = useState<string>('');

  // Create Competition Form States
  const [newCompTitle, setNewCompTitle] = useState<string>('');
  const [newCompCommunity, setNewCompCommunity] = useState<string>('Design');
  const [newCompReward, setNewCompReward] = useState<string>('');
  const [newCompDeadline, setNewCompDeadline] = useState<string>('');

  // Toast Notification State
  const [toast, setToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  // Derived Values
  const joinedCommunitiesCount = communities.filter(c => c.joined).length;

  const handleSendOtp = () => {
    if (role === 'user') {
      if (!fullName.trim() || !email.trim() || !mobile.trim()) {
        triggerToast('Please fill out all contact fields');
        return;
      }
    } else {
      if (!orgName.trim() || !orgEmail.trim() || !orgProof.trim()) {
        triggerToast('Please fill out all organization fields');
        return;
      }
    }
    setOtpSent(true);
    setOtpCode('123456'); // Simulated code
    triggerToast('OTP code "123456" simulated! Please enter it below.');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpSent) {
      handleSendOtp();
      return;
    }
    if (otpCode !== '123456') {
      triggerToast('Incorrect OTP. Try "123456"');
      return;
    }
    setIsLoggedIn(true);
    triggerToast(`Logged in successfully as ${role === 'user' ? fullName : orgName}!`);
  };

  const handleResetData = () => {
    setCommunities([
      { id: 'photography', name: 'Photography', tag: 'Visual Arts', description: 'Portraits, product shoots, street stories, and editing critiques.', members: 1840, joined: true, category: 'Photography' },
      { id: 'design', name: 'Design', tag: 'Creative Tech', description: 'Interface shots, brand systems, motion ideas, and hiring challenges.', members: 1320, joined: true, category: 'Design' },
      { id: 'writing', name: 'Writing', tag: 'Storytelling', description: 'Short essays, campaign scripts, copywriting, and poetry prompts.', members: 880, joined: false, category: 'Writing' },
      { id: 'film', name: 'Film', tag: 'Production', description: 'Short films, reels, scene breakdowns, and review circles.', members: 970, joined: false, category: 'Film' },
      { id: 'music', name: 'Music', tag: 'Audio', description: 'Original tracks, scores, remix contests, and studio feedback.', members: 740, joined: false, category: 'Music' },
      { id: 'code', name: 'Code', tag: 'Engineering', description: 'Apps, experiments, open problems, and product prototypes.', members: 1180, joined: false, category: 'Code' }
    ]);
    setPosts([
      {
        id: 'post-1',
        title: 'Hiring board redesign concept',
        type: 'Image',
        description: 'A comprehensive modern redesign focusing on fluid animations and responsive mobile states. Designed in Figma using a clean design system.',
        community: 'Design',
        mediaUrl: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=800&q=80',
        author: 'Arjun S.',
        role: 'Design Lead',
        likes: 96,
        date: 'Jun 26, 2026 11:20 am'
      }
    ]);
    setCompetitions([
      {
        id: 'comp-1',
        title: 'Urban texture challenge',
        community: 'Photography',
        reward: 'Rs. 15,000 and internship shortlist',
        deadline: '2026-07-18',
        organizer: 'Northstar Studios',
        submissions: 64,
        joined: false,
        progress: 45
      },
      {
        id: 'comp-2',
        title: 'Portfolio case study sprint',
        community: 'Design',
        reward: 'Hiring interview and mentor review',
        deadline: '2026-07-04',
        organizer: 'PixelForge Labs',
        submissions: 42,
        joined: false,
        progress: 72
      },
      {
        id: 'comp-3',
        title: 'Community safety feature build',
        community: 'Code',
        reward: 'Rs. 25,000 and contract project',
        deadline: '2026-07-28',
        organizer: 'CivicStack',
        submissions: 27,
        joined: false,
        progress: 15
      }
    ]);
    triggerToast('All demo data has been reset!');
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostDesc.trim()) {
      triggerToast('Please provide a title and description');
      return;
    }

    const targetComm = communities.find(c => c.name === newPostCommunity);
    if (targetComm && !targetComm.joined) {
      triggerToast(`Please join the ${newPostCommunity} community first!`);
      return;
    }

    const newPost: Post = {
      id: `post-${Date.now()}`,
      title: newPostTitle,
      type: newPostType,
      description: newPostDesc,
      community: newPostCommunity,
      mediaUrl: newPostMedia.trim() || undefined,
      author: role === 'user' ? fullName : orgName,
      role: role === 'user' ? 'Creator account' : 'Verified organization',
      likes: 0,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }) + ' ' + new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).toLowerCase()
    };

    setPosts([newPost, ...posts]);
    setNewPostTitle('');
    setNewPostDesc('');
    setNewPostMedia('');
    triggerToast('Post published to Community Feed!');
  };

  const handleCreateCompetition = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompTitle.trim() || !newCompReward.trim() || !newCompDeadline.trim()) {
      triggerToast('Please fill out all competition fields');
      return;
    }

    const newComp: Competition = {
      id: `comp-${Date.now()}`,
      title: newCompTitle,
      community: newCompCommunity,
      reward: newCompReward,
      deadline: newCompDeadline,
      organizer: orgName,
      submissions: 0,
      joined: false,
      progress: 0
    };

    setCompetitions([newComp, ...competitions]);
    setNewCompTitle('');
    setNewCompReward('');
    setNewCompDeadline('');
    triggerToast('New competition published successfully!');
  };

  const toggleJoinCommunity = (id: string) => {
    setCommunities(communities.map(c => {
      if (c.id === id) {
        const nextState = !c.joined;
        if (nextState) {
          // check if already reached 3
          const currentCount = communities.filter(comm => comm.joined).length;
          if (currentCount >= 3) {
            triggerToast('Limit reached! You can join at most 3 communities.');
            return c;
          }
          triggerToast(`Joined the ${c.name} community!`);
        } else {
          triggerToast(`Left the ${c.name} community.`);
        }
        return { ...c, joined: nextState };
      }
      return c;
    }));
  };

  const handleLikePost = (id: string) => {
    setPosts(posts.map(p => {
      if (p.id === id) {
        const hasLiked = !p.hasLiked;
        return {
          ...p,
          hasLiked,
          likes: hasLiked ? p.likes + 1 : p.likes - 1
        };
      }
      return p;
    }));
  };

  const handleReportPost = (id: string) => {
    setPosts(posts.map(p => {
      if (p.id === id) {
        triggerToast('Post flagged for security review');
        return { ...p, isReported: true };
      }
      return p;
    }));
  };

  const handleResolveReport = (id: string, action: 'keep' | 'delete') => {
    if (action === 'delete') {
      setPosts(posts.filter(p => p.id !== id));
      triggerToast('Post removed from platform');
    } else {
      setPosts(posts.map(p => {
        if (p.id === id) return { ...p, isReported: false };
        return p;
      }));
      triggerToast('Report dismissed');
    }
  };

  const handleJoinCompetition = (id: string) => {
    setCompetitions(competitions.map(c => {
      if (c.id === id) {
        const nextState = !c.joined;
        triggerToast(nextState ? `Registered for ${c.title}!` : `Cancelled registration for ${c.title}.`);
        return {
          ...c,
          joined: nextState,
          submissions: nextState ? c.submissions + 1 : c.submissions - 1
        };
      }
      return c;
    }));
  };

  const getCommunityIcon = (id: string) => {
    switch (id) {
      case 'photography': return <Camera className="w-4 h-4 text-cyan-600" />;
      case 'design': return <Palette className="w-4 h-4 text-purple-600" />;
      case 'writing': return <PenTool className="w-4 h-4 text-amber-600" />;
      case 'film': return <Film className="w-4 h-4 text-red-600" />;
      case 'music': return <MusicIcon className="w-4 h-4 text-emerald-600" />;
      case 'code': return <CodeIcon className="w-4 h-4 text-indigo-600" />;
      default: return <Users className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch w-full">
      
      {/* Left Info Card */}
      <div className="xl:col-span-4 flex flex-col justify-center text-left space-y-6">
        <div>
          <span className="text-[10px] font-mono tracking-wider uppercase font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md">
            Interactive Showcase
          </span>
          <h4 className="font-display text-2xl font-bold text-slate-900 mt-3 mb-2">
            Lyra Platform Emulator
          </h4>
          <p className="text-slate-650 text-sm leading-relaxed">
            Experience the design and features of Akshay's <strong>Lyra Community Platform</strong>. This emulator lets you simulate logging in as either a <strong>Standard Creator</strong> or a <strong>Partner Organization</strong>, posting content, managing community affiliations, running challenges, and monitoring trust and safety guidelines.
          </p>
        </div>

        <div className="bg-teal-50/50 border border-teal-100 rounded-2xl p-5 space-y-4">
          <h5 className="text-xs font-mono font-bold text-teal-950 uppercase tracking-wider flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-teal-700" />
            Lyra Simulator Walkthrough
          </h5>
          <ul className="space-y-2.5 text-xs text-slate-700">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
              <span><strong>Persona Switching:</strong> Log in as an <strong>Organization</strong> to create active hiring challenges, or as a <strong>User</strong> to post and join communities.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
              <span><strong>Dynamic Affiliations:</strong> Toggle joining communities (limit of 3) on the "Communities" tab and watch the counts synchronize dynamically.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
              <span><strong>Trust & Safety review:</strong> Flag a post in the feed. Navigate to the "Security" tab to review and moderate it as an admin.</span>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            <span className="w-8 h-8 rounded-full border-2 border-white bg-teal-100 flex items-center justify-center text-xs">🚀</span>
            <span className="w-8 h-8 rounded-full border-2 border-white bg-amber-100 flex items-center justify-center text-xs">🎨</span>
            <span className="w-8 h-8 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center text-xs">🤝</span>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            Modeled directly from actual screenshots of the live platform.
          </p>
        </div>
      </div>

      {/* Right Desktop Window Frame Emulator */}
      <div className="xl:col-span-8 flex justify-center items-center">
        <div className="relative w-full max-w-4xl h-[620px] rounded-2xl border border-slate-200 bg-slate-50 shadow-2xl overflow-hidden flex flex-col">
          
          {/* macOS Browser Header bar */}
          <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex items-center gap-3 select-none">
            {/* Dots */}
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-green-400 hover:bg-green-500 transition-colors" />
            </div>
            
            {/* Tabs */}
            <div className="flex gap-1 ml-4 text-[11px] font-medium text-slate-600">
              <div className="px-3 py-1 bg-white border border-slate-200 border-b-transparent rounded-t-lg flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-teal-500" />
                Lyra Community Platform
              </div>
            </div>

            {/* Address Bar */}
            <div className="flex-1 max-w-md mx-auto bg-white border border-slate-200 rounded-md px-3 py-1 text-center text-[10px] text-slate-500 font-mono flex items-center justify-between shadow-inner">
              <span className="opacity-40">🔒</span>
              <span className="select-all">akshaynadan.github.io/LYRA_APP/</span>
              <RefreshCw onClick={handleResetData} className="w-3 h-3 opacity-40 hover:opacity-100 cursor-pointer transition-opacity" title="Reset Demo Data" />
            </div>
          </div>

          {/* MAIN SIMULATOR SCREEN CONTAINER */}
          <div className="flex-1 flex overflow-hidden relative bg-white text-slate-900">
            
            {/* Inner Toast notifications */}
            {toast && (
              <div className="absolute top-4 right-4 bg-slate-900 text-white text-xs py-2.5 px-4 rounded-xl shadow-xl flex items-center gap-2.5 z-50 animate-fade-in border border-slate-800">
                <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="font-medium font-mono">{toast}</span>
              </div>
            )}

            {/* SIGN IN VIEW */}
            {!isLoggedIn ? (
              <div className="flex-1 flex flex-col md:flex-row overflow-y-auto">
                {/* Left Side Branding Panel */}
                <div className="w-full md:w-5/12 bg-slate-950 p-8 flex flex-col justify-between text-left relative overflow-hidden">
                  {/* Subtle Background Pattern */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(13,148,136,0.18),rgba(255,255,255,0))]" />
                  
                  {/* Logo block */}
                  <div className="flex items-center gap-3 z-10">
                    <div className="w-8 h-8 rounded-lg bg-[#007A78] flex items-center justify-center text-white text-base font-black">
                      L
                    </div>
                    <span className="font-display font-bold text-lg text-white tracking-wide">Lyra</span>
                  </div>

                  {/* Mid copy */}
                  <div className="my-8 md:my-0 z-10">
                    <h2 className="text-3xl font-bold text-white font-display tracking-tight leading-tight mb-3">
                      Lyra
                    </h2>
                    <p className="text-slate-400 text-xs leading-relaxed font-normal">
                      A focused community platform for creators, professionals, and organizations to discover talent through posts and competitions.
                    </p>
                  </div>

                  {/* Bottom copy */}
                  <div className="text-[10px] text-slate-500 font-mono z-10">
                    © 2026 Lyra Platform • Powered by Secure OTP
                  </div>
                </div>

                {/* Right Side Form Panel */}
                <div className="flex-1 p-8 md:p-12 flex flex-col justify-center text-left bg-white overflow-y-auto">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Community Talent Network
                  </span>
                  <h3 className="font-display text-2xl font-bold text-slate-900 mb-2">
                    Sign in to your creative workspace
                  </h3>
                  <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                    Choose a role, verify contact details, then enter a platform built around community-specific profiles, reach, reporting, and hiring competitions.
                  </p>

                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    {/* Role selector tab strip */}
                    <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl mb-4">
                      <button
                        type="button"
                        onClick={() => {
                          setRole('user');
                          setOtpSent(false);
                        }}
                        className={`py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${role === 'user' ? 'bg-[#007A78] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                      >
                        User
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setRole('organization');
                          setOtpSent(false);
                        }}
                        className={`py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${role === 'organization' ? 'bg-[#007A78] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                      >
                        Organization
                      </button>
                    </div>

                    {role === 'user' ? (
                      /* USER FIELDS */
                      <div className="space-y-3.5">
                        <div className="space-y-1">
                          <label className="text-[11px] font-medium text-slate-700 block">Full name</label>
                          <input 
                            type="text" 
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="e.g., Akshay Kumar"
                            className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-lg text-xs focus:ring-1 focus:ring-[#007A78] outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-medium text-slate-700 block">Email</label>
                          <input 
                            type="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="akshay@example.com"
                            className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-lg text-xs focus:ring-1 focus:ring-[#007A78] outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-medium text-slate-700 block">Mobile number</label>
                          <input 
                            type="tel" 
                            required
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            placeholder="9876543210"
                            className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-lg text-xs focus:ring-1 focus:ring-[#007A78] outline-none"
                          />
                        </div>
                      </div>
                    ) : (
                      /* ORGANIZATION FIELDS */
                      <div className="space-y-3.5">
                        <div className="space-y-1">
                          <label className="text-[11px] font-medium text-slate-700 block">Organization name</label>
                          <input 
                            type="text" 
                            required
                            value={orgName}
                            onChange={(e) => setOrgName(e.target.value)}
                            placeholder="e.g., PixelForge Labs"
                            className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-lg text-xs focus:ring-1 focus:ring-[#007A78] outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-medium text-slate-700 block">Email</label>
                          <input 
                            type="email" 
                            required
                            value={orgEmail}
                            onChange={(e) => setOrgEmail(e.target.value)}
                            placeholder="team@pixelforge.example"
                            className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-lg text-xs focus:ring-1 focus:ring-[#007A78] outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-medium text-slate-700 block">Mobile number</label>
                          <input 
                            type="tel" 
                            required
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            placeholder="9876543210"
                            className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-lg text-xs focus:ring-1 focus:ring-[#007A78] outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-medium text-slate-700 block font-sans">Registration proof ID</label>
                          <input 
                            type="text" 
                            required
                            value={orgProof}
                            onChange={(e) => setOrgProof(e.target.value)}
                            placeholder="U74899TN2026PTC001234"
                            className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-lg text-xs focus:ring-1 focus:ring-[#007A78] outline-none font-mono"
                          />
                        </div>
                      </div>
                    )}

                    {/* Sim OTP Code send-trigger block */}
                    <div className="pt-2 flex items-center justify-between gap-3 bg-slate-50 border border-slate-100 rounded-xl p-3">
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="px-4 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-mono font-bold text-slate-700 hover:bg-slate-50 transition-colors shrink-0"
                      >
                        Send OTP
                      </button>
                      <span className="text-[9px] text-slate-400 font-mono text-left leading-relaxed">
                        Email and mobile verification are simulated locally.
                      </span>
                    </div>

                    {/* OTP code Input Block */}
                    {otpSent && (
                      <div className="space-y-1 animate-fade-in pt-1">
                        <label className="text-[11px] font-mono font-bold text-[#007A78] block">OTP Code</label>
                        <input 
                          type="text" 
                          required
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                          placeholder="Enter 6 digit code (123456)"
                          maxLength={6}
                          className="w-full bg-[#007A78]/5 border border-[#007A78]/30 px-3.5 py-2 rounded-lg text-xs font-mono tracking-widest text-center focus:ring-1 focus:ring-[#007A78] outline-none font-bold"
                        />
                      </div>
                    )}

                    {/* Submit actions */}
                    <div className="pt-2 flex flex-col gap-3">
                      <button
                        type="submit"
                        className="w-full py-3 bg-[#007A78] hover:bg-[#00605E] text-white rounded-lg text-xs font-bold shadow-lg shadow-teal-900/10 transition-all cursor-pointer text-center"
                      >
                        {otpSent ? 'Continue' : 'Verify Details & Send OTP'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsLoggedIn(true);
                          setFullName('Akshay Kumar');
                          triggerToast('Bypassed with Admin Credentials!');
                        }}
                        className="text-center text-[10px] text-[#007A78] hover:underline"
                      >
                        Google sign-in (Simulated Bypass)
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              /* LOGGED IN APP VIEW WITH WORKSPACE LAYOUT */
              <div className="flex-1 flex overflow-hidden">
                
                {/* Left Sidebar */}
                <div className="w-48 bg-slate-50 border-r border-slate-200 flex flex-col justify-between text-left p-4 select-none shrink-0">
                  <div className="space-y-6">
                    {/* Brand header */}
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md bg-[#007A78] flex items-center justify-center text-white text-[11px] font-black">
                        L
                      </div>
                      <span className="font-display font-bold text-sm tracking-wide text-slate-800">Lyra</span>
                    </div>

                    {/* Navigation Menu Links */}
                    <nav className="space-y-1">
                      <button
                        onClick={() => setActiveTab('feed')}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${activeTab === 'feed' ? 'bg-[#007A78]/10 text-[#007A78]' : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'}`}
                      >
                        <span className="flex items-center gap-2">
                          <Layers className="w-3.5 h-3.5" />
                          Community Feed
                        </span>
                      </button>

                      <button
                        onClick={() => setActiveTab('communities')}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${activeTab === 'communities' ? 'bg-[#007A78]/10 text-[#007A78]' : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'}`}
                      >
                        <span className="flex items-center gap-2">
                          <Users className="w-3.5 h-3.5" />
                          Communities
                        </span>
                        <span className="text-[10px] font-mono font-bold bg-slate-200 px-1.5 py-0.5 rounded-md text-slate-600">
                          {joinedCommunitiesCount}/3
                        </span>
                      </button>

                      <button
                        onClick={() => setActiveTab('competitions')}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${activeTab === 'competitions' ? 'bg-[#007A78]/10 text-[#007A78]' : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'}`}
                      >
                        <span className="flex items-center gap-2">
                          <Trophy className="w-3.5 h-3.5" />
                          Competitions
                        </span>
                        <span className="text-[10px] font-mono font-bold bg-slate-200 px-1.5 py-0.5 rounded-md text-slate-600">
                          {competitions.filter(c => c.joined).length}
                        </span>
                      </button>

                      <button
                        onClick={() => setActiveTab('profile')}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${activeTab === 'profile' ? 'bg-[#007A78]/10 text-[#007A78]' : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'}`}
                      >
                        <span className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5" />
                          Profile
                        </span>
                      </button>

                      <button
                        onClick={() => setActiveTab('security')}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${activeTab === 'security' ? 'bg-[#007A78]/10 text-[#007A78]' : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'}`}
                      >
                        <span className="flex items-center gap-2">
                          <ShieldAlert className="w-3.5 h-3.5" />
                          Security
                        </span>
                        <span className="text-[10px] font-mono font-bold bg-red-100 text-red-600 px-1.5 py-0.5 rounded-md">
                          {posts.filter(p => p.isReported).length}
                        </span>
                      </button>
                    </nav>
                  </div>

                  {/* Profile info footer in sidebar */}
                  <div className="border-t border-slate-200 pt-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-full bg-[#007A78] flex items-center justify-center text-white text-[10px] font-bold font-sans">
                        {role === 'user' ? fullName.charAt(0) : orgName.charAt(0)}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[11px] font-semibold text-slate-800 truncate leading-none mb-0.5">
                          {role === 'user' ? fullName : orgName}
                        </p>
                        <span className="text-[9px] text-slate-400 block truncate leading-none">
                          {role === 'user' ? 'Creator account' : 'Verified organization'}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setIsLoggedIn(false);
                        setOtpSent(false);
                        triggerToast('Logged out');
                      }}
                      className="w-full flex items-center gap-1.5 px-2 py-1 bg-slate-100 hover:bg-red-50 text-[10px] text-slate-600 hover:text-red-600 rounded transition-colors text-left font-medium cursor-pointer"
                    >
                      <LogOut className="w-3 h-3" />
                      Sign out
                    </button>
                  </div>
                </div>

                {/* Main Content Workspace Panel */}
                <div className="flex-1 bg-slate-50 flex flex-col overflow-y-auto">
                  
                  {/* Workspace Content Toolbar Header */}
                  <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shrink-0 select-none">
                    <div>
                      <h2 className="text-sm font-bold text-slate-800 capitalize flex items-center gap-2">
                        {activeTab === 'feed' && 'Community Feed'}
                        {activeTab === 'communities' && 'Communities'}
                        {activeTab === 'competitions' && 'Competitions'}
                        {activeTab === 'profile' && 'Profile'}
                        {activeTab === 'security' && 'Security Queue'}
                      </h2>
                      <p className="text-[10px] text-slate-400 text-left -mt-0.5">
                        {activeTab === 'feed' && 'Posts are separated by community so every member gets relevant reach.'}
                        {activeTab === 'communities' && 'Join up to three communities and keep each profile distinct.'}
                        {activeTab === 'competitions' && (role === 'organization' ? 'Create challenges, review submissions and distribute rewards.' : 'Organizations can run challenges and users can compete for rewards.')}
                        {activeTab === 'profile' && 'Your centralized creative dashboard & activity snapshots.'}
                        {activeTab === 'security' && 'Report queues help admins review suspected plagiarism and abusive posts.'}
                      </p>
                    </div>

                    <button
                      onClick={handleResetData}
                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md text-[10px] font-mono font-semibold text-slate-600 border border-slate-200 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Reset demo data
                    </button>
                  </div>

                  {/* ACTIVE VIEW CHANGER */}
                  <div className="flex-1 p-6 text-left overflow-y-auto max-w-3xl mx-auto w-full space-y-6">
                    
                    {/* TAB 1: COMMUNITY FEED */}
                    {activeTab === 'feed' && (
                      <div className="space-y-6">
                        {/* Feed filters */}
                        <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm overflow-x-auto select-none">
                          <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400 px-2">Filters:</span>
                          {['All', 'Photography', 'Design', 'Writing', 'Film', 'Music', 'Code'].map(cat => (
                            <button
                              key={cat}
                              onClick={() => setFeedCategory(cat)}
                              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${feedCategory === cat ? 'bg-[#007A78] text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>

                        {/* Create Post Section inside App */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
                          <h4 className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                            <Plus className="w-4 h-4 text-[#007A78]" />
                            Create post
                          </h4>
                          <form onSubmit={handleCreatePost} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1 text-left">
                              <label className="text-[10px] font-bold text-slate-600">Title</label>
                              <input 
                                type="text"
                                value={newPostTitle}
                                onChange={(e) => setNewPostTitle(e.target.value)}
                                placeholder="What are you sharing?"
                                className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-xs focus:ring-1 focus:ring-[#007A78] outline-none"
                              />
                            </div>
                            <div className="space-y-1 text-left">
                              <label className="text-[10px] font-bold text-slate-600">Type</label>
                              <select
                                value={newPostType}
                                onChange={(e) => setNewPostType(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-xs focus:ring-1 focus:ring-[#007A78] outline-none"
                              >
                                <option value="Image">Image / Artwork</option>
                                <option value="Text">Discussion Thread</option>
                                <option value="Video">Video / Reel</option>
                                <option value="Audio">Audio Track</option>
                                <option value="Snippet">Code / Snippet</option>
                              </select>
                            </div>
                            <div className="space-y-1 text-left md:col-span-2">
                              <label className="text-[10px] font-bold text-slate-600">Description</label>
                              <textarea
                                value={newPostDesc}
                                onChange={(e) => setNewPostDesc(e.target.value)}
                                placeholder="Describe the work, process, or submission context."
                                rows={2}
                                className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-xs focus:ring-1 focus:ring-[#007A78] outline-none resize-none"
                              />
                            </div>
                            <div className="space-y-1 text-left">
                              <label className="text-[10px] font-bold text-slate-600">Community Channel</label>
                              <select
                                value={newPostCommunity}
                                onChange={(e) => setNewPostCommunity(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-xs focus:ring-1 focus:ring-[#007A78] outline-none"
                              >
                                {communities.map(c => (
                                  <option key={c.id} value={c.name}>{c.name} {c.joined ? '(Joined)' : '(Not Joined)'}</option>
                                ))}
                              </select>
                            </div>
                            <div className="space-y-1 text-left">
                              <label className="text-[10px] font-bold text-slate-600 font-sans">Media URL</label>
                              <input 
                                type="text"
                                value={newPostMedia}
                                onChange={(e) => setNewPostMedia(e.target.value)}
                                placeholder="Optional image or thumbnail URL"
                                className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-xs focus:ring-1 focus:ring-[#007A78] outline-none"
                              />
                            </div>
                            <div className="md:col-span-2 pt-1 flex items-center justify-between">
                              <span className="text-[10px] font-mono text-slate-400">Reports and likes work after publishing.</span>
                              <button
                                type="submit"
                                className="px-5 py-2 bg-[#007A78] hover:bg-[#00605E] text-white rounded-lg text-xs font-semibold shadow transition-colors cursor-pointer"
                              >
                                Publish
                              </button>
                            </div>
                          </form>
                        </div>

                        {/* List of published posts */}
                        <div className="space-y-4">
                          {posts
                            .filter(p => feedCategory === 'All' || p.community.toLowerCase() === feedCategory.toLowerCase())
                            .map(p => (
                              <div key={p.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col text-left">
                                {/* Post Author Header */}
                                <div className="px-5 py-3.5 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
                                  <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-xs font-bold text-slate-600">
                                      {p.author.charAt(0)}
                                    </div>
                                    <div>
                                      <span className="text-xs font-bold text-slate-800 block leading-tight">{p.author}</span>
                                      <span className="text-[9px] text-slate-400 block -mt-0.5">{p.role} • in <strong className="text-[#007A78]">{p.community}</strong></span>
                                    </div>
                                  </div>
                                  <span className="text-[10px] font-mono text-slate-400">{p.date}</span>
                                </div>

                                {/* Post Body Description */}
                                <div className="p-5 space-y-3">
                                  <h5 className="text-sm font-bold text-slate-900 leading-snug">{p.title}</h5>
                                  <p className="text-xs text-slate-650 leading-relaxed font-normal">{p.description}</p>
                                  
                                  {p.mediaUrl && (
                                    <div className="aspect-video w-full rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                                      <img 
                                        src={p.mediaUrl} 
                                        alt={p.title} 
                                        referrerPolicy="no-referrer"
                                        className="w-full h-full object-cover" 
                                      />
                                    </div>
                                  )}
                                </div>

                                {/* Post Actions Footer */}
                                <div className="px-5 py-2.5 border-t border-slate-100 bg-slate-50/20 flex items-center justify-between select-none">
                                  <button
                                    onClick={() => handleLikePost(p.id)}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${p.hasLiked ? 'text-teal-600 bg-teal-50' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'}`}
                                  >
                                    <ThumbsUp className="w-3.5 h-3.5" />
                                    <span>{p.likes} likes</span>
                                  </button>

                                  {!p.isReported ? (
                                    <button
                                      onClick={() => handleReportPost(p.id)}
                                      className="flex items-center gap-1 px-2 py-1 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg text-[10px] font-medium transition-colors cursor-pointer"
                                    >
                                      <Flag className="w-3 h-3" />
                                      Flag Post
                                    </button>
                                  ) : (
                                    <span className="text-[10px] font-mono font-bold text-red-500 bg-red-50 px-2 py-1 rounded-md flex items-center gap-1">
                                      <AlertCircle className="w-3 h-3" /> Flagged for review
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}

                    {/* TAB 2: COMMUNITIES LIST */}
                    {activeTab === 'communities' && (
                      <div className="space-y-4">
                        <div className="bg-teal-50 border border-teal-100 p-4 rounded-xl text-left select-none">
                          <p className="text-xs text-teal-950 font-normal leading-relaxed">
                            💡 <strong>Workspace Rules:</strong> In the Lyra Ecosystem, creators can specialize deeply. To maintain focus, accounts are permitted to join a <strong>maximum of 3 creative communities</strong>. Keep your focus sharp!
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {communities.map(comm => (
                            <div key={comm.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between text-left">
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="text-[9px] font-mono tracking-wider font-bold uppercase text-[#007A78] bg-teal-50 px-2 py-0.5 rounded-md">
                                    {comm.tag}
                                  </span>
                                  <span className="text-[10px] font-mono text-slate-400">
                                    {comm.members.toLocaleString()} members
                                  </span>
                                </div>

                                <div className="flex items-center gap-2">
                                  {getCommunityIcon(comm.id)}
                                  <h4 className="text-sm font-bold text-slate-900">{comm.name}</h4>
                                </div>

                                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                                  {comm.description}
                                </p>
                              </div>

                              <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
                                <button
                                  onClick={() => toggleJoinCommunity(comm.id)}
                                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${comm.joined ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
                                >
                                  {comm.joined ? 'Leave' : 'Join'}
                                </button>

                                {comm.joined && (
                                  <button
                                    onClick={() => {
                                      setFeedCategory(comm.name);
                                      setActiveTab('feed');
                                    }}
                                    className="text-xs text-[#007A78] hover:underline font-semibold flex items-center gap-0.5 cursor-pointer"
                                  >
                                    Open feed <ChevronRight className="w-3 h-3" />
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* TAB 3: COMPETITIONS LIST */}
                    {activeTab === 'competitions' && (
                      <div className="space-y-6">
                        
                        {/* If logged in as Organization: Show Form to Post Challenge */}
                        {role === 'organization' && (
                          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
                            <h4 className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                              <Plus className="w-4 h-4 text-[#007A78]" />
                              Create competition
                            </h4>
                            <form onSubmit={handleCreateCompetition} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-1 text-left">
                                <label className="text-[10px] font-bold text-slate-600">Challenge Title</label>
                                <input 
                                  type="text"
                                  value={newCompTitle}
                                  onChange={(e) => setNewCompTitle(e.target.value)}
                                  placeholder="e.g., Portfolio case study sprint"
                                  className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-xs focus:ring-1 focus:ring-[#007A78] outline-none"
                                />
                              </div>
                              <div className="space-y-1 text-left">
                                <label className="text-[10px] font-bold text-slate-600">Target Community</label>
                                <select
                                  value={newCompCommunity}
                                  onChange={(e) => setNewCompCommunity(e.target.value)}
                                  className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-xs focus:ring-1 focus:ring-[#007A78] outline-none"
                                >
                                  {communities.map(c => (
                                    <option key={c.id} value={c.name}>{c.name}</option>
                                  ))}
                                </select>
                              </div>
                              <div className="space-y-1 text-left">
                                <label className="text-[10px] font-bold text-slate-600 font-sans">Reward / Prize</label>
                                <input 
                                  type="text"
                                  value={newCompReward}
                                  onChange={(e) => setNewCompReward(e.target.value)}
                                  placeholder="Rs. 20,000 / Internship offer"
                                  className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-xs focus:ring-1 focus:ring-[#007A78] outline-none"
                                />
                              </div>
                              <div className="space-y-1 text-left">
                                <label className="text-[10px] font-bold text-slate-600">Deadline Date</label>
                                <input 
                                  type="date"
                                  value={newCompDeadline}
                                  onChange={(e) => setNewCompDeadline(e.target.value)}
                                  className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-xs focus:ring-1 focus:ring-[#007A78] outline-none font-mono"
                                />
                              </div>
                              <div className="md:col-span-2 pt-1 text-right">
                                <button
                                  type="submit"
                                  className="px-5 py-2 bg-[#007A78] hover:bg-[#00605E] text-white rounded-lg text-xs font-semibold shadow transition-colors cursor-pointer"
                                >
                                  Publish competition
                                </button>
                              </div>
                            </form>
                          </div>
                        )}

                        {/* List of active competitions */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {competitions.map(comp => (
                            <div key={comp.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between text-left">
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="text-[9px] font-mono tracking-wider font-bold uppercase text-[#007A78] bg-teal-50 px-2 py-0.5 rounded-md">
                                    {comp.community}
                                  </span>
                                  <span className="text-[10px] font-mono text-slate-400">
                                    {comp.submissions} submissions
                                  </span>
                                </div>

                                <h4 className="text-sm font-bold text-slate-900 leading-tight">
                                  {comp.title}
                                </h4>

                                <div className="space-y-1 font-mono text-[10px] text-slate-500">
                                  <div className="flex justify-between">
                                    <span>Reward:</span>
                                    <strong className="text-slate-800">{comp.reward}</strong>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Host:</span>
                                    <span>{comp.organizer}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Deadline:</span>
                                    <span>{comp.deadline}</span>
                                  </div>
                                </div>

                                {/* Progress Bar of simulated duration */}
                                <div className="pt-2">
                                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-amber-500 rounded-full" 
                                      style={{ width: `${comp.progress || 100}%` }}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
                                {role === 'user' ? (
                                  <button
                                    onClick={() => handleJoinCompetition(comp.id)}
                                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${comp.joined ? 'bg-[#007A78] text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
                                  >
                                    {comp.joined ? 'Registered' : 'Join'}
                                  </button>
                                ) : (
                                  <span className="text-[10px] font-mono text-slate-400 font-bold">
                                    {comp.organizer === orgName ? '★ Your Challenge' : '🔒 Global Challenge'}
                                  </span>
                                )}
                                <span className="text-[10px] text-slate-400 font-mono">
                                  Closes in {Math.max(1, Math.floor((new Date(comp.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))} days
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* TAB 4: PROFILE */}
                    {activeTab === 'profile' && (
                      <div className="space-y-6">
                        {/* Profile Info Banner */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center space-y-3">
                          <div className="mx-auto w-16 h-16 rounded-full bg-[#007A78] flex items-center justify-center text-white text-2xl font-bold font-sans shadow-md">
                            {role === 'user' ? fullName.charAt(0) : orgName.charAt(0)}
                          </div>
                          <div>
                            <h4 className="text-base font-bold text-slate-900 leading-tight">
                              {role === 'user' ? fullName : orgName}
                            </h4>
                            <p className="text-xs font-mono text-slate-400 mt-1">
                              {role === 'user' ? email : orgEmail}
                            </p>
                          </div>
                          <span className="inline-block text-[10px] font-mono tracking-wider font-semibold text-[#007A78] bg-[#007A78]/10 px-3 py-1 rounded-full">
                            {role === 'user' ? 'Individual Creator Account' : 'Verified Partner Organization'}
                          </span>
                        </div>

                        {/* Summary Metrics Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Joined communities list */}
                          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-3.5 text-left">
                            <h4 className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
                              Affiliated Communities ({joinedCommunitiesCount})
                            </h4>
                            {joinedCommunitiesCount === 0 ? (
                              <p className="text-xs text-slate-400 font-normal italic">
                                Not affiliated with any community yet. Go join some!
                              </p>
                            ) : (
                              <div className="space-y-2">
                                {communities.filter(c => c.joined).map(c => (
                                  <div key={c.id} className="flex items-center justify-between text-xs">
                                    <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                                      {getCommunityIcon(c.id)}
                                      {c.name}
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-mono">0 posts authored</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Activity ledger snapshot */}
                          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-3.5 text-left">
                            <h4 className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
                              Activity snapshots
                            </h4>
                            <div className="space-y-2.5 font-mono text-xs text-slate-500">
                              <div className="flex justify-between">
                                <span>Total likes earned:</span>
                                <strong className="text-slate-800">
                                  {posts.filter(p => p.author === (role === 'user' ? fullName : orgName)).reduce((sum, p) => sum + p.likes, 0)}
                                </strong>
                              </div>
                              <div className="flex justify-between">
                                <span>Competitions joined:</span>
                                <strong className="text-slate-800">
                                  {competitions.filter(c => c.joined).length}
                                </strong>
                              </div>
                              <div className="flex justify-between">
                                <span>Trust reviews submitted:</span>
                                <strong className="text-slate-800">
                                  0
                                </strong>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TAB 5: SECURITY MODERATION */}
                    {activeTab === 'security' && (
                      <div className="space-y-4">
                        <div className="bg-red-50 border border-red-100 p-4 rounded-xl text-left select-none">
                          <p className="text-xs text-red-950 font-normal leading-relaxed">
                            🛡️ <strong>Safety Center:</strong> This pane lists community-reported posts. Users are empowered to flag contents violating copyright or guidelines. Administrators can resolve issues by either <strong>Approving</strong> (re-verifying) or <strong>Deleting</strong> flagged posts.
                          </p>
                        </div>

                        {posts.filter(p => p.isReported).length === 0 ? (
                          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center space-y-3">
                            <span className="text-3xl block">🛡️</span>
                            <h4 className="text-xs font-bold text-slate-800">No reports are pending review</h4>
                            <p className="text-[10px] text-slate-400 max-w-xs mx-auto leading-relaxed">
                              Excellent! The workspace is currently secure. Flag any post in the community feed to test the security flow.
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {posts
                              .filter(p => p.isReported)
                              .map(p => (
                                <div key={p.id} className="bg-white rounded-xl border border-red-200 shadow-sm p-4 text-left space-y-3">
                                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                                    <span>Author: <strong>{p.author}</strong></span>
                                    <span className="text-red-500 font-bold bg-red-50 px-2 py-0.5 rounded">FLAGGED POST</span>
                                  </div>
                                  
                                  <div className="space-y-1.5">
                                    <h5 className="text-xs font-bold text-slate-800">{p.title}</h5>
                                    <p className="text-xs text-slate-500 font-normal line-clamp-2">{p.description}</p>
                                  </div>

                                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                                    <span className="text-[10px] text-slate-400 font-mono">Community: {p.community}</span>
                                    <div className="flex items-center gap-2">
                                      <button
                                        onClick={() => handleResolveReport(p.id, 'keep')}
                                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[10px] font-semibold transition-colors cursor-pointer"
                                      >
                                        Dismiss Report
                                      </button>
                                      <button
                                        onClick={() => handleResolveReport(p.id, 'delete')}
                                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-[10px] font-semibold transition-colors cursor-pointer"
                                      >
                                        Delete Post
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    )}

                  </div>

                </div>
              </div>
            )}

          </div>

          {/* Simple bottom frame edge info bar */}
          <div className="bg-slate-100 border-t border-slate-200 px-4 py-1.5 flex items-center justify-between text-[9px] text-slate-400 font-mono select-none">
            <span>Platform Status: Healthy</span>
            <span>Simulated Chrome Instance v126</span>
          </div>

        </div>
      </div>

    </div>
  );
}
