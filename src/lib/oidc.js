import { API_BASE } from './api';

const OIDC_CONTEXT_KEY = 'researchpulse:oidc-context';

const readContextValues = (source) => ({
  client_id: source.get('client_id'),
  redirect_uri: source.get('redirect_uri'),
  state: source.get('state'),
  scope: source.get('scope') || 'openid profile email',
  code_challenge: source.get('code_challenge'),
  code_challenge_method: source.get('code_challenge_method') || 'S256',
});

export function getOidcContext(source) {
  const values = readContextValues(source);
  const hasContext = Object.values(values).some(Boolean);

  if (!hasContext) return null;

  if (!values.client_id || !values.redirect_uri || !values.state || !values.code_challenge) {
    return { invalid: true };
  }

  if (values.code_challenge_method !== 'S256') {
    return { invalid: true };
  }

  return values;
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
  window.sessionStorage.setItem(OIDC_CONTEXT_KEY, JSON.stringify(context));
}

export function getSavedOidcContext() {
  if (typeof window === 'undefined') return null;

  try {
    const raw = window.sessionStorage.getItem(OIDC_CONTEXT_KEY);
    if (!raw) return null;
    const context = JSON.parse(raw);
    return context && !context.invalid ? context : null;
  } catch {
    return null;
  }
}

export function clearOidcContext() {
  if (typeof window === 'undefined') return;
  window.sessionStorage.removeItem(OIDC_CONTEXT_KEY);
}
