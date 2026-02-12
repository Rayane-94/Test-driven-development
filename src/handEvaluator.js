// Évalue une main de 5 cartes et retourne sa catégorie
export function evaluateHand(cartes) {
  // Étape 1 : Compter combien de fois chaque rang apparaît
  const compteur = {}

  for (const carte of cartes) {
    const rang = carte.rank

    compteur[rang] = (compteur[rang] || 0) + 1

  }

  // Étape 2 : Analyser les compteurs
  let brelanTrouve = null
  const pairesTrouvees = []

  for (const rang in compteur) {
    const nombre = compteur[rang]

    if (nombre === 3) {
      brelanTrouve = Number(rang)
    }

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