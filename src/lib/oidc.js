import { API_BASE } from './api';

const OIDC_CONTEXT_KEY = 'researchpulse:oidc-context';

export function getOidcContext(source) {
  const get = (key) => {
    let val = source?.get ? source.get(key) : null;
    if (!val && typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      val = params.get(key);
    }
    return val;
  };

  const clientId = get('client_id');
  const redirectUri = get('redirect_uri');
  const state = get('state');
  const codeChallenge = get('code_challenge');
  const codeChallengeMethod = get('code_challenge_method');
  const scope = get('scope');

  const hasContext = Boolean(
    clientId || redirectUri || state || codeChallenge || codeChallengeMethod || scope
  );

  if (!hasContext) return null;

  if (!clientId || !redirectUri || !state || !codeChallenge) {
    return { invalid: true };
  }

  const method = codeChallengeMethod || 'S256';
  if (method !== 'S256') {
    return { invalid: true };
  }

  return {
    client_id: clientId,
    redirect_uri: redirectUri,
    state,
    scope: scope || 'openid profile email',
    code_challenge: codeChallenge,
    code_challenge_method: method,
  };
}

export function buildAuthorizeUrl(context) {
  const url = new URL(`${API_BASE}/api/v1/oidc/authorize`);
  Object.entries(context).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('code_challenge_method', 'S256');
  return url.toString();
}

export function saveOidcContext(context) {
  if (typeof window === 'undefined' || !context || context.invalid) return;
  const str = JSON.stringify(context);
  try { window.sessionStorage.setItem(OIDC_CONTEXT_KEY, str); } catch {}
  try { window.localStorage.setItem(OIDC_CONTEXT_KEY, str); } catch {}
}

export function getSavedOidcContext() {
  if (typeof window === 'undefined') return null;

  try {
    let raw = window.sessionStorage.getItem(OIDC_CONTEXT_KEY);
    if (!raw) raw = window.localStorage.getItem(OIDC_CONTEXT_KEY);
    if (!raw) return null;
    const context = JSON.parse(raw);
    return context && !context.invalid ? context : null;
  } catch {
    return null;
  }
}

export function clearOidcContext() {
  if (typeof window === 'undefined') return;
  try { window.sessionStorage.removeItem(OIDC_CONTEXT_KEY); } catch {}
  try { window.localStorage.removeItem(OIDC_CONTEXT_KEY); } catch {}
}
