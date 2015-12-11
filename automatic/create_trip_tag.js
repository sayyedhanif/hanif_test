var request = require('request');

module.exports = function(){
    this.id = "automatic-trip-tag-create";

    this.label = "Add Trip Tag";

    this.input = {
        "title": "Add Trip Tag",
        "type": "object",
        "properties": {      
            "accessToken" : {
                "type" : "string",
                "title" : "Automatic Access Token",
                "minLength" : 1,
                "default": "f6824d1e6854e6a5a57e688767ba2560072bf54b"
            },
            "sid": {
                "type" : "string",
                "title" : "Trip ID",
                "minLength" : 1,
                "description": "Enter ID or SID of the trip"
            },
            "tag": {
                "type" : "string",
                "title" : "Tag Name",
                "minLength" : 1,
                "description": "Enter tag name"
            }
        }
    };

    this.help = "This activity add new tag to the trip";

    this.output = {
        "title": "output",
        "type": "object",
        "properties": {            
            "tag" : {
                "type" : "string",
                "title" : "tag"
            },            
            "created_at" : {
                "type" : "string",
                "title" : "created_at"
            }
        }
    };

    this.execute = function(input,output){

        request({
            method :'POST', 
            headers :{
                "authorization": "Bearer "+ input.accessToken
            },          
            url : 'https://api.automatic.com/trip/'+input.sid+'/tag/',
            json: {
                "tag": input.tag
            }
        },
        function(err,res,body){
            if(err){
                throw(err)
            }
            if(res.statusCode >= 200 && res.statusCode < 400) {
                if (typeof(body) == 'string') {
                    body = JSON.parse(body);
                }
                return output(null, body);
            }
            return output(body)
        })
    };
};

