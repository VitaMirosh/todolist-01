
//1.

const numbers = [1,5,10,15,20];
const newNumbers = numbers.map((number) => {
  return number+10
});
console.log(newNumbers);

//2.


const names = ["Alice", "Bob", "Charlie", "Diana"]
const nameInfo = names.map((name) => {
  return { "name" : name, "age" : name.length };
})
console.log(nameInfo);

//3.


const products = [
  {name:"Laptop", price: 1000},
  {name:"Mouse", price: 50},
  {name:"Keyboard", price: 80},
]
const productsWithFinalPrice = products.map(product => {
  return {...product, "finalPrice": product.price*0.85 };
})
console.log(productsWithFinalPrice);
//4.


const employees  = [
  { name: "Alice", salary: 50000, experience: 3 },
  { name: "Bob", salary: 60000, experience: 5 },
  { name: "Charlie", salary: 45000, experience: 2 },
]
const employeesWithTotal = employees.map((employee) => {
  return {
    ...employee,"totalSalary":employee.salary * 0.05 *employee.experience+employee.salary
  }
})
console.log(employeesWithTotal)