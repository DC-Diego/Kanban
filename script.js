const headerTabs = document.querySelectorAll(".header-tab");


headerTabs.forEach(e=>{
  e.addEventListener('click', ()=>{
    const active = document.querySelector(".active-tab");
    if(e!=active){
      active.classList.remove('active-tab');
      e.classList.add('active-tab');

    }


  });

})