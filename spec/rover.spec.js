const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  it("constructor sets position and default values for mode and generatorWatts", function() {
    const position= 123;
    const rover = new Rover(position);
    expect(rover.position).toBe(position);
    expect(rover.mode).toBe('NORMAL');
    expect(rover.generatorWatts).toBe(110)
  });
  it("response returned by receiveMessage contains the name of the message",function() {
    const messageName = "Test Message";
    const messageCommands= [];
    const message = new Message(messageName, messageCommands);
    const rover = new Rover(0);
    const response = rover.receiveMessage(message);
    
    expect(response.message).toBe(messageName);
  });
  it("response returned by receiveMessage includes two results if two commands are sent in the message",function(){
    const messageName = "Test Message";
    const commands = [
      new Command('MODE_CHANGE', 'LOW_POWER'),
      new Command('MOVE',50)
    ];
    const message = new Message(messageName, commands);
    const rover = new Rover(0)
    const response = rover.receiveMessage(message);

    expect(response.results.length).toBe(2);
  });
  it("responds correctly to the status check command",function(){
    const initialPosition= 0;
    const rover = new Rover(initialPosition);

    const statusCheckCommand= new Command('STATUS_CHECK');
    const message = new Message('Status Check Message', [statusCheckCommand]);
    const response = rover.receiveMessage(message);

    expect(response.results.length).toBe(1);
    expect(response.results[0].roverStatus).toEqual({
      mode: 'NORMAL',
      generatorWatts: 110,
      position: initialPosition
    });

  });
  it("responds correctly to the mode change command",function(){
    const initialPosition = 0;
    const rover = new Rover(initialPosition);
    const modeChangeCommand = new Command('MODE_CHANGE','LOW_POWER');
    const message = new Message('Mode Change Message',[modeChangeCommand]);
    const response = rover.receiveMessage(message);
    
    expect(response.results.length).toBe(1);
    expect(response.results[0].completed).toBe(true);
    expect(rover.mode).toBe('LOW_POWER');
  });
  it("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    
    const initialPosition = 0;
    const rover = new Rover(initialPosition);
    rover.mode = 'LOW_POWER'; 
    const initialPositionBeforeMove = rover.position;
    const moveCommand = new Command('MOVE', 50);
    const message = new Message('Move Message', [moveCommand]);
    const response = rover.receiveMessage(message);

    expect(response.results.length).toBe(1); 
    expect(response.results[0].completed).toBe(false); 
    expect(rover.position).toBe(initialPositionBeforeMove);
  });
  it("responds with the position for the move command", function() {
    const rover = new Rover(0);
    const moveCommand = new Command('MOVE', 50);
    const message = new Message('Move Message', [moveCommand]);
    const response = rover.receiveMessage(message);
    expect(rover.position).toBe(50);
  });
});
