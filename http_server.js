var d = "No Data|No Data"; //Global variable to store the last received temperatures

var serialport = require("serialport");
var SerialPort = serialport.SerialPort; // localize object constructor
var serialPort = new SerialPort("/dev/ttyACM0", {
  parser: serialport.parsers.readline("\n\r")
});
serialPort.on("open", function () {
  console.log('open');
  serialPort.on('data', function(data) {
    console.log('data received: ' + data);
    d=data;
  });

  serialPort.write("1\n\r", function(err, results) {});

// Set up a timer to ping the arduino on a fixed interval and get updated temperatures
setInterval(function(){

  serialPort.write("1\n\r", function(err, results) {});

},3600000); // Every hour
});


var http = require('http');

http.createServer( function(req,res) {

   var currentTime = new Date();
   console.log('Client called at '+currentTime);

   res.writeHead(200, {'Content-Type':'text/plain'});
   var ar = d.split('|');
   res.write('Office Temperature: ');
   res.write(ar[0]);
   res.write(' C\n');
   res.write('Outside Temperature: ');
   res.write(ar[1]);
   res.write(' C\n');

   res.end();

}).listen('8124');
