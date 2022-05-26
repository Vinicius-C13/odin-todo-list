const projectForm = `
    <form class="create-new" id="project-form">
        <div class="create-new--header">Create a new project<div id="close-form-btn"></div></div>
        <div class="create-new--content">
                <label for="new-todo--date">Project Name</label>
                <input type="text" id="new-project--name" name="new-project" required>
            </div>
            <div class="wrap-priority-submit">
                <button>Create</button>
            </div>
        </div>
    </form>
`;

export {projectForm};