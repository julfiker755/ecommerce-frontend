'use client';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import NavItem from './navitem';
import sonner from '@/components/reuseable/sonner';
import { helpers } from '@/lib/helpers';
import { authKey } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { profileLinks } from './navdata';
import { BrandLogo } from '../landing/brand-logo';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  link:any;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen,link }: SidebarProps) {
  const router = useRouter();

  const handleLogout = () => {
    helpers.removeAuthCookie(authKey);
    sonner.success('Logged out', 'See you again soon!');
    router.push('/login');
  };

  return (
    <div className="flex">
      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex h-screen w-68 flex-col border-r border-border bg-card transition-transform duration-300 ease-linear lg:static lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-18 items-center border-b border-border px-5">
          <BrandLogo />
        </div>

        <div className="flex flex-1 flex-col justify-between overflow-y-auto px-4 pb-4 scrollbar-hide">
          <nav onClick={() => setSidebarOpen(false)}>
            <NavItem item={link || [] as any} />
          </nav>

          <div className="border-t border-border pt-4">
            <Button
              type="button"
              variant="destructive"
              className="h-11 w-full justify-between px-4 text-sm"
              onClick={handleLogout}
            >
              Log out
              <LogOut className="size-4" />
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
}
