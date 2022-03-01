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

// show phone details
const viewPhoneDetails = async (getSlug) => {
    const url = `https://openapi.programming-hero.com/api/phone/${getSlug}`;
    const res = await fetch(url);
    const data = await res.json();
    if(data.status === true){
        console.log(data);
    }else{
        console.log(data.status);
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