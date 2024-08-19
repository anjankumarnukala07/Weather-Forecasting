import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
const Updategraph = ({ weatherData }) => {
    let canvasRef = useRef(null);
    let chartRef=useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ct1 = canvas.getContext('2d');
        if(chartRef.current){
            chartRef.current.destroy();
        }
        const chart = new Chart(ct1, {
            type: 'line',
            data: {
                labels: weatherData.dates,
                datasets: [
                    {
                        label: "Temperatures",
                        data: weatherData.required,
                        backgroundColor: 'orange',
                        borderColor: 'yellow',
                        borderWidth: 3,
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
        chartRef.current=chart;
    }, [weatherData]);
    return <canvas ref={canvasRef} width={0.001} height={0.001} />;
};

export default Updategraph
