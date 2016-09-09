class ChatApp{
    constructor(dom,socket){
        this.dom = dom;
        this.socket = socket;
        this.chatInput = dom.getElementById('inputBox');
        this.inputPanel = dom.getElementsByClassName('inputPanel')[0];
        this.chatPanel = dom.getElementsByClassName('chatPanel')[0];
        this.rightIcon = dom.getElementsByClassName('rightIcon')[0];
        this.actionPanel = dom.getElementById("actionPanel");
    }

    htmlspecialchars(str){    
        str = str.replace(/&/g, '&amp;');  
        str = str.replace(/</g, '&lt;');  
        str = str.replace(/>/g, '&gt;');  
        str = str.replace(/"/g, '&quot;');  
        str = str.replace(/'/g, '&#039;');  
        return str;  
    }

    sendMessage(message){
        let msg = this.htmlspecialchars(message);
        let rightMsgdiv = this.dom.createElement('div');
        rightMsgdiv.className = "messageRight";
        rightMsgdiv.innerHTML = '<div class="avatar"></div>\r\n<div class="nick"></div>\r\n<div class="msgWrapper">\r\n<div class="msg">'
                        +message+'</div>';
        this.chatPanel.appendChild(rightMsgdiv);
        this.inputPanel.scrollIntoView();
        this.socket.emit('chat message', {msg:message,user:localStorage.getItem('userId')});
    }

    receiveMessage(message){
        //if(messageObj.user==localStorage.getItem('userId')) return;
        let msg = this.htmlspecialchars(message.msg);
        let leftMsgdiv = this.dom.createElement('div');
        leftMsgdiv.className = "messageLeft";
        leftMsgdiv.innerHTML = '<div class="avatar"></div>\r\n<div class="nick"></div>\r\n<div class="msgWrapper">\r\n<div class="msg">'
                        +msg+'</div>';
        this.chatPanel.appendChild(leftMsgdiv);
        this.inputPanel.scrollIntoView();
    }

    toggleShowActionPanel(height){
        if(this.actionPanel.style.height=="") this.actionPanel.style.height = height+"px";
        else this.actionPanel.style.height="";
    }

    hideActionPanel(){
        this.actionPanel.style.height="";
    }

    sendLeave(){
        this.socket.emit('user unload',{user:localStorage.getItem('userId')});
    }

    addSocketListeners(){
        const _this = this;
        this.socket.on('connect',()=>{
            console.log("Connected! "+ _this.socket.io.engine.id);
            if(!localStorage.getItem('userId'))
            localStorage.setItem('userId', _this.socket.io.engine.id);
        });
        this.socket.on('chat message',(message)=>{
           _this.receiveMessage(message);
           console.log(message);
        });
        this.socket.on('event',()=>{});
        this.socket.on('disconnect',()=>{
            _this.sendLeave();
        });
    }

    addInputListeners(){
        const _this = this;
        this.chatPanel.addEventListener('touchstart',function(){
            _this.hideActionPanel();
        });
        this.chatInput.addEventListener('focus',function(){  
            _this.hideActionPanel();
            setTimeout(function(){
                _this.inputPanel.scrollIntoView();
            },500);
        });
        this.chatInput.addEventListener("keyup",function(){
            if(_this.chatInput.innerText!="")  _this.rightIcon.className="rightIcon send";
            else _this.rightIcon.className="rightIcon";
        });
        this.rightIcon.addEventListener("touchstart",function(){
            if(_this.rightIcon.className=="rightIcon"){
                _this.toggleShowActionPanel(200);
            }
            if(_this.rightIcon.className=="rightIcon send"&&_this.chatInput.innerText!=""){
                _this.sendMessage(_this.chatInput.innerText);
                _this.chatInput.innerText = "";
                _this.rightIcon.className="rightIcon";
            }
        });
        this.chatInput.addEventListener("keypress",()=>{
            let keyPressed = event.keyCode || event.which;
            //if ENTER is pressed
            if(keyPressed==13)
            {
                _this.sendMessage(_this.chatInput.innerText);
                _this.chatInput.innerText = "";
                keyPressed=null;
                _this.chatInput.blur();
                _this.rightIcon.className="rightIcon";
                event.preventDefault();
            }
        });
    }
}
export default ChatApp;