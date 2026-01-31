type StatCardProps = {
  title: string;
  value: string;
  subtitle?: string;
};

export default function StatCard({ title, value, subtitle }: StatCardProps) {
  return (
    <div className="rounded-xl bg-gray-200 p-5 shadow-sm transition hover:shadow-md">
      {/* TITLE */}
      <p className="text-sm font-semibold text-gray-700">{title}</p>

      {/* VALUE */}
      <p className="mt-2 text-2xl font-bold text-[#1F3A93]">{value}</p>

      {/* OPTIONAL SUBTITLE */}
      {subtitle && <p className="mt-1 text-xs text-gray-600">{subtitle}</p>}
    </div>
  );
}
