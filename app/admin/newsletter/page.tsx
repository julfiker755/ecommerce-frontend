"use client";
import React, { useRef, useState } from "react";
import { Download, Upload } from "lucide-react";
import NavTitle from "@/components/reuseable/nav-title";
import { Button, TableCell, TableRow } from "@/components/ui";
import { CustomTable } from "@/components/reuseable/table";
import { TableNoItem } from "@/components/reuseable/table-no-item";
import { Pagination } from "@/components/reuseable/pagination";
import SearchBox from "@/components/reuseable/search-box";
import { DeleteBtn } from "@/components/reuseable/btn";
import sonner from "@/components/reuseable/sonner";
import useConfirmation from "@/context/delete-modal";

const initialSubscribers = [
  { id: 1, email: "rahim.uddin@gmail.com", created_at: "20 Oct 2026" },
  { id: 2, email: "nusrat.jahan@gmail.com", created_at: "19 Oct 2026" },
  { id: 3, email: "karim.hasan@gmail.com", created_at: "18 Oct 2026" },
  { id: 4, email: "farhana.akter@gmail.com", created_at: "16 Oct 2026" },
  { id: 5, email: "tanvir.ahmed@gmail.com", created_at: "14 Oct 2026" },
  { id: 6, email: "sadia.islam@gmail.com", created_at: "12 Oct 2026" },
  { id: 7, email: "mehedi.hasan@gmail.com", created_at: "09 Oct 2026" },
  { id: 8, email: "ayesha.siddika@gmail.com", created_at: "05 Oct 2026" },
];

const NewsletterPage = () => {
  const { confirm } = useConfirmation();
  const fileRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");

  const handleDelete = async (id: number) => {
    const confirmed = await confirm({
      title: "Are you sure?",
      description: "This action will remove this email permanently.",
    });

    if (confirmed) {
      console.log("delete subscriber", id);
    }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // TODO: connect import API
      console.log("import subscribers", file);
      sonner.success("Import started", `${file.name} is being imported.`);
    }
    e.target.value = "";
  };

  const handleExport = () => {
    const rows = [
      ["Id", "Email", "Created At"],
      ...initialSubscribers.map((s) => [s.id, s.email, s.created_at]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "newsletter-subscribers.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const keyword = search.trim().toLowerCase();
  const subscribers = initialSubscribers.filter(
    (item) => !keyword || item.email.toLowerCase().includes(keyword)
  );

  const headers = ["Id", "Email", "Created At", "Action"];

  return (
    <div>
      <NavTitle
        title="Newsletter"
        subTitle="Manage newsletter subscribers of your store."
      />

      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div className="w-full sm:w-64">
            <SearchBox onChange={(val) => setSearch(val)} />
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="rounded-full px-5"
              onClick={() => fileRef.current?.click()}
            >
              <Upload /> Import
            </Button>
            <input
              ref={fileRef}
              type="file"
              accept=".csv"
              hidden
              onChange={handleImport}
            />
            <Button
              variant="outline"
              className="rounded-full px-5"
              onClick={handleExport}
            >
              <Download /> Export
            </Button>
          </div>
        </div>

        <CustomTable
          headers={headers}
          pagination={
            <div className="mt-4">
              <Pagination
                name="Subscribers"
                total={subscribers.length}
                page={1}
                per_page={10}
                onPageChange={() => {}}
              />
            </div>
          }
        >
          {subscribers.length > 0 ? (
            subscribers.slice(0, 10).map((item) => (
              <TableRow key={item.id}>
                <TableCell className="text-gray-700">{item.id}</TableCell>

                <TableCell className="font-medium text-gray-900">{item.email}</TableCell>

                <TableCell className="text-gray-700">{item.created_at}</TableCell>

                <TableCell>
                  <DeleteBtn onClick={() => handleDelete(item.id)} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableNoItem
              colSpan={headers.length}
              title="No subscribers found"
              tdStyle="!bg-background"
            />
          )}
        </CustomTable>
      </div>
    </div>
  );
};

export default NewsletterPage;
