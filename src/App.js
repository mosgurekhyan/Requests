import { createContext, useMemo, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Cards from './components/Cards/Cards'
import UniqCard from './components/UniqCard/UniqCard'


function App() {
  const [page, setPage] = useState(1)
  const [cards, setCards] = useState([])
  const [hasMore, setHasMore] = useState(true)

  const handleLoadMore = () => {
    setPage(page + 1)
  }
  const [images, setImages] = useState([
    {
      id: '1',
      image: 'https://source.unsplash.com/random'
    },
    {
      id: '2',
      image: 'https://source.unsplash.com/random'
    },
    {
      id: '3',
      image: 'https://source.unsplash.com/random'
    },
    {
      id: '4',
      image: 'https://source.unsplash.com/random'
    },
  ])

  const providerValue = useMemo(() => ({images, cards, setCards, page, setPage, hasMore, setHasMore, handleLoadMore}), [images, cards, setCards, page, setPage, hasMore, setHasMore, handleLoadMore])

  return (
    <div className="App">
      <UseContext.Provider value={providerValue}>
        <Routes>
          <Route index element={<Cards/>}/>
          <Route path='/card/:id' element={<UniqCard />} />
        </Routes>
      </UseContext.Provider>
    </div>
  )
}

export default App
export const UseContext = createContext(null)
