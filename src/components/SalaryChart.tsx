"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { bransch: "IT & Tech", lon: 48500 },
  { bransch: "Bank & Finans", lon: 45600 },
  { bransch: "Industri", lon: 38200 },
  { bransch: "Bygg & Anläggning", lon: 36800 },
  { bransch: "Transport", lon: 34100 },
  { bransch: "Vård & Omsorg", lon: 32400 },
  { bransch: "Handel", lon: 29500 },
  { bransch: "Hotell & Restaurang", lon: 27200 },
];

const formatKr = (value: number) => `${(value / 1000).toFixed(1)}k`;

export default function SalaryChart() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={isMobile ? 320 : 400}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 0, right: 10, bottom: 0, left: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
        <XAxis
          type="number"
          tickFormatter={formatKr}
          tick={{ fontSize: isMobile ? 10 : 12, fill: "#64748B" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="bransch"
          width={isMobile ? 100 : 140}
          tick={{ fontSize: isMobile ? 11 : 13, fill: "#1A1A2E" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          formatter={(value) => [`${Number(value).toLocaleString("sv-SE")} kr`, "Medianlön"]}
          contentStyle={{
            borderRadius: 8,
            border: "1px solid #E2E8F0",
            fontSize: 13,
          }}
        />
        <Bar dataKey="lon" radius={[0, 6, 6, 0]} barSize={isMobile ? 22 : 28}>
          {data.map((_, index) => (
            <Cell key={index} fill={index < 2 ? "#E8613C" : "#0F2B46"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
