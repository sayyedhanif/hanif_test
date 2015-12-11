var request = require('request');

module.exports = function(){

    this.id = "tick-projects-get";
    this.label = "Get Projects"; 

    this.input = { 
       "title": "Get Projects",
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
            }
        }
    };

    this.help = "service to get projects";

    this.output = {
        "title" : "output",
        "type" : "object",
        "projects":{
            "type":"Array",
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
                "date_closed":{
                    "title":"Date Closed",
                    "type" :"any"
                },
                "notifications":{
                    "title":"Notifications",
                    "type" :"boolean"
                },
                "billable":{
                    "title":"Billable",
                    "type" :"boolean"
                },
                "recurring":{
                    "title":"Recurring",
                    "type" :"string"
                },
                "client_id":{
                    "title":"Client Id",
                    "type" :"integer"
                },
                "owner_id":{
                    "title":"Owner Id",
                    "type" :"string"
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
            url: "https://"+input.account_url+".tickspot.com/"+input.subscription_id+"/api/v2/projects.json",
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
                    return output(null, {projects: body});
                }
               return output(body);
            }
        })
    };    
}




