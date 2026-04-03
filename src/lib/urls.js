const URLS = {
  login: process.env.NEXT_PUBLIC_LOGIN_URL,
  edit: '/edit',
  api: {
    local: (path) => `/api/${path}`,
    ingest: process.env.NEXT_PUBLIC_INGEST_API_BASE,
    search: process.env.NEXT_PUBLIC_SEARCH_API_BASE,
    ontology: process.env.NEXT_PUBLIC_ONTOLOGY_API_BASE,
  }
}

export default URLS