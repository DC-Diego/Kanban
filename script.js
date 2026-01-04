import {MultiTask, Task, Group, Topic} from "./data.js"


const Groups =[];
const tasks = [];
const MultiTasks =[];

const SPA  = document.querySelector(".SPAs");

const TabsArea  = document.querySelector(".tabber");

const idTasks = document.getElementById("id-tasks");
const idCalendar = document.getElementById("id-calendar");

const tabs = [idTasks, idCalendar];


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


 <div class="change-task-display">

                  <svg viewBox="0 0 250 250">
                    <line class="line-change" x1="75" y1="75" x2="125" y2="125"></line>
                    <line class="line-change" x1="175" y1="75" x2="125" y2="125"></line>

                  </svg>
                </div>



*/
function createDisplayChanger(){
  const div = document.createElement("div");
  div.classList.add("change-task-display");
  div.innerHTML=` <svg viewBox="0 0 250 250">
  <line class="line-change" x1="75" y1="100" x2="125" y2="150"></line>
  <line class="line-change" x1="175" y1="100" x2="125" y2="150"></line>

</svg>`;

  return div;


}

// console.log("createDisplayChanger()");
// console.log(createDisplayChanger());

function newTab(type = null){
  
  const div = document.createElement("div");
  div.classList.add("task-tab");

  SPA.appendChild(div);

  div.innerText=""+Math.floor(Math.random()*1000)
  // switch(type){
  //   case 'new-task':
      

  //     break;



    
  // }

  return div;



}

function setTabEnable(e, tab){
  const active = document.querySelector(".active-tab");
  if(e!=active){
    active.classList.remove('active-tab');
    e.classList.add('active-tab');

    document.querySelector(".taskActive").classList.remove("taskActive");
    tab.classList.toggle("hidden");
    tab.classList.toggle("taskActive");
    // if(i < gradientColors.length)
      // great.style.background = `${gradientColors[i]}`;

  }

}


function tabEventHandler(e, tab){
  e.addEventListener('click', ()=>{
   setTabEnable(e, tab);
  
  });


 
}


headerTabs.forEach((e,i)=>{

  tabEventHandler(e, tabs[i]); 

});

function eventToDisplays(binder, taskDiv, hideObjs){

    binder.addEventListener('click', (f)=>{
      binder.querySelector("svg").classList.toggle("rotateChange");
      hideObjs.desc.classList.toggle("hidden"); 
      hideObjs.percent.classList.toggle("hidden"); 
      hideObjs.progressBar.classList.toggle("hidden"); 
      
      // ADD o modo menor para caber todas as tasks, ou modo completo "Quando clicar no binder"

      /*
        Modo Menor:
        |----------------------------|
        |  #id  -  #group          < |
        |----------------------------|
        | #title              #data  |
        |----------------------------|

        Modo Normal:
        |----------------------------|
        |  #id  -  #group          < |
        |----------------------------|
        | #title              #data  |
        | #desc                      |
        | #percent                   |
        | #percentbar                |
        |----------------------------|

      
      */

    })
    
  
}

function renderTasks(){
  // return;
  document.querySelectorAll(".task").forEach(e=>{
    e.remove();
  })

  const statusColumn = ["notStarted","inProgress","done","canceled","pendent"] ;
    
  for (let i = 0; i < 31*1; i++) {
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

        /*
        
           <div class="titleDateAlign">
                  <h1>Task1 </h1>
                  <h1>12/12</h1>
                </div>
                
        */

        
    let choosenStatus = statusColumn[Math.floor(Math.random()*statusColumn.length)];

    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");    
    taskDiv.draggable = true;

    // taskDiv.classList.add("notStarted");    
    taskDiv.classList.add(`${choosenStatus}`);    

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

    const displayChange = createDisplayChanger();
    header.appendChild(displayChange);
    const taskBody = document.createElement("div");
    taskBody.classList.add("task-body");      
    taskDiv.appendChild(taskBody);

    let perc = Math.floor(100* Math.random())/100;


    const titleDateAlign = document.createElement("div");
    titleDateAlign.classList.add("titleDateAlign");
    taskBody.appendChild(titleDateAlign);


    const title = document.createElement("h1");
    const desc = document.createElement("h1");
    const date = document.createElement("h1");
    const percent = document.createElement("h1");
    title.innerText = "Title "+i;
    desc.innerText = "Lorem ipsum its not lorem ipsum, im writing random text as descriptio... "+i;
    date.innerText = "12/1"+i;
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


    console.log( progressBar.clientWidth+"  "+ perc+"    "+(progressBar.clientWidth*perc));
    progressItem.style.width = Math.floor(progressBar.clientWidth*perc)+"px";

    desc.classList.toggle("hidden"); 
    percent.classList.toggle("hidden"); 
    progressBar.classList.toggle("hidden"); 
    

    eventToDisplays(displayChange, taskDiv, {desc:desc,percent:percent, progressBar:progressBar});


  }



}

let contador = 0;

const newTaskToggle = ()=>{
  const aba = {id:contador++};
  const div = document.createElement("div");
  div.classList.add("header-tab");
  const h = document.createElement("h1");
  h.innerText="Task "+aba.id;
  // tabs.push(aba);
  div.appendChild(h);
  TabsArea.appendChild(div);
  div.title = "Nova tarefa "+aba.id;

  const taskTab = newTab();


  tabEventHandler(div, taskTab);
  setTabEnable(div, taskTab);

  /* AAAAAAAAAAAAAAA - Colocar o sistema que muda as abas */
/*
  const a = document.querySelector(".newTask-tab");
  a.classList.toggle("hidden");
  idTasks.classList.toggle("hidden");*/

  
};


blurDiv.addEventListener("click", newTaskToggle);
btnNewTask.addEventListener("click", newTaskToggle);



document.querySelectorAll(".task").forEach(e=>{
  e.addEventListener("dragStart", (event)=>{
    console.log("START - ");
    console.log(event.target);
  })

})



console.log(Groups)

renderTasks();
