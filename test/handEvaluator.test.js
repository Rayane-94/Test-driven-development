import { describe, it, expect } from 'vitest'
import { evaluateHand } from '../src/handEvaluator.js'
import { parseCard } from '../src/card.js'

describe('Évaluateur de main - Paire', () => {
  it('devrait détecter une paire de rois', () => {
    // Cartes: Roi de Cœur, Roi de Pique, 5 de Trèfle, 8 de Carreau, 2 de Cœur
    const cartes = [
      parseCard('RC'),
      parseCard('RP'),
      parseCard('5T'),
      parseCard('8K'),
      parseCard('2C')
    ]
    
    const resultat = evaluateHand(cartes)
    
    expect(resultat.categorie).toBe('Paire')
    expect(resultat.rangPaire).toBe(13) // Roi = 13
  })
})
