 function adminCtrl( $location){
 ctrl = this;
 ctrl.$onInit = function () {
     console.log("---inside on admin init---");
 };



 ctrl.redirectToAddNewUserPage = function() {
        $location.path('/addNewUser');
     };

     ctrl.redirectToAddQuestionPage = function() {
                  $location.path('/addQuestions');
               };
//
     ctrl.redirectToLoginPage = function() {
             $location.path('/login');
          };

          ctrl.redirectToShowVotePage = function() {
                  $location.path('/showVote');
               };

 ctrl.redirectToDeleteQuestionPage = function() {
             $location.path('/login');
          };

}


angular.module("polling").component("admin", {
  templateUrl: "views/admin.html",
  controller: adminCtrl,
  controllerAs: "ctrl",
});