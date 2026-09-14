import '../styles.css';
import '../shared/ui/components/Button/Button.css';

export const metadata = {
  title: 'Hyperdata Lab SSO',
  description: 'Đăng nhập và đăng ký tài khoản Hyperdata Lab',
};

export default function RootLayout({ children }) {
  return <html lang="vi"><body>{children}</body></html>;
}
