var request = require('request');

module.exports = function(){

    this.id = "jotform-user-get";
    this.label = "User Details";

    this.input = { 
        "title": "User Details",
        "type": "object",
        "properties": {       
            "apikey":{
                "title":"API Key",
                "type": "string",
                "description": "Enter api key",      
                "minLength": 1
            }          
        }
    };

    this.help = "Service to get user details"
    
    this.output = {
        "type": "object",
        "properties":{
            "responseCode":{
              "title":"responseCode",
              "type" :"number"
            },
            "message":{
              "title":"message",
              "type" :"string"
            },
            "content":{
                "title":"content",
                "type" :"object",
                "properties":{
                    "username":{
                      "title":"username",
                      "type" :"string"
                    },
                    "name":{
                      "title":"name",
                      "type" :"any"
                    },
                    "email":{
                      "title":"email",
                      "type" :"string"
                    },
                    "website":{
                      "title":"website",
                      "type" :"any"
                    },
                    "time_zone":{
                      "title":"time_zone",
                      "type" :"any"
                    },
                    "account_type":{
                      "title":"account_type",
                      "type" :"string"
                    },
                    "status":{
                      "title":"status",
                      "type" :"string"
                    },
                    "created_at":{
                      "title" :"created_at",
                      "type"  :"string"
                    },
                    "updated_at":{
                      "title":"updated_at",
                      "type" :"string"
                    },
                    "country":{
                      "title":"country",
                      "type" :"string"
                    },
                    "usage":{
                      "title" :"usage",
                      "type" :"string"
                    },
                    "language":{
                      "title" :"language",
                      "type" :"string"
                    },
                    "folderLayout":{
                      "title":"folderLayout",
                      "type" :"string"
                    },
                    "avatarUrl":{
                      "title":"avatarUrl",
                      "type" :"string"
                    }
                }
            },
            "limit-left":{
                "title":"limit-left",
                "type" :"number"
            },
            "duration":{
                "title":"duration",
                "type" :"string"
            }
        }
    };

    this.execute = function(input,output){
        
        request.get({
            url:'https://api.jotform.com/user?apiKey='+input.apikey.trim()

        },function(err,response,body){
            if(err)
            {
                return output(err);
            }
            else{
                if(response.statusCode && response.statusCode >=200 && response.statusCode < 400){
                    if(typeof(body)=="string"){
                        body = JSON.parse(body);
                    }
                    return output(null,body);
                }
                return output(body);
            }            
        })
    };    
}

