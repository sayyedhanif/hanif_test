var request = require('request');

module.exports = function(){

    this.id = "activecampaign-contact-add";
    this.label = "Add New Contact";

    this.input = {
        "title": "Add New Contact",
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
                "description":"Email of the new contact. Example: 'test@example.com'",
                "minLength": 1
            },
            "first_name":{
                "title":"First Name",
                "type": "string",
                "description":"Enter first name"
            },            
            "last_name":{
                "title":"Last Name",
                "type": "string",
                "description":"Enter last name"
            },
            "phone":{
                "title":"Phone Number",
                "type": "string",
                "description":"Enter phone number of the contact"
            },
            "orgname":{
                "title":"Organization",
                "type": "string",
                "description":"Enter organization name (if doesn't exist, this will create a new organization) - MUST HAVE CRM FEATURE FOR THIS."
            },
            "tags": {
                "title":"Tags",
                "type": "string",
                "description":"Tags for this contact (comma-separated). Example: tag1, tag2, etc"
            },
             "list": {
                "title":"List Id",
                "type": "string",
                "description":"Ids of list (comma-separated). Example: 3,2 to be subscribed with this contact"
            }
        }
    };

    this.help = "Service to add new contact";

    this.output = {
        "title": "output",
        "type": "object",
        "properties": {
            "subscriber_id": {
                "title": "subscriber_id",
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
        var contactJSON = {
            email: input.email,
            first_name: input.first_name,
            last_name: input.last_name,
            phone: input.phone,
            orgname: input.orgname,
            tags: input.tags
        };
        if (input.list){
            var list = (input.list).split(',')
            list.forEach(function(listId,i) {
                contactJSON["p["+listId+"]"]= listId
            })
        }        
        
        var URL = 'http://'+input.account.trim()+'.api-us1.com/admin/api.php?api_key='+input.api_key.trim()+'&api_action=contact_add&api_output=json';
                
        request.post({
            url:URL,  
            form: contactJSON,         
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