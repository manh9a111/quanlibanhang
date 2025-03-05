module.exports = (query)=>{
    let filterstatus =[
        {
            name:"Tất cả",
            status:"",
            class:""
        },
        {
            name:"Hoạt động",
            status:"active",
            class:""
        },
        {
            name:"Dừng hoạt động ",
            status:"inactive",
            class:""
        }
    ];
    if(query.status){
        const index = filterstatus.findIndex(item => item.status == query.status);
        filterstatus[index].class="active";
    }else{
        const index = filterstatus.findIndex(item => item.status == "");
        filterstatus[index].class="active";
    }
    return filterstatus;
}