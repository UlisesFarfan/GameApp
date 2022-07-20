import axios from "axios"
export const ADD_GAME = "ADD_GAME";
export const SEARCH_GAMES = "SEARCH_GAMES";
export const GET_GAME_DETAIL = "GET_GAME_DETAIL";
export const GET_GAMES = "GET_GAMES";
export const RESTAURAR = "RESTAURAR";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const GET_GENDER = "GET_GENDER";
export const ORD_AZ = "ORD_AZ";
export const ORD_GENDER = "ORD_GENDER";
export const DB = "DB";
export const API = "API";


//ADD_GAME
export function addGame(body) {
       return async function (dispatch) {
        axios.post(`/videogames`, body)
            .then(res => {
                dispatch({type: ADD_GAME, payload: res.data})
            })
    }
}

//GET_GAMES
export function games() {
    return async function (dispatch) {
        await axios.get(`/videogames`)
            .then(games => {
                dispatch({ type: GET_GAMES, payload: games.data })
            })
    }
}

//SEARCH_GAMES
export function search(name) {
    return async function (dispatch) {
   if (name) {await axios.get(`/videogames?name=${name}`)
            .then(games => {
                dispatch({ type: SEARCH_GAMES, payload: games.data })
            })}
    } 
}

//GET_GAME_DETAIL
export function getDetail(id) {
    return async function (dispatch) {
        try {
            const a = await axios.get(`/videogame/${id}`)
            dispatch({ type: GET_GAME_DETAIL, payload: a.data })
        }
        catch (e) {
            console.log(e)
        }
    }
}

//CLEAR_DETAIL
export function clear() {
    return {
        type: CLEAR_DETAIL
    }
}

//GET_GENDER
export const getGender = () => {
    return async (dispatch) => {
        try {
            const a = await axios.get(`/gender`)
            dispatch({ type: GET_GENDER, payload: a.data })
        }

        catch (e) {
            console.log(e)
        }
    }
}
//RESTAURAR
export function res() {
    return {
        type: RESTAURAR
    }
}
//ORD_GENDER
export function filtroGender(genero){
    return {
        type: ORD_GENDER,
        payload: genero
    }
}
//A_Z
export function ordAZ(ord){
    return {
        type: ORD_AZ,
        payload: ord
    }
}
//DB
export function db(){
    return {
        type: DB
    }
}
//API
export function api(){
    return {
        type: API
    }
}
