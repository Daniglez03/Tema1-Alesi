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
                let palabraCensurada = new Array(tamano)
                palabraCensurada.fill('X', 0, tamano)
                /*for (let i = 0; i < tamano; i++) {
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
                }*/
                randomName = []
                let resumen
                resumen = alert(`Palabra a adivinar:  ${randomName}
                Tu intento: ${palabraCensurada}
                Has obtenido: ${puntuacion} puntos`)
                resolve (resumen)
                                
                for (let i = 0; i < tamano; i++) {
                    const cambios = randomName.forEach((currentValue, index) => {
                        if (currentValue.toLoweCase() === frase.toLowerCase) {
                            palabraCensurada[index] = currentValue[index]
                        }
                    });
                    frase = prompt(`Intruduce la ${contador++}º letra: 
                    ${palabraCensurada}`)
                    console.log(palabraCensuradaActual);
                    console.log(randomName);
                    console.log(cambios);
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