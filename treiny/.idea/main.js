// const lists = [
//   {title: "Go to shop", isDone: true},
//   {title: "Clean hause", isDone: false},
//   {title: "Go for a walk ", isDone: true},
//   {title: "Visit parants", isDone: false},
// ]
//
//
// const rootEl = document.getElementById('root')
// const headerEl = document.createElement('h1')
// headerEl.textContent = "Homework list"
// rootEl.append(headerEl)
// const listsEl = document.createElement('ul')
//
// lists.forEach(list => {
//   const listEl = document.createElement('li')
//   const inputEl = document.createElement('input')
//   inputEl.type = 'checkbox'
//   inputEl.checked = list.isDone
//
//   const titleEl = document.createElement('span')
//   titleEl.textContent=list.title
//   listEl.append(inputEl)
//   listEl.append(titleEl)
//
//
//   listsEl.append(listEl)
// })
// // rootEl.append(listsEl)
// function power(base, exponent){
//  let mult = 1;
//  for (let i = 0; i < exponent; i++){
//    mult *= base ;
//  }
//  return mult
// }
//
// console.log(power(4, -2))

const todolistId_1 = crypto.randomUUID()
const todolistId_2 = crypto.randomUUID()

let todolist = [{
  id: todolistId_1,
  title: "What to lear",
  filter: "all",
  // tasks: [
  //   {id: crypto.randomUUID(), title: "HTML", isDone: false},
  //   {id: crypto.randomUUID(), title: "CSS", isDone: true},
  //   {id: crypto.randomUUID(), title: "JS/TS", isDone: true},
  // ]
},
  {
    id: todolistId_2,
    title: "What to buy",
    filter: "all",
    // tasks: [
    //   {id: crypto.randomUUID(), title: "Brad", isDone: false},
    //   {id: crypto.randomUUID(), title: "Meat", isDone: true},
    //   {id: crypto.randomUUID(), title: "Milk", isDone: true},
    // ]
  }

]
const tasks = {
  [todolistId_1]: [
    {id: crypto.randomUUID(), title: "HTML", isDone: false},
    {id: crypto.randomUUID(), title: "CSS", isDone: true},
    {id: crypto.randomUUID(), title: "JS/TS", isDone: true},
  ],
  [todolistId_2]: [
    {id: crypto.randomUUID(), title: "Brad", isDone: false},
    {id: crypto.randomUUID(), title: "Meat", isDone: true},
    {id: crypto.randomUUID(), title: "Milk", isDone: true},
  ]

}


