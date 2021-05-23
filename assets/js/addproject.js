
function isEdit(){
    if (sessionStorage.getItem("isEdit")==1 && sessionStorage.getItem("editUuid")!=null){
        $("#add").innerHTML="Edit My Project";
        $("#addprj").innerHTML="Edit Project";
        $("addprj").attr("id")="editprj";

        let uuid = sessionStorage.getItem("editUuid");
        let data = sessionStorage.getItem("projects");
        for (let i in data) {
            if (data[i]["uuid"] == uuid) {

                document.addnew.title.value = data[i]["title"];
                document.addnew.sdate.value = data[i]["start_date"];
                document.addnew.edate.value = data[i]["end_date"];
                document.addnew.link.value = data[i]["link"];
                document.addnew.sname.value = data[i]["author"]["name"];
                document.addnew.regno.value = data[i]["author"]["regno"];
                document.addnew.faculty.value = data[i].faculty;
                document.addnew.fid.value = data[i].facultyId;
                document.addnew.ccode.value = data[i].course_code;
                document.addnew.cname.value = data[i].course_name;
                document.addnew.duration.value = data[i].duration;
                document.addnew.desc.value = data[i].description;
                document.addnew.domain.value = data[i].domain;
            }
        }

    }
}
window.onpaint = isEdit();


function retrieveData() {

    var data = {
        "title": document.addnew.title.value,
        "start_date": document.addnew.sdate.value,
        "end_date": document.addnew.edate.value,
        "link": document.addnew.link.value,
        "author": '{"name" : "' + document.addnew.sname.value + '","regno" : "' + document.addnew.regno.value + '"}',
        "faculty": document.addnew.faculty.value,
        "facultyId": document.addnew.fid.value,
        "course_code": document.addnew.ccode.value,
        "course_name": document.addnew.cname.value,
        "duration": document.addnew.duration.value,
        "description": document.addnew.desc.value
        // "domain" :document.addnew.domain.value,
    };

    console.log(data);

    let error = "";
    let title = /^[A-Za-z0-9 ]+$/;
    let regno = /^[0-9]{2}[A-Z]{3}[0-9]{4}$/;
    let letters = /^[A-Za-z ]+$/;
    let course_code = /^[A-Za-z]{3}[0-9]{4}$/;
    let duration = /^[0-9]+$/;

    let flag = 0

    if (!title.test(data['title'])) {
        error += ">> Enter proper name of Project! (No Special Characters)\n";
        flag = 1;
    }

    let snames = document.addnew.sname.value.split(",");
    for (let i in snames) {
        if (!letters.test(snames[i].trim())) {
            error += ">> Student Name should consist of Alphabets and separated by commas!\n";
            flag = 1;
            break;
        }
    }

    let regs = document.addnew.regno.value.split(",");
    for (let i in regs) {
        if (!regno.test(regs[i].trim())) {
            error += ">> Registration Number should be of the type 20XXX9999 and separated by commas!\n";
            flag = 1;
            break;
        }
    }

    if (!letters.test(data['faculty'])) {
        error += ">> Faculty Name should consist of !\n";
        flag = 1;
    }

    if (!course_code.test(data['course_code'])) {
        error += ">> Course Code should be of the format XXX1111!\n";
        flag = 1;
    }

    if (!letters.test(data['course_name'])) {
        error += ">> Course Name should not contain any special characters or Numbers!\n";
        flag = 1;
    }

    if (!duration.test(data['duration'])) {
        error += ">> Duration should contain numbers (in months)!\n";
        flag = 1;
    }

    if (flag) {
        return alert(error);
    }

    return data;
}

$("#addprj").on("click", function () {
    sessionStorage.setItem("isProjectAdded", 0);
    let data = retrieveData();
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log('this.responseText :>> ', this.responseText);
            console.log('this.status :>> ', this.status);

            if (this.status >= 200 && this.status < 400) {
                // The request has been completed successfully
                var data = JSON.parse(this.responseText)
                sessionStorage.setItem("isProjectAdded", 1);

                window.location.replace('dashboard.html');
            } else {
                alert("Error in adding project");
            }
        }
    });

    xhr.open("POST", "https://projenarator.herokuapp.com/projects/new/");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", sessionStorage.getItem("Token"));
    xhr.send(JSON.stringify(data));
});

$("#editprj").on("click", function () {
    let data = retrieveData();

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log('this.responseText :>> ', this.responseText);
            console.log('this.status :>> ', this.status);

            if (this.status >= 200 && this.status < 400) {
                // The request has been completed successfully
                var data = JSON.parse(this.responseText)
                window.location.replace('dashboard.html');
            } else {
                alert("Error in adding project");
            }
        }
    });

    xhr.open("POST", "https://projenarator.herokuapp.com/projects/new/");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", sessionStorage.getItem("Token"));
    xhr.send(JSON.stringify(data));
});