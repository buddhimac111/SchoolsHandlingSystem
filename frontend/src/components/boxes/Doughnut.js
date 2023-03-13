import "./doughnut.scss";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
    responsive: true,
    aspectRatio: 0.74,
    plugins: {
      legend: {
        position: 'bottom',
      },
     
    },
   
  };

export const data = {
  labels: ['Primary (1-5)', 'Secondary (6-9)', 'Advanced (10-13)'],
  datasets: [
    {
      label: 'Number of students',
      data: [500, 1000, 2000],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 2,
    },
  ],
};

const DoughnutChart = () =>  {
  return (
    <div className="doughnutBox pt-4 px-5 pb-5">
        <h5 >Students in each section</h5>
        <Doughnut options={options} data={data} />
    </div>
  
  );
}

export default DoughnutChart;