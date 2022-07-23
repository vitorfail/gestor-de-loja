import "./LadoDireito.css";

function LadoDireito(props){
    return(
        <div className="lado-direito">
            {props.children}
        </div>
    )
}
export default LadoDireito;