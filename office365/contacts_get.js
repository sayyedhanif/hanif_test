var request = require("request");

module.exports = function (){
    this.id = "office365-contacts-get";
    this.label = "Get Contacts";

    this.input = {
        "type" : "object",
        "title" : "Get Contacts",
        "properties" : {
            "AccessToken" : {
                "title" : "Office 365 Access Token",
                "type" : "string",
                "oauth":"",
                "minLength" : 1
            }
        }
    };

    this.help = "This service get all contacts list from outlook office 365";

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
                        "ParentFolderId": {
                            "title": "ParentFolderId",
                            "type": "string"
                        },
                        "Birthday": {
                            "title": "Birthday",
                            "type": "any"
                        },
                        "DisplayName": {
                            "title": "DisplayName",
                            "type": "string"
                        },
                        "Title": {
                            "title": "Title",
                            "type": "any"
                        },
                        "EmailAddresses": {
                            "title": "EmailAddresses",
                            "type": "array"
                        },             
                        "CompanyName": {
                            "title": "CompanyName",
                            "type": "any"
                        },
                        "Department": {
                            "title": "Department",
                            "type": "any"
                        },
                        "OfficeLocation": {
                            "title": "OfficeLocation",
                            "type": "any"
                        },
                        "JobTitle": {
                            "title": "JobTitle",
                            "type": "any"
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
            url : "https://outlook.office.com/api/v2.0/me/contacts/"
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
