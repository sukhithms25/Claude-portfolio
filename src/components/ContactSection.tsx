import React, { useState, useEffect, useRef } from 'react';
import { 
  Mail, 
  MapPin, 
  Download, 
  Send, 
  CheckCircle2, 
  Loader2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons';
import { useInViewAnimation } from '../hooks/useInViewAnimation';
import { isPostHogConfigured, posthog } from '../lib/posthog';

// ─── Data ─────────────────────────────────────────────────────────────────────

const RESUME_EXISTS = true;
const RESUME_HREF = '/Sukhith_MS_Resume_Klanvision.pdf';

const contactLinks = [
  {
    id: 'linkedin',
    icon: LinkedinIcon,
    label: 'LinkedIn',
    display: 'linkedin.com/in/sukhith-m-s',
    href: 'https://linkedin.com/in/sukhith-m-s-324487382',
    accent: '#F05A17',
    description: 'Professional profile & network',
  },
  {
    id: 'github',
    icon: GithubIcon,
    label: 'GitHub',
    display: 'github.com/sukhithms25',
    href: 'https://github.com/sukhithms25',
    accent: '#F05A17',
    description: 'Source code & autonomous agents',
  },
  {
    id: 'email',
    icon: Mail,
    label: 'Email',
    display: 'sukhithms25@gmail.com',
    accent: '#F05A17',
    description: 'Direct email & conversation',
  },
];

// Helper to scroll to conversation and focus message input
export const focusConversationSection = () => {
  const el = document.getElementById('contact');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      const messageInput = document.getElementById('conversation-message') as HTMLTextAreaElement | null;
      if (messageInput) {
        messageInput.focus();
        messageInput.classList.add('ring-2', 'ring-[#F05A17]');
        setTimeout(() => {
          messageInput.classList.remove('ring-2', 'ring-[#F05A17]');
        }, 1500);
      }
    }, 500);
  }
};

// ─── Main Section ─────────────────────────────────────────────────────────────

