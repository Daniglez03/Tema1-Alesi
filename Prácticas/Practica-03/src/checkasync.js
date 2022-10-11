const fs = require('fs');
const path = require('path');
const args = process.argv.slice(2);
const filepath = args[0]
const fsPromises = fs.promises;

let asteriscos = ""
for (let i = 0; i < 40; i++) {
    asteriscos += "*"
}

async function getDirectory() {
    try {
        const arrayOfFiles = fs.readdirSync(filepath)
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
        for (let i = 0; i < arrayOfFiles.length; i++) {
            if (arrayOfFiles[i] !== arrayOfFiles.at(-1) && arrayOfFiles[i].length >= 17) {
                arrayOfFiles[i] = arrayOfFiles[i].substring(0, 17) + "..."
            }
            if (arrayOfFiles.indexOf(arrayOfFiles.at(- 1)) % 3 === 0 && i % 3 === 0) {
                if (condicionParaUltimaLinea === true) {
                    continue
                } else {
                    arrayOfFiles[arrayOfFiles.indexOf(files.at(-1))] = `\n\t│ ${arrayOfFiles[arrayOfFiles.indexOf(arrayOfFiles.at(-1))].padEnd(62, ' ')}│`
                    condicionParaUltimaLinea = true
                }
            }
            if (arrayOfFiles.indexOf(arrayOfFiles.at(- 1)) % 3 === 1 && i % 3 === 1) {
                if (condicionParaUltimaLinea2 === true) {
                    continue
                } else {
                    arrayOfFiles[arrayOfFiles.indexOf(files.at(-1))] = `${arrayOfFiles[arrayOfFiles.indexOf(arrayOfFiles.at(-1))].padEnd(41, ' ')}│`
                    condicionParaUltimaLinea2 = true
                }
            }
            if (i % 3 === 0) {
                if (i !== 0) {
                    arrayOfFiles[i] = `\n\t│ ${arrayOfFiles[i].padEnd(20, ' ')} `
                } else {
                    arrayOfFiles[i] = `│ ${arrayOfFiles[i].padEnd(20, ' ')} `
                }
            }
            if (i % 3 === 1) {
                arrayOfFiles[i] = `${arrayOfFiles[i].padEnd(20, ' ')} `
            }
            if (i % 3 === 2) {
                arrayOfFiles[i] = `${arrayOfFiles[i].padEnd(20, ' ')}│`
            }
            filesEnHorizontal = `\t${arrayOfFiles.join('')}`
        }
        console.log(filesEnHorizontal)
        console.log(`\t└${linea}┘`);
    } catch (error) {
        console.log(error.message);
    }
}

async function getFile() {
    try {
        function size(value) {
            let units = ["Bytes", "KB", "MB", "GB", "TB"];
            let contador = 0;
            let kb = 1024;
            let division = value / 1;
            while (division >= kb) {
                division = division / kb;
                contador++;
            }
            value = division.toFixed(1) + " " + units[contador]
            return value
        }
        const stats = fs.statSync(filepath)
        let dirName = path.dirname(filepath)
        let name = path.basename(filepath)
        if (name.length >= 20) {
            name = name.substring(0, 20) + "..."
        }
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
            │ Lectura/Escritura       │  ${canAccess() ? 'Sí' : 'No'}                      │
            └─────────────────────────┴──────────────────────────┘
                            `);
    } catch (error) {
        console.log(error);
    }
}

async function canAccess() {
    if (args.length > 0) {
        try {
            fs.accessSync(filepath, fs.constants.R_OK | fs.constants.W_OK)
            return true
        } catch (error) {
            console.log(error);
            return false
        }
    } else {
        console.log(`
        ${asteriscos}
        *   Parámetros incorrectos             *
        *    Uso: checkfile carpeta_o_fichero  *
        ${asteriscos}`);
    }
}

async function fileOrDir() {
    try {
        const stats = fs.statSync(filepath);
        stats.isDirectory() ? getDirectory() : getFile()
    } catch (error) {
        if (error.code == "ENOENT") {
            console.log(`
            ${asteriscos}
            *     Fichero/Directorio NO existe     *
            ${asteriscos}`);
        }
    }
}

const app = async () => {
    try {
        const access = await canAccess()
        const fileDir = await fileOrDir(access)
    } catch (error) {
        throw error
    }
}
app()