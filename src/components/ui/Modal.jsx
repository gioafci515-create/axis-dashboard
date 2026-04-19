import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

export const Modal = Dialog.Root;
export const ModalTrigger = Dialog.Trigger;
export const ModalClose = Dialog.Close;

const SIZES = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export function ModalContent({
  className,
  size = "md",
  showClose = true,
  children,
  ...props
}) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay
        className={cn(
          "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
        )}
      />
      <Dialog.Content
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-[92vw] -translate-x-1/2 -translate-y-1/2 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--bg-elevated)] shadow-lg",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          SIZES[size],
          className
        )}
        {...props}
      >
        {children}
        {showClose && (
          <Dialog.Close
            aria-label="Close"
            className="absolute top-3.5 right-3.5 size-7 grid place-items-center rounded-md text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
          >
            <X className="size-4" />
          </Dialog.Close>
        )}
      </Dialog.Content>
    </Dialog.Portal>
  );
}

export function ModalHeader({ className, children, ...props }) {
  return (
    <div className={cn("px-6 pt-5 pb-4", className)} {...props}>
      {children}
    </div>
  );
}

export function ModalTitle({ className, children, ...props }) {
  return (
    <Dialog.Title
      className={cn(
        "text-[17px] font-semibold tracking-tight text-[var(--text-primary)]",
        className
      )}
      {...props}
    >
      {children}
    </Dialog.Title>
  );
}

export function ModalDescription({ className, children, ...props }) {
  return (
    <Dialog.Description
      className={cn("mt-1 text-[13.5px] text-[var(--text-tertiary)]", className)}
      {...props}
    >
      {children}
    </Dialog.Description>
  );
}

export function ModalBody({ className, children, ...props }) {
  return (
    <div className={cn("px-6 pb-5", className)} {...props}>
      {children}
    </div>
  );
}

export function ModalFooter({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-2 px-6 py-4 border-t border-[var(--border)] bg-[var(--bg-muted)]/40 rounded-b-[var(--radius-xl)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
