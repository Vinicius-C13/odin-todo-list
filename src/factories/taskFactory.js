import { v4 as uuidv4 } from 'uuid';

export const taskFactory = (title, description, dueDate, priority, projectId) => {

    const id = uuidv4();

    const getId = () => id;
    const getTitle = () => title;
    const setTitle = (newTitle) => title = newTitle;
    const getDescription = () => description;
    const setDescription = (newDescription) => description = newDescription;
    const getDueDate = () => dueDate
    const setDueDate = (newDueDate) => dueDate = newDueDate;
    const getPriority = () => priority;
    const setPriority = (newPriority) => priority = newPriority;
    const getProjectId = () => projectId;
    const setProjectId = (newProjectId) => projectId = newProjectId;


    return {
        id, title, description, dueDate, priority, projectId, getId,
        getTitle, setTitle, getDescription, setDescription, getDueDate,
        setDueDate, getPriority, setPriority, getProjectId, setProjectId,
    }
}