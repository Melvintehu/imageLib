/**
 * Event dispatcher class, for emitting and listening for events. 
 * By using this class you can emit an event to any component in vue regardless of it being a child, parent or sibling.
 * @type {Event}
 */
window.Event = new class{
   constructor() {
      this.vue = new Vue();
   }

   /**
    * Method which can be used to fire events.
    * @param  {[event]} the name of the event
    * @param  {[data]} data to send with the event 
    * @return {[void]}
    */
   fire(event, data = null) {
      this.vue.$emit(event, data);
   }

   /**
    * Method which can be used to listen to events.
    * @param  {[event]} the name of the event
    * @param  {callback} the callback function to execute
    * @return {[void]}
    */
   listen(event, callback) {
      this.vue.$on(event, callback);
   }

   /**
    * Method to start the loading screen
    * @return {[void]}
    */
   startLoading() {
      Event.fire('loading_start');
   }

   /**
    * Method to stop the loading screen
    * @return {[void]}
    */
   stopLoading() {
      setTimeout(function(){
         Event.fire('loading_done');
      }, 500);
   }

}
