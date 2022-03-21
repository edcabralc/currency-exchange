const defaultBaseCurrency = "USD";
const defaultTargetCurrency = "BRL";

const baseCurrency = document.querySelector('[data-js="currency-one"]');
const targetCurrency = document.querySelector('[data-js="currency-two"]');
const amountCurrency = document.querySelector('[data-js="currency-one-times"]');
const convertedValue = document.querySelector('[data-js="converted-value"]');
const conversionPrecision = document.querySelector(
    '[data-js="conversion-precision"]'
);

const getSupportedCodes = async () => {
    const { supported_codes } = await getCurrenciesCodes();

    createOptionValues(supported_codes, defaultBaseCurrency, baseCurrency);
    createOptionValues(supported_codes, defaultTargetCurrency, targetCurrency);
};

const createOptionValues = (currencyCodes, codeDefault, elementToInsert) => {
    currencyCodes.reverse().reduce((acc, code) => {
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

    conversionPrecision.textContent = conversion_result;
    convertedValue.textContent = conversion_result.toFixed(2);
};

const changeValueCurrencies = () => {
    const baseCodeValue = baseCurrency.value;
    const targeCodeValue = targetCurrency.value;
    const amount = amountCurrency.value;

    convertCurrencie(baseCodeValue, targeCodeValue, amount);
};

getSupportedCodes();
convertCurrencie(defaultBaseCurrency, defaultTargetCurrency, (amount = 1));

baseCurrency.addEventListener("change", changeValueCurrencies);
targetCurrency.addEventListener("change", changeValueCurrencies);
amountCurrency.addEventListener("change", changeValueCurrencies);
