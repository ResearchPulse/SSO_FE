'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '../shared/ui/components/Button';

function BrandMark() { return <div className="brand-mark" aria-hidden="true"><span /><span /><span /></div>; }
function ArrowIcon() { return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M10.5 4.5 16 10l-5.5 5.5" /></svg>; }

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const submit = (event) => {
    event.preventDefault();
    setStatus(email.trim() ? 'Giao diện đã sẵn sàng kết nối API gửi email khôi phục.' : 'Vui lòng nhập email tài khoản.');
  };

  return <main className="auth-page">
    <section className="brand-panel" aria-label="Giới thiệu ResearchPulse SSO"><div className="brand-panel__texture" aria-hidden="true" /><div className="brand-lottie" aria-hidden="true"><iframe src="https://lottie.host/embed/d8daef78-26d6-441c-ac29-aec12beb3592/OpHKkpQYWz.lottie" title="ResearchPulse visual" loading="lazy" /></div><header className="brand-header"><BrandMark /><div><strong>RESEARCHPULSE</strong><span>Single Sign-On</span></div></header><div className="brand-copy"><p className="eyebrow">ACCOUNT RECOVERY</p><h1>Khôi phục quyền truy cập nghiên cứu.</h1><p className="brand-copy__description">Chúng tôi sẽ hướng dẫn bạn thiết lập lại mật khẩu an toàn qua email tài khoản.</p></div><footer className="brand-footer"><span>© {new Date().getFullYear()} ResearchPulse</span><span>Hỗ trợ kỹ thuật</span></footer></section>
    <section className="form-panel" aria-labelledby="forgot-title"><div className="form-shell"><div className="mobile-brand"><BrandMark /><span>RESEARCHPULSE SSO</span></div><div className="form-heading"><p className="eyebrow">ACCOUNT RECOVERY</p><h2 id="forgot-title">Quên mật khẩu?</h2><p>Nhập email tài khoản. ResearchPulse sẽ gửi hướng dẫn khôi phục mật khẩu.</p></div><form onSubmit={submit} noValidate><div className="field-group"><label htmlFor="recovery-email">Email tài khoản</label><input id="recovery-email" name="email" type="email" value={email} onChange={(event) => { setEmail(event.target.value); setStatus(''); }} placeholder="name@researchpulse.org" autoComplete="email" /></div>{status && <div className="status-message" role="status">{status}</div>}<Button type="submit" variant="primary" className="primary-button">Gửi hướng dẫn <ArrowIcon /></Button></form><p className="form-help">Nhớ mật khẩu? <Link href="/">Quay lại đăng nhập</Link></p><p className="form-legal">Bằng việc tiếp tục, bạn đồng ý với quy định sử dụng và chính sách bảo mật của ResearchPulse.</p></div></section>
  </main>;
}
