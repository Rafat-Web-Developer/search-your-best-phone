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

// display all phones section
const displayAllPhones = phones => {
    phones.forEach(phone => {
        console.log(phone);
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