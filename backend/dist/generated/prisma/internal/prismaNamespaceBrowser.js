"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonNullValueFilter = exports.NullsOrder = exports.QueryMode = exports.NullableJsonNullValueInput = exports.SortOrder = exports.HistoriqueModificationScalarFieldEnum = exports.EtapeDefinitionScalarFieldEnum = exports.WorkflowEtapeScalarFieldEnum = exports.WorkflowScalarFieldEnum = exports.VehicleScalarFieldEnum = exports.TechnicienScalarFieldEnum = exports.UserScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.Decimal = void 0;
const runtime = __importStar(require("@prisma/client/runtime/index-browser"));
exports.Decimal = runtime.Decimal;
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    User: 'User',
    Technicien: 'Technicien',
    Vehicle: 'Vehicle',
    Workflow: 'Workflow',
    WorkflowEtape: 'WorkflowEtape',
    EtapeDefinition: 'EtapeDefinition',
    HistoriqueModification: 'HistoriqueModification'
};
exports.TransactionIsolationLevel = {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
};
exports.UserScalarFieldEnum = {
    id: 'id',
    email: 'email',
    password: 'password',
    nom: 'nom',
    prenom: 'prenom',
    role: 'role',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.TechnicienScalarFieldEnum = {
    id: 'id',
    nom: 'nom',
    prenom: 'prenom',
    telephone: 'telephone',
    email: 'email',
    specialite: 'specialite',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.VehicleScalarFieldEnum = {
    id: 'id',
    immatriculation: 'immatriculation',
    marque: 'marque',
    modele: 'modele',
    annee: 'annee',
    numeroSerie: 'numeroSerie',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.WorkflowScalarFieldEnum = {
    id: 'id',
    vehicleId: 'vehicleId',
    statut: 'statut',
    etapeActuelle: 'etapeActuelle',
    dateDebut: 'dateDebut',
    dateFin: 'dateFin',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.WorkflowEtapeScalarFieldEnum = {
    id: 'id',
    workflowId: 'workflowId',
    numeroEtape: 'numeroEtape',
    nomEtape: 'nomEtape',
    description: 'description',
    statut: 'statut',
    formulaire: 'formulaire',
    dateDebut: 'dateDebut',
    dateFin: 'dateFin',
    validePar: 'validePar',
    commentaires: 'commentaires',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.EtapeDefinitionScalarFieldEnum = {
    id: 'id',
    numeroEtape: 'numeroEtape',
    nom: 'nom',
    description: 'description',
    champsFormulaire: 'champsFormulaire',
    ordre: 'ordre',
    estObligatoire: 'estObligatoire',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.HistoriqueModificationScalarFieldEnum = {
    id: 'id',
    entite: 'entite',
    entiteId: 'entiteId',
    action: 'action',
    modifiePar: 'modifiePar',
    dateModification: 'dateModification',
    anciennesValeurs: 'anciennesValeurs',
    nouvellesValeurs: 'nouvellesValeurs',
    commentaire: 'commentaire'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.NullableJsonNullValueInput = {
    DbNull: 'DbNull',
    JsonNull: 'JsonNull'
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.JsonNullValueFilter = {
    DbNull: 'DbNull',
    JsonNull: 'JsonNull',
    AnyNull: 'AnyNull'
};
//# sourceMappingURL=prismaNamespaceBrowser.js.map