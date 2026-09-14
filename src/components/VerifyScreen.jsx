'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Button from '../shared/ui/components/Button';
import { api } from '../lib/api';
import AuthBrandPanel from './AuthBrandPanel';

const CODE_LENGTH = 6;

function ShieldIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5 19 6v5.2c0 4.2-2.8 7.8-7 9.3-4.2-1.5-7-5.1-7-9.3V6l7-2.5Z" /><path d="m8.8 12 2.1 2.1 4.3-4.3" /></svg>;
}

function ArrowIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M10.5 4.5 16 10l-5.5 5.5" /></svg>;
}

export default function VerifyScreen() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const [code, setCode] = useState(() => Array(CODE_LENGTH).fill(''));
  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState('error');
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [resending, setResending] = useState(false);
  const codeRefs = useRef([]);

  const focusCode = (index) => {
    if (index >= 0 && index < CODE_LENGTH) codeRefs.current[index]?.focus();
  };

  const setDigits = (value, startIndex = 0) => {
    const digits = value.replace(/\D/g, '').slice(0, CODE_LENGTH - startIndex);
    if (!digits) return;

    setCode((current) => {
      const next = [...current];
      digits.split('').forEach((digit, offset) => { next[startIndex + offset] = digit; });
      return next;
    });
    focusCode(Math.min(startIndex + digits.length, CODE_LENGTH - 1));
    setStatus('');
  };

  const handleChange = (index, value) => {
    setCode((current) => {
      const next = [...current];
      next[index] = '';
      return next;
    });
    setDigits(value, index);
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !code[index] && index > 0) {
      event.preventDefault();
      setCode((current) => {
        const next = [...current];
        next[index - 1] = '';
        return next;
      });
      focusCode(index - 1);
    }
    if (event.key === 'ArrowLeft') focusCode(index - 1);
    if (event.key === 'ArrowRight') focusCode(index + 1);
  };

  const handlePaste = (event) => {
    event.preventDefault();
    setCode(Array(CODE_LENGTH).fill(''));
    setDigits(event.clipboardData.getData('text'));
  };

  const submit = async (event) => {
    event.preventDefault();
    const verificationCode = code.join('');

    if (verificationCode.length !== CODE_LENGTH) {
      setStatusType('error');
      setStatus('Enter the 6-digit verification code.');
      return;
    }
    if (!email) {
      setStatusType('error');
      setStatus('This verification link is missing the account email.');
      return;
    }

    setStatus('');
    setLoading(true);
    try {
      await api.verifyEmail({ email, code: verificationCode });
      setStatusType('success');
      setStatus('Your email has been verified. You can now sign in.');
      setVerified(true);
    } catch {
      setStatusType('error');
      setStatus('That code is invalid or has expired. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    if (!email || resending) return;
    setResending(true);
    setStatus('');
    try {
      await api.resendVerification({ email });
      setStatusType('success');
      setStatus('A new verification code has been sent.');
    } catch {
      setStatusType('error');
      setStatus('We could not resend the code. Please try again.');
    } finally {
      setResending(false);
    }
  };

  return (
    <main className="auth-page auth-page--reference verify-page">
      <div className="auth-frame">
        <AuthBrandPanel
          ariaLabel="Hyperdata Lab email verification"
          heading={<>Confirm.<br />Connect. Continue.</>}
          description="Verify your email to keep your research, publications, and academic insights connected."
        />
        <section className="form-panel" aria-labelledby="verify-title">
          <div className="form-topline">Already have an account? <Link href="/">Sign in</Link></div>
          <div className="form-shell verify-shell">
            <div className="form-heading">
              <div className="verify-icon"><ShieldIcon /></div>
              <h2 id="verify-title">Verify your email</h2>
              <p>Enter the 6-digit code we sent to <strong className="verify-email">{email || 'your email address'}</strong>.</p>
            </div>
            {verified ? (
              <>
                <div className="status-message is-success" role="status">{status}</div>
                <Link className="primary-button reset-login-link" href="/">Continue to sign in<ArrowIcon /></Link>
              </>
            ) : (
              <form onSubmit={submit} noValidate>
                <div className="verification-code" role="group" aria-label="6-digit verification code" onPaste={handlePaste}>
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      ref={(element) => { codeRefs.current[index] = element; }}
                      aria-label={`Verification digit ${index + 1}`}
                      autoComplete={index === 0 ? 'one-time-code' : 'off'}
                      inputMode="numeric"
                      maxLength={1}
                      pattern="[0-9]*"
                      type="text"
                      value={digit}
                      onChange={(event) => handleChange(index, event.target.value)}
                      onKeyDown={(event) => handleKeyDown(index, event)}
                    />
                  ))}
                </div>
                <div className="verify-resend-row">
                  <span>Didn&apos;t receive the code?</span>
                  <button type="button" className="resend-button" onClick={resend} disabled={!email || resending}>{resending ? 'Sending...' : 'Resend code'}</button>
                </div>
                {status && <div className={`status-message is-${statusType}`} role={statusType === 'error' ? 'alert' : 'status'}>{status}</div>}
                <Button type="submit" variant="primary" className="primary-button" loading={loading}>Verify email<ArrowIcon /></Button>
              </form>
            )}
            <p className="form-legal">The verification code expires after a short time. Check your spam folder if you do not see it.</p>
          </div>
          <footer className="form-footer"><a href="#terms">Terms</a><a href="#privacy">Privacy</a><a href="#help">Help</a></footer>
        </section>
      </div>
    </main>
  );
}
