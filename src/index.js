let url

document.addEventListener('DOMContentLoaded', function() {
  url = `http://www.neowsapp.com/rest/v1/neo/browse`
  getData()
})

function getData() {
  fetch(url)
  .then(res => res.json())
  .then(json => displayInfo(json))
}

function displayInfo(json) {
  let displayNeos = document.getElementById('neos')

  json.near_earth_objects.forEach(neo => {
    displayNeos.innerHTML += `<li>${neo.name}</li>`
  })
}
