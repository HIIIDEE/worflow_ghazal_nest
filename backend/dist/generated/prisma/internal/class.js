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
exports.getPrismaClientClass = getPrismaClientClass;
const runtime = __importStar(require("@prisma/client/runtime/client"));
const config = {
    "previewFeatures": [],
    "clientVersion": "7.1.0",
    "engineVersion": "ab635e6b9d606fa5c8fb8b1a7f909c3c3c1c98ba",
    "activeProvider": "postgresql",
    "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\ngenerator client {\n  provider     = \"prisma-client\"\n  output       = \"../generated/prisma\"\n  moduleFormat = \"cjs\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\n// Modèle pour les utilisateurs avec authentification\nmodel User {\n  id        String   @id @default(uuid())\n  email     String   @unique\n  password  String // Hash du mot de passe\n  nom       String\n  prenom    String\n  role      UserRole @default(GESTIONNAIRE)\n  isActive  Boolean  @default(true)\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map(\"users\")\n}\n\n// Énumération pour les rôles utilisateurs\nenum UserRole {\n  ADMIN\n  GESTIONNAIRE\n}\n\n// Modèle pour les techniciens (indépendant des utilisateurs)\nmodel Technicien {\n  id         String   @id @default(uuid())\n  nom        String\n  prenom     String\n  telephone  String?\n  email      String?\n  specialite String?\n  isActive   Boolean  @default(true)\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@map(\"techniciens\")\n}\n\n// Modèle pour les véhicules\nmodel Vehicle {\n  id              String     @id @default(uuid())\n  immatriculation String     @unique\n  marque          String\n  modele          String\n  annee           Int\n  numeroSerie     String     @unique\n  workflows       Workflow[]\n  createdAt       DateTime   @default(now())\n  updatedAt       DateTime   @updatedAt\n\n  @@map(\"vehicles\")\n}\n\n// Modèle pour le workflow principal\nmodel Workflow {\n  id            String          @id @default(uuid())\n  vehicleId     String\n  vehicle       Vehicle         @relation(fields: [vehicleId], references: [id], onDelete: Cascade)\n  statut        WorkflowStatus  @default(EN_COURS)\n  etapeActuelle Int             @default(1)\n  dateDebut     DateTime        @default(now())\n  dateFin       DateTime?\n  etapes        WorkflowEtape[]\n  createdAt     DateTime        @default(now())\n  updatedAt     DateTime        @updatedAt\n\n  @@map(\"workflows\")\n}\n\n// Énumération pour le statut du workflow\nenum WorkflowStatus {\n  EN_COURS\n  TERMINE\n  ANNULE\n}\n\n// Modèle pour les étapes du workflow\nmodel WorkflowEtape {\n  id           String      @id @default(uuid())\n  workflowId   String\n  workflow     Workflow    @relation(fields: [workflowId], references: [id], onDelete: Cascade)\n  numeroEtape  Int\n  nomEtape     String\n  description  String?\n  statut       EtapeStatus @default(EN_ATTENTE)\n  formulaire   Json? // Stockage JSON pour les données du formulaire\n  dateDebut    DateTime?\n  dateFin      DateTime?\n  validePar    String? // Nom de l'employé qui a validé\n  commentaires String?\n  createdAt    DateTime    @default(now())\n  updatedAt    DateTime    @updatedAt\n\n  @@unique([workflowId, numeroEtape])\n  @@map(\"workflow_etapes\")\n}\n\n// Énumération pour le statut des étapes\nenum EtapeStatus {\n  EN_ATTENTE\n  EN_COURS\n  TERMINE\n  BLOQUE\n}\n\n// Modèle pour la définition des étapes (template)\nmodel EtapeDefinition {\n  id               String   @id @default(uuid())\n  numeroEtape      Int      @unique\n  nom              String\n  description      String?\n  champsFormulaire Json? // Définition des champs du formulaire en JSON\n  ordre            Int      @default(0)\n  estObligatoire   Boolean  @default(true)\n  createdAt        DateTime @default(now())\n  updatedAt        DateTime @updatedAt\n\n  @@map(\"etape_definitions\")\n}\n\n// Modèle pour l'historique des modifications\nmodel HistoriqueModification {\n  id               String   @id @default(uuid())\n  entite           String // Type d'entité (Workflow, WorkflowEtape, etc.)\n  entiteId         String // ID de l'entité modifiée\n  action           String // Type d'action (CREATION, MODIFICATION, SUPPRESSION)\n  modifiePar       String // Nom de l'utilisateur\n  dateModification DateTime @default(now())\n  anciennesValeurs Json?\n  nouvellesValeurs Json?\n  commentaire      String?\n\n  @@map(\"historique_modifications\")\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"password\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"nom\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"prenom\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"role\",\"kind\":\"enum\",\"type\":\"UserRole\"},{\"name\":\"isActive\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":\"users\"},\"Technicien\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"nom\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"prenom\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"telephone\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"specialite\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"isActive\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":\"techniciens\"},\"Vehicle\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"immatriculation\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"marque\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"modele\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"annee\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"numeroSerie\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"workflows\",\"kind\":\"object\",\"type\":\"Workflow\",\"relationName\":\"VehicleToWorkflow\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":\"vehicles\"},\"Workflow\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"vehicleId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"vehicle\",\"kind\":\"object\",\"type\":\"Vehicle\",\"relationName\":\"VehicleToWorkflow\"},{\"name\":\"statut\",\"kind\":\"enum\",\"type\":\"WorkflowStatus\"},{\"name\":\"etapeActuelle\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"dateDebut\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"dateFin\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"etapes\",\"kind\":\"object\",\"type\":\"WorkflowEtape\",\"relationName\":\"WorkflowToWorkflowEtape\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":\"workflows\"},\"WorkflowEtape\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"workflowId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"workflow\",\"kind\":\"object\",\"type\":\"Workflow\",\"relationName\":\"WorkflowToWorkflowEtape\"},{\"name\":\"numeroEtape\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"nomEtape\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"statut\",\"kind\":\"enum\",\"type\":\"EtapeStatus\"},{\"name\":\"formulaire\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"dateDebut\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"dateFin\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"validePar\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"commentaires\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":\"workflow_etapes\"},\"EtapeDefinition\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"numeroEtape\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"nom\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"champsFormulaire\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"ordre\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"estObligatoire\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":\"etape_definitions\"},\"HistoriqueModification\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"entite\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"entiteId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"action\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"modifiePar\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"dateModification\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"anciennesValeurs\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"nouvellesValeurs\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"commentaire\",\"kind\":\"scalar\",\"type\":\"String\"}],\"dbName\":\"historique_modifications\"}},\"enums\":{},\"types\":{}}");
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await import('node:buffer');
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await import("@prisma/client/runtime/query_compiler_bg.postgresql.js"),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await import("@prisma/client/runtime/query_compiler_bg.postgresql.wasm-base64.js");
        return await decodeBase64AsWasm(wasm);
    }
};
function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map