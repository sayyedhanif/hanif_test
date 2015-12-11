var request = require('request');

module.exports = function(){

    this.id = "activecampaign-list-add";
    this.label = "Add New List";

    this.input = {
        "title": "Add New List",
        "type": "object",
        "properties": {
            "account":{
                "title":"Account Name",
                "type": "string",
                "description":"Enter account name that is subdomain like [account_name].activehosted.com",
                "propertyOrder": 1,
                "minLength": 1
            },
            "api_key":{
                "title":"API Key",
                "type": "string",
                "propertyOrder": 2,
                "minLength": 1
            },
            "name":{
                "title":"List Name",
                "type": "string",
                "description":"Enter internal list name. Example: Monthly Newsletter, Sales Leads, etc...",
                "propertyOrder": 3,
                "minLength": 1
            },
            "sender_name": {
                "title":"Company (or Organization)",
                "type": "string",
                "description":"Enter company or organization name as sender",
                "propertyOrder": 4,
                "minLength": 1
            },
            "sender_addr1": {
                "title":"Address",
                "type": "string",
                "description":"Enter address",
                "propertyOrder": 5,
                "minLength": 1
            },
            "sender_zip":{
                "title":"Zip or Postal Code",
                "type": "string",
                "description":"Enter zip or postal code",
                "propertyOrder": 6,
                "minLength": 1
            },
            "sender_city":{
                "title":"City",
                "type": "string",
                "description":"Enter city name",
                "propertyOrder": 7,
                "minLength": 1
            },
            "sender_country":{
                "title":"Country",
                "type": "string",
                "description":"Enter country name",
                "propertyOrder": 8,
                "minLength": 1
            },
            "sender_url": {
                "title":"URL",
                "type": "string",
                "description":"What website URL is this list for?",
                "propertyOrder": 9,
                "minLength": 1
            },
             "sender_reminder": {
                "title":"Subscribed Reminder Text",
                "type": "string",
                "description":"Remind your contacts why they are on this list and why you are emailing them",
                "propertyOrder": 10,
                "minLength": 1
            },
            "subscription_notify":{
                "title":"Subscription Notify",
                "type": "string",
                "description":"Comma-separated list of email addresses to notify on new subscriptions to this list",
                "propertyOrder": 11
            },            
            "unsubscription_notify":{
                "title":"Unsubscription Notify",
                "type": "string",
                "description":"Comma-separated list of email addresses to notify on any unsubscriptions from this list",
                "propertyOrder": 12
            },
            "carboncopy":{
                "title":"Cc",
                "type": "string",
                "description":"Comma-separated list of email addresses to send a copy of all mailings to upon send",
                "propertyOrder": 13
            },
            "to_name":{
                "title":"Recipient",
                "type": "string",
                "description":"if contact doesn't enter a name, use this",
                "propertyOrder": 14
            }
        }
    };

    this.help = "Service to create new list";

    this.output = {
        "title": "output",
        "type": "object",
        "properties": {
            "id": {
                "title": "id",
                "type": "integer"
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
       
        
        var URL = 'http://'+input.account.trim()+'.api-us1.com/admin/api.php?api_key='+input.api_key.trim()+'&api_action=list_add&api_output=json';
        request.post({
            url:URL,  
            form: {
                name: input.name,
                subscription_notify: input.subscription_notify,
                unsubscription_notify: input.unsubscription_notify,
                carboncopy: input.carboncopy,
                to_name: input.to_name,
                sender_name: input.sender_name,
                sender_addr1: input.sender_addr1,
                sender_zip: input.sender_zip,
                sender_city: input.sender_city,
                sender_country: input.sender_country,
                sender_url: input.sender_url,
                sender_reminder: input.sender_reminder
            },         
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