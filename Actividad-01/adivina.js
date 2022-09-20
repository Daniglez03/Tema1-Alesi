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
    const promise = new Promise( (resolve) => {
        resolve (randomName)
    })
    return promise
}

const play = () => {
    let tamano;
    let palabraCensurada = "";
    const promise = new Promise( (resolve, reject) => {
        loadword()
            .then((randomName) => {tamano = randomName.length
                console.log(tamano)
                console.log(randomName)
                for (let index = 0; index < tamano; index++) {
                    palabraCensurada += "X"
                }
                console.log(palabraCensurada);
                let contador = 1;
                for (let index = contador; index < tamano + 1; index++) {
                    prompt(`Intruduce la ${contador++}º letra:  
                ${palabraCensurada}`)
                }
            })
    })
    return promise
}
play();

const app = () => {
    
}