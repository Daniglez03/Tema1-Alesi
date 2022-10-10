const fs = require('fs');
const fsPromises = fs.promises;
const args = process.argv.slice(2);
const filepath = args[0]

let asteriscos = ""
for (let i = 0; i < 40; i++) {
    asteriscos += "*"
}

function getDirectory() {
    fsPromises
        .readdir(filepath)
        .then(files => {
            let linea = ""
            for (let i = 0; i < 63; i++) {
                linea += "─"
            }
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
            console.log(filesEnHorizontal)
            console.log(`\t└${linea}┘`);
        })
        .catch((error) => {
            console.log(error.message);
        })
}

function getFile() {
}

function canAccess() {
    if (args.length > 0) {
        fsPromises.access(filepath, fs.constants.F_OK)
            .then(fileOrDir())
            .catch((error) => {
                if (error.code == "ENOENT") {
                    console.log(`
                ${asteriscos}
                *     Fichero/Directorio NO existe     *
                ${asteriscos}`);
                }
            })
    } else {
        console.log(`
        ${asteriscos}
        *   Parámetros incorrectos             *
        *    Uso: checkfile carpeta_o_fichero  *
        ${asteriscos}`);
    }
}

function fileOrDir() {
    fs.promises
        .stat(filepath)
        .then(stats => { stats.isDirectory() ? getFile() : getDirectory() })
        .catch((error) => {
            console.log(error);
        })
}

canAccess()
