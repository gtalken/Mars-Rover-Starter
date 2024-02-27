class Rover {
   constructor(position){
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }
   receiveMessage(message) {
      const results = [];

      for (let command of message.commands){
         let result ={};

         switch (command.commandType) {
            case 'MODE_CHANGE':
               this.mode=command.value;
               result.completed=true;
               break;
            case 'MOVE':
               if (this.mode === 'NORMAL'){
                  this.position = command.value;
                  result.completed=true;
               }else {
                  result.completed= false;
               }
               break;
            case 'STATUS_CHECK':
               result.roverStatus={
                  mode: this.mode,
                  generatorWatts: this.generatorWatts,
                  position: this.position
               };
               result.completed=true;
               break;
            default:
                  result.completed= false;
         }
         results.push(result);
      }
      return{
         message: message.name,
         results: results
      };
   }
}

module.exports = Rover;