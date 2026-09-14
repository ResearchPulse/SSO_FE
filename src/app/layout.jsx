import '../styles.css';
import '../shared/ui/components/Button/Button.css';

export const metadata = {
  title: 'Hyperdata Lab',
  description: 'Đăng nhập và đăng ký tài khoản Hyperdata Lab',
  icons: {
    icon: '/hyperdata-lab-logo.png',
    apple: '/hyperdata-lab-logo.png',
  },
};

export default function RootLayout({ children }) {
  return <html lang="vi"><body>{children}</body></html>;
}
