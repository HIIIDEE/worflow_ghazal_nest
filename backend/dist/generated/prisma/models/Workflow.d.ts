import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type WorkflowModel = runtime.Types.Result.DefaultSelection<Prisma.$WorkflowPayload>;
export type AggregateWorkflow = {
    _count: WorkflowCountAggregateOutputType | null;
    _avg: WorkflowAvgAggregateOutputType | null;
    _sum: WorkflowSumAggregateOutputType | null;
    _min: WorkflowMinAggregateOutputType | null;
    _max: WorkflowMaxAggregateOutputType | null;
};
export type WorkflowAvgAggregateOutputType = {
    etapeActuelle: number | null;
};
export type WorkflowSumAggregateOutputType = {
    etapeActuelle: number | null;
};
export type WorkflowMinAggregateOutputType = {
    id: string | null;
    vehicleId: string | null;
    statut: $Enums.WorkflowStatus | null;
    etapeActuelle: number | null;
    dateDebut: Date | null;
    dateFin: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type WorkflowMaxAggregateOutputType = {
    id: string | null;
    vehicleId: string | null;
    statut: $Enums.WorkflowStatus | null;
    etapeActuelle: number | null;
    dateDebut: Date | null;
    dateFin: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type WorkflowCountAggregateOutputType = {
    id: number;
    vehicleId: number;
    statut: number;
    etapeActuelle: number;
    dateDebut: number;
    dateFin: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type WorkflowAvgAggregateInputType = {
    etapeActuelle?: true;
};
export type WorkflowSumAggregateInputType = {
    etapeActuelle?: true;
};
export type WorkflowMinAggregateInputType = {
    id?: true;
    vehicleId?: true;
    statut?: true;
    etapeActuelle?: true;
    dateDebut?: true;
    dateFin?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type WorkflowMaxAggregateInputType = {
    id?: true;
    vehicleId?: true;
    statut?: true;
    etapeActuelle?: true;
    dateDebut?: true;
    dateFin?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type WorkflowCountAggregateInputType = {
    id?: true;
    vehicleId?: true;
    statut?: true;
    etapeActuelle?: true;
    dateDebut?: true;
    dateFin?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type WorkflowAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkflowWhereInput;
    orderBy?: Prisma.WorkflowOrderByWithRelationInput | Prisma.WorkflowOrderByWithRelationInput[];
    cursor?: Prisma.WorkflowWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | WorkflowCountAggregateInputType;
    _avg?: WorkflowAvgAggregateInputType;
    _sum?: WorkflowSumAggregateInputType;
    _min?: WorkflowMinAggregateInputType;
    _max?: WorkflowMaxAggregateInputType;
};
export type GetWorkflowAggregateType<T extends WorkflowAggregateArgs> = {
    [P in keyof T & keyof AggregateWorkflow]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateWorkflow[P]> : Prisma.GetScalarType<T[P], AggregateWorkflow[P]>;
};
export type WorkflowGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkflowWhereInput;
    orderBy?: Prisma.WorkflowOrderByWithAggregationInput | Prisma.WorkflowOrderByWithAggregationInput[];
    by: Prisma.WorkflowScalarFieldEnum[] | Prisma.WorkflowScalarFieldEnum;
    having?: Prisma.WorkflowScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: WorkflowCountAggregateInputType | true;
    _avg?: WorkflowAvgAggregateInputType;
    _sum?: WorkflowSumAggregateInputType;
    _min?: WorkflowMinAggregateInputType;
    _max?: WorkflowMaxAggregateInputType;
};
export type WorkflowGroupByOutputType = {
    id: string;
    vehicleId: string;
    statut: $Enums.WorkflowStatus;
    etapeActuelle: number;
    dateDebut: Date;
    dateFin: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: WorkflowCountAggregateOutputType | null;
    _avg: WorkflowAvgAggregateOutputType | null;
    _sum: WorkflowSumAggregateOutputType | null;
    _min: WorkflowMinAggregateOutputType | null;
    _max: WorkflowMaxAggregateOutputType | null;
};
type GetWorkflowGroupByPayload<T extends WorkflowGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<WorkflowGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof WorkflowGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], WorkflowGroupByOutputType[P]> : Prisma.GetScalarType<T[P], WorkflowGroupByOutputType[P]>;
}>>;
export type WorkflowWhereInput = {
    AND?: Prisma.WorkflowWhereInput | Prisma.WorkflowWhereInput[];
    OR?: Prisma.WorkflowWhereInput[];
    NOT?: Prisma.WorkflowWhereInput | Prisma.WorkflowWhereInput[];
    id?: Prisma.StringFilter<"Workflow"> | string;
    vehicleId?: Prisma.StringFilter<"Workflow"> | string;
    statut?: Prisma.EnumWorkflowStatusFilter<"Workflow"> | $Enums.WorkflowStatus;
    etapeActuelle?: Prisma.IntFilter<"Workflow"> | number;
    dateDebut?: Prisma.DateTimeFilter<"Workflow"> | Date | string;
    dateFin?: Prisma.DateTimeNullableFilter<"Workflow"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Workflow"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Workflow"> | Date | string;
    vehicle?: Prisma.XOR<Prisma.VehicleScalarRelationFilter, Prisma.VehicleWhereInput>;
    etapes?: Prisma.WorkflowEtapeListRelationFilter;
};
export type WorkflowOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    vehicleId?: Prisma.SortOrder;
    statut?: Prisma.SortOrder;
    etapeActuelle?: Prisma.SortOrder;
    dateDebut?: Prisma.SortOrder;
    dateFin?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    vehicle?: Prisma.VehicleOrderByWithRelationInput;
    etapes?: Prisma.WorkflowEtapeOrderByRelationAggregateInput;
};
export type WorkflowWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.WorkflowWhereInput | Prisma.WorkflowWhereInput[];
    OR?: Prisma.WorkflowWhereInput[];
    NOT?: Prisma.WorkflowWhereInput | Prisma.WorkflowWhereInput[];
    vehicleId?: Prisma.StringFilter<"Workflow"> | string;
    statut?: Prisma.EnumWorkflowStatusFilter<"Workflow"> | $Enums.WorkflowStatus;
    etapeActuelle?: Prisma.IntFilter<"Workflow"> | number;
    dateDebut?: Prisma.DateTimeFilter<"Workflow"> | Date | string;
    dateFin?: Prisma.DateTimeNullableFilter<"Workflow"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Workflow"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Workflow"> | Date | string;
    vehicle?: Prisma.XOR<Prisma.VehicleScalarRelationFilter, Prisma.VehicleWhereInput>;
    etapes?: Prisma.WorkflowEtapeListRelationFilter;
}, "id">;
export type WorkflowOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    vehicleId?: Prisma.SortOrder;
    statut?: Prisma.SortOrder;
    etapeActuelle?: Prisma.SortOrder;
    dateDebut?: Prisma.SortOrder;
    dateFin?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.WorkflowCountOrderByAggregateInput;
    _avg?: Prisma.WorkflowAvgOrderByAggregateInput;
    _max?: Prisma.WorkflowMaxOrderByAggregateInput;
    _min?: Prisma.WorkflowMinOrderByAggregateInput;
    _sum?: Prisma.WorkflowSumOrderByAggregateInput;
};
export type WorkflowScalarWhereWithAggregatesInput = {
    AND?: Prisma.WorkflowScalarWhereWithAggregatesInput | Prisma.WorkflowScalarWhereWithAggregatesInput[];
    OR?: Prisma.WorkflowScalarWhereWithAggregatesInput[];
    NOT?: Prisma.WorkflowScalarWhereWithAggregatesInput | Prisma.WorkflowScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Workflow"> | string;
    vehicleId?: Prisma.StringWithAggregatesFilter<"Workflow"> | string;
    statut?: Prisma.EnumWorkflowStatusWithAggregatesFilter<"Workflow"> | $Enums.WorkflowStatus;
    etapeActuelle?: Prisma.IntWithAggregatesFilter<"Workflow"> | number;
    dateDebut?: Prisma.DateTimeWithAggregatesFilter<"Workflow"> | Date | string;
    dateFin?: Prisma.DateTimeNullableWithAggregatesFilter<"Workflow"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Workflow"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Workflow"> | Date | string;
};
export type WorkflowCreateInput = {
    id?: string;
    statut?: $Enums.WorkflowStatus;
    etapeActuelle?: number;
    dateDebut?: Date | string;
    dateFin?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    vehicle: Prisma.VehicleCreateNestedOneWithoutWorkflowsInput;
    etapes?: Prisma.WorkflowEtapeCreateNestedManyWithoutWorkflowInput;
};
export type WorkflowUncheckedCreateInput = {
    id?: string;
    vehicleId: string;
    statut?: $Enums.WorkflowStatus;
    etapeActuelle?: number;
    dateDebut?: Date | string;
    dateFin?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    etapes?: Prisma.WorkflowEtapeUncheckedCreateNestedManyWithoutWorkflowInput;
};
export type WorkflowUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    statut?: Prisma.EnumWorkflowStatusFieldUpdateOperationsInput | $Enums.WorkflowStatus;
    etapeActuelle?: Prisma.IntFieldUpdateOperationsInput | number;
    dateDebut?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dateFin?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    vehicle?: Prisma.VehicleUpdateOneRequiredWithoutWorkflowsNestedInput;
    etapes?: Prisma.WorkflowEtapeUpdateManyWithoutWorkflowNestedInput;
};
export type WorkflowUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    vehicleId?: Prisma.StringFieldUpdateOperationsInput | string;
    statut?: Prisma.EnumWorkflowStatusFieldUpdateOperationsInput | $Enums.WorkflowStatus;
    etapeActuelle?: Prisma.IntFieldUpdateOperationsInput | number;
    dateDebut?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dateFin?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    etapes?: Prisma.WorkflowEtapeUncheckedUpdateManyWithoutWorkflowNestedInput;
};
export type WorkflowCreateManyInput = {
    id?: string;
    vehicleId: string;
    statut?: $Enums.WorkflowStatus;
    etapeActuelle?: number;
    dateDebut?: Date | string;
    dateFin?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WorkflowUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    statut?: Prisma.EnumWorkflowStatusFieldUpdateOperationsInput | $Enums.WorkflowStatus;
    etapeActuelle?: Prisma.IntFieldUpdateOperationsInput | number;
    dateDebut?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dateFin?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkflowUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    vehicleId?: Prisma.StringFieldUpdateOperationsInput | string;
    statut?: Prisma.EnumWorkflowStatusFieldUpdateOperationsInput | $Enums.WorkflowStatus;
    etapeActuelle?: Prisma.IntFieldUpdateOperationsInput | number;
    dateDebut?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dateFin?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkflowListRelationFilter = {
    every?: Prisma.WorkflowWhereInput;
    some?: Prisma.WorkflowWhereInput;
    none?: Prisma.WorkflowWhereInput;
};
export type WorkflowOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type WorkflowCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    vehicleId?: Prisma.SortOrder;
    statut?: Prisma.SortOrder;
    etapeActuelle?: Prisma.SortOrder;
    dateDebut?: Prisma.SortOrder;
    dateFin?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WorkflowAvgOrderByAggregateInput = {
    etapeActuelle?: Prisma.SortOrder;
};
export type WorkflowMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    vehicleId?: Prisma.SortOrder;
    statut?: Prisma.SortOrder;
    etapeActuelle?: Prisma.SortOrder;
    dateDebut?: Prisma.SortOrder;
    dateFin?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WorkflowMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    vehicleId?: Prisma.SortOrder;
    statut?: Prisma.SortOrder;
    etapeActuelle?: Prisma.SortOrder;
    dateDebut?: Prisma.SortOrder;
    dateFin?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WorkflowSumOrderByAggregateInput = {
    etapeActuelle?: Prisma.SortOrder;
};
export type WorkflowScalarRelationFilter = {
    is?: Prisma.WorkflowWhereInput;
    isNot?: Prisma.WorkflowWhereInput;
};
export type WorkflowCreateNestedManyWithoutVehicleInput = {
    create?: Prisma.XOR<Prisma.WorkflowCreateWithoutVehicleInput, Prisma.WorkflowUncheckedCreateWithoutVehicleInput> | Prisma.WorkflowCreateWithoutVehicleInput[] | Prisma.WorkflowUncheckedCreateWithoutVehicleInput[];
    connectOrCreate?: Prisma.WorkflowCreateOrConnectWithoutVehicleInput | Prisma.WorkflowCreateOrConnectWithoutVehicleInput[];
    createMany?: Prisma.WorkflowCreateManyVehicleInputEnvelope;
    connect?: Prisma.WorkflowWhereUniqueInput | Prisma.WorkflowWhereUniqueInput[];
};
export type WorkflowUncheckedCreateNestedManyWithoutVehicleInput = {
    create?: Prisma.XOR<Prisma.WorkflowCreateWithoutVehicleInput, Prisma.WorkflowUncheckedCreateWithoutVehicleInput> | Prisma.WorkflowCreateWithoutVehicleInput[] | Prisma.WorkflowUncheckedCreateWithoutVehicleInput[];
    connectOrCreate?: Prisma.WorkflowCreateOrConnectWithoutVehicleInput | Prisma.WorkflowCreateOrConnectWithoutVehicleInput[];
    createMany?: Prisma.WorkflowCreateManyVehicleInputEnvelope;
    connect?: Prisma.WorkflowWhereUniqueInput | Prisma.WorkflowWhereUniqueInput[];
};
export type WorkflowUpdateManyWithoutVehicleNestedInput = {
    create?: Prisma.XOR<Prisma.WorkflowCreateWithoutVehicleInput, Prisma.WorkflowUncheckedCreateWithoutVehicleInput> | Prisma.WorkflowCreateWithoutVehicleInput[] | Prisma.WorkflowUncheckedCreateWithoutVehicleInput[];
    connectOrCreate?: Prisma.WorkflowCreateOrConnectWithoutVehicleInput | Prisma.WorkflowCreateOrConnectWithoutVehicleInput[];
    upsert?: Prisma.WorkflowUpsertWithWhereUniqueWithoutVehicleInput | Prisma.WorkflowUpsertWithWhereUniqueWithoutVehicleInput[];
    createMany?: Prisma.WorkflowCreateManyVehicleInputEnvelope;
    set?: Prisma.WorkflowWhereUniqueInput | Prisma.WorkflowWhereUniqueInput[];
    disconnect?: Prisma.WorkflowWhereUniqueInput | Prisma.WorkflowWhereUniqueInput[];
    delete?: Prisma.WorkflowWhereUniqueInput | Prisma.WorkflowWhereUniqueInput[];
    connect?: Prisma.WorkflowWhereUniqueInput | Prisma.WorkflowWhereUniqueInput[];
    update?: Prisma.WorkflowUpdateWithWhereUniqueWithoutVehicleInput | Prisma.WorkflowUpdateWithWhereUniqueWithoutVehicleInput[];
    updateMany?: Prisma.WorkflowUpdateManyWithWhereWithoutVehicleInput | Prisma.WorkflowUpdateManyWithWhereWithoutVehicleInput[];
    deleteMany?: Prisma.WorkflowScalarWhereInput | Prisma.WorkflowScalarWhereInput[];
};
export type WorkflowUncheckedUpdateManyWithoutVehicleNestedInput = {
    create?: Prisma.XOR<Prisma.WorkflowCreateWithoutVehicleInput, Prisma.WorkflowUncheckedCreateWithoutVehicleInput> | Prisma.WorkflowCreateWithoutVehicleInput[] | Prisma.WorkflowUncheckedCreateWithoutVehicleInput[];
    connectOrCreate?: Prisma.WorkflowCreateOrConnectWithoutVehicleInput | Prisma.WorkflowCreateOrConnectWithoutVehicleInput[];
    upsert?: Prisma.WorkflowUpsertWithWhereUniqueWithoutVehicleInput | Prisma.WorkflowUpsertWithWhereUniqueWithoutVehicleInput[];
    createMany?: Prisma.WorkflowCreateManyVehicleInputEnvelope;
    set?: Prisma.WorkflowWhereUniqueInput | Prisma.WorkflowWhereUniqueInput[];
    disconnect?: Prisma.WorkflowWhereUniqueInput | Prisma.WorkflowWhereUniqueInput[];
    delete?: Prisma.WorkflowWhereUniqueInput | Prisma.WorkflowWhereUniqueInput[];
    connect?: Prisma.WorkflowWhereUniqueInput | Prisma.WorkflowWhereUniqueInput[];
    update?: Prisma.WorkflowUpdateWithWhereUniqueWithoutVehicleInput | Prisma.WorkflowUpdateWithWhereUniqueWithoutVehicleInput[];
    updateMany?: Prisma.WorkflowUpdateManyWithWhereWithoutVehicleInput | Prisma.WorkflowUpdateManyWithWhereWithoutVehicleInput[];
    deleteMany?: Prisma.WorkflowScalarWhereInput | Prisma.WorkflowScalarWhereInput[];
};
export type EnumWorkflowStatusFieldUpdateOperationsInput = {
    set?: $Enums.WorkflowStatus;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type WorkflowCreateNestedOneWithoutEtapesInput = {
    create?: Prisma.XOR<Prisma.WorkflowCreateWithoutEtapesInput, Prisma.WorkflowUncheckedCreateWithoutEtapesInput>;
    connectOrCreate?: Prisma.WorkflowCreateOrConnectWithoutEtapesInput;
    connect?: Prisma.WorkflowWhereUniqueInput;
};
export type WorkflowUpdateOneRequiredWithoutEtapesNestedInput = {
    create?: Prisma.XOR<Prisma.WorkflowCreateWithoutEtapesInput, Prisma.WorkflowUncheckedCreateWithoutEtapesInput>;
    connectOrCreate?: Prisma.WorkflowCreateOrConnectWithoutEtapesInput;
    upsert?: Prisma.WorkflowUpsertWithoutEtapesInput;
    connect?: Prisma.WorkflowWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.WorkflowUpdateToOneWithWhereWithoutEtapesInput, Prisma.WorkflowUpdateWithoutEtapesInput>, Prisma.WorkflowUncheckedUpdateWithoutEtapesInput>;
};
export type WorkflowCreateWithoutVehicleInput = {
    id?: string;
    statut?: $Enums.WorkflowStatus;
    etapeActuelle?: number;
    dateDebut?: Date | string;
    dateFin?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    etapes?: Prisma.WorkflowEtapeCreateNestedManyWithoutWorkflowInput;
};
export type WorkflowUncheckedCreateWithoutVehicleInput = {
    id?: string;
    statut?: $Enums.WorkflowStatus;
    etapeActuelle?: number;
    dateDebut?: Date | string;
    dateFin?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    etapes?: Prisma.WorkflowEtapeUncheckedCreateNestedManyWithoutWorkflowInput;
};
export type WorkflowCreateOrConnectWithoutVehicleInput = {
    where: Prisma.WorkflowWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkflowCreateWithoutVehicleInput, Prisma.WorkflowUncheckedCreateWithoutVehicleInput>;
};
export type WorkflowCreateManyVehicleInputEnvelope = {
    data: Prisma.WorkflowCreateManyVehicleInput | Prisma.WorkflowCreateManyVehicleInput[];
    skipDuplicates?: boolean;
};
export type WorkflowUpsertWithWhereUniqueWithoutVehicleInput = {
    where: Prisma.WorkflowWhereUniqueInput;
    update: Prisma.XOR<Prisma.WorkflowUpdateWithoutVehicleInput, Prisma.WorkflowUncheckedUpdateWithoutVehicleInput>;
    create: Prisma.XOR<Prisma.WorkflowCreateWithoutVehicleInput, Prisma.WorkflowUncheckedCreateWithoutVehicleInput>;
};
export type WorkflowUpdateWithWhereUniqueWithoutVehicleInput = {
    where: Prisma.WorkflowWhereUniqueInput;
    data: Prisma.XOR<Prisma.WorkflowUpdateWithoutVehicleInput, Prisma.WorkflowUncheckedUpdateWithoutVehicleInput>;
};
export type WorkflowUpdateManyWithWhereWithoutVehicleInput = {
    where: Prisma.WorkflowScalarWhereInput;
    data: Prisma.XOR<Prisma.WorkflowUpdateManyMutationInput, Prisma.WorkflowUncheckedUpdateManyWithoutVehicleInput>;
};
export type WorkflowScalarWhereInput = {
    AND?: Prisma.WorkflowScalarWhereInput | Prisma.WorkflowScalarWhereInput[];
    OR?: Prisma.WorkflowScalarWhereInput[];
    NOT?: Prisma.WorkflowScalarWhereInput | Prisma.WorkflowScalarWhereInput[];
    id?: Prisma.StringFilter<"Workflow"> | string;
    vehicleId?: Prisma.StringFilter<"Workflow"> | string;
    statut?: Prisma.EnumWorkflowStatusFilter<"Workflow"> | $Enums.WorkflowStatus;
    etapeActuelle?: Prisma.IntFilter<"Workflow"> | number;
    dateDebut?: Prisma.DateTimeFilter<"Workflow"> | Date | string;
    dateFin?: Prisma.DateTimeNullableFilter<"Workflow"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Workflow"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Workflow"> | Date | string;
};
export type WorkflowCreateWithoutEtapesInput = {
    id?: string;
    statut?: $Enums.WorkflowStatus;
    etapeActuelle?: number;
    dateDebut?: Date | string;
    dateFin?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    vehicle: Prisma.VehicleCreateNestedOneWithoutWorkflowsInput;
};
export type WorkflowUncheckedCreateWithoutEtapesInput = {
    id?: string;
    vehicleId: string;
    statut?: $Enums.WorkflowStatus;
    etapeActuelle?: number;
    dateDebut?: Date | string;
    dateFin?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WorkflowCreateOrConnectWithoutEtapesInput = {
    where: Prisma.WorkflowWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkflowCreateWithoutEtapesInput, Prisma.WorkflowUncheckedCreateWithoutEtapesInput>;
};
export type WorkflowUpsertWithoutEtapesInput = {
    update: Prisma.XOR<Prisma.WorkflowUpdateWithoutEtapesInput, Prisma.WorkflowUncheckedUpdateWithoutEtapesInput>;
    create: Prisma.XOR<Prisma.WorkflowCreateWithoutEtapesInput, Prisma.WorkflowUncheckedCreateWithoutEtapesInput>;
    where?: Prisma.WorkflowWhereInput;
};
export type WorkflowUpdateToOneWithWhereWithoutEtapesInput = {
    where?: Prisma.WorkflowWhereInput;
    data: Prisma.XOR<Prisma.WorkflowUpdateWithoutEtapesInput, Prisma.WorkflowUncheckedUpdateWithoutEtapesInput>;
};
export type WorkflowUpdateWithoutEtapesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    statut?: Prisma.EnumWorkflowStatusFieldUpdateOperationsInput | $Enums.WorkflowStatus;
    etapeActuelle?: Prisma.IntFieldUpdateOperationsInput | number;
    dateDebut?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dateFin?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    vehicle?: Prisma.VehicleUpdateOneRequiredWithoutWorkflowsNestedInput;
};
export type WorkflowUncheckedUpdateWithoutEtapesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    vehicleId?: Prisma.StringFieldUpdateOperationsInput | string;
    statut?: Prisma.EnumWorkflowStatusFieldUpdateOperationsInput | $Enums.WorkflowStatus;
    etapeActuelle?: Prisma.IntFieldUpdateOperationsInput | number;
    dateDebut?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dateFin?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkflowCreateManyVehicleInput = {
    id?: string;
    statut?: $Enums.WorkflowStatus;
    etapeActuelle?: number;
    dateDebut?: Date | string;
    dateFin?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WorkflowUpdateWithoutVehicleInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    statut?: Prisma.EnumWorkflowStatusFieldUpdateOperationsInput | $Enums.WorkflowStatus;
    etapeActuelle?: Prisma.IntFieldUpdateOperationsInput | number;
    dateDebut?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dateFin?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    etapes?: Prisma.WorkflowEtapeUpdateManyWithoutWorkflowNestedInput;
};
export type WorkflowUncheckedUpdateWithoutVehicleInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    statut?: Prisma.EnumWorkflowStatusFieldUpdateOperationsInput | $Enums.WorkflowStatus;
    etapeActuelle?: Prisma.IntFieldUpdateOperationsInput | number;
    dateDebut?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dateFin?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    etapes?: Prisma.WorkflowEtapeUncheckedUpdateManyWithoutWorkflowNestedInput;
};
export type WorkflowUncheckedUpdateManyWithoutVehicleInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    statut?: Prisma.EnumWorkflowStatusFieldUpdateOperationsInput | $Enums.WorkflowStatus;
    etapeActuelle?: Prisma.IntFieldUpdateOperationsInput | number;
    dateDebut?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dateFin?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkflowCountOutputType = {
    etapes: number;
};
export type WorkflowCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    etapes?: boolean | WorkflowCountOutputTypeCountEtapesArgs;
};
export type WorkflowCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkflowCountOutputTypeSelect<ExtArgs> | null;
};
export type WorkflowCountOutputTypeCountEtapesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkflowEtapeWhereInput;
};
export type WorkflowSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    vehicleId?: boolean;
    statut?: boolean;
    etapeActuelle?: boolean;
    dateDebut?: boolean;
    dateFin?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    vehicle?: boolean | Prisma.VehicleDefaultArgs<ExtArgs>;
    etapes?: boolean | Prisma.Workflow$etapesArgs<ExtArgs>;
    _count?: boolean | Prisma.WorkflowCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["workflow"]>;
