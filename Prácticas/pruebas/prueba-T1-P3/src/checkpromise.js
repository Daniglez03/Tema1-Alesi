const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;
const args = process.argv.slice(2);
const filepath = args[0]

let asteriscos = ""
for (let i = 0; i < 40; i++) {
    asteriscos += "*"
}

function getDirectory(resolve, reject) {
    fsPromises
        .readdir(filepath)
        .then(files => {
            let linea = ""
            for (let i = 0; i < 63; i++) {
                linea += "─"
            }
            const file =
                console.log(`\t┌${linea}┐`)
            console.log(`\t│             El valor introducido es un directorio             │`);
            console.log(`\t└${linea}┘`)
            console.log(`\t┌${linea}┐`)
            let filesEnHorizontal = ""
            let condicionParaUltimaLinea = false
            let condicionParaUltimaLinea2 = false
            for (let i = 0; i < files.length; i++) {
                if (files[i] !== files.at(-1) && files[i].length >= 17) {
                    files[i] = files[i].substring(0, 17) + "..."
                }
                if (files.indexOf(files.at(- 1)) % 3 === 0 && i % 3 === 0) {
                    if (condicionParaUltimaLinea === true) {
                        continue
                    } else {
                        files[files.indexOf(files.at(-1))] = `\n\t│ ${files[files.indexOf(files.at(-1))].padEnd(62, ' ')}│`
                        condicionParaUltimaLinea = true
                    }
                }
                if (files.indexOf(files.at(- 1)) % 3 === 1 && i % 3 === 1) {
                    if (condicionParaUltimaLinea2 === true) {
                        continue
                    } else {
                        files[files.indexOf(files.at(-1))] = `${files[files.indexOf(files.at(-1))].padEnd(41, ' ')}│`
                        condicionParaUltimaLinea2 = true
                    }
                }
                if (i % 3 === 0) {
                    if (i !== 0) {
                        files[i] = `\n\t│ ${files[i].padEnd(20, ' ')} `
                    } else {
                        files[i] = `│ ${files[i].padEnd(20, ' ')} `
                    }
                }
                if (i % 3 === 1) {
                    files[i] = `${files[i].padEnd(20, ' ')} `
                }
                if (i % 3 === 2) {
                    files[i] = `${files[i].padEnd(20, ' ')}│`
                }
                filesEnHorizontal = `\t${files.join('')}`
            }
            resolve(console.log(filesEnHorizontal))
            console.log(`\t└${linea}┘`);
        })
    reject((error) => {
        console.log(error.message);
    })
}

function getFile() {

}


function canAccess(resolve, reject) {
    fsPromises.access(filepath, fs.constants.F_OK)
    resolve(true)
    reject((error) => {
        if (error.code == "ENOENT") {
            console.log(`
                ${asteriscos}
                *     Fichero/Directorio NO existe     *
                ${asteriscos}`);
            return false
        }
        throw error;
    })

}

function fileorDir() {
    fs.promises
        .stat(filepath, (stats, resolve, reject) => {
            resolve(stats.isDirectory() ? getFile() : getDirectory())
            reject((error) => {
                console.log(error);
            })
        })
}

const errorParametro = () => {
    return console.log(`
    ${asteriscos}
    *   Parámetros incorrectos             *
    *    Uso: checkfile carpeta_o_fichero  *
    ${asteriscos}`);
}


const app = () => {
    canAccess()
        .then((stats) => {
            fileorDir(stats)
        })
        .catch(errorParametro)
}
app()