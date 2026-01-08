"hello, world!" 

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
    this.initData = null ;
    this.endDate_task = null;
    this.deadLine_task = endDate;
    this.priority = null;
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

 // Para tarefas que não possuem grupo especificado.



export {MultiTask, Task, Group, Topic};



/*
Informações Comuns na Frente do Cartão (Visão Rápida)
Título da Tarefa: Nome claro e conciso da tarefa.
Responsável: Quem está executando ou é responsável pela tarefa.
Prioridade: Nível de urgência ou importância.
Prazo (Due Date): Data de entrega.
Estimativa: Pontos de história ou horas, indicando o esforço*/