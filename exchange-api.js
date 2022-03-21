const APIKey = "0b1c10a3ffbe3d78c6e29cd8";
const baseURL = "https://v6.exchangerate-api.com/v6/";

const getCurrenciesCodesURL = () => `${baseURL}${APIKey}/codes`;
const getExchangeCoversionURL = (base, target, amount) =>
    `${baseURL}${APIKey}/pair/${base}/${target}/${amount}`;

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

const getCurrenciesCodes = () => fetchData(getCurrenciesCodesURL());
const getExchangeCoversion = (base, target, amount) =>
    fetchData(getExchangeCoversionURL(base, target, amount));
