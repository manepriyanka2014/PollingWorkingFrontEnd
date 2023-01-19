//function addPollCtrl($http, $timeout,$location) {
//  ctrl = this;
//ctrl.userDetails = {
//        userName: "",
//        email: "",
//        password: "",
//        vote: ""
//};
//ctrl.$onInit = function () {
//    console.log("inside on addUser init");
//    localStorage.clear();
//    //getPollUser();
//  };
//
//  // calls the REST API to save user details
//    ctrl.addPollUser = function () {
//    console.log("inside saveUserDetails", ctrl.userDetails);
//$http({
//      method: "POST",
//      url: "http://localhost:8080/UserMyBatis/createUser1",
//      data: ctrl.userDetails,
//    }).then(
//    function successCallback(response) {
//            ctrl.successUserAddedMessage = "User added successfully";
//            ctrl.successUserAddedMessagebool = true;
//            $timeout(function () {
//                      ctrl.successUserAddedMessagebool = false;
//                      $location.path('/dashboard');
//                    }, 1000);
//                    console.log("response from backend---------->", response);
//                  },
//                  function errorCallback(response) {
//                          console.log(response.statusText); //http status code response
//                          ctrl.failedUserAddedMessage = "user does not added successfully";
//                          ctrl.failedUserAddedMessagebool = true;
//                          $timeout(function () {
//                            ctrl.failedUserAddedMessagebool = false;
//
//
//                          }, 2000);
//                  }
//          );
//    };
//
// }
//
//angular.module("polling").component("addPoll", {
//  templateUrl: "views/add-poll.html",
//  controller: addPollCtrl,
//  controllerAs: "ctrl"
//});
