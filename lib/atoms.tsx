import { CardData } from '@/components/ui/customcard'
import {atom} from 'jotai'

export const cartAtom = atom<CardData[]>([])