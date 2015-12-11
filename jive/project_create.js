var request = require('request');

module.exports = function(){

    this.id = "jive-place-project-create";
    this.label = "Create a Project";
    this.input = {
        "title": "Create a Project",
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
            "_id": {
                "type": "string",
                "title": "Space/Group ID",
                "minLength": 1,
                "description": "Enter ID of either space or group that contains this place(project)"
            },      
            "displayName": {
                "type": "string",
                "title": "Display Name",
                "minLength": 1,
                "description": "Display name of this project. It must be unique in Jive portal"
            },
            "name": {
                "type": "string",
                "title": "Name",
                "minLength": 1,
                "description": "Formal name of this project. It must be unique in Jive portal"
            },
            "startDate": {
                "type": "string",
                "title": "Starting Date",
                "format": "date",
                "minLength": 1,
                "description": "The date that this project would be start",
            },
            "due_date": {
                "type": "object",
                "title": "Due Date",
                "description": "The date that this project is scheduled to be completed",
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
        }
    };

    this.help = "Service to create new project in Jive portal";

    this.output = {
        "title": "output",
        "type" : "object",
        "properties" : {
            "id": {
                "title": "id",
                "type": "string"
            },
            "placeID": {
                "title": "placeID",
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
            "followerCount": {
                "title": "followerCount",
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
            "displayName": {
                "title": "displayName",
                "type": "string"
            },
            "name": {
                "title": "name",
                "type": "string"
            },
            "status": {
                "title": "status",
                "type": "string"
            }
        }
    };

    this.execute = function(input, output) {
       
        input.site_url = input.site_url.replace(/^http:\/\//, 'https://');
        var prefixHttps = "https://";
        if (input.site_url.substr(0, prefixHttps.length) !== prefixHttps){
            input.site_url = prefixHttps + input.site_url;
        };

        var dueDate = new Date(input.due_date.date);
        dueDate.setHours(input.due_date.time.split(':')[0]);
        dueDate.setMinutes(input.due_date.time.split(':')[1]);

        var startDate =  new Date(input.due_date.date);
        startDate.setHours(0);
        startDate.setMinutes(0);

        console.log(dueDate)

        request({
            method :'POST',
            headers: {
                "Content-Type": "application/json"
            },
            url: input.site_url+ "/api/core/v3/places",
            auth: {
                username: input.username,
                password: input.password
            },
            json: { 
                "type": "project",
                "displayName": input.displayName,
                "name": input.name,
                "parent": input.site_url+ "/api/core/v3/places/" + input._id,
                "startDate": startDate.toISOString(),
                "dueDate": dueDate.toISOString()
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