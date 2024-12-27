import { useRef, useState } from "react";
import '../../assets/style/adddata.css';
import Loading from "../Loading";

const AddBooks = () => {

  let addbookForm = useRef();
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  let [loading, setLoading] = useState(false)

  let addBooks = async (e) => {
    e.preventDefault();

    const formData = new FormData(addbookForm.current);

    // Add authors and categories as arrays to FormData
    formData.append('authors', JSON.stringify(authors)); 
    formData.append('categories', JSON.stringify(categories));

    setLoading(true)

    try {
      const response = await fetch(`http://localhost:5000/bookdata/book`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('Book added successfully!');
      alert('you book added successfully')
    } catch (error) {
      console.error('Error adding book:', error);
    } finally {
      setLoading(false) 
    }
  };

  const handleAuthorChange = (event) => {
    const authorInput = event.target.value;
    const newAuthors = authorInput.split(',').map(author => author.trim());
    setAuthors(newAuthors);
  };

  const handleCategoryChange = (event) => {
    const categoryInput = event.target.value;
    const newCategories = categoryInput.split(',').map(category => category.trim());
    setCategories(newCategories);
  };

  return (
    <>
    <div className="addbook-up"></div>
    <div className="addbook">
      <h2>Enter details of the Book you want to add</h2>
  <form action="" onSubmit={addBooks} ref={addbookForm}>
    <div className="form-group">
      <label htmlFor="file">Upload File</label>
      <input type="file" name="file" id="file" required />
    </div>

    <div className="form-group">
      <label htmlFor="title">Title</label>
      <input type="text" name="title" id="title" placeholder="Title" required />
    </div>

    <div className="form-group">
      <label htmlFor="isbn">ISBN</label>
      <input type="text" name="isbn" id="isbn" placeholder="ISBN" required />
    </div>

    <div className="form-group">
      <label htmlFor="pageCount">Page Count</label>
      <input type="number" name="pageCount" id="pageCount" placeholder="Page Count" required />
    </div>

    <div className="form-group">
      <label htmlFor="publishedDate">Published Date</label>
      <input type="date" name="publishedDate" id="publishedDate" required />
    </div>

    <div className="form-group">
      <label htmlFor="shortDescription">Short Description</label>
      <textarea name="shortDescription" id="shortDescription" placeholder="Short Description" required />
    </div>

    <div className="form-group">
      <label htmlFor="longDescription">Long Description</label>
      <textarea name="longDescription" id="longDescription" placeholder="Long Description" required />
    </div>

    <div className="form-group">
      <label htmlFor="status">Status</label>
      <select name="status" id="status" required>
        <option value="PUBLISHED">PUBLISHED</option>
        <option value="DRAFT">DRAFT</option>
      </select>
    </div>

    <div className="form-group">
      <label htmlFor="authorsInput">Authors (comma-separated)</label>
      <input
        type="text"
        name="authorsInput"
        id="authorsInput"
        placeholder="Authors (comma-separated)"
        onChange={handleAuthorChange}
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="categoriesInput">Categories (comma-separated)</label>
      <input
        type="text"
        name="categoriesInput"
        id="categoriesInput"
        placeholder="Categories (comma-separated)"
        onChange={handleCategoryChange}
        required
      />
    </div>

    <button type="submit"> {loading ? <Loading /> : "Add Book"}</button>
  </form>
</div>

    </>
  );
};

export default AddBooks;