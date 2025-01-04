import { api } from '@/lib/axios'

export interface registerRestaurantBody {
    email: string
    managerName: string
    phone: string
    restaurantName: string
}

export async function registerRestaurant({ email, managerName, phone, restaurantName }: registerRestaurantBody) {
    await api.post('/restaurants', { email, managerName, phone, restaurantName })
}