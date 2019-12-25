 //Define UI variables
  const form = document.querySelector('#task-form');
  const taskList=document.querySelector('.collection');
  const clearBtn=document.querySelector('.clear-tasks');
  const filter=document.querySelector('#filter');
  const taskInput=document.querySelector('#task');
   
  //Load all Event Listeners

  loadEventListeners();
  //Load all event listeners functions  body 
  function  loadEventListeners()  
  {
      //DOM load event
      document.addEventListener('DOMContentLoaded',getTasks);
      //Add task Event
      form.addEventListener('submit',addTask);
      //Remove task Event
      taskList.addEventListener('click',removeTask);
      //clear the list with one click
      clearBtn.addEventListener('click',clearTask);
      //filter task 
      filter.addEventListener('keyup',filterTask);
  }
  //Add Task
  function addTask(e)
  {
      if(taskInput.value === ''){
      alert('Add a Task');}
      //create li element
      else{
       const li=document.createElement('li');
        //add class
        li.className='collection-item';
        // create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));
        //create new link or delete element 
        const link =document.createElement('a');
        //add class
        link.className='delete-item secondary-content';
        //add icon html
        link.innerHTML='<i class="fa fa-remove"></i>';
        //append the link to li
        li.appendChild(link);
        //append the li to ul
         taskList.appendChild(li);}
         //store in local storage
         storeTaskInLocalStorage(taskInput.value);
         //clear input
         taskInput.value='';
    e.preventDefault();
  }
  //Remove Task
  function removeTask(e)
  {
     if(e.target.parentElement.classList.contains('delete-item'))
     {
         if(confirm('Are you Serious'))
             e.target.parentElement.parentElement.remove();
            //Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
  }
  //clear taskd
  function clearTask(e)
  {
      //taskList.innerHTML='';<--slow
     // alternate way to remove
     //v faster way
     if(confirm('You can\'t rol_back' )){
     while(taskList.firstChild)
     {
         taskList.removeChild(taskList.firstChild);      
     }
     //clear from LS
     clearTasksFromLocalStorage();}
  }
  function filterTask(e) 
  {
      const text=e.target.value.toLowerCase();
      document.querySelectorAll('.collection-item').forEach
      (function(task)
      {
          const item=task.firstChild.textContent;
          if(item.toLowerCase().includes(text))
          {
              task.style.display='block';
          }
          else task.style.display='none';
      })
  }
  //store task
  function storeTaskInLocalStorage(task)
  {
       let tasks;
       if(localStorage.getItem('tasks')===null)
       tasks=[];
       else
       tasks=JSON.parse(localStorage.getItem('tasks'));
       tasks.push(task);
       localStorage.setItem('tasks',JSON.stringify(tasks));
  }
  function getTasks()
  {  
       let tasks;
       if(localStorage.getItem('tasks')==null)
       tasks=[];
       else
       tasks=JSON.parse(localStorage.getItem('tasks'));
       tasks.forEach(function(task)
       {
            const li=document.createElement('li');
            li.className='collection-item';
            li.appendChild(document.createTextNode(task));
            const link=document.createElement('a');
            link.className='delete-item secondary-content';
            link.innerHTML='<i class="fa fa-remove"></i>';
            li.appendChild(link);
            taskList.appendChild(li);
       })
  }
  function removeTaskFromLocalStorage(taskItem)
  {
        let tasks;
        if(localStorage.getItem('tasks')===null)tasks=[];
        else tasks=JSON.parse(localStorage.getItem('tasks'));
        tasks.forEach(function(task,index)
        {
            if(taskItem.textContent===task)
            tasks.splice(index,1);
        });
        localStorage.setItem('tasks',JSON.stringify(tasks));
  }
  function clearTasksFromLocalStorage()
  {localStorage.clear();}