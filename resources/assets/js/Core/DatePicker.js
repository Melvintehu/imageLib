/**
 * Use this class if you want to make call to the API
 * @type {API}
 */
window.DatePicker = new class
{
   constructor()
      {
         this.vue = new Vue();
         this.options = this.getPickerOptions();
      }
      /***
       *  Set the picker from Elements to a certain day periode ( between dates )
       */
   setPickerPeriod(picker, days)
   {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * days);
      picker.$emit('pick', [start, end]);
   }
   getPickerOptions()
   {
      return {
         shortcuts: [
         {
            text: 'Afgelopen week',
            onClick(picker)
            {
               DatePicker.setPickerPeriod(picker, 7);
            }
         },
         {
            text: 'Afgelopen maand',
            onClick(picker)
            {
               DatePicker.setPickerPeriod(picker, 30);
            }
         },
         {
            text: 'Afgelopen 3 maanden',
            onClick(picker)
            {
               DatePicker.setPickerPeriod(picker, 90);
            },
         },
         {
            text: 'Afgelopen half jaar',
            onClick(picker)
            {
               DatePicker.setPickerPeriod(picker, 180);
            }
         },
         {
            text: 'Afgelopen jaar',
            onClick(picker)
            {
               DatePicker.setPickerPeriod(picker, 365);
            }
         }]
      }
   }
}