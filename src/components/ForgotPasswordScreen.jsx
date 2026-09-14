'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '../shared/ui/components/Button';
import AuthBrandPanel from './AuthBrandPanel';

function MailIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><path d="m4.5 7 7.5 6 7.5-6" /></svg>; }
function ArrowIcon() { return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M10.5 4.5 16 10l-5.5 5.5" /></svg>; }

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const submit = (event) => {
    event.preventDefault();
    setStatus(email.trim() ? 'BE chưa cung cấp API khôi phục mật khẩu.' : 'Vui lòng nhập email tài khoản.');
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
              {status && <div className="status-message" role="status">{status}</div>}
              <Button type="submit" variant="primary" className="primary-button">Send reset instructions<ArrowIcon /></Button>
            </form>
            <p className="form-legal">We only use this email to help restore access to your Hyperdata Lab account.</p>
          </div>
          <footer className="form-footer"><a href="#terms">Terms</a><a href="#privacy">Privacy</a><a href="#help">Help</a></footer>
        </section>
      </div>
    </main>
  );
    <section className="brand-panel" aria-label="Giới thiệu Hyperdata Lab SSO"><div className="brand-panel__texture" aria-hidden="true" /><header className="brand-header"><BrandMark /><div><strong>HYPERDATA LAB</strong><span>Single Sign-On</span></div></header><div className="brand-copy"><p className="eyebrow">ACCOUNT RECOVERY</p><h1>Khôi phục quyền truy cập nghiên cứu.</h1><p className="brand-copy__description">Chúng tôi sẽ hướng dẫn bạn thiết lập lại mật khẩu an toàn qua email tài khoản.</p></div><footer className="brand-footer"><span>© {new Date().getFullYear()} Hyperdata Lab</span><span>Hỗ trợ kỹ thuật</span></footer></section>
    <section className="form-panel" aria-labelledby="forgot-title"><div className="form-shell"><div className="mobile-brand"><BrandMark /><span>HYPERDATA LAB SSO</span></div><div className="form-heading"><p className="eyebrow">ACCOUNT RECOVERY</p><h2 id="forgot-title">Quên mật khẩu?</h2><p>Nhập email tài khoản. Hyperdata Lab sẽ gửi hướng dẫn khôi phục mật khẩu.</p></div><form onSubmit={submit} noValidate><div className="field-group"><label htmlFor="recovery-email">Email tài khoản</label><input id="recovery-email" name="email" type="email" value={email} onChange={(event) => { setEmail(event.target.value); setStatus(''); }} placeholder="name@email.com" autoComplete="email" /></div>{status && <div className="status-message" role="status">{status}</div>}<Button type="submit" variant="primary" className="primary-button">Gửi hướng dẫn <ArrowIcon /></Button></form><p className="form-help">Nhớ mật khẩu? <Link href="/">Quay lại đăng nhập</Link></p><p className="form-legal">Bằng việc tiếp tục, bạn đồng ý với quy định sử dụng và chính sách bảo mật của Hyperdata Lab.</p></div></section>
  </main>;
}
