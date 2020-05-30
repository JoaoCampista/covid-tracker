//let allCountries = [];
//let contentJson = [];

let dateUpdated = 0;

window.addEventListener('load', () => {
  dateUpdated = document.getElementById('dateUpdated');

  const date = new Date(json.Countries[0].Date);
  const dateTimeFormat = new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const [
    { value: day },
    ,
    { value: month },
    ,
    { value: year },
  ] = dateTimeFormat.formatToParts(date);

  console.log(dateTimeFormat);

  dateUpdated.innerHTML = `${day}/${month}/${year}`;
  fetchUsers();
  render();
});

async function fetchUsers() {
  //const res = await fetch('https://api.covid19api.com/summary');
  //const json = await res.json();

  allCountries = json.Countries.map((CountryID) => {
    const {
      Country,
      Date,
      NewConfirmed,
      NewDeaths,
      NewRecovered,
      TotalConfirmed,
      TotalDeaths,
      TotalRecovered,
    } = CountryID; // destructuring

    return {
      country: Country,
      date: Date,
      newConfirmed: NewConfirmed,
      newDeaths: NewDeaths,
      newRecovered: NewRecovered,
      totalConfirmed: TotalConfirmed,
      totalDeaths: TotalDeaths,
      totalRecovered: TotalRecovered,
    };
  });
}

function render() {
  allCountries.sort(function (a, b) {
    return b.totalConfirmed - a.totalConfirmed;
  });

  top10Countries = allCountries.slice(0, 10);

  insertCountriesIntoPage(generateHTML(top10Countries));
}

const generateHTML = (countries) =>
  countries.reduce((accumulator, { country, totalConfirmed }) => {
    const maxWidthBar = allCountries[0].totalConfirmed;
    const widthBar = (totalConfirmed * 100) / maxWidthBar;

    // prettier-ignore
    accumulator += `

  <div class="d-flex flex-row align-items-center mb-3">

    <div class="d-flex flex-row text-light p-2 rounded-lg bg-success" style="width:${widthBar}%"}">
      <div class="country font-weight-bold">${country}</div>
      <div class="flex-grow-1" ></div>
    </div>
    
    <div class="font-weight-bold ml-3">${totalConfirmed}</div>

  </div>
  
  `
    return accumulator;
  }, '');

const insertCountriesIntoPage = (countries) => {
  const lista = document.getElementById('lista');
  lista.innerHTML = countries;
};

const fetch_retry = async (url, options, n) => {
  try {
    return await fetch(url, options);
  } catch (err) {
    if (n === 1) throw err;
    return await fetch_retry(url, options, n - 1);
  }
};

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

console.log(getRandomColor());
