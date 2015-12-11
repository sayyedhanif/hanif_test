var request = require('request');

module.exports = function(){

    this.id = "tick-entry-get";

    this.label = "Get Entry"; 

    this.input = { 
       "title": "Get Entry",
        "type": "object",
        "properties": {
          "email":{
                "title":"Email Id",
                "type":"string",
                "description":"Enter Email Id",
                "Minmum":1
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
             "start_date":{
                "title":"Start Date",
                "type":"string",
                "format":"date",
                "description":"Enter start date",
                "minLength":1
           },
             "end_date":{
                "title":"End Date",
                "type":"string",
                "format":"date",
                "description":"Enter end date",
                "minLength":1
           },
            "entry_id":{
                "title":"Entry Id",
                "type":"integer",
                "description":"Enter Entry Id",
                "minimum":1
            }
        }
    };

    this.help = "service to get entry";

    this.output = {
        "title" : "output",
        "type" : "object",
        "properties":{
            "entry":{
                "type":"array",
                "properties":{
                    "type":"object",
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
            }   }
        }    
    };  
      
    this.execute = function(input,output){

       request({
        headers: {
            "Authorization" : "Token token="+input.token,
            "User-Agent": input.email,
            },  
            method: 'GET',
            url: "https://"+input.account_url+".tickspot.com/"+input.subscription_id+"/api/v2/entries/"+input.entry_id+".json"                  
        },function(err,response,body){
            if(err){
                return output(err);
            }
            else{
                if(response.statusCode && response.statusCode >=200 && response.statusCode < 400){
                    console.log(err,res.statusCode,body);
                    if (typeof(body) == 'string') {
                        body = JSON.parse(body);
                    }
                    return output(null, {entry:body});
                }
               return output(body);
            }
        })
    };    
};




