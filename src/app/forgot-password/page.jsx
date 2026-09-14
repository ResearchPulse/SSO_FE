import ForgotPasswordScreen from '../../components/ForgotPasswordScreen';
import { Suspense } from 'react';

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ForgotPasswordScreen />
    </Suspense>
  );
}
