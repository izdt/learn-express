import Chat from './chat';
(function(document,window,undefined){
    const chat = new Chat();
    window.onload = (e)=>{ 
        const body = document.getElementsByTagName('body')[0];
        chat.showHello();
        chat.changeDomValue(body,"Hello World!");
    };
})(document,window);
