import './Card.css'
import logo1 from '../../Images/gray.svg'
import logo2 from '../../Images/blue.svg'
import { memo, useContext, useEffect } from 'react'
import { useState } from 'react'
import { UseContext } from '../../App'
import { useNavigate } from 'react-router-dom'

function Card(props) {
  const {images} = useContext(UseContext)
  const [index, setIndex] = useState(0)
  const [like, setLike] = useState(false)
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/card/${props.id}`);
  }

  useEffect(() => {
    const lastIndex = images.length - 1
    if (index < 0) {
      setIndex(lastIndex)
    }
    if (index > lastIndex) {
      setIndex(0)
    }
  }, [index, images])

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

  return (
    <div key={props.i} onClick={handleClick} className='card'>
      <h4 style={{visibility: props.seen ? 'visible' : 'hidden'}} className='h4'>Просмотрено</h4>
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
          <h1>{props.price} ₽</h1>
          <img onClick={() => setLike(!like)} className='icon' src={like ? logo2 : logo1} alt="" />
        </div>
        <h4>{props.title}</h4>
        <div className="cardItem2">
          <p>{props.address}</p>
          <p>{props.createdAt}</p>
        </div>
      </div>
    </div>
  )
}

export default memo(Card)