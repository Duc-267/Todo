const projectList = document.querySelector(".project-container__list");
// let projects = JSON.parse(localStorage.getItem("project")) || [];
let idCounter = Math.floor(Math.random() * 100000);
// const currentUser = JSON.parse(localStorage.getItem(KEY_CURRENT_USER));
// document.getElementById("id").innerHTML = currentUser.id


const currentUser = {
  name: 'Huynh Anh Duy',
  email: '1@gmail.com'
} 

localStorage.setItem(KEY_CURRENT_USER, JSON.stringify(currentUser));
const currentUserInfo = JSON.parse(localStorage.getItem(KEY_CURRENT_USER));
document.getElementById("name").innerHTML = currentUserInfo.name
document.getElementById("email").innerHTML = currentUserInfo.email

var user_project = [
  {
    email: 'nghia@gmail.com',

    projectId: 1,
    
    isAdmin: false ,
  },
  {
    email: 'admin@gmail.com',

    projectId: 3,
    
    isAdmin: true ,
  },
  {
    email: "nghia@gmail.com",

    projectId: 2,
    
    isAdmin: false ,
  },
  {
    email: '1@gmail.com',

    projectId: 1,
    
    isAdmin: true ,
  },
  {
    email: '1@gmail.com',

    projectId: 2,
    
    isAdmin: false ,
  },
  {
    email: "nghia@gmail.com",

    projectId: 3,
    
    isAdmin: false ,
  }
]
localStorage.setItem(KEY_USER_PROJECT, JSON.stringify(user_project));

let projects = [];

const filterProject = function(KEY_USER_PROJECT) {
  const userProject = JSON.parse(localStorage.getItem(KEY_USER_PROJECT));

  userProject.forEach ((element) => {
    if (element.email === currentUserInfo.email) {
      projects.push(element);
    }
  })
}


const renderProject = function () {
  filterProject(KEY_USER_PROJECT);
  let ListItem = "";

  if (projects) {
    projects.forEach((project, index) => {
      if (project.isAdmin) {
        ListItem += `
        <div class="project__item" data-id="${project.projectId}">
          <div class="item__header">
            <span class="item__id">${index + 1}</span>
            <p class="item__title">Project no.${project.projectId} (<strong>Admin</strong>)</p>
          </div>
        </div>`;
      } else {
        ListItem += `
        <div class="project__item" data-id="${project.projectId}">
          <div class="item__header">
              <span class="item__id">${index + 1}</span>
                <p class="item__title">Project no.${project.projectId}</p>
          </div>
        </div>`;
      }
    })
  }
  projectList.innerHTML = ListItem;
};

renderProject();

const addProject = function(){
    const newTodoContent =
    document.getElementsByClassName("new-project__content")[0].value;
  if (newTodoContent != "") {
    projects.push({ id: idCounter++, content: newTodoContent });
    document.getElementsByClassName("new-project__content")[0].value = "";
    localStorage.setItem("project", JSON.stringify(projects));
    location.reload();
  }
  renderProject()
}
// renderProject();




// if (userProject.filter(item => item.email == JSON.stringify(currentUser.email))) {
//   // console.log(userProject.filter(item => item.projectId))
// }
// console.log(userProject.filter(item => item.email === currentUser.email))
// console.log("Your ProjectId is" + ' ' + userProject.filter(item => item.email === currentUser.email).map(item => item.projectId).join(' and '))


