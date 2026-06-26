import React, { useState } from 'react';
import { Mail, MapPin, Phone, Github, Linkedin, Send, CheckCircle, Clock } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Please fill out all required fields.');
      return;
    }

    // Submit state simulation
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-calm-950 relative">
      {/* Back glow */}
      <div className="absolute bottom-0 inset-x-0 h-96 bg-accent-sage/2 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-xs font-semibold tracking-wider text-accent-sage uppercase mb-3">
            Get In Touch
          </h2>
          <p className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Contact & Collaboration
          </p>
          <div className="w-12 h-1 bg-accent-sage mx-auto mt-4 rounded-full" />
          <p className="text-slate-650 mt-4 text-sm sm:text-base">
            Have a technical inquiry, research discussion, or collaboration query? Reach out anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Personal Contact Information cards */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <h3 className="font-display text-xl font-bold text-slate-900 mb-6">
              Details
            </h3>

            {/* Email Card */}
            <div className="flex items-start gap-4 p-5 bg-white border border-calm-800 rounded-2xl group hover:border-accent-sage/50 transition-all shadow-sm">
              <div className="p-3 bg-accent-sage/10 text-accent-sage rounded-xl">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">Email</h4>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-slate-600 hover:text-accent-sage transition-colors text-sm mt-1 block"
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>
            </div>

            {/* Phone Card */}
            <div className="flex items-start gap-4 p-5 bg-white border border-calm-800 rounded-2xl group hover:border-accent-sage/50 transition-all shadow-sm">
              <div className="p-3 bg-accent-gold/10 text-accent-gold rounded-xl">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">Call/WhatsApp</h4>
                <a
                  href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                  className="text-slate-600 hover:text-accent-gold transition-colors text-sm mt-1 block font-mono"
                >
                  {PERSONAL_INFO.phone}
                </a>
              </div>
            </div>

            {/* Location Card */}
            <div className="flex items-start gap-4 p-5 bg-white border border-calm-800 rounded-2xl group hover:border-accent-sage/50 transition-all shadow-sm">
              <div className="p-3 bg-accent-sage/10 text-accent-sage rounded-xl">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">Location</h4>
                <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
                  {PERSONAL_INFO.address}
                </p>
              </div>
            </div>

            {/* Response speed Card */}
            <div className="flex items-start gap-4 p-5 bg-white border border-calm-800 rounded-2xl shadow-sm">
              <div className="p-3 bg-accent-gold/10 text-accent-gold rounded-xl">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">Response Time</h4>
                <p className="text-slate-600 text-sm mt-1">
                  Usually replies within 24 hours.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic submission form */}
          <div className="lg:col-span-7 bg-white border border-calm-800 rounded-3xl p-6 sm:p-8 shadow-md">
            {isSuccess ? (
              <div className="text-center py-12 flex flex-col items-center justify-center">
                <CheckCircle className="w-16 h-16 text-accent-sage animate-bounce mb-4" />
                <h3 className="font-display text-2xl font-bold text-slate-900 mb-2">
                  Message Dispatched!
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
                  Thank you, Akshay will read your inquiry and follow up shortly at your provided email.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="bg-accent-sage hover:bg-accent-sage/90 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-xs font-mono tracking-wider uppercase text-slate-600 font-medium">
                      Your Name <span className="text-accent-sage">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-calm-950 border border-calm-800 text-slate-900 rounded-xl px-4 py-3 text-sm transition-all focus:border-accent-sage focus:bg-white"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-xs font-mono tracking-wider uppercase text-slate-600 font-medium">
                      Your Email <span className="text-accent-sage">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-calm-950 border border-calm-800 text-slate-900 rounded-xl px-4 py-3 text-sm transition-all focus:border-accent-sage focus:bg-white"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-xs font-mono tracking-wider uppercase text-slate-600 font-medium">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Project / Program inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-calm-950 border border-calm-800 text-slate-900 rounded-xl px-4 py-3 text-sm transition-all focus:border-accent-sage focus:bg-white"
                  />
                </div>

                {/* Message Input */}
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-xs font-mono tracking-wider uppercase text-slate-600 font-medium">
                    Message <span className="text-accent-sage">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Describe your project, timeline, or research topic..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-calm-950 border border-calm-800 text-slate-900 rounded-xl px-4 py-3 text-sm transition-all resize-none focus:border-accent-sage focus:bg-white"
                  />
                </div>

                {errorMessage && (
                  <p id="form-error" className="text-xs text-red-550 font-mono">
                    {errorMessage}
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-accent-sage hover:bg-accent-sage/90 disabled:bg-calm-850 text-white disabled:text-slate-500 font-semibold py-3.5 rounded-xl transition-all duration-200 transform hover:scale-[1.01] shadow-lg shadow-accent-sage/15 cursor-pointer text-sm"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Dispatching...
                    </span>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
