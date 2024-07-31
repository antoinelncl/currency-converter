import React, { ChangeEvent, useEffect, useState } from "react";
import { Dropdown, SelectedOption } from "./CurrencyDropdown";
import axios from "axios";
import { currencyApiUrl } from "../constants/currency";

export const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<string>("");
  const [from, setFrom] = useState<string>("EUR");
  const [to, setTo] = useState<string>("USD")
  const [result, setResult] = useState<string>("")
  const [conversionRate, setConversionRate] = useState<number>()

  const convert = async (from: string, to: string, amount: number) => {
    if (amount === 0 || isNaN(amount) || amount < 0) {
      setResult("");
      setConversionRate(undefined);
      return;
    }

    const response = await axios.get(`${currencyApiUrl}/currency/convert/${from}/${to}`);

    const rate = response.data["conversionRate"]
    const convertionResult = amount * response.data["conversionRate"]

    setConversionRate(rate.toFixed(2));
    setResult(String(convertionResult.toFixed(2)))
  };

  const handleAmount = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    
    if (value === "") {
      setAmount("");
      setConversionRate(undefined);
    } else {
      setAmount(value);
    }
  }

  const handleFrom = (selectedOption: SelectedOption) => {
    if(!selectedOption) return;

    setFrom(selectedOption.value);
  };

  const handleTo = (selectedOption: SelectedOption) => {
    if(!selectedOption) return;

    setTo(selectedOption.value);
  };

  const handleInvert = () => {
    setFrom(to)
    setTo(from)
  }

  useEffect(() => {
    if (from && to && amount) {
      convert(from, to, parseFloat(amount));
    }
  }, [from, to, amount]);
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white w-4/12 p-6 rounded-lg shadow-lg">
        <div className="text-2xl mb-4">
            Convertisseur de devises
        </div>
        {conversionRate && (
          <div className="text-xl mb-4 text-gray-400 italic">
            Taux de change : {conversionRate}
          </div>
        )}
        <input 
          type="number" 
          className="block w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-blue-500 focus:border-2"
          onChange={handleAmount}
          value={amount ? amount : ""}
          placeholder="Montant à convertir"
        />
        <div>
          <div className="mb-4">
          <Dropdown
            handleChange={handleFrom}
            placeholder="Devise d'origine"
            value={from}
          />
          </div>
          <div className="mb-4">
          <Dropdown
            handleChange={handleTo}
            placeholder="Devise souhaitée"
            value={to}
          />
          </div>
        </div>
        <div className="flex justify-center">
          <button 
            className="bg-blue-500 text-white px-4 py-2 mb-4 rounded shadow hover:bg-blue-700"
            onClick={handleInvert}
          >
            Inverser les devises
          </button>
        </div>
        {conversionRate && (
          <div className="text-xl">Montant converti : {result} {to}</div> 
        )}
      </div>
    </div>
  );
}