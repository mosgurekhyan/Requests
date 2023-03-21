import axios from 'axios'
import { useContext, useEffect, useState, useCallback } from 'react'
import { UseContext } from '../../App'
import Card from '../Card/Card'
import './Cards.css'
import logo1 from '../../Images/gray.svg'

function Cards() {
  const {
    page,
    setPage,
    cards,
    setCards,
    hasMore,
    setHasMore,
  } = useContext(UseContext)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isFetching, setIsFetching] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  useEffect(() => {
    if(isFetching){
    axios
      .get(`https://testguru.ru/frontend-test/api/v1/ads?page=${page}`)
      .then((response) => {
        const detail = response.data.items.map((e) => ({
          id: e.id.toString(),
          seen: e.seen,
          price: e.price,
          title: e.title,
          address: e.address,
          createdAt: e.createdAt
        }))
        setHasMore(detail.length > 0)
        setCards((cards) => [...cards, ...detail])
        setIsFetching(false)
      })
      .catch((error) => {
        setError(error.message)
      })
      .finally(() => {
        setLoading(false)
      })}
  }, [page])

  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore) {
      setIsLoadingMore(true)
      setIsFetching(true)
      setPage(page + 1)
      setIsLoadingMore(false)
    }
  }, [loading, hasMore, setPage, page])

  useEffect(() => {
    if (!hasMore) {
      setIsFetching(false)
    }
  }, [hasMore])

  const divContent1 = (
    <div className='skeleton'>
      <div className="skeletonDots"></div>
      <div className='skeletonData'>
        <div className='skeletonData1'>
          <span className='span1'></span>
          <span className='span2'></span>
        </div>
          <div className='skeletonData2'></div>
          <div className='skeletonData3'></div>
      </div>
    </div>
  )

  const divs1 = Array(20).fill(divContent1)

  const divContent2 = (
    <div className='error'>
      <div className='dots'>
        <div className='dot1'></div>
        <div className='dot2'></div>
        <div className='dot1'></div>
        <div className='dot1'></div>
      </div>
      <div className='cardItems'>
        <div className='cardItem1'>
          <h1>0 000 ₽</h1>
          <img className='icon' src={logo1} alt="" />
        </div>
        <h4>Название товарной позиции</h4>
        <div className="cardItem2">
          <p>Город</p>
          <p>00.00.00, 00.00</p>
        </div>
      </div>
    </div>
  )

  const divs2 = Array(16).fill(divContent2)

  const divContent3 = (
    <div className='error'>
      <div className='dots'>
        <div className='dot1'></div>
        <div className='dot2'></div>
        <div className='dot1'></div>
        <div className='dot1'></div>
      </div>
      <div className='cardItems'>
        <div className='cardItem1'>
          <h1>0 000 ₽</h1>
          <img className='icon' src={logo1} alt="" />
        </div>
        <h4>Название товарной позиции</h4>
        <div className="cardItem2">
          <p>Город</p>
          <p>00.00.00, 00.00</p>
        </div>
      </div>
    </div>
  )

  const divs3 = Array(16).fill(divContent3)

  return (
    <div className='cards'>
      <div className='cards2'>
        {loading ? (
          <div className='loading'>
            {divs1.map((div, index) => (
            <div key={index}>{div}</div>))}
            <div className='buttonDiv'>
              <button></button>
            </div>
          </div>
          ) : error ? (
            <div className='errorLoading'>
              <div className='errorSkeleton'>
                {divs2.map((div, index) => (
                <div key={index}>{div}</div>))}
              </div>
              <div className='errorButtonDiv'>
                <h5>Ошибка при загрузке</h5>
                <button onClick={(() => window.location.reload())}>Повторить попытку</button>
              </div>
            </div>
          ) : cards.length === 0 ? <div className='notFound'>
            <div className='notFoundData'>
              <h3 className='h3'>ОБЪЯВЛЕНИЙ НЕ НАЙДЕНО</h3>
              <p className='p'>Простите, по вашему запросу товаров сейчас нет. Задайте запрос по-другому или измените характеристики</p>
            </div>
          </div> 
          : (
          <>
            {cards.map((e, i) => (
              <Card
                key={i}
                id={e.id}
                createdAt={e.createdAt}
                seen={e.seen}
                price={e.price}
                title={e.title}
                address={e.address}
              />
            ))}
          </>
        )}
      </div>
      {
        isLoadingMore ? 
          <div className='loading2'>
            {divs3.map((div, index) => {
              if(index === 0){
                return <div key={index} className='error'>
                <h4 className='h4'>Просмотрено</h4>
                <div className='dots'>
                  <div className='dot1'></div>
                  <div className='dot2'></div>
                  <div className='dot1'></div>
                  <div className='dot1'></div>
                </div>
                <div className='cardItems'>
                  <div className='cardItem1'>
                    <h1>0 000 ₽</h1>
                    <img className='icon' src={logo1} alt="" />
                  </div>
                  <h4>Название товарной позиции</h4>
                  <div className="cardItem2">
                    <p>Город</p>
                    <p>00.00.00, 00.00</p>
                  </div>
                </div>
                </div>
              } else {
                return <div key={index}>{div}</div>
              }
            })}
            <div className='buttonDiv'>
              <div className="spinner-container">
                <div className="loading-spinner"></div>
              </div>
            </div>
          </div>
        : ''
      }
      {!loading && !error && hasMore && (
        <div className='buttonDiv2'>
          <button style={{visibility: cards.length === 0 ? 'hidden' : 'visible'}} onClick={handleLoadMore}>Показать ещё</button>
        </div>
      )}
    </div>
  )
}

export default Cards
