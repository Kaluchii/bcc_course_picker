var page = require('webpage').create();
var fs = require('fs');
var path = 'courses.json';
page.onConsoleMessage = function(msg) {
    if (msg == '') {
        console.log('Error: "could not load the course"');
    } else {
        console.log('New course: ' + msg);
    }
};
page.open('https://www.bcc.kz/about/kursy-valyut/', function(status) {
    console.log("Status: " + status);
    if (status){
        setTimeout(function () {
            var courses = page.evaluate(function() {
                var courseObj = { courses: {} };
                courseObj.courses.usd = $('.bcc_fulla .s_table_over:nth-child(5) tbody tr:nth-child(3) td:nth-child(3)').text();
                console.log(courseObj.courses.usd);
                return courseObj;
            }, 'courses');
            if (courses.courses.usd == '') {
                phantom.exit();
            } else {
                fs.write(path, JSON.stringify(courses, null, 2), 'w');
                phantom.exit();
            }
        }, 5000);
    } else {
        phantom.exit();
    }
});
