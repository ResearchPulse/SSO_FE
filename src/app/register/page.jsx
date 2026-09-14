import RegisterScreen from '../../components/RegisterScreen';
import { Suspense } from 'react';

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterScreen />
    </Suspense>
  );
}
