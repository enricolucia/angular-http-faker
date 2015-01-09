/*global angular*/

angular.module('faker.http-faker', ['faker.data'])

  .config(['$provide', function( $provide) {
    $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
  }])
  .run(['$httpBackend', 'httpData', function($httpBackend, httpData) {
    var localData = httpData.response;

    $httpBackend.whenGET(httpData.apiUrl).respond(200, localData);

    $httpBackend.whenPOST(httpData.apiUrl).respond(function(method, url, data, headers) {
      var newItem = JSON.parse(data);
      newItem.id = localData.length;
      localData.push(newItem);

      return [201, newItem];
    });

    $httpBackend.whenPUT(httpData.apiActionUrl).respond(function(method, url, data, headers) {
      var item = JSON.parse(data);
      for (var i = 0,l = localData.length; i < l; i++) {
        if (localData[i].id === item.id) {
          localData[i] = item;
          break;
        }
      }

      return [200, item];
    });

    $httpBackend.whenDELETE(httpData.apiActionUrl).respond(function(method, url, data, headers) {
      var regexGroup = httpData.apiUrl + "/(\\d+)";
      var regex = new RegExp(regexGroup, "g");

      var id = regex.exec(url)[1]; // First match on the second item.

      for (var i = 0, l = localData.length; i < l; i++) {
        if (localData[i].id === id) {
          var index = localData.indexOf(localData[id]);
          localData.splice(index, 1);
          break;
        }
      }

      return [204];
    });

    $httpBackend.whenGET(new RegExp(httpData.ignoreUrl)).passThrough();
  }]);
