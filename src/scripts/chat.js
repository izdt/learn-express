class ChatApp{
    constructor(dom,socket){
        this.dom = dom;
        this.socket = socket;
        this.chatInput = dom.getElementById('inputBox');
        this.inputPanel = dom.getElementsByClassName('inputPanel')[0];
        this.chatPanel = dom.getElementsByClassName('chatPanel')[0];
        this.rightIcon = dom.getElementsByClassName('rightIcon')[0];
        this.actionPanel = dom.getElementById('actionPanel');
        this.newChatBtn = dom.getElementsByClassName('newChat')[0];
        this.closeChatBtn = dom.getElementsByClassName('closeChat')[0];
        this.aboutUsBtn = dom.getElementsByClassName('aboutUs')[0];
    }

    htmlspecialchars(str){    
        str = str.replace(/&/g, '&amp;');  
        str = str.replace(/</g, '&lt;');  
        str = str.replace(/>/g, '&gt;');  
        str = str.replace(/"/g, '&quot;');  
        str = str.replace(/'/g, '&#039;');  
        return str;  
    }

    scrollToMessage(){
        this.chatPanel.querySelector('.chatPanel>div:last-child').scrollIntoView();
    }

    sendMessage(message){
        let msg = this.htmlspecialchars(message);
        let rightMsgdiv = this.dom.createElement('div');
        rightMsgdiv.className = "messageRight";
        rightMsgdiv.innerHTML = '<div class="avatar"></div>\r\n<div class="nick"></div>\r\n<div class="msgWrapper">\r\n<div class="msg">'
                        +message+'</div>';
        this.chatPanel.appendChild(rightMsgdiv);
        //this.inputPanel.scrollIntoView();
        this.scrollToMessage();
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
        //this.inputPanel.scrollIntoView();
        this.scrollToMessage();
    }

    toggleShowActionPanel(height){
        if(this.actionPanel.style.height=="") this.actionPanel.style.height = height+"px";
        else this.actionPanel.style.height="";
    }

    hideActionPanel(){
        this.actionPanel.style.height="";
        //this.chatInput.blur();
    }

    sendLeave(){
        this.socket.emit('user unload',{user:localStorage.getItem('userId')});
    }

    addSocketListeners(){
        this.socket.on('connect',()=>{
            console.log("Connected! "+ this.socket.io.engine.id);
            if(!localStorage.getItem('userId'))
            localStorage.setItem('userId', this.socket.io.engine.id);
        });
        this.socket.on('chat message',(message)=>{
           this.receiveMessage(message);
           //console.log(message);
        });
        this.socket.on('event',()=>{});
        this.socket.on('disconnect',()=>{
            this.sendLeave();
        });
    }

    addActionPanelLinsteners(){
        this.newChatBtn.bind('touchend',()=>{
            console.log('click newChatBtn');
            this.hideActionPanel();
        });
        this.closeChatBtn.bind('touchend',()=>{
            console.log('click closeChatBtn');
            this.hideActionPanel();
        });
        this.aboutUsBtn.bind('touchend',()=>{
            console.log('click aboutUsBtn');
            this.hideActionPanel();
        });
    }

    addInputListeners(){
        //Change to ()=>{} will not need this
        //if use function express should use const this = this;
        this.chatPanel.bind('touchstart',()=>{
            this.hideActionPanel();
        });
        this.chatInput.addEventListener('focus',()=>{  
            this.hideActionPanel();
            setTimeout(()=>{
                this.inputPanel.scrollIntoView();
            },500);
        });
        this.chatInput.addEventListener('keyup',()=>{
            if(this.chatInput.innerText!="")  this.rightIcon.className="rightIcon send";
            else this.rightIcon.className="rightIcon";
        });
        this.rightIcon.bind('touchstart',(e)=>{
            if(this.rightIcon.className=="rightIcon"){
                this.toggleShowActionPanel(200);
            }
            if(this.rightIcon.className=="rightIcon send"&&this.chatInput.innerText!=""){
                this.sendMessage(this.chatInput.innerText);
                this.chatInput.innerText = "";
                this.rightIcon.className="rightIcon";
                this.chatInput.blur();
            }
            //e.stopPropagation();
        });
        this.chatInput.addEventListener('keypress',()=>{
            let keyPressed = event.keyCode || event.which;
            //if ENTER is pressed
            if(keyPressed==13)
            {
                this.sendMessage(this.chatInput.innerText);
                this.chatInput.innerText = "";
                keyPressed=null;
                this.chatInput.blur();
                this.rightIcon.className="rightIcon";
                event.preventDefault();
            }
        });
    }
}
export default ChatApp;