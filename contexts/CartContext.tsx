'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react'

export interface CartItem {
  id:           string
  type:         'game' | 'dlc'
  title:        string
  price:        number
  paddlePriceId: string
  icon:         string
  artGradient:  string
}

interface CartContextValue {
  items:       CartItem[]
  itemCount:   number
  total:       number
  addItem:     (item: CartItem) => void
  removeItem:  (id: string) => void
  hasItem:     (id: string) => boolean
  clearCart:   () => void
  isOpen:      boolean
  openCart:    () => void
  closeCart:   () => void
}

const CartContext = createContext<CartContextValue | null>(null)
const STORAGE_KEY = 'speedline-cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items,  setItems]  = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setItems(JSON.parse(stored))
    } catch { /* ignore */ }
  }, [])

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = useCallback((item: CartItem) => {
    setItems(prev => {
      if (prev.some(i => i.id === item.id)) return prev
      return [...prev, item]
    })
    setIsOpen(true)
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const hasItem = useCallback((id: string) => {
    return items.some(i => i.id === id)
  }, [items])

  const clearCart = useCallback(() => setItems([]), [])

  const openCart  = useCallback(() => setIsOpen(true),  [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const itemCount = items.length
  const total     = items.reduce((sum, i) => sum + i.price, 0)

  return (
    <CartContext.Provider value={{
      items, itemCount, total,
      addItem, removeItem, hasItem, clearCart,
      isOpen, openCart, closeCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}