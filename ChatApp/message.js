var moment = require('moment');
var genmessage = (user,text)=>{
    return{
        user:user,
        text:text,
        createdAt:moment().format('LT')
    };
}

module.exports = {genmessage};