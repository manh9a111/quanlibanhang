module.exports =(query)=>{
    let objectsearch = {
        keyword :"",
    }
 
    if(query.keyword){
        objectsearch.keyword=query.keyword;
        objectsearch.regex = new RegExp(objectsearch.keyword,"i");
    }
    return objectsearch;
}