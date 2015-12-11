var request = require('request');

module.exports = function(){

    this.id = "tick-project-get";

    this.label = "Get Project"; 

    this.input = { 
       "title": "Get Project",
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
            "project_id":{
                "title":"Project Id",
                "type":"integer",
                "description":"Enter Project Id",
                "minimum":1
            },
        }
    };

    this.help = "service to get project";

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
            },
            "tasks":{
                "properties":{
                    "count":{
                        "title":"Count",
                        "type" :"integer"
                    },
                    "url":{
                        "title":"Url",
                        "type":"string"
                    },
                    "updated_at":{
                        "title":"Update At",
                        "type":"any"
                    }
                }
            },
            "client":{
                "properties":{
                    "id":{
                        "title":"id",
                        "type":"integer"
                    },
                    "name":{
                        "title":"name",
                        "type":"string"
                    },
                    "archive":{
                        "title":"archive",
                        "type":"string"
                    },
                    "url":{
                        "title":"Url",
                        "type":"string"
                    },
                    "updated_at":{
                        "title":"updated_at",
                        "type":"string"
                    }
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
            url: "https://"+input.account_url+".tickspot.com/"+input.subscription_id+"/api/v2/projects/"+input.project_id+".json",
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
                    return output(null, {project: body});
                }
               return output(body);
            }
        })
    };    
};




