const { Router } = require('express');
const { fetch } = require('cross-fetch');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
require('dotenv').config();
const {
    YOUR_API_KEY
} = process.env;


const { Videogame, Gender } = require('../db.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const generos = async () => {
    const response = await fetch(`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`);
    return await response.json();
}

const Buscar = async (name) => {
    const resultad = []
    const condition = name ?
        {
            where: { name: name },
            include: Gender
        } : { include: Gender }
    const game = await Videogame.findAll(condition)
    game.map(el => {
        let generos = []
        el.genders.map(el => generos.push(el.name))
        if (resultad.length < 15) { resultad.push({ name: el.name, generos: generos, id: el.id, rating: el.rating }) } })

    const resultado = await fetch(`https://api.rawg.io/api/games?search=${name}&key=${YOUR_API_KEY}`)
        .then(res => res.json())
        .then(res => res.results)
        .then(res => {
            res.map(el => {
                if (resultad.length < 15) {
                    let generos = []
                    el.genres.map(el => generos.push(el.name))
                    resultad.push(
                        { name: el.name, img: el.background_image, generos: generos, id: el.id, rating: el.rating })
                }
            })
        })
    return resultad
}
const juegos = async () => {
    let juegosApi = []
    let juegosMios = []
    const game = await Videogame.findAll({ include: Gender })
    game.map(el => { 
        let generos = []
        el.genders.map(el => generos.push(el.name))
        juegosMios.push({ name: el.name, generos: generos, id: el.id, rating: el.rating}) })
    const promesa1 = await fetch(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}`)
        .then(res => res.json())
        .then(res => res.results)
        .then(res => {
            res.map(el => { 
                let generos = []
                el.genres.map(el => generos.push(el.name))
                juegosApi.push({ name: el.name, img: el.background_image, generos: generos, id: el.id, rating: el.rating }) })
        })
    const promesa2 = await fetch(`https://api.rawg.io/api/games?page=2&key=${YOUR_API_KEY}`)
        .then(res => res.json())
        .then(res => res.results)
        .then(res => {
            res.map(el => {
                let generos = []
                el.genres.map(el => generos.push(el.name))
                juegosApi.push({ name: el.name, img: el.background_image, generos: generos, id: el.id, rating: el.rating }) })
        })

    return [juegosMios, juegosApi]
}
const buscarID = async (id) => {
    let resultado = []  
    const gameP = await fetch(`https://api.rawg.io/api/games/${id}?key=${YOUR_API_KEY}`)
    .then(res => res.json())
    .then(res => { if(res.name){
        let generos = []
        res.genres.map(el => generos.push(el.name))
        let plataformas = []
        res.platforms.map(el => plataformas.push(el.platform.name))
        resultado.push({ name: res.name, description: res.description, generos: generos , rating: res.rating, plataformas: plataformas, id: id, img: res.background_image, data_added: res.released }) }})
    if(resultado.length === 0){
        const game = await Videogame.findByPk(id, {
            include: Gender
        })
    .then(res => {
        let generos = []
        res.genders.map(el => generos.push(el.name))
        resultado.push({ name: res.name, description: res.description, generos: generos, rating: res.rating, plataformas: res.plataformas, id: res.id, data_added: res.data_added})
    })
}
    return resultado

}

// ......................................................................................................

router.get("/videogames", async (req, res) => {
    const { name } = req.query

    if (name) {
        const games = await Buscar(name)
        return res.status(200).json(games.length > 1 ? games : "No se encontraron juegos")
    }

    const games = await juegos()
    return res.status(200).send({JuegosMios: games[0], JuegosApi: games[1] })
})

router.get("/videogame/:idVideogame", async (req, res) => {
    const { idVideogame } = req.params
    try {
        
        const game = await buscarID(idVideogame)

        res.status(200).json(game ? game : "No existe")
    }
    catch (e) {
        res.status(404).send("Error en alguno de los datos provistos")
    }
})

router.post("/videogames", async (req, res) => {

    const {name, description, data_added, rating, plataformas, idGenero } = req.body

    if (!name || !description || !plataformas) return res.status(404).send("Falta enviar datos obligatorios")
    
    let newPlataform = plataformas.reduce((a,b) => a.concat(` ${b}`))
    console.log(newPlataform)
    const newGame = {
        name, description, data_added, rating, plataformas: newPlataform
    }
    
    try {
        const character = await Videogame.create(newGame)
        if(idGenero){
            await character.addGenders(idGenero)
        }
        res.status(200).json(character)
    }
    catch (e) {
        console.log(e)
        res.status(404).send("Error en alguno de los datos provistos")
    }
})

router.get("/gender", async (req, res) => {
    try {
        const verificar = await Gender.findAll()
        if (verificar.length === 0) {
            const subidos = generos()
            .then(res => res.results)
            .then(res => {
                    res.map(el => Gender.create({ id: el.id, name: el.name }))
            })
            return res.status(200).json(subidos)
        }
        const subidos = await Gender.findAll()

        res.status(200).json(subidos)
    }
    catch (e) {
        res.status(404).send("Fallo algo :O")
    }
})


module.exports = router;



/**
 * const juegos = async (limite, ord) => {
    let juegos = []
    const start = await Videogame.findAndCountAll({
        limit: 15,
        offset: limite * 15,
        include: Gender,
        order: [
            ["name", ord]
        ]
    })
    .then(res => res.rows)
    .then(res => res.map(el => juegos.push({ 
        name: el.name, 
        description: 
        el.description, 
        data_added: el.data_added, 
        plataformas: el.plataformas,
        generos: el.genders
    })))
    return juegos
} 


    const promesa1 = await fetch(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}`)
        .then(res => res.json())
        .then(res => res.results)
        .then(res => {
            res.map(el => {juegos.push({ name: el.name})})
        })
    const promesa2 = await fetch(`https://api.rawg.io/api/games?page=1&key=${YOUR_API_KEY}`)
    .then(res => res.json())
    .then(res => res.results)
    .then(res => {
        res.map(el => {juegos.push({ name: el.name})})
    })
 */
