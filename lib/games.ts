export type GameStatus = 'available' | 'in-development' | 'concept' | 'coming-soon'
export type Platform   = 'windows' | 'mac' | 'linux'
export type Engine     = 'Unity' | 'Unreal Engine' | 'Godot' | 'Custom'

export interface DLC {
  id:                   string
  title:                string
  description:          string
  price:                number
  lemonSqueezyVariantId: string   // Set in Lemon Squeezy dashboard, add here when ready
  downloadUrl?:         string   // Populated once DLC is shipped
  releaseYear?:         string
}

export interface Game {
  id:                   string
  title:                string
  genre:                string
  description:          string
  longDescription?:     string
  status:               GameStatus
  platforms:            Platform[]
  price:                number | null   // null = TBD, 0 = free
  lemonSqueezyVariantId: string | null   // Set in Lemon Squeezy dashboard, add here when ready
  downloadUrl:          string | null   // Direct download link once shipped
  steamUrl:             string | null
  directUrl:            string | null   // Legacy
  featured:             boolean
  icon:                 string
  artGradient:          string
  engine:               Engine
  releaseYear?:         string
  tags?:                string[]
  dlcs?:                DLC[]
}

export const games: Game[] = [
  {
    id:                   '000001',
    title:                'Ingracia New Dawn',
    genre:                'Survival',
    description:          'A survival game set in a post-apocalyptic world. Survive, build, and outlast the hordes of zombies.',
    longDescription:      'Designed around a decoupled physics engine where every vehicle component — suspension, tyres, drivetrain, aerodynamics — is an independent module. This lets us tune aggressively, add content post-launch, and maintain the codebase without regression hell. No damage model gimmicks. Just racing.',
    status:               'concept',
    platforms:            ['windows'],
    price:                9.99,
    lemonSqueezyVariantId: null,  // Add Lemon Squeezy variant ID here once game is ready for sale
    downloadUrl:          null,
    steamUrl:             null,
    directUrl:            null,
    featured:             true,
    icon:                 '🏎️',
    artGradient:          'linear-gradient(135deg, #1a0d0a 0%, #1C1C1C 100%)',
    engine:               'Unity',
    tags:                 ['racing', 'arcade', 'physics', 'multiplayer-planned'],
    dlcs:                 [], // Add DLCs here when the base game ships
  }
]

export const featuredGame = games.find(g => g.featured) ?? games[0]

export function getGamesByStatus(status: GameStatus): Game[] {
  return games.filter(g => g.status === status)
}

export function getGameById(id: string): Game | undefined {
  return games.find(g => g.id === id)
}

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