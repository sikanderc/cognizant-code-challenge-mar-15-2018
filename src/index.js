let url
let neoInstanceDate
let timeFromNow
const neoInstancePlanet = 'Juptr'
const today = new Date()
let arr = []
let top3 = []

document.addEventListener('DOMContentLoaded', function() {
  display3closest()
})

async function fetchURL() {
  for (var i = 0; i < 923; i++) {
    url = `https://www.neowsapp.com/rest/v1/neo/browse?page=${i}&size=20`
    let jsonFetch = await fetch(url)
    .then(res => res.json())
    .then(json => aggregateInfo(json))
    console.log(i);
  }
}

function aggregateInfo(json) {
  json.near_earth_objects.filter(neo => {
    let currentNeo = neo
    neo.close_approach_data.forEach(obj => {
      neoInstanceDate = new Date(obj.close_approach_date)
      timeFromNow = neoInstanceDate - today
      if ((obj.orbiting_body === neoInstancePlanet) && (timeFromNow > 0)) {
        let newObj = {...currentNeo, close_approach_data: obj, time_from_now: timeFromNow}
        return arr.push(newObj)
      }
    })
  })
}

async function sortDates() {
  const fetching = await fetchURL()
  arr.sort((a,b) => {
    a.time_from_now - b.time_from_now
  })
  console.log("sorted");
}

async function display3closest() {
  const sorting = await sortDates()
  console.log("displaying");
  for (var j = 0; j < 3; j++) {
    top3.push(arr.shift())
  }
  let displayNeos = document.getElementById('neos')
  top3.forEach(neo => {
    displayNeos.innerHTML += `<li>Name: ${neo.name}</li>`
  })
}
