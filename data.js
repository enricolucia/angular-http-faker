/*global angular*/
angular.module('httpFaker.data', [])
  .factory('httpData', [function () {
    return {
          // Your Fake GET data to be returned.
          response: [
            {
              id: 0,
              title: 'Finish fake backend',
              completed: true
            },
            {
              id: 1,
              title: 'Finish fake backend',
              completed: false
            },
            {
              id: 2,
              title: 'Finish fake backend',
              completed: true
            }
          ],
          // Your Fake api url.
          apiUrl: '/api/todos',
          // Your Fake api PUT DELETE url to match.
          apiActionUrl: /^\/api\/todos\/\d+$/,
          // File extensions to be ignored and issue a real http request.
          ignoreUrl: '.html'
      };

  }]);

