"use client";

import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

interface ChartComponentProps {
  chart: ChartType;
  className?: string;
}

export const ChartComponent: React.FC<ChartComponentProps> = ({
  chart,
  className,
}) => {
  return (
    <div className={className}>
      {chart.type === "bar" ? <Bar data={chart.data} /> : <Pie data={chart.data} />}
    </div>
  );
};
