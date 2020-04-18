import React, { useEffect, useState } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";

const Chart = ({ data, country }) => {
  const { confirmed, deaths, recovered } = data;
  const [dailyData, setDailyData] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetchDailyData();
      setDailyData(response);
    };
    fetchApi();
  }, []);

  const lineChart = () => {
    return dailyData ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [
            {
              data: dailyData.map(({ confirmed }) => confirmed),
              label: "Infected",
              borderColor: "#3333ff",
              fill: true,
            },
            {
              data: dailyData.map(({ deaths }) => deaths),
              label: "Deaths",
              borderColor: "red",
              backgroundColor: "rgba(255,0,0,0.5)",
              fill: true,
            },
            {
              data: dailyData.map(({ recovered }) => recovered),
              label: "Recovered",
              borderColor: "green",
              backgroundColor: " rgba(0, 255, 0, 0.5)",
              fill: true,
            },
          ],
        }}
      />
    ) : null;
  };

  const barChart = () => {
    return confirmed ? (
      <Bar
        data={{
          labels: ["Infected", "Recovered", "Deaths"],
          datasets: [
            {
              label: "People",
              backgroundColor: [
                " rgba(0, 0, 255, 0.5)",
                " rgba(0, 255, 0, 0.5)",
                "rgba(255, 0, 0, 0.5)",
              ],
              data: [confirmed.value, recovered.value, deaths.value],
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: {
            diaplay: true,
            text: `Current state in ${country}`,
          },
        }}
      />
    ) : null;
  };
  console.log("object", country);
  return (
    <div className={styles.container}>{country ? barChart() : lineChart()}</div>
  );
};

export default Chart;
