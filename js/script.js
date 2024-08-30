
const searchListForm = document.querySelector('form.searchNList');
const addListForm = document.querySelector('form.addForm');
const tasks = document.querySelector('ul.list');
const tasksCounter = document.querySelector('.tasksCounter');
const cancelBtn = document.querySelector('.fa-xmark');
const clearAll = document.querySelector('.clearAll');
const search = searchListForm.buscar;

// Add new List

addListForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newTask = addListForm.addNew.value;
    if (newTask != '') {
        tasks.innerHTML += `<li>
                            <span>${newTask}</span>
                            <i class="fa-solid fa-trash"></i>
                        </li>`
    }
    addListForm.reset();
    countTasks();
});

// Delete a List

tasks.addEventListener('click',(e)=>{
    console.log(e.target);
    if(e.target.classList.contains('fa-trash')){
        e.target.parentElement.remove();
        countTasks();
    }
});

// Tasks Counter

const countTasks = ()=>{
    const tasksLength = Array.from(tasks.children).length;
    tasksCounter.innerText = `You have ${tasksLength} pending tasks.`
}

// ClearAll Button

clearAll.addEventListener('click', ()=>{
    const tasksElements = tasks.querySelectorAll('li');
    tasksElements.forEach(li=> li.remove());                 
});

// Search Filter

const searchFilter = (userInput)=>{
    Array.from(tasks.children).
              filter((task)=> {return !task.textContent.toLocaleLowerCase().includes(userInput)}).
              forEach(task=> task.classList.add('hide'));
    Array.from(tasks.children).
              filter((task)=> {return task.textContent.toLocaleLowerCase().includes(userInput)}).
              forEach(task=> task.classList.remove('hide'));
}


search.addEventListener('keyup', (e)=>{
    const userInput = e.target.value.trim().toLowerCase();
    searchFilter(userInput);
});

// Cancel Button

cancelBtn.addEventListener('click', (e)=>{
    searchListForm.reset();
    const userInput = search.value;
    searchFilter(userInput);
})