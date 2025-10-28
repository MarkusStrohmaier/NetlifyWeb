import { CalculationResult } from "./EtfSavingsPlanCalculator";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

interface SavingsChartProps {
  data: CalculationResult[];
  type: "stacked" | "lines";
}

export function SavingsChart({ data, type }: SavingsChartProps) {
  // Nimm jeden 12. Datenpunkt für bessere Lesbarkeit (jährlich)
  const yearlyData = data.filter((_, index) => index % 12 === 11 || index === data.length - 1);

  const chartData = yearlyData.map((item) => ({
    year: Math.floor(item.month / 12),
    Einzahlungen: Math.round(item.cumulativeContributions),
    Zinsen: Math.round(item.cumulativeInterest),
    Gesamt: Math.round(item.total),
  }));

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border rounded-lg p-3 shadow-lg">
          <p className="mb-2">Jahr {label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (type === "stacked") {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorContributions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2} />
            </linearGradient>
            <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="year"
            label={{ value: "Jahre", position: "insideBottom", offset: -5 }}
            className="text-xs"
          />
          <YAxis
            tickFormatter={formatCurrency}
            className="text-xs"
            width={80}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area
            type="monotone"
            dataKey="Einzahlungen"
            stackId="1"
            stroke="#3b82f6"
            fill="url(#colorContributions)"
          />
          <Area
            type="monotone"
            dataKey="Zinsen"
            stackId="1"
            stroke="#10b981"
            fill="url(#colorInterest)"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="year"
          label={{ value: "Jahre", position: "insideBottom", offset: -5 }}
          className="text-xs"
        />
        <YAxis
          tickFormatter={formatCurrency}
          className="text-xs"
          width={80}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line
          type="monotone"
          dataKey="Gesamt"
          stroke="#6366f1"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="Einzahlungen"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="Zinsen"
          stroke="#10b981"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
