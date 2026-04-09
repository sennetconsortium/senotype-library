import AUTH from "./auth"

const SEARCH = {
  submitterBucketsTransform: (ops) => {
    const {aggregations, field} = ops
    const results = []
    let name
    for (const a of aggregations[field].buckets) {
      let name = a.meta.hits.hits[0]._source.submitter.name
      results.push({...a, email: a.key, key: `${name.first} ${name.last}`})
    }
    return results
  },
  bucketsTransform: (ops) => {
    const {aggregations, field} = ops
  
    return aggregations[field]?.buckets || aggregations[field]?.filtered_terms?.buckets?.buckets?.buckets || []
  },
  doesAggregationHaveBuckets: (field, values) => {
    return (filters, aggregations, auth) => {
      try {
        return aggregations[field] !== undefined && SEARCH.bucketsTransform({aggregations, field}).length > 0
      } catch {
        return false
      }
    }
  },
  getAuthState: () => {
    const authState = {
      isAuthenticated: AUTH.isAuthorized,
      isAuthorized: AUTH.isAuthorized,
      isAdmin: AUTH.isAdmin
    }
    return authState
  }
}

export default SEARCH