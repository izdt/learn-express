import QrCode from './utility/qrcode';
//import WebPullToRefresh from './utility/wptr';
import pullRefresh from './utility/pullRefresh';
import localStore from './utility/storeUtility';
import chatUtility from './utility/chatUtility';

class ChatApp{
    constructor(dom,socket,room){
        this.dom = dom;
        this.socket = socket; 
        this.room = room;
        this.timeStamp = (new Date()).getTime();
        //this.timeStamp = dom.getElementsByClassName('timeBlock')[0].dataset.time;
        this.chatInput = dom.getElementById('inputBox');
        this.inputPanel = dom.getElementsByClassName('inputPanel')[0];
        this.chatPanel = dom.getElementsByClassName('chatPanel')[0];
        this.rightIcon = dom.getElementsByClassName('rightIcon')[0];
        this.actionPanel = dom.getElementById('actionPanel');
        this.newChatBtn = dom.getElementsByClassName('newChat')[0];
        this.closeChatBtn = dom.getElementsByClassName('closeChat')[0];
        this.aboutUsBtn = dom.getElementsByClassName('aboutUs')[0];
        this.leftIconBtn = dom.getElementsByClassName('leftIcon')[0];
        this.messageBox = dom.getElementById("messageBox");
        this.loadingDiv = dom.getElementsByClassName("loading")[0];
        this.avatarColor = chatUtility.getRandomColor();
        this.showHomeModal();
    }

    showQrWithUrl(url, tip){
        this.hideActionPanel();
        this.messageBox.innerHTML = '';
        let qrDiv = this.dom.createElement('div');
        let width = window.innerWidth;
        tip = tip ? tip:"长按扫描识别后进入聊天";
        qrDiv.innerHTML = "<div>"+tip+"</div>";
        this.messageBox.appendChild(qrDiv);
        this.showQrCode(qrDiv,{width:width/2,height:width/2,text:url});
    }

    quitChat(){
        location.href = '/c/';
    }

    showQuitModal(){
        this.hideActionPanel();
        this.messageBox.innerHTML = '';
        let modalDiv = this.dom.createElement('div');
        modalDiv.className = "quitModal";
        modalDiv.innerHTML = '<div>确定要退出讨论群组?<div class="btnGroup"><span class="btn">确定</span><span class="btn">取消</span></div></div>';
        this.messageBox.appendChild(modalDiv);
        setTimeout(()=>{
            this.messageBox.style.display = 'block';
            modalDiv.getElementsByClassName('btn')[0].bind('click',()=>{
                this.quitChat();
            });
        },360);
    }

    showHomeModal(){
       if(location.pathname=="/c/"||location.pathname=="/c"){
           let url = 'http://'+location.host+'/c/' + chatUtility.getUid();
           this.showQrWithUrl(url);
       }
    }

    showQrCode(ele, options){
        let defaultOptions = {
            width: 268,
            height: 268,
            padding: 20,
            colorDark : "#288344",
            colorLight : "#ffffff",
            logo: "/static/images/chat.png",
            correctLevel : QrCode.CorrectLevel.H
        };
        Object.assign(options, defaultOptions);
        new QrCode(ele, options);
        setTimeout(()=>{
            this.messageBox.style.display = 'block';
        },360);
    }

    initPullRefresh(){
        let room = this.room;
        let timeStamp = this.timeStamp;
        let pullMessage = this.pullToGetMessages;
        let currentNum = 1;
        let generateMsgDiv = this.generateMsgDiv;
        let chatPanel = this.chatPanel;
        let loadingDiv = this.loadingDiv;
        let pullToGetMessages = (messages)=>{
            messages.forEach((m)=> {
                let msgDiv = generateMsgDiv(m.message);
                chatPanel.insertBefore(msgDiv,chatPanel.children[0]);
            });
        };
        let refreshToLoad = ()=>{
            return fetch('/c/'+room+'/messages/'+currentNum+'/'+timeStamp/*,{method:'post'}*/)
                   .then((response)=>{
                        return response.json();
                   })
                   .then((data)=>{
                       //console.log(currentNum);
                       if(data.length){
                            currentNum++;
                            pullToGetMessages(data);
                       }else{
                           loadingDiv.innerText = "所有消息已加载...";
                       }
                       //console.log(data);
                   })
                   .catch((e)=>{
                       console.log("Error "+e.message);
                   });
        };

        pullRefresh.init(this.dom.getElementById("content"),this.dom.getElementById("ptr"), refreshToLoad);
    }

