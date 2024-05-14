import { IProduct } from '@/model/Product'
import {atom} from 'jotai'

export const cartAtom = atom<IProduct[]>([])