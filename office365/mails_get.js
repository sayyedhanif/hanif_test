var request = require("request");

module.exports = function (){
    this.id = "office365-mails-get";
    this.label = "Get Mail List";

    this.input = {
        "type" : "object",
        "title" : "Get Mail List",
        "properties" : {
            "AccessToken" : {
                "title" : "Office 365 Access Token",
                "type" : "string",
                "oauth":"",
                "minLength" : 1
            }
        }
    };

    this.help = "This service get all mail list from outlook office 365";

    this.output = {
        "type" : "object",
        "title" : "output",
        "properties" : {
            "value": {
                "title": "value",
                "type": "array",
                "items": {
                    "type": "object",
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
                }
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
            url : "https://outlook.office.com/api/v2.0/me/messages/"
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
