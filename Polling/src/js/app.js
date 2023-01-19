angular.module('polling', [
    'ngRoute'
])
.config([
    '$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/loginPollUser', {
                       template: '<login></login>'
                    })

            .when('/admin', {
                                   template: '<admin></admin>'
                                })

             .when('/addQuestions', {
                                       template: '<add-question></add-question>'
                              })

              .when('/addNewUser', {
                         template: '<add-user></add-user>'
                      })

              .when('/addPollOption', {
                                       template: '<add-poll></add-poll>'
                                    })

              .when('/saveVote/:userId', {
                          template: '<save-vote></save-vote>'
                     })

              .when('/showVote', {
                           template: '<show-vote></show-vote>'
                     })


            .otherwise({ redirectTo: '/loginPollUser' });
     }
    ])
