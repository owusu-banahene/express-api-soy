function generateUniqueIDs()
{
    let id="";
    for(let i=0;i<4;i++){
        let number = Math.floor(Math.random()*10)
        
        id+=number;
    }
    return parseInt(id);
}

module.exports={
    generateUniqueIDs,
}
