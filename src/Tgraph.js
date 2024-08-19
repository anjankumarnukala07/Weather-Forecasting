import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
const Tgraph = ({ rdata }) => {
    let canvasRef = useRef(null);
    let chartRef=useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ct1 = canvas.getContext('2d');
        if(chartRef.current){
            chartRef.current.destroy();
        }
        const chart = new Chart(ct1, {
            type: 'bar',
            data: {
                labels: rdata.dates,
                datasets: [
                    {
                        label:"Highest",
                        data: rdata.required,
                        backgroundColor: 'yellow',
                        borderColor: 'orange',
                        borderWidth: 1,
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
    }, [rdata]);
    return <canvas ref={canvasRef} width={1} height={0.1} />;
};

export default Tgraph
