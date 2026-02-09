import React from 'react'
import { useParams } from 'react-router-dom'
import listings from './data/listings.json'
import BusinessDetail from './BusinessDetail'

function ListingPage(){
  const { id } = useParams()
  const lid = Number(id)
  const item = (listings || []).find(l => Number(l.id) === lid)
  if(!item) return <div style={{ padding: 24 }}>Listado no encontrado</div>

  // normalize listing to business-like shape
  const business = {
    id: item.id,
    name: item.title || item.name,
    title: item.title || item.name,
    location: item.location,
    description: item.description,
    rating: item.rating,
    pricePerPerson: item.price || null,
    priceRange: item.priceRange || null,
    category: item.category || null,
    tags: item.tags || [],
    cover: item.cover || item.img || '',
    address: item.address || null,
    chairs: item.chairs || { min: 1, max: 12, default: 2 },
    tables: item.tables || []
  }

  return <BusinessDetail business={business} tables={business.tables} />
}

export default ListingPage
