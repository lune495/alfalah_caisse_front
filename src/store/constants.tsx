export const DOCTEUR_URL=`graphql?query={medecins{nom,prenom,id,module{nom,id}}}`
export const DEPENSE_URL=`graphql?query={depenses{nom,created_at,montant,id}}`
export const USER_URL=`graphql?query={users{name,email,role{nom,id},id}}`
export const VENTE_URL=`graphql?query={ventes(filtre_pharma:"filtre"){id statut paye nom_complet numero montant_ht montant_ttc remise_total montant_avec_remise created_at vente_produits{qte remise montant_remise total produit{designation} }  montant montant_avec_remise qte montant_ht montant_ttc remise_total user { id name}}}`
export const MODULE_URL=`graphql?query={modules{id,nom,medecins{nom,prenom,id},type_services{id,nom,prix}}}`
export const TYPE_SERVICE_URL=`graphql?query={type_services{id,nom,prix,module{nom,id}}}`
export const SERVICE_URL=`graphql?query={services{id,created_at,nom_complet,montant_total,nature,montant,adresse,remise,
medecin{id,nom,prenom},module{id,nom},element_services{id,type_service{nom,prix}},module{nom},user{id,name}}}`