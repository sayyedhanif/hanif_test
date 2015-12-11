var request = require('request');

module.exports = function(){

    this.id = "tick-task-get";
    this.label = "Get Task"; 

    this.input = { 
    "title": "Get Task",
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
            },
            "task_id":{
                "title":"Task Id",
                "type":"integer",
                "description":"Enter Task Id",
                "minimum":1

            }
        }
    };

    this.help = "service to get task";

    this.output = {
        "title" : "output",
        "type" : "object",
        "task": {
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
                "created_at":{
                    "title":"Created At",
                    "type" :"string"
                },
                "updated_at":{
                    "title":"Updated At",
                    "type" :"string"
                },
                "total_hours":{
                    "title":"Total Hours",
                    "type":"integer"
                },
                "entries":{
                    "type":"object",
                    "properties":{
                        "count":{
                            "title":"Count",
                            "type":"integer"
                        },
                        "url":{
                            "title":"Url",
                            "type":"string"
                        },
                        "updated_at":{
                            "title":"Updated At",
                            "type":"any"
                        }
                    }
                },
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
                            "title":"Billable ",
                            "type" :"integer"
                        },
                        "billable":{
                            "title":"Billable",
                            "type" :"boolean"
                        },
                        "recurring":{
                            "title":"Recurring",
                            "type" :"boolean"
                        },
                        "client_id":{
                            "title":"Updated At",
                            "type" :"integer"
                        },
                        "owner_id":{
                            "title":"Owner Id",
                            "type" :"integer"
                        },
                        "url":{
                            "title":"Url",
                            "type" :"integer"
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
            }
        }
    };
      
    this.execute = function(input,output){

        request({
            headers: {
                "Authorization" : "Token token="+input.token,
                "User-Agent": input.email,
            },  
            url: "https://"+input.account_url+".tickspot.com/"+input.subscription_id+"/api/v2/tasks/"+input.task_id+".json",
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
                    return output(null, {task: body});
                }
               return output(body);
            }
        })
    };    
};




