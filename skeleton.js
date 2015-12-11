// require any modules

module.exports = function(){

    this.id = "activity_id"; // An id given to uniquely identify the activity. 
    this.label = "Activity Label"; // Label means name given to the activity, will be used as title.

    this.input = { // JSON schema . Structure can be checked on http://json-schema.org/
      "title": "Activity Label",// String , mandatory
      "type": "object",// Do not change.
      "properties": {
        //Inputs which the activity will take along with their validation rules(if any)
      }
    };


    this.help = "Line of text indicating operation performed by the activity"
     // will contain the text for the tooltip shown besides the activity title
    

    this.output = {// JSON schema . Structure can be checked on http://json-schema.org/
        "title" : "output",
        "type" : "object",
        "properties":{
            "Key":{
                "type" : "datatype",
                "title" : "Key"
            }
        }
    };


    this.execute = function(input,output){
        // the core logic for the activity. this would be executed inside the flow engine.
        //user can write anything norestriction.
        
        // inputs parameter will provide you with the inputs given by the user to the activity
        
        // output is function used to indicate the engine that activity execution is completed.
        //  syntax output(error,data,[logs])
        //  if error then use (error,data,[logs])
        //  if no error then use (null,data,[logs])
    };

    
}

