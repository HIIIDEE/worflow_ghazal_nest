import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type WorkflowEtapeModel = runtime.Types.Result.DefaultSelection<Prisma.$WorkflowEtapePayload>;
export type AggregateWorkflowEtape = {
    _count: WorkflowEtapeCountAggregateOutputType | null;
    _avg: WorkflowEtapeAvgAggregateOutputType | null;
    _sum: WorkflowEtapeSumAggregateOutputType | null;
    _min: WorkflowEtapeMinAggregateOutputType | null;
    _max: WorkflowEtapeMaxAggregateOutputType | null;
};
export type WorkflowEtapeAvgAggregateOutputType = {
    numeroEtape: number | null;
};
export type WorkflowEtapeSumAggregateOutputType = {
    numeroEtape: number | null;
};
export type WorkflowEtapeMinAggregateOutputType = {
    id: string | null;
    workflowId: string | null;
    numeroEtape: number | null;
    nomEtape: string | null;
    description: string | null;
    statut: $Enums.EtapeStatus | null;
    dateDebut: Date | null;
    dateFin: Date | null;
    validePar: string | null;
    commentaires: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type WorkflowEtapeMaxAggregateOutputType = {
    id: string | null;
    workflowId: string | null;
    numeroEtape: number | null;
    nomEtape: string | null;
    description: string | null;
    statut: $Enums.EtapeStatus | null;
    dateDebut: Date | null;
    dateFin: Date | null;
    validePar: string | null;
    commentaires: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type WorkflowEtapeCountAggregateOutputType = {
    id: number;
    workflowId: number;
    numeroEtape: number;
    nomEtape: number;
    description: number;
    statut: number;
    formulaire: number;
    dateDebut: number;
    dateFin: number;
    validePar: number;
    commentaires: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type WorkflowEtapeAvgAggregateInputType = {
    numeroEtape?: true;
};
export type WorkflowEtapeSumAggregateInputType = {
    numeroEtape?: true;
};
export type WorkflowEtapeMinAggregateInputType = {
    id?: true;
    workflowId?: true;
    numeroEtape?: true;
    nomEtape?: true;
    description?: true;
    statut?: true;
    dateDebut?: true;
    dateFin?: true;
    validePar?: true;
    commentaires?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type WorkflowEtapeMaxAggregateInputType = {
    id?: true;
    workflowId?: true;
    numeroEtape?: true;
    nomEtape?: true;
    description?: true;
    statut?: true;
    dateDebut?: true;
    dateFin?: true;
    validePar?: true;
    commentaires?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type WorkflowEtapeCountAggregateInputType = {
    id?: true;
    workflowId?: true;
    numeroEtape?: true;
    nomEtape?: true;
    description?: true;
    statut?: true;
    formulaire?: true;
    dateDebut?: true;
    dateFin?: true;
    validePar?: true;
    commentaires?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type WorkflowEtapeAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkflowEtapeWhereInput;
    orderBy?: Prisma.WorkflowEtapeOrderByWithRelationInput | Prisma.WorkflowEtapeOrderByWithRelationInput[];
    cursor?: Prisma.WorkflowEtapeWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | WorkflowEtapeCountAggregateInputType;
    _avg?: WorkflowEtapeAvgAggregateInputType;
    _sum?: WorkflowEtapeSumAggregateInputType;
    _min?: WorkflowEtapeMinAggregateInputType;
    _max?: WorkflowEtapeMaxAggregateInputType;
};
export type GetWorkflowEtapeAggregateType<T extends WorkflowEtapeAggregateArgs> = {
    [P in keyof T & keyof AggregateWorkflowEtape]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateWorkflowEtape[P]> : Prisma.GetScalarType<T[P], AggregateWorkflowEtape[P]>;
};
export type WorkflowEtapeGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkflowEtapeWhereInput;
    orderBy?: Prisma.WorkflowEtapeOrderByWithAggregationInput | Prisma.WorkflowEtapeOrderByWithAggregationInput[];
    by: Prisma.WorkflowEtapeScalarFieldEnum[] | Prisma.WorkflowEtapeScalarFieldEnum;
    having?: Prisma.WorkflowEtapeScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: WorkflowEtapeCountAggregateInputType | true;
    _avg?: WorkflowEtapeAvgAggregateInputType;
    _sum?: WorkflowEtapeSumAggregateInputType;
    _min?: WorkflowEtapeMinAggregateInputType;
    _max?: WorkflowEtapeMaxAggregateInputType;
};
export type WorkflowEtapeGroupByOutputType = {
    id: string;
    workflowId: string;
    numeroEtape: number;
    nomEtape: string;
    description: string | null;
    statut: $Enums.EtapeStatus;
    formulaire: runtime.JsonValue | null;
    dateDebut: Date | null;
    dateFin: Date | null;
    validePar: string | null;
    commentaires: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: WorkflowEtapeCountAggregateOutputType | null;
    _avg: WorkflowEtapeAvgAggregateOutputType | null;
    _sum: WorkflowEtapeSumAggregateOutputType | null;
    _min: WorkflowEtapeMinAggregateOutputType | null;
    _max: WorkflowEtapeMaxAggregateOutputType | null;
};
type GetWorkflowEtapeGroupByPayload<T extends WorkflowEtapeGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<WorkflowEtapeGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof WorkflowEtapeGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], WorkflowEtapeGroupByOutputType[P]> : Prisma.GetScalarType<T[P], WorkflowEtapeGroupByOutputType[P]>;
}>>;
export type WorkflowEtapeWhereInput = {
    AND?: Prisma.WorkflowEtapeWhereInput | Prisma.WorkflowEtapeWhereInput[];
    OR?: Prisma.WorkflowEtapeWhereInput[];
    NOT?: Prisma.WorkflowEtapeWhereInput | Prisma.WorkflowEtapeWhereInput[];
    id?: Prisma.StringFilter<"WorkflowEtape"> | string;
    workflowId?: Prisma.StringFilter<"WorkflowEtape"> | string;
    numeroEtape?: Prisma.IntFilter<"WorkflowEtape"> | number;
    nomEtape?: Prisma.StringFilter<"WorkflowEtape"> | string;
    description?: Prisma.StringNullableFilter<"WorkflowEtape"> | string | null;
    statut?: Prisma.EnumEtapeStatusFilter<"WorkflowEtape"> | $Enums.EtapeStatus;
    formulaire?: Prisma.JsonNullableFilter<"WorkflowEtape">;
    dateDebut?: Prisma.DateTimeNullableFilter<"WorkflowEtape"> | Date | string | null;
    dateFin?: Prisma.DateTimeNullableFilter<"WorkflowEtape"> | Date | string | null;
    validePar?: Prisma.StringNullableFilter<"WorkflowEtape"> | string | null;
    commentaires?: Prisma.StringNullableFilter<"WorkflowEtape"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"WorkflowEtape"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"WorkflowEtape"> | Date | string;
    workflow?: Prisma.XOR<Prisma.WorkflowScalarRelationFilter, Prisma.WorkflowWhereInput>;
};
export type WorkflowEtapeOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    workflowId?: Prisma.SortOrder;
    numeroEtape?: Prisma.SortOrder;
    nomEtape?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    statut?: Prisma.SortOrder;
    formulaire?: Prisma.SortOrderInput | Prisma.SortOrder;
    dateDebut?: Prisma.SortOrderInput | Prisma.SortOrder;
    dateFin?: Prisma.SortOrderInput | Prisma.SortOrder;
    validePar?: Prisma.SortOrderInput | Prisma.SortOrder;
    commentaires?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    workflow?: Prisma.WorkflowOrderByWithRelationInput;
};
export type WorkflowEtapeWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    workflowId_numeroEtape?: Prisma.WorkflowEtapeWorkflowIdNumeroEtapeCompoundUniqueInput;
    AND?: Prisma.WorkflowEtapeWhereInput | Prisma.WorkflowEtapeWhereInput[];
    OR?: Prisma.WorkflowEtapeWhereInput[];
    NOT?: Prisma.WorkflowEtapeWhereInput | Prisma.WorkflowEtapeWhereInput[];
    workflowId?: Prisma.StringFilter<"WorkflowEtape"> | string;
    numeroEtape?: Prisma.IntFilter<"WorkflowEtape"> | number;
    nomEtape?: Prisma.StringFilter<"WorkflowEtape"> | string;
    description?: Prisma.StringNullableFilter<"WorkflowEtape"> | string | null;
    statut?: Prisma.EnumEtapeStatusFilter<"WorkflowEtape"> | $Enums.EtapeStatus;
    formulaire?: Prisma.JsonNullableFilter<"WorkflowEtape">;
    dateDebut?: Prisma.DateTimeNullableFilter<"WorkflowEtape"> | Date | string | null;
    dateFin?: Prisma.DateTimeNullableFilter<"WorkflowEtape"> | Date | string | null;
    validePar?: Prisma.StringNullableFilter<"WorkflowEtape"> | string | null;
    commentaires?: Prisma.StringNullableFilter<"WorkflowEtape"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"WorkflowEtape"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"WorkflowEtape"> | Date | string;
    workflow?: Prisma.XOR<Prisma.WorkflowScalarRelationFilter, Prisma.WorkflowWhereInput>;
}, "id" | "workflowId_numeroEtape">;
export type WorkflowEtapeOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    workflowId?: Prisma.SortOrder;
    numeroEtape?: Prisma.SortOrder;
    nomEtape?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    statut?: Prisma.SortOrder;
    formulaire?: Prisma.SortOrderInput | Prisma.SortOrder;
    dateDebut?: Prisma.SortOrderInput | Prisma.SortOrder;
    dateFin?: Prisma.SortOrderInput | Prisma.SortOrder;
    validePar?: Prisma.SortOrderInput | Prisma.SortOrder;
    commentaires?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.WorkflowEtapeCountOrderByAggregateInput;
    _avg?: Prisma.WorkflowEtapeAvgOrderByAggregateInput;
    _max?: Prisma.WorkflowEtapeMaxOrderByAggregateInput;
    _min?: Prisma.WorkflowEtapeMinOrderByAggregateInput;
    _sum?: Prisma.WorkflowEtapeSumOrderByAggregateInput;
};
export type WorkflowEtapeScalarWhereWithAggregatesInput = {
    AND?: Prisma.WorkflowEtapeScalarWhereWithAggregatesInput | Prisma.WorkflowEtapeScalarWhereWithAggregatesInput[];
    OR?: Prisma.WorkflowEtapeScalarWhereWithAggregatesInput[];
    NOT?: Prisma.WorkflowEtapeScalarWhereWithAggregatesInput | Prisma.WorkflowEtapeScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"WorkflowEtape"> | string;
    workflowId?: Prisma.StringWithAggregatesFilter<"WorkflowEtape"> | string;
    numeroEtape?: Prisma.IntWithAggregatesFilter<"WorkflowEtape"> | number;
    nomEtape?: Prisma.StringWithAggregatesFilter<"WorkflowEtape"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"WorkflowEtape"> | string | null;
    statut?: Prisma.EnumEtapeStatusWithAggregatesFilter<"WorkflowEtape"> | $Enums.EtapeStatus;
    formulaire?: Prisma.JsonNullableWithAggregatesFilter<"WorkflowEtape">;
    dateDebut?: Prisma.DateTimeNullableWithAggregatesFilter<"WorkflowEtape"> | Date | string | null;
    dateFin?: Prisma.DateTimeNullableWithAggregatesFilter<"WorkflowEtape"> | Date | string | null;
    validePar?: Prisma.StringNullableWithAggregatesFilter<"WorkflowEtape"> | string | null;
    commentaires?: Prisma.StringNullableWithAggregatesFilter<"WorkflowEtape"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"WorkflowEtape"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"WorkflowEtape"> | Date | string;
};
export type WorkflowEtapeCreateInput = {
    id?: string;
    numeroEtape: number;
    nomEtape: string;
    description?: string | null;
    statut?: $Enums.EtapeStatus;
    formulaire?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    dateDebut?: Date | string | null;
    dateFin?: Date | string | null;
    validePar?: string | null;
    commentaires?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    workflow: Prisma.WorkflowCreateNestedOneWithoutEtapesInput;
};
export type WorkflowEtapeUncheckedCreateInput = {
    id?: string;
    workflowId: string;
    numeroEtape: number;
    nomEtape: string;
    description?: string | null;
    statut?: $Enums.EtapeStatus;
    formulaire?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    dateDebut?: Date | string | null;
    dateFin?: Date | string | null;
    validePar?: string | null;
    commentaires?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WorkflowEtapeUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    numeroEtape?: Prisma.IntFieldUpdateOperationsInput | number;
    nomEtape?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    statut?: Prisma.EnumEtapeStatusFieldUpdateOperationsInput | $Enums.EtapeStatus;
    formulaire?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    dateDebut?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dateFin?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    validePar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentaires?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    workflow?: Prisma.WorkflowUpdateOneRequiredWithoutEtapesNestedInput;
};
export type WorkflowEtapeUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    workflowId?: Prisma.StringFieldUpdateOperationsInput | string;
    numeroEtape?: Prisma.IntFieldUpdateOperationsInput | number;
    nomEtape?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    statut?: Prisma.EnumEtapeStatusFieldUpdateOperationsInput | $Enums.EtapeStatus;
    formulaire?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    dateDebut?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dateFin?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    validePar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentaires?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkflowEtapeCreateManyInput = {
    id?: string;
    workflowId: string;
    numeroEtape: number;
    nomEtape: string;
    description?: string | null;
    statut?: $Enums.EtapeStatus;
    formulaire?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    dateDebut?: Date | string | null;
    dateFin?: Date | string | null;
    validePar?: string | null;
    commentaires?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WorkflowEtapeUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    numeroEtape?: Prisma.IntFieldUpdateOperationsInput | number;
    nomEtape?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    statut?: Prisma.EnumEtapeStatusFieldUpdateOperationsInput | $Enums.EtapeStatus;
    formulaire?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    dateDebut?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dateFin?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    validePar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentaires?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkflowEtapeUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    workflowId?: Prisma.StringFieldUpdateOperationsInput | string;
    numeroEtape?: Prisma.IntFieldUpdateOperationsInput | number;
    nomEtape?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    statut?: Prisma.EnumEtapeStatusFieldUpdateOperationsInput | $Enums.EtapeStatus;
    formulaire?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    dateDebut?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dateFin?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    validePar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentaires?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkflowEtapeListRelationFilter = {
    every?: Prisma.WorkflowEtapeWhereInput;
    some?: Prisma.WorkflowEtapeWhereInput;
    none?: Prisma.WorkflowEtapeWhereInput;
};
export type WorkflowEtapeOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type WorkflowEtapeWorkflowIdNumeroEtapeCompoundUniqueInput = {
    workflowId: string;
    numeroEtape: number;
};
export type WorkflowEtapeCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    workflowId?: Prisma.SortOrder;
    numeroEtape?: Prisma.SortOrder;
    nomEtape?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    statut?: Prisma.SortOrder;
    formulaire?: Prisma.SortOrder;
    dateDebut?: Prisma.SortOrder;
    dateFin?: Prisma.SortOrder;
    validePar?: Prisma.SortOrder;
    commentaires?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WorkflowEtapeAvgOrderByAggregateInput = {
    numeroEtape?: Prisma.SortOrder;
};
export type WorkflowEtapeMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    workflowId?: Prisma.SortOrder;
    numeroEtape?: Prisma.SortOrder;
    nomEtape?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    statut?: Prisma.SortOrder;
    dateDebut?: Prisma.SortOrder;
    dateFin?: Prisma.SortOrder;
    validePar?: Prisma.SortOrder;
    commentaires?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WorkflowEtapeMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    workflowId?: Prisma.SortOrder;
    numeroEtape?: Prisma.SortOrder;
    nomEtape?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    statut?: Prisma.SortOrder;
    dateDebut?: Prisma.SortOrder;
    dateFin?: Prisma.SortOrder;
    validePar?: Prisma.SortOrder;
    commentaires?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WorkflowEtapeSumOrderByAggregateInput = {
    numeroEtape?: Prisma.SortOrder;
};
export type WorkflowEtapeCreateNestedManyWithoutWorkflowInput = {
    create?: Prisma.XOR<Prisma.WorkflowEtapeCreateWithoutWorkflowInput, Prisma.WorkflowEtapeUncheckedCreateWithoutWorkflowInput> | Prisma.WorkflowEtapeCreateWithoutWorkflowInput[] | Prisma.WorkflowEtapeUncheckedCreateWithoutWorkflowInput[];
    connectOrCreate?: Prisma.WorkflowEtapeCreateOrConnectWithoutWorkflowInput | Prisma.WorkflowEtapeCreateOrConnectWithoutWorkflowInput[];
    createMany?: Prisma.WorkflowEtapeCreateManyWorkflowInputEnvelope;
    connect?: Prisma.WorkflowEtapeWhereUniqueInput | Prisma.WorkflowEtapeWhereUniqueInput[];
};
export type WorkflowEtapeUncheckedCreateNestedManyWithoutWorkflowInput = {
    create?: Prisma.XOR<Prisma.WorkflowEtapeCreateWithoutWorkflowInput, Prisma.WorkflowEtapeUncheckedCreateWithoutWorkflowInput> | Prisma.WorkflowEtapeCreateWithoutWorkflowInput[] | Prisma.WorkflowEtapeUncheckedCreateWithoutWorkflowInput[];
    connectOrCreate?: Prisma.WorkflowEtapeCreateOrConnectWithoutWorkflowInput | Prisma.WorkflowEtapeCreateOrConnectWithoutWorkflowInput[];
    createMany?: Prisma.WorkflowEtapeCreateManyWorkflowInputEnvelope;
    connect?: Prisma.WorkflowEtapeWhereUniqueInput | Prisma.WorkflowEtapeWhereUniqueInput[];
};
export type WorkflowEtapeUpdateManyWithoutWorkflowNestedInput = {
    create?: Prisma.XOR<Prisma.WorkflowEtapeCreateWithoutWorkflowInput, Prisma.WorkflowEtapeUncheckedCreateWithoutWorkflowInput> | Prisma.WorkflowEtapeCreateWithoutWorkflowInput[] | Prisma.WorkflowEtapeUncheckedCreateWithoutWorkflowInput[];
    connectOrCreate?: Prisma.WorkflowEtapeCreateOrConnectWithoutWorkflowInput | Prisma.WorkflowEtapeCreateOrConnectWithoutWorkflowInput[];
    upsert?: Prisma.WorkflowEtapeUpsertWithWhereUniqueWithoutWorkflowInput | Prisma.WorkflowEtapeUpsertWithWhereUniqueWithoutWorkflowInput[];
    createMany?: Prisma.WorkflowEtapeCreateManyWorkflowInputEnvelope;
    set?: Prisma.WorkflowEtapeWhereUniqueInput | Prisma.WorkflowEtapeWhereUniqueInput[];
    disconnect?: Prisma.WorkflowEtapeWhereUniqueInput | Prisma.WorkflowEtapeWhereUniqueInput[];
    delete?: Prisma.WorkflowEtapeWhereUniqueInput | Prisma.WorkflowEtapeWhereUniqueInput[];
    connect?: Prisma.WorkflowEtapeWhereUniqueInput | Prisma.WorkflowEtapeWhereUniqueInput[];
    update?: Prisma.WorkflowEtapeUpdateWithWhereUniqueWithoutWorkflowInput | Prisma.WorkflowEtapeUpdateWithWhereUniqueWithoutWorkflowInput[];
    updateMany?: Prisma.WorkflowEtapeUpdateManyWithWhereWithoutWorkflowInput | Prisma.WorkflowEtapeUpdateManyWithWhereWithoutWorkflowInput[];
    deleteMany?: Prisma.WorkflowEtapeScalarWhereInput | Prisma.WorkflowEtapeScalarWhereInput[];
};
export type WorkflowEtapeUncheckedUpdateManyWithoutWorkflowNestedInput = {
    create?: Prisma.XOR<Prisma.WorkflowEtapeCreateWithoutWorkflowInput, Prisma.WorkflowEtapeUncheckedCreateWithoutWorkflowInput> | Prisma.WorkflowEtapeCreateWithoutWorkflowInput[] | Prisma.WorkflowEtapeUncheckedCreateWithoutWorkflowInput[];
    connectOrCreate?: Prisma.WorkflowEtapeCreateOrConnectWithoutWorkflowInput | Prisma.WorkflowEtapeCreateOrConnectWithoutWorkflowInput[];
    upsert?: Prisma.WorkflowEtapeUpsertWithWhereUniqueWithoutWorkflowInput | Prisma.WorkflowEtapeUpsertWithWhereUniqueWithoutWorkflowInput[];
    createMany?: Prisma.WorkflowEtapeCreateManyWorkflowInputEnvelope;
    set?: Prisma.WorkflowEtapeWhereUniqueInput | Prisma.WorkflowEtapeWhereUniqueInput[];
    disconnect?: Prisma.WorkflowEtapeWhereUniqueInput | Prisma.WorkflowEtapeWhereUniqueInput[];
    delete?: Prisma.WorkflowEtapeWhereUniqueInput | Prisma.WorkflowEtapeWhereUniqueInput[];
    connect?: Prisma.WorkflowEtapeWhereUniqueInput | Prisma.WorkflowEtapeWhereUniqueInput[];
    update?: Prisma.WorkflowEtapeUpdateWithWhereUniqueWithoutWorkflowInput | Prisma.WorkflowEtapeUpdateWithWhereUniqueWithoutWorkflowInput[];
    updateMany?: Prisma.WorkflowEtapeUpdateManyWithWhereWithoutWorkflowInput | Prisma.WorkflowEtapeUpdateManyWithWhereWithoutWorkflowInput[];
    deleteMany?: Prisma.WorkflowEtapeScalarWhereInput | Prisma.WorkflowEtapeScalarWhereInput[];
};
export type EnumEtapeStatusFieldUpdateOperationsInput = {
    set?: $Enums.EtapeStatus;
};
export type WorkflowEtapeCreateWithoutWorkflowInput = {
    id?: string;
    numeroEtape: number;
    nomEtape: string;
    description?: string | null;
    statut?: $Enums.EtapeStatus;
    formulaire?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    dateDebut?: Date | string | null;
    dateFin?: Date | string | null;
    validePar?: string | null;
    commentaires?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WorkflowEtapeUncheckedCreateWithoutWorkflowInput = {
    id?: string;
    numeroEtape: number;
    nomEtape: string;
    description?: string | null;
    statut?: $Enums.EtapeStatus;
    formulaire?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    dateDebut?: Date | string | null;
    dateFin?: Date | string | null;
    validePar?: string | null;
    commentaires?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WorkflowEtapeCreateOrConnectWithoutWorkflowInput = {
    where: Prisma.WorkflowEtapeWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkflowEtapeCreateWithoutWorkflowInput, Prisma.WorkflowEtapeUncheckedCreateWithoutWorkflowInput>;
};
export type WorkflowEtapeCreateManyWorkflowInputEnvelope = {
    data: Prisma.WorkflowEtapeCreateManyWorkflowInput | Prisma.WorkflowEtapeCreateManyWorkflowInput[];
    skipDuplicates?: boolean;
};
export type WorkflowEtapeUpsertWithWhereUniqueWithoutWorkflowInput = {
    where: Prisma.WorkflowEtapeWhereUniqueInput;
    update: Prisma.XOR<Prisma.WorkflowEtapeUpdateWithoutWorkflowInput, Prisma.WorkflowEtapeUncheckedUpdateWithoutWorkflowInput>;
    create: Prisma.XOR<Prisma.WorkflowEtapeCreateWithoutWorkflowInput, Prisma.WorkflowEtapeUncheckedCreateWithoutWorkflowInput>;
};
export type WorkflowEtapeUpdateWithWhereUniqueWithoutWorkflowInput = {
    where: Prisma.WorkflowEtapeWhereUniqueInput;
    data: Prisma.XOR<Prisma.WorkflowEtapeUpdateWithoutWorkflowInput, Prisma.WorkflowEtapeUncheckedUpdateWithoutWorkflowInput>;
};
export type WorkflowEtapeUpdateManyWithWhereWithoutWorkflowInput = {
    where: Prisma.WorkflowEtapeScalarWhereInput;
    data: Prisma.XOR<Prisma.WorkflowEtapeUpdateManyMutationInput, Prisma.WorkflowEtapeUncheckedUpdateManyWithoutWorkflowInput>;
};
export type WorkflowEtapeScalarWhereInput = {
    AND?: Prisma.WorkflowEtapeScalarWhereInput | Prisma.WorkflowEtapeScalarWhereInput[];
    OR?: Prisma.WorkflowEtapeScalarWhereInput[];
    NOT?: Prisma.WorkflowEtapeScalarWhereInput | Prisma.WorkflowEtapeScalarWhereInput[];
    id?: Prisma.StringFilter<"WorkflowEtape"> | string;
    workflowId?: Prisma.StringFilter<"WorkflowEtape"> | string;
    numeroEtape?: Prisma.IntFilter<"WorkflowEtape"> | number;
    nomEtape?: Prisma.StringFilter<"WorkflowEtape"> | string;
    description?: Prisma.StringNullableFilter<"WorkflowEtape"> | string | null;
    statut?: Prisma.EnumEtapeStatusFilter<"WorkflowEtape"> | $Enums.EtapeStatus;
    formulaire?: Prisma.JsonNullableFilter<"WorkflowEtape">;
    dateDebut?: Prisma.DateTimeNullableFilter<"WorkflowEtape"> | Date | string | null;
    dateFin?: Prisma.DateTimeNullableFilter<"WorkflowEtape"> | Date | string | null;
    validePar?: Prisma.StringNullableFilter<"WorkflowEtape"> | string | null;
    commentaires?: Prisma.StringNullableFilter<"WorkflowEtape"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"WorkflowEtape"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"WorkflowEtape"> | Date | string;
};
export type WorkflowEtapeCreateManyWorkflowInput = {
    id?: string;
    numeroEtape: number;
    nomEtape: string;
    description?: string | null;
    statut?: $Enums.EtapeStatus;
    formulaire?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    dateDebut?: Date | string | null;
    dateFin?: Date | string | null;
    validePar?: string | null;
    commentaires?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WorkflowEtapeUpdateWithoutWorkflowInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    numeroEtape?: Prisma.IntFieldUpdateOperationsInput | number;
    nomEtape?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    statut?: Prisma.EnumEtapeStatusFieldUpdateOperationsInput | $Enums.EtapeStatus;
    formulaire?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    dateDebut?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dateFin?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    validePar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentaires?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkflowEtapeUncheckedUpdateWithoutWorkflowInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    numeroEtape?: Prisma.IntFieldUpdateOperationsInput | number;
    nomEtape?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    statut?: Prisma.EnumEtapeStatusFieldUpdateOperationsInput | $Enums.EtapeStatus;
    formulaire?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    dateDebut?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dateFin?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    validePar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentaires?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkflowEtapeUncheckedUpdateManyWithoutWorkflowInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    numeroEtape?: Prisma.IntFieldUpdateOperationsInput | number;
    nomEtape?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    statut?: Prisma.EnumEtapeStatusFieldUpdateOperationsInput | $Enums.EtapeStatus;
    formulaire?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    dateDebut?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    dateFin?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    validePar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    commentaires?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkflowEtapeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    workflowId?: boolean;
    numeroEtape?: boolean;
    nomEtape?: boolean;
    description?: boolean;
    statut?: boolean;
    formulaire?: boolean;
    dateDebut?: boolean;
    dateFin?: boolean;
    validePar?: boolean;
    commentaires?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    workflow?: boolean | Prisma.WorkflowDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["workflowEtape"]>;
export type WorkflowEtapeSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    workflowId?: boolean;
    numeroEtape?: boolean;
    nomEtape?: boolean;
    description?: boolean;
    statut?: boolean;
    formulaire?: boolean;
    dateDebut?: boolean;
    dateFin?: boolean;
    validePar?: boolean;
    commentaires?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    workflow?: boolean | Prisma.WorkflowDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["workflowEtape"]>;
export type WorkflowEtapeSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    workflowId?: boolean;
    numeroEtape?: boolean;
    nomEtape?: boolean;
    description?: boolean;
    statut?: boolean;
    formulaire?: boolean;
    dateDebut?: boolean;
    dateFin?: boolean;
    validePar?: boolean;
    commentaires?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    workflow?: boolean | Prisma.WorkflowDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["workflowEtape"]>;
export type WorkflowEtapeSelectScalar = {
    id?: boolean;
    workflowId?: boolean;
    numeroEtape?: boolean;
    nomEtape?: boolean;
    description?: boolean;
    statut?: boolean;
    formulaire?: boolean;
    dateDebut?: boolean;
    dateFin?: boolean;
    validePar?: boolean;
    commentaires?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type WorkflowEtapeOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "workflowId" | "numeroEtape" | "nomEtape" | "description" | "statut" | "formulaire" | "dateDebut" | "dateFin" | "validePar" | "commentaires" | "createdAt" | "updatedAt", ExtArgs["result"]["workflowEtape"]>;
export type WorkflowEtapeInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    workflow?: boolean | Prisma.WorkflowDefaultArgs<ExtArgs>;
};
export type WorkflowEtapeIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    workflow?: boolean | Prisma.WorkflowDefaultArgs<ExtArgs>;
};
export type WorkflowEtapeIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    workflow?: boolean | Prisma.WorkflowDefaultArgs<ExtArgs>;
};
export type $WorkflowEtapePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "WorkflowEtape";
    objects: {
        workflow: Prisma.$WorkflowPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        workflowId: string;
        numeroEtape: number;
        nomEtape: string;
        description: string | null;
        statut: $Enums.EtapeStatus;
        formulaire: runtime.JsonValue | null;
        dateDebut: Date | null;
        dateFin: Date | null;
        validePar: string | null;
        commentaires: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["workflowEtape"]>;
    composites: {};
};
export type WorkflowEtapeGetPayload<S extends boolean | null | undefined | WorkflowEtapeDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$WorkflowEtapePayload, S>;
export type WorkflowEtapeCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<WorkflowEtapeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: WorkflowEtapeCountAggregateInputType | true;
};
export interface WorkflowEtapeDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['WorkflowEtape'];
        meta: {
            name: 'WorkflowEtape';
        };
    };
    findUnique<T extends WorkflowEtapeFindUniqueArgs>(args: Prisma.SelectSubset<T, WorkflowEtapeFindUniqueArgs<ExtArgs>>): Prisma.Prisma__WorkflowEtapeClient<runtime.Types.Result.GetResult<Prisma.$WorkflowEtapePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends WorkflowEtapeFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, WorkflowEtapeFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__WorkflowEtapeClient<runtime.Types.Result.GetResult<Prisma.$WorkflowEtapePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends WorkflowEtapeFindFirstArgs>(args?: Prisma.SelectSubset<T, WorkflowEtapeFindFirstArgs<ExtArgs>>): Prisma.Prisma__WorkflowEtapeClient<runtime.Types.Result.GetResult<Prisma.$WorkflowEtapePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends WorkflowEtapeFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, WorkflowEtapeFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__WorkflowEtapeClient<runtime.Types.Result.GetResult<Prisma.$WorkflowEtapePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends WorkflowEtapeFindManyArgs>(args?: Prisma.SelectSubset<T, WorkflowEtapeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkflowEtapePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends WorkflowEtapeCreateArgs>(args: Prisma.SelectSubset<T, WorkflowEtapeCreateArgs<ExtArgs>>): Prisma.Prisma__WorkflowEtapeClient<runtime.Types.Result.GetResult<Prisma.$WorkflowEtapePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends WorkflowEtapeCreateManyArgs>(args?: Prisma.SelectSubset<T, WorkflowEtapeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends WorkflowEtapeCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, WorkflowEtapeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkflowEtapePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends WorkflowEtapeDeleteArgs>(args: Prisma.SelectSubset<T, WorkflowEtapeDeleteArgs<ExtArgs>>): Prisma.Prisma__WorkflowEtapeClient<runtime.Types.Result.GetResult<Prisma.$WorkflowEtapePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends WorkflowEtapeUpdateArgs>(args: Prisma.SelectSubset<T, WorkflowEtapeUpdateArgs<ExtArgs>>): Prisma.Prisma__WorkflowEtapeClient<runtime.Types.Result.GetResult<Prisma.$WorkflowEtapePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends WorkflowEtapeDeleteManyArgs>(args?: Prisma.SelectSubset<T, WorkflowEtapeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends WorkflowEtapeUpdateManyArgs>(args: Prisma.SelectSubset<T, WorkflowEtapeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends WorkflowEtapeUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, WorkflowEtapeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkflowEtapePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends WorkflowEtapeUpsertArgs>(args: Prisma.SelectSubset<T, WorkflowEtapeUpsertArgs<ExtArgs>>): Prisma.Prisma__WorkflowEtapeClient<runtime.Types.Result.GetResult<Prisma.$WorkflowEtapePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends WorkflowEtapeCountArgs>(args?: Prisma.Subset<T, WorkflowEtapeCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], WorkflowEtapeCountAggregateOutputType> : number>;
    aggregate<T extends WorkflowEtapeAggregateArgs>(args: Prisma.Subset<T, WorkflowEtapeAggregateArgs>): Prisma.PrismaPromise<GetWorkflowEtapeAggregateType<T>>;
    groupBy<T extends WorkflowEtapeGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: WorkflowEtapeGroupByArgs['orderBy'];
    } : {
        orderBy?: WorkflowEtapeGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, WorkflowEtapeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkflowEtapeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: WorkflowEtapeFieldRefs;
}
export interface Prisma__WorkflowEtapeClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    workflow<T extends Prisma.WorkflowDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkflowDefaultArgs<ExtArgs>>): Prisma.Prisma__WorkflowClient<runtime.Types.Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface WorkflowEtapeFieldRefs {
    readonly id: Prisma.FieldRef<"WorkflowEtape", 'String'>;
    readonly workflowId: Prisma.FieldRef<"WorkflowEtape", 'String'>;
    readonly numeroEtape: Prisma.FieldRef<"WorkflowEtape", 'Int'>;
    readonly nomEtape: Prisma.FieldRef<"WorkflowEtape", 'String'>;
    readonly description: Prisma.FieldRef<"WorkflowEtape", 'String'>;
    readonly statut: Prisma.FieldRef<"WorkflowEtape", 'EtapeStatus'>;
    readonly formulaire: Prisma.FieldRef<"WorkflowEtape", 'Json'>;
    readonly dateDebut: Prisma.FieldRef<"WorkflowEtape", 'DateTime'>;
    readonly dateFin: Prisma.FieldRef<"WorkflowEtape", 'DateTime'>;
    readonly validePar: Prisma.FieldRef<"WorkflowEtape", 'String'>;
    readonly commentaires: Prisma.FieldRef<"WorkflowEtape", 'String'>;
    readonly createdAt: Prisma.FieldRef<"WorkflowEtape", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"WorkflowEtape", 'DateTime'>;
}
export type WorkflowEtapeFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkflowEtapeSelect<ExtArgs> | null;
    omit?: Prisma.WorkflowEtapeOmit<ExtArgs> | null;
    include?: Prisma.WorkflowEtapeInclude<ExtArgs> | null;
    where: Prisma.WorkflowEtapeWhereUniqueInput;
};
export type WorkflowEtapeFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkflowEtapeSelect<ExtArgs> | null;
    omit?: Prisma.WorkflowEtapeOmit<ExtArgs> | null;
    include?: Prisma.WorkflowEtapeInclude<ExtArgs> | null;
    where: Prisma.WorkflowEtapeWhereUniqueInput;
};
export type WorkflowEtapeFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type WorkflowEtapeFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type WorkflowEtapeFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type WorkflowEtapeCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkflowEtapeSelect<ExtArgs> | null;
    omit?: Prisma.WorkflowEtapeOmit<ExtArgs> | null;
    include?: Prisma.WorkflowEtapeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WorkflowEtapeCreateInput, Prisma.WorkflowEtapeUncheckedCreateInput>;
};
export type WorkflowEtapeCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.WorkflowEtapeCreateManyInput | Prisma.WorkflowEtapeCreateManyInput[];
    skipDuplicates?: boolean;
};
export type WorkflowEtapeCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkflowEtapeSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.WorkflowEtapeOmit<ExtArgs> | null;
    data: Prisma.WorkflowEtapeCreateManyInput | Prisma.WorkflowEtapeCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.WorkflowEtapeIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type WorkflowEtapeUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkflowEtapeSelect<ExtArgs> | null;
    omit?: Prisma.WorkflowEtapeOmit<ExtArgs> | null;
    include?: Prisma.WorkflowEtapeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WorkflowEtapeUpdateInput, Prisma.WorkflowEtapeUncheckedUpdateInput>;
    where: Prisma.WorkflowEtapeWhereUniqueInput;
};
export type WorkflowEtapeUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.WorkflowEtapeUpdateManyMutationInput, Prisma.WorkflowEtapeUncheckedUpdateManyInput>;
    where?: Prisma.WorkflowEtapeWhereInput;
    limit?: number;
};
export type WorkflowEtapeUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkflowEtapeSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.WorkflowEtapeOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WorkflowEtapeUpdateManyMutationInput, Prisma.WorkflowEtapeUncheckedUpdateManyInput>;
    where?: Prisma.WorkflowEtapeWhereInput;
    limit?: number;
    include?: Prisma.WorkflowEtapeIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type WorkflowEtapeUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkflowEtapeSelect<ExtArgs> | null;
    omit?: Prisma.WorkflowEtapeOmit<ExtArgs> | null;
    include?: Prisma.WorkflowEtapeInclude<ExtArgs> | null;
    where: Prisma.WorkflowEtapeWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkflowEtapeCreateInput, Prisma.WorkflowEtapeUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.WorkflowEtapeUpdateInput, Prisma.WorkflowEtapeUncheckedUpdateInput>;
};
export type WorkflowEtapeDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkflowEtapeSelect<ExtArgs> | null;
    omit?: Prisma.WorkflowEtapeOmit<ExtArgs> | null;
    include?: Prisma.WorkflowEtapeInclude<ExtArgs> | null;
    where: Prisma.WorkflowEtapeWhereUniqueInput;
};
export type WorkflowEtapeDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkflowEtapeWhereInput;
    limit?: number;
};
export type WorkflowEtapeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkflowEtapeSelect<ExtArgs> | null;
    omit?: Prisma.WorkflowEtapeOmit<ExtArgs> | null;
    include?: Prisma.WorkflowEtapeInclude<ExtArgs> | null;
};
export {};
