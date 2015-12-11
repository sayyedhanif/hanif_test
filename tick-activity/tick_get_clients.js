var request = require('request');

module.exports = function(){

    this.id = "tick-clients-get";

    this.label = "Get Clients"; 

    this.input = { 
        "title": "Get Clients",
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
                "title":"Acount Url Name",
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
        }
    };

    this.help = "service to get clients";

    this.output = {
        "title" : "output",
        "type" : "object",
        "properties":{
            "clients":{
                "type":"object",
                "id":{
                    "title":"Id",
                    "type" :"integer"
                },
                "name":{
                    "title":"Name",
                    "type" :"string"
                },
                "archive":{
                    "title":"archive",
                    "type" :"boolean"
                },
                "url":{
                    "title":"Url",
                    "type" :"string"
                },
                "updated_at":{
                    "title":"Updated At",
                    "type" :"string"
                }
            }
        }
    };
      
    this.execute = function(input,output){
        request({
            headers: {
                "Authorization" : "Token token="+input.token,
                "User-Agent": input.email,
            },  
            url: "https://"+input.account_url+".tickspot.com/"+input.subscription_id+"/api/v2/clients.json",
            method: 'GET'
        },
        function(err,response,body){
            if(err){
                return output(err);
            }
            else{
                if(response.statusCode && response.statusCode >=200 && response.statusCode < 400){
                    if (typeof(body) == 'string') {
                        body = JSON.parse(body);
                    }
                    return output(null, {clients: body});
                }
                return output(body);
            }
       })
    };    
};




