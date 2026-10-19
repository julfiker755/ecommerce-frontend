export const profileLinks = [
  {
    label: "Dashboard",
    icon: "dashboard",
    act_io: "dashboard_i",
    to: "/profile/dashboard",
  },
  {
    label: "My Orders",
    icon: "recentorder",
    act_io: "recentorder_i",
    to: "/profile/orders",
  },
  {
    label: "Profile",
    icon: "users",
    act_io: "users_i",
    to: "/profile",
  },
];


export const adminLinks = [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    act_io: 'dashboard_i',
    to: '/admin/overview',
  },
  {
    label: 'Products',
    icon: 'product',
    act_io: 'product_i',
    submenu: [
      {
        to: '/admin/product/add',
        label: 'Add Product',
      },
      {
        to: '/admin/product/list',
        label: 'List Product',
      },
      {
        to: '/admin/category/main-category',
        label: 'Main Category',
      },
      {
        to: '/admin/category/sub-category',
        label: 'Sub Category',
      },
      {
        to: '/admin/brand',
        label: 'Brands',
      },
    ],
  },
  {
    label: 'Recent Order',
    icon: 'recentorder',
    act_io: 'recentorder_i',
    to: "/admin/order/recent-order"
  },
  {
    label: 'Settings',
    icon: 'settings',
    act_io: 'settings_i',
    submenu: [
      {
        to: "/admin/settings/social-media", icon: 'social',
        act_io: 'social_i', label: "Social Media"
      },
      {
        to: "/admin/settings/admin-list", icon: 'users',
        act_io: 'users_i', label: "Admin List"
      },
    ],
  },
];
