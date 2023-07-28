// const dgram = require('dgram');

// const PORT = 5000;
// const MULTICAST_ADDRESS = '2406:da1c:83a:f201:c1d3:7d75:774:b8c1';

// const server = dgram.createSocket('udp6');
// server.bind(PORT, MULTICAST_ADDRESS, () => {
//   console.log('Server listening on port 5000');
// });

// server.on('message', (msg, rinfo) => {
//   console.log(`Received message from ${rinfo.address}:${rinfo.port}`);
//   console.log(`Message: ${msg}`);
// });

const express = require("express");
const dgram = require('dgram');
const DbConnect = require("./database.js");
const DetailsModel = require("./models/details.js");
DbConnect();
const app = express();

const PORT = 5000;
const MULTICAST_ADDRESS = '2406:da1c:83a:f201:c1d3:7d75:774:b8c1';
// const app = "https://3.106.130.215/";

const server = dgram.createSocket('udp6');


server.bind(PORT, MULTICAST_ADDRESS, () => {
    console.log('Server listening on port 5000');
});

server.on('message', async (msg, rinfo) => {
    try{
    console.log(`Received message from ${rinfo.address}:${rinfo.port}`);
    const jsonData = msg.toString();

    console.log(msg.toString());

    // Convert the string data to JSON
    const protocolA = JSON.parse(jsonData);

    // Print the JSON data
    console.log(protocolA);

    const entries = Object.entries(protocolA);

    const values = entries.map((entry) => entry[1]);

    const a = values[2];

    let message = "";
    
    if (a === '0') {
      message = "activation";
    } else if (a === '1') {
      message = "activated";
    } else {
      message = "deactivated";
    }
     const actionid =  values[4] +"_"+ values[7];          

    // refilter protocolA and make protocolB
    const protocolB = {
        idCompany: "facomsa",
        actionid: actionid,
        token: "XXXX",
        detection_time: values[21],
        lon: values[20],
        years: values[18],
        device_event_type: "Vechile Stopped",
        device_event_type_value: message,
        information_quality: values[25],
    }
   console.log(protocolB);
    // data send to database

    await DetailsModel.create(protocolB);


    }
    catch{
        console.log("error from device side");
    }

});