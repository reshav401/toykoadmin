import axios from "axios";
import router from "next/router";
import qs from 'qs';

const BASE_URL = 'https://localhost:7006/';

//URLS
export const ENDPOINTS = {
    DIVISION : 'Divisions',
    VERTICAL : 'Verticals',
    BRAND : 'Brands',
    UNIT : 'Units',
    PRODUCT : 'Products',
    REGION : 'Regions',
    LOGIN : 'Auth/Login'
}

//adding headers to every request
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(config => {
    config.headers['X-Auth'] = localStorage.Token;
    return config;
})

axiosInstance.interceptors.response.use(
    response => {
        return (response);
    },
    error => {
        if(error.response.status === 401) {
            console.log("unauthorized")
            localStorage.removeItem('Token')
            localStorage.removeItem('Name')
            localStorage.removeItem('Role')

            router.push({
                pathname: '/auth/login/custom',
                query: { backTo: router.asPath }
            });
            
            // logout()
        } 
        else if (error.response.status === 403){
            //returm 403 page
        }else {
            return Promise.reject(error)
        }
    }
)

export const createApiEndpoint = endpoints => { 
    let url = BASE_URL + endpoints + '/';
    
    return {
        
        //Get Methods
        fetchAll : (limit, page, sort, sortDirection, filters = {}) => axiosInstance.get(url, {
            params: {
                limit,
                page,
                sort,
                sortDirection,
                filters,
            },
            paramsSerializer: function(params) {
                return qs.stringify(params, { encode: false });
            }
        }), //{page, limit , sort, sortDirection(Asc, Dsc), filters{term, Name, ...} }

        fetchById : id => axiosInstance.get(
            url + id
        ), //{id}

        Search: (page, text, filters) => axiosInstance.get(url + 'Search/', {
            params: {
                page,
                text,
                filters
            },
            paramsSerializer: function(params) {
                return qs.stringify(params, { encode: false });
            }
        }),

        All : () => axiosInstance.get(
            url + 'All'
        ),

        //POST 
        create : newRecord => axiosInstance.post(
            url, 
            newRecord
        ), //{Body}
        
        //PUT 
        update: (id, updatedRecord) => axiosInstance.put(
            url + id, 
            updatedRecord
        ), //{id}, {Body}
        
        //DELETE 
        delete: id => axiosInstance.delete(
            url + id
        ), //{id}

        //Login
        login : (credentials) => axios.post(url, credentials)
    }
}
