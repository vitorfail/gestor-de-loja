import React, {useState, useEffect} from "react";
import Chart from 'chart.js/auto';
import "./Faturamento.css";
import {Bar, PolarArea} from 'react-chartjs-2';
import Axios from "../../Axios"
import Exit from "../../Exit"
import Loading1 from "../../componentes/Loading1/Loading1"

function Faturamento(props){
    //const { setsem_internet} = React.useContext()
    const [loading_, setloading_] = useState('loading')

    const [ano_contas, setano_contas] = useState('2022')
    const [mes_contas, setmes_contas] = useState('')
    const [ contas, setcontas] = useState(<div className="conta"><h3>Sem contas esse mês</h3></div>)

    const [ano_faturamento, setano_faturamento] = useState('')
    const [ano_tipo_pagamento, setano_tipo_pagamento] = useState('')

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
        var data = new Date()
        if(ano_faturamento === '' && ano_tipo_pagamento === ''){
            setano_contas(String(data.getFullYear()))

            faturamento_ano(String(data.getFullYear()))
            tipos_de_pagamento(String(data.getFullYear()))
            var mes = ''
            if(data.getMonth()+1 <10){
                mes = '0'+String(data.getMonth()+1)
            }
            else{
                mes = String(data.getMonth()+1)
            }
            contas_mes(mes)
        }
    })
    function faturamento_ano(e){
        setano_faturamento(e)
        Axios.post('index.php?url=faturamento/pesquisa', {ano:e})
        .then(res => {
            if(res.data.data === 'Usuário não autenticado'){
                Exit()
            }
            else{
                setjaneiro(res.data.data[0])
                setfevereiro(res.data.data[1])
                setmarco(res.data.data[2])
                setabril(res.data.data[3])
                setmaio(res.data.data[4])
                setjunho(res.data.data[5])
                setjulho(res.data.data[6])
                setagosto(res.data.data[7])
                setsetembro(res.data.data[8])
                setoutubro(res.data.data[9])
                setnovembro(res.data.data[10])
                setdezembro(res.data.data[11])
                       
            }
        }).catch(er =>{
            //setsem_internet('sem-internet mostrar')
        })
    }
    function tipos_de_pagamento(e){
        setano_tipo_pagamento(e)
        Axios.post('index.php?url=tipopagamento/pesquisa', {ano:e})
        .then(res => {
            if(res.data.data === 'Usuário não autenticado'){
                Exit()
            }
            else{
                var dados = res.data.data 
                if(dados === 0){

                }
                else{
                    setavista(dados[0])
                    setcartao(dados[1])
                    setboleto(dados[2])
                    setpix(dados[3])
                }
            }
        }).catch(er =>{
            //setsem_internet('sem-internet mostrar')
        })
    }
    function contas_mes(e){
        setmes_contas(e)
        Axios.post('index.php?url=contas/pesquisa', {ano:ano_contas, mes:e})
        .then(res => {
            if(res.data.data === 'Usuário não autenticado'){
                Exit()
            }
            else{
                var dados = res.data.data
                if(dados === 0){
                    setcontas(<div className="conta"><h3>Sem contas esse mês</h3></div>)
                }
                else{
                    var contas = []
                    for(var i =0; i < dados.length; i++){
                        var data_conta = new Date(dados[i]["data_vencimento"])
                        var data_hoje = new Date()
                        var situacao = ''
                        if(dados[i]["situacao"] === "Aberto"){
                            if(data_hoje.getTime() === data_conta.getTime()){
                                situacao = 'prazo-final'
                            }
                            if(data_hoje.getTime() > data_conta.getTime()){
                                situacao = 'vencido'
                            }
                            if(data_hoje.getTime() < data_conta.getTime()){
                                situacao = 'prazo'
                            }
                        }
                        else{
                            situacao = 'pago'
                        }
                        contas.push(<div key={Math.random()} className="conta">
                                        <h3 style={{"margin":"0"}}>{dados[i]["descricao"]}</h3>
                                        <h3 className={situacao} style={{"margin":"0"}}>{dados[i]["data_vencimento"]}</h3>
                                        <label className="switch" >
                                            <input type="checkbox"></input>
                                            <span className="slider round"></span>
                                        </label>
                                    </div>)
       
                    }   
                    setcontas(contas)
                }
            }
        }).catch(er =>{
            //setsem_internet('sem-internet mostrar')
        })
    }
    function contas_ano(e){
        setano_contas(e)
        Axios.post('index.php?url=contas/pesquisa', {ano:e, mes:mes_contas})
        .then(res => {
            if(res.data.data === 'Usuário não autenticado'){
                Exit()
            }
            else{
                var dados = res.data.data
                if(dados === 0){
                    setcontas(<div className="conta"><h3>Sem contas esse mês</h3></div>)
                }
                else{
                    var contas = []
                    for(var i =0; i < dados.length; i++){
                        var data_conta = new Date(dados[i]["data_vencimento"])
                        var data_hoje = new Date()
                        var situacao = ''
                        if(dados[i]["situacao"] === "Aberto"){
                            if(data_hoje.getTime() === data_conta.getTime()){
                                situacao = 'prazo-final'
                            }
                            if(data_hoje.getTime() > data_conta.getTime()){
                                situacao = 'vencido'
                            }
                            if(data_hoje.getTime() < data_conta.getTime()){
                                situacao = 'prazo'
                            }
                        }
                        contas.push(<div key={Math.random()} className="conta">
                                        <h3 style={{"margin":"0"}}>{dados[i]["descricao"]}</h3>
                                        <h3 className={situacao} style={{"margin":"0"}}>{dados[i]["data_vencimento"]}</h3>
                                        <label className="switch" >
                                            <input type="checkbox"></input>
                                            <span className="slider round"></span>
                                        </label>
                                    </div>)
       
                    }   
                    setcontas(contas)
                }
            }
        }).catch(er =>{
            //setsem_internet('sem-internet mostrar')
        })
    }
    return(
        <div className="grafico_faturamento">
            <div style={{"width":"80%",  "marginLeft":"34px"}}>
                <select className="anos" value={ano_faturamento} onChange={(event) => faturamento_ano(event.target.value)}>
                    <option value="Todos os anos">Todos</option>
                    <option value="1984">1984</option>
                    <option value="1985">1985</option>
                    <option value="1986">1986</option>
                    <option value="1987">1987</option>
                    <option value="1988">1988</option>
                    <option value="1989">1989</option>
                    <option value="1990">1990</option>
                    <option value="1991">1991</option>
                    <option value="1992">1992</option>
                    <option value="1993">1993</option>
                    <option value="1994">1994</option>
                    <option value="1995">1995</option>
                    <option value="1996">1996</option>
                    <option value="1997">1997</option>
                    <option value="1998">1998</option>
                    <option value="1999">1999</option>
                    <option value="2001">2001</option>
                    <option value="2002">2002</option>
                    <option value="2003">2003</option>
                    <option value="2004">2004</option>
                    <option value="2005">2005</option>
                    <option value="2006">2006</option>
                    <option value="2007">2007</option>
                    <option value="2008">2008</option>
                    <option value="2009">2009</option>
                    <option value="2010">2010</option>
                    <option value="2011">2011</option>
                    <option value="2012">2012</option>
                    <option value="2013">2013</option>
                    <option value="2014">2014</option>
                    <option value="2015">2015</option>
                    <option value="2016">2016</option>
                    <option value="2017">2017</option>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="2030">2030</option>
                    <option value="2031">2031</option>
                    <option value="2032">2032</option>
                    <option value="2033">2033</option>
                    <option value="2034">2034</option>
                    <option value="2035">2035</option>
                    <option value="2036">2036</option>
                    <option value="2037">2037</option>
                    <option value="2038">2038</option>
                    <option value="2039">2039</option>
                    <option value="2040">2040</option>
                </select>
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
            </div>
            <div>
                <select className="anos" value={ano_tipo_pagamento} onChange={(event) => tipos_de_pagamento(event.target.value)}>
                    <option value="Todos os anos">Todos</option>
                    <option value="1984">1984</option>
                    <option value="1985">1985</option>
                    <option value="1986">1986</option>
                    <option value="1987">1987</option>
                    <option value="1988">1988</option>
                    <option value="1989">1989</option>
                    <option value="1990">1990</option>
                    <option value="1991">1991</option>
                    <option value="1992">1992</option>
                    <option value="1993">1993</option>
                    <option value="1994">1994</option>
                    <option value="1995">1995</option>
                    <option value="1996">1996</option>
                    <option value="1997">1997</option>
                    <option value="1998">1998</option>
                    <option value="1999">1999</option>
                    <option value="2001">2001</option>
                    <option value="2002">2002</option>
                    <option value="2003">2003</option>
                    <option value="2004">2004</option>
                    <option value="2005">2005</option>
                    <option value="2006">2006</option>
                    <option value="2007">2007</option>
                    <option value="2008">2008</option>
                    <option value="2009">2009</option>
                    <option value="2010">2010</option>
                    <option value="2011">2011</option>
                    <option value="2012">2012</option>
                    <option value="2013">2013</option>
                    <option value="2014">2014</option>
                    <option value="2015">2015</option>
                    <option value="2016">2016</option>
                    <option value="2017">2017</option>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="2030">2030</option>
                    <option value="2031">2031</option>
                    <option value="2032">2032</option>
                    <option value="2033">2033</option>
                    <option value="2034">2034</option>
                    <option value="2035">2035</option>
                    <option value="2036">2036</option>
                    <option value="2037">2037</option>
                    <option value="2038">2038</option>
                    <option value="2039">2039</option>
                    <option value="2040">2040</option>
                </select>
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
            <div>
                <div style={{"display":"block", "width":"80%",  "marginLeft":"34px", "marginBottom":"45px"}}>
                    <div style={{"display":"flex", "justifyContent":"center"}}>
                        <select value={mes_contas} onChange={(event) => contas_mes(event.target.value)} className="datas">
                            <option value="Todos os meses">Todos</option>
                            <option value='01'>Janeiro</option>
                            <option value='02'>Fevereiro</option>
                            <option value='03'>Março</option>
                            <option value='04'>Abril</option>
                            <option value='05'>Maio</option>
                            <option value='06'>Junho</option>
                            <option value='07'>Julho</option>
                            <option value='08'>Agosto</option>
                            <option value='09'>Setembro</option>
                            <option value='10'>Outubro</option>
                            <option value='11'>Novembro</option>
                            <option value='12'>Dezembro</option>
                        </select>
                        <select className="datas" value={ano_contas} onChange={(event) => contas_ano(event.target.value)}>
                            <option value="1984">1984</option>
                            <option value="1985">1985</option>
                            <option value="1986">1986</option>
                            <option value="1987">1987</option>
                            <option value="1988">1988</option>
                            <option value="1989">1989</option>
                            <option value="1990">1990</option>
                            <option value="1991">1991</option>
                            <option value="1992">1992</option>
                            <option value="1993">1993</option>
                            <option value="1994">1994</option>
                            <option value="1995">1995</option>
                            <option value="1996">1996</option>
                            <option value="1997">1997</option>
                            <option value="1998">1998</option>
                            <option value="1999">1999</option>
                            <option value="2001">2001</option>
                            <option value="2002">2002</option>
                            <option value="2003">2003</option>
                            <option value="2004">2004</option>
                            <option value="2005">2005</option>
                            <option value="2006">2006</option>
                            <option value="2007">2007</option>
                            <option value="2008">2008</option>
                            <option value="2009">2009</option>
                            <option value="2010">2010</option>
                            <option value="2011">2011</option>
                            <option value="2012">2012</option>
                            <option value="2013">2013</option>
                            <option value="2014">2014</option>
                            <option value="2015">2015</option>
                            <option value="2016">2016</option>
                            <option value="2017">2017</option>
                            <option value="2018">2018</option>
                            <option value="2019">2019</option>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                            <option value="2028">2028</option>
                            <option value="2029">2029</option>
                            <option value="2030">2030</option>
                            <option value="2031">2031</option>
                            <option value="2032">2032</option>
                            <option value="2033">2033</option>
                            <option value="2034">2034</option>
                            <option value="2035">2035</option>
                            <option value="2036">2036</option>
                            <option value="2037">2037</option>
                            <option value="2038">2038</option>
                            <option value="2039">2039</option>
                            <option value="2040">2040</option>
                        </select>
                    </div>
                    <div style={{"display": "block", "justifyContent":"center"}}>
                        {contas}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Faturamento;