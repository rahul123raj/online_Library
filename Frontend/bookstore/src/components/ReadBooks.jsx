import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import '../assets/style/readbook.css'

const ReadBooks = () => {
    let params = useParams()
    let bookId = params.id
    console.log(bookId)
    let [book , setBook] = useState({})
    useEffect(() => {
        const fetchapi = async () => {
            try {
                const response = await fetch(`http://localhost:5000/bookdata/book/${bookId}`);
                
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                
                const data = await response.json();
                setBook(data.payload[0]); // No need for `await` here
        // console.log(data.payload[0])

            } catch (error) {
                console.error("Failed to fetch book data:", error);
            }
        };
    
        fetchapi();
    }, [bookId]); // Add bookId to the dependency array if it changes

    let path = location.pathname
  let bool = path.startsWith('/adminportal')
  let navigate = useNavigate()

    let handleBack = ()=>{
        if(bool){
            navigate('/adminportal/books')
            return
        }
        if(!bool){
            navigate('/usersportal/books')
        }
    }

    let {_id,title,isbn,pageCount,status,authors,categories,thumbnailUrl,longDescription,shortDescription}  = book

console.log(_id)

  return (
    <>
        <div className="read-outside"></div>
        <div className="read-card">
    <div className="image">
        <img src={thumbnailUrl} alt="Book Thumbnail" />
        <p>{title}</p>
    </div>
    <div className="read-info">
        <h3>{title}</h3>
        <p className="isbn">isbn = {isbn}</p>
        <p className="page-count">{pageCount} pages</p>
        <p className="short-description">{shortDescription}</p>
        <h1>Long Description</h1>
        <p className="long-description">{longDescription}</p>

        
        <div className="infos">
            <div className="inf">
            <p><strong>Status: </strong>{status}</p>
            <p><strong>Authors: </strong>{authors}</p>
            <p><strong>Categories: </strong>{categories}</p>
            </div>
                <button onClick={handleBack}>⇦ back</button>
        </div>
    </div>
</div>

    </>
  )
}

export default ReadBooks