function trierParRangDesc(cartes) {
  return [...cartes].sort((a, b) => b.rank - a.rank)
}

function groupesParRang(cartes) {
  const groups = {}
  for (const c of cartes) {
    const r = c.rank
    if (!groups[r]) groups[r] = []
    groups[r].push(c)
  }
  return groups
}

function chosen5Suite(cartes, estWheel) {
  if (!estWheel) {
    // ordre du plus haut au plus bas
    return trierParRangDesc(cartes)
  }
  // wheel: 5,4,3,2,A (A = 14)
  const ordre = [5, 4, 3, 2, 14]
  return ordre.map(r => cartes.find(c => c.rank === r))
}

// Évalue une main de 5 cartes et retourne sa catégorie + chosen5
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

  const groups = groupesParRang(cartes)

  // Vérifier couleur et suite une seule fois
  const premiereCouleur = cartes[0].color
  const estCouleur = cartes.every(carte => carte.color === premiereCouleur)

  const rangsTries = cartes.map(c => c.rank).sort((a, b) => a - b)

  // Suite robuste (5 rangs distincts)
  const rangsUniques = [...new Set(rangsTries)]
  let estSuite = false

  if (rangsUniques.length === 5) {
    estSuite = true
    for (let i = 0; i < rangsUniques.length - 1; i++) {
      if (rangsUniques[i + 1] - rangsUniques[i] !== 1) {
        estSuite = false
        break
      }
    }
  }

  const estWheel =
    rangsUniques.length === 5 &&
    rangsUniques[0] === 2 &&
    rangsUniques[1] === 3 &&
    rangsUniques[2] === 4 &&
    rangsUniques[3] === 5 &&
    rangsUniques[4] === 14

  // Priorité 1 : Quinte Flush (Suite + Couleur)
  if (estCouleur && (estSuite || estWheel)) {
    const hauteur = estWheel ? 5 : rangsUniques[4]
    return {
      categorie: 'QuinteFlush',
      hauteur,
      chosen5: chosen5Suite(cartes, estWheel)
    }
  }

  // Priorité 2 : Carré
  if (carreTrouve !== null) {
    const quads = groups[carreTrouve] // 4 cartes
    const kicker = trierParRangDesc(cartes.filter(c => c.rank !== carreTrouve))[0]
    return {
      categorie: 'Carre',
      rangCarre: carreTrouve,
      chosen5: [...quads, kicker]
    }
  }

  // Priorité 3 : Full House (3 + 2)
  if (brelanTrouve !== null && pairesTrouvees.length === 1) {
    const paire = pairesTrouvees[0]
    return {
      categorie: 'FullHouse',
      rangBrelan: brelanTrouve,
      rangPaire: paire,
      chosen5: [...groups[brelanTrouve], ...groups[paire]]
    }
  }

  // Priorité 4 : Couleur (Flush)
  if (estCouleur) {
    const chosen5 = trierParRangDesc(cartes)
    const rangs = chosen5.map(c => c.rank)
    return {
      categorie: 'Couleur',
      rangs,
      chosen5
    }
  }

  // Priorité 5 : Suite (Straight)
  if (estSuite || estWheel) {
    const hauteur = estWheel ? 5 : rangsUniques[4]
    return {
      categorie: 'Suite',
      hauteur,
      chosen5: chosen5Suite(cartes, estWheel)
    }
  }

  // Priorité 6 : Brelan
  if (brelanTrouve !== null) {
    const kickers = trierParRangDesc(cartes.filter(c => c.rank !== brelanTrouve))
    return {
      categorie: 'Brelan',
      rangBrelan: brelanTrouve,
      chosen5: [...groups[brelanTrouve], ...kickers]
    }
  }

  // Priorité 7 : Double Paire
  if (pairesTrouvees.length === 2) {
    pairesTrouvees.sort((a, b) => b - a)
    const high = pairesTrouvees[0]
    const low = pairesTrouvees[1]
    const kicker = trierParRangDesc(cartes.filter(c => c.rank !== high && c.rank !== low))[0]

    return {
      categorie: 'DoublePaire',
      rangsPaires: pairesTrouvees,
      chosen5: [...groups[high], ...groups[low], kicker]
    }
  }

  // Priorité 8 : Paire
  if (pairesTrouvees.length === 1) {
    const paire = pairesTrouvees[0]
    const kickers = trierParRangDesc(cartes.filter(c => c.rank !== paire))

    return {
      categorie: 'Paire',
      rangPaire: paire,
      chosen5: [...groups[paire], ...kickers]
    }
  }

  // Priorité 9 : Carte haute (par défaut)
  const chosen5 = trierParRangDesc(cartes)
  const rangs = chosen5.map(c => c.rank)

  return {
    categorie: 'CarteHaute',
    rangs,
    chosen5
  }
}