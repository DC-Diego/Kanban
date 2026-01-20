import {Groups, tasks, MultiTasks, createNewTask, createNewGroup, createNewMultiTask, getGroupById } from "./file.js"

function viewTaskComponent(task, render, close){
  let ISEDITMODE = false;
  const status = [
    {
      type: "not started",
      color: "#2563EB"
    },
    {
      type: "in progress",
      color: "#F59E0B"
    },
    {
      type: "Done",
      color: "#22C55E"
    },
    {
      type: "canceled",
      color: "#6B7280"
    },
    {
      type: "Pendent",
      color: "#DC2626"
    }
  ]


  const mainDiv = document.createElement("div"); 
  mainDiv.classList.add("task-tab");
  mainDiv.classList.add("open-task");

  const taskForm = document.createElement("div");
  taskForm.classList.add("open-task-form");
  
  const newTaskHeader = document.createElement("div");
  newTaskHeader.classList.add("newTask-header");
  
  let h1 = document.createElement("h1");
  h1.innerText = `#${task.id_task} - ${task.name_task}`;
  const btnEditCancel = document.createElement('button');
  btnEditCancel.innerText="Editar tarefa";
  btnEditCancel.classList.add("btnEditCancel");

  newTaskHeader.appendChild(h1);
  newTaskHeader.appendChild(btnEditCancel);
  
  const newTaskBody = document.createElement("div");
  newTaskBody.classList.add("newTask-body");
  
  let partition = document.createElement("div") 
  partition.classList.add("newTask-body-partition");
   
  let inputArea = document.createElement("div");
  inputArea.classList.add("newTask-input-area");

  h1 = document.createElement("h1");
  h1.innerText = `Grupo da tarefa:`;
  let p = document.createElement("p");

  const group = getGroupById(task.id_group);

  p.innerText = `${group.name_group}`;
  
  inputArea.appendChild(h1);
  inputArea.appendChild(p);


  partition.appendChild(inputArea);
  
  inputArea = document.createElement("div");
  inputArea.classList.add("newTask-input-area");
  
  h1 = document.createElement("h1");
  h1.innerText = `Status da tarefa:`;
  p = document.createElement("p");
  p.innerText = `${status[task.status].type}`;
  p.style.borderLeft = `5px solid ${status[task.status].color}`;
 
  inputArea.appendChild(h1);
  inputArea.appendChild(p);

  partition.appendChild(inputArea);
  newTaskBody.appendChild(partition);


  partition = document.createElement("div") 
  partition.classList.add("newTask-body-partition");
  inputArea = document.createElement("div");
  inputArea.classList.add("newTask-input-area");


  h1 = document.createElement("h1");
  p = document.createElement("p");
  const inputPriority = document.createElement("input");

  h1.innerText="Prioridade:";
  p.innerText=task.priority;
  p.style.width = "80px";
  p.style.marginLeft = "5px";
  inputPriority.style = "width: 80px; margin-left: 5px; padding: 8px 10px; border-radius: 5px;border: none; ";
  inputPriority.min =(task.deadLine_task?3:0); inputPriority.value = task.priority; inputPriority.type = "number";
  inputPriority.classList.add("hidden");
  inputArea.appendChild(h1);
  inputArea.appendChild(p);
  inputArea.appendChild(inputPriority);

  partition.appendChild(inputArea);
  newTaskBody.appendChild(partition);


  partition = document.createElement("div") 
  partition.classList.add("newTask-body-partition");
  inputArea = document.createElement("div");
  inputArea.classList.add("newTask-input-area");


  h1 = document.createElement("h1");
  p = document.createElement("p");
  const textarea = document.createElement("textarea");
  textarea.classList.add("hidden");

  h1.innerText = "Descrição:";
  p.innerText = `${task.desc_task}`;
  p.style = "width: 100%; padding: 8px 3px;min-height: 90px";
  textarea.cols = 30; textarea.rows = 6; textarea.placeholder = "Descrição da tarefa";
  textarea.value = task.desc_task;

  inputArea.appendChild(h1);
  inputArea.appendChild(p);
  inputArea.appendChild(textarea);

  partition.appendChild(inputArea);
  newTaskBody.appendChild(partition);


  partition = document.createElement("div") 
  partition.classList.add("newTask-body-partition");
  inputArea = document.createElement("div");
  inputArea.classList.add("newTask-input-area");

  
  h1 = document.createElement("h1");
  p = document.createElement("p");
  h1.innerText = "Data de criação:";
  p.innerText = `${task.creationDate_task}`;


  inputArea.appendChild(h1);
  inputArea.appendChild(p);

  
  partition.appendChild(inputArea);
  
  inputArea = document.createElement("div");
  inputArea.classList.add("newTask-input-area");
  
  h1 = document.createElement("h1");
  p = document.createElement("p");
  h1.innerText = "Data de início:";
  p.innerText = `${task.initDate || '-'}`;

  inputArea.appendChild(h1);
  inputArea.appendChild(p);
  
  partition.appendChild(inputArea);
  newTaskBody.appendChild(partition);
  
  
  partition = document.createElement("div") 
  partition.classList.add("newTask-body-partition");
  inputArea = document.createElement("div");
  inputArea.classList.add("newTask-input-area");
  
  
  h1 = document.createElement("h1");
  p = document.createElement("p");
  h1.innerText = "Data de prazo:";
  p.innerText = `${task.deadLine_task || '-'}`;
  const inputDeadLine = document.createElement("input");
  inputDeadLine.min=new Date().toISOString().slice(0, 10); inputDeadLine.value=`${task.deadLine_task || new Date().toISOString().slice(0, 10)}`;  inputDeadLine.type="date"; 
  inputDeadLine.classList.add("hidden");
  inputArea.appendChild(h1);
  inputArea.appendChild(p);
  inputArea.appendChild(inputDeadLine); 
  partition.appendChild(inputArea);
    
  inputArea = document.createElement("div");
  inputArea.classList.add("newTask-input-area");

  h1 = document.createElement("h1");
  p = document.createElement("p");
  h1.innerText = "Data de finalização:";
  p.innerText = `${task.endDate_task || '-'}`;

  inputArea.appendChild(h1);
  inputArea.appendChild(p);
  partition.appendChild(inputArea);
  newTaskBody.appendChild(partition);




  partition = document.createElement("div") 
  partition.classList.add("newTask-body-partition");
  inputArea = document.createElement("div");
  inputArea.classList.add("newTask-input-area");

  partition.style.marginTop = "20px";

  h1 = document.createElement("h1");
  const topicsSpace = document.createElement("div");
  h1.innerText = "Tópicos:";
  topicsSpace.classList.add("topicsSpace");


  inputArea.appendChild(h1);
  inputArea.appendChild(topicsSpace);

  partition.appendChild(inputArea);
  newTaskBody.appendChild(partition);

  partition = document.createElement("div");
  partition.classList.add("newTask-body-partition");
  inputArea = document.createElement("div");
  inputArea.classList.add("newTask-input-area");

  partition.style.marginTop = "10px";
  partition.style.marginBottom = "30px";

  h1 = document.createElement("h1");
  const multiTaskArea = document.createElement("div");
  h1.innerText = "Sub-tasks:";
  multiTaskArea.classList.add("multiTaskArea");

  inputArea.appendChild(h1);
  inputArea.appendChild(multiTaskArea);


  partition.appendChild(inputArea);
  newTaskBody.appendChild(partition);



  taskForm.appendChild(newTaskHeader);
  taskForm.appendChild(newTaskBody);
  mainDiv.appendChild(taskForm);
  




  btnEditCancel.addEventListener('click', ()=>{
    ISEDITMODE = !ISEDITMODE;
    if(ISEDITMODE){//EDIÇÂO ATIVA
      btnEditCancel.innerText = "cancelar";
      inputPriority.classList.remove("hidden")
      inputDeadLine.classList.remove("hidden")
      textarea.classList.remove("hidden")
      textarea.parentElement.querySelector("p").classList.add("hidden")
      inputPriority.parentElement.querySelector("p").classList.add("hidden")
      inputDeadLine.parentElement.querySelector("p").classList.add("hidden")
      
      
    }else{//EDIÇÂO DESATIVADA
      btnEditCancel.innerText="Editar tarefa";
      inputPriority.classList.add("hidden")
      inputDeadLine.classList.add("hidden")
      textarea.classList.add("hidden")
      textarea.parentElement.querySelector("p").classList.remove("hidden")
      inputPriority.parentElement.querySelector("p").classList.remove("hidden")
      inputDeadLine.parentElement.querySelector("p").classList.remove("hidden")
      

    }



  });







  return mainDiv;
  /*<div class="task-tab open-task-tab taskActive">
  <div class="open-task-form">
  <div class="newTask-body">
            
    <div class="newTask-body-partition" style="margin-top: 10px; margin-bottom: 30px">
      <div class="newTask-input-area">
        <h1>Sub-tasks:</h1>
        <div class="multiTaskArea">
            
        </div>
      </div>
    </div>
            
            
            <!--<h1> Task aberta</h1>
            opened tasks
            
            <br>
            Editar tools menu: Botão de editar, e cancelar tarefa
            |ID | e | Nome | e | Grupo da tarefa |
            | Status da tarefa (N started, In Progress ...) - com a cor do respectivo status| e |Prioridade|
            <br>
            <br>
            
            | Data de crição | e | Data de inicio|
            <br>
            | Data de Validade/vencimento| e | Data de termino|
            <br>
            
            | Topicos |
            this.topics = [];    
            <br>
            
            | Multitasks |
            mutlitasks.sons= [];    
            

            
            <br>
            
            
            -->
            
            
            </div>
            </div>
            
            </div>
            */

}



export {viewTaskComponent}



