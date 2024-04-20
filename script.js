const temp=document.querySelector(".temp")
const feeltemp=document.querySelector(".feelMsg")
const wind=document.querySelector(".windMsg")
const windDeg=document.querySelector(".windDegMsg")
const humd=document.querySelector(".humidityMsg")
const cloudy=document.querySelector(".cloudMsg")
const btn=document.querySelector(".submit")
const PlaceName=document.querySelector(".name")
const countryName=document.querySelector(".countryMsg")
const dateTime=document.querySelector(".time-date")
const bodyAll=document.querySelector("body");
const panelblur=document.querySelector(".panel")
const weathInfo=document.querySelector("#infoAll")
const condInfo=document.querySelector(".conditionMsg")
const imgIcon=document.querySelector(".icon");
function findDate(currDate) {
    const today = new Date(currDate);
    const f = new Intl.DateTimeFormat("en-US", {
        timeStyle: "short",
        dateStyle: "medium"
    });
    const finalDate = f.format(today);
    return finalDate;
}
btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".locationInput input");
    let amtVal=amount.value;
    let Baseurl=`https://api.weatherapi.com/v1/current.json?key=c07c490796ff4621b7e181435241804&q=${amtVal}`;
	let response =await fetch(Baseurl);
	let data =await response.json();
    temp.innerHTML=data.current.temp_c +"&#176;";
    feeltemp.innerHTML=data.current.feelslike_c+"&#176;";
    windDeg.innerHTML=data.current.wind_degree+"&#176;";
    humd.innerHTML=data.current.humidity+" %";
    wind.innerHTML=data.current.wind_kph+" km/h";
    cloudy.innerHTML=data.current.cloud+" %";
    PlaceName.innerHTML=data.location.name;   
    countryName.innerHTML=data.location.country;  
    const currDate=data.location.localtime;
    const date=findDate(currDate);
    dateTime.innerHTML=date;
    if(parseFloat(temp.innerHTML)>=30 && parseFloat(cloudy.innerHTML)<70)
    {
        console.log("Clear");
        bodyAll.style.backgroundImage= "url('./img/dayClear.jpg')"; 
        imgIcon.src='./img/sun.png';      
        bodyAll.style.color= 'black';
        panelblur.style.backgroundColor='rgba(110, 110, 110, 0.60)'  ;  
        condInfo.innerHTML="Clear";
    }
    else if(parseFloat(temp.innerHTML)<30 && parseFloat(temp.innerHTML)>10 && parseFloat(cloudy.innerHTML)>60 && parseFloat(cloudy.innerHTML)<80)
    {
        console.log("Partially Cloudy");
        bodyAll.style.backgroundImage= "url('./img/dayCloud.jpg')";    
        imgIcon.src='./img/moonstrom.png';     
        bodyAll.style.color= 'white';
        panelblur.style.backgroundColor='rgba(110, 110, 110, 0.40)'  ;  
        condInfo.innerHTML="Cloud";
    }
    else if(parseFloat(temp.innerHTML)>0 && parseFloat(cloudy.innerHTML)>70)
    {
        bodyAll.style.backgroundImage= "url('./img/dayRain.jpg')";    
        imgIcon.src='./img/dayrain.png';     
        bodyAll.style.color= 'white';
        panelblur.style.backgroundColor='rgba(110, 110, 110, 0.40)'  ;  
        condInfo.innerHTML="Rainfall";
    }
    else if(parseFloat(temp.innerHTML)<10)
    {
        bodyAll.style.backgroundImage= "url('./img/daySnow.jpg')";    
        imgIcon.src='./img/wind.png';     
        bodyAll.style.color= 'white';
        panelblur.style.backgroundColor='rgba(110, 110, 110, 0.60)';  
        condInfo.innerHTML="Winter";
    }
    else
    {
        bodyAll.style.backgroundImage= "url('./img/nightClear.jpg')";    
        imgIcon.src='./img/moon.png';     
        bodyAll.style.color= 'white';
        panelblur.style.backgroundColor='rgba(110, 110, 110, 0.10)';  
        condInfo.innerHTML="Clear";
    }
}) 