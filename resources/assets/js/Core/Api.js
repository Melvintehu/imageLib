  /**
   * Use this class if you want to make call to the API
   * @type {API}
   */
  window.API = new class
  {
     constructor()
     {
        this.vue = new Vue();
        this.vue.data = {
           data: null,
        }
     }
     version()
     {
        return '/api/v1/';
     }
     headers()
     {
        var headers = {
           'Authorization': 'Bearer ' + Laravel.user.api_token,
           'X-CSRF-TOKEN': Laravel.csrfToken
        }
        return headers;
     }
     removeFile(id)
     {
        console.log('removeFile', id);
        this.delete('upload', id);
     }
     uploadURL()
        {
           return 'upload';
        }
        /**
         * Simple wrapper for vue upload
         */
     uploadImage(base, $parameters)
     {
        return this.vue.$http.post(this.uploadURL, $parameters).then(function(response) {});
     }
     put(base, data, success, failure = null)
        {
           return this.vue.$http.put(this.version() + base, data).then((response) =>
           {
              success(response);
           }, failure);
        }
        /**
         * Simple wrapper for vue delete request
         * @param  {[base]} api route
         * @param  {[id]} object id
         * @return {[void]}
         */
     delete(base, id)
        {
           this.vue.$http.delete(this.version() + base + '/' + id,
           {}).then(function()
           {
              Notifier.notify('success', 'Gelukt!', 'Verwijderd');
           }, function()
           {
              Notifier.notify('failed', 'Mislukt', 'Verwijderd');
           });
        }
        /**
         * Deletes an object from an array, if the object exists in the database
         * a call to the api is made to delete that object in the database
         * @param  {[type]}  object  [ The object to delete ]
         * @param  {[type]}  array   [ The target array ]
         * @param  {String}  apiCall [ The call to the api (/users, /customers, /projects)]
         * @param  {Boolean} confirm [ Ask the user for confirmation ]
         * @return {[boolean]}          [Return a boolean if succeeded or not]
         */
     deleteObjectFrom(object, array, apiCall = '', confirm = true)
        {
           if (!Helper.hasProperty(object, 'id'))
           {
              Helper.removeFromArray(array, object);
              return false;
           }
           if (confirm == true)
           {
              this.vue.$confirm('Weet u zeker dat u dit wilt verwijderen?', 'Warning',
              {
                 confirmButtonText: 'OK',
                 cancelButtonText: 'Cancel',
                 type: 'warning'
              }).then(() =>
              {
                 Helper.removeFromArray(array, object);
                 API.delete(apiCall, object.id);
              }).catch(() =>
              {});
           }
           else
           {
              Helper.removeFromArray(array, object);
              API.delete(apiCall, object.id);
           }
        }
        /**
         * Simple wrapper for vue get request.
         * @param  {[base]}
         * @return {[vue http request]}
         */
     post(base, success, failure = null, parameters = {})
        {
           return this.vue.$http.post(this.version() + base, parameters).then(function(response)
           {
              var data = JSON.parse(response.body);
              success(data);
           }, failure);
        }
        /**
         * Simple wrapper for vue get request.
         * @param  {[base]}
         * @return {[vue http request]}
         */
     get(base, success, failure = null, $parameters = {})
     {
        return this.vue.$http.get(this.version() + base, $parameters).then(function(response)
        {
           var data = JSON.parse(response.body);
           if (success.constructor === Array)
           {
              success.forEach(function(callback)
              {
                 callback(data);
              });
           }
           else
           {
              success(data);
           }
        }, failure);
     }
  }