import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EXPERIENCE, EDUCATION, CERTIFICATIONS, AWARDS } from '../data';
import { Briefcase, GraduationCap, Award, Scroll, Calendar, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';

type TrackTab = 'experience' | 'education' | 'certifications' | 'awards';

export default function Experience() {
  const [activeTab, setActiveTab] = useState<TrackTab>('experience');

  const tabs: { id: TrackTab; label: string; icon: ReactNode }[] = [
    { id: 'experience', label: 'Work History', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'education', label: 'Education & Training', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'certifications', label: 'Certifications', icon: <Scroll className="w-4 h-4" /> },
    { id: 'awards', label: 'Honours & Awards', icon: <Award className="w-4 h-4" /> }
  ];

  return (
    <section id="experience" className="py-24 bg-calm-900 relative">
      {/* Decorative divider borders */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-calm-800 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-calm-800 to-transparent" />

      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-xs font-semibold tracking-wider text-accent-sage uppercase mb-3">
            Trajectory
          </h2>
          <p className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Interactive Journey
          </p>
          <div className="w-12 h-1 bg-accent-sage mx-auto mt-4 rounded-full" />
          <p className="text-slate-650 mt-4 text-sm sm:text-base">
            Click across categories to explore my full professional work history, academic coursework, verified credentials, and awards.
          </p>
        </div>

        {/* Dynamic Category Toggle Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16 max-w-3xl mx-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer border ${
                  isActive
                    ? 'bg-accent-sage text-white border-accent-sage font-semibold shadow-md shadow-accent-sage/10'
                    : 'bg-white hover:bg-slate-50 text-slate-600 hover:text-accent-sage border-calm-800'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Animated timeline tracks */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === 'experience' && (
              <motion.div
                key="experience"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8 text-left"
              >
                {EXPERIENCE.map((exp, idx) => (
                  <div
                    key={exp.id}
                    className="relative pl-6 sm:pl-8 border-l border-calm-800 ml-4 sm:ml-6 group pb-4"
                  >
                    {/* Circle Node */}
                    <div className="absolute -left-2.5 top-1.5 w-5 h-5 bg-white border border-calm-800 group-hover:border-accent-sage rounded-full flex items-center justify-center transition-colors">
                      <div className="w-1.5 h-1.5 bg-slate-400 group-hover:bg-accent-sage rounded-full transition-colors" />
                    </div>

                    <div className="bg-white border border-calm-800 hover:border-calm-700 rounded-2xl p-6 sm:p-8 transition-all duration-350 shadow-md">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                        <div>
                          <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 group-hover:text-accent-sage transition-colors">
                            {exp.role}
                          </h3>
                          <p className="text-accent-gold text-sm font-semibold mt-1">
                            {exp.company}
                          </p>
                        </div>
                        <div className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-700 bg-calm-900 border border-calm-800 px-3 py-1.5 rounded-xl self-start sm:self-center shrink-0">
                          <Calendar className="w-3.5 h-3.5 text-accent-sage" />
                          {exp.period}
                        </div>
                      </div>

                      <ul className="space-y-2.5 mb-6 text-slate-700 text-sm leading-relaxed">
                        {exp.description.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-sage/80 mt-2 shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-calm-800">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mr-2 self-center">
                          Aims:
                        </span>
                        {exp.skills.map((s) => (
                          <span
                            key={s}
                            className="text-[10px] font-mono font-medium text-slate-700 bg-calm-900 border border-calm-800 px-2.5 py-1 rounded-md"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'education' && (
              <motion.div
                key="education"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8 text-left"
              >
                {EDUCATION.map((edu) => (
                  <div
                    key={edu.id}
                    className="relative pl-6 sm:pl-8 border-l border-calm-800 ml-4 sm:ml-6 group pb-4"
                  >
                    {/* Circle Node */}
                    <div className="absolute -left-2.5 top-1.5 w-5 h-5 bg-white border border-calm-800 group-hover:border-accent-gold rounded-full flex items-center justify-center transition-colors">
                      <div className="w-1.5 h-1.5 bg-slate-400 group-hover:bg-accent-gold rounded-full transition-colors" />
                    </div>

                    <div className="bg-white border border-calm-800 hover:border-calm-700 rounded-2xl p-6 sm:p-8 transition-all duration-350 shadow-md">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                        <div>
                          <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 group-hover:text-accent-gold transition-colors">
                            {edu.degree}
                          </h3>
                          <p className="text-accent-sage text-sm font-semibold mt-1">
                            {edu.institution}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          {edu.location && (
                            <span className="hidden sm:inline-flex items-center gap-1 text-xs text-slate-500">
                              <MapPin className="w-3.5 h-3.5" />
                              {edu.location}
                            </span>
                          )}
                          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-700 bg-calm-900 border border-calm-800 px-3 py-1.5 rounded-xl">
                            <Calendar className="w-3.5 h-3.5 text-accent-gold" />
                            {edu.period}
                          </div>
                        </div>
                      </div>

                      <ul className="space-y-2.5 text-slate-700 text-sm leading-relaxed">
                        {edu.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-gold/80 mt-2 shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'certifications' && (
              <motion.div
                key="certifications"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left"
              >
                {CERTIFICATIONS.map((cert) => (
                  <div
                    key={cert.id}
                    className="bg-white hover:bg-white border border-calm-800 hover:border-accent-sage/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group shadow-md"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 bg-calm-900 border border-calm-800 rounded-xl text-accent-sage group-hover:text-accent-sage/80 transition-colors">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-mono font-medium text-slate-500 bg-calm-900 border border-calm-800 px-2.5 py-1 rounded-lg">
                          {cert.date}
                        </span>
                      </div>

                      <h3 className="font-display text-base font-bold text-slate-900 mb-1 group-hover:text-accent-sage transition-colors">
                        {cert.title}
                      </h3>
                      <p className="text-accent-gold text-xs font-mono mb-3">
                        {cert.issuer}
                      </p>

                      <ul className="space-y-2 text-slate-650 text-xs sm:text-sm leading-relaxed mb-6">
                        {cert.description.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-accent-sage text-xs font-semibold hover:translate-x-1 transition-transform"
                      >
                        Verify Credential
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'awards' && (
              <motion.div
                key="awards"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left"
              >
                {AWARDS.map((award) => (
                  <div
                    key={award.id}
                    className="bg-white hover:bg-white border border-calm-800 hover:border-accent-gold/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group shadow-md"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 bg-calm-900 border border-calm-800 rounded-xl text-accent-gold group-hover:text-accent-gold/80 transition-colors">
                          <Award className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-mono font-medium text-slate-500 bg-calm-900 border border-calm-800 px-2.5 py-1 rounded-lg">
                          {award.date}
                        </span>
                      </div>

                      <h3 className="font-display text-base font-bold text-slate-900 mb-1 group-hover:text-accent-gold transition-colors">
                        {award.title}
                      </h3>
                      <p className="text-accent-sage text-xs font-mono mb-3">
                        {award.issuer}
                      </p>

                      <p className="text-slate-650 text-xs sm:text-sm leading-relaxed mb-4">
                        {award.description}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
