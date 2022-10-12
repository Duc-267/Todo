const projectList = document.querySelector(".project-container__list")
let projects = JSON.parse(localStorage.getItem(KEY_PROJECT)) || [];
let userProjects = JSON.parse(localStorage.getItem(KEY_USER_PROJECT)) || []

let idCounter = Math.floor(Math.random() * 100000);


const renderProject = function () {
    let ListItem = "";
    if (projects) {
        projects.forEach((project, index) => {
        ListItem += `
        <div class="project__item" data-id="${project.id}">
          <div class="item__header">
              <span class="item__id">${index + 1}</span>
                <p class="item__title">${project.name}</p>
          </div>
        </div>`;
      }); 
    }
    projectList.innerHTML = ListItem;
  };
const addProject = function(){
    const newProjectContent =
    document.getElementsByClassName("new-project__content")[0].value;
  if (newProjectContent != "") {
    projects.push({ id: idCounter, name: newProjectContent,listMember:[] });
    //email chưa set
    userProjects.push({ email: "this email", projectId:idCounter++ ,isAdmin:true });
    document.getElementsByClassName("new-project__content")[0].value = "";
    localStorage.setItem(KEY_PROJECT, JSON.stringify(projects));
    localStorage.setItem(KEY_USER_PROJECT, JSON.stringify(userProjects));
    location.reload();
  }
  renderProject()
}
renderProject();