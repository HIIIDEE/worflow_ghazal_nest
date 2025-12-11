export declare const UserRole: {
    readonly ADMIN: "ADMIN";
    readonly GESTIONNAIRE: "GESTIONNAIRE";
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const WorkflowStatus: {
    readonly EN_COURS: "EN_COURS";
    readonly TERMINE: "TERMINE";
    readonly ANNULE: "ANNULE";
};
export type WorkflowStatus = (typeof WorkflowStatus)[keyof typeof WorkflowStatus];
export declare const EtapeStatus: {
    readonly EN_ATTENTE: "EN_ATTENTE";
    readonly EN_COURS: "EN_COURS";
    readonly TERMINE: "TERMINE";
    readonly BLOQUE: "BLOQUE";
};
export type EtapeStatus = (typeof EtapeStatus)[keyof typeof EtapeStatus];
