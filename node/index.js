var autobahn = require('autobahn');
var connection = new autobahn.Connection({
   realm: "realm1",
          url: 'ws://54.174.114.159:8080/ws',
         
});
connection.onopen = function (session) {
console.log("open")
   // SUBSCRIBE to a topic and receive events
   //
  /*  function onhello (args) {
      var msg = args[0];
      console.log("event for 'onhello' received: " + msg);
   }
   session.subscribe('com.myapp.hello', onhello).then(
      function (sub) {
         console.log("subscribed to topic 'onhello'");
      },
      function (err) {
         console.log("failed to subscribed: " + err);
      }
   );
 */
 /*   // REGISTER a procedure for remote calling
   //
   function add2 (args) {
      var x = args[0];
      var y = args[1];
      console.log("add2() called with " + x + " and " + y);
      return 10 + x + y;
   }
   session.register('com.example.add2', add2).then(
      function (reg) {
         console.log("procedure add2() registered");
      },
      function (err) {
         console.log("failed to register procedure: " + err);
      }
   );
 */
   // PUBLISH and CALL every second .. forever
   //
   var counter = 0;
   function callbk(d){
      console.log(d)
   }
   setInterval(function () {
      // PUBLISH an event
      //
     // session.publish('com.example.oncounter', [counter]);
     // console.log("published to 'oncounter' with counter " + counter);
      // CALL a remote procedure
      //
      session.subscribe('com.myapp.add_cb',  callbk)
      session.call('com.myapp.add2', [{x:++counter, y:3}]).then(
         function (res) {
            console.log("add2() called with result: " + res);
         },
         function (err) {
            if (err.error !== 'wamp.error.no_such_procedure') {
               console.log('call of mul2() failed: ' + err);
            }
         }
      );
      counter += 1;
   }, 5);
};
connection.open();