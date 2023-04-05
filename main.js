const priceInput=document.getElementById('price');
const nameInput=document.getElementById('product');
const categoryInput=document.getElementById('category');
const fashionList=document.getElementById('fashionList');
const foodList=document.getElementById('foodList');
const electronicsList=document.getElementById('electronicsList');
const totalVal=document.getElementById('totalVal');

let tValue=0;

async function init(){

    try{
        const res=await axios.get(`http://localhost:3000/product/get-products`);
        console.log(res.data.resData);
        res.data.resData.forEach(logData);
        totalVal.appendChild(document.createTextNode(`Total value of products added: ${tValue}`));
    }
    catch(error){
        console.error(error);
    }

}
document.addEventListener("DOMContentLoaded",init);




// submithandler to log the new data
async function submitHandler(e){
    try{
        e.preventDefault();
        const price=priceInput.value;
        const name=nameInput.value;
        const category=categoryInput.value;

        const data={
            "price":price,
            "name":name,
            "category":category
        }
        // posting the data on the route
        const res=await axios.post(`http://localhost:3000/product/add-product`,data);
        console.log(res);
        window.location.reload();
    }
   catch(error){
        console.error(error);
   }
}



// logdata is used to log the individual set of data on the screen as a li
function logData(element){

    // extracting data from the object
        const price=element.price;
        tValue+=Number(price);
        const name=element.name;
        const category=element.category;
        const id=element.id;

        // // setting local storage
        // localStorage.setItem(id,element);

        // Creating li to be put in out ul
        const li=document.createElement('li');
        li.classList.add(id);
        li.appendChild(document.createTextNode(`${price} - ${name}`));
        // Adding delete functionality on our li
        const deleteB=document.createElement('button');
        
        deleteB.onclick=async () => {
            try{
                localStorage.removeItem(id);
                const res=await axios.post(`http://localhost:3000/product/delete-product/${id}`);
                // After deleting we need to refresh the page
                window.location.reload();
            }
            catch(error){
                console.error(error);
            }

        }
        deleteB.appendChild(document.createTextNode('Delete'));
        li.appendChild(deleteB);

        const editB=document.createElement('button');
        editB.onclick=async () =>{
            try{
                const res=await axios.get(`http://localhost:3000/product/get-product/${id}`);
                await axios.post(`http://localhost:3000/product/delete-product/${id}`);
                const returnObj=res.data.resData;
                priceInput.value=returnObj.price;
                nameInput.value=returnObj.name;
                categoryInput.value=returnObj.category;



            }
            catch(error){
                console.log(error);
            }

        }
        editB.appendChild(document.createTextNode('Edit'));
        li.appendChild(editB);
        if(category==='fashion'){
            fashionList.appendChild(li);
        }
        else if(category==='food'){
            foodList.appendChild(li);
        }
        else{
            electronicsList.appendChild(li);
        }
}
