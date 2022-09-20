

const getUserById = (id, callback) => {
    const user = {
        id,
        name: "Acceso a datos"
    }
    if (id === 10) {
        callback(new Error('Ese usuario no existe'))
    }
    setTimeout(() => {
        callback(null, user)
    }, 2000);
}

getUserById(10, (error, user) => {
    if (error) {
        console.error(error.message)
    } else { console.log(user);
    }
    console.log(user)
})