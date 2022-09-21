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
    const randomName = Array.from(WORDS[Math.floor(Math.random() * WORDS.length)])
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
                let contador = 1;
                var frase = "";
                /*for (let index = 0; index < tamano; index++) {
                    frase = prompt(`Intruduce la ${contador++}º letra: 
                    ${palabraCensurada}`)
                    if (randomName[index] === frase) {
                        palabraCensurada += `${frase}`
                    } else {
                        palabraCensurada += "X"
                    }
                    if (frase == null) {
                        alert("Has cancelado el juego...")
                        break
                    }
                    if (isNaN(frase) === false) {
                        alert(`Error el valor introducido no es una letra
                        Debes empezar el juego...`)
                        break
                    }
                    // Prueba:
                }*/
                for (let index = 0; index < tamano; index++) {
                    for (let index = 0; index < tamano; index++) {
                        if (randomName[index] === frase) {
                            palabraCensurada += `${frase}`
                        } else {
                            palabraCensurada += "X"
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
                }
            })
        return promise
    });
}
// for each current value, index

const isPlaying = () => {
    let opcion = confirm("¿Quieres continuar?");
    if (opcion == true) {
        console.log("Aceptar")
    } else {
        alert("Terminó el juego")

    }
}
//letra ingresada a minúscula
/*let letra = e.target.value.toLowerCase();
let letters = randomName.toLowerCase().split('');
letters.forEach(function (letter, i) {
    if (letra == letter) {
        palabraCensurada = palabraCensurada.replace(i * 2, letra);
    }
});
document.getElementById('printletra').innerHTML = replaceWord;
console.log(replaceWord)*/

play()