"use client";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ban, CalendarDays, LockOpen, Mail, Phone, Plus } from "lucide-react";
import NavTitle from "@/components/reuseable/nav-title";
import { Badge, Button, TableCell, TableRow } from "@/components/ui";
import { CustomTable } from "@/components/reuseable/table";
import { TableNoItem } from "@/components/reuseable/table-no-item";
import { Pagination } from "@/components/reuseable/pagination";
import SearchBox from "@/components/reuseable/search-box";
import Avatars from "@/components/reuseable/avater";
import { PreviewBtn } from "@/components/reuseable/btn";
import { Modal } from "@/components/reuseable/modal";
import Form from "@/components/reuseable/from";
import { FromInput } from "@/components/reuseable/from-input";
import { FromTextArea } from "@/components/reuseable/from-textarea";
import sonner from "@/components/reuseable/sonner";
import useConfirmation from "@/context/delete-modal";
import { admin_Block, admin_Create } from "@/schema";
import { useModalState } from "@/hooks";

type AdminRole = "super_admin" | "admin";

type AdminItem = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: AdminRole;
  status: "ACTIVE" | "INACTIVE" | "BLOCKED";
  blockReason?: string;
  created: string;
};

const statusBadges: Record<AdminItem["status"], { label: string; variant: "success" | "secondary" | "destructive" }> = {
  ACTIVE: { label: "Active", variant: "success" },
  INACTIVE: { label: "Inactive", variant: "secondary" },
  BLOCKED: { label: "Blocked", variant: "destructive" },
};

const roleLabels: Record<AdminRole, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
};

// TODO: replace with logged in admin role from API
const currentRole: AdminRole = "super_admin";

const initialAdmins: AdminItem[] = [
  {
    id: 1,
    name: "Julfiker Ali",
    email: "julfiker.ali@gmail.com",
    phone: "01710000001",
    role: "super_admin",
    status: "ACTIVE",
    created: "2 years ago",
  },
  {
    id: 2,
    name: "Shahriar Kabir",
    email: "shahriar.kabir@gmail.com",
    phone: "01810000002",
    role: "admin",
    status: "ACTIVE",
    created: "1 year ago",
  },
  {
    id: 3,
    name: "Mim Akter",
    email: "mim.akter@gmail.com",
    phone: "01910000003",
    role: "admin",
    status: "ACTIVE",
    created: "8 months ago",
  },
  {
    id: 4,
    name: "Nayeem Islam",
    email: "nayeem.islam@gmail.com",
    phone: "01610000004",
    role: "admin",
    status: "INACTIVE",
    created: "3 months ago",
  },
  {
    id: 5,
    name: "Rasel Mahmud",
    email: "rasel.mahmud@gmail.com",
    phone: "01510000005",
    role: "admin",
    status: "BLOCKED",
    blockReason: "Changed product prices without approval.",
    created: "5 months ago",
  },
];

const initModalState = {
  isStore: false,
  isBlock: false,
  isDetails: false,
};

