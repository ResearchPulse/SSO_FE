'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Button from '../shared/ui/components/Button';
import { api, API_BASE } from '../lib/api';
import AuthBrandPanel from './AuthBrandPanel';
import {
  buildAuthorizeUrl,
  clearOidcContext,
  getOidcContext,
  saveOidcContext,
} from '../lib/oidc';

function MailIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><path d="m4.5 7 7.5 6 7.5-6" /></svg>;
}

function LockIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5.5" y="10" width="13" height="10" rx="2" /><path d="M8.5 10V7.5a3.5 3.5 0 0 1 7 0V10" /></svg>;
}

function GoogleIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.35 12.23c0-.73-.07-1.43-.23-2.1H12v3.97h5.23a4.48 4.48 0 0 1-1.94 2.93v2.43h3.14c1.84-1.69 2.92-4.18 2.92-7.23Z" /><path fill="#34A853" d="M12 21.63c2.63 0 4.84-.87 6.45-2.37l-3.14-2.43c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.28v2.5A9.74 9.74 0 0 0 12 21.63Z" /><path fill="#FBBC05" d="M6.53 13.72a5.84 5.84 0 0 1 0-3.44v-2.5H3.28a9.74 9.74 0 0 0 0 8.44l3.25-2.5Z" /><path fill="#EA4335" d="M12 6.25c1.43 0 2.72.49 3.73 1.46l2.8-2.8C16.83 3.34 14.62 2.37 12 2.37a9.74 9.74 0 0 0-8.72 5.41l3.25 2.5C7.3 7.97 9.46 6.25 12 6.25Z" /></svg>;
}

function EyeIcon({ hidden }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true">{hidden ? <path d="m3 3 18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.2A10.7 10.7 0 0 1 12 5c5.2 0 9 5 9 7s-3.8 7-9 7a10 10 0 0 1-5.1-1.4M5.3 7.1C3.8 8.4 3 10.1 3 12c0 1.1 1 2.8 2.5 4.4" /> : <><path d="M3 12s3.2-7 9-7 9 7 9 7-3.2 7-9 7-9-7-9-7Z" /><circle cx="12" cy="12" r="2.5" /></>}</svg>;
}

const queryErrorMessages = {
  google_auth_failed: 'Google sign-in failed.',
  social_auth_failed: 'Unable to authenticate with Google.',
};

export default function AuthScreen() {
  const searchParams = useSearchParams();
  const oidcContext = useMemo(() => getOidcContext(searchParams), [searchParams]);
  const isOidcFlow = Boolean(oidcContext && !oidcContext.invalid);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const queryError = searchParams.get('error');

    if (queryError) {
      clearOidcContext();
      setStatus(queryErrorMessages[queryError] || 'Sign-in failed.');
      setError(true);
      return;
    }

    if (oidcContext?.invalid) {
      clearOidcContext();
      setStatus('Invalid SSO sign-in request.');
      setError(true);
      return;
    }

    if (!isOidcFlow) clearOidcContext();
  }, [isOidcFlow, oidcContext, searchParams]);

  const beginGoogleLogin = () => {
    if (isOidcFlow) saveOidcContext(oidcContext);
    window.location.assign(`${API_BASE}/api/v1/auth/social/google/start`);
  };

  const submit = async (event) => {
    event.preventDefault();
    setStatus('');
    setError(false);

    if (!email.trim() || !password) {
      setStatus('Please enter your email and password.');
      setError(true);
      return;
    }

    if (oidcContext?.invalid) {
      setStatus('Invalid SSO sign-in request.');
      setError(true);
      return;
    }

    setLoading(true);
    try {
      await api.login({ email: email.trim(), password });
      window.location.assign(isOidcFlow ? buildAuthorizeUrl(oidcContext) : '/auth/callback');
    } catch (requestError) {
      const message = requestError.message.toLowerCase().includes('invalid')
        ? 'Invalid email or password.'
        : 'Unable to sign in. Please try again.';
      setStatus(message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return <main className="auth-page auth-page--reference">
    <div className="auth-frame">
      <AuthBrandPanel />
      <section className="form-panel" aria-labelledby="auth-title">
        <div className="form-topline">Don&apos;t have an account? <Link href="/register">Sign up</Link></div>
        <div className="form-shell">
          <div className="form-heading"><h2 id="auth-title">Welcome back</h2><p>Sign in to continue to Hyperdata Lab</p></div>
          <Button type="button" variant="outline" className="sso-button" onClick={beginGoogleLogin}><GoogleIcon /><span>Continue with Google</span></Button>
          <div className="divider"><span>OR</span></div>
          <form onSubmit={submit} noValidate>
            <div className="field-group reference-field"><label htmlFor="email">Email</label><div className="input-with-icon"><MailIcon /><input id="email" name="email" type="email" value={email} onChange={(event) => { setEmail(event.target.value); setStatus(''); setError(false); }} placeholder="Enter your email" autoComplete="email" /></div></div>
            <div className="field-group reference-field"><label htmlFor="password">Password</label><div className="input-with-icon password-wrap"><LockIcon /><input id="password" name="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => { setPassword(event.target.value); setStatus(''); setError(false); }} placeholder="Enter your password" autoComplete="current-password" /><button type="button" className="icon-button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((value) => !value)}><EyeIcon hidden={showPassword} /></button></div><Link className="reference-forgot" href="/forgot-password">Forgot password?</Link></div>
            {status && <div className={`status-message ${error ? 'is-error' : 'is-success'}`} role={error ? 'alert' : 'status'}>{status}</div>}
            <Button type="submit" variant="primary" className="primary-button" loading={loading}>Sign in</Button>
          </form>
        </div>
        <footer className="form-footer"><a href="#terms">Terms</a><a href="#privacy">Privacy</a><a href="#help">Help</a></footer>
      </section>
    </div>
  </main>;
}
