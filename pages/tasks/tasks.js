angular.module('tasks', ['programService', 'LocalStorageModule'])
    .component('tasks', {
        templateUrl: "pages/tasks/tasks.html",
        controller: ['$http', 'programs', '$log', '$scope', 'localStorageService', function ($http, programs, $log, $scope, localStorage) {

            var $ctrl = this;
            $scope.tasks = [];
            $scope.saved = localStorage.get('tasks');
            $scope.tasks = (localStorage.get('tasks') !== null) ? JSON.parse($scope.saved) : [{
                    done: false
                }, {}];
            localStorage.set('tasks', JSON.stringify($scope.tasks));

            $scope.confirmButton = "Dodaj zadanie";


            $scope.editIndex = false;
            $scope.addTask = function () {
                if ($scope.editIndex === false) {
                    $scope.tasks.push({task: $scope.task, done: false});
                } else {
                    $scope.tasks[$scope.editIndex].task = $scope.task;
                }

                $scope.confirmButton = 'Dodaj zadanie';
                $scope.editIndex = false;
                localStorage.set('tasks', JSON.stringify($scope.tasks));
                $scope.task = '';
            };

            $scope.editTask = function (index) {
                $scope.confirmButton = 'Edytuj zadanie';
                $scope.task = $scope.tasks[index].task;
                $scope.editIndex = index;
            };
            $scope.doneTask = function (index) {
                $scope.tasks[index].done = true;

                if ($scope.tasks[index].primary == 1) {
                    $scope.tasks[index].primary = 0;
                }
            };
            $scope.unDoneTask = function (index) {
                $scope.tasks[index].done = false;
            };
            $scope.deleteTask = function (index) {
                $scope.tasks.splice(index, 1);
            };

            $scope.primaryTask = function (index) {
                $scope.tasks[index].toggle.primary = true;
                localStorage.set('tasks', JSON.stringify($scope.tasks));
            };

            $scope.setPrimary = function (index) {

                if ($scope.tasks[index].primary == 1) {
                    $scope.tasks[index].primary = 0;
                } else if ($scope.tasks[index].primary === null || $scope.tasks[index].primary == 0 || $scope.tasks[index].primary === undefined) {
                    $scope.tasks[index].primary = 1;
                }
                localStorage.set('tasks', JSON.stringify($scope.tasks));
            };

            $scope.$watch('tasks', function () {
                localStorage.set('tasks', JSON.stringify($scope.tasks));
            }, true);

            $scope.currentVal='1';
            $ctrl.taskFilter = function (option) {
                if (option == 2 ) {
                    $scope.currentVal='2';
                    $scope.filterFn = function (item) {

                        if (item.done == true) {
                            return true;
                        }
                        return false;
                    }
                } else if (option == 3) {
                    $scope.currentVal='3';
                    $scope.filterFn = function (item) {

                        if (item.done == false) {
                            return true;
                        }
                        return false;
                    }
                } else {
                    $scope.filterFn = {};
                    $scope.currentVal='1';
                }
            };



            /* CLEARING WHOLE LIST */

            $scope.showDeletePopup = function(options) {
                if (options === true) {
                    $scope.displayDeletePopup = true;
                } else {
                    $scope.displayDeletePopup = false;
                }
            };

            $ctrl.clear = function () {
                $scope.displayDeletePopup = false;
                $scope.tasks = [];
                localStorage.set('tasks', JSON.stringify($scope.tasks));
            };


        }]  /* component END  */
    });
/* module END  */
