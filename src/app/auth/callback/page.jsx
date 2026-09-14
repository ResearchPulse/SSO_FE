'use client';

import { useEffect } from 'react';
import { api } from '../../../lib/api';
import { buildAuthorizeUrl, clearOidcContext, getSavedOidcContext } from '../../../lib/oidc';

export default function AuthCallbackPage() {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    const errorCode = searchParams.get('error');
    if (errorCode) {
      clearOidcContext();
      window.location.replace(`/login?error=${encodeURIComponent(errorCode)}`);
      return;
    }

    const savedContext = getSavedOidcContext();
    if (savedContext) {
      clearOidcContext();
      window.location.replace(buildAuthorizeUrl(savedContext));
      return;
    }

    api.me()
      .then(() => window.location.replace('/'))
      .catch(() => window.location.replace('/?error=sso_auth_failed'));
  }, []);

  return null;
}
