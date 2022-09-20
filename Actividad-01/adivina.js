const WORDS = [
    "Alan",
    "Alberto",
    "Andrés",
    "Gema",
    "Juan",
    "Sara",
    "Antonio",
    "Manuel",
    "Ricardo",
];

const loadword = () => {
    const randomName = WORDS[Math.floor(Math.random() * WORDS.length)]
    const promise = new Promise((resolve) => {
        resolve(randomName)
    })
    return promise
}

const play = () => {
    let tamano;
    let palabraCensurada = "";
    const promise = new Promise((resolve, reject) => {
        loadword()
            .then((randomName) => {
                tamano = randomName.length
                console.log(tamano)
                console.log(randomName)
                for (let index = 0; index < tamano; index++) {
                    palabraCensurada += "X"
                }
                console.log(palabraCensurada);
                let contador = 1;
                let frase = "";
                for (let index = contador; index < tamano + 1; index++) {
                    frase = prompt(`Intruduce la ${contador++}º letra:  
                    ${palabraCensurada}`)
                    if (frase == null) {
                        alert("Has cancelado el juego...")
                        break
                    }
                    if (isNaN (frase) === false) {
                        alert(`Error el valor introducido no es una letra
                        Debes empezar el juego...`)
                        break
                    }
                }
            })
    })
    return promise
}
const isPlaying = () => {
    let opcion = confirm("¿Quieres continuar?");
    if (opcion == true) {
        console.log("Aceptar")
    } else {
        alert("Terminó el juego")
}
}

play()