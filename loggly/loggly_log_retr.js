var request = require('request');

module.exports = function(){

    this.id = "loggly-log-retriving_data";
    this.label = "Loggly Retriving Data";

    this.input = {
      "title": "Loggly Retriving Data",
      "type": "object",
      "properties": {
        "account":{
            "title":"Account Subdomain Name",
            "type": "string",
            "description":"Please enter subdomain of generated loggly account",
            "minLength": 1
        },
        "username":{
            "title":"User Name",
            "type": "string",
            "description":"Please enter user name",
            "minLength": 1
        },
        "password":{
            "title":"User Password",
            "type": "string",
            "description":"Please enter password",
            "minLength": 1,
            "format": "password"
        }                 
      }
    };
    this.help = "Service to retriving data in loggly log";

    this.output = {
        "title": "output",
        "type": "object",
        "properties": {
            "total_events": {
                "title": "total_events",
                "type": "integer"
            },
            "page": {
                "title": "page",
                "type": "integer"
            },
            "events": {
                "title": "events",
                "type": "array",
                "items": {
                    "properties": {
                        "tags": {
                            "title": "tags",
                            "type": "array"
                        },
                        "timestamp": {
                            "title": "timestamp",
                            "type": "integer"
                        },
                        "logmsg": {
                            "title": "logmsg",
                            "type": "string"
                        },
                        "event": {
                            "title": "event",
                            "type": "object",
                            "properties": {
                                "http": {
                                    "title": "http",
                                    "type": "object",
                                    "properties": {
                                        "clientHost": {
                                            "title": "clientHost",
                                            "type": "string"
                                        },
                                        "contentType": {
                                            "title": "contentType",
                                            "type": "string"
                                        }
                                    }
                                }
                            }
                        },
                        "logtypes": {
                            "title": "logtypes",
                            "type": "array"
                        },
                        "id": {
                            "title": "id",
                            "type": "string"
                        }
                    }
                }
            }
        }
    };

    this.execute = function(input,output){
        var logglyURl = 'http://'+input.username.trim()+':'+input.password.trim()+'@'+input.account.trim()+'.loggly.com/apiv2/';
        request.get({
            url:logglyURl+'search',
            json:true
        }, function(err, res, body){
            if(err){
              return output(err)
            }                
            else if(res.statusCode && res.statusCode >=200 && res.statusCode < 400){
                try{
                    var data = body;           
                    data = JSON.parse(data)
                }catch(e){}

                if( data && typeof data == "object" && data.rsid){
                    
                    request.get({
                        url:logglyURl+'events?rsid='+data.rsid.id,
                        json:true
                    }, function(err, res, body){
                        if(err){
                            return output(err)
                        }                            
                        else if(res.statusCode && res.statusCode >=200 && res.statusCode < 400){
                            try{                        
                                var data = body;           
                                data = JSON.parse(data)
                            }catch(e){}

                            if( data && typeof data == "object" && data.total_events){  
                                return output(null, data)   
                            }
                        }
                    })
                }
            }  
        })
    };    
}