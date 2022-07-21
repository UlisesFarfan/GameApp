import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api, db, filtroGender, games, getGender, ordAZ, res, ver } from "../../actions";
import cargando from "../../img/cargando.gif"
import "./home_css.css"
import Juego from "./Juego.jsx";

export default function Home() {

    let gamesState = useSelector(state => state.gamesLoaded)
    let gender = useSelector(state => state.generos)
    let verificar = useSelector(state => state.verificar)
    const dispatch = useDispatch()

    const [generos, setGeneros] = useState([])
    const [info, setInfo] = useState([]);
    const [pag, setPag] = useState([])
    const [currentPage, setCurrentpage] = useState(0)
    const limit = 15


    useEffect(() => {
        setGeneros(gender)
    }, [gender])
    useEffect(() => {
        setInfo(gamesState)
    }, [gamesState])
    useEffect(() => {
        setPag([...info].splice(0, limit))
    }, [info])

    const next = () => {
        const totalJuegos = info.length
        const nextPage = currentPage + 1
        const firstIndex = nextPage * limit
        if (firstIndex >= totalJuegos) return;
        setPag([...info].splice(firstIndex, limit))
        setCurrentpage(nextPage)
    }
    const prev = () => {
        const prevPag = currentPage - 1;
        if (prevPag < 0) return;
        const firstIndex = prevPag * limit
        setPag([...info].splice(firstIndex, limit))
        setCurrentpage(prevPag)
    }

    function filGen(e) {
        dispatch(res())
        if (e.target.value === "Generos") return dispatch(res())
        dispatch(filtroGender(e.target.value))
    }
    function filTipo(e) {
        dispatch(res())
        if (e.target.value === "todo") return dispatch(res())
        if (e.target.value === "baseDeDatos") return dispatch(db())
        if (e.target.value === "Api") return dispatch(api())
    }
    function AZ(e) {
        dispatch(ordAZ(e.target.value))
        setCurrentpage(0)
        setPag([...info].splice(0, limit))
    }
    if (verificar) {
        getGender()(dispatch)
        games()(dispatch)
        dispatch(ver())
    }  

    return (
        <div id="primero">
            <div className="conteinHome">
                <div className="filtros">
                    <select onChange={(e) => filGen(e)}>
                        <option value="Generos"> Genders </option>
                        {
                            generos && generos.map(el => {
                                return <option key={el.id} value={el.name}>{el.name}</option>
                            })
                        }
                    </select>
                    <select onChange={(e) => filTipo(e)}>
                        <option value="todo"> Type </option>
                        <option value="baseDeDatos"> Database </option>
                        <option value="Api"> API </option>
                    </select>
                    <select onChange={(e) => AZ(e)}>
                        <option value="A-Z"> A-Z </option>
                        <option value="Z-A"> Z-A </option>
                    </select>
                    <select onChange={(e) => AZ(e)}>
                        <option value="mayor"> Elderly </option>
                        <option value="menor"> Minor </option>
                    </select>
                </div>
                <br />
                {
                    pag.length > 0 ? pag.map(juego => (<Juego key={juego.id} {...juego} />)) : (
                        <img src={`${cargando}`} className="perrito" alt="img cargando" />
                    )
                }
                <div className="botones">
                    <button onClick={() => prev()}>
                        {"<"}
                    </button>

                    <button onClick={() => next()}>
                        {">"}
                    </button>
                </div>
            </div>
        </div>
    )
}
