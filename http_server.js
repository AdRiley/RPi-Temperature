var d = "No Data";
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


setInterval(function(){

  serialPort.write("1\n\r", function(err, results) {});

},3600000);
});


var http = require('http');

http.createServer( function(req,res) {

   var currentTime = new Date();
   console.log('Client called at '+currentTime);

   res.writeHead(200, {'Content-Type':'text/plain'});
   var ar = d.split('|');
   res.write('Office Teperature: ');
   res.write(ar[0]);
   res.write(' celcius\n');
   res.write('Outside Teperature: ');
   res.write(ar[1]);
   res.write(' celcius\n');

   res.end();

}).listen('8124');
