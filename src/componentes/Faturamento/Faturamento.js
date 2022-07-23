import React, {useState} from "react";
import Chart from 'chart.js/auto';
import "./Faturamento.css";
import {Bar} from 'react-chartjs-2';


function Faturamento(){
    const [janeiro, setjaneiro] = useState(134)
    const [fevereiro, setfevereiro] = useState(789)
    const [marco, setmarco] = useState(56)
    const [abril, setabril] = useState(23)
    const [maio, setmaio] = useState(190)
    const [junho, setjunho] = useState(90)
    const [julho, setjulho] = useState(200)
    const [agosto, setagosto] = useState(78)
    const [setembro, setsetembro] = useState(87)
    const [outubro, setoutubro] = useState(19)
    const [novembro, setnovembro] = useState(45)
    const [dezembro, setdezembro] = useState(120)
    
    return(
        <div className="grafico_faturamento">
            <div className="planilha">
                <Bar
                    data={{labels: ["Janeiro", "Fevereiro", "Março", "Abril", 
                        "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
                    datasets: [{
                    label: "Faturamento mensal",
                    data: [janeiro, fevereiro, marco, abril, 
                        maio, junho, julho, agosto, 
                        setembro, outubro, novembro, dezembro],
                    backgroundColor: ['rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)',
                    'rgba(101, 253, 227, 0.2)',
                    'rgba(221, 103, 127, 0.2)',
                    'rgba(21, 83, 207, 0.2)',
                    'rgba(221, 73, 27, 0.2)',
                    'rgba(81, 43, 127, 0.2)'],
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2
                }]}}
                    options={{
                        title:{
                            display:true,
                            text:'Faturamento mensal',
                            fontSize:20
                        },
                        legend:{
                            display:true,
                            position:'right'
                        },
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }}
                />
            </div>

        </div>
    )
}
export default Faturamento;