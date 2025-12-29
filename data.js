"hello, world!" 

const Groups =[];
const tasks =[];
const MultiTasks =[];



class Topic{
  constructor(name){
    this.name = name;
    this.status = 0;
    // 0 → not done, 1 → done, -1 → cancel
  }

  setStatus(status){
    this.status = status;
  }
    
}



class Group{
  constructor(id, name, desc){
    this.id_group = id; // PK
    this.name_group = name;
    this.desc_group = desc;
  }

}

class Task{
  constructor(id, name, desc, id_group = 0, status, creationDate, endDate){
    this.id_task = id; // PK
    this.id_group = id_group; // FK - Group(id_group)
    this.name_task = name;
    this.desc_task = desc;
    this.status = status;
    this.creationDate_task = creationDate ;
    this.endDate_task = endDate;
    this.topics = [];    
    //TASK has description, name, group, status, time ....
    //NOTE: Just a 
  }

  createTopic(name){
    this.topics.push(new Topic(name));
  }

  calculateProgress(){
    let total = 0;
    let qtd = 0;
    this.topics.forEach(e=>{
      total+=e.status!=2;
      qtd += e.status == 1;
    });
    return qtd/total;
  }


}

class MultiTask{
  constructor(id_multi, id_father, id_son){
    this.id_multi = id_multi; // PK
    this.id_father = id_father; // FK - Task(id)
    this.id_son = id_son; // FK - Task(id)

  }

}

const group0 = new Group(0, "Sem grupo", "-"); // Para tarefas que não possuem grupo especificado.


