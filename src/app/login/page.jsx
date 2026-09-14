import AuthScreen from '../../components/AuthScreen';
import { Suspense } from 'react';

export default function LoginPage() {
  return <Suspense fallback={null}><AuthScreen mode="login" /></Suspense>;
}
