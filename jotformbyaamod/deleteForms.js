var request = require('request');

module.exports = function(){

    this.id = "jotform-form-delete";
    this.label = "Delete Form"; 

    this.input = { 
      "title": "Delete Form",
      "type": "object",
      "properties": {
        "apikey":{
                "title":"API Key",
                "type": "string",
                "minLength": 1
            },  
            "form_id":{
                "title":"Form Id",
                "type": "string",
                "description":"Enter form id",
                "minLength": 1
            }                        
        }
    };

    this.help = "Service to Delete Form"    

    this.output = {
        "title": "output",
        "type": "object",
        "properties": {
            "responseCode": {
                "title": "responseCode",
                "type": "integer"
            },
            "message": {
                "title": "message",
                "type": "string"
            },
            "content": {
                "title": "content",
                "type": "object",
                "properties":{
                    "id": {
                        "title": "id",
                        "type": "string"
                    },
                    "username": {
                        "title": "username",
                        "type": "string"
                    },
                    "title": {
                        "title": "title",
                        "type": "string"
                    },
                    "height": {
                        "title": "height",
                        "type": "string"
                    },
                    "status": {
                        "title": "status",
                        "type": "string"
                    },
                    "created_at": {
                        "title": "created_at",
                        "type": "string"
                    },
                    "updated_at": {
                        "title": "updated_at",
                        "type": "string"
                    },
                    "new": {
                        "title": "country",
                        "type": "string"
                    },
                    "count": {
                        "title": "count",
                        "type": "string"
                    },
                    "last_submission": {
                        "title": "last_submission",
                        "type": "any"
                    }
                }                
            },
            "duration": {
                "title": "duration",
                "type": "string"
            },
            "limit-left": {
                "title": "limit-left",
                "type": "integer"
            }
        }
    };

    this.execute = function(input,output){
        
        request.del({
            url: "https://api.jotform.com/form/"+input.form_id.trim()+"?apiKey="+input.apikey.trim(),
            json: true

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

