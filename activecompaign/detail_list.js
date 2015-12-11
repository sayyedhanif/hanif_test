var request = require('request');

module.exports = function(){

    this.id = "activecampaign-list-details";
    this.label = "List Details";

    this.input = {
        "title": "List Details",
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
                "title":"List Id",
                "type": "string",
                "description":"ID of the mailing list you want to view",
                "minLength": 1
            }            
        }
    };

    this.help = "Service to get list details";

    this.output = {
        "title": "output",
        "type": "object",
        "properties": {
            "id": {
                "title": "id",
                "type": "integer"
            },
            "stringid": {
                "title": "stringid",
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
            "carboncopy": {
                "title": "carboncopy",
                "type": "any"
            },
            "to_name": {
                "title": "to_name",
                "type": "string"
            },
            "sender_name": {
                "title": "sender_name",
                "type": "string"
            },
            "sender_addr1": {
                "title": "sender_addr1",
                "type": "string"
            },
            "sender_city": {
                "title": "sender_city",
                "type": "string"
            },
            "sender_state": {
                "title": "sender_state",
                "type": "string"
            },
            "sender_zip": {
                "title": "sender_zip",
                "type": "string"
            },
            "sender_country": {
                "title": "sender_country",
                "type": "string"
            },
            "sender_phone": {
                "title": "sender_phone",
                "type": "string"
            },
            "sender_url": {
                "title": "sender_url",
                "type": "string"
            },           
            "sender_reminder": {
                "title": "sender_reminder",
                "type": "string"
            },
            "fulladdress": {
                "title": "fulladdress",
                "type": "string"
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
       
        
        var URL = 'http://'+input.account.trim()+'.api-us1.com/admin/api.php?api_key='+input.api_key.trim()+'&api_action=list_view&id='+input.id.trim()+'&api_output=json';
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