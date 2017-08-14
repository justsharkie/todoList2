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
        var dbRef = firebase.database().ref().child('todos')
        $scope.todos = $firebaseArray(dbRef)

        var allTodos = firebase.database().ref('todos').orderByChild('completed').equalTo(false)
        $scope.allItems = $firebaseArray(allTodos)

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
            $scope.newTodo.completed = false;
            if($scope.newTodo.comment == null){
                $scope.newTodo.comment = ''
            }
            if($scope.newTodo.important == null){
                $scope.newTodo.important = 0
            }
            if($scope.newTodo.category == null){
                $scope.newTodo.category = ''
            }
            $scope.todos.$add($scope.newTodo)
            $scope.newTodo = this.blankTodo()
        }
        $scope.removeTodo = (todo) => {
            if (confirm('Delete this todo?')) {
                $scope.todos.$remove($scope.todos.$indexFor(todo.$id))
            }
        }

        // WORK ON COMPLETING ITEMS
        $scope.completeTodo = (todo) => {
            var fbTodo = $firebaseObject(dbRef.child(todo.$id))
            fbTodo.completed = true
            fbTodo.title = todo.title
            fbTodo.dueDate = todo.dueDate
            fbTodo.comment = todo.comment
            fbTodo.important = todo.important
            fbTodo.category = todo.category
            fbTodo.$save()
        }
        // WORK ON EDITING ITEMS

        $scope.high = (todo) => {
            if (todo.important == 2) {
                return true
            } else {
                return false
            }
        }
        $scope.medium = (todo) => {
            if (todo.important == 1) {
                return true
            } else {
                return false
            }
        }
    }) // end controller
