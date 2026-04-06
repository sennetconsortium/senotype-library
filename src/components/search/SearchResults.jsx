import React from 'react'
import { useSearchUIContext } from "search-ui/components/core/SearchUIContext";

function SearchResults() {
  const { wasSearched, filters, rawResponse } = useSearchUIContext()
  return (
    <div>SearchResults

      {JSON.stringify(rawResponse)}
    </div>
  )
}

export default SearchResults