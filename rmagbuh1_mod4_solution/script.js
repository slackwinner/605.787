// *******************************
// START HERE IF YOU WANT A MORE CHALLENGING STARTING POINT FOR THIS ASSIGNMENT
// *******************************
//
// Module 4 Assignment Instructions.
//
// The idea of this assignment is to take an existing array of names
// and then output either Hello 'Name' or Good Bye 'Name' to the console.
// The program should say "Hello" to any name except names that start with a "J"
// or "j", otherwise, the program should say "Good Bye". So, the final output
// on the console should look like this:
/*
Hello Yaakov
Good Bye John
Good Bye Jen
Good Bye Jason
Hello Paul
Hello Frank
Hello Larry
Hello Paula
Hello Laura
Good Bye Jim

WARNING!!! WARNING!!!
The code does NOT currently work! It is YOUR job to make it work
as described in the requirements and the steps in order to complete this
assignment.
WARNING!!! WARNING!!!

*/

// STEP 1:
// Wrap the entire contents of script.js inside of an IIFE
// See Lecture 52, part 2
// (Note, Step 2 will be done in the SpeakHello.js file.)
(function () {

  var names = ["Yaakov", "John", "Jen", "Jason", "Paul", "Frank", "Larry", "Paula", "Laura", "Jim"];

  // STEP 10:
  // Loop over the names array and say either 'Hello' or "Good Bye"
  // using either the helloSpeaker's or byeSpeaker's 'speak' method.
  // See Lecture 50, part 1

  /* 
    Note: Added additional console logs in script.js to help highlight
          different requirement sections for Assignment 4.
  */       
  console.log("Executing Assignment 4: Regular Requirements")
  for (var currName = 0; currName < names.length; currName++) {

    // STEP 11:
    // Retrieve the first letter of the current name in the loop.
    // Use the string object's 'charAt' function. Since we are looking for
    // names that start with either upper case or lower case 'J'/'j', call
    // string object's 'toLowerCase' method on the result so we can compare
    // to lower case character 'j' afterwards.
    // Look up these methods on Mozilla Developer Network web site if needed.
    var firstLetter = names[currName].charAt(0).toLowerCase();

    // STEP 12:
    // Compare the 'firstLetter' retrieved in STEP 11 to lower case
    // 'j'. If the same, call byeSpeaker's 'speak' method with the current name
    // in the loop. Otherwise, call helloSpeaker's 'speak' method with the current
    // name in the loop.
    if (firstLetter === 'j') {
        byeSpeaker.speak(names[currName])
    } else {
        helloSpeaker.speak(names[currName])
    }
  }

  // Additional Requirements from Assignment 4 document
  // Create and pass values to the map function
  function speakerMap(currName) {
    // Grab first letter of current name
    var firstLetter = currName.charAt(0).toLowerCase();

    // Invoke corresponding speaker function
    if (firstLetter === 'j') {
      return byeSpeaker.speakSimple(currName)
    } else {
      return helloSpeaker.speakSimple(currName)
    }
  }
  // Set map function attribute and print results to console
  console.log("Executing Assignment 4: Additional Requirements (Map Function)")
  var mapNames = names.map(speakerMap);
  for (var currName in mapNames) {
    console.log(mapNames[currName]);
  }

  // Bonus/Optional Requirements from Assignment 4 document
  // Create and pass values to the reduce function
  function speakerReduce(accumulator, currName) {
    // Grab first letter of current name
    var firstLetter = currName.charAt(0).toLowerCase();

    // Invoke corresponding speaker function
    if (firstLetter === 'j') {
      accumulator.bye.push(byeSpeaker.speakSimple(currName));
    } else {
      accumulator.hello.push(helloSpeaker.speakSimple(currName));
    }
    return accumulator;
  }

  // Set reduce function attribute and print results to console
  console.log("Executing Assignment 4: Bonus/Optional Requirements (Reduce Function)")
  var storageArr = {hello: [], bye: []};
  var reduceNames = names.reduce(speakerReduce, storageArr);

  for(var currHello in reduceNames.hello) {
    console.log(reduceNames.hello[currHello]);
  }

  for(var currBye in reduceNames.bye) {
    console.log(reduceNames.bye[currBye]);
  }

})();



