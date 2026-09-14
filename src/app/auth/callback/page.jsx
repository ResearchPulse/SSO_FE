'use client';

import { useEffect, useRef } from 'react';
import { api } from '../../../lib/api';
import { buildAuthorizeUrl, clearOidcContext, getSavedOidcContext } from '../../../lib/oidc';

export default function AuthCallbackPage() {
  const handledRef = useRef(false);

  useEffect(() => {
    if (handledRef.current) return;
    handledRef.current = true;

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
