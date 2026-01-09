import {MultiTask, Task, Group, Topic} from "./data.js"


const Groups =[];
const tasks = [];
const MultiTasks =[];


// Experiment:


// End Experiment;

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


function newTab(type = null, closeTabEvent = null){
  let div;
  if(type=="newTask") div = createNewTaskTab(closeTabEvent);


  return div;



}

function setTabEnable(e, tab){

  let active = document.querySelector(".active-tab");
  if( e!=active ){
    if(active)active.classList.remove('active-tab');
    e.classList.add('active-tab');
    active = document.querySelector(".taskActive");
    if(active) active.classList.remove("taskActive");
    tab.classList.toggle("hidden");
    tab.classList.toggle("taskActive");
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


    // console.log( progressBar.clientWidth+"  "+ perc+"    "+(progressBar.clientWidth*perc));
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
  const closeTab = document.createElement("div");
  closeTab.classList.add("closeTabSvg");
  closeTab.innerHTML = `<svg viewBox="0 0 250 250">
  <line class="line-filter" x1="80" y1="80" x2="180" y2="180"></line>
  <line class="line-filter" x1="80" y1="180" x2="180" y2="80"></line>
  </svg> `;
  
  
  div.appendChild(h);
  div.appendChild(closeTab);
  TabsArea.appendChild(div);
  
  div.title = "Nova tarefa "+aba.id;

  
  const closeThisTab = ()=>{
    taskTab.remove();
    div.remove();
    setTimeout(() => {
      setTabEnable(document.querySelector(".header-tab"), idTasks);
      
    }, 1);
    
  }

  const taskTab = newTab("newTask", closeThisTab);
  SPA.appendChild(taskTab);



  closeTab.addEventListener('click', ()=>{
    closeThisTab();
  });

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


function createTopics(){
  const div = document.createElement("div");
  div.classList.add("topicArea");
  const input = document.createElement("input");
  input.placeholder = "Topico "+Math.floor(Math.random()*1000);
  input.value = "Topico "+Math.floor(Math.random()*1000);
  const a = document.createElement("div");
  a.innerHTML=`<svg viewBox="0 0 250 250">
  <line class="line-change" x1="60" y1="60" x2="190" y2="190"></line>
  <line class="line-change" x1="60" y1="190" x2="190" y2="60"></line>
  </svg></div`;
  div.appendChild(input);
  div.appendChild(a);
  a.addEventListener("click", ()=>{ div.remove() });



  return div;


}

function NewMultiTask(name){

  const div = document.createElement("div");
  div.classList.add("topicArea");

  const h1 = document.createElement("h1");
  h1.innerText=name;

  const a = document.createElement("div");
  a.innerHTML=`<svg viewBox="0 0 250 250">
  <line class="line-change" x1="60" y1="60" x2="190" y2="190"></line>
  <line class="line-change" x1="60" y1="190" x2="190" y2="60"></line>
  </svg></div`;
  div.appendChild(h1);
  div.appendChild(a);
  a.addEventListener("click", ()=>{ div.remove() });



  return div;


}


function createNewTaskTab(closeTabEvent){
  
  const newTaskTab = document.createElement("div");
  newTaskTab.classList.add("task-tab");
  newTaskTab.classList.add("newTask");
  const newTaskForm = document.createElement("div");
  newTaskForm.classList.add("newTask-form");
  newTaskTab.appendChild(newTaskForm);

  const newTaskHeader = document.createElement("div");
  newTaskHeader.classList.add("newTask-header");
  let h1 = document.createElement("h1");
  h1.innerText="Criar nova tarefa";
  const divCancelar = document.createElement("div");
  divCancelar.classList.add("btn-newTask-cancel");
  divCancelar.title= "cancelar";
  divCancelar.innerHTML = `<svg viewBox="0 0 250 250">
  <line class="line-filter" x1="60" y1="60" x2="190" y2="190"></line>
  <line class="line-filter" x1="60" y1="190" x2="190" y2="60"></line>
</svg>`;



  divCancelar.addEventListener('click', ()=>{
    closeTabEvent();
  });


  newTaskHeader.appendChild(h1);
  newTaskHeader.appendChild(divCancelar);
  newTaskForm.appendChild(newTaskHeader);

  const newTaskBody = document.createElement("div");
  newTaskBody.classList.add("newTask-body");

  let partitionDiv = document.createElement("div");
  partitionDiv.classList.add("newTask-body-partition");

  let inpArea = document.createElement("div");
  inpArea.classList.add("newTask-input-area");
  h1 = document.createElement("h1");
  h1.innerText="Nome da tarefa:";

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.placeholder = "task name";
  titleInput.maxLength= 50;

  inpArea.appendChild(h1);
  inpArea.appendChild(titleInput);
  partitionDiv.appendChild(inpArea);

  inpArea = document.createElement("div");
  inpArea.classList.add("newTask-input-area");
  h1 = document.createElement("h1");
  h1.innerText= "Grupo da tarefa:";

  inpArea.appendChild(h1);
  const cboGroup = document.createElement("select");
  
  inpArea.appendChild(cboGroup);

  Groups.forEach(e=>{
    const opt = document.createElement("option");
    opt.value=e.name_group;
    opt.innerText=e.name_group;;
    cboGroup.appendChild(opt);
  });
  partitionDiv.appendChild(inpArea);
  newTaskBody.appendChild(partitionDiv);
  
  
  partitionDiv = document.createElement("div");
  partitionDiv.classList.add("newTask-body-partition");
  partitionDiv.style.gap = 0;
  partitionDiv.style.minHeight = "40px";
  
  inpArea = document.createElement("div");
  inpArea.classList.add("newTask-input-area");
  inpArea.style.flexDirection = "row";
  const checkBoxDate = document.createElement("input");
  checkBoxDate.type="checkbox";


  h1 = document.createElement("h1");
  h1.innerText = "Prazo?";
  const inputDate = document.createElement("input");
  inputDate.type="date";
  
  
  inpArea.appendChild(checkBoxDate);
  inpArea.appendChild(h1);
  inpArea.appendChild(inputDate);
  partitionDiv.appendChild(inpArea);
    inputDate.classList.add('hidden');

  checkBoxDate.addEventListener('click', ()=>{
    if(!checkBoxDate.checked) priorityInput.min=0;
    else{
      priorityInput.min=3;
      priorityInput.value= Number(priorityInput.value)+3;
    }
    inputDate.classList.toggle("hidden");
    inputDate.value= new Date().toISOString().slice(0, 10);
  });

  
  inpArea = document.createElement("div");
  inpArea.classList.add("newTask-input-area");
  inpArea.style.flexDirection="row";

  h1 = document.createElement("h1");
  h1.innerText = "Prioridade:";
  h1.style.margin=0;
  h1.style.marginLeft="40%";

  const priorityInput = document.createElement("input");
  priorityInput.type="number";
  priorityInput.value=0;
  priorityInput.min=0;
  priorityInput.style="min-width: 40px; width: auto;height: 25px; margin-left: 15px;";

  inpArea.appendChild(h1);
  inpArea.appendChild(priorityInput);
  partitionDiv.appendChild(inpArea);
  newTaskBody.appendChild(partitionDiv);

  partitionDiv = document.createElement("div");
  partitionDiv.classList.add("newTask-body-partition");

   
  inpArea = document.createElement("div");
  inpArea.classList.add("newTask-input-area");

  
  h1 = document.createElement("h1");
  h1.innerText = "Descrição:";

  const txtDescription= document.createElement("textarea");
  txtDescription.cols=30
  txtDescription.rows=6
  txtDescription.placeholder="Descrição da tarefa";
  txtDescription.maxLength=300;

  inpArea.appendChild(h1);
  inpArea.appendChild(txtDescription);
  partitionDiv.appendChild(inpArea);
  newTaskBody.appendChild(partitionDiv);


  partitionDiv = document.createElement("div");
  partitionDiv.classList.add("newTask-body-partition");

   
  inpArea = document.createElement("div");
  inpArea.classList.add("newTask-input-area");

  h1 = document.createElement("h1");
  h1.innerText = "Topicos:";

  let topicsSpace = document.createElement("div");
  topicsSpace.classList.add("topicsSpace");

  function newTopic(){
    topicsSpace.appendChild(createTopics());

  }

  for (let i = 0; i < 4; i++) {
    newTopic();
  }

  const btnNewTopic = document.createElement("button");
  btnNewTopic.classList.add("btnNewTopic");
  btnNewTopic.innerText = "Novo topico";




  inpArea.appendChild(h1);
  inpArea.appendChild(topicsSpace);
  inpArea.appendChild(btnNewTopic);
  btnNewTopic.addEventListener("click", newTopic);

  partitionDiv.appendChild(inpArea);
  newTaskBody.appendChild(partitionDiv);

  partitionDiv = document.createElement("div");
  partitionDiv.classList.add("newTask-body-partition");

   
  inpArea = document.createElement("div");
  inpArea.classList.add("newTask-input-area");

  h1 = document.createElement("h1");
  h1.innerText = "Tarefas:";


  const divMultiTaskArea = document.createElement("div");
  divMultiTaskArea.classList.add("multiTaskArea");

  function appendMultiTask(name){
    divMultiTaskArea.appendChild(NewMultiTask(name));

  }

  
  for (let i = 0; i < 4; i++) {
    appendMultiTask("Task "+(i+1));
  }
  const btnNewMultiTask = document.createElement("button");
  btnNewMultiTask.classList.add("btnNewMultiTask");
  btnNewMultiTask.innerText = "Nova sub-tarefa";

  inpArea.appendChild(h1);
  inpArea.appendChild(divMultiTaskArea);
  inpArea.appendChild(btnNewMultiTask);
  btnNewMultiTask.addEventListener("click", ()=>{appendMultiTask("Task "+Math.floor(Math.random()*99))});

  partitionDiv.appendChild(inpArea);
  newTaskBody.appendChild(partitionDiv);
  
  const btnCreateNewTask = document.createElement("button");
  btnCreateNewTask.classList.add("createNewTask");
  btnCreateNewTask.innerText = "Criar tarefa";



  newTaskBody.appendChild(btnCreateNewTask);

  newTaskForm.appendChild(newTaskBody);

  return newTaskTab;
}




// console.log(Groups)

renderTasks();
