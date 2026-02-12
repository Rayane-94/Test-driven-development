import { evaluateHand } from './handEvaluator.js'

// Génère toutes les combinaisons de 5 cartes parmi 7
function genererCombinaisonsDe5(cartes) {
  const combinaisons = []
  
  // Parcourir toutes les combinaisons possibles de 5 parmi 7
  for (let i = 0; i < cartes.length; i++) {
    for (let j = i + 1; j < cartes.length; j++) {
      for (let k = j + 1; k < cartes.length; k++) {
        for (let l = k + 1; l < cartes.length; l++) {
          for (let m = l + 1; m < cartes.length; m++) {
            combinaisons.push([cartes[i], cartes[j], cartes[k], cartes[l], cartes[m]])
          }
        }
      }
    }
  }
  
  return combinaisons
}

// Trouve la meilleure main de 5 cartes parmi 7 cartes disponibles
export function findBestHand(board, holeCards) {
  // Combiner toutes les cartes (board + hole cards)
  const toutesLesCartes = [...board, ...holeCards]
  
  // Générer toutes les combinaisons de 5 parmi 7 (21 combinaisons)
  const combinaisons = genererCombinaisonsDe5(toutesLesCartes)
  
  // Évaluer chaque combinaison
  let meilleurMain = null
  
  for (const combinaison of combinaisons) {
    const evaluation = evaluateHand(combinaison)
    
    // Pour l'instant, on garde la première main valide trouvée
    // (on ajoutera la comparaison plus tard)
    if (evaluation !== null && meilleurMain === null) {
      meilleurMain = evaluation
    }
  }
  
  return meilleurMain
}
