/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-calm-950 font-sans text-slate-900 antialiased selection:bg-accent-sage/20 selection:text-accent-sage">
      {/* Interactive global navigation header */}
      <Header />

      {/* Main content body stacked semantically */}
      <main>
        {/* Dynamic hero landing */}
        <Hero />

        {/* Technical expertise overview */}
        <Skills />

        {/* Portfolio gallery grids */}
        <Projects />

        {/* Background career track */}
        <Experience />

        {/* Messaging contact portal */}
        <Contact />
      </main>

      {/* Clean minimal signature footer */}
      <Footer />
    </div>
  );
}
