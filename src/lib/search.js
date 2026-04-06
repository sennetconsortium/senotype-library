import AUTH from "./auth"

const SEARCH = {
  doesAggregationHaveBuckets: (field) => {
    return (filters, aggregations, auth) => {
      try {
        return (
          aggregations[field] !== undefined && aggregations[field].buckets.length > 0
        )
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