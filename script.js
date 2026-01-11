import {Groups, tasks, MultiTasks } from "./file.js"
import {MultiTask, Task, Group, Topic} from "./data.js"
import {createDisplayChanger, newTab, setTabEnable, newTaskToggle} from "./components.js"



// Experiment:


// End Experiment;



const TabsArea  = document.querySelector(".tabber");
const leftTab = document.querySelector(".left-tab");
const rightTab = document.querySelector(".right-tab");


const columns = {
  notStarted: document.getElementById("column-notStarted"),
  inProgress: document.getElementById("column-inProgress"),
  done: document.getElementById("column-done"),
  canceled: document.getElementById("column-canceled"),
  pendent: document.getElementById("column-pendent")
}

TabsArea.addEventListener('wheel', (e) => {
  e.preventDefault(); // impede o scroll vertical da página
  TabsArea.scrollLeft += e.deltaY;
}, { passive: false });


leftTab.addEventListener('click',()=>{
  TabsArea.scrollBy({
    left: -210,
    behavior: 'smooth' 
  });

});
rightTab.addEventListener('click',()=>{
  TabsArea.scrollBy({
    left: 210,
    behavior: 'smooth' 
  });

});



const btnNewTask = document.getElementById("btnNewTask"); 




/*
3P == 3points, more options etc...
#icon = ! if has deadline, !! if near deadline, !!! pendent

|---------------------------|
| #id    #group  #icon   3P |
|---------------------------|
| #title                    |
| #partOfDescription        |
| #progress                 |
|---------------------------|


 <div class="change-task-display">

                  <svg viewBox="0 0 250 250">
                    <line class="line-change" x1="75" y1="75" x2="125" y2="125"></line>
                    <line class="line-change" x1="175" y1="75" x2="125" y2="125"></line>

                  </svg>
                </div>



*/



function eventToDisplays(binder, taskDiv, hideObjs){
    binder.addEventListener('click', (f)=>{
      binder.querySelector("svg").classList.toggle("rotateChange");
      hideObjs.desc.classList.toggle("hidden"); 
      hideObjs.percent.classList.toggle("hidden"); 
      hideObjs.progressBar.classList.toggle("hidden"); 
    });
}

function renderTasks(){
  document.querySelectorAll(".task").forEach(e=>{
    e.remove();
  });

  const statusColumn = ["notStarted","inProgress","done","canceled","pendent"] ;
  tasks.forEach(task=>{


    let choosenStatus = statusColumn[task.status];

    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");    
    taskDiv.draggable = true;

    taskDiv.classList.add(`${choosenStatus}`);    

    const header = document.createElement("div");
    header.classList.add("task-header");     

    taskDiv.appendChild(header);
    const idDiv = document.createElement("div");
    header.appendChild(idDiv);
    const id = document.createElement("h1");
    const group = document.createElement("h1");
    // const divIcon = document.createElement("div");
    id.innerText="#"+task.id_task;
    group.innerText= ` - ${Groups[task.id_group].name_group}`;
    idDiv.appendChild(id);
    header.appendChild(group);

    const displayChange = createDisplayChanger();
    header.appendChild(displayChange);
    const taskBody = document.createElement("div");
    taskBody.classList.add("task-body");      
    taskDiv.appendChild(taskBody);

    let perc = task.calculateProgress();


    const titleDateAlign = document.createElement("div");
    titleDateAlign.classList.add("titleDateAlign");
    taskBody.appendChild(titleDateAlign);


    const title = document.createElement("h1");
    const desc = document.createElement("h1");
    const date = document.createElement("h1");
    const percent = document.createElement("h1");
    title.innerText = task.name_task.slice(0, 10)+"...";
    desc.innerText = task.desc_task.slice(0, 50)+"...";
    date.innerText = task.deadLine_task.replaceAll("-","/");

    percent.innerText = "percent completed: "+Math.floor(perc*100)+"%";
    
    titleDateAlign.appendChild(title);
    titleDateAlign.appendChild(date);
    taskBody.appendChild(desc);
    taskBody.appendChild(percent);
    
    
    const progressBar = document.createElement("div");
    const progressItem = document.createElement("div");

    progressBar.classList.add("progress-bar");
    progressItem.classList.add("progress-item");
    progressItem.style.width = progressBar.clientWidth*perc;


    progressBar.appendChild(progressItem);
    taskBody.appendChild(progressBar);

    columns[choosenStatus].appendChild(taskDiv); 


    progressItem.style.width = Math.floor(progressBar.clientWidth*perc)+"px";

    desc.classList.toggle("hidden"); 
    percent.classList.toggle("hidden"); 
    progressBar.classList.toggle("hidden"); 
    

    eventToDisplays(displayChange, taskDiv, {desc:desc,percent:percent, progressBar:progressBar});

  });



}





btnNewTask.addEventListener("click", ()=>{newTaskToggle(renderTasks)});

document.querySelectorAll(".task").forEach(e=>{
  e.addEventListener("dragStart", (event)=>{
    console.log("START - ");
    console.log(event.target);
  })

})

renderTasks();
