var request = require("request");

module.exports = function (){
    this.id = "office365-calendar-events-get";
    this.label = "Get Calender Events";

    this.input = {
        "type" : "object",
        "title" : "Get Calender Events",
        "properties" : {
            "AccessToken" : {
                "title" : "Office 365 Access Token",
                "type" : "string",
                "oauth":"",
                "minLength" : 1
            }
        }
    };

    this.help = "This service get all events list from outlook office 365";

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
            url : "https://outlook.office.com/api/v2.0/me/events/"
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
