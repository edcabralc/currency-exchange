const APIKey = "0b1c10a3ffbe3d78c6e29cd8";
const baseURL = "https://v6.exchangerate-api.com/v6/";
const defaultBaseCurrency = "USD";
const defaultTargetCurrency = "BRL";

const baseCurrency = document.querySelector('[data-js="currency-one"]');
const targetCurrency = document.querySelector('[data-js="currency-two"]');
const amountCurrency = document.querySelector('[data-js="currency-one-times"]');
const convertedValue = document.querySelector('[data-js="converted-value"]');
const conversionPrecision = document.querySelector(
    '[data-js="conversion-precision"]'
);

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

const getCurrenciesCodesURL = () => `${baseURL}${APIKey}/codes`;
const getExchangeCoversionURL = (base, target, amount) =>
    `${baseURL}${APIKey}/pair/${base}/${target}/${amount}`;

const getCurrenciesCodes = () => fetchData(getCurrenciesCodesURL());
const getExchangeCoversion = (base, target, amount) =>
    fetchData(getExchangeCoversionURL(base, target, amount));

const getSupportedCodes = async () => {
    const { supported_codes } = await getCurrenciesCodes();

    addDataIntoSelect(supported_codes, defaultBaseCurrency, baseCurrency);
    addDataIntoSelect(supported_codes, defaultTargetCurrency, targetCurrency);
};

const addDataIntoSelect = (currencyCodes, codeDefault, elementToInsert) => {
    currencyCodes.reduce((acc, code) => {
        acc =
            code[0] === `${codeDefault}`
                ? `<option value='${code[0]}' selected>${code[0]}</option>`
                : `<option value='${code[0]}'>${code[0]}</option>`;

        elementToInsert.insertAdjacentHTML("afterbegin", acc);

        return;
    }, "");
};

const convertCurrencie = async (base, target, amount) => {
    const { conversion_result } = await getExchangeCoversion(
        base,
        target,
        amount
    );

    convertedValue.textContent = conversion_result;
    conversionPrecision.textContent = conversion_result.toFixed(2);
};

getSupportedCodes();
convertCurrencie(defaultBaseCurrency, defaultTargetCurrency, (amount = 1));

baseCurrency.addEventListener("change", () => {
    const baseCodeValue = baseCurrency.value;
    const targeCodeValue = targetCurrency.value;
    const amount = amountCurrency.value;

    convertCurrencie(baseCodeValue, targeCodeValue, amount);
});

targetCurrency.addEventListener("change", () => {
    const baseCodeValue = baseCurrency.value;
    const targeCodeValue = targetCurrency.value;
    const amount = amountCurrency.value;

    convertCurrencie(baseCodeValue, targeCodeValue, amount);
});

amountCurrency.addEventListener("change", () => {
    const baseCodeValue = baseCurrency.value;
    const targeCodeValue = targetCurrency.value;
    const amount = amountCurrency.value;

    convertCurrencie(baseCodeValue, targeCodeValue, amount);
});
