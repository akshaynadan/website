import { useState } from 'react';
import { ArrowRight, Code2, Terminal, Shield, Cpu, ChevronRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO } from '../data';

type CodeTab = 'profile.ts' | 'trash_master.ino' | 'ai_pipeline.py';

export default function Hero() {
  const [activeTab, setActiveTab] = useState<CodeTab>('profile.ts');
  const [copied, setCopied] = useState(false);

  const codeSnippets: Record<CodeTab, { code: string; language: string }> = {
    'profile.ts': {
      language: 'typescript',
      code: `// Akshay MN's Professional Descriptor
const softwareEngineer = {
  name: "${PERSONAL_INFO.name}",
  origin: "Thrissur, Kerala, India",
  education: "B.Tech in Information Technology",
  training: "Artificial Intelligence & LLMs",
  strengths: [
    "IoT Systems", "Python & Java",
    "Android Apps", "Cloud Pipelines"
  ],
  philosophy: "Create intelligent, impactful solutions"
};`
    },
    'trash_master.ino': {
      language: 'cpp',
      code: `// Smart Trash Master (IoT Core System)
#include <AWS_IoT_Core.h>

void loop() {
  float currentDeposit = sensor.readWeight();
  
  if (currentDeposit > 0.05) {
    // Reward calculation based on weight
    float userReward = calculateCredits(currentDeposit);
    
    // Broadcast status to Android and AWS
    aws.publish("trash/status", userReward);
    android.triggerNotification("Credits earned!");
  }
  delay(1000);
}`
    },
    'ai_pipeline.py': {
      language: 'python',
      code: `# Advanced AI Model Training & Evaluation
import tensorflow as tf

def construct_evaluator():
    # LLM-based custom evaluation pipeline
    model = tf.keras.Sequential([
        tf.keras.layers.Input(shape=(768,)),
        tf.keras.layers.Dense(256, activation='relu'),
        tf.keras.layers.Dropout(0.15),
        tf.keras.layers.Dense(1, activation='sigmoid')
    ])
    model.compile(optimizer='adam', loss='binary_crossentropy')
    return model`
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden bg-calm-950"
    >
      {/* Calming Earth/Forest Ambient Light Spots */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-sage/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-accent-gold/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Background soft mesh lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#bfaea0_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.15] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Side: Soft Text & Information */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <motion.h1
            id="hero-main-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.15] mb-6"
          >
            Creating Intelligent <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-sage via-calm-500 to-accent-gold">
              IoT & AI Solutions
            </span>
          </motion.h1>

          <motion.p
            id="hero-sub-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-750 leading-relaxed max-w-2xl mb-4 font-normal"
          >
            Hi, I'm <strong className="text-slate-900 font-medium">{PERSONAL_INFO.name}</strong>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="flex flex-wrap items-center gap-3 mb-6 animate-fade-in"
          >
            <a
              href="https://github.com/akshaynadan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-calm-800 text-slate-600 hover:text-[#7C63F5] hover:border-[#7C63F5]/60 hover:bg-slate-50 transition-all text-xs font-mono font-medium shadow-sm group"
            >
              <svg className="w-4 h-4 text-slate-500 group-hover:text-[#7C63F5] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.579 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              github.com/akshaynadan
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-base sm:text-lg text-slate-750 leading-relaxed max-w-2xl mb-8 font-normal"
          >
            {PERSONAL_INFO.subTitle} Backed by a strong B.Tech foundation and advanced training in artificial intelligence, I build high-fidelity systems with clean code and robust architecture.
          </motion.p>

          {/* Quick Action buttons */}
          <motion.div
            id="hero-ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
          >
            <button
              onClick={() => scrollToSection('projects')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-accent-sage hover:bg-accent-sage/90 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg shadow-accent-sage/10 cursor-pointer text-sm"
            >
              Explore Portfolio
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleCopyEmail}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-calm-800 font-semibold px-6 py-3 rounded-xl transition-all duration-200 cursor-pointer text-sm hover:border-calm-700"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-accent-sage" />
                  Email Copied!
                </>
              ) : (
                <>
                  <span>Copy Contact Email</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </>
              )}
            </button>
          </motion.div>

          {/* Calming, soft icon badges */}
          <motion.div
            id="hero-proof-badges"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-calm-800/60 w-full"
          >
            <div className="flex items-center gap-2.5 text-slate-700 text-xs sm:text-sm">
              <div className="p-2 bg-white border border-calm-800 rounded-lg text-accent-sage">
                <Code2 className="w-4 h-4" />
              </div>
              <span>Clean Code</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-700 text-xs sm:text-sm">
              <div className="p-2 bg-white border border-calm-800 rounded-lg text-accent-gold">
                <Shield className="w-4 h-4" />
              </div>
              <span>Reliable Systems</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-700 text-xs sm:text-sm">
              <div className="p-2 bg-white border border-calm-800 rounded-lg text-accent-sage">
                <Cpu className="w-4 h-4" />
              </div>
              <span>IoT & AI Tech</span>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Interactive IDE Sandbox (Create animated blocks) */}
        <motion.div
          id="hero-ide-mockup"
          initial={{ opacity: 0, scale: 0.98, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-5 relative w-full"
        >
          {/* Subtle surrounding glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-sage/30 to-accent-gold/20 rounded-2xl blur-md opacity-30 pointer-events-none" />

          {/* IDE Container */}
          <div className="relative bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden font-mono text-xs text-left">
            {/* Top window bar & clickable code tabs */}
            <div className="bg-slate-950 px-4 py-1 flex items-center justify-between border-b border-slate-800 overflow-x-auto">
              <div className="flex items-center space-x-1.5 shrink-0 pr-4">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/60 inline-block" />
              </div>

              {/* TABS FOR THE FILES */}
              <div className="flex items-center space-x-1 scrollbar-none overflow-x-auto py-1.5">
                {(Object.keys(codeSnippets) as CodeTab[]).map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-mono transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
                        isActive
                          ? 'bg-slate-800 text-accent-sage border border-slate-700 font-medium'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Terminal className="w-3 h-3 shrink-0" />
                      {tab}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Code Body with smooth AnimatePresence transition */}
            <div className="p-6 h-[280px] overflow-y-auto bg-slate-900/95 leading-relaxed text-slate-300 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="font-mono text-[11px] sm:text-xs"
                >
                  <pre className="whitespace-pre">
                    <code>
                      {codeSnippets[activeTab].code.split('\n').map((line, idx) => {
                        let highlighted = line;
                        // Muted, eye-friendly custom highlight colors inside the pre
                        if (line.includes('const ') || line.includes('def ') || line.includes('void ')) {
                          highlighted = highlighted.replace('const ', '<span class="text-accent-gold/90">const </span>');
                          highlighted = highlighted.replace('def ', '<span class="text-accent-sage">def </span>');
                          highlighted = highlighted.replace('void ', '<span class="text-accent-sage">void </span>');
                        }
                        if (line.includes('softwareEngineer') || line.includes('construct_evaluator') || line.includes('loop')) {
                          highlighted = highlighted.replace('softwareEngineer', '<span class="text-accent-sage font-medium">softwareEngineer</span>');
                          highlighted = highlighted.replace('construct_evaluator', '<span class="text-accent-gold font-medium">construct_evaluator</span>');
                          highlighted = highlighted.replace('loop', '<span class="text-accent-gold font-medium">loop</span>');
                        }
                        // Highlights strings
                        highlighted = highlighted.replace(/"([^"]+)"/g, '<span class="text-calm-200">"$1"</span>');
                        // Highlights comments
                        if (line.startsWith('//') || line.startsWith('#')) {
                          highlighted = `<span class="text-calm-500 italic">${line}</span>`;
                        }

                        return (
                          <div key={idx} className="table-row">
                            <span className="table-cell text-calm-700 text-right pr-4 select-none w-5 text-[10px]">{idx + 1}</span>
                            <span className="table-cell text-slate-300" dangerouslySetInnerHTML={{ __html: highlighted }} />
                          </div>
                        );
                      })}
                    </code>
                  </pre>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* IDE bottom bar panel */}
            <div className="bg-calm-950 px-4 py-2 border-t border-calm-800 flex justify-between items-center text-[10px] text-slate-500 font-mono">
              <span className="flex items-center gap-1">
                <ChevronRight className="w-3 h-3 text-accent-sage" /> {codeSnippets[activeTab].language.toUpperCase()}
              </span>
              <span>UTF-8</span>
              <span className="text-accent-sage/80 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-accent-sage rounded-full inline-block animate-pulse" /> Live Sandbox
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
