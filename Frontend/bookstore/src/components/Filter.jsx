import { useEffect, useState } from "react";
import axios from "axios";
import '../assets/style/filter.css';
import { BOOK_API } from "../utils/constant";

const Filter = ({ onCategoryChange, selectedCategories }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`${BOOK_API}/category`)
      .then(res => setCategories(res.data.categories));
  }, []);

  // Handle checkbox change
  const handleCheckbox = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      onCategoryChange([...selectedCategories, value]);  // Add to selected categories
    } else {
      onCategoryChange(selectedCategories.filter((elem) => elem !== value));  // Remove from selected categories
    }
  };

  return (
    <>
      <h3>Filter: Category</h3>

      <div className="category">
        {categories.map((elem) => (
          <div className="categories" key={elem}>
            <input 
              type="checkbox" 
              name={elem} 
              id={elem} 
              value={elem}
              checked={selectedCategories.includes(elem)}  // Reflect the checked state from the selectedCategories array
              onChange={handleCheckbox}
            />
            <label htmlFor={elem}>{elem}</label>
          </div>
        ))}
      </div>
    </>
  );
};

export default Filter;
