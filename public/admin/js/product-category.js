const buttonsChangestatus = document.querySelectorAll("[button-change-status]");
    if(buttonsChangestatus.length>0){
        const formChangestatus = document.querySelector("#form-change-status");
        const path = formChangestatus.getAttribute("data-path");
        buttonsChangestatus.forEach(button =>{
            button.addEventListener("click",()=>{
                const statusCurent = button.getAttribute("data-status")
                const id = button.getAttribute("data-id")
                const statusChange = statusCurent=="active"?"inactive":"active";
                
                const action = path + `/${statusChange}/${id}?_method=PATCH`;
                // console.log(action);
                formChangestatus.action=action;
                formChangestatus.submit();
            })
        })
    }
const changeDelete = document.querySelectorAll("[button-delete]");
if(changeDelete.length>0){
    const formDelete = document.querySelector("#form-delete-item");
    const path = formDelete.getAttribute("data-path");
    changeDelete.forEach(button=>{
        button.addEventListener("click",()=>{
            const isconfirm = confirm("bạn có chắc muốn xoá danh mục sản phẩm này không?");
            if(isconfirm){
                const id = button.getAttribute("data-id");
                const action = `${path}/${id}?_method=DELETE`;
                console.log(action);
                formDelete.action=action;
                formDelete.submit();
            }
        });
    });
}
