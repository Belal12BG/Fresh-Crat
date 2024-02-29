import axios from "axios";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";


let baseURL = 'https://route-ecommerce.onrender.com/api/v1'
let token = localStorage.getItem('userToken')

//add to cart
export function addToCart(productId) {
    return axios.post(`${baseURL}/cart`, { productId }, {
        headers: {
            token
        }
    })
}

//delete cart
export function deleteCart(productId) {
    return axios.delete(`${baseURL}/cart/${productId}`, {
        headers: {
            token
        }
    })
}

//update cart
export function updateCart({ id, count }) {
    return axios.put(`${baseURL}/cart/${id}`, { count }, {
        headers: {
            token
        }
    })
}

//checkout
export function checkout({ id, shippingAddress }) {
    return axios.post(`${baseURL}/orders/checkout-session/${id}?url=http://localhost:3000`, { shippingAddress }, {
        headers: {
            token
        }
    })
}

//get cart
export function getCart() {
    return axios.get(`${baseURL}/cart`, {
        headers: {
            token
        }
    })
}


//clear cart
export function clearCart() {
    return axios.delete(`${baseURL}/cart`,
        {
            headers: {
                token
            }
        }
    )
}


//use query
export function useGetCart(key, fn) {
    return useQuery(key, fn)
}

//use mutation
export function useCrudCart(fn) {
    const queryClient = useQueryClient()
    return useMutation(fn, {
        onSuccess: (data) => {
            toast.success(data?.data?.message);
            queryClient.invalidateQueries('getCart')
            //clear cart
            if (fn == clearCart)
            queryClient.setQueriesData('getCart', null)
        },
        onError: (data) => { toast.error(data?.message) }
    })
}

