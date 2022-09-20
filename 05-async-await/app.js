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

const getUserInfo = async (id) => {
    try {
        const employee = await getEmployee(id);
        const salary = await getSalary(id);
        return `El salario del empleado ${employee} es ${salary} €`;
    } catch (error) {
        throw new Error('Esta mal compi')
    }
}

const id = 2;

getUserInfo(id)
    .then((msg) => console.log(msg))
    .catch((err) => console.error(err))
