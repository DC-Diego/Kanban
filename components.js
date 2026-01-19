import {Groups, tasks, MultiTasks, createNewTask, createNewGroup, createNewMultiTask, getGroupById } from "./file.js"
import {MultiTask, Task, Group, Topic} from "./data.js";




const TabsArea  = document.querySelector(".tabber");
const headerTabs = document.querySelectorAll(".header-tab");

const blurDiv = document.querySelector(".blur-effect");


const idTasks = document.getElementById("id-tasks");
const idCalendar = document.getElementById("id-calendar");

const tabs = [idTasks, idCalendar];

function createDisplayChanger(){
  const div = document.createElement("div");
  div.classList.add("change-task-display");
  div.innerHTML=` <svg viewBox="0 0 250 250">
  <line class="line-change" x1="75" y1="100" x2="125" y2="150"></line>
  <line class="line-change" x1="175" y1="100" x2="125" y2="150"></line>

</svg>`;

  return div;


}

function tabEventHandler(e, tab){
  e.addEventListener('click', ()=>{
   setTabEnable(e, tab);
  
  });
}


headerTabs.forEach((e,i)=>{
  tabEventHandler(e, tabs[i]); 
});

function newPage(type = null, closeTabEvent = null, render){
  let div;
  if(type=="newTask") div = createNewTaskTab(closeTabEvent, render);
  // else if(type=="openTask") div = viewTaskComponent( task,closeTabEvent, render);

  return div;
}


function enableTabsId(isIdTasks){
  if(isIdTasks){
    document.querySelector(".subtitles").classList.remove("hidden");
    document.querySelector(".search-area").classList.remove("hidden");
    document.querySelector(".tool-area").classList.remove("hidden");
  }else{
    document.querySelector(".subtitles").classList.add("hidden");
    document.querySelector(".search-area").classList.add("hidden");
    document.querySelector(".tool-area").classList.add("hidden");
  }


  
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
  
  
    enableTabsId(tab===idTasks);
  
  
  
  
  
  }
}


const newTab = (name, title)=>{
  const div = document.createElement("div");
  div.classList.add("header-tab");
  const h = document.createElement("h1");
  h.innerText=name;
  const closeTab = document.createElement("div");
  closeTab.classList.add("closeTabSvg");
  closeTab.innerHTML = `<svg viewBox="0 0 250 250">
  <line class="line-filter" x1="80" y1="80" x2="180" y2="180"></line>
  <line class="line-filter" x1="80" y1="180" x2="180" y2="80"></line>
  </svg> `;
  div.appendChild(h);
  div.appendChild(closeTab);
  TabsArea.appendChild(div);
  
  div.title = title;

  return div;
};



function multiTaskPopup(){
  const div = document.createElement("div");
  div.classList.add("multiTaskPopup");
  div.classList.add("hidden");

  const h1 = document.createElement("h1");
  h1.innerText = "Adicionar nova subtarefa";
  const divCancelar = document.createElement("div");
  divCancelar.classList.add("btn-newTask-cancel");
  divCancelar.title= "cancelar";
  divCancelar.innerHTML = `<svg viewBox="0 0 250 250">
  <line class="line-change" x1="60" y1="60" x2="190" y2="190"></line>
  <line class="line-change" x1="60" y1="190" x2="190" y2="60"></line>
</svg>`;

 
  



  const cboSubTask = document.createElement("select");
  // cboSubTask.style.marginTop="5px";
  
  const desc = document.createElement("p");
  desc.innerText = "Descrição:\n ";


  const btnAccept = document.createElement("button");
  btnAccept.innerText="Aceitar";
  btnAccept.classList.add('btnAccept');
  btnAccept.style.width="90%";
  btnAccept.style.marginBottom="5px";

  div.appendChild(h1);
  div.appendChild(divCancelar);
  div.appendChild(cboSubTask);
  div.appendChild(desc);
  div.appendChild(btnAccept);


  return div;

}




