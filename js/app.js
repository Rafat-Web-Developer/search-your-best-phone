
const showSection = getId => {
    const element = document.getElementById(getId);
    element.classList.remove('d-none');
};

const removeSection = getId => {
    const element = document.getElementById(getId);
    element.classList.add('d-none');
};

const displayAllPhones = phones => {
    console.log(phones);
}

// call api for search all phones
const loadPhones = async (getSearchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${getSearchText}`;
    const response = await fetch(url);
    const data = await response.json();
    if(data.status == true){
        removeSection('notFound');
        displayAllPhones(data);
    }else{
        removeSection('showPhoneDetails');
        removeSection('showAllPhones');
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