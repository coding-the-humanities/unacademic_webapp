(function(){

  angular.module('unacademic.models.path.schema', [])
         .factory('pathSchema', pathSchema);

  function pathSchema(){

    return {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          required: true
        },
        title: {
          type: 'string',
          required: true,
          minLength: 5,
          maxLength: 25

        },
        curator: {
          type: 'string',
          required: true
        },
        summary: {
          type: 'string',
          required: true
        },
        description: {
          type: 'string',
          required: true
        }
      }
    };
  }
})();
