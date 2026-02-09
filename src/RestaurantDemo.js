import React from 'react'
import { useHistory } from 'react-router-dom'

// This component only redirects client-side to /restaurant/1 and returns null
// so the Router will mount the proper `RestaurantPage` component with params.
export default function RestaurantDemo() {
  const history = useHistory()
  React.useEffect(() => {
    if (history && history.location && history.location.pathname === '/restaurant/demo') {
      history.replace('/restaurant/1')
    }
  }, [history])

  return null
}
