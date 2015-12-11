var request = require('request');

module.exports = function(){

    this.id = "tick-tasks-get";
    this.label = "Get Tasks"; 

    this.input = { 
       "title": "Get Tasks",
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
            }
        }
    };

    this.help = "service to list clients";

    this.output = {
        "title" : "output",
        "type" : "object",
        "tasks":{
            "type":"array"
            "properties":{
                "id":{
                    "title":"Id",
                    "type" :"integer"
                },
                "name":{
                    "title":"Name",
                    "type" :"string"
                },
                "budget":{
                    "title":"Budget",
                    "type" :"integer"
                },
                "position":{
                    "title":"Position",
                    "type" :"integer"
                },
                "project_id":{
                    "title":"Project Id",
                    "type" :"integer"
                },
                "date_closed":{
                    "title":"Date Closed",
                    "type" :"any"
                },
                "billable":{
                    "title":"Billable",
                    "type" :"boolean"
                },
                "url":{
                    "title":"Url",
                    "type" :"string"
                },
                "created_at":{
                    "title":"Created At",
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
            url: "https://"+input.account_url+".tickspot.com/"+input.subscription_id+"/api/v2/tasks.json",
            method: 'GET'
        },function(err,response,body){
            if(err){
                return output(err);
            }
            else{
                if(response.statusCode && response.statusCode >=200 && response.statusCode < 400){
                    if (typeof(body) == 'string') {
                        body = JSON.parse(body);
                    }
                    return output(null, {tasks: body});
                }
               return output(body);
            }
        })
    };    
};




