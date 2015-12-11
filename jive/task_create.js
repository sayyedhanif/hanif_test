var request = require('request');

module.exports = function(){

    this.id = "jive-content-task-create";
    this.label = "Create a Task";
    this.input = {
        "title": "Create a Task",
        "type": "object",
        "properties": {
            "site_url": {
                "type": "string",
                "title": "Site URL",
                "minLength": 1,
                "description": "Enter your site URL for Jive portal, eg. 'https://company-team.jiveon.com'"
            },
            "username": {
                "type": "string",
                "title": "Username",
                "minLength": 1,
                "description": "Enter the username of your Jive portal"
            },
            "password": {
                "type": "string",
                "title": " Password",
                "format": "password",
                "minLength": 1,
                "description": "Enter the password of your Jive portal"
            },
             "task_category": {
                "type": "object",
                "title": "Category",
                "description": "Select the content's category that you want to create task for",
                "oneOf": [
                    {
                        "type": "object",
                            "title": "Person",
                            "properties": {
                                "event": {
                                    "type": "string",
                                    "enum": [
                                        "new_lead"
                                    ],
                                    "options": {
                                        "hidden": true
                                    }
                                },
                                "_id": {
                                    "type": "string",
                                    "title": "person",
                                    "minLength": 1,
                                    "propertyOrder": 4
                                },
                            }
                    },
                    {
                        "type": "object",
                            "title": "Project",
                            "properties": {
                                "event": {
                                    "type": "string",
                                    "enum": [
                                        "new_lead1"
                                    ],
                                    "options": {
                                        "hidden": true
                                    }
                                },
                                "_id": {
                                    "type": "string",
                                    "title": "project",
                                    "minLength": 1,
                                    "propertyOrder": 4
                                },
                            }
                    }
                ]
            },
            "_id": {
                "type": "string",
                "title": "Person/Place ID",
                "minLength": 1,
                "description": "Enter place or person ID according to task category"
            },
            "subject": {
                "type": "string",
                "title": "Subject",
                "minLength": 1,
                "description": "Enter the subject for what would be the task"
            },
            "due_date": {
                "type": "object",
                "title": "Due Date",
                "description": "The date that this task is scheduled to be completed",
                "properties": {
                    "date":{
                        "type": "string",
                        "title": "Date",
                        "format": "date",
                        "minLength": 1,
                        "description": "Enter date here"
                    },
                    "time":{
                        "type": "string",
                        "title": "Time",
                        "format": "time",
                        "minLength": 1,
                        "description": "Enter time here"
                    }  
                }
            },
            "contentText": {
                "type": "string",
                "title": "Description",
                "description": "Associated description/notes to this task"
            }
        }
    };

    this.help = "Service to create new task for either project or person";

    this.output = {
        "title": "output",
        "type" : "object",
        "properties" : {
            "id": {
                "title": "id",
                "type": "string"
            },
            "contentID": {
                "title": "contentID",
                "type": "string"
            },
            "type": {
                "title": "type",
                "type": "string"
            },
            "published": {
                "title": "published",
                "type": "string"
            },
            "updated": {
                "title": "updated",
                "type": "string"
            },
            "likeCount": {
                "title": "likeCount",
                "type": "number"
            },
            "replyCount": {
                "title": "replyCount",
                "type": "number"
            },
            "viewCount": {
                "title": "viewCount",
                "type": "number"
            },
            "parent": {
                "title": "parent",
                "type": "string"
            },    
            "subject": {
                "title": "subject",
                "type": "string"
            },
            "content": {
                "title": "content",
                "type": "object"
            },
            "owner": {
                "title": "owner",
                "type": "string"
            },
            "dueDate": {
                "title": "dueDate",
                "type": "string"
            },
            "status": {
                "title": "status",
                "type": "string"
            },
            "completed": {
                "title": "completed",
                "type": "boolean"
            },
            "author": {
                "title": "author",
                "type": "object",
                "properties": {
                    "id": {
                        "title": "id",
                        "type": "string"
                    },
                    "displayName": {
                        "title": "displayName",
                        "type": "string"
                    }
                }
            }
        }
    };

    this.execute = function(input, output) {

        console.log("at execute()")
        console.log(input)
        var categoryObj = {
            "Personal": "people",
            "Project": "places"
        };

        input.site_url = input.site_url.replace(/^http:\/\//, 'https://');
        var prefixHttps = "https://";
        if (input.site_url.substr(0, prefixHttps.length) !== prefixHttps){
            input.site_url = prefixHttps + input.site_url;
        };

        console.log(input.due_date.date+" : "+ input.due_date.time)

        var dueDate = new Date(input.due_date.date);
        dueDate.setHours(input.due_date.time.split(':')[0]);
        dueDate.setMinutes(input.due_date.time.split(':')[1]);

        request({
            method :'POST',
            headers: {
                "Content-Type": "application/json"
            },
            url: input.site_url+ "/api/core/v3/"+categoryObj[input.task_category]+"/"+ input._id +"/tasks",
            auth: {
                username: input.username,
                password: input.password
            },
            json: { 
                "type": "task",
                "subject": input.subject,
                "dueDate": dueDate.toISOString(),
                "parent": input.site_url+ "/api/core/v3/"+categoryObj[input.task_category]+"/"+ input._id,
                "content": { 
                    "type": "text/html",
                    "text": input.contentText
                }
            }
        }, function(err, res, body){
            if(err){
                return output(err);
            }
            if (res.statusCode >= 200 && res.statusCode < 400){
                if(typeof(body) == 'string'){                    
                    body = JSON.parse(body);
                }
                delete body.resources;
                return output(null , body);
            }
            return output(body);
        })
    }
};