import { v4 as uuidv4 } from 'uuid';

export const projectFactory = (title, color) => {

    const id = uuidv4();

    const getId = () => id;
    const getTitle = () => title;
    const setTitle = (newTitle) => title = newTitle;
    const getColor = () => color;
    const setColor = (newColor) => color = newColor;

    return {
        id, title, color, getId, getTitle, setTitle, getColor, setColor
    }
}