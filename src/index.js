import './main.sass'
import { newToDo } from './todo.js'

import { renderToDo, renderProject, clearProjects, removeBtnFunc } from './dom.js'
import { newProject } from './project.js'



let button = document.querySelector('button')
let buttonProject = document.querySelector('.fas.fa-plus')
let deleteProjectIcon = document.querySelector('.fas.fa-trash')
let form1 = document.forms[0]
let form2 = document.forms[1]

const projectList = []


let defaultProject = newProject("Default")
let currentProject = defaultProject
projectList.push(currentProject)


button.addEventListener('click', () => {
   let task = newToDo(form2[0].value, form2[1].value, form2[2].value)
  
   currentProject.taskList.push(task)
  
   localStorage.setItem(currentProject.name, JSON.stringify(currentProject.taskList))


  renderToDo(task)  
  
})

buttonProject.addEventListener('click', () => {
  let project = newProject(form1[0].value)
  projectList.push(project)
  renderProject(project)

  
})

export let changeProject = (item, pList = projectList) => {
  
  
  if (item.target.textContent != currentProject.name) {
    clearProjects()
  let previousProject = document.querySelector('.project.current')

   if (previousProject == null) {
    previousProject = document.querySelector('#default')
    
   }
  
  previousProject.classList = "project"
  
  item.target.classList += " current"

  pList.forEach(project => {
    
    if (project.name == item.target.textContent) {
       
     currentProject = project
       
       currentProject.taskList.forEach(task => {
         renderToDo(task)
       })
  }})
  }
}

let defaultProj = document.querySelector('.project.current')

defaultProj.addEventListener('click', changeProject)

export let removeToDo = (taskName, project = currentProject) => {
  
  let taskList = project.taskList
  

  for (let i = 0; i < taskList.length; i++) {
    let task = taskList[i]
    if (task.description == taskName.textContent) {
      taskList.splice(i, 1)
    }
  }
  console.log(taskList)
}



export let removeProject = (item, domRow, projects = projectList) => {

  for (let i = 0; i < projectList.length; i++) {
    let project = projectList[i]
    if (project.name == item.textContent) {
      projectList.splice(i, 1)
      domRow.remove()
    }
  }
  
}

let renderLocalStorage = () => {
  let i = 0
  let key = localStorage.key(i)
  let value = JSON.parse(localStorage.getItem(key))

   while (key) {

    key = localStorage.key(i)
    value = JSON.parse(localStorage.getItem(key))
    
    if (key == null) return
    
    
    if (key == currentProject.name) {
      console.log(key)
      value.forEach(item => {
        
        let task = newToDo(item.description, item.duedate, item.priority)
        currentProject.taskList.push(task)
        renderToDo(task)
      })
      
    } else {
      let project = newProject(key)
      projectList.push(project)
      renderProject(project)
      
      value.forEach(item => {
        let task = newToDo(item.description, item.duedate, item.priority)
        project.taskList.push(task)
      })
    }
    i += 1
   }
  
}

if (localStorage.key(0) != null) {
renderLocalStorage()
}






