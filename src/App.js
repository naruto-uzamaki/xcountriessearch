import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const countries = useRef([]);
  const [searchData, setSearchData] = useState([]);
  const [query, setQuery] = useState("");
  const apiEndPoint = "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries";

  useEffect(() => {
    const init = async () => {
      try {
        const res = await fetch(apiEndPoint);
        const data = await res.json();
        countries.current = data;
        setSearchData(data);
      } catch (error) {
        console.log(error);
      }
    }

    init();
  }, []);

  const searchCountries = () => {
    console.log(countries.current, query);
    const filteredData = countries.current.filter((country) => {
      return country.common.toLowerCase().includes(query.toLowerCase());
    });
    setSearchData(filteredData);

  }

  useEffect(() => {
    const timer = setTimeout(() => searchCountries(), 300);

    return () => {
      clearTimeout(timer);
    }
  }, [query]);


  const renderedFlags = searchData.map(country => {
    return <div key={country.common} className="countryCard">
      <img className="imgStyle" src={country.png} alt={`Flag of ${country.common}`} />
      <h2>{country.common}</h2>
    </div>
  });

  return (
    <div>

      <form className="searchContainer" onSubmit={(e) => {
        e.preventDefault();
        searchCountries();
      }}>

        <input className="search" type='text' value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search for countries'></input>
      </form>

      <div className='container'>
        {renderedFlags}
      </div>
    </div>
  );

}

export default App;
