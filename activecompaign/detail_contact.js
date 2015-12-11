var request = require('request');

module.exports = function(){

    this.id = "activecampaign-contact-details";
    this.label = "Contact Details";

    this.input = {
        "title": "Contact Details",
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
                "title":"Contact Id",
                "type": "string",
                "minLength": 1,
                "description": "ID of the contact you want to view"
            }
        }
    };

    this.help = "Service to get contact details";

    this.output = {
        "title": "output",
        "type": "object",
        "properties": {
            "id": {
                "title": "id",
                "type": "integer"
            },
            "subscriberid": {
                "title": "subscriberid",
                "type": "string"
            },
            "listid": {
                "title": "listid",
                "type": "string"
            },
            "first_name": {
                "title": "first_name",
                "type": "string"
            },
            "last_name": {
                "title": "last_name",
                "type": "string"
            },
            "listname": {
                "title": "listname",
                "type": "string"
            },
            "cdate": {
                "title": "cdate",
                "type": "string"
            },
            "email": {
                "title": "email",
                "type": "string"
            },
            "phone": {
                "title": "phone",
                "type": "string"
            },
            "orgid": {
                "title": "orgid",
                "type": "string"
            },
            "orgname": {
                "title": "orgname",
                "type": "string"
            },
            "name": {
                "title": "name",
                "type": "string"
            },
            "lists": {
                "title": "lists",
                "type": "object",
                "properties": {

                }
            },
            "tags": {
                "title": "tags",
                "type": "array",
                "items": {
                    "type": "string"
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
        
        var URL = 'http://'+input.account.trim()+'.api-us1.com/admin/api.php?api_key='+input.api_key.trim()+'&api_action=contact_view&id='+input.id.trim()+'&api_output=json';
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