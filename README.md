# odin-todo-list

Nature Background: <a href='https://www.freepik.com/psd/leaf-wallpaper'>Leaf wallpaper psd created by denamorado - www.freepik.com</a>

Double check logo: <a href="https://www.flaticon.com/free-icons/seen" title="seen icons">Seen icons created by Freepik - Flaticon</a>

Sun icon: <a href="https://www.flaticon.com/free-icons/sun" title="sun icons">Sun icons created by kosonicon - Flaticon</a>

Week icon: <a href="https://www.flaticon.com/free-icons/calendar" title="calendar icons">Calendar icons created by Sagarkumar Gopani - Flaticon</a>

Done icon: <a href="https://www.flaticon.com/free-icons/check" title="check icons">Check icons created by Pavel Kozlov - Flaticon</a>

Add task icon: <a href="https://www.flaticon.com/free-icons/add" title="add icons">Add icons created by Freepik - Flaticon</a>

/Factory function of new tasks
const taskFactory = (title, desc, date, prior) => {
    return {title, desc, date, prior}
}

const generalTasksArray = [

]

//Logic: Handles logic

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
            return el.date === Logic.getCurrentDate().currentDate;
        });
        clearTaskDisplay();
        displayFilteredTasks(todayTasks);
    }

    const displayListTitle = (title) => {
        document.querySelector('#chosen-list-title').textContent = title;
    }

    const displayCurrentDate = (() => {
        document.querySelector('#current-date').textContent = Logic.getReadableDate();
    })()

    return {openTaskForm, closeTaskForm, addTaskToList, displayTasks, deleteTask, filterTodayTasks, clearTaskDisplay, storeTask, displayListTitle}
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
document.querySelector('.new-list-btn').addEventListener('click', (e)=> console.log(e.target));

//Event: Select today tasks
document.querySelector('#my-day-tasks').addEventListener('click', () => {
    UI.filterTodayTasks();
    UI.displayListTitle('My day');
});

//Event: Create new Project List

const arrayOfObjects = [
    {title: 'test 1', desc: 'test 1', date: '2022-05-24', prior: 'priority-low'},
    {title: 'test 2', desc: 'test 2', date: '2022-06-25', prior: 'priority-high'},
    {title: 'test 3', desc: 'test 3', date: '2022-05-24', prior: 'priority-low'},
    {title: 'test 4', desc: 'test 4', date: '2022-05-28', prior: 'priority-medium'}
];

UI.displayTasks(arrayOfObjects);