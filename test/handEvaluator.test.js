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

})

describe('Évaluateur de main - Brelan', () => {

  it('devrait détecter un brelan de 7', () => {

    const cartes = [
      parseCard('7C'),
      parseCard('7D'),
      parseCard('7P'),
      parseCard('AC'),
      parseCard('2T')
    ]
    
    const resultat = evaluateHand(cartes)
    
    expect(resultat.categorie).toBe('Brelan')
    expect(resultat.rangBrelan).toBe(7)
  })

})

describe('Évaluateur de main - Double Paire', () => {

  it('devrait détecter deux paires (Rois et 5)', () => {

    const cartes = [
      parseCard('RC'),
      parseCard('RP'),
      parseCard('5T'),
      parseCard('5D'),
      parseCard('2C')
    ]

    const resultat = evaluateHand(cartes)

    expect(resultat.categorie).toBe('DoublePaire')
    expect(resultat.rangsPaires).toEqual([13, 5])
  })

})

describe('Évaluateur de main - Carré', () => {

  it('devrait détecter un carré de 9', () => {

    const cartes = [
      parseCard('9C'),
      parseCard('9D'),
      parseCard('9P'),
      parseCard('9T'),
      parseCard('AC')
    ]

    const resultat = evaluateHand(cartes)

    expect(resultat.categorie).toBe('Carre')
    expect(resultat.rangCarre).toBe(9)
  })

})

describe('Validation des cartes en double', () => {

  it('devrait détecter des cartes en double (invalide)', () => {

    const cartes = [
      parseCard('RC'),
      parseCard('RC'),
      parseCard('5T'),
      parseCard('8D'),
      parseCard('2C')
    ]

    expect(() => evaluateHand(cartes)).toThrow('Cartes en double détectées')
  })

})

describe('Évaluateur de main - Couleur (Flush)', () => {

  it('devrait détecter une couleur à Cœur', () => {
    // Main: A-T-7-4-2 tous Cœur = Couleur
    const cartes = [
      parseCard('AC'),  // As de Cœur
      parseCard('TC'),  // 10 de Cœur
      parseCard('7C'),  // 7 de Cœur
      parseCard('4C'),  // 4 de Cœur
      parseCard('2C')   // 2 de Cœur
    ]

    const resultat = evaluateHand(cartes)

    expect(resultat.categorie).toBe('Couleur')
    // Les rangs en ordre décroissant : A(14), T(10), 7, 4, 2
    expect(resultat.rangs).toEqual([14, 10, 7, 4, 2])
  })

})

describe('Évaluateur de main - Full House', () => {

  it('devrait détecter un full aux Rois par les 8', () => {
    // Main: R-R-R-8-8 (Brelan de Rois + Paire de 8)
    const cartes = [
      parseCard('RC'),  // Roi de Cœur
      parseCard('RP'),  // Roi de Pique
      parseCard('RD'),  // Roi de Diamant
      parseCard('8C'),  // 8 de Cœur
      parseCard('8T')   // 8 de Trèfle
    ]

    const resultat = evaluateHand(cartes)

    expect(resultat.categorie).toBe('FullHouse')
    expect(resultat.rangBrelan).toBe(13) // Roi = 13
    expect(resultat.rangPaire).toBe(8)   // 8 = 8
  })

})

describe('Évaluateur de main - Carte haute', () => {

  it('devrait retourner la carte haute avec les rangs triés', () => {
    // Main: A-K-9-5-2 (aucune combinaison)
    const cartes = [
      parseCard('AC'),  // As de Cœur
      parseCard('RP'),  // Roi de Pique
      parseCard('9T'),  // 9 de Trèfle
      parseCard('5D'),  // 5 de Diamant
      parseCard('2C')   // 2 de Cœur
    ]

    const resultat = evaluateHand(cartes)

    expect(resultat.categorie).toBe('CarteHaute')
    // Rangs en ordre décroissant : A(14), R(13), 9, 5, 2
    expect(resultat.rangs).toEqual([14, 13, 9, 5, 2])
  })

})
