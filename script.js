import {MultiTask, Task, Group, Topic} from "./data.js"


const Groups =[];
const tasks = [];
const MultiTasks =[];

const blurDiv = document.querySelector(".blur-effect");
const newTask = document.querySelector(".form-new-task");

const btnNewTask = document.getElementById("btnNewTask"); 


const headerTabs = document.querySelectorAll(".header-tab");
const great = document.querySelector(".great");



Groups.push(new Group(0, "Sem Classificação", "-"));
Groups.push(new Group(1, "TI", "-"));
Groups.push(new Group(2, "Banana com arroz", "-"));
Groups.push(new Group(3, "Cebolinha", "-"));
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






*/



headerTabs.forEach((e,i)=>{
  e.addEventListener('click', ()=>{
    const active = document.querySelector(".active-tab");
    if(e!=active){
      active.classList.remove('active-tab');
      e.classList.add('active-tab');
      // if(i < gradientColors.length)
        // great.style.background = `${gradientColors[i]}`;

    }


  });

});


function renderTasks(){
  document.querySelectorAll(".task").forEach(e=>{
    e.remove();
  })
  const idTasks = document.getElementById("id-tasks");
  for (let i = 0; i < 31; i++) {
    /*
    <div class="task Pendent">
          <div class="task-header">
            <h1>#1</h1>
            <h1>group1</h1>
            <h1>!</h1>
            </div>
          <div class="task-body">
            <h1>Task1 </h1>
            <h1>Lorem ipsum its not lorem ipsum, im writing random text as description, so it may work</h1>
            <h1>percent completed: 1% </h1>
            <div class="progress-bar">
              <div class="progress-item">

              </div>

            </div>            
          </div>
        </div>
    */

      const aaaa = ["notStarted","inProgress","done","canceled","Pendent"] ;
        


    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");    

    // taskDiv.classList.add("notStarted");    
    taskDiv.classList.add(`${aaaa[Math.floor(Math.random()*aaaa.length)]}`);    

    const header = document.createElement("div");
    header.classList.add("task-header");     

    taskDiv.appendChild(header);
    const idDiv = document.createElement("div");
    header.appendChild(idDiv);
    const id = document.createElement("h1");
    const group = document.createElement("h1");
    // const divIcon = document.createElement("div");
    id.innerText="#"+i;
    group.innerText= ` - ${Groups[Math.floor(Math.random()*Groups.length)].name_group}`;
    idDiv.appendChild(id);
    header.appendChild(group);

    const taskBody = document.createElement("div");
    taskBody.classList.add("task-body");      
    taskDiv.appendChild(taskBody);

    let perc = Math.floor(100* Math.random())/100;

    const title = document.createElement("h1");
    const desc = document.createElement("h1");
    const percent = document.createElement("h1");
    title.innerText = "Title "+i;
    desc.innerText = "Lorem ipsum its not lorem ipsum, im writing random text as descriptio... "+i;
    percent.innerText = "percent completed: "+Math.floor(perc*100)+"%";
    
    taskBody.appendChild(title);
    taskBody.appendChild(desc);
    taskBody.appendChild(percent);
    
    
    const progressBar = document.createElement("div");
    const progressItem = document.createElement("div");

    progressBar.classList.add("progress-bar");
    progressItem.classList.add("progress-item");
    progressItem.style.width = progressBar.clientWidth*perc;


    progressBar.appendChild(progressItem);
    taskBody.appendChild(progressBar);

    idTasks.appendChild(taskDiv); 
    console.log( progressBar.clientWidth+"  "+ perc+"    "+(progressBar.clientWidth*perc));
    progressItem.style.width = Math.floor(progressBar.clientWidth*perc)+"px";



  }



}

const newTaskToggle = ()=>{
  blurDiv.classList.toggle("hidden");
  newTask.classList.toggle("hidden");
  btnNewTask.children[0].classList.toggle("rotateNewTask")


};


blurDiv.addEventListener("click", newTaskToggle);
btnNewTask.addEventListener("click", newTaskToggle);





console.log(Groups)

renderTasks();