import {projectForm} from './form/project-form.js';
import {taskForm} from './form/task-form.js';

//Factory Functions
const projectFactory = (name, color, details) => {
    const relatedTasks = [];
    return {name, color, details, relatedTasks};
}

const taskFactory = (title, desc, date, prior, projectID) => {
    return {title, desc, date, prior, projectID};
}


const Store = (() => {

    const getProjects = () => {
        let projects = localStorage.getItem('projects') !== null ? JSON.parse(localStorage.getItem('projects')) : [{name: "All tasks", color: "#5d9963", details: "Find all tasks here", relatedTasks:Store.getTasks()}];
        return projects;
    }

    const addProject = (project) => {
        const projects = getProjects();
        projects.push(project);
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    const deleteProject = (project) => {
        const projects = getProjects();
        projects.splice(_projectFindIndex(project), 1);
        _deleteRelatedTasks(project.name);
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    const getTasks = () => {
        let tasks = localStorage.getItem('tasks') !== null ? JSON.parse(localStorage.getItem('tasks')) : [];
        return tasks;
    }

    const addTask = (task) => {
        const tasks = getTasks();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    const deleteTask = (task) => {
        const tasks = getTasks();
        tasks.splice(_taskFindIndex(task), 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    const getDoneTasks = () => {
        let doneTasks = localStorage.getItem('done tasks') !== null ? JSON.parse(localStorage.getItem('done tasks')) : [];
        return doneTasks;
    }

    const addDoneTask = (task) => {
        const doneTasks = getDoneTasks();
        doneTasks.push(task);
        localStorage.setItem('done tasks', JSON.stringify(doneTasks));
    }

    const deleteDoneTask = (task) => {
        const doneTasks = getDoneTasks();
        doneTasks.splice(_doneFindIndex(task), 1);
        localStorage.setItem('done tasks', JSON.stringify(doneTasks));
    }

    const changeToDoneList = (task) => {
        deleteTask(task);
        addDoneTask(task);
    }

    const changeToAllTasksList = (task) => {
        deleteDoneTask(task);
        addTask(task);
    }

    const _taskFindIndex = (taskObj) => {
        const tasks_array = Store.getTasks();
        let titles = tasks_array.map(task => task.title);
        let index = titles.findIndex(title => title == taskObj.title);
        return index;
    }

    const _projectFindIndex = (projectObj) => {
        const projects_array = Store.getProjects();
        let names = projects_array.map(project => project.name);
        let index = names.findIndex(name => name == projectObj.name);
        return index;
    }

    const _doneFindIndex = (taskObj) => {
        const doneTasks_array = Store.getDoneTasks();
        let titles = doneTasks_array.map(task => task.title);
        let index = titles.findIndex(title => title == taskObj.title);
        return index;
    }

    const _deleteRelatedTasks = (projectName) => {
        const tasks = getTasks();
        tasks.forEach(task => {
            if(task.projectID == projectName) {
                deleteTask(task);
            }
        } )
        UI.displayProjectList(getProjects()[0], Logic.filterTasks(getProjects()[0]));
    }

    return {getTasks, addTask, deleteTask, getProjects, addProject, getDoneTasks, addDoneTask, deleteDoneTask, changeToDoneList, changeToAllTasksList, deleteProject};
})();


const doneTasks_array = [];
const todayTasks_array = [];
//const allProjects_array = [{name: "All tasks", color: "#5d9963", details: "Find all tasks here", relatedTasks:Store.getTasks()}];



//Handles Logic
const Logic = (() => {
    const createNewProject = (name, color, details) => {
        const newProject = projectFactory(name, color, details);
        const parentEl = document.querySelector('.projects-list');

        UI.displayElement(newProject, parentEl);

        if(name==="All tasks") {return}

        _addProjectToArray(newProject);
    }

    const _addProjectToArray = (project) => {
        Store.addProject(project);
    }

    const filterTasks = (project) => {

        if(project.name === "All tasks") {
            return Store.getTasks();
        }

        const filteredTasks_array = Store.getTasks().filter((task)=>{
            if(task.status !== 1) {return task.projectID === project.name};
        });
        return filteredTasks_array;
    }

    const filterTodayTasks = () => {
        const todayTasks_array = Store.getTasks().filter((task)=>{
            if(task.status !== -1) {return task.date === getCurrentDate().currentDate};
        });
        return todayTasks_array;
    }

    const deleteTask = (taskElement, taskObject)=> {
        Store.deleteTask(taskObject);
        UI.removeTaskFromDisplay(taskElement);
    }

    const checkTask = (taskEl, taskObj) => {
        Store.changeToDoneList(taskObj);
        UI.removeTaskFromDisplay(taskEl);
    }

    const uncheckTask = (taskEl, taskObj) => {
        Store.changeToAllTasksList(taskObj);
        UI.removeTaskFromDisplay(taskEl);
    }

    const getCurrentDate = () => {
        const data = new Date();

        const day = String(data.getDate()).padStart(2, '0');
        const month = String(data.getMonth() + 1).padStart(2, '0');
        const year = String(data.getFullYear());
        const dayOfWeek = data.getDay();

        const currentDate = `${year}-${month}-${day}`

        return {dayOfWeek, day, month, year, currentDate};
    }

    const getReadableDate = () => {

        const getDayOfWeek = () => {

            let dayOfWeek = '';

            switch(getCurrentDate().dayOfWeek){
                case 0: dayOfWeek = 'Sunday'; break;
                case 1: dayOfWeek = 'Monday'; break;
                case 2: dayOfWeek = 'Tuesday'; break;
                case 3: dayOfWeek = 'Wednesday'; break;
                case 4: dayOfWeek = 'Thursday'; break;
                case 5: dayOfWeek = 'Friday'; break;   
                case 6: dayOfWeek = 'Saturday'; break;     
            };

            return dayOfWeek;
        };

        const getMonthName = () => {

            let monthName = '';

            switch(getCurrentDate().month){
                case '01': monthName = 'Jan'; break;
                case '02': monthName = 'Feb'; break;
                case '03': monthName = 'Mar'; break;
                case '04': monthName = 'Apr'; break;
                case '05': monthName = 'May'; break;   
                case '06': monthName = 'Jun'; break;
                case '07': monthName = 'Jul'; break;
                case '08': monthName = 'Aug'; break;
                case '09': monthName = 'Sep'; break;
                case '10': monthName = 'Oct'; break;
                case '11': monthName = 'Nov'; break;
                case '12': monthName = 'Dec'; break;    
            }
            return monthName
        }
            return `${getDayOfWeek()}, ${getCurrentDate().day} ${getMonthName()} ${getCurrentDate().year}`;
    }

    return {createNewProject, filterTasks, deleteTask, checkTask, uncheckTask, getCurrentDate, filterTodayTasks, getReadableDate}
})();


//Handles UI
const UI = (() => {

    const openForm = (type, project) => {
        if (type === 'project') {
            const overlay = document.querySelector('#overlay-project');
            overlay.classList.add('show-overlay');
            overlay.innerHTML = projectForm;
        } else if (type === 'task') {
            const overlay = document.querySelector('#overlay-task');
            overlay.classList.add('show-overlay');
            overlay.innerHTML = taskForm;
            overlay.relatedProject = project;
        }
    };

    const closeForm = (type) => {
        if (type === 'project') {
            const overlay = document.querySelector('#overlay-project');
            overlay.classList.remove('show-overlay');
            overlay.innerHTML = "";
        } else if (type === 'task') {
            const overlay = document.querySelector('#overlay-task');
            overlay.classList.remove('show-overlay');
            overlay.innerHTML = "";
        }
    };

    const _createProjectElement = (project) => {
        const projectEl = document.createElement('li');
        projectEl.classList.add('project-item', 'btn-pointer')
        projectEl.obj_ID = project;
        projectEl.innerHTML = `<div class= "project-color" style="background: ${project.color}"></div>${project.name}<div class="delete-project-btn"></div>`;
        return projectEl
    };

    const displayElement = (project, parent)=> {
        parent.appendChild(_createProjectElement(project));
    };

    const displayProjectList = (project, array, status) => {
        const title = document.querySelector('.chosen-list-title');
        const details = document.querySelector('.project-details');
        title.textContent = project.name;
        details.textContent = project.details;
        _displayOnlyAddTaskButton(project, status);
        _displayFilteredTasks(array, status);
    };

    //Start: Controls tasks
    const _displayFilteredTasks = (array, status)=> {
        array.forEach(task=>{
            addTaskToList(task, status);
        });
    };

    const addTaskToList = (task, status)=> {
        const taskContainer = document.querySelector('#main');

        const task_div = document.createElement('div');

        if(status === undefined) {task_div.classList.add('task-item', task.prior);
        } else {task_div.classList.add('task-item', task.prior, status)};

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
    };

    const _clearTaskDisplay = () => {
        document.querySelector('#main').innerHTML = '';
    };

    const _displayOnlyAddTaskButton = (project, status) => {
        _clearTaskDisplay();
        if(status === undefined){
            const add_button = document.createElement('div');
            add_button.classList.add('new-task-card', 'btn-pointer')
            add_button.innerHTML = `<img class="new-task-btn" src="./assets/add.png" alt="plus icon">Add a Task`;
            add_button.relatedProject = project;
            document.querySelector('#main').appendChild(add_button);
        };
    };

    const removeTaskFromDisplay = (element) => {
        const taskContainer = document.querySelector('#main');
        taskContainer.removeChild(element);
    };

    const removeProjectFromDisplay = (element) => {
        const projectsContainer = document.querySelector('.projects-list');
        projectsContainer.removeChild(element);
    }

    //Finish: Controls tasks
    return {openForm, closeForm, displayElement, displayProjectList, addTaskToList, removeTaskFromDisplay, removeProjectFromDisplay}
})();


//Events tab

//Event: Create a new project
document.querySelector('#overlay-project').addEventListener('submit', (e)=>{
    e.preventDefault();

    const projectName = document.querySelector('#new-project--name').value;
    const projectColor = document.querySelector('#new-project--color').value;
    const projectDetails = document.querySelector('#new-project--desc').value;

    Logic.createNewProject(projectName, projectColor, projectDetails);

    UI.closeForm('project');
});

//Event: Create a new task
document.querySelector('#overlay-task').addEventListener("submit", (e)=>{
    e.preventDefault();

    const relatedProject = document.querySelector('#overlay-task').relatedProject;

    const title = document.querySelector('#new-todo--title').value;
    const desc = document.querySelector('#new-todo--description').value;
    const date = document.querySelector('#new-todo--date').value;
    const prior = document.querySelector('input[type="radio"]:checked').value;
    const projectID = relatedProject.name;

    const newTask = taskFactory(title, desc, date, prior, projectID);

    UI.addTaskToList(newTask);
    Store.addTask(newTask);
    UI.closeForm('task');
})

//Event: Display everything necessarty when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    //Display all existing projects
    Store.getProjects().forEach((project)=>{
        UI.displayElement(project, document.querySelector('.projects-list'))
    })
    //Open the page with the "All tasks" selected
    UI.displayProjectList(Store.getProjects()[0], Logic.filterTasks(Store.getProjects()[0]));
});

//Event: Open project form
document.querySelector('.new-list-btn').addEventListener('click', () => {
    UI.openForm('project');
});

//Event: Close project form
document.querySelector('#overlay-project').addEventListener('click', (e) => {
    if(e.target.id === 'close-form-btn'){
        UI.closeForm('project');
    }
});

//Event: Close task form
document.querySelector('#overlay-task').addEventListener('click', (e) => {
    if(e.target.id === 'close-form-btn'){
        UI.closeForm('task');
    }
});

//Event: Open task form
document.addEventListener('click', (e) => {
    if(e.target.classList.contains('new-task-card')) {
        UI.openForm('task', e.target.relatedProject);
    }
});

//Event: Open the project list of tasks
document.querySelector('.projects-list').addEventListener('click', (e) => {
    if(e.target.classList.contains('project-item')) {
        UI.displayProjectList(e.target.obj_ID, Logic.filterTasks(e.target.obj_ID));
    };
});

//Event: Open list of done tasks
document.querySelector('#done-tasks').addEventListener('click', () => {
    UI.displayProjectList({name: "Done tasks", details: "All done tasks", color: "#5d9963"}, Store.getDoneTasks(), 'done-task');
});

//Event: Open list of today tasks
document.querySelector('#my-day-tasks').addEventListener('click', () => {
    UI.displayProjectList({name: "Today tasks", details: Logic.getReadableDate(), color: "#5d9963"}, Logic.filterTodayTasks(), 'today-task');
});


//Event: Delete a task
document.addEventListener('click', (e) => {
    if(e.target.classList.contains('delete-btn')){
        if(e.target.parentElement.classList.contains('done-task')) {
            UI.removeTaskFromDisplay(e.target.parentElement);
            Store.deleteDoneTask(e.target.parentElement.objectAssign);
        } else {
            UI.removeTaskFromDisplay(e.target.parentElement);
            Store.deleteTask(e.target.parentElement.objectAssign);
        }
    }
})

//Event: Delete a project
document.addEventListener('click', (e) => {
    if(e.target.classList.contains('delete-project-btn')) {
        UI.removeProjectFromDisplay(e.target.parentElement);
        Store.deleteProject(e.target.parentElement.obj_ID);
    }
})

//Check a task
document.addEventListener('click', (e) => {
    if(e.target.classList.contains('check-btn')){
        if(e.target.parentElement.classList.contains('done-task')){
            Logic.uncheckTask(e.target.parentNode, e.target.parentNode.objectAssign);
        } else {Logic.checkTask(e.target.parentNode, e.target.parentNode.objectAssign);}
    }
});