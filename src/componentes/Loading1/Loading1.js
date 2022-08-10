import './Loading1.scss'
import React from 'react'

function Loading1(props){
    return(
        <div className={props.loading}>
            <div className="c-loader"></div>
        </div>

    )
}
export default Loading1