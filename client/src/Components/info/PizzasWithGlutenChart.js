import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const PizzasWithGlutenChart = (props) => {
  const chartContainer = useRef(null);

  useEffect(() => {

    const { totalPizzas, names: PizzasWithoutGluten } = props.data

    const glutenFree = PizzasWithoutGluten.length
    const withGluten = totalPizzas - glutenFree

    const labels = ["gluten", "gluten-free"];
    const values = [withGluten, glutenFree];

    const chart = new Chart(chartContainer.current, {
      type: "pie",
      data: {
        labels,
        datasets: [
          {
            label: "Gluten-free vs gluten pizzas",
            data: values,
            backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
            hoverOffset: 4,
            // borderColor: "rgba(54, 162, 235, 1)",
            // borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    return () => {
      chart.destroy();
    };
  }, [props.data]);

  return <canvas ref={chartContainer} width="400" height="400" />;
};

export default PizzasWithGlutenChart;
