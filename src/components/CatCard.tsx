import React from 'react'
import { ReactComponent as DeleteIcon } from '../images/delete.svg'
import { Cat } from '../interfaces/cat.interface'

interface CatCardProps {
  cat: Cat
  onDelete: (id: string) => void
}

const CatCard: React.FC<CatCardProps> = ({ cat, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
      <img src={cat.url} alt={`cat_${cat.id}`} loading="lazy" className="w-full h-48 object-cover" />
      <div onClick={() => onDelete(cat.id)} className="absolute bottom-2 right-2 cursor-pointer">
        <div className="relative group">
          <button type="button" className="bg-white/65 hover:bg-white/85 text-white py-3 px-4 rounded-full">
            <DeleteIcon className="w-5 h-6" />
          </button>
          <div className="absolute bottom-full mb-2 hidden group-hover:block bg-white/85 text-gray-700 text-center text-xs rounded py-1 px-2">Delete Cat</div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(CatCard)
