var request = require('request');

module.exports = function(){
    this.id = "automatic-tags-get";

    this.label = "Get Tag List";

    this.input = {
        "title": "Get Tag List",
        "type": "object",
        "properties": {      
            "accessToken" : {
                "type" : "string",
                "title" : "Automatic Access Token",
                "minLength" : 1,
                "default": "f6824d1e6854e6a5a57e688767ba2560072bf54b"
            }
        }
    };

    this.help = "This activity returns all tag";

    this.output = {
        "title": "output",
        "type": "object",
        "properties": {            
            "_metadata": {
                "title": "_metadata",
                "type": "object",
                "properties": {
                    "count" : {
                        "type" : "number",
                        "title" : "count"
                    },            
                    "next" : {
                        "type" : "any",
                        "title" : "next"
                    },
                    "previous" : {
                        "type" : "any",
                        "title" : "previous"
                    }
                }
            },
            "results": {
                "title": "results",
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {

                    }
                }
            }
        }
    };

    this.execute = function(input,output){

        request({
            method : 'GET', 
            headers : {
                "authorization": "Bearer "+ input.accessToken
            },          
            url : 'https://api.automatic.com/tag/'
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
