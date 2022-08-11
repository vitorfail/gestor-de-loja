import React, {useState, useEffect} from "react";
import Chart from 'chart.js/auto';
import "./Faturamento.css";
import {Bar, PolarArea} from 'react-chartjs-2';


function Faturamento(props){
    const [janeiro, setjaneiro] = useState(0)
    const [fevereiro, setfevereiro] = useState(0)
    const [marco, setmarco] = useState(0)
    const [abril, setabril] = useState(0)
    const [maio, setmaio] = useState(0)
    const [junho, setjunho] = useState(0)
    const [julho, setjulho] = useState(0)
    const [agosto, setagosto] = useState(0)
    const [setembro, setsetembro] = useState(0)
    const [outubro, setoutubro] = useState(0)
    const [novembro, setnovembro] = useState(0)
    const [dezembro, setdezembro] = useState(0)
    
    const [avista, setavista] = useState(0);
    const [cartao, setcartao] = useState(0);
    const [boleto, setboleto] = useState(0);
    const [pix, setpix] = useState(0);

    useEffect(() =>{
        iniciar()
    })
    function iniciar(){
        setjaneiro(props.faturamento_mes[0])
        setfevereiro(props.faturamento_mes[1])
        setmarco(props.faturamento_mes[2])
        setabril(props.faturamento_mes[3])
        setmaio(props.faturamento_mes[4])
        setjunho(props.faturamento_mes[5])
        setjulho(props.faturamento_mes[6])
        setagosto(props.faturamento_mes[7])
        setsetembro(props.faturamento_mes[8])
        setoutubro(props.faturamento_mes[9])
        setnovembro(props.faturamento_mes[10])
        setdezembro(props.faturamento_mes[11])
        setavista(props.tipos_de_pagamento[0])
        setcartao(props.tipos_de_pagamento[1])
        setboleto(props.tipos_de_pagamento[1])
        setpix(props.tipos_de_pagamento[1])
    }
    return(
        <div className="grafico_faturamento">
            <div className="planilha">
                <Bar
                    data={{labels: ["Janeiro", "Fevereiro", "Março", "Abril", 
                        "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
                    datasets: [{
                    label: "Faturamento mensal: R$",
                    data: [janeiro, fevereiro, marco, abril, 
                        maio, junho, julho, agosto, 
                        setembro, outubro, novembro, dezembro],
                    backgroundColor: ['rgba(255, 99, 132, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                    'rgba(255, 205, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(201, 203, 207, 0.7)',
                    'rgba(101, 253, 227, 0.7)',
                    'rgba(221, 103, 127, 0.7)',
                    'rgba(21, 83, 207, 0.7)',
                    'rgba(221, 73, 27, 0.7)',
                    'rgba(81, 43, 127, 0.7)'],
                    borderColor: 'rgba(0,0,0,0)',
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
            <div className="area">
                <PolarArea data={{labels: [
                                "A vista",
                                "Cartão",
                                "Boleto",
                                "Pix"
                            ],datasets: [{
                                    label: 'Tipos de pagamento',
                                    data: [avista, 
                                        cartao, 
                                        boleto, 
                                        pix],
                                    backgroundColor: [
                                    'rgb(255, 99, 132)',
                                    'rgb(75, 192, 192)',
                                    'rgb(255, 205, 86)',
                                    'rgb(201, 203, 207)'
                                    ]}]
                                }}/>   
                </div>
        </div>
    )
}
export default Faturamento;