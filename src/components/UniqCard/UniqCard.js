import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UseContext } from '../../App'
import './UniqCard.css'
import logo1 from '../../Images/gray.svg'
import logo2 from '../../Images/blue.svg'

function UniqCard() {
  const {cards, images} = useContext(UseContext)
  const {id} = useParams()
  const [currentCard, setCurrentCard] = useState(null)
  const [index, setIndex] = useState(0)
  const [like, setLike] = useState(false)

  const handleClick1 = () => {
    setIndex(0)
  }
  const handleClick2 = () => {
    setIndex(1)
  }
  const handleClick3 = () => {
    setIndex(2)
  }
  const handleClick4 = () => {
    setIndex(3)
  }

  useEffect(() => {
  if (cards.some(e => e.id === id)){
    setCurrentCard({
      ...cards.find(e => e.id === id)
  })} else {
      axios
      .get(`https://testguru.ru/frontend-test/api/v1/ads/` + id)
      .then((response) => {
        setCurrentCard ({
          id: response.data.id.toString(),
          seen: response.data.seen,
          price: response.data.price,
          title: response.data.title,
          address: response.data.address,
          createdAt: response.data.createdAt
      })})
    }
  }, [])

  return (
    <div className="cardContainer">
    <div className='card'>
      <h4 style={{visibility: currentCard?.seen ? 'visible' : 'hidden'}} className='h4'>Просмотрено</h4>
      <section className="section">
        {images.map((img, imgIndex) => {
          const { id, image } = img
          let position = "nextSlide"
          if (imgIndex === index) {
            position = "activeSlide"
          }
          if (
            imgIndex === index - 1 ||
            (index === 0 && imgIndex === images.length - 1)
          ) {
            position = "lastSlide"
          }
          return (
            <article key={id} className={position}>
              <div className='imagesDiv'>
                <img src={image} alt='' className="img" />
                <div className='dots'>
                  <div onClick={handleClick1} className={`${index === 0 ? "dot2" : "dot1"}`}></div>
                  <div onClick={handleClick2} className={`${index === 1 ? "dot2" : "dot1"}`}></div>
                  <div onClick={handleClick3} className={`${index === 2 ? "dot2" : "dot1"}`}></div>
                  <div onClick={handleClick4} className={`${index === 3 ? "dot2" : "dot1"}`}></div>
                </div>
              </div>
            </article>
          )
         })
        }
      </section>
      <div className='cardItems'>
        <div className='cardItem1'>
          <h1>{currentCard?.price} ₽</h1>
          <img onClick={() => setLike(!like)} className='icon' src={like ? logo2 : logo1} alt="" />
        </div>
        <h4>{currentCard?.title}</h4>
        <div className="cardItem2">
          <p>{currentCard?.address}</p>
          <p>{currentCard?.createdAt}</p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default UniqCard