    scrollToMessage(){
        this.chatPanel.querySelector('.chatPanel>div:last-child').scrollIntoView();
    }

    sendMessage(message){
        let msg = chatUtility.htmlspecialchars(message);
        let rightMsgdiv = this.dom.createElement('div');
        rightMsgdiv.className = "messageRight";
        rightMsgdiv.innerHTML = '<div class="avatar" style="background-color:'+this.avatarColor+';"></div>\r\n<div class="nick"></div>\r\n<div class="msgWrapper">\r\n<div class="msg">'
                        +msg+'</div>';
        this.chatPanel.appendChild(rightMsgdiv);
        //this.inputPanel.scrollIntoView();
        this.scrollToMessage();
        this.socket.emit('chat message', this.room, {msg:msg, user:localStore.getItem('userId'), avatarColor:this.avatarColor});
    }

    generateMsgDiv(message){
        //if(messageObj.user==localStore.getItem('userId')) return;
        let msg = chatUtility.htmlspecialchars(message.msg);
        let color = message.avatarColor;
        let leftMsgdiv = (this?this.dom:document).createElement('div');
        leftMsgdiv.className = "messageLeft";
        leftMsgdiv.innerHTML = '<div class="avatar" style="background-color:'+color+';"></div>\r\n<div class="nick"></div>\r\n<div class="msgWrapper">\r\n<div class="msg">'
                        +msg+'</div>';
        return leftMsgdiv;
    }

    receiveMessage(message){
        let leftMsgdiv = this.generateMsgDiv(message);
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

    hideMessageBox(){
        this.messageBox.style.display='none';
    }

    sendLeave(){
        this.socket.emit('user unload', this.room, {user:localStore.getItem('userId')});
    }

    addSocketListeners(){
        //this.socket.join(this.room);
        this.socket.on('connect',()=>{
            this.socket.emit('join room', this.room);
            console.log("Connected! "+ this.socket.io.engine.id);
            if(!localStore.getItem('userId'))
            localStore.setItem('userId', this.socket.io.engine.id);
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
        this.newChatBtn.bind('touchend click',(e)=>{
            //console.log('click newChatBtn');
            let url = 'http://'+location.host+'/c/' + chatUtility.getUid();
            this.showQrWithUrl(url);
            //e.stopPropagation();
            //console.log(location.href+this.socket.io.engine.id);
            //console.log('http://'+location.host+'/c/' + this.getUid());
            //location.hash = 'messageBox'; 
        });
        this.closeChatBtn.bind('touchend click',()=>{
            this.showQuitModal();
            console.log('click closeChatBtn');
        });
        this.aboutUsBtn.bind('touchend click',()=>{
            console.log('%c'+chatUtility.getRandomColor(), 'background:'+chatUtility.getRandomColor()+'; color: #fff');
            console.log('click aboutUsBtn');
            this.hideActionPanel();
        });
        this.leftIconBtn.bind('touchend click',()=>{
            //console.log('click leftIconBtn');
            let url = location.href;
            this.showQrWithUrl(url,"长按保存分享此二维码邀请好友");
        });
        this.messageBox.bind('click',()=>{
            this.hideMessageBox();
        });
    }

    addInputListeners(){
        //Change to ()=>{} will not need this
        //if use function express should use const this = this;
        this.chatPanel.bind('touchstart click',()=>{
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
        this.rightIcon.bind('touchstart click',(e)=>{
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