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
                            let linea = ""
                            for (let i = 0; i < 63; i++) {
                                linea += "─"
                            }
                            console.log(`\t┌${linea}┐`);
                            console.log(`\t│             El valor introducido es un directorio             │`);
                            console.log(`\t└${linea}┘`);
                            console.log(`\t┌${linea}┐`);
                            let horizontal = ""
                            for (let i = 0; i < files.length; i++) {
                                if (files[i] !== files.at(-1) && files[i].length >= 17) {
                                    files[i] = files[i].substring(0, 17) + "..."
                                }
                                if (files.indexOf(files.at(- 1)) % 3 === 0) {
                                    files[files.indexOf(files.at(-1))] = files[files.indexOf(files.at(-1))].padEnd(62, ' ') + '│'
                                }
                                if (files.indexOf(files.at(- 1)) % 3 === 1) {
                                    files[files.indexOf(files.at(-1))] = files[files.indexOf(files.at(-1))].padEnd(41, ' ') + '│'
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
                                horizontal = `\t${files.join('')}`
                            }
                            console.log(horizontal);
                            console.log(`\t└${linea}┘`);
                            // Position files
                            // 0  1  2
                            // 3  4  5
                            // 6  7  8
                            // 9 10 11
                        }
                    });
                } else {
                    if (err) {
                        console.log(err);
                    } else {
                        function size() {
                            let units=["Bytes", "KB", "MB", "GB", "TB"];
                            let contador = 0;
                            let kb = 1024;
                            let div = value.size / 1;
                                while(div >= kb){
                                    contador ++;
                                    div= div/kb;
                                }
                                value = div.toFixed(1) + " " + units[contador]
                                return value
                            }
                    }
                    fs.access(filepath, fs.constants.R_OK | fs.constants.W_OK, (error) => {
                        let name = path.dirname(filepath)
                        console.log(`
            ┌────────────────────────────────────────────────────┐
            │           Características del archivo              │
            ├─────────────────────────┬──────────────────────────┤
            │ Nombre del Archivo      │  ${path.basename(filepath).padEnd(24, ' ')}│
            ├─────────────────────────┼──────────────────────────┤
            │ Extención del Archivo   │  ${path.extname(filepath).padEnd(24, ' ')}│
            ├─────────────────────────┼──────────────────────────┤
            │ Directorio del Archivo  │  ${path.basename(name).padEnd(24, ' ')}│
            ├─────────────────────────┼──────────────────────────┤
            │ Tamaño del Archivo      │  ${size().padEnd(24, ' ')}│
            ├─────────────────────────┼──────────────────────────┤
            │ Lectura/Escritura       │  ${!error ? 'Sí' : 'No'}                      │
            └─────────────────────────┴──────────────────────────┘
                            `);

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