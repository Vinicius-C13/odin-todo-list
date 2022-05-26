const taskForm = `
    <form class="create-new">
        <div class="create-new--header">Create a new task<div id="close-form-btn"></div></div>
        <div class="create-new--content">
            <textarea class="create-new_input" id="new-todo--title" name="new-todo" placeholder="Title: Create a title" required></textarea>
            <textarea class="create-new_input" id="new-todo--description" name="new-todo" placeholder="Details: Add a description" required></textarea>
            <div class="create-new_date">
                <label for="new-todo--date">Due Date:</label>
                <input type="date" id="new-todo--date" name="new-todo" required>
            </div>
            <div class="wrap-priority-submit">
                <div class="new-todo--priority">
                    <div class="todo-prior-label">Priority:</div>
                    <label class="radio-label radio-label-low" for="low"><span class="low">low</span>
                        <input type="radio" id="low" name="new-todo--prior" value="priority-low" required>
                    </label>
                    <label class="radio-label radio-label-medium" for="medium"><span class="medium">medium</span>
                        <input type="radio" id="medium" name="new-todo--prior" value="priority-medium" required>
                    </label>
                    <label class="radio-label radio-label-high" for="high"><span class="high">high</span>
                        <input type="radio" id="high" name="new-todo--prior" value="priority-high" required>
                    </label>
                </div>
                <button>Create</button>
            </div>
        </div>
    </form>
`;

export {taskForm};