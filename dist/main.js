(()=>{const e=[],t=(()=>{const e=()=>{const e=new Date,t=String(e.getDate()).padStart(2,"0"),a=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getFullYear());return{dayOfWeek:e.getDay(),day:t,month:a,year:r,currentDate:`${r}-${a}-${t}`}};return{getCurrentDate:e,getReadableDate:()=>`${(()=>{let t="";switch(e().dayOfWeek){case 0:t="Sunday";break;case 1:t="Monday";break;case 2:t="Tuesday";break;case 3:t="Wednesday";break;case 4:t="Thursday";break;case 5:t="Friday";break;case 6:t="Saturday"}return{dayOfWeek:t}})().dayOfWeek}, ${e().day} ${(()=>{let t="";switch(e().month){case"01":t="Jan";break;case"02":t="Feb";break;case"03":t="Mar";break;case"04":t="Apr";break;case"05":t="May";break;case"06":t="Jun";break;case"07":t="Jul";break;case"08":t="Aug";break;case"09":t="Sep";break;case"10":t="Oct";break;case"11":t="Nov";break;case"12":t="Dec"}return{monthName:t}})().monthName} ${e().year}`}})(),a=(()=>{const a=t=>{e.push(t)},r=e=>{const t=document.querySelector("#main"),a=document.createElement("div");a.classList.add("task-item",e.prior),a.innerHTML=`\n            <div class="check-btn"></div>\n            <div class="main-task-infos">\n                <div class="task-title">${e.title}</div>\n                <div class="details">${e.desc}</div>\n            </div>\n            <div class="date">${e.date}</div>\n            <div class="delete-btn"></div>\n        `,a.objectAssign=e,t.prepend(a)},s=()=>{document.querySelector("#main").innerHTML=""};return{openTaskForm:()=>{document.querySelector(".new-overlay").classList.add("show-task-form")},closeTaskForm:()=>{document.querySelector(".new-overlay").classList.remove("show-task-form")},addTaskToList:r,displayTasks:e=>{e.forEach((e=>{r(e),a(e)})),console.log(e)},deleteTask:(t,a)=>{document.querySelector("#main").removeChild(t),e.splice(e.indexOf(a),1)},filterTodayTasks:()=>{const a=e.filter((e=>e.date===t.getCurrentDate().currentDate));var c;s(),(c=a).forEach((e=>{r(e)})),console.log(c)},clearTaskDisplay:s,storeTask:a}})();document.querySelector("form").addEventListener("submit",(e=>{e.preventDefault();const t={title:document.querySelector("#new-todo--title").value,desc:document.querySelector("#new-todo--description").value,date:document.querySelector("#new-todo--date").value,prior:document.querySelector('input[type="radio"]:checked').value};a.addTaskToList(t),a.storeTask(t),a.closeTaskForm()})),document.querySelectorAll(".task-item").forEach((e=>{e.addEventListener("click",(e=>{console.log(e)}))})),document.querySelector(".new-task-btn").addEventListener("click",(()=>a.openTaskForm())),document.querySelector("#close-form-btn").addEventListener("click",(()=>a.closeTaskForm())),document.addEventListener("click",(e=>{e.target.classList.contains("delete-btn")&&a.deleteTask(e.target.parentNode,e.target.parentNode.objectAssign)})),document.querySelector(".new-list-btn").addEventListener("click",(e=>console.log(e.target))),document.querySelector("#my-day-tasks").addEventListener("click",(()=>{a.filterTodayTasks()})),a.displayTasks([{title:"test 1",desc:"test 1",date:"2022-05-24",prior:"priority-low"},{title:"test 2",desc:"test 2",date:"2022-06-25",prior:"priority-high"},{title:"test 3",desc:"test 3",date:"2022-05-24",prior:"priority-low"},{title:"test 4",desc:"test 4",date:"2022-05-28",prior:"priority-medium"}])})();