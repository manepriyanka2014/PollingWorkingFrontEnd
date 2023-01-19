function addQuestionCtrl($http, $timeout,$location) {
  ctrl = this;
  ctrl.questionDetails = {
        question: "",
        options: []
  };

  ctrl.questionList = [];
  ctrl.$onInit = function () {
    console.log("inside on addQuestion init");
        getAllQuestion();

  };

 ctrl.addOption = function () {
    console.log("inside on addOption");
    let optionsLength = ctrl.questionDetails.options.length;
    let option = {
     optionName : "",
     optionCode : optionsLength +1,
     order: optionsLength +1
    }
    ctrl.questionDetails.options.push(option);
    console.log(ctrl.questionDetails.options[0]);
  };

  ctrl.removeOption = function (option) {
     console.log("inside on removeOption");
     let delOptionIndex = option.order-1;
     let options = ctrl.questionDetails.options;
     for(let i = delOptionIndex+1  ; i< options.length ; i++ )
     {
         options[i].optionCode = options[i].optionCode-1;
         options[i].order = options[i].order-1;
     }
     ctrl.questionDetails.options.splice(option.order-1,1);
  };


function getAllQuestion() {
          console.log(".....inside get all Question..........");
          $http({
            method: "GET",
          url: "http://localhost:8080/UserMyBatis/listOfQuestion",
          }).then(
            function successCallback(response) {
              console.log("response from backend---------->", response.data);
              ctrl.questionList = response.data;
              console.log(ctrl.questionList);
//              localStorage.setItem('question', JSON.stringify(ctrl.questionList));
//              console.log(localStorage.getItem('question'));
//              question = localStorage.getItem('question') ? JSON.parse(localStorage.getItem('question')) : [];
            },
            function errorCallback(response) {
              console.log(response.statusText); //http status code response
            }
          );
    }

  ctrl.addQuestion = function() {
      console.log("inside on addQuestion",ctrl.questionDetails);
      $http({
            method: "POST",
            url: "http://localhost:8080/UserMyBatis/question",
            data: ctrl.questionDetails,
          }).then(
          function successCallback(response) {
          console.log("response from backend---------->", response);
          ctrl.questionDetails = {};
          getAllQuestion();
//          $location.path('/login');
          },
          function errorCallback(response) {
            console.log(response.statusText); //http status code response
          }
          );
  };

  ctrl.showVote = function() {
  console.log("inside showVote");
  };

ctrl.redirectToAdminPage = function() {
               $location.path('/admin');
            };

    ctrl.redirectToLoginPage = function() {
               $location.path('/login');
            };


 // calls the REST API to delete question details
  ctrl.deleteQuestion = function (questionId) {
    console.log("Delete question", questionId);
    $http({
      method: "DELETE",
      url: "http://localhost:8080/UserMyBatis/deleteQuestion/" +questionId
    }).then(
      function successCallback(response) {
        console.log("response from backend---------->", response);
        if (ctrl.questionList != null && ctrl.questionList.length > 0) {
            // iterate over questionList
             ctrl.questionList.forEach((question, index) => {
             // remove the entry from questionList which is deleted from table
             if (question.questionId === questionId) {
                    ctrl.questionList.splice(index, 1);
             }
             });
        }
      },
    );
  };
}

angular.module("polling").component("addQuestion", {
  templateUrl: "views/add-question.html",
  controller: addQuestionCtrl,
  controllerAs: "ctrl"
});
