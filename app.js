const APIKey = "0b1c10a3ffbe3d78c6e29cd8";
const baseURL = "https://v6.exchangerate-api.com/v6/";
const defaultBaseCurrency = "USD";
const defaultTargetCurrency = "BRL";

const baseCurrency = document.querySelector('[data-js="currency-one"]');
const targetCurrency = document.querySelector('[data-js="currency-two"]');

const getEndpointURL = () => `${baseURL}${APIKey}/latest/BRL`;

const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Não foi possível obter os dados");
        }
        return response.json();
    } catch ({ name, message }) {
        console.log(`${name}: ${message}`);
    }
};

const getExchangeData = () => fetchData(getEndpointURL());

const exchangeConversionData = async () => {
    const { conversion_rates } = await getExchangeData();
    console.log(conversion_rates);
};

exchangeConversionData();
