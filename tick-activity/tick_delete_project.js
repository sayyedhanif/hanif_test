var request = require('request');

module.exports = function(){

    this.id = "tick-project-delete";

    this.label = "Delete Project"; 

    this.input = { 
       "title": "Delete Project",
        "type": "object",
        "properties": {
            "email":{
                "title":"Email Id",
                "type":"string",
                "description":"Enter email id",
                "minLength":1
           }, 
           "subscription_id":{
                "title":"Subscription ID",
                "type":"integer",
                "description":"Enter Subscription ID",
                "minimum":1
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
           "project_id":{
                "title":"Project Id",
                "type":"integer",
                "description":"Enter Project Id",
                "minimum":1
            }
        }
    };

    this.help = "service to delete project";

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
            url: "https://"+input.account_url+".tickspot.com/"+input.subscription_id+"/api/v2/projects/"+input.project_id+".json",
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




