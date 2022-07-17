import React, { useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { search, res, games } from "../../actions";
import "./navStyle.css"

function mapStateToProps(state) {
    return {
        gamesLoaded: state.gamesLoaded
    };
}
function mapDispatchToProps(dispatch) {
    return {
        search: (name) => dispatch(search(name)),
        games: () => dispatch(games())
    };
}

function Home(props) {

    const [state, setState] = useState("")
    const handleChange = (event) => {
        setState(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        props.search(state);
    }
    return (
        <div id="nav">
            <div className="links">
                <NavLink to="/create" className="crear">
                    Create
                </NavLink>
                <NavLink to="/home" onClick={() => props.games()} className="_home">
                    Home
                </NavLink>
            </div>
            <div className="buscar">
                <form className="form" onSubmit={(e) => handleSubmit(e)}>
                    <div className="buscar">
                        <input
                            type="text"
                            id="title"
                            autoComplete="off"
                            value={state}
                            onChange={(e) => handleChange(e)}
                        />
                        <button type="submit">Search</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)