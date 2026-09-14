'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '../shared/ui/components/Button';
import { api } from '../lib/api';
import AuthBrandPanel from './AuthBrandPanel';

function ArrowIcon() { return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M10.5 4.5 16 10l-5.5 5.5" /></svg>; }
function MailIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><path d="m4.5 7 7.5 6 7.5-6" /></svg>; }
function LockIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5.5" y="10" width="13" height="10" rx="2" /><path d="M8.5 10V7.5a3.5 3.5 0 0 1 7 0V10" /></svg>; }

export default function RegisterScreen() {
  const [form, setForm] = useState({ lastName: '', firstName: '', email: '', password: '', birthDate: '', gender: 'male', terms: false });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const update = (name, value) => { setForm((current) => ({ ...current, [name]: value })); setStatus(''); };

  const submit = async (event) => {
    event.preventDefault();
    if (!form.lastName || !form.firstName || !form.email || !form.password || !form.birthDate || !form.terms) return setStatus('Vui lòng hoàn tất thông tin bắt buộc và đồng ý điều khoản.');
    if (form.password.length < 8) return setStatus('Mật khẩu phải có ít nhất 8 ký tự.');
    setLoading(true);
    try {
      await api.register({ email: form.email.trim(), password: form.password, name: `${form.firstName.trim()} ${form.lastName.trim()}` });
      window.location.assign('/auth/callback');
    } catch (error) { setStatus(error.message); } finally { setLoading(false); }
  };

  return (
    <main className="auth-page auth-page--reference register-page">
      <div className="auth-frame">
        <AuthBrandPanel
          ariaLabel="Hyperdata Lab registration"
          heading={<>Build.<br />Connect. Contribute.</>}
          description="One account for your research, publications, and academic insights."
        />
        <section className="form-panel" aria-labelledby="register-title">
          <div className="form-topline">Already have an account? <Link href="/">Sign in</Link></div>
          <div className="form-shell register-shell">
            <div className="form-heading"><h2 id="register-title">Create your account</h2><p>Set up your Hyperdata Lab profile.</p></div>
            <form onSubmit={submit} noValidate>
              <div className="register-grid register-grid--names">
                <div className="field-group"><label htmlFor="lastName">Last name</label><input id="lastName" value={form.lastName} onChange={(event) => update('lastName', event.target.value)} placeholder="Nguyen" autoComplete="family-name" /></div>
                <div className="field-group"><label htmlFor="firstName">First name</label><input id="firstName" value={form.firstName} onChange={(event) => update('firstName', event.target.value)} placeholder="Van A" autoComplete="given-name" /></div>
              </div>
              <div className="field-group reference-field"><label htmlFor="register-email">Email</label><div className="input-with-icon"><MailIcon /><input id="register-email" type="email" value={form.email} onChange={(event) => update('email', event.target.value)} placeholder="Enter your email" autoComplete="email" /></div></div>
              <div className="field-group reference-field"><label htmlFor="register-password">Password</label><div className="input-with-icon"><LockIcon /><input id="register-password" type="password" value={form.password} onChange={(event) => update('password', event.target.value)} placeholder="Create a password" autoComplete="new-password" /></div></div>
              <div className="register-grid register-grid--details">
                <div className="field-group"><label htmlFor="birthDate">Date of birth</label><input id="birthDate" type="date" value={form.birthDate} onChange={(event) => update('birthDate', event.target.value)} /></div>
                <div className="field-group"><label>Gender</label><div className={`segmented-control ${form.gender === 'female' ? 'is-female' : ''}`}><button type="button" className={form.gender === 'male' ? 'is-selected' : ''} onClick={() => update('gender', 'male')}>Male</button><button type="button" className={form.gender === 'female' ? 'is-selected' : ''} onClick={() => update('gender', 'female')}>Female</button></div></div>
              </div>
              <label className="terms-row"><input type="checkbox" checked={form.terms} onChange={(event) => update('terms', event.target.checked)} /><span className="checkmark" /><span>I agree to the <a href="#terms" onClick={(event) => event.preventDefault()}>Terms of Service</a> and <a href="#privacy" onClick={(event) => event.preventDefault()}>Privacy Policy</a>.</span></label>
              {status && <div className="status-message is-error" role="alert">{status}</div>}
              <Button type="submit" variant="primary" className="primary-button" loading={loading}>Create account<ArrowIcon /></Button>
            </form>
          </div>
          <footer className="form-footer"><a href="#terms">Terms</a><a href="#privacy">Privacy</a><a href="#help">Help</a></footer>
        </section>
      </div>
    </main>
  );
}
