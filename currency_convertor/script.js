const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
let dropDowns = document.querySelectorAll("select");
let exchange = document.querySelector(".rate");
let board = document.querySelector(".converter");
let amount = document.querySelector(".text");
let from = document.querySelector(".from select");
let to = document.querySelector(".to select");

window.addEventListener("load",()=>{
    get_Amount();
})

for(let select of dropDowns){
    for(let country_flag in countryList){

        let newOption = document.createElement("option");
        newOption.innerText = country_flag;
        select.append(newOption);
        if(country_flag == "USD" && select.name == "from"){
            newOption.selected = "selected";
        }
        if(country_flag == "INR" && select.name == "to"){
            newOption.selected = "selected";
        }
        
    }

    select.addEventListener("change",(event)=>{
        updateFlag(event.target);
    });

    
};


const updateFlag = (event)=>{
    let count_flag = countryList[event.value];
    let img = event.parentElement.querySelector("img");
    img.src = `https://flagsapi.com/${count_flag}/flat/64.png`;
}


exchange.addEventListener("click",(evt)=>{
    evt.preventDefault();
    get_Amount();
});

const get_Amount = async ()=>{

    let curr_amount = amount.value;
    if(curr_amount < 1){
        amount.value = 1;
        curr_amount = 1;
    }

    let new_URL = `${BASE_URL}/${from.value.toLowerCase()}/${to.value.toLowerCase()}.json`;
    let response = await fetch(new_URL);
    let data = await response.json();
    let rate = data[to.value.toLowerCase()];
    let finalVal = rate*amount.value;
    board.innerText = `${amount.value} ${from.value} = ${finalVal} ${to.value}`;
};

