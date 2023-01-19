function saveVoteCtrl($http, $timeout, $location, $routeParams){
ctrl = this;
ctrl.isAlreadyVoted = false;
ctrl.questionDetails = {
   questionId:0,
   question: "",
   options: []
};
ctrl.userData = {
    userId:"",
    email: "",
    password: "",
    userName:"",
    vote:""
  };

ctrl.$onInit = function () {
    console.log("---inside on save vote init---");
    console.log($routeParams.userId);
    getLastQuestion();
};

ctrl.addVote = function () {
  console.log(ctrl.selectedVal);
  let options= ctrl.questionDetails.options;
  // delete old vote
  for(let i=0 ; i< options.length; i++){
       if(options[i].votedUserList && options[i].votedUserList.length >0 && options[i].votedUserList.includes(ctrl.userData.userId)) {
          options[i].noOfVotes--;
          // remove entry of old voted entry
          const index = options[i].votedUserList.indexOf(ctrl.userData.userId);
          if (index > -1) {
           options[i].votedUserList.splice(index, 1);
          }
          break;
       }
  }
  // increase vote count of selected option
  for(let i=0 ; i< options.length; i++)
  {
     // add new vote
      if(options[i].optionCode == ctrl.selectedVal){
          options[i].noOfVotes++;
          if(options[i].votedUserList && options[i].votedUserList.length > 0 ){
              options[i].votedUserList.push(ctrl.userData.userId);
          }else{
              options[i].votedUserList = [];
              options[i].votedUserList.push(ctrl.userData.userId);
          }
          break;
      }
  }
  updateVote();
}

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
            getUserInfo();
          },
          function errorCallback(response) {
            console.log(response.statusText); //http status code response
          }
        );
}

function getUserInfo() {
 console.log(".....inside get userinfo ..........");
      $http({
        method: "GET",
        url: "http://localhost:8080/UserMyBatis/getUserDetails/"+ $routeParams.userId
      }).then(
        function successCallback(response) {
          console.log("response from backend---------->", response);
          ctrl.userData = response.data;

          let options= ctrl.questionDetails.options;
          for(let i=0 ; i< options.length; i++)
            {
               if( options[i].votedUserList && options[i].votedUserList.length > 0 && options[i].votedUserList.includes(ctrl.userData.userId) )
               {
                ctrl.selectedVal=options[i].optionCode;
                ctrl.isAlreadyVoted= true;
                break;
               }
            }

        },
        function errorCallback(response) {
          console.log(response.statusText); //http status code response
        }
      );
 }

 ctrl.checkIfAlreadyVoted = function() {
     let options= ctrl.questionDetails.options;
     let isNewOptionSelected= true;
     for(let i=0 ; i< options.length; i++){
         // if user is already voted and selected radio button is the same option which user voted
         if(options[i].votedUserList && options[i].votedUserList.length > 0 && options[i].votedUserList.includes(ctrl.userData.userId) && ctrl.selectedVal == options[i].optionCode){
            ctrl.isAlreadyVoted= true;
            isNewOptionSelected=false;
            break;
         }
     }
     if(isNewOptionSelected){
       ctrl.isAlreadyVoted= false;
	 }
};



 ctrl.redirectToLoginPage = function() {
        $location.path('/login');
     };

 function updateVote() {
        console.log("inside updateVote", ctrl.questionDetails);
        $http({
          method: "PUT",
          url: "http://localhost:8080/UserMyBatis/updateOptionDetails",
          data: ctrl.questionDetails
        }).then(
          function successCallback(response) {
            console.log("response from backend---------->", response);
            $location.path('/login');
          },
          function errorCallback(response) {
            console.log(response.statusText); //http status code response
          }
        );
 }

}
angular.module("polling").component("saveVote", {
  templateUrl: "views/save-vote.html",
  controller:  saveVoteCtrl,
  controllerAs: "ctrl",
});