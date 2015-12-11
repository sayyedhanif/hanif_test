var request = require('request');

module.exports = function(){

    this.id = "triggerapp-task-delete";
    this.label = "Delete Task";
    this.input = {
        "title": "Delete Task",
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
            },
            "task_id": {
                "type": "string",
                "title": "Task ID",
                "minLength": 1,
                "description": "Enter task id"
            }                               
        }
    };

    this.help = "This activity delete an existing task";

    this.output = {
        "title": "output",
        "type" : "object",
        "properties" : {
            "message": {
                "title": "message",
                "type": "string"
            }
        }
    };

    this.execute = function(input, output) {

        request({
            method :'DELETE',           
            url: "https://www.triggerapp.com/api/v1/tasks/"+input.task_id+"?token="+input.token+"&api_key="+input.api_key
        }, function(err, res, body){
            if(err){
                return output(err);
            }
            if (res.statusCode >= 200 && res.statusCode < 400){
                return output(null , {"message": "Task deleted"});
            }
            return output(body);
        })
    }
};