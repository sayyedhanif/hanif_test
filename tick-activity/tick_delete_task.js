var request = require('request');

module.exports = function(){

    this.id = "tick-task-delete";

    this.label = "Delete Task"; 

    this.input = { 
       "title": "Delete Task",
        "type": "object",
        "properties": {
            "email":{
                "title":"Email Id",
                "type":"string",
                "description":"Enter Email Id",
                "minLength":1
           }, 
           "subscription_id":{
                "title":"Subscription ID",
                "type":"integer",
                "description":"Enter Subscription ID",
                "minLength":1
            },
            "account_url":{
                "title":"Account Url Name",
                "type":"string",
                "description":"Enter your account url ie. http://[account_url_name].tickspot.com",
                "minLength":1
            },
            "token":{
                "title":"API Token",
                "type":"string",
                "description":"Enter API Token",
                "minLength":1
            },
            "task_id":{
                "title":"Task Id",
                "type":"integer",
                "description":"Enter Project Id",
                "minimum":1
            }
        }
    };

    this.help = "service to delete task";

    this.output = {
        "title" : "output",
        "type" : "object",
        "properties":{
            "deleted": {
                "title": "deleted",
                "type": "boolean"
            }
        }
    };
      
    this.execute = function(input,output){
        
        request({
            headers: {
                "Authorization" : "Token token="+input.token,
                "User-Agent": "example@gmail.com"
            },
            method: 'DELETE', 
            url: "https://"+input.account_url+".tickspot.com/"+input.subscription_id+"/api/v2/tasks/"+input.task_id+".json",
        },function(err,response,body){  
            if(err){
            return output(err);
            }
            else{
                if(response.statusCode && response.statusCode >=200 && response.statusCode < 400){
                    return output(null, {deleted:true});
                }
                return output(body);
           }
        })
    };    
};




