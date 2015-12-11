var request = require('request');

module.exports = function(){

    this.id = "tick-client-create";

    this.label = "Create Client"; 

    this.input = { 
        "title": "Create Client",
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
                "description":"Enter your account url ie. http://account_url_name.tickspot.com",
                "minLength":1
            },
            "token":{
                "title":"API Token",
                "type":"string",
                "description":"Enter API Token",
                "minLength":1
            },
            "name":{
                "title":"Name",
                "type" :"string",
                "description":"Enter Client Name",
                "minLength":1
            },
            "archive":{
                "title":"archive",
                "type" :"boolean",
                "description":"Enter Archive value ie. true or false",
            },
        }
    };

    this.help = "Service to Create Client";

    this.output = {
        "title" : "output",
        "type" : "object",
        "properties":{
            "name":{
                "title":"Name",
                "type" :"string"
            },
            "archive":{
                "title":"archive",
                "type" :"boolean"
            }
        }
    }

    this.execute = function(input,output){

        request({  
            headers: {
            "Authorization" : "Token token="+input.token,
            "User-Agent": input.email
            },
            url: "https://"+input.account_url+".tickspot.com/"+input.subscription_id+"/api/v2/clients.json",
            method: "POST",
            json:{
                    "name":input.name,
                    "archive":input.archive
                }
        },function(err,res,body){
             if(err){
             return output(err);
            }
            else{
                if(response.statusCode && response.statusCode >=200 && response.statusCode < 400){
                    if (typeof(body) == 'string') {
                        body = JSON.parse(body);
                    }
                    return output(null, body);
                }
                output(body);
            }
        })
    };
}

