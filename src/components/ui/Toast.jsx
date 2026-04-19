import { Toaster as SonnerToaster, toast } from "sonner";
import { useTheme } from "@/hooks/useTheme";

export { toast };

export function Toaster() {
  const { theme } = useTheme();
  return (
    <SonnerToaster
      theme={theme}
      position="bottom-right"
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast:
            "!rounded-[var(--radius-lg)] !border !border-[var(--border)] !bg-[var(--bg-elevated)] !text-[var(--text-primary)] !shadow-md !font-sans",
          title: "!text-[13.5px] !font-semibold",
          description: "!text-[12.5px] !text-[var(--text-tertiary)]",
        },
      }}
    />
  );
}
