const args = process.argv.slice(2)

if (args.length > 0) {
    let arrNum = []
    const loadNumber = () => {
        args.slice(1).forEach(value => {
            if (value.substring(0, 5) === "--op=") {
                let number = Number(value.substring(5))
                if (!isNaN(number) && number !== 0) {
                    arrNum.push(number)
                }
            }
        })
    }
    loadNumber()

    let signo = args[0].substring(12)
    
    let resultado = {
        operator: signo,
        ops: arrNum,
        res: 0
    }
    switch (args[0]) {
        case "--operation=/":
            if (arrNum.length >= 2) {
                //Más resumido pero no se si se puede utilizar reducir
                //const totalDiv = arrNum.reduce((p, c) => p / c)
                let total = 0
                total = arrNum[0] / arrNum[1]
                arrNum.slice(2).forEach(element => {
                    total /= element
                });
                resultado.res = total
                console.log("operación : ", resultado);
            } else {
                console.log("ERROR: El número de operandos debe ser mayor que 1");
            }
            break;
        case "--operation=*":
            if (arrNum.length >= 2) {
                //Más resumido pero no se si se puede utilizar reducir
                //const totalMult = arrNum.reduce((p, c) => p * c)
                let mult = 1
                arrNum.forEach(element => {
                    mult *= element
                });
                resultado.res = mult
                console.log("operación : ", resultado);
            } else {
                console.log("ERROR: El número de operandos debe ser mayor que 1");
            }
            break
        case "--operation=^":
            if (arrNum.length > 1 && arrNum.length < 3) {
                const totalPotencia = arrNum[0] ** arrNum[1]
                resultado.res = totalPotencia
                console.log("operación : ", resultado);
            } else {
                console.log("ERROR: El número de operandos debe ser 2");
            }
            break;
        case "--operation=@":
            if (arrNum.length === 1) {
                const totalRaiz = Math.sqrt(arrNum[0])
                resultado.res = totalRaiz
                console.log("operación : ", resultado);
            } else {
                console.log("ERROR: El número de operandos debe ser 1");
            }
            break
        default:
            console.log("ERROR: Parámetros erróneos");
            break;
    }
} else {
    console.log("ERROR: No hay argumentos");
}