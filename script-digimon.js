const content = document.querySelector('#content')
let url = 'https://digimon-api.vercel.app/api/digimon'
let allDigimon = []

const hitAPI = async (url) => {
  const api = await fetch(url)
  const data = await api.json()
  console.log(data)
  return data
}

const renderDigimon = (digimonData) => {
  let dataHTML = "<ul>"
  digimonData.forEach(e => {
    dataHTML += `
      <li class="list-digimon">
        <img src="${e.img}" class="digimon-img">
        <p>Name : ${e.name}</p>
        <p>Level : ${e.level}</p>
      </li>
    `
  });
  dataHTML += "</ul>"
  content.innerHTML = dataHTML
}

const populateLevelFilter = (data) => {
  const levelFilter = document.getElementById('level-filter')
  
  const uniqueLevels = [...new Set(data.map(digimon => digimon.level))]
  
  uniqueLevels.sort()
  
  uniqueLevels.forEach(level => {
    const option = document.createElement('option')
    option.value = level
    option.textContent = level
    levelFilter.appendChild(option)
  })
}

const handleFilterChange = () => {
  const levelFilter = document.getElementById('level-filter')
  const selectedLevel = levelFilter.value
  
  if (selectedLevel === 'all') {
    renderDigimon(allDigimon)
  } else {
    const filteredDigimon = allDigimon.filter(digimon => digimon.level === selectedLevel)
    renderDigimon(filteredDigimon)
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  allDigimon = await hitAPI(url)
  
  renderDigimon(allDigimon)
  
  populateLevelFilter(allDigimon)
  
  const levelFilter = document.getElementById('level-filter')
  levelFilter.addEventListener('change', handleFilterChange)
})