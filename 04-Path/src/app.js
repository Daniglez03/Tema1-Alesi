const path = require('path');

/**
 *  INFORMACIÓN DADO UN PATH
 * 
 *  path.basename: retorna la ultima porción de un path
 *  path.dirname: retorna el nombre del directorio de un path
 *  path.extname: retorna la extensión de un fichero dado en path
 * 
 *  UNIR PATH
 *  path.join    : une los segmentos especificados en un único path
 *  path.resolve:    resuelve una secuencia de segmentos de path a una ruta absoluta
 *  path.format:   devuelve un path dado un objeto formado por los eltos {dir:'', base:''}
 *  path.parse:   devuelve un objeto con las propiedades del path dado
 *                  {
 *                      root: '',
 *                      dir:'',
 *                      base:'',
 *                      ext:'',
 *                      name:''
 *                  }
 *  __dirname: variable que devuelve el path actual
 * 
 */

// INFORMACIÓN
const filepath = '~/Documents/2DAM-AccesoDatos/Tema1-Asincrono/04-Path/prueba.txt'
console.log(`Base name ${path.basename(filepath)}`);    //prueba.txt
console.log(`Dir name ${path.dirname(filepath)}`);     //ruta hasta el fichero
console.log(`Extensión ${path.extname(filepath)}`);     // .txt

// UNI PATH
const join = '/path'
const joinArg = 'a/mi/fichero.txt'

console.log(`Unido : ${path.join(join, joinArg)}`);   //  /path/a/mi/fichero.txt
console.log(
    `Unidos sin barras : ${path.join(join, 'usuario', 'file', 'fichero.txt')}`
    //   /path/usuario/file/fichero.txt
);

// PATH RESOLVE

console.log(`Abs path : ${path.resolve(joinArg)}`); //  /a/mi/fichero.txt
console.log(`Abs path : ${path.resolve('info.txt')}`); //  C:\Users\Dani\Documents\2DAM-AccesoDatos\Tema1-Asincrono\04-Path\info.txt

// PATH FORMAT

const obj = { dir: 'c:\\Users\\AccesoDatos', base: 'demo_path.js'}
const newPath = path.format(obj)

console.log(`newPath : ${newPath}`);

// PATH PARSE
const path1 = path.parse('/users/admin/website/index.html')
console.log(path1);

// RUTA ACTUAL

console.log('El directorio actual es:\n ', __dirname);