import { CartProvider } from '@/context/cart';
import { TopBar } from '@/components/common/top-bar';
import { Navbar } from '@/components/common/navbar';
import { Footer } from '@/components/common/footer';
import { MobileBottomNav } from '@/components/common/mobile-bottom-nav';

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
