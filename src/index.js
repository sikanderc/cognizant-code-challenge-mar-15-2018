let url
let neoInstanceDate
let timeFromNow
const neoInstancePlanet = 'Juptr'
let result = []
const today = new Date()
let dateArray = []
let nextDate
let objData
let arr = []
let afterdates
let closestNeo
let dateTimeout

document.addEventListener('DOMContentLoaded', function() {

  for (var i = 0; i < 921; i++) {
    url = `https://www.neowsapp.com/rest/v1/neo/browse?page=${i}&size=20`
    getData()
  }

})

function getData() {
  fetch(url)
  .then(res => res.json())
  .then(json => aggregateInfo(json))
}

function aggregateInfo(json) {
  json.near_earth_objects.filter(neo => {
    let currentNeo = neo
    neo.close_approach_data.forEach(obj => {
      neoInstanceDate = new Date(obj.close_approach_date)
      timeFromNow = neoInstanceDate - today
      if ((obj.orbiting_body === neoInstancePlanet) && (timeFromNow > 0)) {
        let newObj = {...currentNeo, close_approach_data: obj, time_from_now: timeFromNow}
        arr.push(newObj)
      }
    })
  })
  dateTimeout = setTimeout(sortDates(arr), 20000)
}

function sortDates(arr) {
  arr.sort((a,b) => {
    a.time_from_now - b.time_from_now
  });
  top3timeout = setTimeout(display3closest(arr), 20000)
}

function display3closest(arr) {
  let top3 = arr.splice(0, 3)
  let displayNeos = document.getElementById('neos')
  top3.forEach(neo => {
    displayNeos.innerHTML += `<li>Name: ${neo.name}</li>`
  })
}
