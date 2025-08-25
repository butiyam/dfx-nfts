interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  delay?: number;
}

export default function InfoCard({ icon, title, value, delay = 0 }: InfoCardProps) {
  return (
    <div
      className="relative p-1 rounded-2xl opacity-0 animate-fadeIn"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Card content (static) */}
      <div className="relative bg-gray-900 text-white p-6 rounded-2xl border-4 border-gradient flex flex-col items-center justify-center gap-3">
        <div className="text-4xl text-blue-400">{icon}</div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
