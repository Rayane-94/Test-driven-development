import { describe, it, expect } from 'vitest'
import { compareHands } from '../src/compareHands.js'

describe('Comparaison de mains - Tie-breaks', () => {

  it('devrait comparer deux paires (Rois > Dames)', () => {
    const mainRois = {
      categorie: 'Paire',
      rangPaire: 13  // Roi = 13
    }
    
    const mainDames = {
      categorie: 'Paire',
      rangPaire: 12  // Dame = 12
    }

    const resultat = compareHands(mainRois, mainDames)

    // Retourne 1 si main1 gagne, -1 si main2 gagne, 0 si égalité
    expect(resultat).toBe(1)  // mainRois gagne
  })

})
