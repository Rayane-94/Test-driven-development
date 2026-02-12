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

describe('Évaluateur de main - Carte haute', () => {
  it('devrait retourner CarteHaute avec les rangs triés', () => {
    const cartes = [
      parseCard('AC'),
      parseCard('7P'),
      parseCard('5T'),
      parseCard('8D'),
      parseCard('2C')
    ]

    const resultat = evaluateHand(cartes)

    expect(resultat.categorie).toBe('CarteHaute')
    expect(resultat.rangs).toEqual([14, 8, 7, 5, 2])
  })
})