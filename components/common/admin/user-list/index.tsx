"use client";
import React from "react";
import Link from "next/link";
import NavTitle from "@/components/reuseable/nav-title";
import { Badge, TableCell, TableRow } from "@/components/ui";
import { CustomTable } from "@/components/reuseable/table";
import { TableNoItem } from "@/components/reuseable/table-no-item";
import { Pagination } from "@/components/reuseable/pagination";
import SearchBox from "@/components/reuseable/search-box";
import Avatars from "@/components/reuseable/avater";
import { DeleteBtn, PreviewBtn } from "@/components/reuseable/btn";
import useConfirmation from "@/context/delete-modal";

export type UserRole = "CUSTOMER" | "GUEST";

export type UserItem = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: "ACTIVE" | "INACTIVE";
  avatar?: string;
};

type UserListProps = {
  title: string;
  subTitle: string;
  name: string;
  users: UserItem[];
};

const roleVariants: Record<UserRole, "customer" | "guest"> = {
  CUSTOMER: "customer",
  GUEST: "guest",
};

const roleLabels: Record<UserRole, string> = {
  CUSTOMER: "Customer",
  GUEST: "Guest",
};

const UserList = ({ title, subTitle, name, users }: UserListProps) => {
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

  const headers = ["User", "Email", "Phone", "Role", "Status", "Action"];

  return (
    <div>
      <NavTitle title={title} subTitle={subTitle} />

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
                name={name}
                total={20}
                page={1}
                per_page={10}
                onPageChange={() => {}}
              />
            </div>
          }
        >
          {users.length > 0 ? (
            users.slice(0, 10).map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatars
                      src={item.avatar || ""}
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
                  <Badge variant={roleVariants[item.role]}>
                    {roleLabels[item.role]}
                  </Badge>
                </TableCell>

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
              title={`No ${name.toLowerCase()} found`}
              tdStyle="!bg-background"
            />
          )}
        </CustomTable>
      </div>
    </div>
  );
};

export default UserList;
