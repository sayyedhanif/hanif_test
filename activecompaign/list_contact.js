var request = require('request');

module.exports = function(){

    this.id = "activecampaign-contact-list";
    this.label = "Contact List";

    this.input = {
        "title": "Contact List",
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
                "title":"Ids of Contact",
                "type": "string",
                "description":"A comma-separated list of IDs of contact you wish to fetch"
            },
        }
    };

    this.help = "Service to get list of contacts";

    this.output = {
        "title": "output",
        "type": "object",
        "properties": {
            "contacts": {
                "title": "contacts",
                "type": "array",
                "items": {
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
                        "deleted": {
                            "title": "deleted",
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
        
        var URL = 'http://'+input.account.trim()+'.api-us1.com/admin/api.php?api_key='+input.api_key.trim()+'&api_action=contact_list&ids='+ids+'&api_output=json';
        console.log(URL)
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
                    var contactObj = {};
                    contactObj.result_message = body.result_message;
                    contactObj.result_output = body.result_output;
                    contactObj.result_code = body.result_code;
                    delete body.result_message;
                    delete body.result_output;
                    delete body.result_code

                    var contactArray = Object.keys(body).map(function (key) {return body[key]});
                    contactObj.contacts = contactArray;

                    return output(null, contactObj);
                }
                return output(body);
            }
        })
    };    
}