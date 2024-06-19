export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-emerald-100 text-emerald-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-emerald-900 dark:text-emerald-300 w-fit">
      {children}
    </span>
  )
}
