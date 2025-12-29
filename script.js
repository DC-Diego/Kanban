const headerTabs = document.querySelectorAll(".header-tab");

const gradientColors = ["#333333", "#030312","#6e4e22","#bafec0","#320000", "#000000"]; // REMOVE?

const great = document.querySelector(".great");

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
            
          </div>
        </div>
    */
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");    
    taskDiv.classList.add("notStarted");    

    const header = document.createElement("div");
    header.classList.add("task-header");     

    taskDiv.appendChild(header);

    const id = document.createElement("h1");
    const group = document.createElement("h1");
    // const divIcon = document.createElement("div");
    id.innerText="#"+i;
    group.innerText="Group "+i;
    header.appendChild(id);
    header.appendChild(group);

    const taskBody = document.createElement("div");
    taskBody.classList.add("task-body");      
    taskDiv.appendChild(taskBody);

    const title = document.createElement("h1");
    const desc = document.createElement("h1");
    const percent = document.createElement("h1");
    title.innerText = "Title "+i;
    desc.innerText = "Lorem ipsum its not lorem ipsum, im writing random text as descriptio... "+i;
    percent.innerText = "percent completed: "+i+"%";
    
    taskBody.appendChild(title);
    taskBody.appendChild(desc);
    taskBody.appendChild(percent);
    
    idTasks.appendChild(taskDiv);



  }



}






renderTasks();