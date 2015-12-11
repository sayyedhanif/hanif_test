// require any modules

module.exports = function(){
    var request = require('request');
    this.id = "freshdesk-ticket-list";
    this.label = "User List"; 

    this.input = { 
       "title": "User List",
       "type": "object",
        "properties": {
           "username":{
             "title":"Username",
             "type":"string",
             "description":"Enter Username, ie. john@mysite.com"
            },
              "password":{
                "title":"Password",
                "format":"password",
                "type":"string",
                "description":"Enter password"
              },
                "domain_name":{
                  "title":"Domain Name",
                  "type" :"string",
                  "description":"Enter Domain ie. domain_name.freshdesk.com",
                  "minLength":1
                }
        }
    };

    
    this.help = "service to list user"; 
    this.output = {
        "title" : "output",
        "type" : "object",
        "properties":{
            "user":{
                "title":"user",
                "type" :"object",
                "properties":{
                    "active":{
                        "title":"active",
                        "type" :"boolean"
                    },
                    "address":{
                        "title":"address",
                        "type" :"any"
                    },
                    "created_at":{
                        "title":  "created_at",
                          "type":"string"
                    },
                    "deleted":{
                        "title":"deleted",
                        "type":"boolean"
                    },
                    "description":{
                        "title":"description",
                        "type":"any"
                    },
                    "email":{
                        "title":"email",
                        "type":"string"
                    },
                    "external_id":{
                        "title":"external_id",
                        "type":"any"
                    },
                    "fb_profile_id":{
                        "title":"fb_profile_id",
                        "type":"any"
                    },
                    "helpdesk_agent":{
                        "title":"helpdesk_agent",
                        "type":"any"
                    },
                    "id":{
                        "title":"id",
                        "type":"integer"
                    },
                    "job_title":{
                        "title":"job_title",
                         "type":"any"
                    },
                    "language":{
                        "title":"language",
                         "type":"string"
                    },
                    "mobile":{
                        "title":"mobile",
                        "type":"any"
                    },
                    "name":{
                        "title":"name",
                         "type":"string"
                    },
                    "phone":{
                        "title":"phone",
                        "type":"any"
                    },
                    "time_zone":{
                        "title":"time_zone",
                        "type":"string"
                    },
                    "twitter_id":{
                        "title":"twitter_id",
                        "type":"any"
                    },
                    "updated_at":{
                        "title":"updated_at",
                        "type":"string"
                    },
                    "company_id":{
                        "title":"company_id",
                        "type":"any"
                    },
                    "custom_field":{
                        "title":"custom_field",
                        "type":"object"
                    }

                }
            }
        }
    }
      
    this.execute = function(input,output){
        
        request({  
            url: "https://"+input.domain_name+".freshdesk.com/contacts.json ",
            method: 'GET',
               auth: {
                "username": input.username,
                "pass": input.password
            }
      
             
        },function(err,res,body){
            if(err){
                return output(err);
           }
           else{
               if(res.statusCode >= 200 && res.statusCode < 400){
                if (typeof(body) == 'string') {
                    body = JSON.parse(body);
                }
               return output(null, body);
               }
               output(body);
           }
       })
    };    
}



