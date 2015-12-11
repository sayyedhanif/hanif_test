var request = require("request");

module.exports = function (){
    this.id = "office365-calendar-event-get";
    this.label = "Get Events Details";

    this.input = {
        "type" : "object",
        "title" : "Get Events Details",
        "properties" : {
            "AccessToken" : {
                "title" : "Office 365 Access Token",
                "type" : "string",
                "oauth":"",
                "minLength" : 1
            },
            "event_id" : {
                "title" : "Events ID",
                "type" : "string",
                "minLength" : 1,
                "description" : "Enter the Events ID of Office 365 you want to retrieve"
            }
        }
    };

    this.help = "This service get calendar events details of given events ID";

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
            "OriginalStartTimeZone": {
                "title": "OriginalStartTimeZone",
                "type": "string"
            },
            "OriginalEndTimeZone": {
                "title": "OriginalEndTimeZone",
                "type": "string"
            },
            "ReminderMinutesBeforeStart": {
                "title": "ReminderMinutesBeforeStart",
                "type": "number"
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
            "BodyPreview": {
                "title": "BodyPreview",
                "type": "string"
            },
            "Importance": {
                "title": "Importance",
                "type": "string"
            }, 
            "HasAttachments": {
                "title": "HasAttachments",
                "type": "boolean"
            },           
            "IsReminderOn": {
                "title": "IsReminderOn",
                "type": "boolean"
            },                        
            "IsAllDay": {
                "title": "IsAllDay",
                "type": "boolean"
            },
            "IsCancelled": {
                "title": "IsCancelled",
                "type": "boolean"
            },
            "IsOrganizer": {
                "title": "IsOrganizer",
                "type": "boolean"
            },
            "Start": {
                "title": "Start",
                "type": "object",
                "properties": {
                    "DateTime": {
                        "title": "DateTime",
                        "type": "string"
                    },
                    "TimeZone": {
                        "title": "TimeZone",
                        "type": "string"
                    }
                }
            },
            "End": {
                "title": "End",
                "type": "object",
                "properties": {
                    "DateTime": {
                        "title": "DateTime",
                        "type": "string"
                    },
                    "TimeZone": {
                        "title": "TimeZone",
                        "type": "string"
                    }
                }
            },
            "ResponseStatus": {
                "title": "ResponseStatus",
                "type": "object"
            },
            "Organizer": {
                "title": "Organizer",
                "type": "object"
            },
            "Attendees": {
                "title": "Attendees",
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
            url : "https://outlook.office.com/api/v2.0/me/messages/" + input.event_id
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
