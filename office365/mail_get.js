var request = require("request");

module.exports = function (){
    this.id = "office365-mail-get";
    this.label = "Get Mail Details";

    this.input = {
        "type" : "object",
        "title" : "Get Mail Details",
        "properties" : {
            "AccessToken" : {
                "title" : "Office 365 Access Token",
                "type" : "string",
                "oauth":"",
                "minLength" : 1
            },
            "mail_id" : {
                "title" : "Mail ID",
                "type" : "string",
                "minLength" : 1,
                "description" : "Enter the Mail ID of Office 365 you want to retrieve"
            }
        }
    };

    this.help = "This service get mail details of given mail ID";

    this.output = {
        "type" : "object",
        "title" : "output",
        "properties": {
            "Id": {
                "title": "Id",
                "type": "string"
            },
            "CreatedDateTime": {
                "title": "CreatedDateTime",
                "type": "string"
            },
            "LastModifiedDateTime": {
                "title": "LastModifiedDateTime",
                "type": "string"
            },
            "ChangeKey": {
                "title": "ChangeKey",
                "type": "string"
            },
            "ReceivedDateTime": {
                "title": "ReceivedDateTime",
                "type": "string"
            },
            "SentDateTime": {
                "title": "SentDateTime",
                "type": "string"
            },
            "ParentFolderId": {
                "title": "ParentFolderId",
                "type": "string"
            },
            "Subject": {
                "title": "Subject",
                "type": "string"
            },
            "Body": {
                "title": "Body",
                "type": "object",
                "properties": {
                    "ContentType": {
                        "title": "ContentType",
                        "type": "string"
                    },
                    "Content": {
                        "title": "Content",
                        "type": "string"
                    }
                }
            },
            "InternetMessageId": {
                "title": "InternetMessageId",
                "type": "string"
            },
            "BodyPreview": {
                "title": "BodyPreview",
                "type": "string"
            },
            "Importance": {
                "title": "Importance",
                "type": "string"
            },  
            "ConversationId": {
                "title": "ConversationId",
                "type": "string"
            },
            "IsDeliveryReceiptRequested": {
                "title": "IsDeliveryReceiptRequested",
                "type": "any"
            },           
            "IsReadReceiptRequested": {
                "title": "IsReadReceiptRequested",
                "type": "boolean"
            },  
            "HasAttachments": {
                "title": "HasAttachments",
                "type": "boolean"
            },                         
            "IsRead": {
                "title": "IsRead",
                "type": "boolean"
            },
            "IsDraft": {
                "title": "IsDraft",
                "type": "boolean"
            },
            "Sender": {
                "title": "Sender",
                "type": "object"
            },
            "From": {
                "title": "From",
                "type": "object"
            },
            "ToRecipients": {
                "title": "ToRecipients",
                "type": "array"
            },
            "CcRecipients": {
                "title": "CcRecipients",
                "type": "array"
            },
            "BccRecipients": {
                "title": "BccRecipients",
                "type": "array"
            },
            "ReplyTo": {
                "title": "ReplyTo",
                "type": "array"
            }
        }
    };

    this.execute = function(input, output){
        

        request({
            headers: {
                "Authorization": "Bearer " + input.AccessToken,
                "Content-Type": "application/json"
            },    
            method : "GET",
            url : "https://outlook.office.com/api/v2.0/me/messages/" + input.mail_id
        }, function(err, res, body){
            if(err){
                throw (err);
            }
            if (res.statusCode >= 200 && res.statusCode < 400){
                if(typeof(body) == 'string'){
                    body = JSON.parse(body);
                }
                return output(null, body);
            }
            return output(body);
        })
    }
};
