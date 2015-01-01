'use strict';

/**
 * @ngdoc function
 * @name pickrandomApp.controller:LoadncalculatechoiceCtrl
 * @description
 * # LoadncalculatechoiceCtrl
 * Controller of the pickrandomApp
 */
angular.module('pickrandomApp')
    .controller('LoadncalculatechoiceCtrl', function ($scope,sharedPropertiesService, smoothScroll) {

      var element = document.getElementById('topOfScreen');
      smoothScroll(element);

      // Get subject and objects
      $scope.objectsToChooseFrom = sharedPropertiesService.getObject();
      $scope.subject = sharedPropertiesService.getSubject();
      $scope.alternative_text = '';
      var choices = sharedPropertiesService.getNumberOfChoices();
      var typeOfChoice = sharedPropertiesService.getCallingFunction().toLowerCase();

      // Hide all result divs
      //document.getElementById('results_specify_yourself').style.display = 'none';
      document.getElementById('results_movies').style.display = 'none';
      document.getElementById('results_persons').style.display = 'none';

      if(typeOfChoice == "person") {
        $scope.alternative_text = 'Person';
      } else if (typeOfChoice == "movie"){
        choices = 1;
      } else if(typeOfChoice == "specify_yourself"){
        $scope.alternative_text = 'Alternative';
      }

      _makeCalculation(choices, typeOfChoice);

      function _makeCalculation(numberOfChoices, type) {

        // Add spinner
        var target = document.getElementById('spinner');
        var spinner = new Spinner().spin();
        target.appendChild(spinner.el);

        var numberOfObjects = $scope.objectsToChooseFrom.length;

        var randomChooseObject;
        if(type == "movie") {
          randomChooseObject = Math.floor((Math.random() * numberOfObjects) + 1);
          $scope.movieTitle = $scope.objectsToChooseFrom[randomChooseObject-1];
        } else {
          $scope.results = [];
          $scope.chosenNumbers = [];

          for (var i = 0; i < numberOfChoices; i++) {

            randomChooseObject = Math.floor((Math.random() * numberOfObjects) + 1);

            // Values should be unique
            while($scope.chosenNumbers.indexOf(randomChooseObject) != -1) {
              randomChooseObject = Math.floor((Math.random() * numberOfObjects) + 1);
            }
            $scope.chosenNumbers[i] = randomChooseObject;
            $scope.results[i]=$scope.objectsToChooseFrom[randomChooseObject-1];

          }
        }

        setTimeout(function(){spinner.stop(); $scope.displayResults(typeOfChoice);}, 3000);
      }

      $scope.displayResults = function(typeOfChoice) {

        // Hide loading area
        document.getElementById('loading_area').style.display = 'none';

        //Show result area
        if(typeOfChoice == "movie") {
          document.getElementById('results_movies').style.display = 'block';
        } else {
          document.getElementById('results_persons').style.display = 'block';
        }
      };
    });
