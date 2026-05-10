export type GameStatus = 'available' | 'in-development' | 'concept' | 'coming-soon'
export type Platform   = 'windows' | 'mac' | 'linux'
export type Engine     = 'Unity' | 'Unreal Engine' | 'Godot' | 'Custom'

export interface DLC {
  id:             string
  title:          string
  description:    string
  price:          number
  stripePriceId:  string   // Set in Stripe dashboard, add here when ready
  downloadUrl?:   string   // Populated once DLC is shipped
  releaseYear?:   string
}

export interface Game {
  id:              string
  title:           string
  genre:           string
  description:     string
  longDescription?: string
  status:          GameStatus
  platforms:       Platform[]
  price:           number | null   // null = TBD, 0 = free
  stripePriceId:   string | null   // Set in Stripe dashboard, add here when ready
  downloadUrl:     string | null   // Direct download link once shipped
  steamUrl:        string | null
  directUrl:       string | null   // Legacy — now handled via Stripe
  featured:        boolean
  icon:            string
  artGradient:     string
  engine:          Engine
  releaseYear?:    string
  tags?:           string[]
  dlcs?:           DLC[]
}

export const games: Game[] = [
  {
    id:            'racing-01',
    title:         'Untitled Racing Title',
    genre:         'Arcade Racing',
    description:   'A precision arcade racer built on a modular vehicle physics system. Clean mechanics, tight controls, no bloat.',
    longDescription: 'Designed around a decoupled physics engine where every vehicle component — suspension, tyres, drivetrain, aerodynamics — is an independent module. This lets us tune aggressively, add content post-launch, and maintain the codebase without regression hell. No damage model gimmicks. Just racing.',
    status:        'in-development',
    platforms:     ['windows', 'mac'],
    price:         null,
    stripePriceId: null,  // Add Stripe price ID here once game is ready for sale
    downloadUrl:   null,
    steamUrl:      null,
    directUrl:     null,
    featured:      true,
    icon:          '🏎️',
    artGradient:   'linear-gradient(135deg, #1a0d0a 0%, #1C1C1C 100%)',
    engine:        'Unity',
    tags:          ['racing', 'arcade', 'physics', 'multiplayer-planned'],
    dlcs:          [], // Add DLCs here when the base game ships
  },
  {
    id:            'puzzle-01',
    title:         'Module Protocol',
    genre:         'Puzzle / Strategy',
    description:   'A puzzle game where mechanics mirror real software system design. Build, connect, and debug modular systems to solve increasingly complex problems.',
    longDescription: 'Module Protocol turns software architecture into gameplay. Each level presents a broken or incomplete system. You design, wire, and test modular components to make it run. Difficulty scales from introductory logic gates to distributed system design patterns.',
    status:        'concept',
    platforms:     ['windows'],
    price:         null,
    stripePriceId: null,
    downloadUrl:   null,
    steamUrl:      null,
    directUrl:     null,
    featured:      false,
    icon:          '🧩',
    artGradient:   'linear-gradient(135deg, #0a1220 0%, #1C1C1C 100%)',
    engine:        'Unity',
    tags:          ['puzzle', 'strategy', 'systems'],
    dlcs:          [],
  },
  {
    id:            'roguelike-01',
    title:         'TBA',
    genre:         'Action Roguelike',
    description:   'A fast roguelike with modular level generation. Every run assembled from independent, swappable components at runtime. Fast. Brutal. Replayable.',
    longDescription: 'Each run generates a unique structure from a pool of independently authored modules — combat arenas, traversal sections, boss encounters, and loot rooms. Nothing is hand-placed at runtime. Everything is authored separately and composed dynamically.',
    status:        'in-development',
    platforms:     ['windows', 'linux'],
    price:         null,
    stripePriceId: null,
    downloadUrl:   null,
    steamUrl:      null,
    directUrl:     null,
    featured:      false,
    icon:          '⚡',
    artGradient:   'linear-gradient(135deg, #0f1510 0%, #1C1C1C 100%)',
    engine:        'Unity',
    tags:          ['roguelike', 'action', 'procedural'],
    dlcs:          [],
  },
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