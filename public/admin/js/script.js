const buttonstatus = document.querySelectorAll("[button-status]");
    if(buttonstatus.length > 0){
        let url = new URL (window.location.href);
        buttonstatus.forEach(button => {
            button.addEventListener("click" , ()=>{
                const status = button.getAttribute("button-status");
                if(status){
                    url.searchParams.set("status",status);
                }
                else{
                    url.searchParams.delete("status")
                }
                // console.log(url.href);
                window.location.href=url.href;
            });
        });
    }
const formsearch = document.querySelector("#form-search");
    if(formsearch){
        let url = new URL (window.location.href);
        formsearch.addEventListener("submit",(e)=>{
            e.preventDefault();
            const keyword = e.target.elements.keyword.value;
            if(keyword){
                url.searchParams.set("keyword",keyword);
            }
            else{
                url.searchParams.delete("keyword")
            }
            // console.log(url.href);
            window.location.href=url.href;
        });
}
const buttonPagination = document.querySelectorAll("[button-pagination]");
if(buttonPagination){
    let url = new URL (window.location.href);
    buttonPagination.forEach(button => {
        button.addEventListener("click",()=>{
            const page = button.getAttribute("button-pagination");
            url.searchParams.set("page",page);
            window.location.href=url.href;
        });
    });
}
const checkboxMulti = document.querySelector("[checkbox-multi]")
if(checkboxMulti){
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']")
    // console.log(inputCheckAll)
    const inputsId = checkboxMulti.querySelectorAll("input[name='id']")
    inputCheckAll.addEventListener("click",()=>{
        if(inputCheckAll.checked){
            inputsId.forEach(input=>{
                input.checked = true;
            });
        }else{
            inputsId.forEach(input=>{
                input.checked = false;
            });
        }
    });
    inputsId.forEach((input) =>{
        input.addEventListener("click",()=>{
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
            if(countChecked==inputsId.length){
                inputCheckAll.checked = true;
            }else{
                inputCheckAll.checked = false;
            }
        });
    });
}
const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti){
    formChangeMulti.addEventListener("submit",(e)=>{
        e.preventDefault();
        const inputIds = formChangeMulti.querySelector("input[name='ids']");
        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");
        const typechange = e.target.elements.type.value;
        if(typechange=="delete-all"){
            const isconfirm = confirm("bạn có chắc muốn xoá hết các sản phẩm đã chọn này?")
            if(!isconfirm){
                return;
            }
        }
        if(inputsChecked.length>0){
            let ids=[];
            inputsChecked.forEach(input=>{
                const id = input.value;
                if(typechange=="change-position"){
                    const position = input.closest("tr").querySelector("input[name='position']").value;

                    ids.push(`${id}-${position}`);
                }else{
                    ids.push(id);
                }
                
            })
            
            inputIds.value = ids.join(", ");
            formChangeMulti.submit();
        }else{
            alert("vui lòng nhập ít nhất 1 sản phẩm");
        }
    });

}
const showalert = document.querySelector("[show-alert]");
if(showalert){
    const time = parseInt(showalert.getAttribute("data-time"));
    const closeAlert = document.querySelector("[close-alert]");
    closeAlert.addEventListener("click",() => {
        showalert.classList.add("alert-hidden")});
    setTimeout(() => {
        showalert.classList.add("alert-hidden");
    }, time);
}
// Upload Image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
    const uploadImageInput = document.querySelector("[upload-image-input]");
    const uploadImagePreview = document.querySelector("[upload-image-preview]");

    uploadImageInput.addEventListener("change", (e) => {
        console.log(e);
        const file = e.target.files[0];
        if (file) {
            uploadImagePreview.src = URL.createObjectURL(file);
        }
    });
}
// End Upload Image
const sort = document.querySelector("[sort]");
if(sort){
    let url = new URL (window.location.href);
    const sortSelect = sort.querySelector("[sort-select]");
    const sortClear = sort.querySelector("[sort-clear]");
    sortSelect.addEventListener("change",(e)=>{
        const value = e.target.value;
        const [sortKey,sortValue] = value.split("-");
        url.searchParams.set("sortKey",sortKey);
        url.searchParams.set("sortValue",sortValue);
        window.location.href=url.href;
    })
    sortClear.addEventListener("click",()=>{
        url.searchParams.delete("sortKey");
        url.searchParams.delete("sortValue");
        window.location.href=url.href;
    })
    const sortKey = url.searchParams.get("sortKey");
    const sortValue = url.searchParams.get("sortValue");
    if(sortKey && sortValue){
        const stringSort = `${sortKey}-${sortValue}`;
        const optionSelected = sortSelect.querySelector(`option[value='${stringSort}']`)
        optionSelected.selected = true;
    }
}
