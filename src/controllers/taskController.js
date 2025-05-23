import { taskFactory } from '../factories/taskFactory.js';

export const taskController = () => {
    const tasksList = [];

    const addTask = (id, title, description, dueDate, priority, projectId) => {
        if(id === "") {
            const task = taskFactory(title, description, dueDate, priority, projectId);
            tasksList.push(task);
            return;
        }
        const task = getTaskById(id);
        task.setTitle(title);
        task.setDescription(description);
        task.setDueDate(dueDate);
        task.setPriority(priority);
        task.setProjectId(projectId);
    }

    const getTasksList = () => tasksList;

    const getTaskById = (taskId) =>
        tasksList.find(task => task.getId()  === taskId);

    const getTasksByProjectId = (projId) =>
        tasksList.filter(task => task.getProjectId() === projId)

    const deleteTask = (taskId) => {
        const taskIndex = tasksList.findIndex(task => task.getId() === taskId);
        tasksList.splice(taskIndex, 1);
    }

    return {
        addTask, getTasksList,getTaskById, getTasksByProjectId, deleteTask
    }

}