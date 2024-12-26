import '../assets/style/home.css'
import readbook from '../assets/image/readbook.jpg'

function Home() {
    return (
        <>
        <div className="home">
            <img src={readbook} alt="" />
            <div className="overlay-text">"A fool may buy all the books in the world, and they will be in his library; but he will be able to read only those that he deserves to; and this deserving is produced by Karma. Our Karma determines what we deserve and what we can assimilate." <br /> <br />
            <b><i>-Swami Vivekananda</i></b></div>
        </div>
        </>
    )
}

export default Home