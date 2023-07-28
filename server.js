
const dgram = require('dgram');

const server = dgram.createSocket('udp4');
console.log("start");
server.on('message', (msg, rinfo) => {
  console.log(`Received message from ${rinfo.address}:${rinfo.port}`);
  console.log(msg.toString());

  // Send a response back to the client.
  server.send(msg, 0, msg.length, rinfo.port, rinfo.address);
});

server.bind(8080);
