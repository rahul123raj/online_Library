import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import '../assets/style/books.css';
import Filter from './Filter.jsx';
import Loading from './Loading.jsx';

const Books = () => {
  const location = useLocation();
  const path = location.pathname;
  const bool = path.startsWith('/adminportal');
  const [loading, setLoading] = useState(true); // Default loading state
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [books, setBooks] = useState([]);
  const s = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true); // Start loading immediately
      try {
        const resp = await axios.get(
          `http://localhost:5000/bookdata/book?filter=${selectedCategories}&search=${search}`
        );
        setBooks(resp.data.payload);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false); // Stop loading after data fetch
      }
    };

    fetchBooks();
  }, [selectedCategories, search, location.pathname]);

  const readBook = (id) => {
    navigate(bool ? `/adminportal/books/readbook/${id}` : `/usersportal/books/readbook/${id}`);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/bookdata/book/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (response.ok) {
          alert('Item deleted successfully');
          setBooks(books.filter((item) => item._id !== id));
        } else {
          alert('Failed to delete the item');
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
  };

  const handleSearch = () => {
    setSearch(s.current.value);
  };

  const handleReset = () => {
    s.current.value = '';
    setSearch('');
    setSelectedCategories([]);
  };

  return (
    <div className="books-container">
      <div className="filter">
        <Filter onCategoryChange={handleCategoryChange} selectedCategories={selectedCategories} className="category" />
        <button onClick={handleReset}>Reset</button>
      </div>

      <div className="book-main">
        <div className="search-container">
          <input
            type="search"
            placeholder='Search books---Enter "book title" or "authors"'
            onChange={handleSearch}
            ref={s}
            className="search-input"
          />
          <button className="search-button">Search</button>
        </div>


          <div className="books-main">
          {loading ? ( 
            // Render spinner while loading
          <Loading />
        ) : (
          <div className="books">
            {books.map((elem) => {
              const { _id, title, pageCount, status, authors, categories, thumbnailUrl } = elem;
              return (
                <div key={_id} className="cards">
                  <div className="image">
                    <div className="img">
                      <img src={thumbnailUrl} alt={title} />
                    </div>
                    <div className="title">{title}</div>
                  </div>
                  <div className="info">
                    <table>
                      <tbody>
                        <tr>
                          <td>Categories</td>
                          <td>{categories}</td>
                        </tr>
                        <tr>
                          <td>Status</td>
                          <td>{status}</td>
                        </tr>
                        <tr>
                          <td>Page Count</td>
                          <td>{pageCount}</td>
                        </tr>
                        <tr>
                          <td>Authors</td>
                          <td>{authors}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="btns">
                      {bool ? (
                        <>
                          <button id="read" onClick={() => readBook(_id)}>Read Book</button>
                          <button id="delete" onClick={() => handleDelete(_id)}>Delete Book</button>
                        </>
                      ) : (
                        <button id="read" onClick={() => readBook(_id)}>Read Book</button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
                 )}
          </div>
 
      </div>
    </div>
  );
};

export default Books;