function createNewTaskTab(closeTabEvent, render){
  const tempMulti = [];
  const tasksClone = JSON.parse(JSON.stringify(tasks));


  const newTaskTab = document.createElement("div");
  const multi = multiTaskPopup();

  newTaskTab.appendChild(multi);
  
  blurDiv.addEventListener('click', closePopup);

  function closePopup(){
    multi.classList.add("hidden");
    blurDiv.classList.add("hidden");

  }
  const cboAddSubTasks = multi.querySelector('select'); 
  tasks.forEach((e, i)=>{
    if(!i)  multi.querySelector('p').innerText = `Descrição:\n ${tasks[i].desc_task}`;
    const opt = document.createElement("option");
    opt.value=e.name_task;
    opt.innerText=e.name_task;
    cboAddSubTasks.appendChild(opt);
    
  });
 
  function removeMultiTask(id){
    tasksClone.push(tasks[id]);
    let i = 0;
    for(i; i < tempMulti.length;i++){
      if(tempMulti[i] == id) break;
    }
    tempMulti.splice(i,1);
  }
  

  multi.querySelector(".btn-newTask-cancel").addEventListener('click', ()=>{
    closePopup();
  })

  multi.querySelector('button').addEventListener("click", ()=>{
    if(cboAddSubTasks.length){
      let i = cboAddSubTasks.selectedIndex;
      appendMultiTask(cboAddSubTasks.value, removeMultiTask, tasksClone[i].id_task);

      tempMulti.push(tasksClone[i].id_task);
      tasksClone.splice(i,1);
      closePopup();
    }
  });


  cboAddSubTasks.addEventListener("change", ()=>{
    let i = cboAddSubTasks.selectedIndex;
    multi.querySelector('p').innerText = `Descrição:\n ${tasks[i].desc_task}`;

  });

  newTaskTab.classList.add("task-tab");
  newTaskTab.classList.add("newTask");
  const newTaskForm = document.createElement("div");
  newTaskForm.classList.add("newTask-form");
  newTaskTab.appendChild(newTaskForm);

  const newTaskHeader = document.createElement("div");
  newTaskHeader.classList.add("newTask-header");
  let h1 = document.createElement("h1");
  h1.innerText="Criar nova tarefa";
  

  newTaskHeader.appendChild(h1);
  // newTaskHeader.appendChild(divCancelar);
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
    inputDate.min= new Date().toISOString().slice(0, 10);
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

  const topicsSpace = document.createElement("div");
  topicsSpace.classList.add("topicsSpace");

  function newTopic(){
    topicsSpace.appendChild(createTopics());

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

  function appendMultiTask(name, eventClose, id){
    divMultiTaskArea.appendChild(NewMultiTask(name, eventClose, id));

  }

  
  
  const btnNewMultiTask = document.createElement("button");
  btnNewMultiTask.classList.add("btnNewMultiTask");


  btnNewMultiTask.innerText = "Nova sub-tarefa";

  inpArea.appendChild(h1);
  inpArea.appendChild(divMultiTaskArea);
  inpArea.appendChild(btnNewMultiTask);

  /* FLAG-CHANGE-1 */
  btnNewMultiTask.addEventListener("click", ()=>{
    multi.classList.remove("hidden");
    blurDiv.classList.remove("hidden");

    for(let i = cboAddSubTasks.children.length-1; i >= 0;i--)
      cboAddSubTasks.children[i].remove();
    
    tasksClone.forEach((e,j)=>{

      const opt = document.createElement("option");
      opt.value=e.name_task;
      opt.innerText=e.name_task;
      cboAddSubTasks.appendChild(opt);
      

    });


  });

  partitionDiv.appendChild(inpArea);
  newTaskBody.appendChild(partitionDiv);
  
  const btnCreateNewTask = document.createElement("button");
  btnCreateNewTask.classList.add("createNewTask");
  btnCreateNewTask.innerText = "Criar tarefa";

  newTaskBody.appendChild(btnCreateNewTask);
  newTaskForm.appendChild(newTaskBody);



  btnCreateNewTask.addEventListener('click', ()=>{
    
    // FLAG2 

    if(checkBoxDate.checked && !inputDate.value ){
      checkBoxDate.parentElement.querySelector('h1').classList.add("h1-pendent");
      newTaskForm.scrollTo(0, 0);
      inputDate.classList.add("input-pendence");
      inputDate.addEventListener('change', ()=>{
        inputDate.classList.remove("input-pendence");
        checkBoxDate.parentElement.querySelector('h1').classList.remove("h1-pendent");
      
      });

    }
    if(!txtDescription.value){
      txtDescription.parentElement.querySelector('h1').classList.add("h1-pendent");
      txtDescription.classList.add("input-pendence");
      txtDescription.focus();
      txtDescription.placeholder="Preencha a descrição!";
      let old1 =txtDescription.style.borderRadius;
      let old2 = txtDescription.style.border;
      txtDescription.addEventListener('keydown', ()=>{
        txtDescription.style.borderRadius=old1;
        txtDescription.style.border=old2;
        txtDescription.classList.remove("input-pendence");
        txtDescription.parentElement.querySelector('h1').classList.remove("h1-pendent");
      });
      txtDescription.style.borderRadius="0px 5px 5px 5px";
      txtDescription.style.border ="solid red 3px";


    }
    if(!titleInput.value){
      titleInput.parentElement.querySelector('h1').classList.add("h1-pendent");
      titleInput.placeholder="Preencha o nome da tarefa!";
      titleInput.classList.add("input-pendence");
      let old1 =titleInput.style.borderRadius;
      let old2 = titleInput.style.border;
      titleInput.addEventListener('keydown', ()=>{
        titleInput.style.borderRadius=old1;
        titleInput.style.border=old2;
        titleInput.classList.remove("input-pendence");
        titleInput.parentElement.querySelector('h1').classList.remove("h1-pendent");
      });
      titleInput.style.borderRadius="0px 5px 5px 5px";
      titleInput.style.border ="solid red 3px";
      titleInput.focus();
    } else if(titleInput.value && txtDescription.value && (!checkBoxDate.checked || inputDate.value)){
      
      
      const task = createNewTask(titleInput.value.split(0, 50)[0], txtDescription.value.split(0, 300)[0], inputDate.value, cboGroup.selectedIndex, Number(priorityInput.value));
      
      for (let i = 0; i < tempMulti.length; i++) {
        createNewMultiTask(task.id_task, tempMulti[i]);
      }

      topicsSpace.querySelectorAll('input').forEach(e=>{
        if(e.value)task.createTopic(e.value);
      });
      render();
      closeTabEvent();
    }

  });
  return newTaskTab;
}

function createTopics(){
  const div = document.createElement("div");
  div.classList.add("topicArea");
  const input = document.createElement("input");
  input.placeholder = "Nome do tópico";
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

function NewMultiTask(name, close, id){

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
  a.addEventListener("click", ()=>{close(id); div.remove()});

  return div;
}

export {tabEventHandler, createDisplayChanger, newPage, setTabEnable, newTab, createNewTaskTab, NewMultiTask, createTopics};


