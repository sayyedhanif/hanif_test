var request = require('request');

module.exports = function(){
    this.id = "automatic-trip-detail";

    this.label = "Get Trip Detail";

    this.input = {
        "title": "Get Trip Detail",
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
            }
        }
    };

    this.help = "This activity returns specified trip details";

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
            "user":{
                "title": "user",
                "type": "string"
            },
            "started_at":{
                "title": "started_at",
                "type": "string"
            },
            "ended_at":{
                "title": "ended_at",
                "type": "string"
            },
            "distance_m":{
                "title": "distance_m",
                "type": "number"
            },
            "duration_s":{
                "title": "duration_s",
                "type": "number"
            },
            "vehicle":{
                "title": "vehicle",
                "type": "string"
            },
            "start_location":{
                "title": "start_location",
                "type": "object",
                "properties": {
                    "accuracy_m": {
                        "title": "accuracy_m",
                        "type": "number"
                    },
                    "lat": {
                        "title": "lat",
                        "type": "number"
                    },
                    "lon": {
                        "title": "lon",
                        "type": "number"
                    }
                }
            },   
            "start_address":{
                "title": "start_address",
                "type": "object",
                "properties": {
                    "city": {
                        "title": "city",
                        "type": "string"
                    },
                    "country": {
                        "title": "country",
                        "type": "string"
                    },
                    "display_name": {
                        "title": "display_name",
                        "type": "string"
                    },
                    "name": {
                        "title": "name",
                        "type": "string"
                    },
                    "state": {
                        "title": "state",
                        "type": "string"
                    },
                    "street_name": {
                        "title": "street_name",
                        "type": "string"
                    },
                    "street_number": {
                        "title": "street_number",
                        "type": "string"
                    }
                }
            },
            "end_location":{
                "title": "end_location",
                "type": "object",
                "properties": {
                    "accuracy_m": {
                        "title": "accuracy_m",
                        "type": "number"
                    },
                    "lat": {
                        "title": "lat",
                        "type": "number"
                    },
                    "lon": {
                        "title": "lon",
                        "type": "number"
                    }
                }
            },
            "end_address":{
                "title": "end_address",
                "type": "object",
                "properties": {
                    "city": {
                        "title": "city",
                        "type": "string"
                    },
                    "country": {
                        "title": "country",
                        "type": "string"
                    },
                    "display_name": {
                        "title": "display_name",
                        "type": "string"
                    },
                    "name": {
                        "title": "name",
                        "type": "string"
                    },
                    "state": {
                        "title": "state",
                        "type": "string"
                    },
                    "street_name": {
                        "title": "street_name",
                        "type": "string"
                    },
                    "street_number": {
                        "title": "street_number",
                        "type": "string"
                    },
                }
            },
            "path": {
                "title": "path",
                "type": "string"
            },
            "fuel_cost_usd": {
                "title": "fuel_cost_usd",
                "type": "number"
            },
            "fuel_volume_l": {
                "title": "fuel_volume_l",
                "type": "number"
            },
            "average_kmpl": {
                "title": "average_kmpl",
                "type": "number"
            },
            "average_from_epa_kmpl": {
                "title": "average_from_epa_kmpl",
                "type": "number"
            },
            "score_events": {
                "title": "score_events",
                "type": "number"
            },
            "score_speeding": {
                "title": "score_speeding",
                "type": "number"
            },
            "hard_brakes": {
                "title": "hard_brakes",
                "type": "number"
            },
            "hard_accels": {
                "title": "hard_accels",
                "type": "number"
            },
            "duration_over_70_s": {
                "title": "duration_over_70_s",
                "type": "number"
            },
            "duration_over_75_s": {
                "title": "duration_over_75_s",
                "type": "number"
            },
            "duration_over_80_s": {
                "title": "duration_over_80_s",
                "type": "number"
            },  
            "vehicle_events":{
                "title": "vehicle_events",
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "created_at": {
                            "title": "created_at",
                            "type": "string"
                        },
                        "g_force": {
                            "title": "g_force",
                            "type": "number"
                        },
                        "lat": {
                            "title": "lat",
                            "type": "number"
                        },
                        "lon": {
                            "title": "lon",
                            "type": "number"
                        },
                        "type": {
                            "title": "type",
                            "type": "string"
                        }
                    }
                }
            },
            "start_timezone": {
                "title": "start_timezone",
                "type": "string"
            },
            "end_timezone": {
                "title": "end_timezone",
                "type": "string"
            },
            "city_fraction": {
                "title": "city_fraction",
                "type": "number"
            },
            "highway_fraction": {
                "title": "highway_fraction",
                "type": "number"
            },
            "night_driving_fraction": {
                "title": "night_driving_fraction",
                "type": "number"
            },
            "idling_time_s": {
                "title": "idling_time_s",
                "type": "number"
            },
            "tags": {
                "title": "tags",
                "type": "array",
                "items": {
                    "type": "string",
                    "properties":{

                    }
                }
            }     
        }
    };

    this.execute = function(input,output){

        request({
            method :'GET', 
            headers :{
                "authorization": "Bearer "+ input.accessToken
            },          
            url : 'https://api.automatic.com/trip/'+input.sid+'/'
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
