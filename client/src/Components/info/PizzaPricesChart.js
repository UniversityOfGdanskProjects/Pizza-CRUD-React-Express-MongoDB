import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'

const PizzaPricesChart = (props) => {
  
  const chartContainer = useRef(null);

  useEffect(() => {

    const { minSmall, maxSmall, minLarge, maxLarge, averageSmallPrice, averageLargePrice } = props.data

    const chart = new Chart(chartContainer.current, {
      type: 'bar',
      data: {
        labels: ['Small Pizzas', 'Large Pizzas'],
        datasets: [
          {
            label: 'Min Price',
            data: [minSmall, minLarge],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'Max Price',
            data: [maxSmall, maxLarge],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          },
          {
            label: 'Average Price',
            data: [averageSmallPrice, averageLargePrice],
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: 
            {
              ticks: {
                beginAtZero: true
              }
            }
        }
      }
    });

    return () => {
      chart.destroy();
    };
  }, [props.data]);

  return <canvas ref={chartContainer} />;
};

export default PizzaPricesChart;