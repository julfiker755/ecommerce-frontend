import UserList, { UserItem } from "@/components/common/admin/user-list";

const guests: UserItem[] = [
  {
    id: 101,
    name: "Mehedi Hasan",
    email: "mehedi.hasan@gmail.com",
    phone: "01711223344",
    role: "GUEST",
    status: "ACTIVE",
  },
  {
    id: 102,
    name: "Sumaiya Islam",
    email: "sumaiya.islam@gmail.com",
    phone: "01811223344",
    role: "GUEST",
    status: "ACTIVE",
  },
  {
    id: 103,
    name: "Arif Chowdhury",
    email: "arif.chowdhury@gmail.com",
    phone: "01911223344",
    role: "GUEST",
    status: "INACTIVE",
  },
  {
    id: 104,
    name: "Jannatul Ferdous",
    email: "jannatul.ferdous@gmail.com",
    phone: "01611223344",
    role: "GUEST",
    status: "ACTIVE",
  },
  {
    id: 105,
    name: "Rakib Hasan",
    email: "rakib.hasan@gmail.com",
    phone: "01511223344",
    role: "GUEST",
    status: "ACTIVE",
  },
];

const GuestListPage = () => {
  return (
    <UserList
      title="Guest"
      subTitle="Manage guest users who ordered without creating an account."
      name="Guests"
      users={guests}
    />
  );
};

export default GuestListPage;
