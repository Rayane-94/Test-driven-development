// Évalue une main de 5 cartes et retourne sa catégorie
export function evaluateHand(cartes) {
  // Validation : vérifier qu'il n'y a pas de cartes en double
  const cartesVues = new Set()
  
  for (const carte of cartes) {
    const carteCle = carte.card // Ex: "RC", "7D", etc.
    
    if (cartesVues.has(carteCle)) {
      throw new Error('Cartes en double détectées')
    }
    
    cartesVues.add(carteCle)
  }

  // Étape 1 : Compter combien de fois chaque rang apparaît
  const compteur = {}

  for (const carte of cartes) {
    const rang = carte.rank
    compteur[rang] = (compteur[rang] || 0) + 1
  }

  // Étape 2 : Analyser les compteurs
  let carreTrouve = null
  let brelanTrouve = null
  const pairesTrouvees = []

  for (const rang in compteur) {
    const nombre = compteur[rang]

    if (nombre === 4) {
      carreTrouve = Number(rang)
    }

    if (nombre === 3) {
      brelanTrouve = Number(rang)
    }

    if (nombre === 2) {
      pairesTrouvees.push(Number(rang))
    }
  }

  // Priorité 1 : Carré
  if (carreTrouve !== null) {
    return {
      categorie: 'Carre',
      rangCarre: carreTrouve
    }
  }

  // Priorité 2 : Full House (3 + 2)
  if (brelanTrouve !== null && pairesTrouvees.length === 1) {
    return {
      categorie: 'FullHouse',
      rangBrelan: brelanTrouve,
      rangPaire: pairesTrouvees[0]
    }
  }

  // Priorité 3 : Brelan
  if (brelanTrouve !== null) {
    return {
      categorie: 'Brelan',
      rangBrelan: brelanTrouve
    }
  }

  // Priorité 4 : Double Paire
  if (pairesTrouvees.length === 2) {
    pairesTrouvees.sort((a, b) => b - a)

    return {
      categorie: 'DoublePaire',
      rangsPaires: pairesTrouvees
    }
  }

  // Priorité 5 : Paire
  if (pairesTrouvees.length === 1) {
    return {
      categorie: 'Paire',
      rangPaire: pairesTrouvees[0]
    }
  }

  // Carte haute (par défaut)
  const rangs = cartes.map(c => c.rank).sort((a, b) => b - a)

  return {
    categorie: 'CarteHaute',
    rangs
  }

}