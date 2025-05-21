const content = document.querySelector('#content');
const url = 'https://digimon-api.vercel.app/api/digimon';
let allDigimon = [];

const fetchDigimon = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Digimon data:', error);
    content.innerHTML = '<p class="error">Failed to load Digimon data. Please try again later.</p>';
    return [];
  }
};

const renderDigimon = (digimonData) => {
  if (digimonData.length === 0) {
    content.innerHTML = '<p>No Digimon found.</p>';
    return;
  }

  let dataHTML = "<ul>";
  digimonData.forEach(digimon => {
    dataHTML += `
      <li class="list-digimon">
        <img src="${digimon.img}" class="digimon-img" alt="${digimon.name}">
        <p>${digimon.name}</p>
        <p>Level: ${digimon.level}</p>
      </li>
    `;
  });
  dataHTML += "</ul>";
  content.innerHTML = dataHTML;
};

const populateLevelFilter = (data) => {
  const levelFilter = document.getElementById('level-filter');

  const uniqueLevels = [...new Set(data.map(digimon => digimon.level))].sort();

  uniqueLevels.forEach(level => {
    const option = document.createElement('option');
    option.value = level;
    option.textContent = level;
    levelFilter.appendChild(option);
  });
};

const handleFilterChange = () => {
  const levelFilter = document.getElementById('level-filter');
  const selectedLevel = levelFilter.value;
  
  if (selectedLevel === 'all') {
    renderDigimon(allDigimon);
  } else {
    const filteredDigimon = allDigimon.filter(digimon => digimon.level === selectedLevel);
    renderDigimon(filteredDigimon);
  }
};

document.addEventListener('DOMContentLoaded', async () => {

  content.innerHTML = '<p>Loading Digimon data...</p>';

  allDigimon = await fetchDigimon(url);
  
  if (allDigimon.length > 0) {

    renderDigimon(allDigimon);
    

    populateLevelFilter(allDigimon);
    
    const levelFilter = document.getElementById('level-filter');
    levelFilter.addEventListener('change', handleFilterChange);
  }
});