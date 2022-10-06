const projectList = document.querySelector(".project-container__list");
let projects = JSON.parse(localStorage.getItem("project")) || [];
let idCounter = Math.floor(Math.random() * 100000);


const renderProject = function () {
    let ListItem = "";
    if (projects) {
        projects.forEach((project, index) => {
        ListItem += `
        <div class="project__item" data-id="${project.id}">
          <div class="item__header">
              <span class="item__id">${index + 1}</span>
                <p class="item__title">${project.content}</p>
          </div>
        </div>`;
      });
    }
    projectList.innerHTML = ListItem;
  };
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
renderProject();