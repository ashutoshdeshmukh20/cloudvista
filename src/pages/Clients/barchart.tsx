import React from "react"
import ReactApexChart from "react-apexcharts"
import getChartColorsArray from "../../Components/Common/ChartDynamicColor";

const barchart = ({dataColors}:any) => {
  const spineareaChartColors = getChartColorsArray(dataColors);

  const series = [
    {
      data: [380, 430, 450, 475, 550, 584],
    },
  ]
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: true,
    },

    colors: spineareaChartColors,
    grid: {
      borderColor: "#f1f1f1",
    },
    xaxis: {
      categories: [
        "Celibrity School",
        "Beacon Engineers",
        "Antriksh Global",
        "Avinya Lab",
        "Fusion Loop",
        "6Simplex Software",
      ],
    },
  }

  return (
    <ReactApexChart options={options} series={series} type="bar" height="350" />
  )
}

export default barchart
