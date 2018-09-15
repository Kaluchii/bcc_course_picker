var page = require('webpage').create();
var fs = require('fs');
var path = '/var/www/bcc_course_picker/courses.json';
var logPath = '/var/www/bcc_course_picker/status.log';
page.open('https://www.bcc.kz/about/kursy-valyut/', function(status) {
    var now = new Date();
    fs.write(logPath, "Status: " + status + '.  ', 'w+');
    if (status){
        setTimeout(function () {
            var courses = page.evaluate(function() {
                var courseObj = { courses: {} };
                courseObj.courses.usd = $('.bcc_full .s_table_over:nth-child(5) tbody tr:nth-child(2) td:nth-child(4)').text();
                return courseObj;
            }, 'courses');
            if (courses.courses.usd == '') {
                fs.write(logPath, 'Error: "could not load the course"' + "   " + now + '\n', 'w+');
                phantom.exit();
            } else {
                fs.write(logPath, now + '\n', 'w+');
                fs.write(path, JSON.stringify(courses, null, 2), 'w');
                phantom.exit();
            }
        }, 5000);
    } else {
        fs.write(logPath, now + '\n', 'w+');
        phantom.exit();
    }
});
