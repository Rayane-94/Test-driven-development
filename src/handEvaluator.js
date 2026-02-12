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
  
  // Étape 2 : Analyser les compteurs (une seule boucle)
  let paireTrouvee = null
  
  for (const rang in compteur) {
    const nombre = compteur[rang]
    
    // Brelan (3 cartes identiques) - on retourne directement
    if (nombre === 3) {
      return {
        categorie: 'Brelan',
        rangBrelan: Number(rang)
      }
    }
    
    // Paire (2 cartes identiques) - on mémorise
    if (nombre === 2) {
      paireTrouvee = Number(rang)
    }
  }
  
  // Si on a trouvé une paire, on la retourne
  if (paireTrouvee !== null) {
    return {
      categorie: 'Paire',
      rangPaire: paireTrouvee
    }
  }
  
  // Aucune combinaison trouvée
  return null
}
