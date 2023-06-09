import { useQuery } from '@tanstack/react-query'
import { Card } from '../common/cards'
import { sortCards } from './Cards'

type UserInfo = {
  loggedIn: boolean
  user?: string
  position?: number
}

export const useUserInfo = () =>
  useQuery<UserInfo>({
    queryKey: ['userinfo'],
    queryFn: async () => {
      const response = await fetch('/userinfo')
      if (!response.ok) {
        throw new Error('Network response not OK')
      }
      const data = await response.json()
      return data.message
    },
  })

type NextPlayer = {
  spieler: {
    name: string
    position: number
    geber?: boolean
  }
}

export const useNextCard = () =>
  useQuery<NextPlayer>({
    queryKey: ['naechste-karte'],
    queryFn: async () => {
      const response = await fetch('/naechste-karte')
      if (!response.ok) {
        throw new Error('Network error')
      }
      return response.json()
    },
    refetchInterval: 1000, // ms
  })

interface StichCard {
  card: Card
  spieler: {
    position: number
    name: string
  }
}

export const useStich = () =>
  useQuery<StichCard[]>({
    queryKey: ['stich'],
    queryFn: async () => {
      const response = await fetch('/stich')
      if (!response.ok) {
        throw new Error('Network response not OK')
      }
      return response.json()
    },
    refetchInterval: 1000, //ms
  })

export const useMyCards = () =>
  useQuery<Card[]>({
    queryKey: ['my-cards'],
    queryFn: async (): Promise<Card[]> => {
      const response = await fetch('/my-cards')
      if (!response.ok) {
        throw new Error('Network response not OK')
      }
      const cards = await response.json()
      sortCards(cards)
      return cards
    },
    refetchInterval: 1000, // ms
  })

interface Spieler {
  name: string
}

interface Punkte {
  spieler: Spieler
  punkte: number
}

export const usePunkte = () =>
  useQuery<Punkte[]>({
    queryKey: ['punkte'],
    queryFn: async () => {
      const response = await fetch('/punkte')
      if (!response.ok) {
        throw new Error('keine Punkte')
      }
      return response.json()
    },
    refetchInterval: 1000, //ms
  })

export const useCanStartNextRound = () =>
  useQuery<{ canStartNextRound: boolean }>({
    queryKey: ['canstartnextround'],
    queryFn: async () => {
      const response = await fetch('/canstartnextround')
      if (!response.ok) {
        throw new Error('kann naechste Runde nicht starten')
      }
      return response.json()
    },
    refetchInterval: 1000, // ms
  })

export const usePlayerInfo = () =>
  useQuery<
    { name: string; position: number; cardsNumber: number; geber: boolean }[]
  >({
    queryKey: ['player-info'],
    queryFn: async () => {
      const response = await fetch('/player-info')
      if (!response.ok) {
        throw new Error('Network problem')
      }
      return response.json()
    },
  })
