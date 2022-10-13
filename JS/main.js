const projectList = document.querySelector(".project-container__list")
const projects = JSON.parse(localStorage.getItem(KEY_PROJECT)) || [];
const currentUser = JSON.parse(localStorage.getItem(KEY_CURRENT_USER));
const userProjects = JSON.parse(localStorage.getItem(KEY_USER_PROJECT)) || [];
const myProjects = userProjects.filter(item => item.email == currentUser.email);
const items = document.getElementsByClassName('project__item')

let idCounter = Math.floor(Math.random() * 100000);

document.getElementById("name").innerHTML = currentUser.fullName;
document.getElementById("email").innerHTML = currentUser.email;

const navigateTodo = function (projectId) {
  console.log(projectId);
}

const findContent = function (projectId) {
  for (project of projects) {
    if (project.id == projectId) {
      return project.name
    }
  }
}

const renderProject = function () {
  let ListItem = "";
  if (myProjects) {
    myProjects.forEach((myProject, index) => {
      if (myProject.isAdmin) {
        ListItem += `
        <div class="project__item" data-id="${myProject.projectId} ">
          <div class="item__header">
            <span class="item__id">${index + 1}</span>
            <p class="item__title">${findContent(myProject.projectId)} (<strong>Admin</strong>)</p>
          </div>
        </div>`;
      } else {
        ListItem += `
        <div class="project__item" data-id="${myProject.projectId}">
          <div class="item__header">
              <span class="item__id">${index + 1}</span>
                <p class="item__title">${findContent(myProject.projectId)}</p>
          </div>
        </div>`;
      }
    })
  }
  projectList.innerHTML = ListItem;
};

const addProject = function(){
    const newProjectContent = document.getElementsByClassName("new-project__content")[0].value;
  if (newProjectContent != "") {
    projects.push({ id: idCounter, name: newProjectContent,listMember:[] });
    userProjects.push({ email: currentUser.email, projectId:idCounter ,isAdmin:true });
    document.getElementsByClassName("new-project__content")[0].value = "";
    localStorage.setItem(KEY_PROJECT, JSON.stringify(projects));
    localStorage.setItem(KEY_USER_PROJECT, JSON.stringify(userProjects));
    location.reload();
  }
  renderProject()
}

renderProject();

for (let i = 0; i < items.length; i++) {
  items[i].addEventListener('click', () => {
    var url = new URL("http:/127.0.0.1:5500//HTML/todo.html?projectId=");
    window.location = url + items[i].dataset.id;
  })
}