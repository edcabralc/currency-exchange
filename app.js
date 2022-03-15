const APIKey = "0b1c10a3ffbe3d78c6e29cd8";
const baseURL = "https://v6.exchangerate-api.com/v6/";
const defaultBaseCurrency = "USD";
const defaultTargetCurrency = "BRL";

const baseCurrency = document.querySelector('[data-js="currency-one"]');

const targetCurrency = document.querySelector('[data-js="currency-two"]');
const amountCurrency = document.querySelector('[data-js="currency-one-times"]');

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

const getEndpointURL = () => `${baseURL}${APIKey}/latest/BRL`;

const getExchangeData = () => fetchData(getEndpointURL());

const exchangeConversionData = async () => {
    const { conversion_rates } = await getExchangeData();
    const converted = Object.entries(conversion_rates);
    addDataIntoSelect(converted, defaultBaseCurrency, baseCurrency);
    addDataIntoSelect(converted, defaultTargetCurrency, targetCurrency);
};

const addDataIntoSelect = (codes, codeDefault, element) => {
    codes.reduce((acc, code) => {
        acc =
            code[0] === `${codeDefault}`
                ? `<option selected value='${code[0]}'>${code[0]}</option>`
                : `<option value='${code[0]}'>${code[0]}</option>`;
        // console.log(acc);
        element.insertAdjacentHTML("afterbegin", acc);

        return;
    }, "");
};

exchangeConversionData();

const getExchangeDataTeste = (base, target, amount) =>
    `${baseURL}${APIKey}/pair/${base}/${target}/${amount}`;

const getExchangePair = (base, target, amount) =>
    fetchData(getExchangeDataTeste(base, target, amount));

baseCurrency.addEventListener("change", () => {
    const baseCodeValue = baseCurrency.value;
    console.log(baseCodeValue);
    // const targeCodeValue = targetCurrency.value;
    const targeCodeValue = "BRL";
    const amount = amountCurrency.value;
    console.log(amount);
    getExchangePair(baseCodeValue, targeCodeValue, amount);
    // const teste = getExchangePair(baseCodeValue, targeCodeValue, amount);
    // console.log(teste);
});

targetCurrency.addEventListener("change", () => {
    console.log(baseCurrency.value);
});
