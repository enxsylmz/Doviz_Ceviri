import React, { useState } from 'react';
import './App.css';


const Country_List = {
  TRY: "TR",
  USD: "US",
  EUR: "DE",
  AED: "AE",
  AFN: "AF",
  XCD: "AG",
  ALL: "AL",
  AMD: "AM",
  ANG: "AN",
  AOA: "AO",
  AQD: "AQ",
  ARS: "AR",
  AUD: "AU",
  AZN: "AZ",
  BAM: "BA",
  BBD: "BB",
  BDT: "BD",
  XOF: "BE",
  BGN: "BG",
  BHD: "BH",
  BIF: "BI",
  BMD: "BM",
  BND: "BN",
  BOB: "BO",
  BRL: "BR",
  BSD: "BS",
  NOK: "BV",
  BWP: "BW",
  BYR: "BY",
  BZD: "BZ",
  CAD: "CA",
  CDF: "CD",
  XAF: "CF",
  CHF: "CH",
  CLP: "CL",
  CNY: "CN",
  COP: "CO",
  CRC: "CR",
  CUP: "CU",
  CVE: "CV",
  CYP: "CY",
  CZK: "CZ",
  DJF: "DJ",
  DKK: "DK",
  DOP: "DO",
  DZD: "DZ",
  ECS: "EC",
  EEK: "EE",
  EGP: "EG",
  ETB: "ET",
  FJD: "FJ",
  FKP: "FK",
  GBP: "GB",
  GEL: "GE",
  GGP: "GG",
  GHS: "GH",
  GIP: "GI",
  GMD: "GM",
  GNF: "GN",
  GTQ: "GT",
  GYD: "GY",
  HKD: "HK",
  HNL: "HN",
  HRK: "HR",
  HTG: "HT",
  HUF: "HU",
  IDR: "ID",
  ILS: "IL",
  INR: "IN",
  IQD: "IQ",
  IRR: "IR",
  ISK: "IS",
  JMD: "JM",
  JOD: "JO",
  JPY: "JP",
  KES: "KE",
  KGS: "KG",
  KHR: "KH",
  KMF: "KM",
  KPW: "KP",
  KRW: "KR",
  KWD: "KW",
  KYD: "KY",
  KZT: "KZ",
  LAK: "LA",
  LBP: "LB",
  LKR: "LK",
  LRD: "LR",
  LSL: "LS",
  LTL: "LT",
  LVL: "LV",
  LYD: "LY",
  MAD: "MA",
  MDL: "MD",
  MGA: "MG",
  MKD: "MK",
  MMK: "MM",
  MNT: "MN",
  MOP: "MO",
  MRO: "MR",
  MTL: "MT",
  MUR: "MU",
  MVR: "MV",
  MWK: "MW",
  MXN: "MX",
  MYR: "MY",
  MZN: "MZ",
  NAD: "NA",
  XPF: "NC",
  NGN: "NG",
  NIO: "NI",
  NPR: "NP",
  NZD: "NZ",
  OMR: "OM",
  PAB: "PA",
  PEN: "PE",
  PGK: "PG",
  PHP: "PH",
  PKR: "PK",
  PLN: "PL",
  PYG: "PY",
  QAR: "QA",
  RON: "RO",
  RSD: "RS",
  RUB: "RU",
  RWF: "RW",
  SAR: "SA",
  SBD: "SB",
  SCR: "SC",
  SDG: "SD",
  SEK: "SE",
  SGD: "SG",
  SKK: "SK",
  SLL: "SL",
  SOS: "SO",
  SRD: "SR",
  STD: "ST",
  SVC: "SV",
  SYP: "SY",
  SZL: "SZ",
  THB: "TH",
  TJS: "TJ",
  TMT: "TM",
  TND: "TN",
  TOP: "TO",
  TTD: "TT",
  TWD: "TW",
  TZS: "TZ",
  UAH: "UA",
  UGX: "UG",
  UYU: "UY",
  UZS: "UZ",
  VEF: "VE",
  VND: "VN",
  VUV: "VU",
  YER: "YE",
  ZAR: "ZA",
  ZMK: "ZM",
  ZWD: "ZW"
};

const App = () => {
    const [fromCurrency, setFromCurrency] = useState('TRY');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [amount, setAmount] = useState(0);
    const [exchangeRate, setExchangeRate] = useState(null);
    const [error, setError] = useState('');


    const [fromFlag, setFromFlag] = useState(`https://flagcdn.com/48x36/${Country_List[fromCurrency].toLowerCase()}.png`);
    const [toFlag, setToFlag] = useState(`https://flagcdn.com/48x36/${Country_List[toCurrency].toLowerCase()}.png`);

    const getExchangeRateFromAPI = async () => {
        setError('');
        try {
            const response = await fetch(`https://v6.exchangerate-api.com/v6/6866710f5db5f9dadae90f67/latest/${fromCurrency}`);
            const data = await response.json();
            const rate = data.conversion_rates[toCurrency];
            setExchangeRate(rate);
        } catch (err) {
            setError('Birşeyler yanlış gitti :(..');
        }
    };

   
    const handleConversion = () => {
        if (exchangeRate) {
            const convertedAmount = (amount * exchangeRate).toFixed(2);
            return `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        }
        return 'Döviz kuru hesaplanıyor...';
    };

   
    const handleFromCurrencyChange = (e) => {
        setFromCurrency(e.target.value);
        setFromFlag(`https://flagcdn.com/48x36/${Country_List[e.target.value].toLowerCase()}.png`);
    };

    const handleToCurrencyChange = (e) => {
        setToCurrency(e.target.value);
        setToFlag(`https://flagcdn.com/48x36/${Country_List[e.target.value].toLowerCase()}.png`);
    };

   
    const handleReverseCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
        setFromFlag(`https://flagcdn.com/48x36/${Country_List[toCurrency].toLowerCase()}.png`);
        setToFlag(`https://flagcdn.com/48x36/${Country_List[fromCurrency].toLowerCase()}.png`);
    };

    return (
        <div className="container">
            <h2>Döviz Çevirici</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="convert-box">
                    {/* From Currency */}
                    <div className="from">
                        <p>Hangi birimi?</p>
                        <div className="select-input">
                            <select value={fromCurrency} onChange={handleFromCurrencyChange}>
                                {Object.keys(Country_List).map((curCode) => (
                                    <option key={curCode} value={curCode}>
                                        {curCode}
                                    </option>
                                ))}
                            </select>
                            <img src={fromFlag} alt={`${fromCurrency} flag`} />
                        </div>
                    </div>

                    {/* Amount */}
                    <div>
                        <p>Miktar</p>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>

                    {/* To Currency */}
                    <div className="to">
                        <p>Hangi Birime?</p>
                        <div className="select-input">
                            <select value={toCurrency} onChange={handleToCurrencyChange}>
                                {Object.keys(Country_List).map((curCode) => (
                                    <option key={curCode} value={curCode}>
                                        {curCode}
                                    </option>
                                ))}
                            </select>
                            <img src={toFlag} alt={`${toCurrency} flag`} />
                        </div>
                    </div>
                </div>

                {/* Result */}
                <div className="result">
                    {error ? error : handleConversion()}
                </div>

                {/* Reverse Button */}
                <div className="reverse" onClick={handleReverseCurrencies}>
                 <p>&#8645;</p>
                </div>

                {/* Get Exchange Button */}
                <button type="button" onClick={getExchangeRateFromAPI}>
                    <p>Dönüştür &#8635;</p>
                </button>
            </form>
        </div>
    );
};

export default App;
