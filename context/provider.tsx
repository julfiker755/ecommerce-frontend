"use client";
import { childrenProps } from "@/types";
import { Toaster } from "sonner";
import { ConfirmDialogProvider } from "./delete-modal";
import { TitleProvider } from "./title";

const Provider = ({ children }: childrenProps) => {
  return (
    <>
      <TitleProvider>
        <ConfirmDialogProvider>
          {children}
          <Toaster
            toastOptions={{
              style: {
                background: "#F2F2F2",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "black",
              },
              classNames: {
                description: "!text-black",
                icon: "!text-black-300",
              },
            }}
            position="bottom-right"
          />
        </ConfirmDialogProvider>
      </TitleProvider>
    </>
  );
};

export default Provider;
