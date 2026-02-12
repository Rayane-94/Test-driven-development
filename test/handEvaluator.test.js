import { describe, it, expect } from 'vitest'
import { evaluateHand } from '../src/handEvaluator.js'
import { parseCard } from '../src/card.js'

describe('Évaluateur de main - Paire', () => {
  it('devrait détecter une paire de rois', () => {
<<<<<<< HEAD

=======
    // Cartes: Roi de Cœur, Roi de Pique, 5 de Trèfle, 8 de Carreau (noté D pour diamant), 2 de Cœur
>>>>>>> 0db84dace1a78e5991ef9121f9046e1823d39c77
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

describe('Évaluateur de main - Brelan', () => {
  it('devrait détecter un brelan de 7', () => {
    // Main: 7-7-7-A-2 (trois 7)
    const cartes = [
      parseCard('7C'),  // 7 de Cœur
      parseCard('7D'),  // 7 de Diamant
      parseCard('7P'),  // 7 de Pique
      parseCard('AC'),  // As de Cœur
      parseCard('2T')   // 2 de Trèfle
    ]
    
    const resultat = evaluateHand(cartes)
    
    expect(resultat.categorie).toBe('Brelan')
    expect(resultat.rangBrelan).toBe(7) // 7 = 7
  })
})
