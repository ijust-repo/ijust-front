var SubmissionServices = function () {
    var langObj = {
        'Python27' : 'python',
        'Python37' : 'python',
        'Cpp11' : 'cpp',
        'Cpp' : 'cpp',
        'Java8' : 'java'
    };
    var getLang = function (lang) {
        return langObj[lang];
    };

    return{
        getLang:getLang
    }
};

submissionModule.factory("SubmissionServices" , SubmissionServices ) ;
