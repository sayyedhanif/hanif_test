var request = require('request');

module.exports = function(){

    this.id = "spark-room-get";
    this.label = "Get Room Details";
    this.input = {
        "title": "Get Room Details",
        "type": "object",
        "properties": {
            "access_token": {
                "type": "string",
                "title": "Spark Access Token",
                "minLength": 1,
                "default": "eyJhbGciOiJSUzI1NiJ9.eyJleHBpcnlfdGltZSI6MTQ0NTg1MTY4NTgwNiwidXNlcl90eXBlIjoidXNlciIsInJlYWxtIjoiY29uc3VtZXIiLCJjaXNfdXVpZCI6ImM2MzIxMjBmLWIyMmEtNDM1Ny04M2M3LThlZTRjOTlkZWQ4MyIsImlzcyI6Imh0dHBzOlwvXC9pZGJyb2tlci53ZWJleC5jb21cL2lkYiIsInRva2VuX3R5cGUiOiJCZWFyZXIiLCJjbGllbnRfaWQiOiJDOTZkMzg5ZDYzMmM5NmQwMzhkOGY0MDRjMzU5MDRiNTEwODk4OGJkNmQ2MDFkNGI0N2Y0ZWVjODhhNTY5ZDVkYiIsInRva2VuX2lkIjoiTnpGbE1HVTBaV010Tm1RMFlTMDBPRFkyTFdJek9ETXRZVGxrTmprMU1qTXlNV1EwTjJJMlpXWTVOR010T1RGaiIsInByaXZhdGUiOiJleUpoYkdjaU9pSmthWElpTENKamRIa2lPaUpLVjFRaUxDSmxibU1pT2lKQk1USTRRMEpETFVoVE1qVTJJbjAuLlNjd0YwRF9RS2prLVhOWXg2SnZyVGcuSk1HT1J3ZkUzZE9jMWFWeGkyMThBZWpRRmJrZHVkTl9QV3NSUUFEWnVQTGJrNkNzNnNXRU95al9DNWR2WmxXUHJhVlhfb2ZBUW5UMl96UWloQkItRWJDalZMSjBrUklKZGNXZnBpVkRQd05Vc29LdTBIU2toOFNuZVdOQXFvM0cyb1RuU0loVXc5cnU4enFYTmkxejlMT1EyNkZEcjJnYm1Kb2pqVmFJSXhmOEFkNlptNDJMZTQyWTJrb25fMVk4LkVLcW1ZOUoxVzJIVHdrdDl0Y1NsVXcifQ.GSOkJBmPMjFXgM22TLM3bI53UWqpSDOtWNCBC7xvIRuSMcdLqB82fCF6SuPj315qKh0kx2AglQXPvvAhMxpfCtkIZw5hJdZpCOMJTfJIhlJ9FGHXpmZz4obDyS8q13cHmR66Rxxs6iHN_8qDN6D1hKiMtUC1mTH_h6-OkHIIgaDpvD8Razjc-CdlGREYHlkV0fDVJdYnFJ5vq9FLZkrzT0I2NEtmDaieCbRWa5Gh8Tc-YkiYkwcXDb0DsOqfJhSc7tlj4c49XxMKHDn7bLLm8fAEXVDtBYbfPhtoB537AppbKnIWIS0DiFDP-MphjKWQLLw8G5Q7r1DapzFotSCupQ"
            },
            "room_id": {
                "type": "string",
                "title": "Room ID",
                "description": "Enter the room ID",
                "minLength": 1
            }     
        }
    };

    this.help = "This activity returns the details of specified room in your spark account";

    this.output = {
        "title": "output",
        "type" : "object",
        "properties" : {
            "id": {
                "type": "string",
                "title": "id",
            },
            "title": {
                "type": "string",
                "title": "title",
            },
            "created": {
                "type": "string",
                "title": "created",
            }
        }
    };

    this.execute = function(input, output) {

        request({
            method :'GET',    
            headers: {
                "Authorization": "Bearer " + input.access_token,
                "Content-Type": "application/json"
            },       
            url: "https://api.ciscospark.com/hydra/api/v1/rooms/"+ input.room_id
        }, function(err, res, body){
            console.log(err, res.statusCode, body)
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