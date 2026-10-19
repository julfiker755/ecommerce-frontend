'use client';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import FavIcon from '@/icon/favIcon';

interface SubmenuItem {
  to?: string;
  label: string;
  icon?: any;
  act_io?: any;
}

interface MenuItem {
  to?: string;
  label: string;
  icon?: any;
  act_io?: any;
  submenu?: SubmenuItem[];
}

interface NavItemProps {
  item: MenuItem[];
}

export default function NavItem({ item }: NavItemProps) {
  const pathname = usePathname();
  // open the parent whose submenu contains the current page
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(() => {
    const index = item?.findIndex(({ submenu }) =>
      submenu?.some(({ to }) => to && pathname.startsWith(to))
    );
    return index >= 0 ? index : null;
  });
  const menuRefs = useRef<(HTMLUListElement | null)[]>([]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    menuRefs.current.forEach((menu, index) => {
      if (menu) {
        menu.style.maxHeight =
          activeSubmenu === index ? `${menu.scrollHeight}px` : '0px';
      }
    });
  }, [activeSubmenu]);

  const handleSubmenuToggle = (index: number) => {
    setActiveSubmenu((prev) => (prev === index ? null : index));
  };

  const isActive = (href: string) => {
    if (href === '/admin' || href === '/profile') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <ul className="space-y-2 mt-3">
      {item && item?.map(({ to, label, icon, act_io, submenu }, parentIndex) => (
        <li key={parentIndex} className="group">
          {to ? (
            <Link
              href={to}
              onMouseEnter={() => setHoveredItem(to)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`flex px-3 rounded-md transition-colors py-2 font-medium items-center text-base gap-x-2
                ${isActive(to)
                  ? 'font-medium bg-primary text-white'
                  : 'text-gray hover:bg-primary hover:text-white'
                }`}
            >
              <FavIcon
                name={isActive(to) || hoveredItem === to ? act_io : icon}
              />
              {label}
            </Link>
          ) : (
            <div
              onClick={(e) => {
                // keep the mobile sidebar open while toggling a submenu
                e.stopPropagation();
                handleSubmenuToggle(parentIndex);
              }}
              className="flex items-center px-3 py-2 justify-between cursor-pointer"
            >
              <span className="flex items-center gap-x-2 text-gray font-medium">
                {icon && <FavIcon name={icon} />}
                {label}
              </span>

              {activeSubmenu === parentIndex ? (
                <ChevronUp className="size-5 font-extrabold" />
              ) : (
                <ChevronDown className="size-5 font-extrabold" />
              )}
            </div>
          )}

          {submenu && (
            <ul
              ref={(el) => {
                menuRefs.current[parentIndex] = el;
              }}
              className="overflow-hidden transition-all duration-300 ease-out max-h-0 space-y-1"
            >
              {submenu.map(({ to, label, act_io, icon }, subIndex) => (
                <li
                  key={subIndex}
                  className={`rounded-md pl-6 hover:bg-primary hover:text-white text-gray font-medium border-l-5 border-transparent py-2
                    ${to && pathname === to
                      ? 'border-l-5! border-figma-primary! bg-primary text-white!'
                      : ''
                    }`}
                >
                  {to && (
                    <Link
                      href={to}
                      onMouseEnter={() => setHoveredItem(to)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className="flex items-center gap-x-2"
                    >
                      <FavIcon
                        name={
                          isActive(to) || hoveredItem === to ? act_io : icon
                        }
                      />
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
