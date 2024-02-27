const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {
    it("throws error if a name is NOT passed into the constructor as the first parameter",function(){
        expect(function(){ new Message(); }).toThrow(new Error('Name required.'));
    });
    it ("constructor sets name",function() {
        const testName= "Test Name";
        const message=new Message(testName);
        expect (message.name).toBe(testName);
    });
    it("contains a commands array passed into the constructor as the 2nd argument", function() {
        const testName = "Test Name";
        const testCommands = [
            new Command('commandType1','commandValue1'),
            new Command('commandType2','commandValue2')
        ];
        const message = new Message (testName, testCommands)
        
        expect (message.commands).toEqual(testCommands);
    });
});
