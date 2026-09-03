/**
 * Étape 1 : les modèles.
 *
 * Les objets du jeu : une commande, un coursier, et deux types de coursiers.
 * Rien ici ne connaît la carte ni l'écran.
 *
 * Vocabulaire :
 *   une position  un objet {x, y}, x = colonne, y = ligne, depuis 0
 *   un chemin     une liste de positions à parcourir
 *
 * Les détails sont en section 7 du sujet. Les tests qui vont avec :
 * tests/test_1_modeles.js
 */

/** Vrai si `position` est bien un {x, y} avec deux entiers positifs. Fournie. */
export function estUnePosition(position) {
  return (
    position !== null &&
    typeof position === "object" &&
    Number.isInteger(position.x) &&
    Number.isInteger(position.y) &&
    position.x >= 0 &&
    position.y >= 0
  );
}

export class Commande {
  /**
   * id           entier strictement positif
   * destination  une position {x, y}, COPIÉE
   * pizzas       tableau non vide de noms de pizzas, COPIÉ
   * creeeAu      le tour d'arrivée de la commande, 0 par défaut
   *
   * Range aussi this.livreeAu à null : elle n'est pas encore livrée.
   * Lève une Error si l'id, la destination ou la liste de pizzas ne va pas.
   */
  constructor(id, destination, pizzas, creeeAu = 0) {
    // TODO etape 1 : ecrire le constructeur de Commande
    
    this.id = id ;
    if (this.id <= 0) {  
        throw new Error ("L'id n'est pas un entier strictement positif")
     }
    if (Number.isInteger(this.id) == false) {
       throw new Error ("L'id n'est pas un entier")
    } ;

    if (estUnePosition(destination)) {
          this.destination = structuredClone(destination) ;
    }
    else {
      throw new Error ("La destination n'est pas une postition valide")
    }

    this.pizzas = structuredClone(pizzas) ;

    if (this.pizzas.length === 0 ) {
      throw new Error ("Le nombre de pizza dans une commande ne peut pas être 0")
    }

    this.creeeAu = creeeAu ;
    this.livreeAu = null ;

    //throw new Error("etape 1 : le constructeur de Commande");
  }

  /** Le nombre de pizzas de la commande. */
  get nbPizzas() {
    // // TODO etape 1 : ecrire Commande.nbPizzas
    // // recuperer le nombre d'elements du tableau pizzas
    return this.pizzas.length
    // throw new Error("etape 1 : Commande.nbPizzas");
  }

  /** Exactement : "Commande #3 : 2 pizzas pour (4, 7)", et "1 pizza" au singulier. */
  toString() {
    // // TODO etape 1 : ecrire Commande.toString
    if (this.nbPizzas ==1) {
    return `Commande #${this.id} : 1 pizza pour (${this.destination.x}, ${this.destination.y})`
    } 
    else {
    return `Commande #${this.id} : ${this.nbPizzas} pizzas pour (${this.destination.x}, ${this.destination.y})`;
    }
    throw new Error("etape 1 : Commande.toString");
  }
}

export class Coursier {
  /**
   * nom       chaîne non vide
   * position  une position {x, y}, COPIÉE
   *
   * Au départ, this.commande vaut null et this.chemin vaut [].
   * Lève une Error si le nom ou la position ne va pas.
   */
  constructor(nom, position) {
    // TODO etape 1 : ecrire le constructeur de Coursier
    this.nom=nom
    if (typeof this.nom !== "string") {
      throw new Error("Le nom n'est pas valide")
    }
    // if(this.nom.length === 0) {
    //   throw new Error("Le nom n'est pas valide")
    // }
    if (this.nom.trim() === "") {
      throw new Error("Le nom n'est pas valide")
    }

    if (estUnePosition(position)) {
      this.position=structuredClone(position)
    }
    else {
      throw new Error("La position du coursier n'est pas valide")
    }

    // this.type= "Coursier"
    
    // this.vitesse= 1
    
    this.commande=null

    this.chemin=[]

    //throw new Error("etape 1 : le constructeur de Coursier");
  }

  // Les trois valeurs que les sous-classes redéfinissent.
  get type() {
    return "coursier";
  }
  /** Nombre de cases parcourues par tour. */
  get vitesse() {
    return 1;
  }
  /** La lettre affichée sur la carte. */
  get symbole() {
    return "C";
  }

  /** Vrai s'il n'a pas de commande en cours. */
  get estLibre() {
    // TODO etape 1 : ecrire Coursier.estLibre
    if (this.commande === null){
      return (true)
    }
    else {
      return (false)
    }
    // throw new Error("etape 1 : Coursier.estLibre");
  }

  /**
   * Confie une commande et le chemin à suivre, COPIÉ.
   * Lève une Error si le coursier livre déjà, message contenant "deja".
   */
  charger(commande, chemin) {
    // TODO etape 1 : ecrire Coursier.charger
    if (this.estLibre === false) {
      throw new Error("Le coursier à deja une commande en cours")
    }
    else {
    this.commande=commande
    this.chemin=structuredClone(chemin)
    }
    //throw new Error("etape 1 : Coursier.charger");
  }

  /**
   * Avance d'au plus `vitesse` cases le long du chemin. Chaque case parcourue
   * devient la nouvelle position et sort du chemin.
   * Renvoie vrai si le chemin est vide après ce déplacement, faux sinon.
   * Un coursier libre ne bouge pas et renvoie faux.
   */
  avancer() {
    // TODO etape 1 : ecrire Coursier.avancer

    if (this.commande === null){
      return false
    }
    else {
    for (let i = 0; i < this.vitesse && this.chemin.length > 0; i++) {
    const nouvellepos = this.chemin.shift();
    this.position = nouvellepos
    }
    }
    return this.chemin.length === 0
    //throw new Error("etape 1 : Coursier.avancer");
  }

  /**
   * Rend la commande au client, redevient libre, et renvoie cette commande.
   * Lève une Error s'il n'y a rien à livrer, message contenant "rien", ou si
   * le chemin n'est pas terminé, message contenant "arrive".
   */
  livrer() {
    // TODO etape 1 : ecrire Coursier.livrer
    if (this.commande === null) {
      throw new Error("il n'y a rien à livrer")
    }
    if (this.chemin.length !==0 ) {
      throw new Error("Le livreur arrive il n'a pas fini son trajet")
    }
    const commandelivree = this.commande
    this.commande = null
    return (commandelivree)
    // throw new Error("etape 1 : Coursier.livrer");
  }

  /** Exactement : "Ana (velo) en (1, 1)". */
  toString() {
    // TODO etape 1 : ecrire Coursier.toString
    return `${this.nom} (${this.type}) en (${this.position.x}, ${this.position.y})`
    throw new Error("etape 1 : Coursier.toString");
  }
}

export class Velo extends Coursier {
  // TODO etape 1 : type "velo", vitesse 2, symbole "V".
  // Les trois valeurs que les sous-classes redéfinissent.
  get type() {
    return "velo";
  }
  /** Nombre de cases parcourues par tour. */
  get vitesse() {
    return 2;
  }
  /** La lettre affichée sur la carte. */
  get symbole() {
    return "V";
  }


}

export class Scooter extends Coursier {
  // TODO etape 1 : type "scooter", vitesse 3, symbole "S".
    // Les trois valeurs que les sous-classes redéfinissent.
  get type() {
    return "scooter";
  }
  /** Nombre de cases parcourues par tour. */
  get vitesse() {
    return 3;
  }
  /** La lettre affichée sur la carte. */
  get symbole() {
    return "S";
  }
}
