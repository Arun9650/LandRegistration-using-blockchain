import { IProduct } from '@/model/Product'
import {atom} from 'jotai'

export const cartAtom = atom<IProduct[]>([])

export const totalPriceAtom = atom(get => {
    const cart = get(cartAtom)
    return cart.reduce((acc, item) => acc + item.price, 0)
})
