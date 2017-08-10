angular
    .module('myApp', ['ngRoute', 'firebase'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/all.html',
                controller: 'todoCtrl'
            })
            .when('/details/all', {
                templateUrl: 'views/all.html',
                controller: 'todoCtrl'
            })
            .when('/details/personal', {
                templateUrl: 'views/personal.html',
                controller: 'todoCtrl'
            })
            .when('/details/work', {
                templateUrl: 'views/work.html',
                controller: 'todoCtrl'
            })
            .when('/details/other', {
                templateUrl: 'views/other.html',
                controller: 'todoCtrl'
            })
            .when('/details/completed', {
                templateUrl: 'views/completed.html',
                controller: 'todoCtrl'
            })
            .when('/details/add', {
                templateUrl: 'views/add.html',
                controller: 'todoCtrl'
            })
            .otherwise({
                redirectTo: '/'
            })
    }) // end config
    .constant('firebaseConfig', {
        apiKey: "AIzaSyDf-cOA9OasDWxRTbcQjUFnM89ioOg2jAc",
        authDomain: "final-b2057.firebaseapp.com",
        databaseURL: "https://final-b2057.firebaseio.com",
        projectId: "final-b2057",
        storageBucket: "final-b2057.appspot.com",
        messagingSenderId: "336939202047"
    }) // end constant
    .run(function (firebaseConfig) {
        firebase.initializeApp(firebaseConfig)
    }) // end run
    .controller('todoCtrl', function ($scope, $firebaseObject, $firebaseArray) {
        var dbRef = firebase.database().ref('todos').orderByChild('completed').equalTo(false)
        $scope.todos = $firebaseArray(dbRef)
    
        var personalTodos = firebase.database().ref('todos').orderByChild('category').equalTo('personal')
        $scope.personalItems = $firebaseArray(personalTodos)
    
        var workTodos = firebase.database().ref('todos').orderByChild('category').equalTo('work')
        $scope.workItems = $firebaseArray(workTodos)
    
        var otherTodos = firebase.database().ref('todos').orderByChild('category').equalTo('other')
        $scope.otherItems = $firebaseArray(otherTodos)
    
        var completedTodos = firebase.database().ref('todos').orderByChild('completed').equalTo(true)
        $scope.completedItems = $firebaseArray(completedTodos)
    
        this.blankTodo = function () {
            ({
                title: '',
                dueDate: '',
                comment: '',
                important: 0,
                category: 'None',
                completed: false
            })
        }
        $scope.newTodo = this.blankTodo()
        $scope.addTodo = () => {
            $scope.todos.$add($scope.newTodo)
            $scope.newTodo = this.blankTodo()
        }
        $scope.removeTodo = (todo) => {
            if (confirm('Delete this todo?')) {
                $scope.todos.$remove(todo)
            }
        }
    }) // end controller
