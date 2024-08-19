import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
const Graph = ({ redata }) => {
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
                labels: redata.dates,
                datasets: [
                    {
                        label:"Humidity",
                        data: redata.required,
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
    }, [redata]);
    return <canvas ref={canvasRef} width={0.1} height={0.1} />;
};

export default Graph
