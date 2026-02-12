// Ordre des catégories (plus grand = plus fort)
const ORDRE_CATEGORIES = {
  'QuinteFlush': 9,
  'Carre': 8,
  'FullHouse': 7,
  'Couleur': 6,
  'Suite': 5,
  'Brelan': 4,
  'DoublePaire': 3,
  'Paire': 2,
  'CarteHaute': 1
}

// Compare deux mains et retourne le gagnant
// Retourne : 1 si main1 gagne, -1 si main2 gagne, 0 si égalité
export function compareHands(main1, main2) {
  // Comparer les catégories d'abord
  const force1 = ORDRE_CATEGORIES[main1.categorie]
  const force2 = ORDRE_CATEGORIES[main2.categorie]
  
  if (force1 !== force2) {
    return force1 > force2 ? 1 : -1
  }
  
  // Même catégorie : comparer le rang principal
  const proprietes = ['rangCarre', 'rangBrelan', 'rangPaire', 'hauteur']
  
  for (const prop of proprietes) {
    if (main1[prop] !== undefined && main2[prop] !== undefined) {
      if (main1[prop] > main2[prop]) return 1
      if (main1[prop] < main2[prop]) return -1
    }
  }
  
  return 0
}
