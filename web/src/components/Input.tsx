import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function Input({ label, error, ...props }: Props) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-semibold uppercase tracking-wide text-gray-900/70">
        {label}
      </span>

      <input
        {...props}
        className={[
          "w-full rounded-lg border bg-white px-4 py-3 text-sm outline-none transition",
          error
            ? "border-danger focus:border-danger"
            : "border-gray-200 focus:border-blue",
          props.disabled ? "opacity-60 cursor-not-allowed" : "",
        ].join(" ")}
      />

      {error ? (
        <div className="mt-2 flex items-center gap-2 text-sm text-danger">
          <span aria-hidden>⚠️</span>
          <span>{error}</span>
        </div>
      ) : null}
    </label>
  );
}
