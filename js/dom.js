const grocery= document.querySelector('.container');
const form=document.querySelector('.grocery-form');
const subBtn=document.querySelector('.btn');
const groceryList=document.querySelector('.grocery-list');
const input=document.getElementById('input');
const alert = document.querySelector(".alert");
const clear=document.getElementById('clear');

form.addEventListener('submit', addItem);
clear.addEventListener('click',clearItems);

let editElement;
let editFlag=false;


function addItem(e){
    e.preventDefault();
    const id = new Date().getTime().toString();
    const value=input.value;

    if(value!=='' && !editFlag){
        const groceryItem=document.createElement('article');

        const attr = document.createAttribute("data-id");
        attr.value = id;
        groceryItem.setAttributeNode(attr);

        groceryItem.classList.add('grocery-item');
        groceryItem.innerHTML=
            `<p class="item list">${value}</p>
            <div class="btn-container">
            <button id="edit" class="edit">Edit</button>
            <button id="delete" class="delete">Delete</button>
            </div>`;
    
        groceryList.appendChild(groceryItem); 
        groceryList.style.visibility='visible'; 
        clear.style.visibility='visible';


        //DELETE 
        const del=document.querySelectorAll('.delete');
        for(let i=0;i<del.length;i++){
            del[i].addEventListener('click',deleteItem);
        }

        //EDIT
        const edit=document.querySelectorAll('.edit');
         for(let i=0;i<del.length;i++){
            edit[i].addEventListener('click',editItem);
        }

        displayAlert("Item added to the list", "success");
        setBackToDefault()
    }

    else if(value!=='' && editFlag){
        editElement.innerHTML=value;
        setBackToDefault()
        displayAlert("Item edited", "success");
   }

   else{
    displayAlert("Enter an item", "danger");
   }
}


function deleteItem(e){
    const element=e.currentTarget.parentElement.parentElement;
    groceryList.removeChild(element);
    displayAlert("Item deleted from the list", "danger");
}


function editItem(e){
    editElement=e.currentTarget.parentElement.previousElementSibling;
    input.value=editElement.innerHTML;
    subBtn.textContent='Edit';
    editFlag=true;
    
}

function setBackToDefault() {
    input.value = "";
    editFlag = false;
    subBtn.textContent = "submit";
  }


  function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    setTimeout(function () {
      alert.textContent = "";
      alert.classList.remove(`alert-${action}`);
    }, 1000);
  }


  function clearItems() {
    const items = document.querySelectorAll(".grocery-item");
    if (items.length > 0) {
      items.forEach(function (item) {
        groceryList.removeChild(item);
      });
    }
    displayAlert("Empty list", "danger");
    setBackToDefault();
  }