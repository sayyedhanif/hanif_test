var request = require('request');

module.exports = function(){

    this.id = "triggerapp-activities-recent-get";
    this.label = "Get Most Recent Activities";
    this.input = {
        "title": "Get Most Recent Activities",
        "type": "object",
        "properties": {
            "api_key": {
                "type": "string",
                "title": "Triggerapp API Key",
                "minLength": 1,
                "default": "RHDLMTXZ"
            },
            "token": {
                "type": "string",
                "title": "Triggerapp Token",
                "minLength": 1,
                "default": "2KC4YQfDPkPZnuwBxY4k"
            }              
        }
    };

    this.help = "List the most recent task updates";

    this.output = {
        "title": "output",
        "type" : "object",
        "properties" : {
            "activities":{
                "title": "activities",
                "type": "array",
                "items": {
                    "properties": {
                        "activity": {
			                "title": "activity",
			                "type": "object",
			                "properties": {
			                    "id": {
			                        "title": "id",
			                        "type": "number"
			                    },
			                    "end_at": {
			                        "title": "end_at",
			                        "type": "any"
			                    },
			                    "start_at": {
			                        "title": "start_at",
			                        "type": "any"
			                    },
			                    "created_at": {
			                        "title": "created_at",
			                        "type": "string"
			                    },
			                    "notes": {
			                        "title": "notes",
			                        "type": "string"
			                    },			                    
			                    "task_sequence_id": {
			                        "title": "task_sequence_id",
			                        "type": "number"
			                    },			                   
			                    "author": {
			                        "title": "author",
			                        "type": "object",
			                        "properties": {
			                            "id": {
			                                "title": "id",
			                                "type": "number"
			                            },
			                            "name": {
			                                "title": "name",
			                                "type": "string"
			                            },                            
			                            "email": {
			                                "title": "email",
			                                "type": "string"
			                            },
			                            "role": {
			                                "title": "role",
			                                "type": "string"
			                            }                                    
			                        }
			                    }
			                }
			            }
                    }
                }
            }
        }
    };

    this.execute = function(input, output) {

        request({
            method :'GET',           
            url: "https://www.triggerapp.com/api/v1/task_activities/recent?token="+input.token+"&api_key="+input.api_key
        }, function(err, res, body){
            if(err){
                return output(err);
            }
            if (res.statusCode >= 200 && res.statusCode < 400){
                if(typeof(body) == 'string'){
                    body = JSON.parse(body);
                }
                return output(null , body);
            }
            return output(body);
        })
    }
};