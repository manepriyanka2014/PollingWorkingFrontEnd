function addPollUserCtrl($http, $timeout,$location) {
  ctrl = this;
ctrl.userDetails = {
        userName: "",
        email: "",
        password: "",
        vote: ""
};
ctrl.userList = [];
ctrl.questionDetails = {
        question: "",
        options: []
  };

ctrl.questionList = [];
ctrl.$onInit = function () {
    console.log("inside on addUser init");
    localStorage.clear();
    getAllUser();
  };

   ctrl.redirectToAdminPage = function() {
               $location.path('/admin');
            };

//ctrl.redirectToAddNewUserPage = function() {
//          ctrl.addPollUser();
//        $location.path('/addNewUser');
//     };
  // calls the REST API to save user details
    ctrl.addPollUser = function () {
    console.log("inside addPollUser", ctrl.userDetails);
$http({
      method: "POST",
      url: "http://localhost:8080/UserMyBatis/createUser1",
      data: ctrl.userDetails,
    }).then(
    function successCallback(response) {
            ctrl.successUserAddedMessage = "User added successfully";
            ctrl.successUserAddedMessagebool = true;
            $timeout(function () {
                      ctrl.successUserAddedMessagebool = false;
                      getAllUser();
//                      $location.path('/admin');
                    }, 1000);
                    console.log("response from backend---------->", response);
                  },
                  function errorCallback(response) {
                          console.log(response.statusText); //http status code response
                          ctrl.failedUserAddedMessage = "user does not added successfully";
                          ctrl.failedUserAddedMessagebool = true;
                          $timeout(function () {
                            ctrl.failedUserAddedMessagebool = false;


                          }, 2000);
                  }
          );
    };


    function getAllUser() {
              console.log(".....inside get all User..........");
              $http({
                method: "GET",
              url: "http://localhost:8080/UserMyBatis/showListOfUser1",
              }).then(
                function successCallback(response) {
                  console.log("response from backend---------->", response.data);
                  ctrl.userList = response.data;
                  console.log(ctrl.userList);
    //              localStorage.setItem('question', JSON.stringify(ctrl.questionList));
    //              console.log(localStorage.getItem('question'));
    //              question = localStorage.getItem('question') ? JSON.parse(localStorage.getItem('question')) : [];
                },
                function errorCallback(response) {
                  console.log(response.statusText); //http status code response
                }
              );
        };

// calls the REST API to delete user details
  ctrl.deleteUser = function (userId) {
    console.log("Delete user", userId);
    $http({
      method: "DELETE",
      url: "http://localhost:8080/UserMyBatis/deleteUser1/" +userId
    }).then(
      function successCallback(response) {
        console.log("response from backend---------->", response);
        if (ctrl.userList != null && ctrl.userList.length > 0) {
            // iterate over userList
             ctrl.userList.forEach((user, index) => {
             // remove the entry from userList which is deleted from table
             if (user.userId === userId) {
                    ctrl.userList.splice(index, 1);
             }
             });
        }
        getAllQuestion(userId);
      },
    );
  };


function getAllQuestion(userId) {
          console.log(".....inside get all Question..........");
          $http({
            method: "GET",
          url: "http://localhost:8080/UserMyBatis/listOfQuestion",
          }).then(
            function successCallback(response) {
              console.log("response from backend---------->", response.data);
              ctrl.questionList = response.data;
              console.log(ctrl.questionList);
              let questionList = ctrl.questionList;
              if(questionList && questionList.length >0 ){
                    for(let i=0 ; i< questionList.length; i++){
                        let options = questionList[i].options;
                        for(let j=0 ; j< options.length; j++){
                            if(options[j].votedUserList && options[j].votedUserList.length >0 && options[j].votedUserList.includes(userId)) {
                                options[j].noOfVotes--;
                                // remove entry of old voted entry
                                const index = options[j].votedUserList.indexOf(userId);
                                if (index > -1) {
                                options[j].votedUserList.splice(index, 1);
                                }
                            }
                        }
                        updateVote(questionList[i]);
                    }
                }
            },
            function errorCallback(response) {
              console.log(response.statusText); //http status code response
            }
          );
    }

function updateVote(questionDetails) {
        console.log("inside updateVote", questionDetails);
        $http({
          method: "PUT",
          url: "http://localhost:8080/UserMyBatis/updateOptionDetails",
          data: questionDetails
        }).then(
          function successCallback(response) {
            console.log("response from backend---------->", response);
          },
          function errorCallback(response) {
            console.log(response.statusText); //http status code response
          }
        );
 }

 }

angular.module("polling").component("addUser", {
  templateUrl: "views/add-user.html",
  controller: addPollUserCtrl,
  controllerAs: "ctrl"
});
