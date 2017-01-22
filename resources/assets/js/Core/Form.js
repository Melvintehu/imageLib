/**
 * Use this class if you want to make call to the API
 * @type {API}
 */
window.Form = new class
{
   constructor()
      {}
      // vueInstance = a this or new Vue()
      // formName = model that has to be found. Check Elements doc for the validation of a form
   trackProgress(vueInstance, formName)
      {
         let ref = vueInstance.$refs[formName];
         let totalValid = 0;
         let totalValidNeeded = ref.fields.length;
         ref.fields.forEach((field) =>
         {
            if (this.isValid(vueInstance, field.prop, formName))
            {
               totalValid++;
            }
         });
         return Math.floor((100 / totalValidNeeded) * totalValid)
      }
      // Check whether a field is valid. A function isnt defined yet for Elements. So this is a workaround
   isValid(vueInstance, field, formName)
   {
      let valid = false
      let ref = vueInstance.$refs[formName];
      if (typeof(ref) !== 'undefined')
      {
         ref.validateField(field, (msg) =>
         {
            valid = (!msg);
         })
      }
      return valid;
   }
   resetForm(vueInstance, formName)
   {
      vueInstance.$refs[formName].resetFields();
   }
   generatePassword(event, formModel, field)
      {
         // let ref = vueInstance.$refs[formName];
         let randomstring = Math.random().toString(36).slice(-8);
         formModel[field] = randomstring.toUpperCase();
      }
      // reset the media to null so nothing is shown
      // dont forget to define in :data in the uploader : { type : <insert type> }
      // nasty work around to see which type is deleted ( which field ).
      // goes through api and reverses the type through the api ( api/v1/upload) (  $uploader->type = $request->get('type') )
   resetMedia(formModel, field = null)
      {
         if (field != null)
         {
            formModel[field] = [];
         }
      }
      // Set the properties and keys
      // dont forget to define in :data in the uploader : { type : <insert type> }
      // nasty work around to see which type is deleted ( which field ).
      // goes through api and reverses the type through the api ( api/v1/upload) (  $uploader->type = $request->get('type') )
   setMedia(formModel, field, response)
      {
         var media = {
            name: response.filename,
            url: '/storage/' + response.directory + '/' + response.filename + '.' + response.extension,
            id: response.id,
            type: response.type
         };
         var finalForm = formModel[field].push(media);
      }
      // Validation rule form email , used in Elements Validation for forms : http://element.eleme.io/#/en-US/component/form
   validateMail(rule, value, callback)
   {
      // emailregex.com
      var re = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      if (re.test(value))
      {
         callback();
      }
      else
      {
         callback(new Error('Geen valide email'));
      }
   }
}