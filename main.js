var formElem = document.querySelector(".form");
var InputElem = document.querySelector(".nameInput");
var sendBtn = document.querySelector(".sendBtn");
var outputItem = document.querySelector(".output");
var temp = document.querySelector(".film").content;

let count

if(getTodos().length > 0){
    console.log(getTodos())
    count = (getTodos()[getTodos().length - 1].id + 1)
}
else{ 
    count = 0
}


// console.log(count)
// let count =

// let myTodos = [
//         {id:1, title:"Dars qilish kerak"},
//         {id:2, title:"Dam olish kerak"},
//         {id:3, title:"Ishga kirish kerak"}
// ]

// localStorage.setItem('todos',JSON.stringify(myTodos))

function getTodos(){
    return JSON.parse(localStorage.getItem('todos')) || []
}

function addToDo(todo){
    let todos = getTodos()
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function deleteTodo(id){
    let todos = getTodos()
    todos = todos.filter(elem => elem.id != id)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodoById(id){
    const todos = getTodos()
    const todo = todos.find(elem => elem.id == id)
    return todo
}

function renderTodo(todos){
    outputItem.innerHTML = ''
    let frag = document.createDocumentFragment()

    todos.forEach(item => {
        let clone = document.importNode(temp, true)
        clone.querySelector('.film-item').textContent = item.title
        clone.querySelector('.delete-btn').dataset.todoId = item.id
        clone.querySelector('.edit-btn').dataset.todoId = item.id
        frag.appendChild(clone)
    })

    outputItem.appendChild(frag)
}

function updateTodo(id, title){
    let todos = getTodos()
    todos = todos.map(elem => {
        if(elem.id == id){
            elem.title = title
        }
        return elem
    })
    localStorage.setItem('todos', JSON.stringify(todos))
}







formElem.addEventListener('submit', formSubmit)

function formSubmit(evt){
        evt.preventDefault()
        if(InputElem.value == '') return
        const tempTodo = {
            id:count,
            title:InputElem.value
        }
        addToDo(tempTodo)
        count++
        renderTodo(getTodos())
        InputElem.value = ''
    
}

function formEdit(evt){
    evt.preventDefault()
    updateTodo(formElem.dataset.editableTodoId, InputElem.value)
    console.log('submit edit listener')
    renderTodo(getTodos())
    formElem.removeEventListener('submit', formEdit)
    InputElem.value = ''
    formElem.addEventListener('submit', formSubmit)
}


renderTodo(getTodos())



outputItem.addEventListener('click', evt => {
    if(evt.target.getAttribute('vazifa') == 'deleteBtn'){
        let todoId = evt.target.dataset.todoId
        deleteTodo(todoId)
        renderTodo(getTodos())
        // console.log('delete btn bosildi')
    }
    if(evt.target.getAttribute('vazifa') == 'editBtn'){
        let todoId = evt.target.dataset.todoId
        const todo = getTodoById(todoId)
        InputElem.value = todo.title

        formElem.dataset.editableTodoId = todo.id

        formElem.removeEventListener('submit', formSubmit)
        formElem.addEventListener('submit', formEdit)
        // console.log(getTodoById(todoId))
        // console.log('edit btn bosildi')
        // console.log(todoId)
    }
})























// let count = getTodos()[getTodos.length - 1].id + 1

// console.log(count);


// function getTodos(){
//     return JSON.parse(localStorage.getItem('todos')) || []
// }

// function addTodo(item){
//     let arr = getTodos()
//     arr.push(item)
//     localStorage.setItem('todos', JSON.stringify(arr))
// }

// function renderTodo(todos){
//     outputItem.innerHTML = null

//     let frag = document.createDocumentFragment()

//     todos.forEach((item) => {
//         let clone = document.importNode(temp, true)
//         clone.querySelector('.film-item').textContent = item.title
//         clone.querySelector('[vazifa=deleteBtn]').setAttribute('todoId', item.id)
//         clone.querySelector('[vazifa=editBtn]').setAttribute('todoId', item.id)
//         frag.appendChild(clone) 

//     })
//     outputItem.appendChild(frag)
// }

// function deleteTodo(id){
//     let tempTodos = getTodos()
//     tempTodos = tempTodos.filter((item) => {
//         if(item.id != id){
//             return item
//         }
//     })
//     localStorage.setItem('todos', JSON.stringify(tempTodos  ))
// }


// outputItem.addEventListener('click', evt => {
//     if(evt.target.getAttribute('vazifa') == 'deleteBtn'){
//         let todoid = evt.target.getAttribute('todoid')
//         deleteTodo(todoid)
//         renderTodo(getTodos())
//         console.log('Clicked delete btn item id '+todoid);
//     }
//     if(evt.target.getAttribute('vazifa') == 'editBtn'){
//         let todoid = evt.target.getAttribute('todoid')
//         let todo = getTodos()
//         const todoIndex = todo.findIndex(item => {
//             if(item.id == todoid){
//                 return item
//             }
//         } )
//         // console.log(todoIndex)
//         InputElem.value = todo[todoIndex].title
//         sendBtn.textContent = 'Edit'
//         sendBtn.setAttribute('edit-task',`true+${todoid}`)
//         // console.log('Clicked edit btn item id '+todoid);
//         // console.log(todo);
//         // console.log('Edit Item');
//     }
// })

// function addUserSubmit(evt) {
//     evt.preventDefault()
//     addTodo({
//         id:count++,
//         title:InputElem.value
//     })
//     renderTodo(getTodos())
//     InputElem.value = ''
// }

// function updateUserSubmit(id, title){
    
//     let todos = getTodos()
//     todos = todos.map((elem) => {
//         if(elem.id == id){
//             elem.title = title
//             return elem
//         }
//     })  

//     localStorage.setItem('todos', JSON.stringify(todos))

//     // let todo = todos.find(element => element.id == id)
//     // todo.title = title
// }

// sendBtn.addEventListener('click', evt => {
//     evt.preventDefault()
//     // console.log(evt.target)
//     // console.log(evt.target.getAttribute('edit-task'))
//     if(evt.target.getAttribute('edit-task') == 'false'){
//         addUserSubmit(evt)
//     }
//     else{
//         let todoId = evt.target.getAttribute('edit-task').split('+')
//         console.log(todoId);
//         updateUserSubmit()
//     }
// })
// // const todos =[
// //     {id:1, title:'Salom'},
// //     {id:2, title:'Salom2'},
// //     {id:3, title:'Salom3'}
// // ]

// // localStorage.setItem('todos', JSON.stringify(todos))
// // addTodo({id:1, title:'Salom555'})

// renderTodo(getTodos())