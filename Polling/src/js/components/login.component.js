function loginCtrl($http, $timeout, $location, $rootScope){
ctrl = this;

ctrl.loginDetails = {
    email: "",
    password: "",
  };

ctrl.$onInit = function () {
    console.log("---inside on login init---");
};

ctrl.loginUser = function () {
console.log(ctrl.loginDetails.email);
$http({
      method: "POST",
      url: "http://localhost:8080/UserMyBatis/loginPollUser",
      data: ctrl.loginDetails,
    }).then(
      function successCallback(response) {
      console.log(response.statusText); //http status code response
      console.log("email:"+ response.data.email);
      if(response && response.data && response.data.email == "admin@gmail.com" && response.data.password == "admin")
       {
          ctrl.successUserLoggedInMessage = "User logged in successfully";
          ctrl.successUserLoggedInMessageBool = true;
          $timeout(function () {
             ctrl.successUserLoggedInMessageBool = false;
             console.log("redirect to Admin User ");
             $location.path('/admin');
          }, 200);
       }
       else if(response && response.data && response.data.email == ctrl.loginDetails.email && response.data.password == ctrl.loginDetails.password)
       {
          ctrl.successUserLoggedInMessage = "User logged in successfully";
          ctrl.successUserLoggedInMessageBool = true;
          $timeout(function () {
             ctrl.successUserLoggedInMessageBool = false;
             console.log("redirect to save vote User "+response.data.userId);
             let userId = response.data.userId;
             $location.path('/saveVote/'+ userId);
          }, 200);
       }

      },
    function errorCallback(response) {
     console.log(response.statusText); //http status code response
         ctrl.failedUserLoggedInMessage = "Invalid user credentials.";
         ctrl.failedUserLoggedInMessageBool = true;
         $timeout(function () {
              ctrl.failedUserLoggedInMessageBool = false;
         }, 3000);
    }
    );
  };
}


angular.module("polling").component("login", {
  templateUrl: "views/login.html",
  controller: loginCtrl,
  controllerAs: "ctrl",
});
