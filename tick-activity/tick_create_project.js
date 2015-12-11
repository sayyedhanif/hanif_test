var request = require('request');

module.exports = function(){

    this.id = "tick-project-create";

    this.label = "Create Project"; 

    this.input = { 
        "title": "Create Project",
        "type": "object",
        "properties": { 
            "email":{
                "title":"Email Id",
                "type":"string",
                "description":"Enter email id",
                "propertyOrder":1,
                "minLength":1
            },
           "subscription_id":{
                "title":"Subscription ID",
                "type":"integer",
                "description":"Enter Subscription ID",
                "propertyOrder":1,
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
                "description":"Enter Project Name",
                "minLength":1
            },
            "budget":{
                "title":"Budget ",
                "type":"integer",
                "description":"Enter budget"
            },
            "notifications":{
                "title":"Notifications ",
                "type":"boolean",
                "description":"Enter Notifications"
            },
            "billable":{
                "title":"billable",
                "type" :"boolean",
                "description":"Enter Billable",
            },
            "recurring":{
                "title":"Recurring",
                "type" :"boolean",
                "description":"Enter recurring",
            },

            "client_id":{
                "title":"client_id",
                "type" :"integer",
                "description":"Client Id ",
                "minimum":1
            },
            "owner_id":{
                "title":"owner_id",
                "type" :"integer",
                "description":"Enter Owner Id",
                "minimum":1

            },
        }
    };

    this.help = "Service to Create Project";

    this.output = {
        "title" : "output",
        "type" : "object",
        "project":{
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
            "User-Agent": input.email
            },
            method: "POST",
            url: "https://"+input.account_url+".tickspot.com/"+input.subscription_id+"/api/v2/projects.json",
            json:{
                "name":input.name,
                "budget":input.budget,
                "notifications":input.notifications,
                "billable":input.billable,
                "recurring":input.recurring,
                "client_id":input.client_id,
                "owner_id":input.owner_id
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
                    return output(null, {project:body});
                }
                output(body);
            }
        })
    };
};

