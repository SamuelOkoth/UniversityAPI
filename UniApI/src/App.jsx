import { useState, useEffect } from 'react';
import './App.css'
const SearchPanel = () => {
  const [searchParam, setSearchParam] = useState('');
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchParam) {
      setLoading(true);
      fetch(`http://universities.hipolabs.com/search?country=${searchParam}`)
        .then((response) => response.json())
        .then((data) => {
          setUniversities(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error:', error);
          setLoading(false);
        });
    } else {
      setUniversities([]);
    }
  }, [searchParam]);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchParam(event.target.value);
  };

  return (
    <div>
      <h1>University Search Panel</h1>
      <form>
        <input type="text" value={searchParam} onChange={handleSearch} placeholder="Enter country name" />
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : universities.length > 0 ? (
        <ul>
          {universities.map((university) => (
            <li key={university.name}>{university.name}</li>
          ))}
        </ul>
      ) : (
        <p>No universities found.</p>
      )}
    </div>
  );
};

export default SearchPanel;
