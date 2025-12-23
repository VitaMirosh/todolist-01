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
// rootEl.append(listsEl)
function power(base, exponent){
 let mult = 1;
 for (let i = 0; i < exponent; i++){
   mult *= base ;
 }
 return mult
}

console.log(power(4, -2))