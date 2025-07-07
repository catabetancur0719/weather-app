function handleSearch(event) {
  event.preventDefault(); //avoid to reload the page

  const searchInputElement = document.querySelector(".searchInput");
  const cityElement = document.querySelector(".titleCity");
  cityElement.innerHTML = searchInputElement.value;

}

function formatDate(date){

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let day = date.getDay();
  //console.log(minutes)

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }


  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const formatDay = weekDays[day];
  return `${formatDay} ${hours}:${minutes}`;
}


const searchBar = document.querySelector(".searchForm");
searchBar.addEventListener("submit", handleSearch);

const currentDateElement = document.querySelector(".dayInformation");
const currentDate = new Date()
console.log(currentDateElement);
currentDateElement.innerHTML = formatDate(currentDate);




