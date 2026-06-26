import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../data';
import { Project } from '../types';
import { ExternalLink, Github, X, CheckCircle2, ArrowRight, Laptop, Sparkles } from 'lucide-react';
import CurrencyCountEmulator from './CurrencyCountEmulator';
import LyraEmulator from './LyraEmulator';
import TalentLensEmulator from './TalentLensEmulator';

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = ['All', 'IoT & Mobile', 'AI & Data', 'Web Apps'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 bg-calm-950 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent-sage/3 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-xs font-semibold tracking-wider text-accent-sage uppercase mb-3">
            Portfolio
          </h2>
          <p className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            GitHub Featured Projects
          </p>
          <div className="w-12 h-1 bg-accent-sage mx-auto mt-4 rounded-full" />
          <p className="text-slate-650 mt-4 text-sm sm:text-base">
            An interactive archive of products built to showcase embedded hardware connectivity, data visualization, and prompt evaluation.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer border ${
                selectedCategory === category
                  ? 'bg-accent-sage text-white border-accent-sage font-semibold shadow-lg shadow-accent-sage/10'
                  : 'bg-white hover:bg-slate-50 text-slate-600 hover:text-accent-sage border-calm-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => setActiveProject(project)}
                className="group bg-white border border-calm-800 hover:border-accent-sage/50 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col relative text-left"
              >
                {/* Visual Cover Layer */}
                <div className="relative overflow-hidden aspect-video bg-calm-900">
                  <div className="absolute inset-0 bg-transparent transition-colors z-10" />
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-103 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  {/* Category overlay badge */}
                  <span className="absolute top-4 left-4 z-20 text-[10px] font-mono tracking-wider uppercase font-semibold text-white bg-accent-sage/90 backdrop-blur px-2.5 py-1 rounded-md">
                    {project.category}
                  </span>
                </div>

                {/* Card Info Box */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3.5">
                      {project.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[10px] font-mono text-slate-750 bg-calm-900 px-2.5 py-0.5 rounded border border-calm-800">
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="text-[10px] font-mono text-slate-500 bg-calm-900 px-2 py-0.5 rounded">
                          +{project.tags.length - 3} more
                        </span>
                      )}
                    </div>

                    <h3 className="font-display text-xl font-bold text-slate-900 mb-2 group-hover:text-accent-sage transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-650 text-sm line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-calm-800 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-accent-sage text-xs font-semibold group-hover:translate-x-1 transition-transform">
                      View Technical Specs
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>

                    <div className="flex items-center gap-3 text-slate-500" onClick={(e) => e.stopPropagation()}>
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-accent-sage transition-colors"
                          aria-label={`${project.title} github repository`}
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Technical Detail Modal Overlay */}
        <AnimatePresence>
          {activeProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-calm-950/80 backdrop-blur-md"
              onClick={() => setActiveProject(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 15 }}
                transition={{ type: 'spring', damping: 25, stiffness: 180 }}
                className="bg-white border border-calm-800 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative scrollbar-none text-left"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveProject(null)}
                  className="absolute top-4 right-4 z-10 bg-white text-slate-500 hover:text-accent-sage hover:bg-slate-50 border border-calm-800 p-2 rounded-full transition-all cursor-pointer"
                  aria-label="Close details modal"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Banner Image */}
                <div className="relative aspect-video w-full bg-calm-900">
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
                  <span className="absolute bottom-6 left-6 text-xs font-mono font-semibold tracking-wider text-white bg-accent-sage px-3 py-1.5 rounded-lg">
                    {activeProject.category}
                  </span>
                </div>

                {/* Modal Content Details */}
                <div className="p-6 sm:p-8">
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                    {activeProject.title}
                  </h3>

                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6">
                    {activeProject.longDescription}
                  </p>

                  {/* Highlights/Key Features */}
                  <div className="mb-8">
                    <h4 className="text-sm font-mono font-semibold text-slate-800 tracking-wider uppercase mb-4 flex items-center gap-2">
                      <Laptop className="w-4 h-4 text-accent-sage" />
                      Key Implementation Goals
                    </h4>
                    <ul className="space-y-3">
                      {activeProject.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-slate-700 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-accent-sage mt-0.5 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack tags */}
                  <div className="mb-8">
                    <h4 className="text-sm font-mono font-semibold text-slate-800 tracking-wider uppercase mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-accent-gold" />
                      Architectural Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.techStack.map(tech => (
                        <span key={tech} className="text-xs font-mono text-accent-sage bg-accent-sage/5 border border-accent-sage/20 px-3 py-1 rounded-lg">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {activeProject.id === 'currency-converter-mobile' && (
                    <div className="mb-8 pt-6 border-t border-slate-100">
                      <CurrencyCountEmulator />
                    </div>
                  )}

                  {activeProject.id === 'lyra-app' && (
                    <div className="mb-8 pt-6 border-t border-slate-100">
                      <LyraEmulator />
                    </div>
                  )}

                  {activeProject.id === 'talentlens-ai' && (
                    <div className="mb-8 pt-6 border-t border-slate-100">
                      <TalentLensEmulator />
                    </div>
                  )}

                  {/* Action links */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-calm-800">
                    {activeProject.githubUrl && (
                      <a
                        href={activeProject.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-accent-sage hover:bg-accent-sage/95 text-white font-semibold py-3.5 rounded-xl transition-all text-center text-sm shadow-md shadow-accent-sage/10 cursor-pointer"
                      >
                        <Github className="w-4 h-4" />
                        Explore Repository
                      </a>
                    )}
                    <button
                      onClick={() => setActiveProject(null)}
                      className="flex-1 flex items-center justify-center bg-white hover:bg-slate-50 text-slate-750 border border-calm-800 font-semibold py-3.5 rounded-xl transition-all text-center text-sm cursor-pointer"
                    >
                      Close Specs
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
