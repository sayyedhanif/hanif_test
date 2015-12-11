// require any modules

module.exports = function(){
    var request = require('request');
    this.id = "freshdesk-ticket-list";
    this.label = "Customer List"; 

    this.input = { 
       "title": "Customer List",
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

    
    this.help = "service to list customer"; 
    this.output = {
        "title" : "output",
        "type" : "object",
        "properties":{
            "customer":{ 
                "title":"customer",
                "type":"object",
                "properties":{
                    "created_at":{
                        "title":"created_at",
                        "type":"string"
                    },
                    "cust_identifier":{
                        "title":"cust_identifier",
                        "type":"any"
                    },
                    "description":{
                     "title":"description",
                     "type":"string"
                    },
                    "domains":{
                     "title":"domains",
                     "type":"string"
                    },
                    "id":{
                     "title":"id",
                     "type":"integer"
                    },
                    "name":{
                     "title":"name",
                     "type":"string"
                    },
                    "note":{
                     "title":"domains",
                     "type":"any"
                    },
                    "sla_policy_id":{
                     "title":"sla_policy_id",
                     "type":"integer"
                    },
                    "updated_at":{
                     "title":"domains",
                     "type":"any"
                    },
                    "custom_field":{
                        "title":"custom_field",
                         "type":"object"
                    }
                }
           }
       }
    };
      
    this.execute = function(input,output){
        
        request({  
            url: "https://"+input.domain_name+".freshdesk.com/customers.json ",
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



