import '../styles.css';
import '../shared/ui/components/Button/Button.css';

export const metadata = {
  title: 'Hyperdata Lab',
  description: 'Sign in and create your Hyperdata Lab account.',
  icons: {
    icon: '/hyperdata-lab-logo.png',
    apple: '/hyperdata-lab-logo.png',
  },
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
