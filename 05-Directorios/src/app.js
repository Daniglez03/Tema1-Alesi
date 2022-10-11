

const { error } = require('console');
const fs = require('fs');
const { constants } = require('fs/promises');
const fsPromises = fs.promises;
const path = require('path');

/**
 * CALLBACKS Y SYNC:
 * 
 * fs.access  :   comprueba si un fichero sile o directorio existe y si el usuario puede acceder
 * fs.existsSync : comprueba si existe un directorio (síncrono)
 * fs.accessSync: Igual a access  (síncrona)
 * fs.stat  :  Obtener informacion acerca de un dir/file
 * stats.isDirectory : comprueba si es un dir
 * stats.isFile : Comprueba si es un file
 * stats.size : variable que indica el tamaño
 * fs.readdir : devuelve los ficheros de un dir
 * 
 * fs.mkdir : crear un directorio
 * fs.mkdirSync : crear un directorio
 * fs.rename : Renombrear un directorio
 * fs.renameSync : Renombrar un directorio
 * fs.rmdir : borrar un directorio
 * fs.rmdirSync : borrar un directorio
 */

console.clear();

/**
 * COMPROBAR SI EXISTE UN DIRECTORIO
 */
//Versión callback

//Si no retorna un error el file existe y se tiene acceso
//   fs.constants.F_OK : Read/Write/Execute permission (default)
//   fs.constants.R_OK : Has read permission
//   fs.constants.W_OK : Has write permission
//   fs.constants.X_OK : Has execute permission
//   fs.constants.R_OK | fs.constants.W_OK : read/write

fs.access('./dir_callback', fs.constants.F_OK, (error) => {
    if (error) {
        console.log('fs.access El directorio dir_callback NO existe');
    }else {
        console.log('fs.access El directorio dir_callback Existe');
    }
})

// Version promesas
function canAccess() {
    fsPromises
        .access('./dir_promesas', fs.constants.F_OK)
        .then(true)
        .catch((error) => {
            if (error.code == "ENOENT") {
                return false
            }
            throw error;
        })
}

if (canAccess()) {
    console.log('canAccess El directorio dir_promesas Existe');
} else {
    console.log('canAccess El directorio dir_promesas NO existe');
}

// Versión síncrona
try {
    if (fs.existsSync('./dir_sync')) {
        console.log('canAccess El directorio dir_async Existe');
    } else {
        console.log('canAccess El directorio dir_async NO existe');
    }
} catch (error) {
    console.log(`Error : ${error}`);
}

try {
    fs.accessSync('etc/passwd', constants.R_OK | constants.W_OK)
    console.log('can read/write');
} catch (error) {
    console.error("no access!!");
}

/**
 * CREAR UN DIRECTORIO
 */

fs.access('./dir_callback', fs.constants.F_OK, (err) => {
    //No existe
    if (err) {
        // fs.mkdir('./dir_callback', {reursive: true} , (err) => {})
        fs.mkdir('./dir_callback', (err) => {
            if (err) {
                console.log(err.message);
            }else {
                console.log("fs.mkdir Carpeta creada correctamente");
            }
        })
    }else {
        console.log("fs.mkdir Carpeta dir_callback ya existente");
    }
})

// Version con promesas
fsPromises
    .mkdir('./dir_promesas')
    .then( () => {
        console.log("fsPromisise.mkdir Carpeta dir_promesas creada correctamente");
    })
    .catch( (e) => {
        if (e.code === "EEXIST") {
            console.log("fsPromisise.mkdir Carpeta dir_promesas ya existe");
            return;
        }
        throw e
    });

/**
 * RENOMBRAR UN DIRECTORIO
 */

//Version callbacks

fs.rename('./dir_callback', './dir_callback_new', (err) => {
    //No existe
    if (err) {
        if (err.code === "ENOENT") {
            console.log("dir_callback no existe");
            return;
        }
        console.log('fs.rename :', err);
        throw err
    }else {
        console.log('fs.rename Renombrado dir_callback_new correctamente');
    }
})

//Version promesas
fsPromises
    .rename('./dir_promesas', './dir_promesas_new')
    .then( () => {
        console.log("fsPromisise renombrada a ./dir_promesas_new");
    })
    .catch( (e) => {
        if (e.code === "EEXIST") {
            console.log("fsPromisise.rename dir_promesas No existe");
            return;
        }
        console.log('fsPromises.rename', e);
        throw e;
    });


/**
 * COMPROBAR SI ES DIRECTORIO O FICHERO
 */

fs.stat( path.join(__dirname, 'app.js'), (err, stats) => {
    console.log(
        'stat callback:',
        stats.isDirectory() ? 'Es un directorio' : err
    );
    console.log('stat callback', stats);
});

fs.promises
    .stat(path.join(__dirname, 'app.js'))
    .then((stats) => {
        'stat promesas:',
        stats.isDirectory() ? 'Es un fichero' : 'NO es un fichero'
    })
    .catch((error) => {
        console.log(error);
    })

// Versión síncrona
try {
    const stats = fs.statSync(path.join(__dirname, 'app.js'));
    console.log('Es un fichero ? : ' + stats.isFile());
} catch (error) {
    console.log(error.message);
}

/**
 * LISTAR FICHEROS DE UN DIRECTORIO
 */

const FOLDER = './';

//Versión callbacks
fs.readdir(FOLDER, (err, files) => {
    if ((err)) {
        console.log(err.message);
    } else {
        console.log('****************** CALLBACK *****************');
        console.log(files);

        files.forEach((file) => {
            console.table(file);
        })
        console.log("***************** FIN CALLBACK ***************");
    }
});

//Versión síncrona
try {
    const arrayOfFiles = fs.readdirSync(FOLDER)
    console.log('****************** CALLBACK 2 *****************');
    for (const file of arrayOfFiles) {
        console.table(file);
    }
    console.log("***************** FIN CALLBACK ***************");
} catch (error) {
    console.log(error.message);
}

fsPromises
    .readdir(FOLDER)
    .then(files => {
        console.log("*********** Promise *************");
        for (const file of files) {
            console.log(file);
        }
        console.log("********* End Promise ***********");
    })
    .catch((error) => {
        console.log(error.message);
    })

/**
 * 226 
 * 
 * 
 * 76
 * 195
 * 196
 * 179
 * 180
 */