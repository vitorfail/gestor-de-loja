
import "./PopupCalculadora.css";
import React, {Component} from "react";
import { Authcontext } from "../Store/Context";


export default class PopupCalculadora extends Component{
    constructor(props){
        super()
        this.state = {
        }
    }
    static contextType = Authcontext
    calcular(){
        
    }
    componentDidMount(){
    }
    render(){
        const {pp_calculadora} = this.context
        return(
            <div className={pp_calculadora}>
                <div className="menu">
                    <div className="container">
                        <div className="result">
                            <p id="result-box">0</p>
                        </div>

                        <div className="buttons">
                        <div className="button action-btn" id="clear"> AC </div>
                        <div className="button action-btn"> MC</div>
                        <div className="button num-button  action-btn"> %</div>
                        <div className="button num-button  calc-action-btn"> /</div>
                        <div className="button num-button seven">7</div>
                        <div className="button num-button eight">8</div>
                        <div className="button num-button  nine">9</div>
                        <div className="button num-button  calc-action-btn">*</div>
                        <div className="button num-button  four">4</div>
                        <div className="button num-button  five">5</div>
                        <div className="button num-button  six">6</div>
                        <div className="button num-button  calc-action-btn">-</div>
                        <div className="button num-button  one">1</div>
                        <div className="button num-button  two">2</div>
                        <div className="button num-button  three">3</div>
                        <div className="button num-button  calc-action-btn">+</div>
                        <div className="button num-button  zero">0</div>
                        <div className="button num-button  point">.</div>
                        <div className="button calc-action-btn" id="total">=</div>
                        </div>
                    </div>
                </div>
            </div>
        )    
    }

}
