import { inputField, fetchData, pageResult } from "./script";

const buttonClick = () => {
    fetchData(inputField.value.toLowerCase());
}

const createBorders = (dataBorders) => {
    if(!dataBorders) {
        return `<p>NAN</p>`
    }

    const borderElements = dataBorders.map(borderName => {
        const border = document.createElement("p");
        border.classList.add('country');
        border.innerText = borderName;
        return border.outerHTML; 
    });

    return borderElements.join(''); 
}

export const cardData = (countryData) => {
    const data = countryData;
    const body = document.createElement('div');

    body.innerHTML = `
    <div class="container">
        <main class="page-main">
            <section class="page-box">
                <button id="back-button">
                    <i class="fa-solid fa-arrow-left"></i>
                    Back
                </button>
    
                <section class="page-info page-flex">
                    <div class="page-img">
                        <img src="${data.flags.svg}" alt="" class="data-img">
                    </div>
        
                    <section class="page-info__country">
                        <h2>${data.name.common}</h2>
                        
                        <div class="page-info__main page-flex">
                            <div>
                                <p>Native name: <span>${Object.values(data.name.nativeName)[0].common}</span></p>
                                <p>Population: <span>${data.population.toLocaleString()}</span></p>
                                <p>Region: <span>${data.region}</span></p>
                                <p>Sub Region: <span>${data.subregion}</span></p>
                                <p>Capital: <span>${data.capital || 'NAN'}</span></p>
                            </div>
    
                            <div>
                                <p>Top Level Domain: <span>${data.tld}</span></p>
                                <p>Currencies: <span>${[Object.keys(data.currencies)].join(', ') || 'NAN'}</span></p>
                                <p>Languages: <span>${[Object.values(data.languages)].join(', ')}</span></p>
                            </div>
                        </div>
    
                        <div class="page-card__border page-flex">
                            <p>Border Countries: </p>
                            <div class="page-flex">
                                ${createBorders(data.borders)}
                            </div>
                        </div>
                    </section>
                </section>
            </section>
        </main>
    </div>
    `;

    const button = body.querySelector('#back-button');
    button.addEventListener('click', buttonClick);

    pageResult.append(body);
}