let url
let neoInstanceDate
const neoInstancePlanet = 'Juptr'
let result = []
const today = new Date()
let dateArray = []
let nextDate
let objData
let arr = []
let afterdates
let closestNeo

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
      if ((obj.orbiting_body === neoInstancePlanet) && (neoInstanceDate - today > 0)) {
        let newObj = {...currentNeo, close_approach_data: obj}
        arr.push(newObj)
      }
    })
  })
  // closestApproachDate(arr)
}

// function closestApproachDate(arr) {
//   arr.filter(neo => {
//     let currentNeo = neo
//     afterdates = neo.close_approach_data.filter(obj => {
//       neoInstanceDate = new Date(obj.close_approach_date)
//       if neoInstanceDate - today > 0 {
//         let newObj = {...currentNeo, close_approach_data: obj}
//       }
//     })
//       dateArray = obj.sort(function(a,b) {
//         let dateA = new Date(a.close_approach_date)
//         return dateA - today
//       })
//       nextDate = Math.min.apply(Math, ;
//   })
// }
