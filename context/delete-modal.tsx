"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import React, { createContext, useContext, useState, ReactNode } from "react";

// ✅ Default State
const initialDialogState: ConfirmDialogState = {
  open: false,
  title: "Are you sure to delete this broker ?",
  description:
    "After deleting, this broker won’t be able to use your platform anymore.",
  confirmText: null,
  cancelText: null,
  className: "",
  titleStyle: "",
  btnStyle: "",
  icon: "i1",
  onConfirm: undefined,
  onCancel: undefined,
  resolve: undefined,
};

// ✅ Types
type ConfirmDialogOptions = Partial<
  Omit<ConfirmDialogState, "open" | "resolve">
>;

interface ConfirmDialogState {
  open: boolean;
  title: string;
  description: string;
  confirmText: any;
  cancelText: any;
  className?: string;
  titleStyle?: string;
  btnStyle?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  resolve?: (value: boolean) => void;
  icon?: "i1" | "i2" | "i3";
}

interface ConfirmDialogContextType {
  confirm: (options?: ConfirmDialogOptions) => Promise<boolean>;
}

const ConfirmDialogContext = createContext<
  ConfirmDialogContextType | undefined
>(undefined);

interface ConfirmDialogProviderProps {
  children: ReactNode;
}

export const ConfirmDialogProvider = ({
  children,
}: ConfirmDialogProviderProps) => {
  const [dialogState, setDialogState] =
    useState<ConfirmDialogState>(initialDialogState);

  // ✅ Main confirm function
  const confirm = (options: ConfirmDialogOptions = {}): Promise<boolean> => {
    return new Promise((resolve) => {
      setDialogState({
        ...initialDialogState, // Reset first
        ...options, // Apply custom options
        open: true,
        resolve,
      });
    });
  };

  // ✅ Confirm & Cancel Handlers
  const handleConfirm = () => {
    dialogState.resolve?.(true);
    dialogState.onConfirm?.();
    closeDialog();
  };

  const handleCancel = () => {
    dialogState.resolve?.(false);
    dialogState.onCancel?.();
    closeDialog();
  };

  // ✅ Reset everything after closing
  const closeDialog = () => {
    setDialogState(initialDialogState);
  };

  return (
    <ConfirmDialogContext.Provider value={{ confirm }}>
      {children}
      <AlertDialog open={dialogState.open} onOpenChange={closeDialog}>
        <AlertDialogContent
          className={cn(
            "rounded-md w-105 bg-white border border-border  px-6 py-6",
            dialogState?.className,
          )}
        >
          <AlertDialogHeader className="place-items-center! text-center!">
            <AlertDialogTitle className="w-full font-sans capitalize text-center text-fig-secondery">
              <ul className="mx-auto flex flex-col justify-center">
                {/* Icon */}
                <li className="flex justify-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="60"
                    viewBox="0 0 62 80"
                    fill="none"
                  >
                    <path
                      d="M62 4.44444H46.5L42.0714 0H19.9286L15.5 4.44444H0V13.3333H62M4.42857 71.1111C4.42857 73.4686 5.36173 75.7295 7.02277 77.3965C8.6838 79.0635 10.9367 80 13.2857 80H48.7143C51.0633 80 53.3162 79.0635 54.9772 77.3965C56.6383 75.7295 57.5714 73.4686 57.5714 71.1111V17.7778H4.42857V71.1111Z"
                      fill="#FB3434"
                    />
                  </svg>
                </li>

                {/* Title */}
                <li
                  className={cn(
                    "text-center! font-semibold text-fig-red text-2xl",
                    dialogState.titleStyle,
                  )}
                >
                  {dialogState.title}
                </li>
              </ul>
            </AlertDialogTitle>

            {/* Description */}
            <AlertDialogDescription className="w-full text-center text-fig-secondery">
              {dialogState.description}
            </AlertDialogDescription>
          </AlertDialogHeader>

          {/* Footer Buttons */}
          <AlertDialogFooter className="sm:justify-center gap-6 mt-3">
            <AlertDialogCancel
              onClick={handleCancel}
              className={cn(
                "cursor-pointer rounded-md bg-muted border-none w-1/2 py-6 px-8",
                dialogState?.btnStyle,
              )}
            >
              {dialogState.cancelText ?? "Cencel"}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              className={cn(
                "bg-fig-red border-none bg-primary cursor-pointer rounded-md w-1/2  py-6 px-5",
                dialogState?.btnStyle,
              )}
            >
              {dialogState.confirmText ?? "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ConfirmDialogContext.Provider>
  );
};

// ✅ Hook
export default function useConfirmation(): ConfirmDialogContextType {
  const context = useContext(ConfirmDialogContext);
  if (!context) {
    throw new Error(
      "useConfirmation must be used within a ConfirmDialogProvider",
    );
  }
  return context;
}
