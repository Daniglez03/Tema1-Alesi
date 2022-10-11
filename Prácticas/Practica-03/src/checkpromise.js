const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;
const args = process.argv.slice(2);
const filepath = args[0]

let asteriscos = ""
for (let i = 0; i < 40; i++) {
    asteriscos += "*"
}

function size(value) {
    let units = ["Bytes", "KB", "MB", "GB", "TB"];
    let contador = 0;
    let kb = 1024;
    let division = value / 1;
    while (division >= kb) {
        contador++;
        division = division / kb;
    }
    value = division.toFixed(1) + " " + units[contador]
    return value
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
    fs.promises
        .stat(filepath, fs.constants.R_OK | fs.constants.W_OK)
        .then((stats, error) => {
            let dirName = path.dirname(filepath)
            let name = path.basename(filepath)
            if (name.length >= 20) {
                name = name.substring(0, 20) + "..."
            }
            console.log(typeof stats.size);
            console.log(`
            ┌────────────────────────────────────────────────────┐
            │           Características del archivo              │
            ├─────────────────────────┬──────────────────────────┤
            │ Nombre del Archivo      │  ${name.padEnd(24, ' ')}│
            ├─────────────────────────┼──────────────────────────┤
            │ Extención del Archivo   │  ${path.extname(filepath).padEnd(24, ' ')}│
            ├─────────────────────────┼──────────────────────────┤
            │ Directorio del Archivo  │  ${path.basename(dirName).padEnd(24, ' ')}│
            ├─────────────────────────┼──────────────────────────┤
            │ Tamaño del Archivo      │  ${size(stats.size).padEnd(24, ' ')}│
            ├─────────────────────────┼──────────────────────────┤
            │ Lectura/Escritura       │  ${!error ? 'Sí' : 'No'}                      │
            └─────────────────────────┴──────────────────────────┘
                            `);
        })
        .catch((error) => {
            console.log(error);
        })
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
        .then(stats => { stats.isDirectory() ? getDirectory() : getFile() })
        .catch((error) => {
            console.log(error);
        })
}

canAccess()