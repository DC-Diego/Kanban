import {MultiTask, Task, Group, Topic} from "./data.js"

const Groups =[];
const tasks = [];
const MultiTasks =[];

let groupInc = 0;
let tasksInc = 0;
let multiInc = 0;


function createNewGroup(name, desc){
  const group = new Group(groupInc, name, desc);
  groupInc++;
  Groups.push(group);
  return group;

}

function createNewTask(name, desc, endDate, idGroup, priority){
  const tasky = new Task( tasksInc,name, desc, idGroup, 0, endDate, priority);
  tasksInc++;
  tasks.push(tasky);
  return tasky;
}

function createNewMultiTask(father, son){
  const m = new MultiTask(multiInc, father, son);
  multiInc++;
  MultiTasks.push(m);
  
  return m;
}



createNewGroup("Sem Classificação", "-");
createNewGroup("TI", "-");
createNewGroup("Banana com arroz", "-");
createNewGroup("Cebolinha", "-");


// constructor(id, name, desc, id_group = 0, status, endDate)
// createNewTask("Task 1", "BAnana com assai, se ela pulasse ela explode com verde e morango, javascript", 0, '23-01-2301',3 );
// createNewTask("Task 2", "выфвцшуош Ышьцуз йлощлщащл флщац бчьсбяюмчофы кьц", 0,  '23-01-1999',3);
// createNewTask("Task 3", "Esqueci de colcoar a descrição", 0, '02-02-2000',3 );
// createNewTask("Task 4", "", 0,  '10-10-2000',3 );



export {Groups, tasks, MultiTasks,createNewTask, createNewGroup, createNewMultiTask}