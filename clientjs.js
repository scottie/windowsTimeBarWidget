// var socket = io();  
const io = require('socket.io-client');
var socket = io.connect('http://localhost:8899');
var count = 0;



window.addEventListener("load", function(){ // when page loads   
    var socket_data_ = document.getElementById("close-button"); 
    socket_data_.addEventListener("click", function() { 
        socket.emit("close-button", Number(this.checked)); 
    });
});

socket.on('Local', function (data) { // update time  
    var socket_status_ = document.getElementById("Local"); 
    socket_status_.innerHTML = data;    
});

socket.on('Romaina', function (data) { // update time  
    var socket_status_ = document.getElementById("Romaina"); 
    socket_status_.innerHTML = data;    
});

socket.on('Nigeria', function (data) { // update time    
    var socket_status_ = document.getElementById("Nigeria"); 
    socket_status_.innerHTML = data;    
});

socket.on('Newyork', function (data) { // update time   
    var socket_status_ = document.getElementById("Newyork"); 
    socket_status_.innerHTML = data;    
});

socket.on('LocalNightDay', function (data) { // update time  
    var socket_status_ = document.getElementById("LocalNightDay"); 
    socket_status_.innerHTML = data;    
});

socket.on('RomainaNightDay', function (data) { // update time  
    var socket_status_ = document.getElementById("RomainaNightDay"); 
    socket_status_.innerHTML = data;    
});

socket.on('NigeriaNightDay', function (data) { // update time    
    var socket_status_ = document.getElementById("NigeriaNightDay"); 
    socket_status_.innerHTML = data;    
});

socket.on('NewyorkNightDay', function (data) { // update time   
    var socket_status_ = document.getElementById("NewyorkNightDay"); 
    socket_status_.innerHTML = data;    
});


function timeLoop()
{
    count++;
    sec = 1;  //Seconds
    socket.emit("getTime", count);
    setTimeout(timeLoop, sec * 1000);
}

timeLoop(); // execute function