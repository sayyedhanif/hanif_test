var request = require('request');

module.exports = function(){

    this.id = "activecampaign-list-list";
    this.label = "List of Mailing Lists";

    this.input = {
        "title": "List of Mailing Lists",
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
                "title":"IDs of list",
                "type": "string",
                "description":"A comma-separated list of IDs of lists you wish to fetch"
            },            
        }
    };

    this.help = "Service to get list of mailing lists";

    this.output = {
        "title": "output",
        "type": "object",
        "properties": {
            "lists": {
                "title": "lists",
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "id": {
                            "title": "id",
                            "type": "integer"
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
                        "private": {
                            "title": "private",
                            "type": "string"
                        },
                        "subscriber_count": {
                            "title": "subscriber_count",
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

        var ids = input.ids=='' ? 'all' : input.ids
        
        var URL = 'http://'+input.account.trim()+'.api-us1.com/admin/api.php?api_key='+input.api_key.trim()+'&api_action=list_list&ids='+ids+'&api_output=json';
        
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
                    var listObj = {};
                    listObj.result_message = body.result_message;
                    listObj.result_output = body.result_output;
                    listObj.result_code = body.result_code;
                    delete body.result_message;
                    delete body.result_output;
                    delete body.result_code

                    var listArray = Object.keys(body).map(function (key) {return body[key]});
                    listObj.lists = listArray;

                    return output(null, listObj);
                }
                return output(body);
            }
        })
    };    
}