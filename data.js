"hello, world!" 

class Group{
  constructor(id, name, desc){
    this.id_group = id; // PK
    this.name_group = name;
    this.desc_group = desc;

  }

}

class Task{
  constructor(id, name, desc, id_group = 0, isDone, creationDate, endDate){
    this.id_task = id; // PK
    this.id_group = id_group; // FK - Group(id_group)
    this.name_task = name;
    this.desc_task = desc;
    this.isDone = isDone;
    this.creationDate_task = creationDate ;
    this.endDate_task = endDate;

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


