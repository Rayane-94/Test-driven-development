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
  
  // Étape 2 : Chercher une paire (2 cartes du même rang)
  for (const rang in compteur) {
    const nombre = compteur[rang]
    
    if (nombre === 2) {
      return {
        categorie: 'Paire',
        rangPaire: Number(rang)
      }
    }
  }
  
  // Aucune paire trouvée
  return null
}
