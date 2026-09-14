import { Suspense } from 'react';
import VerifyScreen from '../../components/VerifyScreen';

export default function VerifyPage() {
  return (
    <Suspense fallback={null}>
      <VerifyScreen />
    </Suspense>
  );
}
