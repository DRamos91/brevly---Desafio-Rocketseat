import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren<{
    loading?: boolean;
  }>;

export function Button({ loading, disabled, children, ...props }: Props) {
  const isDisabled = disabled || loading;

  return (
    <button
      {...props}
      disabled={isDisabled}
      className="w-full rounded-lg bg-blue px-4 py-3 text-sm font-semibold text-white hover:bg-blue-dark disabled:cursor-not-allowed disabled:bg-blue/40"
    >
      {loading ? "Salvando..." : children}
    </button>
  );
}
