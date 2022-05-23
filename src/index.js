//Factory function of new tasks
const taskFactory = (title, desc, date, prior) => {
    return {title, desc, date, prior}
}

const generalTasksArray = [

]

//UI module: Handles UI
const UI = (()=> {

    const displayTasks = (tasksArray)=> {
        tasksArray.forEach(task=>{
            addTaskToList(task);
            storeTask(task);
        });
        console.log(tasksArray);
    };

    const displayFilteredTasks = (tasksArray)=> {
        tasksArray.forEach(task=>{
            addTaskToList(task);
        });
        console.log(tasksArray);
    };

    const storeTask = (task) => {
        generalTasksArray.push(task)
    }

    const addTaskToList = (task)=> {
        const taskContainer = document.querySelector('#main');

        const task_div = document.createElement('div');

        task_div.classList.add('task-item', task.prior);

        task_div.innerHTML = `
            <div class="check-btn"></div>
            <div class="main-task-infos">
                <div class="task-title">${task.title}</div>
                <div class="details">${task.desc}</div>
            </div>
            <div class="date">${task.date}</div>
            <div class="delete-btn"></div>
        `
        //Eu associei um objeto à um elemento html. Isso vai permitir que eu retire o objeto da array e o elemento do DOM.
        task_div.objectAssign = task;

        taskContainer.prepend(task_div);
    }

    const clearTaskDisplay = () => {
        document.querySelector('#main').innerHTML = '';
    }

    const deleteTask = (taskElement, taskObject)=> {
        const taskContainer = document.querySelector('#main');
        taskContainer.removeChild(taskElement);
        generalTasksArray.splice(generalTasksArray.indexOf(taskObject), 1);
    }

    const openTaskForm = ()=> {
        document.querySelector('.new-overlay').classList.add('show-task-form');
    }

    const closeTaskForm = () => {
        document.querySelector('.new-overlay').classList.remove('show-task-form');
    }

    const filterTodayTasks = () => {
        const todayTasks = generalTasksArray.filter((el)=>{
            return el.date == '2022-05-23';
        });
        clearTaskDisplay();
        displayFilteredTasks(todayTasks);
    }

    return {openTaskForm, closeTaskForm, addTaskToList, displayTasks, deleteTask, filterTodayTasks, clearTaskDisplay}
})();

//Store module: Handles storage

//Event: Remove a task

//Event: Add a task

//document.addEventListener('DOMContentLoaded', ()=>UI.displayTasks());

document.querySelector('form').addEventListener("submit", (e)=>{
    e.preventDefault();

    const title = document.querySelector('#new-todo--title').value;
    const desc = document.querySelector('#new-todo--description').value;
    const date = document.querySelector('#new-todo--date').value;
    const prior = document.querySelector('input[type="radio"]:checked').value;

    const newTask = taskFactory(title, desc, date, prior);

    UI.addTaskToList(newTask);
    UI.closeTaskForm();
})

document.querySelectorAll('.task-item').forEach((item) => {
    item.addEventListener('click', (e)=>{console.log(e)})
});

//Event: Open form
document.querySelector('.new-task-btn').addEventListener('click', ()=>UI.openTaskForm());
//Event: Close form
document.querySelector('#close-form-btn').addEventListener('click', ()=>UI.closeTaskForm());

//Event: delete task
document.addEventListener('click', (e)=>{
    if(e.target.classList.contains('delete-btn')){
        UI.deleteTask(e.target.parentNode, e.target.parentNode.objectAssign);
    }
})

//Event: add a new list
document.querySelector('.new-list-btn').addEventListener('click', (e)=> console.log(e.target))

//Event: Filter tasks by date
document.querySelector('#my-day-tasks').addEventListener('click', () => {
    UI.filterTodayTasks();
})

const arrayOfObjects = [
    {title: 'test 1', desc: 'test 1', date: '2022-05-23', prior: 'priority-low'},
    {title: 'test 2', desc: 'test 2', date: '2022-06-25', prior: 'priority-high'},
    {title: 'test 3', desc: 'test 3', date: '2022-05-23', prior: 'priority-low'},
    {title: 'test 4', desc: 'test 4', date: '2022-05-28', prior: 'priority-medium'}
]

UI.displayTasks(arrayOfObjects);


