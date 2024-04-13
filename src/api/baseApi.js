import axios from 'axios'
export const ApiService = {

  init(){
    axios.defaults.headers.common['Content-Type'] = 'application/json'; // Typ danych przesyłanych w zapytaniu
    axios.defaults.headers.common['Accept'] = 'application/json'; // Typ danych akceptowanych w odpowiedzi
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*"; // Akceptuj żądania z dowolnego źródła
    axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE'; // Akceptuj żądane metody HTTP
  },
  query(resource, params) {
    return axios.get(resource, params).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  get(resource, slug = "") {
    return axios.get(`${resource}/${slug}`).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  post(resource, params) {
    return axios.post(`${resource}`, params);
  },

  update(resource, slug, params) {
    return axios.put(`${resource}/${slug}`, params);
  },

  put(resource, params) {
    return axios.put(`${resource}`, params);
  },

  delete(resource) {
    return axios.delete(resource).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  }
};

