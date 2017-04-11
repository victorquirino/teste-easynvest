angular.module('app', ['ui.mask', 'google.places', 'ngMap'])
  .controller('MainCtrl', function($scope, $http, NgMap){
    var savedFields = {};
    $scope.savedFields = [];

    // read JSON
    $http.get('js/mock.json').
      then(function (response){
        fields = response.data.fields;

        $scope.fieldFullName = fields.inputFullName;
        $scope.fieldCpf = fields.inputCpf;
        $scope.fieldCelphone = fields.inputCelphone;
        $scope.fieldAddress = fields.inputAddress;
        $scope.fieldComplement = fields.inputComplement;
        $scope.fieldUploadImage = fields.upload;
        $scope.fieldButton = fields.button;
      });

      //for validation
      $scope.nome = "";
      $scope.cpf = "";
      $scope.celphone = "";
      $scope.address = "";
      $scope.complement = "";

      $scope.saveForm = function(){
        savedFields = {
          "nome": $scope.nome,
          "cpf": $scope.cpf,
          "celphone": $scope.celphone,
          "address": $scope.address,
          "complement": $scope.complement
        }

        $scope.savedFields.push(savedFields);
        saveContatos($scope.savedFields);
      }


      // MAP
      NgMap.getMap().then(function(map) {
        console.log(map.getCenter());
        console.log('markers', map.markers);
        console.log('shapes', map.shapes);
      });

      //PRE LOAD IMAGE jquery
      function readURL(input) {
        if (input.files && input.files[0]) {
          var reader = new FileReader();

          reader.onload = function (e) {
            $('#image-thumb').attr('src', e.target.result);
          }
            reader.readAsDataURL(input.files[0]);
        }
      }

      $("#image-input").change(function(){
        readURL(this);
      });


      //LOCAL STORAGE CRUD
      function saveContatos(arrayContato) {
        window.localStorage.contatos = JSON.stringify(arrayContato);
      }

      function getContatos() {
        return (window.localStorage.contatos) ?
          JSON.parse(window.localStorage.contatos) : {};
      }
  });
;
