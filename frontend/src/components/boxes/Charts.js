import "./charts.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
    responsive: true,
    aspectRatio: 1.789,
    plugins: {
      legend: {
        position: 'top',
      },
     
    },
   
  };
  
  const labels = ['G-1', 'G-2', 'G-3', 'G-4', 'G-4','G-5', 'G-6', 'G-7', 'G-8', 'G-9','G-10', 'G-11', 'G-12', 'G-13'];
  
  export const data = {
    labels ,
    datasets: [
        {
            label: '2022-Term-3',
            data: [65,59,80,81,56,55,40,45,55,65,75,85,95,100],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132,0.5)',
            borderWidth: 2
        },
        {
            label: '2023-Term-1',
            data: [28,48,40,19,86,27,90,56,45,35,65,100,50,40],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            borderWidth: 2
        },
       
    ],
  };

 const Chart = () => {
    return (
    <div className='chartBox p-4'> 
      <h5>Average Marks Distribution </h5>
      <Line options={options} data={data}/>
    </div>
    )

 }

    export default Chart;