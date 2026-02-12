import { describe, it, expect } from 'vitest'
import { evaluateHand } from '../src/handEvaluator.js'
import { parseCard } from '../src/card.js'

describe('Évaluateur de main - Paire', () => {
  it('devrait détecter une paire de rois', () => {

    const cartes = [
      parseCard('RC'),
      parseCard('RP'),
      parseCard('5T'),
      parseCard('8D'),
      parseCard('2C')
    ]
    
    const resultat = evaluateHand(cartes)
    
    expect(resultat.categorie).toBe('Paire')
    expect(resultat.rangPaire).toBe(13)
  })

  it('devrait retourner null si aucune paire', () => {
    const cartes = [
      parseCard('AC'),
      parseCard('7P'),
      parseCard('5T'),
      parseCard('8D'),
      parseCard('2C')
    ]
  
    const resultat = evaluateHand(cartes)
  
    expect(resultat).toBeNull()
  })


})
