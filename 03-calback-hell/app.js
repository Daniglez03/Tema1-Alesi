const Employees = [
    {id: 1, name: "Juan"},
    {id: 2, name: "Luis"},
    {id: 3, name: "Carlos"}
]

const Salaries = [
    {id: 1, salary: 1000},
    {id:2, salary: 2000}
]

const getEmployee = (id, callback) => {
    const employee = Employees.find((e) => e.id === id)

    if(employee){
        callback(null, employee.name)
    }else {
        callback(new Error('El empleado no existe... '))
    }
}

const getSalary = (id, callback) => {
    const salary = Salaries.find((e) => e.id === id)

    if(salary){
        callback(null, salary.salary)
    }else {
        callback(new Error('Este salario no existe... '))
    }
}

const id = 1;
getEmployee(id, (error, employee) => {
    if (error) {
        console.error(error.message)
    } else { 
        getSalary(id, (error, salary) => {
            console.log("Empleado :", employee, " tiene un salario de ", salary, " €");
        })
    }
})