const AdminListPage = () => {
  const { confirm } = useConfirmation();
  const [admins, setAdmins] = useState(initialAdmins);
  const [state, setState] = useModalState(initModalState);
  const [selected, setSelected] = useState<AdminItem | null>(null);
  const isSuperAdmin = currentRole === "super_admin";

  const form = useForm({
    resolver: zodResolver(admin_Create),
    defaultValues: { name: "", email: "", phone: "", password: "" },
  });

  const blockForm = useForm({
    resolver: zodResolver(admin_Block),
    defaultValues: { reason: "" },
  });

  const openModal = (key: keyof typeof initModalState, item: AdminItem) => {
    setSelected(item);
    setState(key, true);
  };

  const handleCreate = (values: FieldValues) => {
    // TODO: connect create admin API (values)
    setAdmins((prev) => [
      {
        id: Date.now(),
        name: values.name,
        email: values.email,
        phone: values.phone,
        role: "admin",
        status: "ACTIVE",
        created: "Just now",
      },
      ...prev,
    ]);
    sonner.success("Admin created", `${values.name} can now access the dashboard.`);
    form.reset();
    setState("isStore", false);
  };

  const handleBlock = (values: FieldValues) => {
    if (!selected) return;
    // TODO: connect block admin API (selected.id, values.reason)
    setAdmins((prev) =>
      prev.map((a) =>
        a.id === selected.id ? { ...a, status: "BLOCKED", blockReason: values.reason } : a
      )
    );
    sonner.success("Admin blocked", `${selected.name} can no longer access the dashboard.`);
    blockForm.reset();
    setState("isBlock", false);
  };

  const handleUnblock = async (item: AdminItem) => {
    const confirmed = await confirm({
      title: "Unblock this admin?",
      description: `${item.name} will be able to access the dashboard again.`,
    });

    if (confirmed) {
      // TODO: connect unblock admin API (item.id)
      setAdmins((prev) =>
        prev.map((a) => (a.id === item.id ? { ...a, status: "ACTIVE", blockReason: undefined } : a))
      );
    }
  };

  const headers = ["Admin", "Email", "Phone", "Role", "Status", "Created", "Action"];

  const detailsInfo = selected
    ? [
        { icon: Mail, label: "Email", value: selected.email },
        { icon: Phone, label: "Phone", value: `+88 ${selected.phone}` },
        { icon: CalendarDays, label: "Created", value: selected.created },
      ]
    : [];

  return (
    <div>
      <NavTitle
        title="Admin List"
        subTitle="Manage dashboard admins and their roles."
      />

      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div className="w-full sm:w-64">
            <SearchBox onChange={(val) => console.log(val)} />
          </div>

          {isSuperAdmin && (
            <Button className="px-5" onClick={() => setState("isStore", true)}>
              <Plus size={18} className="mr-1" /> Add Admin
            </Button>
          )}
        </div>

        <CustomTable
          headers={headers}
          pagination={
            <div className="mt-4">
              <Pagination
                name="Admins"
                total={admins.length}
                page={1}
                per_page={10}
                onPageChange={() => {}}
              />
            </div>
          }
        >
          {admins.length > 0 ? (
            admins.slice(0, 10).map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatars
                      src=""
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
                  <Badge variant={item.role}>{roleLabels[item.role]}</Badge>
                </TableCell>

                <TableCell>
                  <Badge variant={statusBadges[item.status].variant}>
                    {statusBadges[item.status].label}
                  </Badge>
                </TableCell>

                <TableCell className="text-gray-700">{item.created}</TableCell>

                <TableCell>
                  <ul className="flex items-center gap-2">
                    <li>
                      <PreviewBtn onClick={() => openModal("isDetails", item)} />
                    </li>
                    {isSuperAdmin && item.role === "admin" && (
                      <li>
                        {item.status === "BLOCKED" ? (
                          <Button
                            title="Unblock admin"
                            className="border border-border bg-transparent size-10 text-emerald-600 hover:bg-emerald-50"
                            onClick={() => handleUnblock(item)}
                          >
                            <LockOpen size={18} />
                          </Button>
                        ) : (
                          <Button
                            title="Block admin"
                            className="border border-border bg-transparent size-10 text-red-600 hover:bg-red-50"
                            onClick={() => openModal("isBlock", item)}
                          >
                            <Ban size={18} />
                          </Button>
                        )}
                      </li>
                    )}
                  </ul>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableNoItem
              colSpan={headers.length}
              title="No admins found"
              tdStyle="!bg-background"
            />
          )}
        </CustomTable>
      </div>

      {/* ===== Add admin ===== */}
      <Modal
        open={state.isStore}
        setIsOpen={(v) => setState("isStore", v)}
        title="Add Admin"
        text="New admins get the Admin role. Only a super admin can create them."
      >
        <Form from={form} className="space-y-4" onSubmit={handleCreate}>
          <FromInput label="Full name" name="name" placeholder="Admin full name" />
          <FromInput label="Email address" name="email" type="email" placeholder="admin@example.com" />
          <FromInput
            label="Phone number"
            name="phone"
            type="tel"
            inputMode="numeric"
            maxLength={11}
            placeholder="01XXXXXXXXX"
          />
          <FromInput label="Password" name="password" eye placeholder="Minimum 6 characters" />
          <Button type="submit" className="w-full h-11">
            Create Admin
          </Button>
        </Form>
      </Modal>

      {/* ===== Block admin ===== */}
      <Modal
        open={state.isBlock}
        setIsOpen={(v) => {
          if (!v) blockForm.reset();
          setState("isBlock", v);
        }}
        title="Block Admin"
        text={`${selected?.name ?? ""} will lose access to the dashboard.`}
      >
        <Form from={blockForm} className="space-y-4" onSubmit={handleBlock}>
          <FromTextArea
            label="Reason"
            name="reason"
            rows={4}
            placeholder="Why are you blocking this admin?"
          />
          <Button type="submit" variant="destructive" className="w-full h-11">
            <Ban size={16} /> Block Admin
          </Button>
        </Form>
      </Modal>

      {/* ===== Admin details ===== */}
      <Modal
        open={state.isDetails}
        setIsOpen={(v) => setState("isDetails", v)}
        title="Admin Details"
      >
        {selected && (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <span className="grid size-14 shrink-0 place-items-center rounded-full bg-secondary text-xl font-bold text-primary">
                {selected.name.charAt(0)}
              </span>
              <div className="min-w-0">
                <h3 className="truncate text-lg font-semibold text-gray-900">{selected.name}</h3>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <Badge variant={selected.role}>{roleLabels[selected.role]}</Badge>
                  <Badge variant={statusBadges[selected.status].variant}>
                    {statusBadges[selected.status].label}
                  </Badge>
                </div>
              </div>
            </div>

            <ul className="space-y-3 rounded-xl border border-gray-200 p-4">
              {detailsInfo.map(({ icon: Icon, label, value }) => (
                <li key={label} className="flex items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-gray-50 text-gray-500">
                    <Icon size={16} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">{label}</p>
                    <p className="break-all text-sm font-medium text-gray-900">{value}</p>
                  </div>
                </li>
              ))}
            </ul>

            {selected.status === "BLOCKED" && selected.blockReason && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                <p className="flex items-center gap-2 text-sm font-semibold text-red-700">
                  <Ban size={16} /> Block reason
                </p>
                <p className="mt-1.5 text-sm text-red-700/90">{selected.blockReason}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminListPage;
