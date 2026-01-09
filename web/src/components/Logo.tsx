export function Logo() {
  return (
    <div className="flex items-center justify-center gap-2 text-blue font-semibold">
      <div className="grid h-9 w-9 place-items-center rounded-full bg-white shadow-sm border border-gray-200">
        <span aria-hidden>⛓️</span>
      </div>

      <span className="text-lg">brev.ly</span>
    </div>
  );
}
