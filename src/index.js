let url
let neoInstanceDateArr
let neoInstanceYear
let neoInstanceMonth
let neoInstanceDay
let cachedInfo = []
const today = new Date()
const yyyy = today.getFullYear()
const mm = today.getMonth()+1
const dd = today.getDate()
let closest3 = []

document.addEventListener('DOMContentLoaded', function() {

  for (var i = 0; i < 921; i++) {
    url = `https://www.neowsapp.com/rest/v1/neo/browse?page=${i}&size=20`
    getData()
    aggregateInfo()
  }
  closestApproachDate()
})

function getData() {
  fetch(url)
  .then(res => res.json())
  .then(json => aggregateInfo(json))
}

function aggregateInfo(json) {
  json.near_earth_objects.forEach(neo => {
    neo.close_approach_data.forEach(obj => {
      neoInstanceDateArr = obj.close_approach_date.split("-")
      neoInstanceYear = Number(neoInstanceDateArr[0])
      neoInstanceMonth = Number(neoInstanceDateArr[1])
      neoInstanceDay = Number(neoInstanceDateArr[2])
      if (obj.orbiting_body === "Jupiter") {
        if (neoInstanceYear > yyyy) {
          obj.futureObject = true
          cachedInfo.push(neo)
        } else if (neoInstanceYear === yyyy) {
          if (neoInstanceMonth > mm) {
            obj.futureObject = true
            cachedInfo.push(neo)
          } else if (neoInstanceMonth === mm) {
            if (neoInstanceDay >= dd) {
              obj.futureObject = true
              cachedInfo.push(neo)
            }
          }
        }
      }
    })
  })
}

function closestApproachDate() {
  cachedInfo.forEach(neo => {
    neo.close_approach_data.forEach(obj =>)
  })
}
//
// function displayInfo(json) {
//   let displayNeos = document.getElementById('neos')
//
//   let jupiterNeos = json.near_earth_objects.forEach(neo => {
//     function (i,n){
//         return neo.close_approach_data.forEach(approach => {
//           function (ind,nun){
//             return approach.orbiting_body==="jupiter";
//           }
//         })
//     });
//
//   json.near_earth_objects.forEach(neo => {
//     displayNeos.innerHTML += `<li>${neo.name}</li>`
//   })
// }
