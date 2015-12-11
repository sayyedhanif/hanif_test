var request = require('request');

module.exports = function(){

    this.id = "tick-entry-create";

    this.label = "Create Enrty"; 

    this.input = { 
        "title": "Create Enrty",
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
            "token":{
                "title":"API Token",
                "type":"string",
                "description":"Enter API Token",
                "minLength":1
            },
            "account_url":{
                "title":"Account Url Name",
                "type":"string",
                "description":"Enter your account url ie. http://[account_url_name].tickspot.com",
                "minLength":1
            }, 
            "date":{
                "title":"Date",
                "type":"string",
                "description":"Enter Date"
            },
           "hours":{
                "title":"Hours",
                "type":"integer",
                "description":"Enter Hours"
            },
            "notes":{
                "title":"Notes",
                "type":"string",
                "description":"Enter Notes"
            },
            "task_id":{
                "title":"Task Id",
                "type":"integer",
                "description":"Enter Task Id",
                "minimum":1
            },
            "user_id":{
                "title":"User Id",
                "type" :"integer",
                "description":"Enter User Id",
                "minimum":1
            }
        }
    };

    this.help = "Service to Create Entry";

    this.output = {
        "title" : "output",
        "type" : "object",
        "entry":{
            "type":"object",
            "properties":{
                "id":{
                    "title":"Id",
                    "type" :"integer"
                },
                "date":{
                    "title":"Date",
                    "type" :"string"
                },
                "hours":{
                    "title":"Hours",
                    "type" :"integer"
                },
                "notes":{
                    "title":"Notes",
                    "type" :"string"
                },
                "task_id":{
                    "title":"Task Id",
                    "type" :"integer"
                },
                "user_id":{
                    "title":"User Id",
                    "type" :"integer"
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
                "Authorization" : "Token token=53acaadd44293839bc54a4e4548d1571",
                "User-Agent": "sachin.jaiswal@raweng.com"
            },
            method: "POST",
            url: "https://raw-engineering.tickspot.com/85971/api/v2/entries.json",            
            json:{
                "name":input.name,
                "date":input.date,
                "hours":input.hours,
                "notes":input.notes,
                "task_id":input.task_id,
                "user_id":input.user_id
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
                    return output(null, {entry:body});
                }
                output(body);
            }
        })
    };
};

