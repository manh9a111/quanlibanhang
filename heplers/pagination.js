module.exports  = (objectPagination,query,countproduct)=>{
    if(query.page){
        objectPagination.currentPage = parseInt(query.page);
    }
    const totalPage  = Math.ceil(countproduct/objectPagination.limititem);
    objectPagination.totalPage = totalPage;
// console.log(objectPagination.currentPage);
objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limititem;
return objectPagination;
}