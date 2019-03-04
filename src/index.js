//init floater
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {
      direction: 'left',
      hoverEnabled: false
    });
  });

//init tooltip
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems);
});



//vars
let textarea = document.getElementById("textarea");
let boxtitle = document.getElementById("boxtitle");
let boxcontent = document.getElementById("boxcontent");
let form = document.querySelector("form");
let nodeRadioButtons = document.querySelectorAll(".typeselector");
let radioButtons = Array.prototype.slice.call(nodeRadioButtons);
let editMessage = document.getElementById("closeediting");
let message = document.getElementById("message");
let addBtn = document.getElementById("addbtn");
let editBtn = document.getElementById("editbtn");
let valueToBeEdited;
let keyToInsert;
let postArea;
let toBeEdited;

let workNotes = document.getElementById("workpanel"),
    financeNotes = document.getElementById("financepanel"),
    personalNotes = document.getElementById("personalpanel"),
    otherNotes = document.getElementById("otherpanel");

let arrWork = [],
    arrFinance = [],
    arrPersonal = [],
    arrOther = []; 

let editWork = document.getElementById("editWork"),
    editFinance = document.getElementById("editFinance"),
    editPersonal = document.getElementById("editPersonal"),
    editOther = document.getElementById("editOther");


//event listeners
textarea.addEventListener("focus", ()=>{
    boxtitle.style.display = "block";
    boxcontent.style.display = "block";
});

addBtn.addEventListener("click", createNote);
window.addEventListener("DOMContentLoaded", displayData);

editWork.addEventListener("click", ()=>{
    let elements  = Array.prototype.slice.call(workNotes.children);
    for(let i = 1; i < elements.length; i++){
        if(elements[i].children.length < 2){
            displayOptions(elements[i], "teal");
        }
    }
    showEditExit();
});

editFinance.addEventListener("click", ()=>{
    let elements  = Array.prototype.slice.call(financeNotes.children);
    for(let i = 1; i < elements.length; i++){
        if(elements[i].children.length < 2){
            displayOptions(elements[i], "purple");
        }
    }
    showEditExit();
});

editPersonal.addEventListener("click", ()=>{
    let elements  = Array.prototype.slice.call(personalNotes.children);
    for(let i = 1; i < elements.length; i++){
        if(elements[i].children.length < 2){
            displayOptions(elements[i], "red");
        }
    }
    showEditExit();
});

editOther.addEventListener("click", ()=>{
    let elements  = Array.prototype.slice.call(otherNotes.children);
    for(let i = 1; i < elements.length; i++){
        if(elements[i].children.length < 2){
            displayOptions(elements[i], "amber");
        }
    }
    showEditExit();
});


workNotes.addEventListener("click", (e)=>{
    if(e.target.classList.contains("editNoteBtn")){
        valueToBeEdited = e.target.parentNode.parentNode.parentNode.firstElementChild.innerText;
        toBeEdited = e.target.parentNode.parentNode.parentNode.firstElementChild;
        keyToInsert = "workStorage";
        editState(valueToBeEdited);
    }

    if(e.target.classList.contains("deleteNoteBtn")){
        let value = e.target.parentNode.parentNode.parentNode.firstElementChild.innerText;
        let key = "workStorage";
        workNotes.removeChild(e.target.parentNode.parentNode.parentNode);
        deleteNoteFromStorage(key,value);
        M.toast({html: 'Note deleted!', classes: 'rounded', displayLength: "2000"});
    }
});

financeNotes.addEventListener("click", (e)=>{
    if(e.target.classList.contains("editNoteBtn")){
        valueToBeEdited = e.target.parentNode.parentNode.parentNode.firstElementChild.innerText;
        toBeEdited = e.target.parentNode.parentNode.parentNode.firstElementChild;
        keyToInsert = "financeStorage";
        editState(valueToBeEdited);
    }

    if(e.target.classList.contains("deleteNoteBtn")){
        let value = e.target.parentNode.parentNode.parentNode.firstElementChild.innerText;
        let key = "financeStorage";
        financeNotes.removeChild(e.target.parentNode.parentNode.parentNode);
        deleteNoteFromStorage(key,value);
        M.toast({html: 'Note deleted!', classes: 'rounded', displayLength: "2000"});
    }
});

personalNotes.addEventListener("click", (e)=>{
    if(e.target.classList.contains("editNoteBtn")){
        valueToBeEdited = e.target.parentNode.parentNode.parentNode.firstElementChild.innerText;
        toBeEdited = e.target.parentNode.parentNode.parentNode.firstElementChild;
        keyToInsert = "personalStorage";
        editState(valueToBeEdited);
    }

    if(e.target.classList.contains("deleteNoteBtn")){
        let value = e.target.parentNode.parentNode.parentNode.firstElementChild.innerText;
        let key = "personalStorage";
        personalNotes.removeChild(e.target.parentNode.parentNode.parentNode);
        deleteNoteFromStorage(key,value);
        M.toast({html: 'Note deleted!', classes: 'rounded', displayLength: "2000"});
    }
});

otherNotes.addEventListener("click", (e)=>{
    if(e.target.classList.contains("editNoteBtn")){
        valueToBeEdited = e.target.parentNode.parentNode.parentNode.firstElementChild.innerText;
        toBeEdited = e.target.parentNode.parentNode.parentNode.firstElementChild;
        keyToInsert = "otherStorage";
        editState(valueToBeEdited);
    }

    if(e.target.classList.contains("deleteNoteBtn")){
        let value = e.target.parentNode.parentNode.parentNode.firstElementChild.innerText;
        let key = "otherStorage";
        otherNotes.removeChild(e.target.parentNode.parentNode.parentNode);
        deleteNoteFromStorage(key,value);
        M.toast({html: 'Note deleted!', classes: 'rounded', displayLength: "2000"});
    }
});

