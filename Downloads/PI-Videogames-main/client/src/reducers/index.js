import { ADD_GAME, API, CLEAR_DETAIL, DB, GET_GAMES, GET_GAME_DETAIL, GET_GENDER, ORD_AZ, ORD_GENDER, RESTAURAR, SEARCH_GAMES } from "../actions";

function ordAZ(array, tipo) {
    for (let i = 1; i < array.length; i++) {
        for (let j = i; j > 0; j--) {
            if (tipo === "A-Z") {
                if (array[j].name[0] < array[j - 1].name[0]) {
                    let temp = array[j]
                    array[j] = array[j - 1]
                    array[j - 1] = temp
                }
            }
            if (tipo === "Z-A") {
                if (array[j].name[0] > array[j - 1].name[0]) {
                    let temp = array[j]
                    array[j] = array[j - 1]
                    array[j - 1] = temp
                }
            }
        }
    }
    return array
}

function filtroGenero(genero, obj) {
    let resultado = []
    obj.map(el => {
        if (el.generos.includes(genero)) {
            resultado.push(el)
        }
    })
    return resultado
}


const initialState = {
    gamesLoaded: [],
    juegosMios: [],
    juegosAPI: [],
    gameDetail: {},
    generos: [],
    plataformas: [
		"PC",
		"PlayStation 5",
		"Xbox One",
		"PlayStation 4",
		"Xbox Series S/X",
		"Nintendo Switch",
		"iOS",
		"Android",
		"macOS",
		"Linux",
		"Xbox 360",
		"Xbox",
		"PlayStation 3",
		"PlayStation 2",
	],
    alert: {}
};
export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_GAME:
            return {
                ...state,
                juegosMios: [...state.juegosMios, action.payload]
            }
        case GET_GENDER:
            return {
                ...state,
                generos: action.payload
            }
        case CLEAR_DETAIL:
            return {
                ...state,
                gameDetail: {}
            }
        case GET_GAMES:
            return {
                ...state,
                juegosMios: action.payload.JuegosMios,
                juegosAPI: action.payload.JuegosApi,
                gamesLoaded: action.payload.JuegosMios.concat(action.payload.JuegosApi)
            }
        case SEARCH_GAMES:
            return {
                ...state,
                gamesLoaded: action.payload
            }
        case RESTAURAR:
            return {
                ...state,
                gamesLoaded: state.juegosMios.concat(state.juegosAPI)
            }
        case GET_GAME_DETAIL:
            return {
                ...state,
                gameDetail: action.payload[0]
            }
        case ORD_AZ:
            return {
                ...state,
                gamesLoaded: ordAZ(state.gamesLoaded, action.payload)
            }
        case ORD_GENDER:
            return {
                ...state,
                gamesLoaded: filtroGenero(action.payload, state.gamesLoaded)
            }
        case DB:
            return {
                ...state,
                gamesLoaded: state.juegosMios
            }
        case API:
            return {
                ...state,
                gamesLoaded: state.juegosAPI
            }
        default:{
            return state
        }
    }
}