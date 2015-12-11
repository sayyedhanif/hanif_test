module.exports = function(){

    var request = require('request');

    this.id = "freshdesk-company-customer-create"; 
    this.label = "Create Customer"; 

    this.input = {
      "title": "Create Customer",
      "type": "object",
      "properties": {
            "username":{
                "title":"Username",
                "type":"string",
                "minLength":1,
                "description":"Enter Username, ie. john@mysite.com"
            },
            "password":{
                "title":"Password",
                "format":"password",
                "type":"string",
                "minLength":1,
                "description":"Enter password"
            },
            "name":{
                "title":"Name",
                "type":"string",
                "description":"Enter Name",
                "minLength":1
            },
            "domains":{
                "title":"Domains",
                "type":"string",
                "description":"Enter Domain ie. Domain_Name.freshdesk.com"
            },
            "description":{
                "title":"Description",
                "type":"string",
                "description":"Enter description"
            }
        }
    };

    this.help = "service to create company's customer";

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
            url: "https://"+input.domains+".freshdesk.com/customers.json",
            method: "POST",
            auth: {
                "username":input.username,
                "pass":input.password
            },
            json: {
                "customer" : {
                    "name":input.name,
                    "domains":input.domains,
                    "description":input.description 
                }
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