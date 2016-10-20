import randomcolor from '../../../node_modules/randomcolor/randomColor';
const chatUtility = {
    
    getUid: ()=>{
        return ("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4);
    },

    getRandomColor: ()=>{
        return '#'+(Math.random()*0xffffff<<0).toString(16);
    },

    getRandomColorWithLib: ()=>{
        return randomcolor();
    },

    htmlspecialchars: (str)=>{    
        str = str.replace(/&/g, '&amp;');  
        str = str.replace(/</g, '&lt;');  
        str = str.replace(/>/g, '&gt;');  
        str = str.replace(/"/g, '&quot;');  
        str = str.replace(/'/g, '&#039;');  
        return str;  
    }
}; 

export default chatUtility;