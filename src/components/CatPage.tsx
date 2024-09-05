import React, { useState, useEffect, useCallback, useRef } from 'react'
import CatCard from './CatCard'
import { Cat } from '../interfaces/cat.interface'
import Loader from './Loader'

function CatPage() {
  const API = 'https://api.thecatapi.com/v1/images/search?limit=10'

  const [cats, setCats] = useState<Cat[]>([])
  const [page, setPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const initialFetchComplete = useRef<boolean>(false)

  /**
   * Fetch Cats
   */
  const fetchCats = useCallback(async (pageNumber: number) => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API}&page=${pageNumber}`)
      const data: Cat[] = await response.json()
      setCats(data)
      setPage(pageNumber)
    } catch (error) {
      console.error('Error fetching cats:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Delete Cat
   */
  const deleteCat = useCallback((id: string) => {
    setCats((prevCats) => prevCats.filter((cat) => cat.id !== id))
  }, [])

  /**
   * Pagination Previous
   */
  const handlePrevPage = () => {
    if (page > 1) {
      fetchCats(page - 1)
    }
  }

  /**
   * Pagination Next
   */
  const handleNextPage = () => {
    fetchCats(page + 1)
  }

  useEffect(() => {
    // prevent duplicate fetch on page load
    if (!initialFetchComplete.current) {
      fetchCats(1)
      initialFetchComplete.current = true
    }
  }, [fetchCats])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-5xl font-bold mb-10 text-center">The Cat API</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cats.map((cat) => (
              <CatCard key={cat.id} cat={cat} onDelete={deleteCat} />
            ))}
          </div>
          <div className="flex justify-center mt-6 space-x-4">
            <button className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md" onClick={handlePrevPage} disabled={page === 1 || isLoading}>
              Previous
            </button>
            <button className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md" onClick={handleNextPage} disabled={isLoading}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default CatPage
