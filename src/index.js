//Factory function of new tasks
const taskFactory = (title, desc, date, prior) => {
    return {title, desc, date, prior}
}

const generalTasksArray = [

]

const Logic = (() =>{

    const getCurrentDate = () => {
        const data = new Date();
        
        const day = String(data.getDate()).padStart(2, '0');
        const month = String(data.getMonth() + 1).padStart(2, '0');
        const year = String(data.getFullYear());
        const dayOfWeek = data.getDay();

        const currentDate = `${year}-${month}-${day}`

        return {dayOfWeek, day, month, year, currentDate}
    }

    const getReadableDate = () => {
        
        const getDayOfWeek = () => {
            
            let dayOfWeek = '';

            switch(getCurrentDate().dayOfWeek){
                case 0:
                    dayOfWeek = 'Sunday';
                    break;
                case 1:
                    dayOfWeek = 'Monday';
                    break;
                case 2:
                    dayOfWeek = 'Tuesday';
                    break;
                case 3:
                    dayOfWeek = 'Wednesday';
                    break;
                case 4:
                    dayOfWeek = 'Thursday';
                    break;
                case 5:
                    dayOfWeek = 'Friday';
                    break;   
                case 6:
                    dayOfWeek = 'Saturday';
                    break;     
            }

            return {dayOfWeek}
        }

        const getMonthName = () => {
            
            let monthName = '';

            switch(getCurrentDate().month){
                case '01':
                    monthName = 'Jan';
                    break;
                case '02':
                    monthName = 'Feb';
                    break;
                case '03':
                    monthName = 'Mar';
                    break;
                case '04':
                    monthName = 'Apr';
                    break;
                case '05':
                    monthName = 'May';
                    break;   
                case '06':
                    monthName = 'Jun';
                    break;
                case '07':
                    monthName = 'Jul';
                    break;
                case '08':
                    monthName = 'Aug';
                    break;
                case '09':
                    monthName = 'Sep';
                    break;
                case '10':
                    monthName = 'Oct';
                    break;
                case '11':
                    monthName = 'Nov';
                    break;
                case '12':
                    monthName = 'Dec';
                    break;    
            }
            return {monthName}
        }

            const weekDayMonthDate = `${getDayOfWeek().dayOfWeek}, ${getCurrentDate().day} ${getMonthName().monthName} ${getCurrentDate().year}`

            return weekDayMonthDate
    }

    return {getCurrentDate, getReadableDate}
})()

//UI module: Handles UI
const UI = (() => {

    const displayTasks = (tasksArray)=> {
        tasksArray.forEach(task=>{
            addTaskToList(task);
            storeTask(task);
        });
    };

    const displayFilteredTasks = (tasksArray)=> {
        tasksArray.forEach(task=>{
            addTaskToList(task);
        });
    };

    const storeTask = (task) => {
        generalTasksArray.push(task)
    }

    const addTaskToList = (task)=> {
        const taskContainer = document.querySelector('#main');

        const task_div = document.createElement('div');

        task_div.classList.add('task-item', task.prior);

        task_div.innerHTML = `
            <div class="check-btn btn-pointer"></div>
            <div class="main-task-infos">
                <div class="task-title">${task.title}</div>
                <div class="details">${task.desc}</div>
            </div>
            <div class="date">${task.date}</div>
            <div class="delete-btn btn-pointer"></div>
        `
        //Eu associei um objeto à um elemento html. Isso vai permitir que eu retire o objeto da array e o elemento do DOM.
        task_div.objectAssign = task;

        taskContainer.prepend(task_div);
    }

    const clearTaskDisplay = () => {
        document.querySelector('#main').innerHTML = `
            <div class="new-task-card btn-pointer">
                <img class="new-task-btn" src="./assets/add.png" alt="plus icon">
                Add a Task
            </div>`;
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

    const displayCurrentDate = (() => {
        const dateField = document.querySelector('.actual-date');
        dateField.textContent = Logic.getReadableDate();
    })();

    const displayListTitle = (title) => {
        const titleField = document.querySelector('.chosen-list-title');
        titleField.textContent = title;
    }
    
    const filterAllTasks = () => {
        clearTaskDisplay();
        displayFilteredTasks(generalTasksArray);
    }

    const filterTodayTasks = () => {
        const todayTasks = generalTasksArray.filter((el)=>{
            return el.date === Logic.getCurrentDate().currentDate;
        });
        clearTaskDisplay();
        displayFilteredTasks(todayTasks);
    }

    return {openTaskForm, closeTaskForm, addTaskToList, displayTasks, deleteTask, filterTodayTasks, clearTaskDisplay, storeTask, displayListTitle, filterAllTasks}
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
    UI.storeTask(newTask);
    UI.closeTaskForm();

})

document.querySelectorAll('.task-item').forEach((item) => {
    item.addEventListener('click', (e)=>{console.log(e)})
});

//Event: Open form
//document.querySelector('.new-task-card').addEventListener('click', ()=>UI.openTaskForm());

document.addEventListener('click', (e) => {
    if(e.target.classList.contains('new-task-card') || e.target.classList.contains('new-task-btn')) {
        UI.openTaskForm();
    }
});

//Event: Close form
document.querySelector('#close-form-btn').addEventListener('click', ()=>UI.closeTaskForm());

//Event: delete task
document.addEventListener('click', (e)=>{
    if(e.target.classList.contains('delete-btn')){
        UI.deleteTask(e.target.parentNode, e.target.parentNode.objectAssign);
    }
})

//Event: add a new list
document.querySelector('.new-list-btn').addEventListener('click', (e)=> {
    
});

//Event: Select today tasks
document.querySelector('#my-day-tasks').addEventListener('click', () => {
    UI.filterTodayTasks();
    UI.displayListTitle('My day');
});

//Events: Select all tasks
document.querySelector('#all-tasks').addEventListener('click', () => {
    UI.filterAllTasks();
    UI.displayListTitle('All tasks');
});

document.addEventListener('DOMContentLoaded', ()=>UI.displayListTitle('All tasks'));

//Event: Create new Project List

const arrayOfObjects = [
    {title: 'test 1', desc: 'test 1', date: '2022-05-24', prior: 'priority-low'},
    {title: 'test 2', desc: 'test 2', date: '2022-06-25', prior: 'priority-high'},
    {title: 'test 3', desc: 'test 3', date: '2022-05-24', prior: 'priority-low'},
    {title: 'test 4', desc: 'test 4', date: '2022-05-28', prior: 'priority-medium'}
];

UI.displayTasks(arrayOfObjects);