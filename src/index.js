let url
let neoInstanceDate
let timeFromNow
const neoInstancePlanet = 'Juptr'
const today = new Date()
let arr = []
let top3 = []
let res
let littleNeo

document.addEventListener('DOMContentLoaded', function() {
  lowestEccentricity()
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
    res = Math.min.apply(null, arr.map(neo => Math.min(neo.time_from_now)))
    console.log(res);
    littleNeo = arr.splice(arr.findIndex(neo => neo.time_from_now == res))
    console.log(littleNeo[0]);
    top3.push(littleNeo[0])
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

async function lowestOrbitalPeriod() {
  await display3closest()
  let lowestOrbVal = Math.min.apply(Math, top3.map(neo => neo.orbital_period))
  let lowestOrb = top3.find(neo => neo.orbital_period == lowestOrbVal)
  document.getElementById("neo_card").getElementsByTagName("h4")[0].innerHTML += `Name: ${lowestOrb.name} ID: ${lowestOrb.id}`
}

async function smallestDiameter() {
  await lowestOrbitalPeriod()
  let smallestDiamVal = Math.min.apply(null, top3.map(neo => neo.diameter))
  let smallestDiam = top3.find(neo => neo.diameter == smallestDiamVal)
  document.getElementById("neo_card").getElementsByTagName("h4")[1].innerHTML += `Name: ${smallestDiam.name} ID: ${smallestDiam.id}`
}

async function highestInclination() {
  await smallestDiameter()
  let highestInclVal = Math.max.apply(Math, top3.map(neo => neo.inclination))
  let highestIncl = top3.find(neo => neo.inclination == highestInclVal)
  document.getElementById("neo_card").getElementsByTagName("h4")[2].innerHTML += `Name: ${highestIncl.name} ID: ${highestIncl.id}`
}

async function lowestEccentricity() {
  await highestInclination()
  let lowestEccenVal = Math.min.apply(Math, top3.map(neo => neo.eccentricity))
  let lowestEccen = top3.find(neo => neo.eccentricity == lowestEccenVal)
  document.getElementById("neo_card").getElementsByTagName("h4")[3].innerHTML += `Name: ${lowestEccen.name} ID: ${lowestEccen.id}`
}
