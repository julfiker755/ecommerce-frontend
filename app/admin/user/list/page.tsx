"use client";
import React from "react";
import Link from "next/link";
import NavTitle from "@/components/reuseable/nav-title";
import { TableCell, TableRow } from "@/components/ui";
import { CustomTable } from "@/components/reuseable/table";
import { TableNoItem } from "@/components/reuseable/table-no-item";
import { Pagination } from "@/components/reuseable/pagination";
import SearchBox from "@/components/reuseable/search-box";
import Avatars from "@/components/reuseable/avater";
import { DeleteBtn, PreviewBtn } from "@/components/reuseable/btn";
import useConfirmation from "@/context/delete-modal";

const initialUsers = [
  {
    id: 1,
    name: "Rahim Uddin",
    email: "rahim.uddin@gmail.com",
    phone: "01712345678",
    status: "ACTIVE",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Karim Hasan",
    email: "karim.hasan@gmail.com",
    phone: "01812345678",
    status: "ACTIVE",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    email: "nusrat.jahan@gmail.com",
    phone: "01912345678",
    status: "INACTIVE",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Tanvir Ahmed",
    email: "tanvir.ahmed@gmail.com",
    phone: "01612345678",
    status: "ACTIVE",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    name: "Farhana Akter",
    email: "farhana.akter@gmail.com",
    phone: "01512345678",
    status: "ACTIVE",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    name: "Sakib Hossain",
    email: "sakib.hossain@gmail.com",
    phone: "01312345678",
    status: "INACTIVE",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
  },
];

const UserListPage = () => {
  const { confirm } = useConfirmation();

  const handleDelete = async (id: number) => {
    const confirmed = await confirm({
      title: "Are you sure?",
      description: "This action will delete this user permanently.",
    });

    if (confirmed) {
      console.log("delete user", id);
    }
  };

  const headers = ["User", "Email", "Phone", "Status", "Action"];

  return (
    <div>
      <NavTitle
        title="User"
        subTitle="Manage store customers, contact details, and account status."
      />

      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div className="w-full sm:w-64">
            <SearchBox onChange={(val) => console.log(val)} />
          </div>
        </div>

        <CustomTable
          headers={headers}
          pagination={
            <div className="mt-4">
              <Pagination
                name="Users"
                total={20}
                page={1}
                per_page={10}
                onPageChange={() => {}}
              />
            </div>
          }
        >
          {initialUsers.length > 0 ? (
            initialUsers.slice(0, 10).map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatars
                      src={item.avatar}
                      fallback={item.name}
                      alt={item.name}
                      fallbackStyle="avatar"
                    />
                    <span>{item.name}</span>
                  </div>
                </TableCell>

                <TableCell className="text-gray-700">{item.email}</TableCell>

                <TableCell className="text-gray-700">{item.phone}</TableCell>

                <TableCell>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      item.status === "ACTIVE"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {item.status === "ACTIVE" ? "Active" : "Inactive"}
                  </span>
                </TableCell>

                <TableCell>
                  <ul className="flex items-center gap-2">
                    <li>
                      <Link href={`/admin/user/details?id=${item.id}`}>
                        <PreviewBtn />
                      </Link>
                    </li>
                    <li>
                      <DeleteBtn onClick={() => handleDelete(item.id)} />
                    </li>
                  </ul>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableNoItem
              colSpan={headers.length}
              title="No users found"
              tdStyle="!bg-background"
            />
          )}
        </CustomTable>
      </div>
    </div>
  );
};

export default UserListPage;
