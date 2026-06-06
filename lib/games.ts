export type GameStatus = 'available' | 'in-development' | 'concept' | 'coming-soon'
export type Platform   = 'windows' | 'mac' | 'linux'
export type Engine     = 'Unity' | 'Unreal Engine' | 'Godot' | 'Custom'

export interface SystemSpec {
  os:      string
  cpu:     string
  ram:     string
  gpu:     string
  storage: string
}

export interface DLC {
  id:            string
  title:         string
  description:   string
  price:         number
  paddlePriceId: string
  downloadUrl?:  string | null
  icon?:         string
}

export interface Game {
  id:              string
  title:           string
  genre:           string
  description:     string
  longDescription?: string
  status:          GameStatus
  platforms:       Platform[]
  price:           number | null
  paddlePriceId:   string | null
  downloadUrl:     string | null
  steamUrl:        string | null
  directUrl:       string | null
  featured:        boolean
  icon:            string
  artGradient:     string
  engine:          Engine
  releaseYear?:    string
  tags?:           string[]
  dlcs?:           DLC[]
  screenshots?:    string[]   // URLs — empty until real art exists
  trailerUrl?:     string | null
  systemRequirements?: {
    minimum:     SystemSpec
    recommended: SystemSpec
  }
}

export const games: Game[] = [
  {
    id:            '00001',
    title:         'BANJHAKRI',
    genre:         'Action Adventure',
    description:   'Taken by the forest spirit. Trained against your will. The world\'s only hope.',
    longDescription: 'The Banjhakri takes children from their villages — those with a gift they do not yet understand — and trains them in the deep forest. You are Aarav. You were taken. You survived. Now you carry power you barely control, and the village you were stolen from is in danger from something the elders refuse to name. Banjhakri is a top-down action-adventure built on one of Nepal\'s most iconic pieces of folklore — a world of spirits, shamans, and the thin line between the living and the unseen. Raw, grounded, and unlike anything else on Steam.',
    status:        'in-development',
    platforms:     ['windows', 'mac'],
    price:         null,
    paddlePriceId: 'pro_01krjz5zf4tkq9wzww2w9ezq2p',
    downloadUrl:   null,
    steamUrl:      null,
    directUrl:     null,
    featured:      true,
    icon:          'banjhakri.png',  
    artGradient:   'linear-gradient(135deg, #1a0d0a 0%, #1C1C1C 100%)',
    engine:        'Unity',
    trailerUrl:    null,
    screenshots:   ['/banjhakri.png'],
    tags:          ['action', 'adventure', 'spiritual', 'multiplayer-planned'],
    dlcs:          [],
    systemRequirements: {
      minimum: {
        os:      'Windows 10 64-bit',
        cpu:     'Intel Core i5-6600 / AMD Ryzen 5 1600',
        ram:     '8 GB RAM',
        gpu:     'NVIDIA GTX 970 / AMD RX 580 (4GB VRAM)',
        storage: '6 GB available space',
      },
      recommended: {
        os:      'Windows 11 64-bit',
        cpu:     'Intel Core i7-9700K / AMD Ryzen 7 3700X',
        ram:     '16 GB RAM',
        gpu:     'NVIDIA RTX 2070 / AMD RX 6700 XT (8GB VRAM)',
        storage: '6 GB SSD',
      },
    },
  }
]

export function getGameById(id: string): Game | undefined {
  return games.find(g => g.id === id)
}

export function getGamesByStatus(status: GameStatus): Game[] {
  return games.filter(g => g.status === status)
}

export function searchGames(query: string): Game[] {
  const q = query.toLowerCase().trim()
  if (!q) return games
  return games.filter(g =>
    g.title.toLowerCase().includes(q)       ||
    g.genre.toLowerCase().includes(q)       ||
    g.description.toLowerCase().includes(q) ||
    g.tags?.some(t => t.toLowerCase().includes(q))
  )
}

export const featuredGame = games.find(g => g.featured) ?? games[0]

export const STATUS_LABELS: Record<GameStatus, string> = {
  'available':      'Available Now',
  'in-development': 'In Development',
  'concept':        'Concept Stage',
  'coming-soon':    'Coming Soon',
}

export const PLATFORM_LABELS: Record<Platform, string> = {
  windows: 'Windows',
  mac:     'Mac',
  linux:   'Linux',
}