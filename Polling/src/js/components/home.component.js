function homeCtrl($location){
    ctrl = this;
    ctrl.$onInit =function(){
        console.log("...inside home init.....");
    };


}

angular.module("polling").component("home", {
    templateUrl: 'views/dashboard.html',
    controller: homeCtrl,
    controllerAs: 'ctrl'
});