var request = require('request');

module.exports = function(){

    this.id = "tick-task-create";

    this.label = "Create Task"; 

    this.input = { 
        "title": "Create Task",
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
            "name":{
                "title":"Name",
                "type" :"string",
                "description":"Enter User Name",
                "minLength":1
            },
            "budget":{
                "title":"Budget ",
                "type":"integer",
                "description":"Enter budget"
            },
            "project_id":{
                "title":"Project Id",
                "type":"integer",
                "description":"Enter Project ID",
                "minimum":1

            },
            "billable":{
                "title":"billable",
                "type" :"boolean",
                "description":"Enter Billable",
            }
        }
    };

    this.help = "Service to Create Task";

    this.output = {
        "title" : "output",
        "type" : "object",
        "task":{
            "type":"object",
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
                "User-Agent": input.email
            },
            method: "POST",
            url: "https://"+input.account_url+".tickspot.com/"+input.subscription_id+"/api/v2/tasks.json",
            json:{
                "name":input.name,
                "budget":input.budget,
                "project_id":input.project_id,
                "billable":input.billable
            }
        },function(err,response,body){
             if(err){
             return output(err);
            }
            else{
                if(response.statusCode && response.statusCode >=200 && response.statusCode < 400){
                    if (typeof(body) == 'string') {
                        body = JSON.parse(body);
                    }
                    return output(null, {task:body});
                }
                output(body);
            }
        })
    };
};

