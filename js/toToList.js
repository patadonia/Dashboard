const wrapper = document.getElementById('tasks');
const input = document.getElementById('input');

let tasks = [];

if(localStorage.getItem('tasks_array')) tasks = JSON.parse(localStorage.getItem('tasks_array'));

function renderTasks() {
    wrapper.innerHTML = '';
    tasks.forEach((task, i) => {
        const article = document.createElement('article');
        article.classList.add('task');

        const number = document.createElement('h2');
        number.classList.add('number');
        number.innerHTML = `${i + 1}.`;
        article.appendChild(number);

        const text = document.createElement('h3');
        text.classList.add('text');
        text.innerHTML = task;
        article.appendChild(text);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('taskDelete');
        deleteBtn.addEventListener('click', () => {
            tasks = tasks.filter((v, index) => index !== i);
            localStorage.setItem('tasks_array', JSON.stringify(tasks));
            renderTasks();
        });
        article.appendChild(deleteBtn);
        wrapper.appendChild(article);
    });
}

input.addEventListener('keydown', (e) => {
    if(e.key !== 'Enter' || input.value === '') return;
    tasks.push(input.value);
    input.value = '';
    localStorage.setItem('tasks_array', JSON.stringify(tasks));
    renderTasks();
});

renderTasks();