export type WorkflowSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    vehicleId?: boolean;
    statut?: boolean;
    etapeActuelle?: boolean;
    dateDebut?: boolean;
    dateFin?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    vehicle?: boolean | Prisma.VehicleDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["workflow"]>;
export type WorkflowSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    vehicleId?: boolean;
    statut?: boolean;
    etapeActuelle?: boolean;
    dateDebut?: boolean;
    dateFin?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    vehicle?: boolean | Prisma.VehicleDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["workflow"]>;
export type WorkflowSelectScalar = {
    id?: boolean;
    vehicleId?: boolean;
    statut?: boolean;
    etapeActuelle?: boolean;
    dateDebut?: boolean;
    dateFin?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type WorkflowOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "vehicleId" | "statut" | "etapeActuelle" | "dateDebut" | "dateFin" | "createdAt" | "updatedAt", ExtArgs["result"]["workflow"]>;
export type WorkflowInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    vehicle?: boolean | Prisma.VehicleDefaultArgs<ExtArgs>;
    etapes?: boolean | Prisma.Workflow$etapesArgs<ExtArgs>;
    _count?: boolean | Prisma.WorkflowCountOutputTypeDefaultArgs<ExtArgs>;
};
export type WorkflowIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    vehicle?: boolean | Prisma.VehicleDefaultArgs<ExtArgs>;
};
export type WorkflowIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    vehicle?: boolean | Prisma.VehicleDefaultArgs<ExtArgs>;
};
export type $WorkflowPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Workflow";
    objects: {
        vehicle: Prisma.$VehiclePayload<ExtArgs>;
        etapes: Prisma.$WorkflowEtapePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        vehicleId: string;
        statut: $Enums.WorkflowStatus;
        etapeActuelle: number;
        dateDebut: Date;
        dateFin: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["workflow"]>;
    composites: {};
};
export type WorkflowGetPayload<S extends boolean | null | undefined | WorkflowDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$WorkflowPayload, S>;
export type WorkflowCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<WorkflowFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: WorkflowCountAggregateInputType | true;
};
export interface WorkflowDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Workflow'];
        meta: {
            name: 'Workflow';
        };
    };
    findUnique<T extends WorkflowFindUniqueArgs>(args: Prisma.SelectSubset<T, WorkflowFindUniqueArgs<ExtArgs>>): Prisma.Prisma__WorkflowClient<runtime.Types.Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends WorkflowFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, WorkflowFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__WorkflowClient<runtime.Types.Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends WorkflowFindFirstArgs>(args?: Prisma.SelectSubset<T, WorkflowFindFirstArgs<ExtArgs>>): Prisma.Prisma__WorkflowClient<runtime.Types.Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends WorkflowFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, WorkflowFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__WorkflowClient<runtime.Types.Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends WorkflowFindManyArgs>(args?: Prisma.SelectSubset<T, WorkflowFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends WorkflowCreateArgs>(args: Prisma.SelectSubset<T, WorkflowCreateArgs<ExtArgs>>): Prisma.Prisma__WorkflowClient<runtime.Types.Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends WorkflowCreateManyArgs>(args?: Prisma.SelectSubset<T, WorkflowCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends WorkflowCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, WorkflowCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends WorkflowDeleteArgs>(args: Prisma.SelectSubset<T, WorkflowDeleteArgs<ExtArgs>>): Prisma.Prisma__WorkflowClient<runtime.Types.Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends WorkflowUpdateArgs>(args: Prisma.SelectSubset<T, WorkflowUpdateArgs<ExtArgs>>): Prisma.Prisma__WorkflowClient<runtime.Types.Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends WorkflowDeleteManyArgs>(args?: Prisma.SelectSubset<T, WorkflowDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends WorkflowUpdateManyArgs>(args: Prisma.SelectSubset<T, WorkflowUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends WorkflowUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, WorkflowUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends WorkflowUpsertArgs>(args: Prisma.SelectSubset<T, WorkflowUpsertArgs<ExtArgs>>): Prisma.Prisma__WorkflowClient<runtime.Types.Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends WorkflowCountArgs>(args?: Prisma.Subset<T, WorkflowCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], WorkflowCountAggregateOutputType> : number>;
    aggregate<T extends WorkflowAggregateArgs>(args: Prisma.Subset<T, WorkflowAggregateArgs>): Prisma.PrismaPromise<GetWorkflowAggregateType<T>>;
    groupBy<T extends WorkflowGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: WorkflowGroupByArgs['orderBy'];
    } : {
        orderBy?: WorkflowGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, WorkflowGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkflowGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: WorkflowFieldRefs;
}
export interface Prisma__WorkflowClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    vehicle<T extends Prisma.VehicleDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.VehicleDefaultArgs<ExtArgs>>): Prisma.Prisma__VehicleClient<runtime.Types.Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    etapes<T extends Prisma.Workflow$etapesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Workflow$etapesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkflowEtapePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface WorkflowFieldRefs {
    readonly id: Prisma.FieldRef<"Workflow", 'String'>;
    readonly vehicleId: Prisma.FieldRef<"Workflow", 'String'>;
    readonly statut: Prisma.FieldRef<"Workflow", 'WorkflowStatus'>;
    readonly etapeActuelle: Prisma.FieldRef<"Workflow", 'Int'>;
    readonly dateDebut: Prisma.FieldRef<"Workflow", 'DateTime'>;
    readonly dateFin: Prisma.FieldRef<"Workflow", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Workflow", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Workflow", 'DateTime'>;
}
export type WorkflowFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkflowSelect<ExtArgs> | null;
    omit?: Prisma.WorkflowOmit<ExtArgs> | null;
    include?: Prisma.WorkflowInclude<ExtArgs> | null;
    where: Prisma.WorkflowWhereUniqueInput;
};
export type WorkflowFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkflowSelect<ExtArgs> | null;
    omit?: Prisma.WorkflowOmit<ExtArgs> | null;
    include?: Prisma.WorkflowInclude<ExtArgs> | null;
    where: Prisma.WorkflowWhereUniqueInput;
};
export type WorkflowFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkflowSelect<ExtArgs> | null;
    omit?: Prisma.WorkflowOmit<ExtArgs> | null;
    include?: Prisma.WorkflowInclude<ExtArgs> | null;
    where?: Prisma.WorkflowWhereInput;
    orderBy?: Prisma.WorkflowOrderByWithRelationInput | Prisma.WorkflowOrderByWithRelationInput[];
    cursor?: Prisma.WorkflowWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkflowScalarFieldEnum | Prisma.WorkflowScalarFieldEnum[];
};
export type WorkflowFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkflowSelect<ExtArgs> | null;
    omit?: Prisma.WorkflowOmit<ExtArgs> | null;
    include?: Prisma.WorkflowInclude<ExtArgs> | null;
    where?: Prisma.WorkflowWhereInput;
    orderBy?: Prisma.WorkflowOrderByWithRelationInput | Prisma.WorkflowOrderByWithRelationInput[];
    cursor?: Prisma.WorkflowWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkflowScalarFieldEnum | Prisma.WorkflowScalarFieldEnum[];
};
export type WorkflowFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkflowSelect<ExtArgs> | null;
    omit?: Prisma.WorkflowOmit<ExtArgs> | null;
    include?: Prisma.WorkflowInclude<ExtArgs> | null;
    where?: Prisma.WorkflowWhereInput;
    orderBy?: Prisma.WorkflowOrderByWithRelationInput | Prisma.WorkflowOrderByWithRelationInput[];
    cursor?: Prisma.WorkflowWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkflowScalarFieldEnum | Prisma.WorkflowScalarFieldEnum[];
};
export type WorkflowCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkflowSelect<ExtArgs> | null;
    omit?: Prisma.WorkflowOmit<ExtArgs> | null;
    include?: Prisma.WorkflowInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WorkflowCreateInput, Prisma.WorkflowUncheckedCreateInput>;
};
export type WorkflowCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.WorkflowCreateManyInput | Prisma.WorkflowCreateManyInput[];
    skipDuplicates?: boolean;
};
export type WorkflowCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkflowSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.WorkflowOmit<ExtArgs> | null;
    data: Prisma.WorkflowCreateManyInput | Prisma.WorkflowCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.WorkflowIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type WorkflowUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkflowSelect<ExtArgs> | null;
    omit?: Prisma.WorkflowOmit<ExtArgs> | null;
    include?: Prisma.WorkflowInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WorkflowUpdateInput, Prisma.WorkflowUncheckedUpdateInput>;
    where: Prisma.WorkflowWhereUniqueInput;
};
export type WorkflowUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.WorkflowUpdateManyMutationInput, Prisma.WorkflowUncheckedUpdateManyInput>;
    where?: Prisma.WorkflowWhereInput;
    limit?: number;
};
export type WorkflowUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkflowSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.WorkflowOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WorkflowUpdateManyMutationInput, Prisma.WorkflowUncheckedUpdateManyInput>;
    where?: Prisma.WorkflowWhereInput;
    limit?: number;
    include?: Prisma.WorkflowIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type WorkflowUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkflowSelect<ExtArgs> | null;
    omit?: Prisma.WorkflowOmit<ExtArgs> | null;
    include?: Prisma.WorkflowInclude<ExtArgs> | null;
    where: Prisma.WorkflowWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkflowCreateInput, Prisma.WorkflowUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.WorkflowUpdateInput, Prisma.WorkflowUncheckedUpdateInput>;
};
export type WorkflowDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkflowSelect<ExtArgs> | null;
    omit?: Prisma.WorkflowOmit<ExtArgs> | null;
    include?: Prisma.WorkflowInclude<ExtArgs> | null;
    where: Prisma.WorkflowWhereUniqueInput;
};
export type WorkflowDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkflowWhereInput;
    limit?: number;
};
export type Workflow$etapesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkflowEtapeSelect<ExtArgs> | null;
    omit?: Prisma.WorkflowEtapeOmit<ExtArgs> | null;
    include?: Prisma.WorkflowEtapeInclude<ExtArgs> | null;
    where?: Prisma.WorkflowEtapeWhereInput;
    orderBy?: Prisma.WorkflowEtapeOrderByWithRelationInput | Prisma.WorkflowEtapeOrderByWithRelationInput[];
    cursor?: Prisma.WorkflowEtapeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkflowEtapeScalarFieldEnum | Prisma.WorkflowEtapeScalarFieldEnum[];
};
export type WorkflowDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkflowSelect<ExtArgs> | null;
    omit?: Prisma.WorkflowOmit<ExtArgs> | null;
    include?: Prisma.WorkflowInclude<ExtArgs> | null;
};
export {};
