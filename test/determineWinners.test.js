// test/determineWinners.test.js
import { describe, it, expect, vi } from 'vitest'
import { determineWinners } from '../src/determineWinners.js'

describe('determineWinners', () => {
  it('retourne un seul gagnant (2 joueurs)', () => {
    const board = ['BOARD'] // peu importe pour ce test
    const players = [
      { id: 'p1', holeCards: ['A', 'B'] },
      { id: 'p2', holeCards: ['C', 'D'] }
    ]

    // p1 a une main "plus forte" que p2 selon tiebreak[0]
    const findBestHand = vi.fn()
      .mockReturnValueOnce({ categorie: 'CarteHaute', tiebreak: [10] }) // p1
      .mockReturnValueOnce({ categorie: 'CarteHaute', tiebreak: [8] })  // p2

    const compareHands = vi.fn((h1, h2) => {
      if (h1.tiebreak[0] > h2.tiebreak[0]) return 1
      if (h1.tiebreak[0] < h2.tiebreak[0]) return -1
      return 0
    })

    const result = determineWinners(board, players, { findBestHand, compareHands })

    expect(result.winners).toEqual(['p1'])
    expect(result.results).toHaveLength(2)

    // vérifie qu'on a bien appelé findBestHand pour chaque joueur
    expect(findBestHand).toHaveBeenCalledTimes(2)
    expect(findBestHand).toHaveBeenNthCalledWith(1, board, players[0].holeCards)
    expect(findBestHand).toHaveBeenNthCalledWith(2, board, players[1].holeCards)
  })

  it('retourne plusieurs gagnants en cas d’égalité (split)', () => {
    const board = ['BOARD']
    const players = [
      { id: 'p1', holeCards: ['A', 'B'] },
      { id: 'p2', holeCards: ['C', 'D'] }
    ]

    const findBestHand = vi.fn()
      .mockReturnValueOnce({ categorie: 'Suite', tiebreak: [9] }) // p1
      .mockReturnValueOnce({ categorie: 'Suite', tiebreak: [9] }) // p2

    // tout le monde est à égalité
    const compareHands = vi.fn(() => 0)

    const result = determineWinners(board, players, { findBestHand, compareHands })

    expect(result.winners).toEqual(['p1', 'p2'])
    expect(result.results).toHaveLength(2)
  })

  it('fonctionne avec 3 joueurs (un gagnant)', () => {
    const board = ['BOARD']
    const players = [
      { id: 'p1', holeCards: ['A', 'B'] },
      { id: 'p2', holeCards: ['C', 'D'] },
      { id: 'p3', holeCards: ['E', 'F'] }
    ]

    const findBestHand = vi.fn()
      .mockReturnValueOnce({ categorie: 'CarteHaute', tiebreak: [8] })   // p1
      .mockReturnValueOnce({ categorie: 'CarteHaute', tiebreak: [12] })  // p2 (meilleur)
      .mockReturnValueOnce({ categorie: 'CarteHaute', tiebreak: [9] })   // p3

    const compareHands = vi.fn((h1, h2) => {
      if (h1.tiebreak[0] > h2.tiebreak[0]) return 1
      if (h1.tiebreak[0] < h2.tiebreak[0]) return -1
      return 0
    })

    const result = determineWinners(board, players, { findBestHand, compareHands })

    expect(result.winners).toEqual(['p2'])
    expect(result.results).toHaveLength(3)
  })

  it('retourne plusieurs gagnants si les meilleurs sont ex æquo (3 joueurs)', () => {
    const board = ['BOARD']
    const players = [
      { id: 'p1', holeCards: ['A', 'B'] },
      { id: 'p2', holeCards: ['C', 'D'] },
      { id: 'p3', holeCards: ['E', 'F'] }
    ]

    const findBestHand = vi.fn()
      .mockReturnValueOnce({ categorie: 'CarteHaute', tiebreak: [12] }) // p1 (meilleur)
      .mockReturnValueOnce({ categorie: 'CarteHaute', tiebreak: [12] }) // p2 (meilleur)
      .mockReturnValueOnce({ categorie: 'CarteHaute', tiebreak: [9] })  // p3

    const compareHands = vi.fn((h1, h2) => {
      if (h1.tiebreak[0] > h2.tiebreak[0]) return 1
      if (h1.tiebreak[0] < h2.tiebreak[0]) return -1
      return 0
    })

    const result = determineWinners(board, players, { findBestHand, compareHands })

    expect(result.winners).toEqual(['p1', 'p2'])
    expect(result.results).toHaveLength(3)
  })

  it('gère le cas "board plays" (égalité)', () => {
    const board = ['BOARD']
    const players = [
      { id: 'p1', holeCards: ['A', 'A'] },
      { id: 'p2', holeCards: ['K', 'Q'] }
    ]

    // On simule que findBestHand retourne exactement la même main pour les deux
    const shared = { categorie: 'Suite', tiebreak: [9], chosen5: ['9', '8', '7', '6', '5'] }

    const findBestHand = vi.fn()
      .mockReturnValueOnce(shared)
      .mockReturnValueOnce(shared)

    const compareHands = vi.fn(() => 0)

    const result = determineWinners(board, players, { findBestHand, compareHands })

    expect(result.winners).toEqual(['p1', 'p2'])
  })
})