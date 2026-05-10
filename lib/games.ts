export type GameStatus = 'available' | 'in-development' | 'concept' | 'coming-soon'
export type Platform   = 'windows' | 'mac' | 'linux'
export type Engine     = 'Unity' | 'Unreal Engine' | 'Godot' | 'Custom'

export interface Game {
  id:              string
  title:           string
  genre:           string
  description:     string
  longDescription?: string
  status:          GameStatus
  platforms:       Platform[]
  price:           number | null      // null = TBD, 0 = free
  steamUrl:        string | null      // null until live
  directUrl:       string | null      // null until live
  featured:        boolean
  icon:            string             // emoji placeholder until real cover art
  artGradient:     string             // inline CSS gradient for card bg
  engine:          Engine
  releaseYear?:    string
  tags?:           string[]
}

export const games: Game[] = [
  {
    id:          'racing-01',
    title:       'Untitled Racing Title',
    genre:       'Arcade Racing',
    description: 'A precision arcade racer built on a modular vehicle physics system. Clean mechanics, tight controls, no bloat. The system is architected to extend — new cars, tracks, and modes slot in without rewiring everything.',
    longDescription: 'Designed around a decoupled physics engine where every vehicle component — suspension, tyres, drivetrain, aerodynamics — is an independent module. This lets us tune aggressively, add content post-launch, and maintain the codebase without regression hell. No damage model gimmicks. Just racing.',
    status:      'in-development',
    platforms:   ['windows', 'mac'],
    price:       null,
    steamUrl:    null,
    directUrl:   null,
    featured:    true,
    icon:        '🏎️',
    artGradient: 'linear-gradient(135deg, #1a0d0a 0%, #1C1C1C 100%)',
    engine:      'Unity',
    tags:        ['racing', 'arcade', 'physics', 'multiplayer-planned'],
  },
  {
    id:          'puzzle-01',
    title:       'Module Protocol',
    genre:       'Puzzle / Strategy',
    description: 'A puzzle game where mechanics mirror real software system design. Build, connect, and debug modular systems to solve increasingly complex problems.',
    status:      'concept',
    platforms:   ['windows'],
    price:       null,
    steamUrl:    null,
    directUrl:   null,
    featured:    false,
    icon:        '🧩',
    artGradient: 'linear-gradient(135deg, #0a1220 0%, #1C1C1C 100%)',
    engine:      'Unity',
    tags:        ['puzzle', 'strategy', 'systems'],
  },
  {
    id:          'roguelike-01',
    title:       'TBA',
    genre:       'Action Roguelike',
    description: 'A fast roguelike with modular level generation. Every run assembled from independent, swappable components at runtime. Fast. Brutal. Replayable.',
    status:      'in-development',
    platforms:   ['windows', 'linux'],
    price:       null,
    steamUrl:    null,
    directUrl:   null,
    featured:    false,
    icon:        '⚡',
    artGradient: 'linear-gradient(135deg, #0f1510 0%, #1C1C1C 100%)',
    engine:      'Unity',
    tags:        ['roguelike', 'action', 'procedural'],
  },
]

export const featuredGame = games.find(g => g.featured) ?? games[0]

export function getGamesByStatus(status: GameStatus): Game[] {
  return games.filter(g => g.status === status)
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
