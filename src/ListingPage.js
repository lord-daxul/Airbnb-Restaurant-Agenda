import React from 'react'
import { useParams } from 'react-router-dom'
import listings from './data/listings.json'

function ListingPage(){
  const { id } = useParams()
  const lid = Number(id)
  const item = (listings || []).find(l => Number(l.id) === lid)
  if(!item) return <div style={{ padding: 24 }}>Listado no encontrado</div>
  return (
    <div style={{ padding: 24, maxWidth: 1000, margin: '0 auto' }}>
      <div style={{ borderRadius: 8, overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}>
        <img src={item.img || item.cover || 'https://via.placeholder.com/1000x400'} alt="cover" style={{ width: '100%', height: 400, objectFit: 'cover' }} />
      </div>
      <h1 style={{ marginTop: 16 }}>{item.title || item.name}</h1>
      <div style={{ color: '#666' }}>{item.location}</div>
      <p style={{ marginTop: 12 }}>{item.description}</p>
    </div>
  )
}

export default ListingPage
