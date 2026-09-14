'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '../shared/ui/components/Button';
import { api } from '../lib/api';
import AuthBrandPanel from './AuthBrandPanel';

function MailIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><path d="m4.5 7 7.5 6 7.5-6" /></svg>; }
function ArrowIcon() { return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M10.5 4.5 16 10l-5.5 5.5" /></svg>; }

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState('error');
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setStatusType('error');
      setStatus('Please enter your account email.');
      return;
    }

    setStatus('');
    setLoading(true);
    try {
      await api.forgotPassword({ email: normalizedEmail });
      setStatusType('success');
      setStatus('If the email exists in our system, password reset instructions have been sent.');
    } catch (error) {
      setStatusType('error');
      setStatus("We couldn't send reset instructions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page auth-page--reference forgot-page">
      <div className="auth-frame">
        <AuthBrandPanel
          ariaLabel="Hyperdata Lab account recovery"
          heading={<>Access.<br />Recover. Continue.</>}
          description="Return to the research, publications, and insights in your account."
        />
        <section className="form-panel" aria-labelledby="forgot-title">
          <div className="form-topline">Remember your password? <Link href="/">Sign in</Link></div>
          <div className="form-shell">
            <div className="form-heading"><h2 id="forgot-title">Forgot password?</h2><p>Enter your account email to receive password reset instructions.</p></div>
            <form onSubmit={submit} noValidate>
              <div className="field-group reference-field"><label htmlFor="recovery-email">Email</label><div className="input-with-icon"><MailIcon /><input id="recovery-email" name="email" type="email" value={email} onChange={(event) => { setEmail(event.target.value); setStatus(''); }} placeholder="Enter your email" autoComplete="email" /></div></div>
              {status && <div className={`status-message is-${statusType}`} role={statusType === 'error' ? 'alert' : 'status'}>{status}</div>}
              <Button type="submit" variant="primary" className="primary-button" loading={loading}>Send reset instructions<ArrowIcon /></Button>
            </form>
            <p className="form-legal">We only use this email to help restore access to your Hyperdata Lab account.</p>
          </div>
          <footer className="form-footer"><a href="#terms">Terms</a><a href="#privacy">Privacy</a><a href="#help">Help</a></footer>
        </section>
      </div>
    </main>
 );
} 
