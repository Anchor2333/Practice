/**
 *  Author: Anchor
 *  Date: 2023/07/10
 *  Fetch member api & filter 
 */

document.addEventListener('DOMContentLoaded', () => {
    let updateData;
    fetch('./public/data.json')
    .then(response => response.json())
    .then(data => {
        updateData = data;
        console.log(updateData);  
        updateDisplay();
    })
    .catch(error => console.error('Error', error))
    
    const genderSelect = document.getElementById('search-bar__gender-select')
    const locationSelect = document.getElementById('search-bar__location-select')
    const textSearch = document.getElementById('search-bar__search-text')
    const clearBtn = document.getElementById('search-bar__clear-btn')

    genderSelect.addEventListener('change', updateDisplay)
    locationSelect.addEventListener('change', updateDisplay)
    textSearch.addEventListener('input', updateDisplay)
    clearBtn.addEventListener('click', clearSearch)

    function clearSearch(e) {
        e.preventDefault();
        textSearch.value = '';
        genderSelect.value =  '未填';
        locationSelect.value = '未填';
        updateDisplay();
    }
    
    function updateDisplay() {
        const main = document.getElementById('main');
        main.innerHTML = '';
        
        const selectedGender = genderSelect.value
        const selectedLocation = locationSelect.value
        const searchedText = textSearch.value

        let selectedData = updateData;
    
        console.log(this);
        console.log(selectedGender);
        console.log(selectedLocation);
        console.log(searchedText);
    
        //邏輯判斷
        if(searchedText !== '') {
            selectedData = updateData.filter(user => user.Phone.includes(searchedText) || user.Name.includes(searchedText))
        }
        if(selectedGender !== '未填') {
            selectedData = updateData.filter(user => user.Gender === selectedGender && (user.Phone.includes(searchedText) || user.Name.includes(searchedText)))
        }
        if(selectedLocation !== '未填') {
            selectedData = updateData.filter(user => user.Location === selectedLocation && (user.Phone.includes(searchedText) || user.Name.includes(searchedText)))
        }
        if(selectedGender !== '未填' && selectedLocation !== '未填') {
            selectedData = updateData.filter(user => user.Gender === selectedGender && user.Location === selectedLocation  && (user.Phone.includes(searchedText) || user.Name.includes(searchedText)))   
        }
        
        selectedData.forEach(user => { 
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