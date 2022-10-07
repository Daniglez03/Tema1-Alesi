const fs = require('fs');
const { join } = require('path');
const path = require('path');

const args = process.argv.slice(2);
const filepath = args[0]

if (args.length > 0) {
    fs.access(args[0], fs.constants.F_OK, (error) => {
        if (error) {
            console.log(`
            ********************************
            * Fichero/Directorio NO existe *
            ********************************`);
        } else {
            fs.stat(filepath, (err, value) => {
                if (value.isDirectory()) {
                    fs.readdir(filepath, (err, files) => {
                        if (err) {
                            console.log(err.message);
                        } else {
                            /*console.log(`
                    ┌──────────────────────────────────────────────────────────────┐
                    │           El valor introducido es un directorio              │
                    └──────────────────────────────────────────────────────────────┘
                    ┌──────────────────────────────────────────────────────────────┐
                    │ ${files.join('          ')}                                  │
                    │                                                              │
                    └──────────────────────────────────────────────────────────────┘
                    `);*/


console.log(`\t┌───────────────────────────────────────────────────────────────┐`);
console.log(`\t│             El valor introducido es un directorio             │`);
console.log(`\t└───────────────────────────────────────────────────────────────┘`);
console.log(`\t┌───────────────────────────────────────────────────────────────┐`);
let horizontal = ""
for (let i = 0; i < files.length; i++) {
    let spacesColumn = "" //20
    let spacesOfFileLength = "" //?
    for (let i = 0; i < 20; i++) {
        spacesColumn += " "
    }
    if (files[i].length >= 17) {
        files[i] = files[i].substring(0, 17) + "..."
    }
    if (i%3 == 0) {
        
        if (files[i].length >= 20) {
            spacesOfFileLength = spacesColumn
        }
        if (i !== 0) {
            files[i] = `\n\t│ ${files[i]} `
        }else {
            files[i] = `│ ${files[i]} `
        }
    }
    if (i%3 == 1 ) {
        let tamano = i-1
        // ERROR =====>   Coger length de los archivos de la primera columna para poder restarselos a los 20 espacios
        for (let i = 0; i < files[tamano].length; i++) {
            spacesOfFileLength += " "
        }
        let finalSpace = spacesColumn - spacesOfFileLength
        files[i] = `${finalSpace +files[i]} `
    }
    if (i%3 == 2) {
        files[i] = `${files[i]}│`
    }
    horizontal = `\t${files.join('')}`
}

// Position files
// 0  1  2
// 3  4  5
// 6  7  8
// 9 10 11
console.log(horizontal);
console.log(`\t└───────────────────────────────────────────────────────────────┘`);
                        }
                    });
                } else {
                    if (err) {
                        console.log(err);
                    } else {
                        let kb = value.size / 1024
                        value = kb.toFixed(1)+" KB"
                    }
                    fs.access(filepath, fs.constants.R_OK | fs.constants.W_OK, (error) => {
                        let spaces = " "
                        let SpacesNameArchivo = ""
                        let SpacesExtArchivo = ""
                        let SpacesDirArchivo = ""
                        let SpacesSizeArchivo = ""
                        for (let i = 0; i < 26 - path.basename(filepath).length ; i++) {
                            SpacesNameArchivo += spaces
                        }
                        for (let i = 0; i < 26 - path.extname(filepath).length ; i++) {
                            SpacesExtArchivo += spaces
                        }
                        for (let i = 0; i < 26 - path.parse(filepath).dir.length ; i++) {
                            SpacesDirArchivo += spaces
                        }
                        for (let i = 0; i < 26 - value.length ; i++) {
                            SpacesSizeArchivo += spaces
                        }
                        console.log(`
            ┌────────────────────────────────────────────────────┐
            │           Características del archivo              │
            ├─────────────────────────┬──────────────────────────┤
            │ Nombre del Archivo      │${path.basename(filepath) + SpacesNameArchivo}│
            ├─────────────────────────┼──────────────────────────┤
            │ Extención del Archivo   │${path.extname(filepath) + SpacesExtArchivo}│
            ├─────────────────────────┼──────────────────────────┤
            │ Directorio del Archivo  │${path.parse(filepath).dir + SpacesDirArchivo}│
            ├─────────────────────────┼──────────────────────────┤
            │ Tamaño del Archivo      │${value+SpacesSizeArchivo}│
            ├─────────────────────────┼──────────────────────────┤
            │ Lectura/Escritura       │${!error ? 'Sí' : 'No'}                        │
            └─────────────────────────┴──────────────────────────┘
                            `);
                            //26 espacios por container
                    })
                }
            });
        }
    })
} else {
    console.log(`
            **************************************
            * Parámetros incorrectos             *
            *  Uso: checkfile carpeta_o_fichero  *
            **************************************`);
}