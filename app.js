const Base_URL="https://2024-03-06.currency-api.pages.dev/v1/currencies";//the usd/inr is removed because we are fetching in down

const dropdowns=document.querySelectorAll(".dropdown select");//select is for both the dropdowns
const button=document.querySelector("form button");//specifying form button to be used

const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".final-message");

//dropdowns
for(let select of dropdowns)
{
    for(currcode in countryList)
{
    //each country code is converted into an option and then they are added
    let newOption=document.createElement("option");
    newOption.innerText=currcode;
    newOption.value=currcode;

    if(select.name==="from" && currcode==="USD")
    {
        newOption.selected="selected";
    }
    else if(select.name==="to" && currcode==="INR")
    {
        newOption.selected="selected";
    }     
    select.append(newOption);
}
select.addEventListener("change",(evt)=>
{
    updateFlag(evt.target);//target reflects the changes in updateFlag
});
}

const updateFlag=(element)=>
{ 
    let currcode=element.value;
    let countryCode=countryList[currcode];
    let newsrc=`https://flagsapi.com/${countryCode}/flat/64.png`;

   let img=element.parentElement.querySelector("img");//the element is accessing the img from parentelement(document or body here it is div:select container)
   img.src=newsrc;//this img.src is used to fetch the url from html page using js so here this is overwritten with newsrc which is an api

};

const UpdateExchangeRate= async()=>
{
let amount=document.querySelector(".amount input");
let amtval=parseFloat(amount.value);

/*Places where NAN occurs
console.log(0 / 0);          
console.log(Math.sqrt(-1));  
console.log("hello")//but its string exaclty doesnt come under NAN.
*/

if(isNaN(amtval)||amtval<1)
{
    amtval=1;
    console.log(amtval);
    amount.value="1";//for displaying 1 in the text box
}

//console.log(fromCurr.value,toCurr.value)
const URL=`${Base_URL}/${fromCurr.value.toLowerCase()}.json`;

let response=await fetch(URL);
let data=await response.json();
let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
console.log(rate);
//console.log(response);

let finalamount=amtval*rate;
msg.innerText=`${amtval} ${fromCurr.value} = ${finalamount.toFixed(2)} ${toCurr.value}`;
};

window.addEventListener("load",()=>
{
  UpdateExchangeRate();
});

button.addEventListener("click", (evt)=>
{
evt.preventDefault();//refresh and the default behaviour 
UpdateExchangeRate();
});
