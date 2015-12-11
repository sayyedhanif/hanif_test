var request = require('request');

module.exports = function(){

    this.id = "activecampaign-message-create";
    this.label = "Add New Message";

    this.input = {
        "title": "Add New Message",
        "type": "object",
        "properties": {
            "account":{
                "title":"Account Name",
                "type": "string",
                "description":"Enter account name that is subdomain like [account_name].activehosted.com",
                "minLength": 1,
                "propertyOrder": 1
            },
            "api_key":{
                "title":"API Key",
                "type": "string",
                "propertyOrder": 2,
                "minLength": 1
            },
            "subject":{
                "title":"Subject",
                "type": "string",
                "description":"Subject of the email message.",
                "propertyOrder": 3,
                "minLength": 1
            },
            "fromemail":{
                "title":"Sender Email",
                "type": "string",
                "propertyOrder": 4,
                "description":"The 'From' email address",
                "minLength": 1
            },            
            "fromname":{
                "title":"Sender Name",
                "type": "string",
                "propertyOrder": 5,
                "description":"Enter sender/from name"
            },
            "reply2":{
                "title":"Reply To",
                "type": "string",
                "propertyOrder": 6,
                "description":"The 'Reply To' email address. Example: 'reply2@example.com'"
            },
            "format":{
                "title":"Format",
                "type": "string",
                "enum":[
                    "mime",
                    "html",
                    "text"
                ],
                "propertyOrder": 7,
                "description":"Examples: html, text, mime (both html and text)"
            },
            "htmlconstructor": {
                "title":"HTML Constructor",
                "type": "string",
                "enum":[
                    "editor",
                    "external",
                    "upload"
                ],
                "propertyOrder": 8,
                "description":"HTML version. Examples: editor, external, upload. If editor, it uses 'html' parameter. If external, uses 'htmlfetch' and 'htmlfetchwhen' parameters. If upload, uses 'message_upload_html'"
            },
            "html": {
                "title":"HTML Content",
                "type": "string",
                "propertyOrder": 9,
                "description":"HTML version. Content of your html email. Example: '<strong>html</strong> content of your email'"
            },
            "htmlfetch": {
                "title":"HTML Fetch",
                "type": "string",
                "propertyOrder": 10,
                "description":"HTML version. URL where to fetch the body from. Example: 'http://somedomain.com/somepage.html'"
            },
            "htmlfetchwhen": {
                "title":"HTML fetch when",
                "type": "string",
                "propertyOrder": 11,
                "description":"HTML version. Examples: (fetch at) 'send' and (fetch) 'pers'(onalized)"
            },
            "textconstructor": {
                "title":"Text Constructor",
                "type": "string",
                "enum":[
                    "editor",
                    "external",
                    "upload"
                ],
                "propertyOrder": 12,
                "description":"Text version. Examples: editor, external, upload. If editor, it uses 'text' parameter. If external, uses 'textfetch' and 'textfetchwhen' parameters. If upload, uses 'message_upload_text'"
            },
            "text": {
                "title":"Text Content",
                "type": "string",
                "propertyOrder": 13,
                "description":"Text version. Content of your text only email. Example: '_text only_ content of your email'"
            },
            "textfetch": {
                "title":"Text Fetch",
                "type": "string",
                "propertyOrder": 14,
                "description":"Text version. URL where to fetch the body from. Example: 'http://somedomain.com/somepage.txt'"
            },
            "textfetchwhen": {
                "title":"Text fetch when",
                "type": "string",
                "propertyOrder": 15,
                "description":"Text version. When to fetch. Examples: (fetch at) 'send' and (fetch) 'pers'(onalized)"
            },
            "list": {
                "title":"List IDs",
                "type": "string",
                "propertyOrder": 16,
                "minLength": 1,
                "description":"Ids of list (comma-separated). Example: 3,2 to be subscribed with this contact"
            }
        }
    };

    this.help = "Service to create new message for send email";

    this.output = {
        "title": "output",
        "type": "object",
        "properties": {
            "id": {
                "title": "id",
                "type": "integer"
            },
            "subject": {
                "title": "subject",
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
        var messageJSON = {
            subject: input.subject,
            fromemail: input.fromemail,
            fromname: input.fromname,
            reply2: input.reply2,
            htmlconstructor: input.htmlconstructor,
            html: input.html,
            format: input.format,
            charset: 'utf-8'
        };
        if (input.list){
            var list = (input.list).split(',')
            list.forEach(function(listId,i) {
                messageJSON["p["+listId+"]"]= listId
            })
        }

        var URL = 'http://'+input.account.trim()+'.api-us1.com/admin/api.php?api_key='+input.api_key.trim()+'&api_action=message_add&api_output=json';
                
        request.post({
            url:URL,  
            form: messageJSON,         
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