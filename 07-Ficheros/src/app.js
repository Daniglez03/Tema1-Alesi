const path = require('path');
const fs = require('fs')
const fsPromises = fs.promises;

/**
 * fs.readFile   : leer contenido de un archivo
 */

console.clear();

console.log(`_dirname: ${__dirname}`);
// Directorio del proyecto
console.log(`process.cwd() : ${process.cwd()}`);

const F_RPRUEBA = __dirname + '/files/Rprueba.txt';    //Fichero a leer

/**
 * LECTURA DE FICHEROS
 */
//Versión callback
// Argumentos:
// 1.- el nombre del archivo
// 2.- callback function que tiene dos argumentos
//  err = error
//  data = los datos leídos
//Si el archivo a leer es muy grande podemos tener problemas de memoria

fs.readFile(F_RPRUEBA, (err, data) => {
    if (err) {
        console.log("Error al leer el archivo");
    }else {
        console.log("Simple readFile : ", data);
    }
})

fs.readFile(F_RPRUEBA, 'utf-8', (err, data) => {
    let totalLines = 0;
    if (err) {
        console.log("Error al leer el archivo");
    }else {
        console.log("UTF-8 readFile : ", data);
        totalLines = data.split('\n').length-1
    }
    console.log('totalLines : ', totalLines);
})

//Version promesas

fsPromises
    .readFile(F_RPRUEBA, 'utf-8')
    .then((data) => {
        process.stdout.write(`\nfsPromises.readFile:\n${data}`)
    })
    .catch((err) => {
        console.log("Error en fsPromises.readFile", err);
    })