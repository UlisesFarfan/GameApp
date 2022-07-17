import React, { useState } from "react";
import { connect } from "react-redux";
import { addGame } from "../../actions";
import "./createstyle.css"

function mapStateToProps(state) {
    return {
        plataformas: state.plataformas,
        generos: state.generos
    }
}
function mapDispatchToProps(dispatch) {
    return {
        addGame: (body) => dispatch(addGame(body))
    };
}

const initialState = {
    name: "",
    description: "",
    idGenero: [],
    data_added: "",
    rating: 0,
    plataformas: []
}

const regExName = new RegExp("^[a-zA-Z ]+$");
const regExDescription = new RegExp("^[a-zA-Z0-9 ]+$");

const Create = function (props) {

    const [form, setForm] = useState(initialState)
    const [btn, setBtn] = useState(true)
    const [errorName, setErrorName] = useState('')
    const [errorDescrition, setErrorDescrition] = useState('')
    const [errorRating, setErrorRating] = useState('')
    const [selectGender, setSelectGender] = useState([])

    const handleName = (e) => {
        e.preventDefault();
        setBtn(false)
        if (e.target.value === "") {
            setErrorName("This name is invalid")
            return setForm({ ...form, name: e.target.value })
        }
        if (!regExName.test(e.target.value)) {
            setErrorName("Only Lettets")
        } else {
            setErrorName("")
        }
        setForm({ ...form, name: e.target.value })
    }
    const handleDescription = (e) => {
        e.preventDefault();
        setBtn(false)
        if (e.target.value === "") {
            setErrorDescrition("This description is invalid")
            return setForm({ ...form, description: e.target.value })
        }
        if (!regExDescription.test(e.target.value)) {
            setErrorDescrition("This character is invalid")
        } else {
            setErrorDescrition("")
        }
        setForm({ ...form, description: e.target.value })
    }
    const handleRating = (e) => {
        e.preventDefault()
        setBtn(false)
        if (e.target.value > 5 || e.target.value < 0 || e.target.value === "") {
            setErrorRating("This number is invalid")
        } else {
            setErrorRating("")
        }
        setForm({ ...form, rating: e.target.value })
    }
    const handleDattaAdded = (e) => {
        e.preventDefault()
        setBtn(false)
        setForm({ ...form, data_added: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (errorName === '' && errorDescrition === "" && errorRating === "" && form.name !== '' && form.description !== '' && form.plataformas.length > 0) {
            props.addGame(form)
            setForm(initialState)
            setSelectGender([])
            setBtn(true)
            return
        }
        console.log("no se pudo")
        setBtn(true)
    }
    const handleButtonGender = (e) => {
        e.preventDefault()
        if (form.idGenero.includes(e.target.value)) {
            let a = form.idGenero.filter(el => el !== e.target.value)
            setForm({ ...form, idGenero: a })
            let b = selectGender.filter(el => el.name !== e.target.name)
            setSelectGender(b)
            return
        }
        setForm({ ...form, idGenero: [...form.idGenero, e.target.value] })
        let newGender = {
            name: e.target.name,
            id: e.target.value
        }
        setSelectGender([...selectGender, newGender])
    }
    const handleButtonPlataform = (e) => {
        e.preventDefault()
        if (form.plataformas.includes(e.target.value)) {
            let a = form.plataformas.filter(el => el !== e.target.value)
            setForm({ ...form, plataformas: a })
            return
        }
        setForm({ ...form, plataformas: [...form.plataformas, e.target.value] })
    }
    const handlePlataformDelete = (e) => {
        e.preventDefault()
        let a = form.plataformas.filter(el => el !== e.target.value)
        setForm({...form, plataformas: a})
    }
    const handleGenderDelete = (e) => {
        e.preventDefault()
        let a = form.idGenero.filter(el => el !== e.target.value)
        setForm({...form, idGenero: a})
        let b = selectGender.filter(el => el.name !== e.target.name)
        setSelectGender(b)
    }

    return (
        <div className="conteinCreate">
            <div className="cuadro">

                <h1 className="title">
                    Create a new game
                </h1>
                <form className="formCreate" onSubmit={(e) => handleSubmit(e)}>
                    <div className="inputName">
                        <label htmlFor="name"> Name: </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={(e) => handleName(e)}
                        />
                        {errorName ? <span className="error" >{errorName}</span> : null}
                    </div>
                    <div className="inputDescription">
                        <label htmlFor="description"> Description: </label>
                        <input
                            type="text"
                            id="description"
                            className="descriptionInput"
                            value={form.description}
                            onChange={(e) => handleDescription(e)}
                        />
                        {errorDescrition ? <span className="error" >{errorDescrition}</span> : null}
                    </div>
                    <div className="inputRating">
                        <label htmlFor="rating"> Rating: </label>
                        <input
                            type="number"
                            id="rating"
                            name="rating"
                            value={form.rating}
                            min={0}
                            max={5}
                            onChange={(e) => handleRating(e)}
                        />
                        {errorRating ? <span className="error" >{errorRating}</span> : null}
                    </div>
                    <div className="inputData">

                        <label htmlFor="data"> Data: </label>
                        <input
                            type="date"
                            id="data"
                            name="data"
                            value={form.data_added}
                            onChange={(e) => handleDattaAdded(e)}
                        />
                    </div>
                    <div className="plataformRender">
                            Plataforms: 
                            <br />
                            {
                                props.plataformas.map(el => {
                                    return <button className="buttons" key={el} value={el} onClick={(e) => handleButtonPlataform(e)} > {el} </button>
                                })
                            }
                        <div className="plataformSelect">
                            {
                                form.plataformas && form.plataformas.map(el => {
                                    return <div className="plataformas" key={el}>
                                    <div key={el} >{el}</div>
                                    <button className="deletePlataforma" value={el} key={el} onClick={(e) => handlePlataformDelete(e)} > X </button>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    <div className="generosRender">
                            Genders: 
                            <br />
                            {
                                props.generos.map(el => {
                                    return <button key={el.id} className="buttons" value={el.id} name={el.name} onClick={(e) => handleButtonGender(e)} > {el.name} </button>
                                })
                            }
                        <div className="generosSelect">
                            {
                                selectGender && selectGender.map(el => {
                                    return <>
                                        <div className="generosCreate" key={el.id}>
                                        <div key={el.name} >{el.name}</div>
                                        <button className="deleteGender" key={el.id} value={el.id} name={el.name} onClick={(e) => handleGenderDelete(e)} > X </button>
                                        </div>
                                    </>
                                })
                            }
                        </div>
                    </div>
                    <button type="submit" disabled={btn} className="buttonPost" > Post </button>
                </form>
            </div>
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(Create)