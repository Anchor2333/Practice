/**
 *  Author: Anchor
 *  Date: 2023/07/07
 *  Fetch member api & filter 
 */

document.addEventListener('DOMContentLoaded', () => {
    let userData;
// fetch member data
fetch('./public/data.json')
.then(response => response.json())
.then(data => { 
        console.log(data)
        userData = data;
        updateDisplay();
})
.catch(error => console.error('Error', error))

const locationSelect = document.getElementById('search-bar__location-select')
const genderSelect = document.getElementById('search-bar__gender-select')
locationSelect.addEventListener('change', updateDisplay)
genderSelect.addEventListener('change', updateDisplay)

function updateDisplay() {
    const main = document.getElementById('main');
    main.innerHTML = '';
    const selectedLocation = locationSelect.value;
    const selectedGender = genderSelect.value;
    
    let filteredData = userData;

    if (selectedLocation !== '未填') {
        filteredData = filteredData.filter(user => user.Location === selectedLocation)
    }
    if (selectedGender !== '未填') {
        filteredData = filteredData.filter(user => user.Gender === selectedGender)
    }

    filteredData.map(user => {
            main.innerHTML += `
            <div class="main-member">    
            <p class="main-member__name">${user.Name}</p>
            <div class="main-member__data">
            <p class="main-member__phone">${user.Phone}</p>
            <p class="main-member__gender">${user.Gender}</p>
            <p class="main-member__location">${user.Location}</p>
            </div>
            </div>
            `
    })
}
})
