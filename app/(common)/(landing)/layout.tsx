import { CartProvider } from '@/context/cart';
import { TopBar } from '@/components/common/landing/top-bar';
import { Navbar } from '@/components/common/landing/navbar';
import { Footer } from '@/components/common/landing/footer';
import { MobileBottomNav } from '@/components/common/landing/mobile-bottom-nav';

export default function MainLayout({ children }: LayoutProps<'/'>) {
  return (
    <CartProvider>
      <TopBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <MobileBottomNav />
    </CartProvider>
  );
}
