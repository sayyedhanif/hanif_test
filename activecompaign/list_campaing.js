var request = require('request');

module.exports = function(){

    this.id = "activecampaign-campaign-list";
    this.label = "Campaigns List";

    this.input = {
        "title": "Campaigns List",
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
                "title":"Ids of Campaigns",
                "type": "string",
                "description":"A comma-separated list of IDs of campaigns you wish to fetch"
            },
        }
    };

    this.help = "Service to view settings and information of list of campaigns";

    this.output = {
        "title": "output",
        "type": "object",
        "properties": {
            "campaigns": {
                "title": "campaigns",
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "id": {
                            "title": "id",
                            "type": "string"
                        },          
                        "type": {
                            "title": "type",
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
                        "sdate": {
                            "title": "sdate",
                            "type": "string"
                        },
                        "ldate": {
                            "title": "ldate",
                            "type": "string"
                        },
                        "opens": {
                            "title": "opens",
                            "type": "string"
                        },          
                        "status": {
                            "title": "status",
                            "type": "string"
                        },
                        "public": {
                            "title": "public",
                            "type": "string"
                        },
                        "lists": {
                            "title": "lists",
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "listid": {
                                        "title": "listid",
                                        "type": "string"
                                    },
                                    "name": {
                                        "title": "name",
                                        "type": "string"
                                    }
                                    "cdate": {
                                        "title": "cdate",
                                        "type": "string"
                                    }
                                }
                            }
                        },
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
                                    "name": {
                                        "title": "name",
                                        "type": "string"
                                    }
                                    "subject": {
                                        "title": "subject",
                                        "type": "string"
                                    },
                                    "text": {
                                        "title": "text",
                                        "type": "string"
                                    }
                                    "html": {
                                        "title": "html",
                                        "type": "string"
                                    }
                                }
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
        var URL = 'http://'+input.account.trim()+'.api-us1.com/admin/api.php?api_key='+input.api_key.trim()+'&api_action=campaign_list&ids='+ids+'&api_output=json';
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
                    var campaignObj = {};
                    campaignObj.result_message = body.result_message;
                    campaignObj.result_output = body.result_output;
                    campaignObj.result_code = body.result_code;
                    delete body.result_message;
                    delete body.result_output;
                    delete body.result_code

                    var campaignArray = Object.keys(body).map(function (key) {return body[key]});
                    campaignObj.campaigns = campaignArray;

                    return output(null, campaignObj);
                }
                return output(body);
            }
        })
    };    
}