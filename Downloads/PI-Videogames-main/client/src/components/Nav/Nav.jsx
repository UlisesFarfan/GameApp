import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { search, games } from "../../actions";
import "./navStyle.css"


export default function Home() {
    const dispatch = useDispatch()

    const [state, setState] = useState("")
    const handleChange = (event) => {
        setState(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(search(state))
    }
    return (
        <div id="nav">
            <div className="links">
                <NavLink to="/create" className="crear">
                    Create
                </NavLink>
                <NavLink to="/home" onClick={() => dispatch(games())} className="_home">
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
