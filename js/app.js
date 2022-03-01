
// call api for search all phones
const loadPhones = async (getSearchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${getSearchText}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
};

// onclick function for search btn
const searchPhone = () => {
    const searchPhoneTextField = document.getElementById('searchPhoneText');
    const searchText = searchPhoneTextField.value;
    searchPhoneTextField.value = '';
    loadPhones(searchText);
}