const projectForm = `
        <form class="create-new">
            <div class="create-new--header">Create a new project<div id="close-form-btn"></div></div>
            <div class="create-new--content">
                <label for="new-project--name">Project Name:</label>
                <input type="text" id="new-project--name" name="new-project" required>
                <label for="new-project--desc">Details:</label>
                <textarea id="new-project--desc" name="new-project" maxlength="80"></textarea>
                <div class="wrap-priority-submit">
                    <div>
                        <label for="new-project--color">Color:</label>
                        <input type="color" id="new-project--color" name="new-project" required>
                    </div>
                    <button>Create</button>
                </div>
            </div>
        </form>
`;

export {projectForm};