// require any modules

module.exports = function(){
    var request = require('request');
    this.id = "freshdesk-ticket-list";
    this.label = "Ticket List"; 

    this.input = { 
       "title": "Ticket List",
       "type": "object",
        "properties": {
           "username":{
             "title":"Username",
             "type":"string",
             "description":"Enter Username"
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
                  "description":"Enter Domain Name",
                  "minLength":1
                }
          }
    };

    this.help = "service to list ticket";
     
  this.output = {
    "title" : "output",
      "type" : "object",
      "properties":{
          "title" : "output",
          "type" : "object",
        "properties":{
           "helpdesk_ticket":{
             "title":"helpdesk_ticket",
             "type":"object",
             "properties":{
               "cc_email":{
                 "title":"cc_email",
                 "type":"object"
                },
            }
          },
          "created_at":{
            "title":"created_at",
            "type":"string"
          },
          "deleted":{
            "title":"deleted",
            "type":"boolean"
          },
          "delta":{
            "title":"delta",
            "type":"boolean"
          },
          "description":{
            "title":"description",
            "type":"string"
          },
          "description_html":{
            "title":"description_html",
            "type":"string"
          },
          "display_id":{
            "title":"display_id",
            "type":"integer"
          },
          "due_by":{
            "title":"due_by",
            "type":"string"
          },
          "email_config_id":{
            "title":"email_config_id",
            "type":"any"
          },
          "frDueBy":{
            "title":"frDueBy",
            "type":"string"
          },
          "fr_escalated":{
            "title":"fr_escalated",
            "type":"boolean"
          },
          "notes":{
            "title":"notes",
            "type":"array"
          },
          "group_id":{
            "title":"group_id",
            "type":"any"
          },
          "id":{
            "title":"id",
            "type":"string"
          },
          "isescalated":{
            "title":"isescalated",
            "type":"boolean"
          },
          "owner_id":{
            "title":"owner_id",
            "type":"null"
          },
          "priority":{
            "title":"priority",
            "type":"integer"
          },
          "requester_id":{
            "title":"requester_id",
            "type":"integer"
          },
          "responder_id":{
            "title":"responder_id",
            "type":"any"
          },
          "source":{
            "title":"source",
            "type":"integer"
          },
          "spam":{
            "title":"spam",
            "type":"boolean"
          },
          "status":{
            "title":"status",
            "type":"integer"
          },
          "subject":{
            "title":"subject",
            "type":"string"
          },
          "ticket_type":{
            "title":"frDueBy",
            "type":"any"
          },
          "to_email":{
            "title":"to_email",
            "type":"any"
          },
          "trained":{
            "title":"trained",
            "type":"boolean"
          },
          "updated_at":{
            "title":"updated_at",
            "type":"string"
          },
          "urgent":{
            "title":"urgent",
            "type":"boolean"
          },
          "status_name":{
            "title":"subject",
            "type":"string"
          },
          "requester_status_name":{
            "title":"requester_status_name",
            "type":"string"
          },
          "priority_name":{
            "title":"subject",
            "type":"string"
          },
          "source_name":{
            "title":"source_name",
            "type":"string"
          },
          "requester_name":{
            "title":"requester_name",
            "type":"string"
          },
          "to_emails":{
            "title":"to_emails",
            "type":"any"
          },
          "product_id":{
            "title":"subject",
            "type":"any"
          },
          "attachments":{
            "title":"attachments",
            "type":"array"
          },
          "custom_field":{
            "title":"custom_field",
            "type":"object"
          },
          "tags":{
            "title":"tags",
            "type":"array"
          }


        }
      }
    };

    this.execute = function(input,output){
        
        console.log("https://"+input.domain_name+".freshdesk.com/helpdesk/tickets.json");
        request({  
            url: "https://"+input.domain_name+".freshdesk.com/helpdesk/tickets.json",
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
               return output(null, body);
               }
               output(body);
           }
       })
    };    
}



