import UserList, { UserItem } from "@/components/common/admin/user-list";

const customers: UserItem[] = [
  {
    id: 1,
    name: "Rahim Uddin",
    email: "rahim.uddin@gmail.com",
    phone: "01712345678",
    role: "CUSTOMER",
    status: "ACTIVE",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Karim Hasan",
    email: "karim.hasan@gmail.com",
    phone: "01812345678",
    role: "CUSTOMER",
    status: "ACTIVE",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    email: "nusrat.jahan@gmail.com",
    phone: "01912345678",
    role: "CUSTOMER",
    status: "INACTIVE",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Tanvir Ahmed",
    email: "tanvir.ahmed@gmail.com",
    phone: "01612345678",
    role: "CUSTOMER",
    status: "ACTIVE",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    name: "Farhana Akter",
    email: "farhana.akter@gmail.com",
    phone: "01512345678",
    role: "CUSTOMER",
    status: "ACTIVE",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    name: "Sakib Hossain",
    email: "sakib.hossain@gmail.com",
    phone: "01312345678",
    role: "CUSTOMER",
    status: "INACTIVE",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
  },
];

const CustomerListPage = () => {
  return (
    <UserList
      title="Customer"
      subTitle="Manage registered customers, contact details, and account status."
      name="Customers"
      users={customers}
    />
  );
};

export default CustomerListPage;
