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
    var rightIcon = document.getElementsByClassName('rightIcon')[0];
    var actionPanel = document.getElementById("actionPanel");
    var socket = io("http://192.168.8.8:5000");
    
    var htmlspecialchars = function(str)    
    {    
        str = str.replace(/&/g, '&amp;');  
        str = str.replace(/</g, '&lt;');  
        str = str.replace(/>/g, '&gt;');  
        str = str.replace(/"/g, '&quot;');  
        str = str.replace(/'/g, '&#039;');  
        return str;  
    };  

    var _toggleShowActionPanel = function(){
        if(actionPanel.style.height=="") actionPanel.style.height="160px";
        else actionPanel.style.height="";
    };

    var _hideActionPanel = function(){
        actionPanel.style.height="";
    };

    var _addSocketListeners = function(){
        socket.on('connect',function(){
            console.log("Connected! "+ socket.io.engine.id);
            if(!localStorage.getItem('userId'))
            localStorage.setItem('userId', socket.io.engine.id);
        });
        socket.on('chat message',function(message){
           _receiveMessage(message);
           console.log(message);
        });
        socket.on('event',function(){});
        socket.on('disconnect',function(){
            _sendLeave();
        });
    };

    var _receiveMessage = function(messageObj){
        //if(messageObj.user==localStorage.getItem('userId')) return;
        var leftMsgdiv = document.createElement('div');
        leftMsgdiv.className = "messageLeft";
        leftMsgdiv.innerHTML = '<div class="avatar"></div>\r\n<div class="nick"></div>\r\n<div class="msgWrapper">\r\n<div class="msg">'
                        +messageObj.msg+'</div>';
        chatPanel.appendChild(leftMsgdiv);
        inputPanel.scrollIntoView();
    }
    var _sendMessage = function(message){
        message = htmlspecialchars(message);
        var rightMsgdiv = document.createElement('div');
        rightMsgdiv.className = "messageRight";
        rightMsgdiv.innerHTML = '<div class="avatar"></div>\r\n<div class="nick"></div>\r\n<div class="msgWrapper">\r\n<div class="msg">'
                        +message+'</div>';
        chatPanel.appendChild(rightMsgdiv);
        inputPanel.scrollIntoView();
        socket.emit('chat message', {msg:message,user:localStorage.getItem('userId')});
    };
    var _sendLeave = function(){
        socket.emit('user unload',{user:localStorage.getItem('userId')});
    };

    var _addInputListeners = function(){
        chatPanel.addEventListener('click',function(){
            _hideActionPanel();
        });
        chatInput.addEventListener('focus',function(){  
            _hideActionPanel();
            setTimeout(function(){
                inputPanel.scrollIntoView();
            },500);
        });
        chatInput.addEventListener("keyup",function(){
            if(chatInput.innerText!="")  rightIcon.className="rightIcon send";
            else rightIcon.className="rightIcon";
        });
        rightIcon.addEventListener("click",function(){
            if(rightIcon.className=="rightIcon"){
                _toggleShowActionPanel();
            }
            if(rightIcon.className=="rightIcon send"&&chatInput.innerText!=""){
                _sendMessage(chatInput.innerText);
                chatInput.innerText = "";
                rightIcon.className="rightIcon";
            }
        });
        chatInput.addEventListener("keypress",function(){
            var keyPressed = event.keyCode || event.which;
            //if ENTER is pressed
            if(keyPressed==13)
            {
                _sendMessage(chatInput.innerText);
                chatInput.innerText = "";
                keyPressed=null;
                chatInput.blur();
                rightIcon.className="rightIcon";
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
    window.onbeforeunload = function(e){
        _sendLeave();
    };
    
})(io,document,window);
       