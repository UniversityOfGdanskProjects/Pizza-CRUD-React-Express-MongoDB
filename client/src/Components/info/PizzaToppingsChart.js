import React, { useEffect, useRef } from "react";
import Chart from 'chart.js/auto'

const PizzaToppingsChart = (props) => {
  const chartContainer = useRef(null);

  useEffect(() => {

    const labels = props.data.map(item => item._id);
    const values = props.data.map(item => item.count);

    // const labels = ["a", "b", "c"];
    // const values = [1, 2, 3];

    const chart = new Chart(chartContainer.current, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Topping occurrences in all pizzas:",
            data: values,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: 
            {
              ticks: {
                beginAtZero: true,
              },
            },
        },
        responsive: true,
        maintainAspectRatio: false
      },
    });

    return () => {
      chart.destroy();
    };
  }, [props.data]);

  return <canvas ref={chartContainer} />;
};

export default PizzaToppingsChart;
