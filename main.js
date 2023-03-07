const priceInput=document.getElementById('price');
const nameInput=document.getElementById('product');
const list=document.getElementById('list');
const totalVal=document.getElementById('totalVal');

let tValue=0;




// init function to get the initial data already posted earlier and log it on the screen

function init(){

    axios.get(`https://crudcrud.com/api/d59777589b094862acbf3988f5cc8bdd/productData`)
        .then(res=>res.data.forEach(logData))
        .catch(err=>console.error(err));

    // setTimeout so that tValue is logged for the calculated valued and not the initial values
    setTimeout(()=>totalVal.appendChild(document.createTextNode(`Total worth value of products: ${tValue}`)),500);

}
init();


// submithandler to log the new data
function submitHandler(e){
    e.preventDefault();

    const price=priceInput.value;
    const name=nameInput.value;
    
    const data={
        "price":price,
        "name":name
    }

    // posting the data on the route
    axios.post(`https://crudcrud.com/api/d59777589b094862acbf3988f5cc8bdd/productData`,data)
        .then(res=>logData(res.data))
        .catch(err=>console.error(err));
        
    // after every new submission we are refreshing to load the new value of tValue
    setTimeout(()=>window.location.reload(),500);
    
}

// logdata is used to log the individual set of data on the screen as a li
function logData(element){

    // extracting daat from the object
    const price=element.price;
    tValue+=Number(price);
    const name=element.name;
    const id=element._id;

    // setting local storage
    localStorage.setItem(id,element);

    // Creating li to be put in out ul
    const li=document.createElement('li');
    li.classList.add(id);
    li.appendChild(document.createTextNode(`${price} - ${name} `));
    
    // Adding delete functionality on our li
    const deleteB=document.createElement('button');

    deleteB.onclick=()=>{
        localStorage.removeItem(id);

        axios.delete(`https://crudcrud.com/api/d59777589b094862acbf3988f5cc8bdd/productData/${id}`)
            .then(res=>console.log(res))
            .then(err=>console.error(err));
        
            setTimeout(()=>{
                window.location.reload();
            },500);
    }
    deleteB.appendChild(document.createTextNode('Delete'));
    li.appendChild(deleteB);

    list.appendChild(li);


}