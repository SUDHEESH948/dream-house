'use client';
import { useState, type FormEvent } from 'react';

export function ContactForm() {
  const [draft, setDraft] = useState('');
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState('');
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const text = `Dream House — Project inquiry\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nProject: ${data.get('type')}\nLocation: ${data.get('location')}\n\n${data.get('message')}`;
    setDraft(text); setStatus('Your inquiry is ready. Open the email draft below, review it, and send it to DreamHouse.'); setCopied(false);
  }
  return <form onSubmit={submit} className="inquiry-form">
    <div className="form-grid"><label>Your name<input name="name" autoComplete="name" required maxLength={100} placeholder="Full name" /></label>
      <label>Email address<input name="email" type="email" autoComplete="email" required maxLength={200} placeholder="you@example.com" /></label></div>
    <div className="form-grid"><label>Project type<select name="type" required defaultValue=""><option value="" disabled>Select a service</option><option>Civil Engineering Consulting</option><option>Interior & Exterior Designing</option><option>Structural Designing</option><option>AutoCAD & 3D Studio</option></select></label>
      <label>Project location<input name="location" required maxLength={200} placeholder="City / region" /></label></div>
    <label>Tell us about your vision<textarea name="message" required minLength={20} maxLength={5000} rows={5} placeholder="The space you imagine, its context, and your ideal timeline…" /></label>
    <p className="form-note" id="privacy">Your inquiry is prepared in your browser. Nothing is sent until you choose to send it from your email app.</p>
    <button className="form-submit" type="submit">Prepare inquiry <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></button>
    <p role="status" className="form-note">{status}</p>
    {draft && <div className="inquiry-draft"><label>Your inquiry<textarea rows={8} readOnly value={draft} /></label><a className="form-submit" href={`mailto:dreamhousesby@gmail.com?subject=${encodeURIComponent('DreamHouse — Project inquiry')}&body=${encodeURIComponent(draft)}`}>Open email draft</a><button type="button" className="form-submit" onClick={async () => { try { await navigator.clipboard.writeText(draft); setCopied(true); } catch { setStatus('Select the draft text and copy it manually.'); } }}>{copied ? 'Copied' : 'Copy inquiry'}</button></div>}
    <p className="form-note" id="terms">Project scope, fees and terms are agreed with the studio before any engagement.</p>
  </form>;
}
