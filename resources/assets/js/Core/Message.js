/**
 * class that can be used for messaging the user
 * @type {class}
 */
window.Messager = new class
{
   constructor()
      {
         this.vue = new Vue();
         this.messageTypes = {
            'success': 'success',
            'warning': 'warning',
            'danger': 'danger',
            'error': 'error',
            'info': 'info',
            'default': 'info',
         };
      }
      /**
       * messages the user 
       * @param  {[type]} type of message
       * @param  {[message]}
       * @return {[void]}
       */
   message(type, message = null)
   {
      this.vue.$message(
      {
         message: message || '',
         type: this.messageTypes[type] || this.messageTypes['default']
      });
   }
}