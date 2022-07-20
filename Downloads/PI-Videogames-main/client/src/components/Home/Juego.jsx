import "./home_css.css"
import logo from "../../img/logo.jpg";
import { NavLink } from "react-router-dom"

function Juego ({name, img, generos, id}) {
    return(
        <>
        <div className="Contein">
        <img src={`${img || logo}`} className="img" width="95%" height="150" alt="img"/>
        <NavLink to={`/detail/${id}`} className="gameName" >
            {name}
        </NavLink>
        <p className="generos">
            {generos && generos.join(" ")}
        </p>
    </div>
    </>
    )
}
export default Juego
