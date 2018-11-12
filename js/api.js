API_RECORD = "https://52.221.206.136:8080/record";

function getFormatNumber(number) {
    return number < 10 ? "0" + number : number;
}

function today() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return year + "-" + month + "-" + getFormatNumber(day);
}

function getTime(timestamp) {
    let date = new Date(timestamp);
    let hour = date.getHours();
    let minute = date.getMinutes();
    return getFormatNumber(hour) + ":" + getFormatNumber(minute);
}

function getCurrentTimestamp() {
    let date = new Date();
    return date.getTime();
}

function getRecords(date, callback) {
    let request = new XMLHttpRequest();
    request.open('GET', API_RECORD + "/date/" + date);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            // console.log(request.responseText);
            let records = JSON.parse(request.responseText);
            callback(records);
        } else {
            console.log(request.statusText);
        }
    };
    request.send();
}

function showRecordsView(records) {
    let html = "";
    for (let i in records) {
        let record = records[i];

        let element_card_start = "<div class=\"card bg-light\">";
        let element_card_end = "</div>";

        let element_card_body_start = "<div class=\"card-body\">";
        let element_card_body_end = "</div>";

        let element_row_start = "<dl class=\"row\">";
        let element_row_end = "</dl>";

        let element_time = "<dt class=\"col-sm-3\">" + getTime(parseInt(record['timestamp'])) + "</dt>";
        let element_content = "<dd class=\"col-sm-9\">" + record['content'] + "</dd>";

        let element_br = "<br />";

        html += element_card_start +
                        element_card_body_start +
                            element_row_start +
                                element_time +
                                element_content +
                            element_row_end +
                        element_card_body_end +
                    element_card_end +
                    element_br;

    }
    let container = document.getElementById('record-list');
    container.innerHTML = html;
}

function showRecordsToday() {
    let element_input = document.getElementById("header-subtitle");
    element_input.setAttribute('value', today());
    getRecords(today(), function (records) {
        showRecordsView(records);
    });
}

function onDateChange(dateText) {
    console.log(dateText);
    getRecords(dateText, function (records) {
        showRecordsView(records);
    });
}

function punchClock() {
    let element_content = document.getElementById("record_content");
    let content = element_content.value;
    console.log(content);
    let request = new XMLHttpRequest();
    request.open('POST', API_RECORD);
    request.setRequestHeader("Content-Type", "application/json;");
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            alert("Punch Success!")
            window.location.reload();
        } else {
            console.log(request.statusText);
        }
    };
    let data = {'timestamp': getCurrentTimestamp(), 'content': content};
    request.send(JSON.stringify(data));
}

$(document).ready(function(){
    $('.datepicker').datepicker({
        format: "yyyy-mm-dd"
    });
    showRecordsToday();
});