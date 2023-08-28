const loadPhone = async (searchText,isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones,isShowAll)
}
const  displayPhones = (phones,isShowAll) =>{
// console.log(phones)
    const phoneContainer = document.getElementById('phone-container')
    // clear Phone container cards before adding new cards
    phoneContainer.textContent = '';
    // display show all button  if there are more than  12 phone
    const showAllContainer = document.getElementById('show -all-container')
    if(phones.length > 12 && !isShowAll){
showAllContainer.classList.remove('hidden')
    }
    else{
      showAllContainer.classList.add('hidden');
 
    }
    console.log('is show all', isShowAll);
    // display only first 12 phones if not show all phones
    if(!isShowAll){
      phones = phones.slice(0,12);
    }
    phones.forEach(phone => {
        console.log(phone)
        // 2 creat a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 bg-gray-100 shadow-xl`;
        //3 set innerHtml
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title"> ${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick="handleShowDetails('${phone.slug}')" class="btn mt-4 btn-primary">Show Details</button>
          </div>
        </div>`;
        // seep 4 appendChield 
        phoneContainer.appendChild(phoneCard)
    });
    toggleLoadingSpinner(false);
}
// 
const handleShowDetails = async (id) =>{
  console.log('click show details',id);
  // lode single phone data 
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/ ${id}`);
  const data = await res.json();
  console.log(data)
}
// handle search button 
const hendleSearch = (isShowAll) =>{
  toggleLoadingSpinner(true);
    // console.log('search-hendle')
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);

    loadPhone(searchText,isShowAll)

}
// const handleSearch2 = () =>{
//   toggleLoadingSpinner(true);
//   const searchField = document.getElementById('search-field2');
//   const searchText = searchField.value;
//   loadPhone(searchText);

// }
const  toggleLoadingSpinner = (isLoading) =>{
  const loadingSpinner = document.getElementById('lodding-spinner');
  if(isLoading){
    loadingSpinner.classList.remove('hidden')
  }
  else{
    loadingSpinner.classList.add('hidden')
  }
 
}
const handleShowAll = () =>{
  hendleSearch(true);
}

// loadPhone()  