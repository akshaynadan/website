import { motion } from 'motion/react';
import { SKILLS } from '../data';
import { Code, Brain, Cpu, Cloud, ToggleRight } from 'lucide-react';

export default function Skills() {
  // Select 5 key prominent high-impact skills
  const coreSkills = SKILLS.filter(skill => 
    skill.name === "Python" ||
    skill.name === "Artificial Intelligence" ||
    skill.name === "Android App Development" ||
    skill.name === "IoT Platform Integration" ||
    skill.name === "Cloud Computing (AWS)"
  ).slice(0, 5);

  // Resolves skill category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Languages & Core': return <Code className="text-accent-sage w-4 h-4" />;
      case 'AI, ML & Data': return <Brain className="text-accent-gold w-4 h-4" />;
      case 'Mobile & IoT': return <Cpu className="text-accent-sage w-4 h-4" />;
      case 'Cloud & Tools': return <Cloud className="text-accent-gold w-4 h-4" />;
      default: return <ToggleRight className="text-accent-sage w-4 h-4" />;
    }
  };

  return (
    <section id="skills" className="py-16 bg-calm-900 relative">
      {/* Soft calming dividers */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-calm-800 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-calm-800 to-transparent" />

      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="font-display text-xs font-semibold tracking-wider text-accent-sage uppercase mb-2">
            Expertise
          </h2>
          <p className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Core Technology Stack
          </p>
          <div className="w-10 h-0.5 bg-accent-sage mx-auto mt-3 rounded-full" />
        </div>

        {/* Compact Core Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {coreSkills.map((skill, index) => {
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white border border-calm-800 hover:border-calm-700 rounded-xl p-4 transition-all duration-300 group shadow-md relative overflow-hidden text-left"
              >
                {/* Soft top-right ambient flare */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-accent-sage/3 rounded-full blur-xl pointer-events-none group-hover:bg-accent-sage/6 transition-colors" />

                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-2 rounded-lg bg-calm-900 border border-calm-800 group-hover:bg-calm-800/80 transition-colors shrink-0">
                    {getCategoryIcon(skill.category)}
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-slate-900 transition-colors truncate">
                    {skill.name}
                  </span>
                </div>

                {/* Progress bar container */}
                <div className="w-full bg-calm-900 rounded-full h-1.5 overflow-hidden border border-calm-800/40">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-accent-sage to-accent-gold rounded-full"
                  />
                </div>

                <div className="flex items-center justify-between mt-2 text-[9px] text-slate-500 font-mono">
                  <span>Proficiency</span>
                  <span className="text-accent-sage font-semibold">{skill.level}%</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
