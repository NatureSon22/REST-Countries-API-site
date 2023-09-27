import { cardData } from "./result";

export const inputField = document.querySelector('#input');
export const pageResult = document.querySelector('.page-result');
const filterButton = document.querySelector('.fa-angle-up');
const pageFilter = document.querySelector('.page-filter');
const optionContainer = document.querySelector('.page-filter__options');
const optionFilter = document.querySelectorAll('.page-filter__options li');
const optionText = document.querySelector('.country');
const iconArrow = document.querySelector('.page-filter__box i');
const toggleTheme = document.querySelector('#toggle-theme')

let chosenFilter = '';


const toggleElement = (element) => {
    element.classList.toggle('toggle');
}

const alignment = () => {
    if (window.innerWidth >= 1300 && pageResult.children.length <= 3) {
        pageResult.classList.add('toggle');
    } else {
        pageResult.classList.remove('toggle');
    }
}

const createCard = (transformedData) => {
    pageResult.innerHTML = '';
    pageResult.classList.remove('result');
    pageFilter.classList.remove('result');

    transformedData.forEach(data => {
        const { flags: { svg }, name: { common, nativeName }, population, region, capital } = data;
        const div = document.createElement('div');
        div.innerHTML = `
        <section class="page-card">
            <div>
                <img src=${svg} alt="" data-img>
            </div>

            <div class="page-card__info">
                <h3 data-name>${common}</h3>
                <p>Population: <span>${population.toLocaleString()}</span></p>
                <p>Region: <span>${region}</span></p>
                <p>Capital: <span>${capital}</span></p>
            </div>
        </section>
        `
        div.onclick = () => { 
            pageResult.classList.add('result');
            pageFilter.classList.add('result');
            pageResult.innerHTML = '';
            cardData(data);
            window.scrollTo({ top: 0, left: 0,});
        };
        pageResult.append(div);
    })
    alignment();
}


export const fetchData = async(input) => {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/all`);
        
        if(!response.ok) {
            throw new Error('No data matches the input');
        }

        const data = await response.json();
        const countryData = {...data};


        let transformedData = Object.values(countryData).map(data => ({
            flags: { svg: data.flags.svg },
            name: {
              common: data.name.common,
              nativeName: data.name.nativeName 
            },
            population: data.population,
            region: data.region,
            subregion: data.subregion,
            capital: data.capital,
            tld: data.tld,
            currencies: data.currencies,
            languages: data.languages,
            borders: data.borders
          }));
          

        if(input) {
            transformedData = transformedData.filter(data =>
                data.name.common.substring(0, input.length).toLowerCase() === input
            );
        }

        if(chosenFilter) {
            transformedData = transformedData.filter(data => data.region === chosenFilter);
        }

        if(transformedData.length === 0) {
            throw new Error();
        }

        
        createCard(transformedData);
    }catch(err) {
        pageResult.innerHTML = ''
        const error = document.createElement('div');
        error.innerHTML = `<p class="error">No results found...</p>`;
        pageResult.append(error);
    }
}


inputField.addEventListener('input', (e) => {
    fetchData(inputField.value.toLowerCase());  
})

filterButton.addEventListener('click', (e) => {
    e.stopImmediatePropagation();

    toggleElement(optionContainer);
    toggleElement(iconArrow);
})

optionFilter.forEach(filter => {
    filter.addEventListener('click', () => {
        chosenFilter = filter.innerText;
        optionText.innerText = chosenFilter;
        chosenFilter = filter.innerText === 'America' ? 'Americas' : filter.innerText;
        fetchData(inputField.value)
        toggleElement(optionContainer);
        toggleElement(iconArrow);
    });
})

toggleTheme.addEventListener('click', (e) => {
    e.stopImmediatePropagation();
    document.documentElement.classList.toggle('light-mode');
})

window.addEventListener('resize', () => {
    alignment();
});

fetchData();