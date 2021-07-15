const { request, response } = require("express");
const express = require("express");
//make a dumb server
const server = express();
//use the body-parser
server.use(express.json());
//declare an array of destinations
const {db:destinations} = require("./DB");
const {generateUniqueIDs} =require("./HELPERS");
//using the get method
server.get("/destination",(request,response)=>{
    // response.send(`<img src="https://images.unsplash.com/photo-1610805177214-885738d255f1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80">`);
    //call method to add id property to destinations if it does not have it
    //addUniqueNumbersToDestinations(destinations);
    response.send(destinations);
})

//create new object
server.post("/destination",(request,response)=>{
    //generate unique_id
    const _id = generateUniqueIDs();
    const {name,capital,flagcolor} = request.body
    destinations[_id] = {_id,name,capital,flagcolor};
    //destinations.push(request.body);
    response.send({status:"success"});
})

server.put("/destination",(request,response)=>{
    const _id = request.query._id;
    const {name:names, capital:capitals,flagcolors} = request.body;
    if(_id===undefined){
        return response.status(400).send("?_id is required");
    }
    if(destinations[_id]===undefined){
        return response.status(404).send("Destination does not exist")
    }
     if(names !==undefined){
        destinations[_id].name = names;
    }
    if(capitals !==undefined){
        destinations[_id].capital = capitals;
    }
    if(flagcolors !==undefined){
        destinations[_id].flagcolor = flagcolors;
    }
    response.send("Success");
})

server.delete("/destination",(request,response)=>{
    const _id = request.query._id;
    if(_id===undefined){
        return response.status(400).send("?_id is required");
    }
    if(destinations[_id]===undefined){
        return response.status(404).send("Destination does not exist")
    }
    delete destinations[_id];
    response.send("destination successfully deleted");
})
//listening on a particular port
server.listen(3000,()=>console.log("Listening on port 3000"));


function addUniqueNumbersToDestinations(database)
{
    for(const row of database)
    {
        if(row.hasOwnProperty("id")===false)
        {
            row["id"] = generateUniqueIDs();
        }
    }
}