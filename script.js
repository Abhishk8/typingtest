//randomtext
const textap = ["I won't close down a business of subnormal profitability merely to add a fraction of a point to our corporate returns. I also feel it inappropriate for even an exceptionally profitable company to fund an operation once it appears to have unending losses in prospect. Adam Smith would disagree with my first proposition and Karl Marx would disagree with my second; the middle ground is the only position that leaves me comfortable", 
"Lorem ipsum dolor sit amet consectetur adipisicing elit.quisquam ab asperiores voluptatum modi dolore.Omnis possimus culpa, sapiente est nihil magni eveniet harum dicta nobis placeat facere non iusto dolorem quidem minima veniam autem aliquid dignissimos quo deserunt.Ipsum necessitatibus something  Nobis officia odit incidunt odio eveniet necessitatibus, ducimus illum cum! Facilis vel molestiae ratione architecto nam deleniti mollitia cupiditate iure tempore, necessitatibus voluptas ",
"quia suscipit nobis ratione obcaecati odit.Veritatis,voluptas hic temporibus debitis inventore enim placeat! Nobis officia odit incidunt odio eveniet necessitatibus, ducimus illum cum! Facilis vel molestiae ratione architecto nam deleniti mollitia cupiditate iure tempore, necessitatibus voluptas harum tenetur ab.Error laudantium est veniam amet modi velit tempora magnam, perferendis non ? ."];

const textsection = document.getElementById("textid");
const userinput = document.getElementById("textinput");
const startbtn = document.getElementById("stbtn");
const stopbtn = document.getElementById("spbtn");

let text = "";
var selectedtime = 60;
let timer = "";
let mistakes = 0;
//selecting time 

function selecttime(){
    const timebyuser = document.getElementById("Toptions");
    if(timebyuser.value == 1){
        selectedtime = 60;
    }
    else if(timebyuser.value == 2){
        selectedtime= 60*2;
    }
    else{
        selectedtime =  60*5;
    }
}



userinput.addEventListener("input",()=>{
    let qchar = document.querySelectorAll(".quote-chars");
    console.log(qchar.length);

    qchar = Array.from(qchar);

    let userinchars = userinput.value.split("");

    qchar.forEach((char,index) =>{
        //check for each chars

        if(char.innerHTML == userinchars[index]){
            char.classList.add("success")
        }

        else if(userinchars[index] == null){
            if(char.classList.contains("success")){
                char.classList.remove("success");
            }
            else{
                char.classList.remove("fail");
            }
        }
        else{
            if(!char.classList.contains("fail")){
                mistakes+=1;
                char.classList.add("fail");
            }
            document.getElementById("mistake").innerText = mistakes;
        }
        
        //return true if all corrects;

        let check = qchar.every((element) =>{
            return element.classList.contains("success");
        })
        if(check){
            displayresult();
        }

    })
    
})

function timereducer(){
  timer = setInterval(()=>{
    if(selectedtime == -1){
        displayresult();
        clearInterval();
    }
    else{
        document.getElementById("timer").innerText = selectedtime-- + "s";    }
  },1000);
}

function displayresult(){
document.querySelector(".result").style.display = "block"
document.getElementById("timehide").style.display = "block";
clearInterval(timer);
stopbtn.style.display = "none";
startbtn.style.display = "block";
userinput.disabled = true;
var ulength = 0;
let timetaken = 1;
if(selectedtime != 0){
    ulength= userinput.value.length;
    timetaken = (60 - selectedtime) / 100;
    textsection.innerText = "";

    userinput.value = "";
    renderNewtext();
    selectedtime = 60;
    document.getElementById("time").style.display = "block";
}
document.getElementById("speed").innerText = (ulength/5/timetaken).toFixed(2) + "wpm";
document.getElementById("accuracy").innerText = Math.round(((ulength-mistakes)/(ulength)) *100) + "%";
}
startbtn.addEventListener("click", function(){
    mistakes = 0;
    timer = "";
    document.getElementById("timehide").style.display = "none";
    timereducer();
    userinput.disabled = false;
    document.getElementById("mistake").innerText = mistakes;
    startbtn.style.display = "none";
    document.getElementById("spbtn").style.display = "block";
    document.querySelector(".result").style.display = "none";
})

stopbtn.addEventListener("click",displayresult);

//display random text

const renderNewtext = async()=>{
       

        let index = Math.floor(Math.random()*text.length);
         
        let arr = textap[index].split("").map(value =>{
        return "<span class = 'quote-chars'>"+value+"</span>";
        })

        textsection.innerHTML += arr.join(""); 
}

window.onload = ()=>{
    userinput.value = "";
    startbtn.style.display = "block";
    document.getElementById("spbtn").style.display = "none";
    userinput.disabled = true;
    renderNewtext();
}
