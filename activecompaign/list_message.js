var request = require('request');

module.exports = function(){

    this.id = "activecampaign-message-list";
    this.label = "Messages List";

    this.input = {
        "title": "Messages List",
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
            "ids":{
                "title":"Ids of Messages",
                "type": "string",
                "description":"A comma-separated list of IDs of message you wish to fetch"
            },
        }
    };

    this.help = "Service to get messages list";

    this.output = {
        "title": "output",
        "type": "object",
        "properties": {
            "messages": {
                "title": "messages",
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "id": {
                            "title": "id",
                            "type": "string"
                        },          
                        "subject": {
                            "title": "subject",
                            "type": "string"
                        },
                        "files": {
                            "title": "files",
                            "type": "array",
                            "items": {

                            }
                        },
                        "filescnt": {
                            "title": "filescnt",
                            "type": "number"
                        }
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
       
       var ids = input.ids=='' ? 'all' : input.ids;
        
        var URL = 'http://'+input.account.trim()+'.api-us1.com/admin/api.php?api_key='+input.api_key.trim()+'&api_action=message_list&ids='+ids+'&api_output=json';
        request.get({
            url:URL 
            
        }, function(err, response, body){           
            if(err){
                return output(err);
            }
            else{
                if(response.statusCode && response.statusCode >=200 && response.statusCode < 400){
                    if(typeof(body)=="string"){
                        body = JSON.parse(body);
                    }
                    var messageObj = {};
                    messageObj.result_message = body.result_message;
                    messageObj.result_output = body.result_output;
                    messageObj.result_code = body.result_code;
                    delete body.result_message;
                    delete body.result_output;
                    delete body.result_code

                    var messageArray = Object.keys(body).map(function (key) {return body[key]});
                    messageObj.messages = messageArray;

                    return output(null, messageObj);
                }
                return output(body);
            }
        })
    };    
}