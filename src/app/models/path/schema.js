(function(){

  angular.module('unacademic.models.path')
         .factory('schema', schema);

  function schema(){

    return {
      type: 'object',
      properties: {
        id: {
          type: 'number',
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
          type: 'string'
        },
        description: {
          type: 'string'
        }
      }
    };
  }
   
})();
