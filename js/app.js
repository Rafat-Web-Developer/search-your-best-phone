// display section
const showSection = getId => {
    const element = document.getElementById(getId);
    element.classList.remove('d-none');
};

// display none section
const removeSection = getId => {
    const element = document.getElementById(getId);
    element.classList.add('d-none');
};

const displayPhoneDetails = details => {
    console.log(details);
    const showPhoneDetails = document.getElementById('showPhoneDetails');
    showPhoneDetails.textContent = '';
    showPhoneDetails.innerHTML = `
        <div class="card mb-3 w-75 mx-auto border-3 border-success">
            <div class="row g-0">
                <div class="col-md-4 text-center p-2">
                    <img src="${details.image}" class="img-fluid rounded-start" alt="${details.name}_img">
                </div>
                <div class="col-md-8 bg-success">
                    <div class="card-body text-white">
                        <h5 class="card-title">${details.name}</h5>
                        <p class="card-text">Brand Name : ${details.brand}</p>
                        <p class="card-text">Release Date : ${details.releaseDate ? details.releaseDate : 'No release date.'}</p>
                        <div class="w-100 p-2 bg-warning rounded">
                            <h5 class="text-success">Main Features</h5>
                            <span class="m-1 badge bg-success w-100 text-start text-wrap">Chip Set : ${details.mainFeatures.chipSet}</span>
                            <span class="m-1 badge bg-success w-100 text-start text-wrap">Display Size : ${details.mainFeatures.displaySize}</span>
                            <span class="m-1 badge bg-success w-100 text-start text-wrap">Memory : ${details.mainFeatures.memory}</span>
                            <span class="m-1 badge bg-success w-100 text-start text-wrap">Storage : ${details.mainFeatures.storage}</span>
                            <div class="m-1 badge bg-success w-100 text-start text-wrap">
                                <h6>Sensors : </h6>
                                <p id="sensor" class="text-warning"></p>
                            </div>
                            <div class="m-1 badge bg-success w-100 text-start text-wrap">
                                <h6>Others : </h6>
                                ${details.others ? `<p class="text-warning">
                                    <span class="m-1 badge bg-warning text-success text-wrap">${'Bluetooth : ' + details.others.Bluetooth}</span>
                                    <span class="m-1 badge bg-warning text-success text-wrap">${'GPS : ' + details.others.GPS}</span>
                                    <span class="m-1 badge bg-warning text-success text-wrap">${'NFC : ' + details.others.NFC}</span>
                                    <span class="m-1 badge bg-warning text-success text-wrap">${'Radio : ' + details.others.Radio}</span>
                                    <span class="m-1 badge bg-warning text-success text-wrap">${'USB : ' + details.others.USB}</span>
                                    <span class="m-1 badge bg-warning text-success text-wrap">${'WLAN : ' + details.others.WLAN}</span>
                                </p>` : '<p class="text-warning text-wrap">This phone has no other information<p>'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    const sensorElement = document.getElementById('sensor');
    details.mainFeatures.sensors.forEach(sensor => {
        const span = document.createElement('span');
        span.innerText = sensor+', ';
        sensorElement.appendChild(span);
    })
}

// show phone details
const viewPhoneDetails = async (getSlug) => {
    showSection('loading');
    const url = `https://openapi.programming-hero.com/api/phone/${getSlug}`;
    const res = await fetch(url);
    const data = await res.json();
    if(data.status === true){
        removeSection('loading');
        showSection('showPhoneDetails');
        displayPhoneDetails(data.data);
    }else{
        removeSection('showPhoneDetails');
        removeSection('showAllPhones');
        removeSection('loading');
        showSection('notFound');
    }
}

// display all phones section
const displayAllPhones = phones => {
    const showPhonesDiv = document.getElementById('showPhonesDiv');
    showPhonesDiv.textContent = '';
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card border-success border-3 h-100">
                <img src="${phone.image}" class="card-img-top p-4" alt="${phone.phone_name}_img">
                <div class="card-body bg-success text-white">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.brand}</p>
                </div>
                <div class="card-footer">
                    <div class="d-grid">
                        <button class="btn btn-success" type="button" onclick="viewPhoneDetails('${phone.slug}')">View Phone Details</button>
                    </div>
                </div>
            </div>
        `;
        showPhonesDiv.appendChild(div);
    });
}

// call api for search all phones
const loadPhones = async (getSearchText) => {
    removeSection('notFound');
    removeSection('showPhoneDetails');
    removeSection('showAllPhones');
    showSection('loading');
    const url = `https://openapi.programming-hero.com/api/phones?search=${getSearchText}`;
    const response = await fetch(url);
    const data = await response.json();
    if(data.status === true){
        removeSection('notFound');
        removeSection('showPhoneDetails');
        removeSection('loading');
        showSection('showAllPhones');
        displayAllPhones(data.data);
    }else{
        removeSection('showPhoneDetails');
        removeSection('showAllPhones');
        removeSection('loading');
        showSection('notFound');
    }
};

// onclick function for search btn
const searchPhone = () => {
    const searchPhoneTextField = document.getElementById('searchPhoneText');
    const searchText = searchPhoneTextField.value;
    searchPhoneTextField.value = '';
    loadPhones(searchText);
}