editMessage.addEventListener("click",()=>{
   let wn = Array.prototype.slice.call(workNotes.children),
    fn = Array.prototype.slice.call(financeNotes.children),
    pn = Array.prototype.slice.call(personalNotes.children),
    on = Array.prototype.slice.call(otherNotes.children);
    let arrNotes = [wn,fn,pn,on];
    console.log(arrNotes);
     for(let i = 0; i < arrNotes.length;i++){
        for(let j = 1; j < arrNotes[i].length; j++){
            if(arrNotes[i][j].children[1] !== null)
               arrNotes[i][j].removeChild(arrNotes[i][j].children[1]);
        }
    } 
   setTimeout(() => {
       editMessage.innerHTML= "";
   }, 500); 
});


editBtn.addEventListener("click", ()=>{
    updateStorage(keyToInsert,valueToBeEdited, textarea.value);
    toBeEdited.innerText = textarea.value;
    setTimeout(() => {
        addBtn.style.display = "block";
    }, 500);
    editBtn.style.display = "none";
    textarea.focus();
    textarea.value = ""; 
    M.toast({html: 'Note edited!', classes: 'rounded', displayLength: "2000"});
});

//functions
function displayData(){
    let keys = ["workStorage", "financeStorage", "personalStorage", "otherStorage"];
    let displayArea;
    keys.forEach(key => {
        let currentContent = localStorage.getItem(key);
        if(currentContent !== null){
            let content = JSON.parse(currentContent);
            content.forEach(note => {
                switch(key){
                    case "workStorage":
                        displayArea = workNotes;
                        break;
                    case "financeStorage":
                        displayArea = financeNotes;
                        break;
                    case "personalStorage":
                        displayArea = personalNotes;
                        break;
                    case "otherStorage":
                        displayArea = otherNotes;
                        break;
                }
                createNewNote(displayArea, note);
            });
        }
    });
}


function createNote(e){
    let noteType = undefined;
    radioButtons.forEach(button => {
        if(button.checked){
            noteType = button.id;
        }
    });

    let arrKey;
    let arrToStore; 

    if(textarea.value !== "" && noteType != undefined){
        switch(noteType){
            case "work":
                postArea = workNotes;
                arrWork.push(textarea.value);
                arrKey = "workStorage";
                arrToStore = arrWork;
                break;
            case "finances": 
                postArea = financeNotes;
                arrFinance.push(textarea.value);
                arrKey = "financeStorage";
                arrToStore = arrFinance;
                break;
            case "personal":
                postArea = personalNotes;
                arrPersonal.push(textarea.value);
                arrKey = "personalStorage";
                arrToStore = arrPersonal;
                break;
            case "other":
                postArea = otherNotes;
                arrOther.push(textarea.value);
                arrKey = "otherStorage";
                arrToStore = arrOther;
                break; 
        }
        createNewNote(postArea,textarea.value);
        storePost(arrKey, arrToStore, textarea.value);
        textarea.value= "";
        M.toast({html: 'Note added!', classes: 'rounded', displayLength: "2000"});
    } else{
        showMessage();
    }
    closeNoteOptions();
    e.preventDefault();
}


function createNewNote(area, value){
    area.innerHTML += `
        <li class="collection-item"><p class="noteValue">${value}</p> </li>
    `;
}


function closeNoteOptions(){
    boxtitle.style.display = "none";
    boxcontent.style.display = "none";
}


function storePost(key,value, newValue){
    let currentContent = localStorage.getItem(key);
    if(currentContent === null){
        localStorage.setItem(key, JSON.stringify(value));
    } else if(currentContent !== null) {
        let content = JSON.parse(currentContent);
        content.push(newValue);
        localStorage.setItem(key, JSON.stringify(content));
    }
}


function displayOptions(section, color){
    section.innerHTML += `
    <div class="noteButtons">
        <a class="btn-floating white btn-small"><i class="material-icons ${color}-text editNoteBtn">border_color</i></a>
        <a class="btn-floating white btn-small"><i class="material-icons ${color}-text deleteNoteBtn">delete</i></a>
    </div>
    `;
}

function showEditExit(){
    editMessage.innerHTML = `
    <a class="waves-effect waves-light btn-large red accent-4 white-text pulse"><i class="material-icons left">clear_all</i>EXIT EDITING</a>
    `;
}

function showMessage(){
    message.innerHTML = `
        <a class="btn red accent-2 white-text">Please enter note and select category.</a>
    `;
    setTimeout(() => {
        message.innerHTML = "";
    }, 1500);
}


function deleteNoteFromStorage(key,value){
    let storage = JSON.parse(localStorage.getItem(key));
    storage.forEach(element => {
        if(value === element){
            storage.splice(storage.indexOf(element),1);
            let newArr = JSON.stringify(storage);
            localStorage.setItem(key, newArr);
        }
    });
}

function updateStorage(key,oldValue,newValue){
    let storage = JSON.parse(localStorage.getItem(key));
    storage.forEach(element => {
        if(oldValue === element){
            storage.splice(storage.indexOf(element),1, newValue);
            let newArr = JSON.stringify(storage);
            localStorage.setItem(key, newArr);
        }
    });
}

function editState(value){
    addBtn.style.display = "none";
    editBtn.style.display = "block";
    textarea.focus();
    textarea.value = value;  
    closeNoteOptions();
}




















