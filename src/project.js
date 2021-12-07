export let newProject = (name, taskList = []) => {
name = name
taskList = taskList

return {name, taskList}
}
