const WORDS = [
    "Alan",
    "Alberto",
    "Gema",
    "Juan",
    "Sara",
    "Antonio",
    "Manuel",
    "Ricardo",
];


const loadWord = () => {
    const randomName = Array.from(WORDS[Math.floor(Math.random() * WORDS.length)].toLowerCase())
    return new Promise((resolve) => {
        resolve(randomName)
    })
}

const play = () => {
    let tamano;
    return new Promise((resolve, reject) => {
        loadWord()
            .then((randomName) => {
                tamano = randomName.length
                let contador = 1
                let frase = ""
                console.log(randomName);
                let palabraCensurada = ""
                for (let i = 0; i < tamano; i++) {
                    let temp = ""
                    for (let i = 0; i < tamano; i++) {
                        if (randomName[0] === frase && i === 0) {
                            temp += frase.toUpperCase()
                        } else {
                            if (randomName[i] === frase) {
                                temp += frase
                            } else{
                                temp += "X"
                            }
                        }
                    }
                    palabraCensurada = temp
                    frase = prompt(`Intruduce la ${contador++}º letra: 
                    ${palabraCensurada}`)
                    if (frase == null) {
                        alert("Has cancelado el juego...")
                        break
                    }
                    if (isNaN(frase) === false) {
                        alert(`Error el valor introducido no es una letra
                        Debes empezar el juego...`)
                        break
                    }
                }
                randomName = []
                let resumen
                resumen = alert(`Palabra a adivinar:  ${randomName}
                Tu intento: ${palabraCensurada}
                Has obtenido: ${puntuacion} puntos`)
                resolve (resumen)
                /*const play = randomName.indexOf(randomName => randomName.includes(frase))
                play
                let palabraCensuradaActual = ""
                                
                /*for (let i = 0; i < tamano; i++) {
                    const cambios = randomName.forEach((palabraCensuradaActual, index) => {
                        if (frase === palabraCensuradaActual && index === 0) {
                            palabraCensuradaActual += frase.toUpperCase()
                        } else {
                            if (frase === randomName[index]) {
                                palabraCensuradaActual += frase
                            } else {
                                palabraCensuradaActual += "X"
                            }
                        }
                    });
                    frase = prompt(`Intruduce la ${contador++}º letra: 
                    ${palabraCensuradaActual}`)

                    console.log(palabraCensuradaActual);
                    console.log(randomName);
                    console.log(cambios);
                }*/
            })
    });
}
const isPlaying = (opcion) => {
    return new Promise((resolve, reject) => {
        opcion = confirm("¿Quieres continuar?");
    if (opcion == true) {
        console.log("Aceptar")
        return app()
    }
    resolve(opcion)
    reject(alert("Terminó el juego"))
    })
}

const app = () => {
    loadWord()
    .then((randomName) => {
        play(randomName)
    })
    .then((opcion) => {
        isPlaying(opcion)
    })
    .catch((err) => console.log(err))
}

app()