var request = require('request');

module.exports = function(){
    this.id = "automatic-vehicle-detail";

    this.label = "Get Vehicle Detail";

    this.input = {
        "title": "Get Vehicle Detail",
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
                "title" : "Vehicle ID",
                "minLength" : 1,
                "description": "Enter ID or SID of the vehicle"
            }
        }
    };

    this.help = "This activity returns specified vehicle details";

    this.output = {
        "title": "output",
        "type": "object",
        "properties": { 
            "url":{
                "title": "url",
                "type": "string"
            },
            "id":{
                "title": "id",
                "type": "string"
            },
            "vin":{
                "title": "vin",
                "type": "string"
            },
            "make":{
                "title": "make",
                "type": "string"
            },
            "model":{
                "title": "model",
                "type": "string"
            },
            "year":{
                "title": "year",
                "type": "number"
            },
            "color":{
                "title": "color",
                "type": "string"
            },
            "display_name":{
                "title": "display_name",
                "type": "string"
            },   
            "created_at":{
                "title": "created_at",
                "type": "number"
            },
            "updated_at":{
                "title": "updated_at",
                "type": "string"
            },
            "fuel_level_percent":{
                "title": "fuel_level_percent",
                "type": "string"
            }           
        }
    };

    this.execute = function(input,output){

        request({
            method :'GET', 
            headers :{
                "authorization": "Bearer "+ input.accessToken
            },          
            url : 'https://api.automatic.com/vehicle/'+input.sid+'/'
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