export const ContactSection: React.FC = () => {
  const { ref: titleRef, inView: titleInView } = useInViewAnimation(0.1);
  const { ref: ctaRef, inView: ctaInView } = useInViewAnimation(0.1);
  const { ref: formRef, inView: formInView } = useInViewAnimation(0.1);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    hp: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const handleTrigger = () => {
      focusConversation();
    };
    window.addEventListener('open-conversation', handleTrigger);
    return () => window.removeEventListener('open-conversation', handleTrigger);
  }, []);

  const handleCopyEmail = () => {
    if (isPostHogConfigured) {
      posthog.capture('contact_email_copied');
    }
    navigator.clipboard.writeText('sukhithms25@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const focusConversation = () => {
    if (messageInputRef.current) {
      messageInputRef.current.focus();
      messageInputRef.current.classList.add('ring-2', 'ring-[#F05A17]');
      setTimeout(() => {
        messageInputRef.current?.classList.remove('ring-2', 'ring-[#F05A17]');
      }, 1500);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent accidental duplicate submissions
    if (status === 'sending') {
      return;
    }

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedSubject = formData.subject.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedSubject || !trimmedMessage) {
      setErrorMessage('Please fill in all required fields.');
      setStatus('error');
      return;
    }

    // Client-side email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage('Please enter a valid email address.');
      setStatus('error');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          subject: trimmedSubject,
          message: trimmedMessage,
          hp: formData.hp,
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success) {
        if (isPostHogConfigured) {
          posthog.capture('contact_message_sent');
        }
        setStatus('success');
        // Clear form values only on confirmed server delivery
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          hp: '',
        });
      } else {
        if (isPostHogConfigured) {
          posthog.capture('contact_message_failed');
        }
        setStatus('error');
        setErrorMessage(
          data?.error ||
          'Your message could not be sent. Please try again later or contact me directly by email.'
        );
      }
    } catch {
      if (isPostHogConfigured) {
        posthog.capture('contact_message_failed');
      }
      setStatus('error');
      setErrorMessage(
        'Your message could not be sent. Please try again later or contact me directly by email.'
      );
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#03070B]">
      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full pointer-events-none opacity-[0.06]"
        style={{ background: 'radial-gradient(ellipse at center, #F05A17 0%, transparent 70%)' }}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`mb-16 ${titleInView ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          <span className="text-xs font-mono tracking-widest uppercase mb-2 block text-[#F05A17]">
            05 / DIRECT CONVERSATION &amp; CONTACT
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-accent font-semibold text-white tracking-tight">
            Let's start a <span className="gradient-text">conversation.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#A8A29C] mt-2 max-w-xl font-sans">
            Type and send your message directly from here — delivers straight to my inbox without opening an external mail app.
          </p>
          <div className="section-divider mt-4 max-w-xs" />
        </div>

        {/* Two-column layout: Info/Links Left, Interactive Conversation Form Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Context & Verified Profiles (5 cols) */}
          <div
            ref={ctaRef as React.RefObject<HTMLDivElement>}
            className={`lg:col-span-5 space-y-6 ${ctaInView ? 'animate-fade-in-left' : 'opacity-0'}`}
          >
            {/* Positioning card */}
            <div className="rounded-2xl glass-dark border border-[#1D2125] p-6 sm:p-7">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={16} className="text-[#F05A17]" />
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-white">
                  Available for Engineering Roles
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans mb-5">
                Computer Science undergraduate at MIT Mysore (Class of 2027). Actively seeking
                impact-driven internships and technical positions in autonomous AI agents, local LLM
                runtimes, and scalable full-stack backends.
              </p>

              {/* Resume download */}
              {RESUME_EXISTS && (
                <div className="mt-2">
                  <a
                    href={RESUME_HREF}
                    download
                    className="w-full inline-flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-mono font-medium border border-[#1D2125] bg-[#101418] text-[#E6E3DF] hover:border-[#F05A17] hover:text-white transition-all duration-200"
                  >
                    <Download size={13} className="text-[#F05A17]" />
                    <span>Download Technical Resume PDF</span>
                  </a>
                </div>
              )}
            </div>

            {/* Social & Contact channels */}
            <div className="space-y-3">
              {contactLinks.map((item) => {
                const Icon = item.icon;

                if (item.id === 'email') {
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        focusConversation();
                        handleCopyEmail();
                      }}
                      className="w-full text-left group flex items-center gap-4 rounded-2xl glass-dark border border-[#1D2125] hover:border-[#F05A17]/40 transition-all duration-300 p-4 cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-[#101418] border border-[#1D2125]">
                        <Icon size={16} style={{ color: item.accent }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-[#A8A29C]">
                          {item.label}
                        </div>
                        <div className="text-xs sm:text-sm font-medium text-[#E6E3DF] truncate group-hover:text-white transition-colors flex items-center gap-2">
                          <span>{item.display}</span>
                          {copiedEmail && (
                            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                              Copied!
                            </span>
                          )}
                        </div>
                      </div>
                      <ArrowRight
                        size={14}
                        className="shrink-0 text-slate-500 group-hover:text-[#F05A17] group-hover:translate-x-0.5 transition-all duration-200"
                      />
                    </button>
                  );
                }

                return (
                  <a
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      if (isPostHogConfigured) {
                        posthog.capture('contact_channel_opened', { channel: item.id });
                      }
                    }}
                    className="group flex items-center gap-4 rounded-2xl glass-dark border border-[#1D2125] hover:border-[#F05A17]/40 transition-all duration-300 p-4"
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-[#101418] border border-[#1D2125]">
                      <Icon size={16} style={{ color: item.accent }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-[#A8A29C]">
                        {item.label}
                      </div>
                      <div className="text-xs sm:text-sm font-medium text-[#E6E3DF] truncate group-hover:text-white transition-colors">
                        {item.display}
                      </div>
                    </div>
                    <ArrowRight
                      size={14}
                      className="shrink-0 text-slate-500 group-hover:text-[#F05A17] group-hover:translate-x-0.5 transition-all duration-200"
                    />
                  </a>
                );
              })}
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-xs font-mono text-[#A8A29C] px-2">
              <MapPin size={12} className="text-[#F05A17]" />
              Mysore, India · IST (UTC +5:30)
            </div>
          </div>

          {/* Right Column: Direct In-Page Conversation Section (7 cols) */}
          <div
            ref={formRef as React.RefObject<HTMLDivElement>}
            className={`lg:col-span-7 ${formInView ? 'animate-fade-in-right' : 'opacity-0'}`}
          >
            <div className="rounded-2xl glass-dark border border-[#1D2125] p-6 sm:p-8 relative shadow-2xl">
              {/* Conversation Header with Live Status & Intro */}
              <div className="mb-6 pb-5 border-b border-[#1D2125]">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src="/profile.png"
                      alt="Sukhith M S"
                      className="w-10 h-10 rounded-full object-cover border border-[#F05A17]/50"
                      onError={(e) => {
                        // Fallback to jpg if png not found
                        (e.target as HTMLImageElement).src = '/profile.jpg';
                      }}
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#03070B]" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-serif-accent font-semibold text-white leading-none">
                      Conversation with Sukhith
                    </h3>
                    <p className="text-[11px] text-emerald-400 font-mono mt-1 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Online · Delivers to primary inbox
                    </p>
                  </div>
                </div>
              </div>

              {status === 'success' ? (
                /* Success Feedback */
                <div className="py-10 text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={28} className="text-emerald-400" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">Message Sent!</h4>
                  <p className="text-sm text-slate-300 font-sans max-w-sm mx-auto mb-6">
                    Message sent successfully. Thank you for reaching out.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus('idle');
                      setErrorMessage('');
                    }}
                    className="px-6 py-2.5 rounded-xl text-xs font-mono font-medium bg-[#101418] text-white border border-[#1D2125] hover:border-[#F05A17] transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                /* Conversation Form */
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot anti-spam field */}
                  <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                    <label htmlFor="sender-hp">Leave this empty</label>
                    <input
                      id="sender-hp"
                      type="text"
                      name="hp"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.hp}
                      onChange={(e) => setFormData({ ...formData, hp: e.target.value })}
                    />
                  </div>

                  {/* Name and Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="sender-name"
                        className="block text-xs font-mono uppercase tracking-wider text-[#A8A29C] mb-1.5"
                      >
                        Your Name <span className="text-[#F05A17]">*</span>
                      </label>
                      <input
                        id="sender-name"
                        type="text"
                        required
                        maxLength={100}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Johnson"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#101418] border border-[#1D2125] text-sm text-[#E6E3DF] placeholder-[#A8A29C]/40 focus:outline-none focus:border-[#F05A17] focus:ring-1 focus:ring-[#F05A17] transition-all font-sans"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="sender-email"
                        className="block text-xs font-mono uppercase tracking-wider text-[#A8A29C] mb-1.5"
                      >
                        Your Email <span className="text-[#F05A17]">*</span>
                      </label>
                      <input
                        id="sender-email"
                        type="email"
                        required
                        maxLength={254}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#101418] border border-[#1D2125] text-sm text-[#E6E3DF] placeholder-[#A8A29C]/40 focus:outline-none focus:border-[#F05A17] focus:ring-1 focus:ring-[#F05A17] transition-all font-sans"
                      />
                    </div>
                  </div>

                  {/* Subject Input */}
                  <div>
                    <label
                      htmlFor="sender-subject"
                      className="block text-xs font-mono uppercase tracking-wider text-[#A8A29C] mb-1.5"
                    >
                      Subject <span className="text-[#F05A17]">*</span>
                    </label>
                    <input
                      id="sender-subject"
                      type="text"
                      required
                      maxLength={150}
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Collaboration, Opportunity, Question..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#101418] border border-[#1D2125] text-sm text-[#E6E3DF] placeholder-[#A8A29C]/40 focus:outline-none focus:border-[#F05A17] focus:ring-1 focus:ring-[#F05A17] transition-all font-sans"
                    />
                  </div>

                  {/* Message Body */}
                  <div>
                    <label
                      htmlFor="conversation-message"
                      className="block text-xs font-mono uppercase tracking-wider text-[#A8A29C] mb-1.5"
                    >
                      Message <span className="text-[#F05A17]">*</span>
                    </label>
                    <textarea
                      ref={messageInputRef}
                      id="conversation-message"
                      required
                      maxLength={5000}
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Type your message here directly..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#101418] border border-[#1D2125] text-sm text-[#E6E3DF] placeholder-[#A8A29C]/40 focus:outline-none focus:border-[#F05A17] focus:ring-1 focus:ring-[#F05A17] transition-all font-sans resize-none"
                    />
                  </div>

                  {/* Error Notification */}
                  {status === 'error' && (
                    <div className="p-3.5 rounded-xl bg-red-950/30 border border-red-500/30 text-xs font-mono text-red-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <span>{errorMessage || 'Your message could not be sent. Please try again later or contact me directly by email.'}</span>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="underline text-white font-semibold cursor-pointer shrink-0"
                      >
                        Copy sukhithms25@gmail.com
                      </button>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full py-3.5 px-6 rounded-xl font-medium text-sm text-white bg-[#F05A17] hover:bg-[#FF7A1A] disabled:opacity-60 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#F05A17]/20 group cursor-pointer"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Delivering to Sukhith's Inbox...</span>
                      </>
                    ) : (
                      <>
                        <Send size={15} className="group-hover:translate-x-0.5 transition-transform" />
                        <span>Send Message Directly</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer rule */}
        <div className="mt-20 pt-8 border-t border-[#1D2125] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[11px] font-mono text-slate-500">
            © 2026 Sukhith M S. Built with React + Vite + TypeScript.
          </span>
          <span className="text-[11px] font-mono text-slate-500">
            B.E. Computer Science &amp; Engineering · MIT Mysore · 2027
          </span>
        </div>
      </div>
    </section>
  );
};
