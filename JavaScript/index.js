function handleSearchSubmit(event){
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector(".titleCity");
  cityElement.innerHTML = searchInput.value
}

let searchFormElement = document.querySelector(".searchForm");
//console.log(searchFormElement);
searchFormElement.addEventListener("submit", handleSearchSubmit)
