const projectList = document.querySelector(".project-container__list");
let projects = JSON.parse(localStorage.getItem("project")) || [];
let idCounter = Math.floor(Math.random() * 100000);
const currentUser = JSON.parse(localStorage.getItem(KEY_CURRENT_USER));
document.getElementById("name").innerHTML = currentUser.fullName
document.getElementById("id").innerHTML = currentUser.id

 console.log(currentUser.email)


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

  var user_project = [
    {
        email: 'nghia@gmail.com',

        projectId: 1,
        
        isAdmin: true ,
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
localStorage.setItem('user-project', JSON.stringify(user_project));
const userProject = JSON.parse(localStorage.getItem("user-project"));

// if (userProject.filter(item => item.email == JSON.stringify(currentUser.email))) {
//   // console.log(userProject.filter(item => item.projectId))
// }
console.log(userProject.filter(item => item.email === currentUser.email))
console.log("Your ProjectId is" + ' ' + userProject.filter(item => item.email === currentUser.email).map(item => item.projectId).join(' and '))


