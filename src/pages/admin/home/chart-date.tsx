import { useEffect, useState } from "react";
import { HomeAdminModuleController } from "./home.controller";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Filler,
  Legend,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { ValidatorCustomModule } from "../../../helpers/validator";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  PointElement,
  LineElement
);

interface IAnalyticsBookingDateChartProps {
  admin_id: number;
  token: string;
}
const AnalyticsBookingDateChart: React.FC<IAnalyticsBookingDateChartProps> = ({
  admin_id,
  token,
}) => {
  const [stateData, setStateData] = useState<{
    label: string[];
    data: number[];
    percent: number[];
  }>({
    label: ["Chưa xử lý", "Từ chối", "Chấp nhận", "Hoàn thành"],
    data: [],
    percent: [],
  });
  const [date, setDate] = useState<string>(ValidatorCustomModule.getDate());
  const init = async () => {
    const date$ = date.split("-").reverse().join("-");
    const response = await HomeAdminModuleController.analyticDate(
      admin_id,
      token,
      date$
    );
    setStateData({
      label: response?.label,
      data: response?.data,
      percent: response?.percent,
    });
  };
  const handleAnalytic = () => {
    init();
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <article className="font-2">
      <section className="space-y-2">
        <h1 className="font-3 xl:text-xl text-color2">
          Thống kê số liệu trong ngày
        </h1>
        <div className="space-x-2 text-white ">
          <input
            type="date"
            className="outline-none bg-color3 text-white px-2 py-1 rounded h-10"
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
          <button
            className="h-10 px-3 bg-color2 rounded hover:bg-color5 hover:text-color2 transition-all shadow"
            onClick={handleAnalytic}
          >
            Thống kê
          </button>
        </div>
      </section>
      <section>
        <Bar
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top" as const,
              },
              title: {
                display: true,
                text: `Thống kê số liệu trong ngày ${date}`,
              },
            },
          }}
          data={{
            labels: stateData.label,
            datasets: [
              {
                label: "Số lượng hồ sơ",
                data: stateData.data,
                backgroundColor: "rgba(255, 99, 132, 0.5)",
              },
            ],
          }}
        />
      </section>
      <section>
        <Line
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top" as const,
              },
              title: {
                display: true,
                text: `Tỉ lệ phần trăm gần đúng của số lượng hồ sơ bệnh nhân trong ngày ${date}`,
              },
            },
          }}
          data={{
            labels: stateData.label,
            datasets: [
              {
                fill: true,
                label: "Phần trăm tỉ số hồ sơ",
                data: stateData.percent,
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
              },
            ],
          }}
        />
      </section>
    </article>
  );
};
export default AnalyticsBookingDateChart;
