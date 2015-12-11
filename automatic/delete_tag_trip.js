var request = require('request');

module.exports = function(){
    this.id = "automatic-trip-tag-delete";

    this.label = "Delete Trip Tag";

    this.input = {
        "title": "Delete Trip Tag",
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
            "tag_slug": {
                "type" : "string",
                "title" : "Tag Slug",
                "minLength" : 1,
                "description": "Enter tag name or slug"
            }
        }
    };

    this.help = "This activity delete tag associated with trip";

    this.output = {
        "title": "output",
        "type": "object",
        "properties": {            
            "message" : {
                "type" : "string",
                "title" : "message"
            }
        }
    };

    this.execute = function(input,output){

        request({
            method :'DELETE', 
            headers :{
                "authorization": "Bearer "+ input.accessToken
            },          
            url : 'https://api.automatic.com/trip/'+input.sid+'/tag/'+input.tag_slug+ '/'
        },
        function(err,res,body){
            if(err){
                throw(err)
            }
            if(res.statusCode >= 200 && res.statusCode < 400) {
                
                return output(null, {"message": "Deleted"});
            }
            return output(body)
        })
    };
};

