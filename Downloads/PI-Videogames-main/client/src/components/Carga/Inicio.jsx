import "./inicio_css.css"
import { NavLink } from "react-router-dom";

const Inicio = () => {
    return (
        <div className="conteiner">
            <div className="centrado">
            <NavLink exact to="/home" className="home" >
              Home
            </NavLink>
            </div>
        </div>
    )
}
  
  export default Inicio
