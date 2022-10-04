const Employees = [
    {id: 1, name: "Juan"},
    {id: 2, name: "Luis"},
    {id: 3, name: "Carlos"}
]

const Salaries = [
    {id: 1, salary: 1000},
    {id:2, salary: 2000}
]

const getEmployee = (id) => {
    const promise = new Promise( (resolve, reject) => {
        const employee = Employees.find((e) => e.id === id)
        if (employee) {
            resolve(employee.name)
        }else {
            reject(`El empleado ${id} no existe`)
        }
    })
    return promise
}

const getSalary = (id) => {
    return new Promise( (resolve, reject) => {
    const salary = Salaries.find((e) => e.id === id)
    salary ? resolve(salary.salary) : reject(`No existe el salario del empleado de id: ${id}`)
    })
}


const id = 1;
/*
getEmployee(id)
    .then((employee) => console.log(employee))
    .catch(e => console.log(e))
getSalary(id)
    .then(salary) => console.log(salary)
    .catch(e) => console.log(e) */

// Promesas en cadena

let employeeName;
getEmployee(id)
    .then((employee) => {
        employeeName = employee
        return getSalary(id)
    })
    .then((salary) => {
        console.log("Empleado :", employeeName, " tiene un salario de :", salary, " €")
    })
    .catch((err) => console.error(err))
