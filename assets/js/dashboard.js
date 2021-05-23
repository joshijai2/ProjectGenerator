function welcome() {
  $("#welcome").append("Welcome " + sessionStorage.getItem("name") + " " + sessionStorage.getItem("uid"));
}

function viewProject(uuid){
  
}

function display(projects, page = 1) {
  welcome();
  let n = projects.length;
  let start_index = 6 * (page - 1);
  let end_index = Math.min(start_index + 5, n - 1);

  let rows = Math.ceil((end_index - start_index) / 2)

  for (let row = 1; row <= rows; row++) {
    $('#projects').append('<div id="row' + row + '" class="row"></div>');

    let start = start_index + 3 * (row - 1);
    let end = Math.min(start + 2, n - 1);

    console.log('start :>> ', start);

    for (let i = start; i <= end; i++) {
    
      $("#row" + row).append(
        `
        <div class="col-lg-4 d-flex flex-column justify-content-center" style="padding: 3%;">
          <div id="` + i + `" class="card bg-card" onclick="viewProject(` + projects[i]["uuid"] + `)" style="width: 18rem;">
            <div class="card-body">
              <h4 class="card-title">`+ projects[i]["title"] + `</h4>
              <h5 class="card-text">`+ projects[i]["domain"]+`</h5>
              <h5 class="card-text">`+ projects[i]["faculty"]+`</h5>
              <a href="viewproject.html" class="btn btn-card">View Project</a>
            </div>
          </div>
          </div>
  
      
        `
      );
    }
  }
};

function loadProjects() {
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log('this.responseText :>> ', this.responseText);
      console.log('this.status :>> ', this.status);

      if (this.status >= 200 && this.status < 400) {
        // The request has been completed successfully
        var data = JSON.parse(this.responseText);
        sessionStorage.setItem("projects", data);
        sessionStorage.setItem("page", 1);
        let n = projects.length;
        let pages = Math.ceil(n / 6);
        display(data);

      } else {
        alert("Error in loading projects! Please reload.");
      }
    }
  });

  xhr.open("GET", "https://projenarator.herokuapp.com/projects/new/");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Authorization", sessionStorage.getItem("Token"));

  xhr.send();
};

window.onpaint = loadProjects();

  // display(data, page)
