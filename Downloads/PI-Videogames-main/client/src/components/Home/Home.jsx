import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { api, clear, db, filtroGender, getDeail, ordAZ, res } from "../../actions";
import cargando from "../../img/cargando.gif"
import "./home_css.css"
import Juego from "./Juego.jsx";

function mapStateToProps(state) {
    return {
        gamesLoaded: state.gamesLoaded,
        generos: state.generos,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        res: () => dispatch(res()),
        filtroGender: (genero) => dispatch(filtroGender(genero)),
        ordAZ: (ord) => dispatch(ordAZ(ord)),
        db: () => dispatch(db()),
        api: () => dispatch(api()),
        getDeail: (id) => dispatch(getDeail(id)),
        clear: () => dispatch(clear())
    };
}

function Home(props) {
    
    const [generos, setGeneros] = useState([])
    const [info, setInfo] = useState([]);
    const [pag, setPag] = useState([])
    const [currentPage, setCurrentpage] = useState(0)
    const limit = 15

    useEffect(() => {
        setGeneros(props.generos)
    }, [props.generos])
    useEffect(() => {
        setInfo(props.gamesLoaded)
    }, [props.gamesLoaded])
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

    function filGen(e){
        props.res()
        if(e === "Generos") return props.res()
        props.filtroGender(e)
    }
    function filTipo(e){
        props.res()
        if(e === "todo") return props.res()
        if(e === "baseDeDatos") return props.db()
        if(e === "Api") return props.api()
    }
    function AZ(e){
        props.ordAZ(e.target.value)
        setCurrentpage(0)
        setPag([...info].splice(0, limit))
    }


    return (
        <div id="primero">
            <div className="conteinHome">
                <div className="filtros">
                    <select onChange={(e)=> filGen(e.target.value)}>
                        <option value="Generos"> Genders </option>
                        {
                            generos && generos.map(el => {
                               return <option key={el.id} value={el.name}>{el.name}</option>
                            })
                        }
                    </select>
                    <select onChange={(e) => filTipo(e.target.value)}>
                        <option value="todo"> Type </option>
                        <option value="baseDeDatos"> Database </option>
                        <option value="Api"> API </option>
                    </select>
                    <select onChange={(e) => AZ(e)}>
                        <option value="A-Z"> A-Z </option>
                        <option value="Z-A"> Z-A </option>
                    </select>
                </div>
                <br />
                {
                    pag.length > 0 ? pag.map(juego => (<Juego key={juego.id} {...juego} buscar={props.getDeail} clear={props.clear} />)) : (
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)