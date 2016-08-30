"use strict";
/*
(function($,document,window,undefined){
    $(function(){

    });
})(jQuery,document,window);
*/
(function(io,document,window,undefined){
    //var chatApp = window.chatApp = window.chatApp || {};
    var chatInput = document.getElementById('inputBox');
    var inputPanel = document.getElementsByClassName('inputPanel')[0];
    var chatPanel = document.getElementsByClassName('chatPanel')[0];
    var socket = io("http://localhost:5000");
    var _addSocketListeners = function(){
        socket.on('connect',function(){
            console.log("Connected!");
        });
        socket.on('chat message',function(message){
           console.log(message);
        });
        socket.on('event',function(){});
        socket.on('disconnect',function(){});
    };

    var _sendMessage = function(message){
        var rightMsgdiv = document.createElement('div');
        rightMsgdiv.className = "messageRight";
        rightMsgdiv.innerHTML = '<div class="avatar"></div>\r\n<div class="nick"></div>\r\n<div class="msgWrapper">\r\n<div class="msg">'
                        +message+'</div>';
        chatPanel.appendChild(rightMsgdiv);
        inputPanel.scrollIntoView();
        socket.emit('chat message',message);
    };

    var _addInputListeners = function(){
        chatInput.addEventListener('focus',function(){  
            setTimeout(function(){
                inputPanel.scrollIntoView();
            },500);
        });
        chatInput.addEventListener("keypress",function(){
            var keyPressed = event.keyCode || event.which;
            //if ENTER is pressed
            if(keyPressed==13)
            {
                _sendMessage(chatInput.innerText);
                chatInput.innerText = "";
                keyPressed=null;
                event.preventDefault();
            }
        });
    };
    var _init = function(){
        _addInputListeners();
        _addSocketListeners();
    };
    window.onload = function(e){ 

        //console.log("document.onload", e, Date.now()); 
        _init();
    };
    
})(io,document,window);
       