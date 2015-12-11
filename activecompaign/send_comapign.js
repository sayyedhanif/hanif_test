var request = require('request');

module.exports = function(){

    this.id = "activecampaign-campaign-resend";
    this.label = "Re-send Campaign";

    this.input = {
        "title": "Re-send Campaign",
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
            "email":{
                "title":"Email",
                "type": "string",
                "minLength": 1,
                "description": "Email address (of the contact) that will be receiving the email"
            },
            "campaignid":{
                "title":"Campaign Id",
                "type": "string",
                "minLength": 1,
                "description": "ID of the campaign you wish to send"
            },
            "messageid":{
                "title":"Message Id",
                "type": "string",
                "minLength": 1,
                "description": "ID of the campaign's message you wish to send "
            },
            "type":{
                "title":"Type",
                "type": "string",
                "enum":[
                    "mime",
                    "html",
                    "text"
                ],
                "description": "Type of the message you wish to send (can be used to send TEXT-only email even if campaign is set to use MIME) possible values: mime, text, html"
            },
            "action":{
                "title":"Action",
                "type": "string",
                "enum":[
                    "send",
                    "copy",
                    "test",
                    "source",
                    "messagesize",
                    "spamcheck",
                    "preview"
                ],
                "description": "Specified what to done, Example: send, copy, test, source, messagesize, spamcheck, preview"
            },


        }
    };

    this.help = "Service to Re-send an existing campaign using optional actions like 'copy', 'preview', 'test'";

    this.output = {
        "title": "output",
        "type": "object",
        "properties": {             
            "result": {
                "title": "result",
                "type": "boolean"
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
        
        var URL = 'http://'+input.account.trim()+'.api-us1.com/admin/api.php?api_key='+input.api_key.trim()+'&email='+input.email+'&campaignid='+input.campaignid+'&messageid='+input.messageid+'&type='+input.type+'&action='+input.action+'&api_action=campaign_send&api_output=json';
        
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