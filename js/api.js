function today() {
    let date = new Date();
    let today = [];
    today['year'] = date.getFullYear();
    today['month'] = date.getMonth() + 1;
    today['day'] = date.getDate();
    return today;
}

function getSubtitle(date) {
    return date['year'] + "-" + date['month'] + "-" + (date['day'] < 10 ? "0" + date['day'] : date['day'])
}
element = document.getElementById("header-subtitle");
element.innerHTML = getSubtitle(today());

function getRecords(date) {
    let request = new XMLHttpRequest();
    request.open('GET', date['year'] + "/" + date['month'] + "/" + date['day']);
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            console.log(request.responseText);
        } else {
            console.log(request.statusText);
        }
    };
    request.send();
}

getRecords(today());