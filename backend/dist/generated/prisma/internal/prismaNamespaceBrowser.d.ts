import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly Technicien: "Technicien";
    readonly Vehicle: "Vehicle";
    readonly Workflow: "Workflow";
    readonly WorkflowEtape: "WorkflowEtape";
    readonly EtapeDefinition: "EtapeDefinition";
    readonly HistoriqueModification: "HistoriqueModification";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly password: "password";
    readonly nom: "nom";
    readonly prenom: "prenom";
    readonly role: "role";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const TechnicienScalarFieldEnum: {
    readonly id: "id";
    readonly nom: "nom";
    readonly prenom: "prenom";
    readonly telephone: "telephone";
    readonly email: "email";
    readonly specialite: "specialite";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type TechnicienScalarFieldEnum = (typeof TechnicienScalarFieldEnum)[keyof typeof TechnicienScalarFieldEnum];
export declare const VehicleScalarFieldEnum: {
    readonly id: "id";
    readonly immatriculation: "immatriculation";
    readonly marque: "marque";
    readonly modele: "modele";
    readonly annee: "annee";
    readonly numeroSerie: "numeroSerie";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type VehicleScalarFieldEnum = (typeof VehicleScalarFieldEnum)[keyof typeof VehicleScalarFieldEnum];
export declare const WorkflowScalarFieldEnum: {
    readonly id: "id";
    readonly vehicleId: "vehicleId";
    readonly statut: "statut";
    readonly etapeActuelle: "etapeActuelle";
    readonly dateDebut: "dateDebut";
    readonly dateFin: "dateFin";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type WorkflowScalarFieldEnum = (typeof WorkflowScalarFieldEnum)[keyof typeof WorkflowScalarFieldEnum];
export declare const WorkflowEtapeScalarFieldEnum: {
    readonly id: "id";
    readonly workflowId: "workflowId";
    readonly numeroEtape: "numeroEtape";
    readonly nomEtape: "nomEtape";
    readonly description: "description";
    readonly statut: "statut";
    readonly formulaire: "formulaire";
    readonly dateDebut: "dateDebut";
    readonly dateFin: "dateFin";
    readonly validePar: "validePar";
    readonly commentaires: "commentaires";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type WorkflowEtapeScalarFieldEnum = (typeof WorkflowEtapeScalarFieldEnum)[keyof typeof WorkflowEtapeScalarFieldEnum];
export declare const EtapeDefinitionScalarFieldEnum: {
    readonly id: "id";
    readonly numeroEtape: "numeroEtape";
    readonly nom: "nom";
    readonly description: "description";
    readonly champsFormulaire: "champsFormulaire";
    readonly ordre: "ordre";
    readonly estObligatoire: "estObligatoire";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type EtapeDefinitionScalarFieldEnum = (typeof EtapeDefinitionScalarFieldEnum)[keyof typeof EtapeDefinitionScalarFieldEnum];
export declare const HistoriqueModificationScalarFieldEnum: {
    readonly id: "id";
    readonly entite: "entite";
    readonly entiteId: "entiteId";
    readonly action: "action";
    readonly modifiePar: "modifiePar";
    readonly dateModification: "dateModification";
    readonly anciennesValeurs: "anciennesValeurs";
    readonly nouvellesValeurs: "nouvellesValeurs";
    readonly commentaire: "commentaire";
};
export type HistoriqueModificationScalarFieldEnum = (typeof HistoriqueModificationScalarFieldEnum)[keyof typeof HistoriqueModificationScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: "DbNull";
    readonly JsonNull: "JsonNull";
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: "DbNull";
    readonly JsonNull: "JsonNull";
    readonly AnyNull: "AnyNull";
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
