(function (){
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    const todos = savedTodos.map(function(todo){
        if(typeof todo === "string"){
            return {text: todo, completed: false};
        }
        return todo;
    });
    const todoContainer = document.getElementById("todo");
    const inputTask = document.createElement("input");
    inputTask.placeholder="Enter task here...";
    inputTask.type="text";
    const addBtn = document.createElement("button");
    addBtn.textContent = "ADD";
    const searchTask = document.createElement("input");
    searchTask.placeholder="Search task...";
    searchTask.type="text";
    const todolist = document.createElement("div");
    todolist.style.border="2px solid black";
    todoContainer.append(inputTask, addBtn, searchTask, todolist);

    function savetodos(){
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    function showtasks(){
        const searchedvalue = searchTask.value.toLowerCase();
        todolist.innerHTML="";

        const filteredtasks = todos.filter(function(todo){
            return todo.text.toLowerCase().includes(searchedvalue);
        });

        if(filteredtasks.length === 0){
            const emptyText = document.createElement("p");
            emptyText.textContent = "Empty list";
            todolist.append(emptyText);
            return;
        }

        filteredtasks.slice().reverse().forEach(rendertask);
    }

    function rendertask(todo){
        const todoitem = document.createElement("div");
        todoitem.style.border=todo.completed ? "2px solid green" : "2px solid red";
        todoitem.style.margin="10px";
        todoitem.style.padding="10px";
        const p = document.createElement("p");
        p.textContent=todo.text;
        const deletebtn = document.createElement("button");
        const editbtn = document.createElement("button");
        const completebtn = document.createElement("button");
        deletebtn.textContent="Delete";
        editbtn.textContent="Edit";
        completebtn.textContent="Complete";
        editbtn.addEventListener("click", function(){
            if(todoitem.querySelector("input")){
                return;
            }
            const editinput = document.createElement("input");
            editinput.value=todo.text;
            const savebtn = document.createElement("button");
            savebtn.textContent="Save";
            todoitem.prepend(editinput, savebtn);
            editinput.focus();
            savebtn.addEventListener("click", function(){
                const updatedtask = editinput.value.trim();
                if(!updatedtask){
                    return;
                }
                p.textContent=updatedtask;
                todo.text=updatedtask;
                savetodos();
                showtasks();
            })
        })
        completebtn.addEventListener("click", function(){
            todo.completed=true;
            savetodos();
            showtasks();

        })

        deletebtn.addEventListener("click", function(){
            const index = todos.indexOf(todo);
            todos.splice(index, 1);
            savetodos();
            showtasks();
        })
        todoitem.append(p, deletebtn, editbtn);
        if(!todo.completed){
            todoitem.append(completebtn);
        }
        todolist.prepend(todoitem);

        

    }


    function addtodo(){
        const task=inputTask.value.trim();
        if(!task){
            return;
        }
        const todo = {text: task, completed: false};
        todos.unshift(todo);
        savetodos();
        showtasks();
        inputTask.value="";
        inputTask.focus();
    }
    addBtn.addEventListener("click", addtodo);
    inputTask.addEventListener("keydown", function(e){
        if(e.key=='Enter'){
            addtodo();
        }
    })
    searchTask.addEventListener("input", showtasks);
    showtasks();
})();
