var request = require('request');

module.exports = function(){

    this.id = "activecampaign-message-details";
    this.label = "Message Details";

    this.input = {
        "title": "Message Details",
        "type": "object",
        "properties": {
            "account":{
                "title":"Account Name",
                "type": "string",
                "description":"Enter account name that is subdomain like [account_name].activehosted.com",
                "minLength": 1
            },
            "api_key":{
                "title":"API Key",
                "type": "string",
                "minLength": 1
            },
            "id":{
                "title":"Message Id",
                "type": "string",
                "description":"ID of the email message you want to view",
                "minLength": 1
            }            
        }
    };

    this.help = "Service to get message details";

    this.output = {
        "title": "output",
        "type": "object",
        "properties": {
            "id": {
                "title": "id",
                "type": "string"
            },          
            "userid": {
                "title": "userid",
                "type": "string"
            },
            "name": {
                "title": "name",
                "type": "string"
            },
            "cdate": {
                "title": "cdate",
                "type": "string"
            },
            "mdate": {
                "title": "mdate",
                "type": "string"
            },
            "fromname": {
                "title": "fromname",
                "type": "any"
            },
            "fromemail": {
                "title": "fromemail",
                "type": "string"
            },
            "format": {
                "title": "format",
                "type": "string"
            },
            "subject": {
                "title": "subject",
                "type": "string"
            },
            "text": {
                "title": "text",
                "type": "string"
            },
            "html": {
                "title": "html",
                "type": "string"
            },            
            "lists": {
                "title": "lists",
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        
                    }
                }
            },
            "result_code": {
                "title": "result_code",
                "type": "integer"
            },
            "result_message": {
                "title": "result_message",
                "type": "string"
            },
            "result_output": {
                "title": "result_output",
                "type": "string"
            }
        }
    };

    this.execute = function(input,output){       
        
        var URL = 'http://'+input.account.trim()+'.api-us1.com/admin/api.php?api_key='+input.api_key.trim()+'&api_action=message_view&id='+input.id.trim()+'&api_output=json';
        request.get({
            url:URL,                      
            json:true
        }, function(err, response, body){
            if(err){
                return output(err);
            }
            else{
                if(response.statusCode && response.statusCode >=200 && response.statusCode < 400){
                    if(typeof(body)=="string"){
                        body = JSON.parse(body);
                    }
                    return output(null, body);
                }
                return output(body);
            }
        })
    };    
}