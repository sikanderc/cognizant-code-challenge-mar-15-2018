let url
let neoInstanceDate
let timeFromNow
const neoInstancePlanet = 'Juptr'
const today = new Date()
let arr = []
let top3 = []
let res

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
        let newObj = {name: currentNeo.name, id: currentNeo.neo_reference_id, time_from_now: timeFromNow, orbital_period: currentNeo.orbital_data.orbital_period, diameter: ((currentNeo.estimated_diameter.feet.estimated_diameter_min + currentNeo.estimated_diameter.feet.estimated_diameter_max)/2), inclination: currentNeo.orbital_data.inclination, eccentricity: currentNeo.orbital_data.eccentricity}
        return arr.push(newObj)
      }
    })
  })
}

async function getMinTime() {
  const fetching = await fetchURL()

  for (var j = 0; j < 3; j++) {
    res = Math.min.apply(Math, arr.map((o) => {
      console.log(o);
      console.log(o.timeFromNow);
      o.timeFromNow
    }))
    console.log(res);
    let littleNeo = arr.splice(arr.indexOf(res))
    top3.push(littleNeo)
  }
  console.log("got top 3");
}

async function display3closest() {
  const gettingMinTime = await getMinTime()
  console.log("displaying");

  let displayNeos = document.getElementById('neos')
  displayNeos.innerHTML = `<tr>
    <td>Name</td>
    <td>Orbital Period</td>
    <td>Avg. Diameter (in feet)</td>
    <td>Inclination</td>
    <td>Eccentricity</td>
  </tr>`
  top3.forEach(neo => {
    displayNeos.innerHTML += `<tr>
    <td>${neo.name}</td>
    <td>${neo.orbital_period}</td>
    <td>${neo.diameter}</td>
    <td>${neo.inclination}</td>
    <td>${neo.eccentricity}</td>
  </tr>`
  })
}

// function lowestOrbitalPeriod() {
//   let lowestOrb = Math.min.apply(Math, top3.map((o) => {
//     o.orbital_period
//   }))
// }
//
// function smallestDiameter() {
//   let smallestDiam = Math.min.apply(Math, top3.map((o) => {
//     o.diameter
//   }))
// }
//
// function highestInclination() {
//   let highestIncl = Math.max.apply(Math, top3.map((o) => {
//     o.inclination
//   }))
// }
//
// function lowestEccentricity() {
//   let lowestEccen = Math.min.apply(Math, top3.map((o) => {
//     o.eccentricity
//   }))
// }
