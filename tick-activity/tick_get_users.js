var request = require('request');

module.exports = function(){

    this.id = "tick-users-get";

    this.label = "Get Users "; 

    this.input = { 
       "title": "Get Users",
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

    this.help = "service to get users";

    this.output = {

        "title" : "output",
        "type" : "object",
        "properties":{
            "users":{
                "type":"object",
                "id":{
                    "title":"Id",
                    "type" :"integer"
                },
                "first_name":{
                    "title":"First Name",
                    "type" :"string"
                },
                "last_name":{
                    "title":"Last Name",
                    "type" :"string"
                },
                "email":{
                    "title":"Email",
                    "type" :"string"
                },
                "timezone":{
                    "title":"Timezone ",
                    "type" :"string"
                },
                "created_at":{
                    "title":"Created At ",
                    "type" :"string"
                },
                "updated_at":{
                    "title":"Updated At ",
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
            method: 'GET',
            url: "https://"+input.account_url+".tickspot.com/"+input.subscription_id+"/api/v2/users.json",        
            },function(err,response,body){
            if(err){
                return output(err);
            }
            else{
                if(response.statusCode && response.statusCode >=200 && response.statusCode < 400){
                    if (typeof(body) == 'string') {
                        body = JSON.parse(body);
                    }
                    return output(null, {users: body});
                }
               return output(body);
            }
        })
    };    
}




