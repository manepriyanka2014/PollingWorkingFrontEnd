function showVoteCtrl($http, $timeout, $location, $rootScope){
ctrl = this;
ctrl.questionDetails = {
   questionId:0,
   question: "",
   options: []
};

ctrl.$onInit = function () {
    console.log("---inside on show vote init---");
    getLastQuestion();
};

 ctrl.redirectToAddNewUserPage = function() {
        $location.path('/addNewUser');
     };

     ctrl.redirectToAddQuestionPage = function() {
                  $location.path('/addQuestions');
     };

     ctrl.redirectToAdminPage = function() {
                  $location.path('/admin');
     };


     ctrl.redirectToLoginPage = function() {
             $location.path('/login');
          };

 ctrl.redirectToDeleteQuestionPage = function() {
             $location.path('/login');
          };


function getLastQuestion()
{
  console.log(".....inside get getLastQuestion ..........");
  $http({
          method: "GET",
          url: "http://localhost:8080/UserMyBatis/getLastQuestion"
        }).then(
          function successCallback(response) {
            console.log("response from backend---------->", response);
            ctrl.questionDetails = response.data;
            displayVoteCount();
          },
          function errorCallback(response) {
            console.log(response.statusText); //http status code response
          }
        );

}
function displayVoteCount() {
let options= ctrl.questionDetails.options;
let totalVotes = 0;
  for(let i=0 ; i< options.length; i++)
  {
     totalVotes = totalVotes+ options[i].noOfVotes;
  }

  // calculate vote percentage
  for(let j=0 ; j< options.length; j++)
  {
     if (options[j].noOfVotes == 0){
         options[j].votePercentage = 0;
     }
     else{
         options[j].votePercentage = (options[j].noOfVotes *100 / totalVotes ).toFixed(2);
     }
  }

}

//function getVoteCount() {
//console.log(".....inside get getVoteCount ..........");
//      $http({
//        method: "GET",
//        url: "http://localhost:8080/UserMyBatis/getVoteCount"
//      }).then(
//        function successCallback(response) {
//          console.log("response from backend---------->", response);
//          ctrl.voteCount = response.data;
//          calculateVotePercentage();
//        },
//        function errorCallback(response) {
//          console.log(response.statusText); //http status code response
//        }
//      );
//}

}
angular.module("polling").component("showVote", {
  templateUrl: "views/show-vote.html",
  controller:  showVoteCtrl,
  controllerAs: "ctrl",
});