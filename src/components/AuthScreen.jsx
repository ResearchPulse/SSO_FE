'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '../shared/ui/components/Button';
import { api, API_BASE } from '../lib/api';

function BrandMark() { return <div className="brand-mark" aria-hidden="true"><span /><span /><span /></div>; }
function ArrowIcon() { return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M10.5 4.5 16 10l-5.5 5.5" /></svg>; }
function GoogleIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.35 12.23c0-.73-.07-1.43-.23-2.1H12v3.97h5.23a4.48 4.48 0 0 1-1.94 2.93v2.43h3.14c1.84-1.69 2.92-4.18 2.92-7.23Z" /><path fill="#34A853" d="M12 21.63c2.63 0 4.84-.87 6.45-2.37l-3.14-2.43c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.28v2.5A9.74 9.74 0 0 0 12 21.63Z" /><path fill="#FBBC05" d="M6.53 13.72a5.84 5.84 0 0 1 0-3.44v-2.5H3.28a9.74 9.74 0 0 0 0 8.44l3.25-2.5Z" /><path fill="#EA4335" d="M12 6.25c1.43 0 2.72.49 3.73 1.46l2.8-2.8C16.83 3.34 14.62 2.37 12 2.37a9.74 9.74 0 0 0-8.72 5.41l3.25 2.5C7.3 7.97 9.46 6.25 12 6.25Z" /></svg>; }
function EyeIcon({ hidden }) { return <svg viewBox="0 0 24 24" aria-hidden="true">{hidden ? <path d="m3 3 18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.2A10.7 10.7 0 0 1 12 5c5.2 0 9 5 9 7s-3.8 7-9 7a10 10 0 0 1-5.1-1.4M5.3 7.1C3.8 8.4 3 10.1 3 12c0 1.1 1 2.8 2.5 4.4" /> : <><path d="M3 12s3.2-7 9-7 9 7 9 7-3.2 7-9 7-9-7-9-7Z" /><circle cx="12" cy="12" r="2.5" /></>}</svg>; }

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setStatus('');
    setError(false);
    if (!email.trim() || !password) {
      setStatus('Vui lòng nhập email và mật khẩu.');
      setError(true);
      return;
    }
    setLoading(true);
    try {
      await api.login({ email: email.trim(), password });
      window.location.assign('/profile');
    } catch (requestError) {
      setStatus(requestError.message === 'Invalid credentials' ? 'Email hoặc mật khẩu không đúng.' : requestError.message);
      setError(true);
    } finally { setLoading(false); }
  };

  return <main className="auth-page">
    <section className="brand-panel" aria-label="Giới thiệu ResearchPulse SSO"><div className="brand-panel__texture" aria-hidden="true" /><div className="brand-lottie" aria-hidden="true"><iframe src="https://lottie.host/embed/fbf3ad6e-a236-43f3-9a85-fcf2bcf3ede0/y6626GQZIk.lottie" title="ResearchPulse visual" loading="lazy" /></div><header className="brand-header"><BrandMark /><div><strong>RESEARCHPULSE</strong><span>Single Sign-On</span></div></header><div className="brand-copy"><p className="eyebrow">ONE ACCOUNT. CONNECTED RESEARCH.</p><h1>Một tài khoản cho toàn bộ trải nghiệm nghiên cứu.</h1><p className="brand-copy__description">Truy cập nhanh và an toàn vào toàn bộ không gian nghiên cứu của ResearchPulse.</p><div className="brand-points"><div><span className="point-icon">01</span><span>Bảo mật tập trung cho tài khoản nghiên cứu</span></div><div><span className="point-icon">02</span><span>Kết nối mọi công cụ ResearchPulse</span></div><div><span className="point-icon">03</span><span>Đăng nhập SSO nhanh và nhất quán</span></div></div></div><footer className="brand-footer"><span>© {new Date().getFullYear()} ResearchPulse</span><span>Hỗ trợ kỹ thuật</span></footer></section>
    <section className="form-panel" aria-labelledby="auth-title"><div className="form-shell"><div className="mobile-brand"><BrandMark /><span>RESEARCHPULSE SSO</span></div><div className="form-heading"><p className="eyebrow">WELCOME BACK</p><h2 id="auth-title">Đăng nhập</h2><p>Đăng nhập để tiếp tục vào không gian nghiên cứu ResearchPulse.</p></div><Button type="button" variant="outline" className="sso-button" onClick={() => { window.location.href = `${API_BASE}/api/v1/auth/social/google/start`; }}><GoogleIcon /><span>Tiếp tục với Google SSO</span><ArrowIcon /></Button><div className="divider"><span>hoặc đăng nhập bằng tài khoản</span></div><form onSubmit={submit} noValidate><div className="field-group"><label htmlFor="email">Email tài khoản</label><input id="email" name="email" type="email" value={email} onChange={(event) => { setEmail(event.target.value); setStatus(''); setError(false); }} placeholder="Nhập email tài khoản" autoComplete="email" /></div><div className="field-group"><div className="field-label-row"><label htmlFor="password">Mật khẩu</label><Link href="/forgot-password">Quên mật khẩu?</Link></div><div className="password-wrap"><input id="password" name="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => { setPassword(event.target.value); setStatus(''); setError(false); }} placeholder="Nhập mật khẩu" autoComplete="current-password" /><button type="button" className="icon-button" aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'} onClick={() => setShowPassword((value) => !value)}><EyeIcon hidden={showPassword} /></button></div></div><label className="remember-row"><input type="checkbox" /><span className="checkmark" /><span>Ghi nhớ đăng nhập</span></label>{status && <div className={`status-message ${error ? 'is-error' : 'is-success'}`} role={error ? 'alert' : 'status'}>{status}</div>}<Button type="submit" variant="primary" className="primary-button" loading={loading}>Đăng nhập<ArrowIcon /></Button></form><p className="form-help">Chưa có tài khoản? <Link href="/register">Đăng ký ngay</Link></p><p className="form-legal">Bằng việc tiếp tục, bạn đồng ý với quy định sử dụng và chính sách bảo mật của ResearchPulse.</p></div></section>
  </main>;
}
