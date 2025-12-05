const taskInput = document.getElementById("taskInput")
const addbtn = document.getElementById("addBtn")
const taskList = document.getElementById("taskList")
addBtn.addEventListener("click", function () {
    const taskText = taskInput.value;
    console.log(taskText);

    // 3) Send to backend
    fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ task: taskText })
    }).then(() => {
        loadTasks();         //  refresh UI immediately
        taskInput.value = ""; // optional: clean input
    });

});
function loadTasks() {
    // 1) Get tasks from backend
    fetch("http://localhost:3000/tasks")
        .then(res => res.json())
        .then(data => {
            taskList.innerHTML = "";
            data.forEach((task, index) => {
                const li = document.createElement("li");
                li.className = "flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition transform duration-300 opacity-0 translate-y-3";

                const span = document.createElement("span");
                span.textContent = task;
                li.appendChild(span);
                const delBtn = document.createElement("button");
                delBtn.textContent = "X";
                delBtn.className = "text-red-500 hover:text-red-700 font-bold ml-3 transition transform hover:scale-125";
                li.appendChild(delBtn);
                delBtn.addEventListener("click", function () {
                    fetch(`http://localhost:3000/tasks/${index}`, {
                        method: "DELETE"
                    })
                        .then(() => loadTasks());

                });
                taskList.appendChild(li);
                setTimeout(() => {
                    li.classList.remove("opacity-0", "translate-y-3");
                }, 10);



            });
            //console.log(data); // test
        });
}
loadTasks();


