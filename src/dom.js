import { newProject } from "./project"
import { changeProject, removeToDo, removeProject } from "./index.js"



let grid = document.querySelector('.grid-container')

let form1 = document.forms[0]



export let renderToDo = (task) => {
  let checked = false
  let row = document.createElement('div')
  let check = document.createElement('i')
  let description = document.createElement('div')
  let duedate = document.createElement('div')
  let priority = document.createElement('div')
  let edit = document.createElement('button')
  let remove = document.createElement('button')

  check.classList = "far fa-check-square"
  row.classList = "grid-row"
  description.classList = "description"
  duedate.classList = "duedate"
  priority.classList = "priority"
  edit.classList = "edit"
  remove.classList = "remove"

  description.textContent = task.description
  duedate.textContent = task.duedate
  priority.textContent = task.priority
  edit.textContent = "Edit"
  remove.textContent = "Remove"

  row.appendChild(check)
  row.appendChild(description)
  row.appendChild(duedate)
  row.appendChild(priority)
  row.appendChild(edit)
  row.appendChild(remove)
  grid.appendChild(row)

  removeBtnFunc(remove, row, description)

  let checkOff = () => {
      
    if (checked == false) {
      checked = true
      row.style.backgroundColor = "green"
    } else {
      checked = false
      row.style.backgroundColor = ""
    }
  }

  let makeEdits = () => {
    let label1 = document.createElement('label')
    let input1 = document.createElement('input')
    label1.textContent = "Description:"
    input1.type = "text"
    input1.name = "description"
    label1.appendChild(input1)
    description.replaceWith(label1)

    let label2 = document.createElement('label')
    let input2 = document.createElement('input')
    label2.textContent = "Due Date:"
    input2.type = "date"
    input2.name = "duedate"
    label2.appendChild(input2)
    duedate.replaceWith(label2)

    let label3 = document.createElement('label')
    let select = document.createElement('select')
    let option1 = document.createElement('option')
    let option2 = document.createElement('option')
    let option3 = document.createElement('option')
    label3.textContent = "Priority:"
    
    select.name = "priority"
    option1.textContent = "low"
    option2.textContent = "medium"
    option3.textContent = "high"
    label3.appendChild(select)
    select.appendChild(option1)
    select.appendChild(option2)
    select.appendChild(option3)
    priority.replaceWith(label3)
    
    let done = document.createElement('button')
    done.textContent = "Done"
    done.type = "button"
    edit.replaceWith(done)

    //Add click event to done button
    done.addEventListener('click', () => {
      task.description = input1.value
      task.duedate = input2.value
      task.priority = select.value

      description.textContent = input1.value
      duedate.textContent = input2.value
      priority.textContent = select.value

      label1.replaceWith(description)
      label2.replaceWith(duedate)
      label3.replaceWith(priority)
      done.replaceWith(edit)
      console.log(taskList)
    })
  }

      //Add click event to edit button
    edit.addEventListener('click', makeEdits)
    
    //Add click event to check button
    check.addEventListener('click', checkOff)
}

export let removeBtnFunc = (button, row, taskName) => {
  button.addEventListener('click', () => {
    row.remove()
    removeToDo(taskName)
  })

}



export let renderProject = (project) => {
  
  let projects = document.querySelector('.folders')
  let li = document.createElement('li')
  let deleteIcon = document.createElement('i')
  let container = document.createElement('div')
  container.classList = "project-row"
  deleteIcon.classList = "fas fa-trash"
  li.classList = "project"
  li.textContent = project.name
  projects.appendChild(container)
  container.appendChild(li)
  container.appendChild(deleteIcon)
  
  li.addEventListener('click', changeProject)
  deleteIcon.addEventListener('click', () => {
    removeProject(li, container)
    
  })
  
}


export let clearProjects = () => {
  let projects = document.querySelector('.grid-container')
  
while (projects.firstChild) {
    projects.firstChild.remove()
}
  
  
}

