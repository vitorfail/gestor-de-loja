
import "./PopupCalculadora.css";
import React, {Component} from "react";
import { Authcontext } from "../Store/Context";


export default class PopupCalculadora extends Component{
    constructor(){
        super()
        this.state = {
            resultado:'0'
        }
        this.calcular = this.calcular.bind(this)
    }
    static contextType = Authcontext
    calcular(e){
        if(e === "AC"){
            if(this.state.resultado !== '0'){
                if(this.state.resultado.length === 1){
                    this.setState({resultado:'0'})
                }
                else{
                    this.setState({resultado: this.state.resultado.substring(0, this.state.resultado.length - 1)})
                }
            }
        }
        else{
            if(e === "MC"){
                this.setState({resultado:'0'})
            }
            else{
                if(e === "MC"){
                    this.setState({resultado:'0'})
                }
                else{
                    if(e === "="){
                        var simbolo = this.state.resultado.charAt(this.state.resultado.length-1)
                        if(simbolo === "%"|| simbolo === "+" || simbolo === "-" || simbolo === "*" || simbolo === "*" || simbolo === "." || e === "÷" || e === '√'){
            
                        }
                        else{
                            this.setState({resultado: String(eval(this.state.resultado))})
                        }
                    }
                    else{
                        if(e === "%"|| e === "+" || e === "-" || e === "*" || e === "*" || e === "." || e === "÷" || e === '√'){
                            var simbolo = this.state.resultado.charAt(this.state.resultado.length-1)
                            if(simbolo === "%"|| simbolo === "+" || simbolo === "-" || simbolo === "*" || simbolo === "*" || simbolo === "." || e === "÷" || e === '√'){
            
                            }
                            else{
                                if(this.state.resultado === '0'){
                                    this.setState({resultado: e})
                                }
                                else{
                                    this.setState({resultado: this.state.resultado + e})
                                }
                            }
                        }
                        else{
                            if(this.state.resultado === '0'){
                                this.setState({resultado: e})
                            }
                            else{
                                this.setState({resultado: this.state.resultado + e})
                            }        
                        }
                    }
                }
        
            }    

        }
    }
    componentDidMount(){
    }
    render(){
        const {pp_calculadora, setpp_calculadora} = this.context
        return(
            <div className={pp_calculadora}>
                <div className="menu">
                    <div style={{"display":"flex", "justifyContent": "right", "marginLeft":"34px", "width": "420px", "alignItems": "center"}}>
                        <h3 onClick={() => setpp_calculadora('popup-calculadora')}>X</h3>
                    </div>
                    <div className="container">
                        <div className="result">
                            <p id="result-box">{this.state.resultado}</p>
                        </div>

                        <div className="buttons">
                            <div onClick={(event) => this.calcular(event.target.innerText)} className="button action-btn" id="clear">AC</div>
                            <div onClick={(event) => this.calcular(event.target.innerText)} className="button action-btn">MC</div>
                            <div onClick={(event) => this.calcular(event.target.innerText)} className="button num-button  action-btn">%</div>
                            <div onClick={(event) => this.calcular(event.target.innerText)} className="button num-button seven">7</div>
                            <div onClick={(event) => this.calcular(event.target.innerText)} className="button num-button  calc-action-btn">÷</div>
                            <div onClick={(event) => this.calcular(event.target.innerText)} className="button num-button eight">8</div>
                            <div onClick={(event) => this.calcular(event.target.innerText)} className="button num-button  nine">9</div>
                            <div onClick={(event) => this.calcular(event.target.innerText)} className="button num-button  four">4</div>
                            <div onClick={(event) => this.calcular(event.target.innerText)} className="button num-button  five">5</div>
                            <div onClick={(event) => this.calcular(event.target.innerText)} className="button num-button  calc-action-btn">*</div>
                            <div onClick={(event) => this.calcular(event.target.innerText)} className="button num-button  six">6</div>
                            <div onClick={(event) => this.calcular(event.target.innerText)} className="button num-button  one">1</div>
                            <div onClick={(event) => this.calcular(event.target.innerText)} className="button num-button  two">2</div>
                            <div onClick={(event) => this.calcular(event.target.innerText)} className="button num-button  three">3</div>
                            <div onClick={(event) => this.calcular(event.target.innerText)} className="button num-button  calc-action-btn">-</div>
                            <div onClick={(event) => this.calcular(event.target.innerText)} className="button num-button  calc-action-btn">+</div>
                            <div onClick={(event) => this.calcular(event.target.innerText)} className="button num-button  calc-action-btn">√</div>
                            <div onClick={(event) => this.calcular(event.target.innerText)} className="button num-button  zero">0</div>
                            <div onClick={(event) => this.calcular(event.target.innerText)} className="button num-button  point">.</div>
                            <div onClick={(event) => this.calcular(event.target.innerText)} className="button calc-action-btn" id="total">=</div>
                        </div>
                    </div>
                </div>
            </div>
        )    
    }

}
