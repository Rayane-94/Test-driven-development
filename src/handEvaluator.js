// Évalue une main de 5 cartes et retourne sa catégorie
export function evaluateHand(cartes) {
  // Étape 1 : Compter combien de fois chaque rang apparaît
  const compteur = {}

  for (const carte of cartes) {
    const rang = carte.rank

    if (compteur[rang]) {
      compteur[rang] = compteur[rang] + 1
    } else {
      compteur[rang] = 1
    }
  }

  // Étape 2 : Analyser les compteurs
  let brelanTrouve = null
  const pairesTrouvees = []

  for (const rang in compteur) {
    const nombre = compteur[rang]

    // Brelan (3 cartes identiques) - on mémorise
    if (nombre === 3) {
      brelanTrouve = Number(rang)
    }

    // Paire (2 cartes identiques) - on stocke toutes les paires
    if (nombre === 2) {
      pairesTrouvees.push(Number(rang))
    }
  }

  // Priorité : Brelan
  if (brelanTrouve !== null) {
    return {
      categorie: 'Brelan',
      rangBrelan: brelanTrouve
    }
  }

  // Double paire
  if (pairesTrouvees.length === 2) {
    // Pour que ce soit déterministe: plus grande paire d'abord
    pairesTrouvees.sort((a, b) => b - a)

    return {
      categorie: 'DoublePaire',
      rangsPaires: pairesTrouvees
    }
  }

  // Paire simple
  if (pairesTrouvees.length === 1) {
    return {
      categorie: 'Paire',
      rangPaire: pairesTrouvees[0]
    }
  }

  // Aucune combinaison trouvée
  return null
}