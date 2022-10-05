const fs = require('fs');
const { join } = require('path');
const path = require('path');

const args = process.argv.slice(2);
const filepath = args[0]
const FOLDER = './';

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
                    fs.readdir(FOLDER, (err, files) => {
                        if (err) {
                            console.log(err.message);
                        } else {
                            console.log(`
                    ┌──────────────────────────────────────────────────────────────┐
                    │           El valor introducido es un directorio              │
                    └──────────────────────────────────────────────────────────────┘
                    ┌──────────────────────────────────────────────────────────────┐
                    ${files.forEach((files) => {console.log(files)})}
                    
                    └──────────────────────────────────────────────────────────────┘
                    `);
                        }
                    });
                } else {
                    if (err) {
                        console.log(err);
                    } else {
                        let kb = value.size / 1024
                        value = kb.toFixed(1)
                    }
                    fs.access(filepath, fs.constants.R_OK | fs.constants.W_OK, (error) => {
                        console.log(`
            ┌────────────────────────────────────────────────────┐
            │           Características del archivo              │
            ├─────────────────────────┬──────────────────────────┤
            │ Nombre del Archivo      │${path.basename(filepath)}│
            ├─────────────────────────┼──────────────────────────┤
            │ Extención del Archivo   │${path.extname(filepath)} │
            ├─────────────────────────┼──────────────────────────┤
            │ Directorio del Archivo  │${path.parse(filepath).dir}│
            ├─────────────────────────┼──────────────────────────┤
            │ Tamaño del Archivo      │         ${value} KB           │
            ├─────────────────────────┼──────────────────────────┤
            │ Lectura/Escritura       │            ${!error ? 'Sí' : 'No'}            │
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