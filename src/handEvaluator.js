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

  // Priorité 3 : Couleur (Flush) - vérifier si toutes les cartes ont la même couleur
  const premiereCouleur = cartes[0].color
  const toutesMemeCouleur = cartes.every(carte => carte.color === premiereCouleur)
  
  if (toutesMemeCouleur) {
    // Trier les rangs par ordre décroissant
    const rangs = cartes.map(c => c.rank).sort((a, b) => b - a)
    return {
      categorie: 'Couleur',
      rangs
    }
  }

  // Priorité 4 : Suite (Straight) - 5 cartes consécutives
  const rangsTries = cartes.map(c => c.rank).sort((a, b) => a - b) // Tri croissant
  let estSuite = true
  
  // Vérifier si les rangs sont consécutifs
  for (let i = 0; i < rangsTries.length - 1; i++) {
    if (rangsTries[i + 1] - rangsTries[i] !== 1) {
      estSuite = false
      break
    }
  }
  
  // Cas spécial : A-2-3-4-5 (wheel - As bas)
  const estWheel = rangsTries[0] === 2 && rangsTries[1] === 3 && rangsTries[2] === 4 && rangsTries[3] === 5 && rangsTries[4] === 14
  
  if (estSuite || estWheel) {
    const hauteur = estWheel ? 5 : rangsTries[4] // Wheel = 5-high, sinon carte la plus haute
    return {
      categorie: 'Suite',
      hauteur
    }
  }

  // Priorité 5 : Brelan
  if (brelanTrouve !== null) {
    return {
      categorie: 'Brelan',
      rangBrelan: brelanTrouve
    }
  }

  // Priorité 5 : Double Paire
  if (pairesTrouvees.length === 2) {
    pairesTrouvees.sort((a, b) => b - a)

    return {
      categorie: 'DoublePaire',
      rangsPaires: pairesTrouvees
    }
  }

  // Priorité 6 : Paire
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