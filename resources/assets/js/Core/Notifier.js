/**
 * Notifier class for notifying the user with a specific message.
 * @type {class}
 */
window.Notifier = new class
{
   constructor()
      {
         this.vue = new Vue();
         this.notifyTypes = {
            'success': 'success',
            'warning': 'warning',
            'danger': 'danger',
            'error': 'error',
            'info': 'info',
            'default': 'info',
         };
      }
      /**
       * Ask the user for a confirmation
       * @param  {[message]}
       * @return {[boolean]}
       */
   askConfirmation(procceed, message = null)
      {
         this.vue.$confirm('Weet u zeker dat u dit wilt verwijderen?', 'Warning',
              {
                 confirmButtonText: 'OK',
                 cancelButtonText: 'Cancel',
                 type: 'warning'
              }).then(() =>
              {
                 procceed();
              }).catch(() =>
              {});
      }
      /**
       * Notify the user 
       * @param  {[type]} type of message
       * @param  {[message]} 
       * @return {[void]}
       */
   notify(type, message, title = null)
   {
      console.log(type, message);
      if (title == null)
      {
         title = Helper.capitalize(this.notifyTypes[type]) || Helper.capitalize(this.notifyTypes['default']);
      }
      
      this.vue.$notify(
      {
         title: title,
         message: message,
         type: this.notifyTypes[type] || this.notifyTypes['default']
      });
   }
}