const key  = '';

let resultAPI ;
const temps= document.querySelector('.temps')
const temperature= document.querySelector('.temperature')
const localisation= document.querySelector('.localisation')
const heure = document.querySelectorAll('.heure-nom-prevision')
const tempPourH = document.querySelectorAll('.jour-prevision-nom')

if(navigator.geolocation){

    navigator.geolocation.getCurrentPosition(position => {
        console.log(position)
        let long = position.coords.latitude
        let lat = position.coords.latitude
        AppelAPI(long,lat)

    }), ()=>{
        alert("Vous avez refusé la demande de localisation, nous ne pouvons pas afficher la température")
    }
}

function AppelAPI(long,lat) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&lang=fr&appid=${key}`)
    .then((reponse)=>{
        return reponse.json();
    })
    .then((data) => {
        console.log(data)
        resultAPI = data
        temps.innerText = resultAPI.weather[0].description
        temperature.innerText = `${Math.trunc(resultAPI.main.temp)}°`
        localisation.innerText = resultAPI.sys.country

        let heureActuelle = new Date().getHours()

        for (let i = 0;i<heure.length;i++) {
             let heureIncr = heureActuelle + i * 3
            if(heureIncr > 24 ) {
                heure[i].innerText = `${heureIncr -24} h`
            }else if(heureIncr === 24){
                heure[i].innerText = "00 h"
            }else{
                heure[i].innerText = `${heureIncr} h`
            }
        }

        for(let j = 0;j<tempPourH.length;j++) {
            tempPourH[j].innerText = `${Math.trunc(resultAPI.main.temp +=1)}°`
        }
    })
}