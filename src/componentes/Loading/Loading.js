import React, {Component} from 'react';
import '../Loading/Loading.scss';
export default class Loading extends Component{
    constructor(props){
        super(props)
        this.state= {
        }
    }
    render(){
        return(
            <div className='corpo'>
                <div className="clock-loader"></div>
            </div>
        )
    }
}