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

const loadword = () => {
    const randomName = Array.from(WORDS[Math.floor(Math.random() * WORDS.length)].toLowerCase())
    const promise = new Promise((resolve) => {
        resolve(randomName)
    })
    return promise
}

const play = () => {
    let tamano;
    const promise = new Promise((resolve, reject) => {
        loadword()
            .then((randomName) => {
                tamano = randomName.length
                console.log(tamano)
                console.log(randomName)
                let contador = 1;
                var frase = "";
                /*for (let i = 0; i < tamano; i++) {
                    let palabraCensuradaActual;
                    for (let i = 0; i < tamano; i++) {
                        if (randomName[0] === frase) {
                            palabraCensuradaActual += `${frase.toUpperCase()}`
                        } else {
                            if (randomName[i] === frase) {
                                palabraCensuradaActual += `${frase}`
                            } else {
                                palabraCensuradaActual += "X"
                            }
                        }
                    }
                    frase = prompt(`Intruduce la ${contador++}º letra: 
                    ${palabraCensuradaActual}`)
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
                frase = prompt(`Intruduce la ${contador++}º letra: 
                    ${palabraCensuradaActual}`)
                randomName.forEach((currentValue,index) => {
                    let palabraCensuradaActual;
                    if (frase == randomName[0]) {
                        palabraCensuradaActual += `${frase.toUpperCase}`
                    }else {
                        if (frase == randomName[i]) {
                            palabraCensuradaActual += `${frase}`
                        }else {
                            palabraCensuradaActual += "X"
                        }
                    }
                });
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