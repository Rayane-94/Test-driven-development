import { describe, it, expect } from 'vitest'
import { findBestHand } from '../src/bestHand.js'
import { parseCard } from '../src/card.js'

describe('Meilleure main de 7 cartes', () => {

  it('devrait trouver un brelan de 7 parmi 7 cartes', () => {
    // Board : 7-7-7-A-K (brelan de 7 sur le board)
    const board = [
      parseCard('7C'),
      parseCard('7D'),
      parseCard('7P'),
      parseCard('AC'),
      parseCard('RT')
    ]
    
    // Hole cards : 2-3 (cartes du joueur)
    const holeCards = [
      parseCard('2C'),
      parseCard('3D')
    ]

    const resultat = findBestHand(board, holeCards)

    expect(resultat.categorie).toBe('Brelan')
    expect(resultat.rangBrelan).toBe(7)
  })

})
