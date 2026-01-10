import {MultiTask, Task, Group, Topic} from "./data.js"

const Groups =[];
const tasks = [];
const MultiTasks =[];



Groups.push(new Group(0, "Sem Classificação", "-"));
Groups.push(new Group(1, "TI", "-"));
Groups.push(new Group(2, "Banana com arroz", "-"));
Groups.push(new Group(3, "Cebolinha", "-"));

// constructor(id, name, desc, id_group = 0, status, endDate)

tasks.push(new Task(0, "Task 1", "BAnana com assai, se ela pulasse ela explode com verde e morango, javascript", 0, 0, '23-01-2301' ));
tasks.push(new Task(1, "Task 2", "выфвцшуош Ышьцуз йлощлщащл флщац бчьсбяюмчофы кьц", 0, 0, '23-01-1999' ));
tasks.push(new Task(2, "Task 3", "Esqueci de colcoar a descrição", 0, 0, '02-02-2000' ));
tasks.push(new Task(3, "Task 4", "", 0, 0, '10-10-2000' ));



export {Groups, tasks, MultiTasks}