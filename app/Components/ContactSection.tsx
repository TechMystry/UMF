'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, CheckCircle, X } from 'lucide-react';

type FormState = {
  name: string;
  email: string;
  topic: string;
  message: string;
};

export default function ContactSection() {
  // form state
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    topic: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // basic validation
  const validate = (data: FormState) => {
    const e: Partial<FormState> = {};
    if (!data.name.trim()) e.name = 'Please enter your full name.';
    if (!data.email.trim()) e.email = 'Please enter an email address.';
    else if (!/^\S+@\S+\.\S+$/.test(data.email)) e.email = 'Please enter a valid email.';
    if (!data.topic) e.topic = 'Please select a topic.';
    if (!data.message.trim() || data.message.trim().length < 10) e.message = 'Message must be at least 10 characters.';
    return e;
  };

  // replace this with your real API call
  const sendMessage = async (payload: FormState) => {
    // simulate network latency & success/failure
    await new Promise((r) => setTimeout(r, 900));
    // For actual usage, do:
    // const res = await fetch('/api/contact', { method: 'POST', headers: {'content-type':'application/json'}, body: JSON.stringify(payload) })
    // if (!res.ok) throw new Error('Failed to send');
    return { ok: true };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    setServerError(null);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length) return;

    try {
      setSending(true);
      const res = await sendMessage(form);
      setSending(false);

      if (res.ok) {
        setSuccess(true);
        setForm({ name: '', email: '', topic: '', message: '' });
        setTimeout(() => setSuccess(false), 4000);
      } else {
        setServerError('Unable to send message. Try again later.');
      }
    } catch (err) {
      setSending(false);
      setServerError('Network error. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* LEFT: Info panel */}
          <aside className="rounded-lg border border-gray-100 shadow-sm p-8 bg-emerald-50">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-emerald-600 text-white">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Get in touch</h3>
                <p className="text-sm text-gray-600 mt-1 max-w-sm">
                  We’re here to help — contact us about Zakat, donations, volunteering or partnerships.
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <Phone className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Phone</div>
                  <div className="text-sm text-gray-600">(+91) 9420781681</div>
                  <div className="text-xs text-gray-400 mt-1">Mon — Fri, 9:00 — 18:00</div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <Mail className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Email</div>
                  <div className="text-sm text-gray-600">info@universalmuslimfoundation.org</div>
                  <div className="text-xs text-gray-400 mt-1">We reply within 24 hours</div>
                </div>
              </div>

              {/* Zakat specialist */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <Clock className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Zakat Assistance</div>
                  <div className="text-sm text-gray-600">zakat@universalmuslimfoundation.org</div>
                  <div className="text-xs text-gray-400 mt-1">Specialized help and calculations</div>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t pt-6">
              <div className="text-sm text-gray-700">Office</div>
              <div className="text-sm text-gray-500 mt-1">Mohol, Solapur, Maharashtra, India</div>
            </div>
          </aside>

          {/* RIGHT: Form */}
          <div className="rounded-lg border border-gray-100 shadow-sm p-8 bg-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Send a message</h2>
                <p className="text-sm text-gray-500 mt-1">Fill out the form and we’ll respond as soon as possible.</p>
              </div>

              <div className="hidden sm:flex items-center text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="text-xs font-medium text-gray-400">Security</div>
                  <div className="text-xs px-2 py-1 rounded-full bg-gray-50 border border-gray-100 text-gray-600">GDPR</div>
                </div>
              </div>
            </div>

            <form onSubmit={onSubmit} className="mt-6 space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full name</label>
                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 ${
                      errors.name ? 'border-rose-400' : 'border-gray-200'
                    }`}
                    placeholder="Your full name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && <p id="name-error" className="mt-1 text-xs text-rose-600">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 ${
                      errors.email ? 'border-rose-400' : 'border-gray-200'
                    }`}
                    placeholder="you@domain.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && <p id="email-error" className="mt-1 text-xs text-rose-600">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="topic" className="block text-sm font-medium text-gray-700">Topic</label>
                <select
                  id="topic"
                  name="topic"
                  value={form.topic}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 ${
                    errors.topic ? 'border-rose-400' : 'border-gray-200'
                  }`}
                  aria-invalid={!!errors.topic}
                  aria-describedby={errors.topic ? 'topic-error' : undefined}
                >
                  <option value="">Select a topic</option>
                  <option value="zakat">Zakat calculation & payment</option>
                  <option value="donation">General donation</option>
                  <option value="volunteer">Volunteer opportunities</option>
                  <option value="partnership">Partnership inquiry</option>
                  <option value="other">Other</option>
                </select>
                {errors.topic && <p id="topic-error" className="mt-1 text-xs text-rose-600">{errors.topic}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 ${
                    errors.message ? 'border-rose-400' : 'border-gray-200'
                  }`}
                  placeholder="Provide a brief description (what you'd like help with)..."
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && <p id="message-error" className="mt-1 text-xs text-rose-600">{errors.message}</p>}
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-md font-semibold shadow-sm transition disabled:opacity-60"
                  aria-live="polite"
                >
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/10">
                    <Send className={`w-4 h-4 ${sending ? 'animate-spin' : ''}`} />
                  </span>
                  <span>{sending ? 'Sending...' : 'Send message'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setForm({ name: '', email: '', topic: '', message: '' }); setErrors({}); setServerError(null); }}
                  className="px-4 py-2 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
                >
                  Reset
                </button>

                <div className="ml-auto text-sm text-gray-500 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Secure & private</span>
                </div>
              </div>

              {/* server error or success */}
              <div aria-live="assertive" className="mt-3">
                {serverError && (
                  <div className="inline-flex items-start gap-3 bg-rose-50 border border-rose-100 text-rose-700 px-4 py-3 rounded-md">
                    <X className="w-5 h-5" />
                    <div className="text-sm">{serverError}</div>
                  </div>
                )}

                {success && (
                  <div className="inline-flex items-start gap-3 bg-emerald-50 border border-emerald-100 text-emerald-700 px-4 py-3 rounded-md">
                    <CheckCircle className="w-5 h-5" />
                    <div className="text-sm">Thanks — your message has been sent. We’ll contact you shortly.</div>
                  </div>
                )}
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
