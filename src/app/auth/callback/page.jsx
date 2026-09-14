'use client';

import { useEffect, useState } from 'react';
import { api } from '../../../lib/api';

export default function AuthCallbackPage() {
  const [state, setState] = useState({ loading: true, user: null, error: '' });

  useEffect(() => {
    api.me()
      .then(() => window.location.replace('/'))
      .catch(() => window.location.replace('/?error=sso_auth_failed'));
  }, []);

  return null;
  /* Callback UI removed. Keep callback route for session validation and redirect. */
  return <main className="callback-page"><section className="callback-card" aria-live="polite">
    {state.loading && <><div className="callback-spinner" aria-hidden="true" /><h1>Đang xác nhận đăng nhập</h1><p>ResearchPulse đang lấy thông tin phiên SSO.</p></>}
    {!state.loading && state.user && <><div className="callback-success" aria-hidden="true">✓</div><p className="eyebrow">SSO SUCCESS</p><h1>Đăng nhập thành công</h1><p>Xin chào {state.user.name || state.user.email}.</p><dl className="callback-data"><div><dt>Email</dt><dd>{state.user.email}</dd></div><div><dt>User ID</dt><dd>{state.user.id}</dd></div><div><dt>Email verified</dt><dd>{state.user.isEmailVerified ? 'Có' : 'Chưa'}</dd></div></dl></>}
    {!state.loading && state.error && <><p className="eyebrow">SSO ERROR</p><h1>Không thể xác nhận đăng nhập</h1><p>{state.error}</p><a className="callback-link" href="/">Quay lại đăng nhập</a></>}
  </section></main>;
}
