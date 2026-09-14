'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '../shared/ui/components/Button';
import { api } from '../lib/api';

function ArrowIcon() { return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M10.5 4.5 16 10l-5.5 5.5" /></svg>; }

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
      window.location.assign('/profile');
    } catch (error) { setStatus(error.message); } finally { setLoading(false); }
  };

  return <main className="auth-page register-page"><section className="brand-panel" aria-label="Giới thiệu ResearchPulse SSO"><div className="brand-lottie" aria-hidden="true"><iframe src="https://lottie.host/embed/fbf3ad6e-a236-43f3-9a85-fcf2bcf3ede0/y6626GQZIk.lottie" title="ResearchPulse visual" loading="lazy" /></div><header className="brand-header"><div className="brand-mark"><span /><span /><span /></div><div><strong>RESEARCHPULSE</strong><span>Single Sign-On</span></div></header><div className="brand-copy"><p className="eyebrow">JOIN RESEARCHPULSE</p><h1>Xây dựng hồ sơ nghiên cứu của bạn.</h1><p className="brand-copy__description">Tạo một tài khoản duy nhất để khám phá, theo dõi và quản lý nghiên cứu.</p></div><footer className="brand-footer"><span>© {new Date().getFullYear()} ResearchPulse</span><span>Hỗ trợ kỹ thuật</span></footer></section><section className="form-panel" aria-labelledby="register-title"><div className="form-shell register-shell"><div className="form-heading"><p className="eyebrow">JOIN RESEARCHPULSE</p><h2 id="register-title">Tạo tài khoản</h2><p>Hoàn tất thông tin để bắt đầu trải nghiệm ResearchPulse.</p></div><form onSubmit={submit} noValidate><div className="register-divider" /><div className="register-grid register-grid--names"><div className="field-group"><label htmlFor="lastName">Họ <em>*</em></label><input id="lastName" value={form.lastName} onChange={(event) => update('lastName', event.target.value)} placeholder="Nguyen" autoComplete="family-name" /></div><div className="field-group"><label htmlFor="firstName">Tên <em>*</em></label><input id="firstName" value={form.firstName} onChange={(event) => update('firstName', event.target.value)} placeholder="Van A" autoComplete="given-name" /></div></div><div className="field-group"><label htmlFor="register-email">Email <em>*</em></label><input id="register-email" type="email" value={form.email} onChange={(event) => update('email', event.target.value)} placeholder="name@email.com" autoComplete="email" /></div><div className="field-group"><label htmlFor="register-password">Mật khẩu <em>*</em></label><input id="register-password" type="password" value={form.password} onChange={(event) => update('password', event.target.value)} placeholder="Ít nhất 8 ký tự" autoComplete="new-password" /></div><div className="register-grid register-grid--details"><div className="field-group"><label htmlFor="birthDate">Ngày sinh <em>*</em></label><input id="birthDate" type="date" value={form.birthDate} onChange={(event) => update('birthDate', event.target.value)} /></div><div className="field-group"><label>Giới tính</label><div className="segmented-control"><button type="button" className={form.gender === 'male' ? 'is-selected' : ''} onClick={() => update('gender', 'male')}>Nam</button><button type="button" className={form.gender === 'female' ? 'is-selected' : ''} onClick={() => update('gender', 'female')}>Nữ</button></div></div></div><label className="terms-row"><input type="checkbox" checked={form.terms} onChange={(event) => update('terms', event.target.checked)} /><span className="checkmark" /><span>Tôi đồng ý với <a href="#terms" onClick={(event) => event.preventDefault()}>Điều khoản sử dụng</a> và <a href="#privacy" onClick={(event) => event.preventDefault()}>Chính sách bảo mật</a></span></label>{status && <div className="status-message is-error" role="alert">{status}</div>}<Button type="submit" variant="primary" className="primary-button" loading={loading}>Tạo tài khoản<ArrowIcon /></Button></form><p className="form-help">Đã có tài khoản? <Link href="/">Đăng nhập</Link></p></div></section></main>;
}
