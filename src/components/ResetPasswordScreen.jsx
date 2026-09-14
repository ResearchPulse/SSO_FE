'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Button from '../shared/ui/components/Button';
import { api } from '../lib/api';
import AuthBrandPanel from './AuthBrandPanel';

function LockIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5.5" y="10" width="13" height="10" rx="2" /><path d="M8.5 10V7.5a3.5 3.5 0 0 1 7 0V10" /></svg>;
}

function EyeIcon({ hidden }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true">{hidden ? <path d="m3 3 18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.2A10.7 10.7 0 0 1 12 5c5.2 0 9 5 9 7s-3.8 7-9 7a10 10 0 0 1-5.1-1.4M5.3 7.1C3.8 8.4 3 10.1 3 12c0 1.1 1 2.8 2.5 4.4" /> : <><path d="M3 12s3.2-7 9-7 9 7 9 7-3.2 7-9 7-9-7-9-7Z" /><circle cx="12" cy="12" r="2.5" /></>}</svg>;
}

function ArrowIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M10.5 4.5 16 10l-5.5 5.5" /></svg>;
}

export default function ResetPasswordScreen() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState('error');
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    if (!token) {
      setStatusType('error');
      return setStatus('This password reset link is invalid or missing its token.');
    }
    if (!password || !confirmation) {
      setStatusType('error');
      return setStatus('Please complete both password fields.');
    }
    if (password.length < 8) {
      setStatusType('error');
      return setStatus('Your password must be at least 8 characters.');
    }
    if (password !== confirmation) {
      setStatusType('error');
      return setStatus('The passwords do not match.');
    }

    setStatus('');
    setLoading(true);
    try {
      const response = await api.resetPassword({ token, newPassword: password });
      setStatusType('success');
      setStatus(response.message || 'Password reset successfully. Please sign in with your new password.');
      setCompleted(true);
    } catch (error) {
      setStatusType('error');
      setStatus(error.message || 'Unable to reset your password. Please request a new reset link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page auth-page--reference reset-page">
      <div className="auth-frame">
        <AuthBrandPanel
          ariaLabel="Hyperdata Lab password reset"
          heading={<>Secure.<br />Reset. Continue.</>}
          description="Set a new password and return to the research, publications, and insights in your account."
        />
        <section className="form-panel" aria-labelledby="reset-title">
          <div className="form-topline">Remembered your password? <Link href="/">Sign in</Link></div>
          <div className="form-shell">
            <div className="form-heading"><h2 id="reset-title">Create a new password</h2><p>Choose a strong password for your Hyperdata Lab account.</p></div>
            {completed ? (
              <>
                <div className={`status-message is-${statusType}`} role="status">{status}</div>
                <Link className="primary-button reset-login-link" href="/">Continue to sign in<ArrowIcon /></Link>
              </>
            ) : (
              <form onSubmit={submit} noValidate>
                <div className="field-group reference-field"><label htmlFor="new-password">New password</label><div className="input-with-icon password-wrap"><LockIcon /><input id="new-password" name="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => { setPassword(event.target.value); setStatus(''); }} placeholder="Enter your new password" autoComplete="new-password" /><button type="button" className="icon-button" aria-label={showPassword ? 'Hide new password' : 'Show new password'} onClick={() => setShowPassword((value) => !value)}><EyeIcon hidden={showPassword} /></button></div></div>
                <div className="field-group reference-field"><label htmlFor="confirm-password">Confirm password</label><div className="input-with-icon password-wrap"><LockIcon /><input id="confirm-password" name="confirmation" type={showConfirmation ? 'text' : 'password'} value={confirmation} onChange={(event) => { setConfirmation(event.target.value); setStatus(''); }} placeholder="Re-enter your new password" autoComplete="new-password" /><button type="button" className="icon-button" aria-label={showConfirmation ? 'Hide password confirmation' : 'Show password confirmation'} onClick={() => setShowConfirmation((value) => !value)}><EyeIcon hidden={showConfirmation} /></button></div></div>
                {status && <div className={`status-message is-${statusType}`} role={statusType === 'error' ? 'alert' : 'status'}>{status}</div>}
                <Button type="submit" variant="primary" className="primary-button" loading={loading}>Reset password<ArrowIcon /></Button>
              </form>
            )}
            <p className="form-legal">Use at least 8 characters, including a mix of letters and numbers.</p>
          </div>
          <footer className="form-footer"><a href="#terms">Terms</a><a href="#privacy">Privacy</a><a href="#help">Help</a></footer>
        </section>
      </div>
    </main>
  );
}
