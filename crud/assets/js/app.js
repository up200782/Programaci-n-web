import { deleteTask, createTask, getAllUsers, getTaskUsingUserID, getTask, updateTask } from "./petitions.js";

const listUsers = document.getElementById('users');
const taskTable = document.getElementById('tasks');
const taskForm = document.getElementById('form-task');
const formTitle = document.getElementById('form-title');
const completedCheckbox = document.getElementById('completed');
const submitButton = document.getElementById('insert');
let pressedButtonId;

document.addEventListener('DOMContentLoaded', async () => {
    const allUsers = await getAllUsers();

    let template = listUsers.innerHTML;
    for (const user of allUsers) {
        template += `<option value="${user.id}">${user.fullname}</option>`;
    }

    listUsers.innerHTML = template;
});

listUsers.addEventListener('change', async () => {
    const userTasks = await getTaskUsingUserID(listUsers.value);

    let template = "";
    const tableBody = taskTable.children[1];
    for (const task of userTasks) {
        const taskCompleted = task.completed ? "Completada" : "No completada";
        template += `
            <tr id="tablerow${task.id}">
                <td>${task.id}</td>
                <td>${task.firstname}</td>
                <td>${task.title}</td>
                <td>${taskCompleted}</td>
                <td>
                    <button class="btn btn-info btn-sm updateBtn" id="updateBtn${task.id}">
                        <span>Update</span> <i class="nf nf-md-pencil"></i>
                    </button>
                    <button class="btn btn-danger btn-sm deleteBtn" id="deleteBtn${task.id}">
                        <span>Delete</span> <i class="nf nf-cod-trash"></i>
                    </button>
                </td>
            </tr>`;
    }
    tableBody.innerHTML = template;

    addDeleteButtonEvents();
    addUpdateButtonEvents();
    submitButton.innerText = "SAVE";
    formTitle.innerText = "Insert Task";
    submitButton.setAttribute("id", "insert");
    taskForm.children[0].children[0].value = ""; // TITULO
});

taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(taskForm);
    const completedValue = completedCheckbox.checked ? 1 : 0;
    formData.append('completed', completedValue);

    if (submitButton.id === 'insert') {
        try {
            const response = await createTask(formData);
            if (response.success) {
                const taskInfo = await getTask(response.taskId);
                const newRow = document.createElement('tr');
                newRow.setAttribute("id", `tablerow${taskInfo.id}`);
                const taskCompleted = taskInfo.completed ? "Completada" : "No completada";
                newRow.innerHTML = `
                    <td>${taskInfo.id}</td>
                    <td>${taskInfo.firstname}</td>
                    <td>${taskInfo.title}</td>
                    <td>${taskCompleted}</td>
                    <td>
                        <button class="btn btn-info btn-sm updateBtn" id="updateBtn${taskInfo.id}">
                            <span>Update</span> <i class="nf nf-md-pencil"></i>
                        </button>
                        <button class="btn btn-danger btn-sm deleteBtn" id="deleteBtn${taskInfo.id}">
                            <span>Delete</span> <i class="nf nf-cod-trash"></i>
                        </button>
                    </td>`;
                taskTable.children[1].appendChild(newRow);
                addUpdateButtonEvents();
                taskForm.children[0].children[0].value = ""; // TITULO
            } else {
                console.error('Failed to create task');
            }
        } catch (error) {
            console.error('Error in INSERTING:', error);
        }
    }

    if (submitButton.id === 'update') {
        try {
            const response = await updateTask(formData, pressedButtonId);
            if (response.success) {
                const rowToUpdate = document.getElementById(`tablerow${pressedButtonId}`);
                const taskInfo = await getTask(pressedButtonId);
                const taskCompleted = taskInfo.completed ? "Completada" : "No completada";
                rowToUpdate.innerHTML = `
                    <td>${pressedButtonId}</td>
                    <td>${taskInfo.firstname}</td>
                    <td>${taskInfo.title}</td>
                    <td>${taskCompleted}</td>
                    <td>
                        <button class="btn btn-info btn-sm updateBtn" id="updateBtn${taskInfo.id}">
                            <span>Update</span> <i class="nf nf-md-pencil"></i>
                        </button>
                        <button class="btn btn-danger btn-sm deleteBtn" id="deleteBtn${taskInfo.id}">
                            <span>Delete</span> <i class="nf nf-cod-trash"></i>
                        </button>
                    </td>`;
                formTitle.innerText = "Insert Task";
                submitButton.innerText = "SAVE";
                submitButton.setAttribute("id", "insert");
                taskForm.children[0].children[0].value = ""; // TITULO
            } else {
                console.error("Response unsuccessful, failed to update task")
            }
        } catch (error) {
            console.error('Error in UPDATING:', error);
        }
    }

    addDeleteButtonEvents();
    addUpdateButtonEvents();
});

function addUpdateButtonEvents() {
    const updateButtons = document.querySelectorAll('.updateBtn');
    updateButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            e.preventDefault();
            pressedButtonId = button.id.replace('updateBtn', '');
            const taskInfo = await getTask(pressedButtonId);
            const taskCheck = taskInfo.completed ? 'true' : '';
            taskForm.children[0].children[0].value = `${taskInfo.title}`; // NOMBRE DE TAREA
            formTitle.innerText = "Modify Task"; // TITULO FORMULARIO
            taskForm.children[2].children[0].checked = taskCheck; // COMPLETO
            submitButton.innerText = "UPDATE";
            submitButton.setAttribute("id", "update");
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
};

function addDeleteButtonEvents() {
    const deleteButtons = document.querySelectorAll('.deleteBtn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const taskId = button.id.replace('deleteBtn', '');
            const row = document.getElementById(`tablerow${taskId}`);
            row.remove();
            await deleteTask(taskId);
        });
    });
}
