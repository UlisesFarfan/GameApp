import "./inicio_css.css"
import { NavLink } from "react-router-dom";
import { getGender, games } from "../../actions";
import { connect } from "react-redux";

function mapDispatchToProps(dispatch) {
  return {
      games: () => dispatch(games()),
      getGender: () => dispatch(getGender())
  };
}
const Inicio = (props) => {
    return (
        <div className="conteiner">
            <div className="centrado">
            <NavLink exact to="/home" className="home" onClick={() => props.games() && props.getGender()} >
              Home
            </NavLink>
            </div>
        </div>
    )
}
  
  export default connect(
    null,
    mapDispatchToProps
  )(Inicio);