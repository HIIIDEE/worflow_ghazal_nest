import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type VehicleModel = runtime.Types.Result.DefaultSelection<Prisma.$VehiclePayload>;
export type AggregateVehicle = {
    _count: VehicleCountAggregateOutputType | null;
    _avg: VehicleAvgAggregateOutputType | null;
    _sum: VehicleSumAggregateOutputType | null;
    _min: VehicleMinAggregateOutputType | null;
    _max: VehicleMaxAggregateOutputType | null;
};
export type VehicleAvgAggregateOutputType = {
    annee: number | null;
};
export type VehicleSumAggregateOutputType = {
    annee: number | null;
};
export type VehicleMinAggregateOutputType = {
    id: string | null;
    immatriculation: string | null;
    marque: string | null;
    modele: string | null;
    annee: number | null;
    numeroSerie: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type VehicleMaxAggregateOutputType = {
    id: string | null;
    immatriculation: string | null;
    marque: string | null;
    modele: string | null;
    annee: number | null;
    numeroSerie: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type VehicleCountAggregateOutputType = {
    id: number;
    immatriculation: number;
    marque: number;
    modele: number;
    annee: number;
    numeroSerie: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type VehicleAvgAggregateInputType = {
    annee?: true;
};
export type VehicleSumAggregateInputType = {
    annee?: true;
};
export type VehicleMinAggregateInputType = {
    id?: true;
    immatriculation?: true;
    marque?: true;
    modele?: true;
    annee?: true;
    numeroSerie?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type VehicleMaxAggregateInputType = {
    id?: true;
    immatriculation?: true;
    marque?: true;
    modele?: true;
    annee?: true;
    numeroSerie?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type VehicleCountAggregateInputType = {
    id?: true;
    immatriculation?: true;
    marque?: true;
    modele?: true;
    annee?: true;
    numeroSerie?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type VehicleAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VehicleWhereInput;
    orderBy?: Prisma.VehicleOrderByWithRelationInput | Prisma.VehicleOrderByWithRelationInput[];
    cursor?: Prisma.VehicleWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | VehicleCountAggregateInputType;
    _avg?: VehicleAvgAggregateInputType;
    _sum?: VehicleSumAggregateInputType;
    _min?: VehicleMinAggregateInputType;
    _max?: VehicleMaxAggregateInputType;
};
export type GetVehicleAggregateType<T extends VehicleAggregateArgs> = {
    [P in keyof T & keyof AggregateVehicle]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateVehicle[P]> : Prisma.GetScalarType<T[P], AggregateVehicle[P]>;
};
export type VehicleGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VehicleWhereInput;
    orderBy?: Prisma.VehicleOrderByWithAggregationInput | Prisma.VehicleOrderByWithAggregationInput[];
    by: Prisma.VehicleScalarFieldEnum[] | Prisma.VehicleScalarFieldEnum;
    having?: Prisma.VehicleScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: VehicleCountAggregateInputType | true;
    _avg?: VehicleAvgAggregateInputType;
    _sum?: VehicleSumAggregateInputType;
    _min?: VehicleMinAggregateInputType;
    _max?: VehicleMaxAggregateInputType;
};
export type VehicleGroupByOutputType = {
    id: string;
    immatriculation: string;
    marque: string;
    modele: string;
    annee: number;
    numeroSerie: string;
    createdAt: Date;
    updatedAt: Date;
    _count: VehicleCountAggregateOutputType | null;
    _avg: VehicleAvgAggregateOutputType | null;
    _sum: VehicleSumAggregateOutputType | null;
    _min: VehicleMinAggregateOutputType | null;
    _max: VehicleMaxAggregateOutputType | null;
};
type GetVehicleGroupByPayload<T extends VehicleGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<VehicleGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof VehicleGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], VehicleGroupByOutputType[P]> : Prisma.GetScalarType<T[P], VehicleGroupByOutputType[P]>;
}>>;
export type VehicleWhereInput = {
    AND?: Prisma.VehicleWhereInput | Prisma.VehicleWhereInput[];
    OR?: Prisma.VehicleWhereInput[];
    NOT?: Prisma.VehicleWhereInput | Prisma.VehicleWhereInput[];
    id?: Prisma.StringFilter<"Vehicle"> | string;
    immatriculation?: Prisma.StringFilter<"Vehicle"> | string;
    marque?: Prisma.StringFilter<"Vehicle"> | string;
    modele?: Prisma.StringFilter<"Vehicle"> | string;
    annee?: Prisma.IntFilter<"Vehicle"> | number;
    numeroSerie?: Prisma.StringFilter<"Vehicle"> | string;
    createdAt?: Prisma.DateTimeFilter<"Vehicle"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Vehicle"> | Date | string;
    workflows?: Prisma.WorkflowListRelationFilter;
};
export type VehicleOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    immatriculation?: Prisma.SortOrder;
    marque?: Prisma.SortOrder;
    modele?: Prisma.SortOrder;
    annee?: Prisma.SortOrder;
    numeroSerie?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    workflows?: Prisma.WorkflowOrderByRelationAggregateInput;
};
export type VehicleWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    immatriculation?: string;
    numeroSerie?: string;
    AND?: Prisma.VehicleWhereInput | Prisma.VehicleWhereInput[];
    OR?: Prisma.VehicleWhereInput[];
    NOT?: Prisma.VehicleWhereInput | Prisma.VehicleWhereInput[];
    marque?: Prisma.StringFilter<"Vehicle"> | string;
    modele?: Prisma.StringFilter<"Vehicle"> | string;
    annee?: Prisma.IntFilter<"Vehicle"> | number;
    createdAt?: Prisma.DateTimeFilter<"Vehicle"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Vehicle"> | Date | string;
    workflows?: Prisma.WorkflowListRelationFilter;
}, "id" | "immatriculation" | "numeroSerie">;
export type VehicleOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    immatriculation?: Prisma.SortOrder;
    marque?: Prisma.SortOrder;
    modele?: Prisma.SortOrder;
    annee?: Prisma.SortOrder;
    numeroSerie?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.VehicleCountOrderByAggregateInput;
    _avg?: Prisma.VehicleAvgOrderByAggregateInput;
    _max?: Prisma.VehicleMaxOrderByAggregateInput;
    _min?: Prisma.VehicleMinOrderByAggregateInput;
    _sum?: Prisma.VehicleSumOrderByAggregateInput;
};
export type VehicleScalarWhereWithAggregatesInput = {
    AND?: Prisma.VehicleScalarWhereWithAggregatesInput | Prisma.VehicleScalarWhereWithAggregatesInput[];
    OR?: Prisma.VehicleScalarWhereWithAggregatesInput[];
    NOT?: Prisma.VehicleScalarWhereWithAggregatesInput | Prisma.VehicleScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Vehicle"> | string;
    immatriculation?: Prisma.StringWithAggregatesFilter<"Vehicle"> | string;
    marque?: Prisma.StringWithAggregatesFilter<"Vehicle"> | string;
    modele?: Prisma.StringWithAggregatesFilter<"Vehicle"> | string;
    annee?: Prisma.IntWithAggregatesFilter<"Vehicle"> | number;
    numeroSerie?: Prisma.StringWithAggregatesFilter<"Vehicle"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Vehicle"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Vehicle"> | Date | string;
};
export type VehicleCreateInput = {
    id?: string;
    immatriculation: string;
    marque: string;
    modele: string;
    annee: number;
    numeroSerie: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    workflows?: Prisma.WorkflowCreateNestedManyWithoutVehicleInput;
};
export type VehicleUncheckedCreateInput = {
    id?: string;
    immatriculation: string;
    marque: string;
    modele: string;
    annee: number;
    numeroSerie: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    workflows?: Prisma.WorkflowUncheckedCreateNestedManyWithoutVehicleInput;
};
export type VehicleUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    immatriculation?: Prisma.StringFieldUpdateOperationsInput | string;
    marque?: Prisma.StringFieldUpdateOperationsInput | string;
    modele?: Prisma.StringFieldUpdateOperationsInput | string;
    annee?: Prisma.IntFieldUpdateOperationsInput | number;
    numeroSerie?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    workflows?: Prisma.WorkflowUpdateManyWithoutVehicleNestedInput;
};
export type VehicleUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    immatriculation?: Prisma.StringFieldUpdateOperationsInput | string;
    marque?: Prisma.StringFieldUpdateOperationsInput | string;
    modele?: Prisma.StringFieldUpdateOperationsInput | string;
    annee?: Prisma.IntFieldUpdateOperationsInput | number;
    numeroSerie?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    workflows?: Prisma.WorkflowUncheckedUpdateManyWithoutVehicleNestedInput;
};
export type VehicleCreateManyInput = {
    id?: string;
    immatriculation: string;
    marque: string;
    modele: string;
    annee: number;
    numeroSerie: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type VehicleUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    immatriculation?: Prisma.StringFieldUpdateOperationsInput | string;
    marque?: Prisma.StringFieldUpdateOperationsInput | string;
    modele?: Prisma.StringFieldUpdateOperationsInput | string;
    annee?: Prisma.IntFieldUpdateOperationsInput | number;
    numeroSerie?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VehicleUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    immatriculation?: Prisma.StringFieldUpdateOperationsInput | string;
    marque?: Prisma.StringFieldUpdateOperationsInput | string;
    modele?: Prisma.StringFieldUpdateOperationsInput | string;
    annee?: Prisma.IntFieldUpdateOperationsInput | number;
    numeroSerie?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VehicleCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    immatriculation?: Prisma.SortOrder;
    marque?: Prisma.SortOrder;
    modele?: Prisma.SortOrder;
    annee?: Prisma.SortOrder;
    numeroSerie?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type VehicleAvgOrderByAggregateInput = {
    annee?: Prisma.SortOrder;
};
export type VehicleMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    immatriculation?: Prisma.SortOrder;
    marque?: Prisma.SortOrder;
    modele?: Prisma.SortOrder;
    annee?: Prisma.SortOrder;
    numeroSerie?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type VehicleMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    immatriculation?: Prisma.SortOrder;
    marque?: Prisma.SortOrder;
    modele?: Prisma.SortOrder;
    annee?: Prisma.SortOrder;
    numeroSerie?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type VehicleSumOrderByAggregateInput = {
    annee?: Prisma.SortOrder;
};
export type VehicleScalarRelationFilter = {
    is?: Prisma.VehicleWhereInput;
    isNot?: Prisma.VehicleWhereInput;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type VehicleCreateNestedOneWithoutWorkflowsInput = {
    create?: Prisma.XOR<Prisma.VehicleCreateWithoutWorkflowsInput, Prisma.VehicleUncheckedCreateWithoutWorkflowsInput>;
    connectOrCreate?: Prisma.VehicleCreateOrConnectWithoutWorkflowsInput;
    connect?: Prisma.VehicleWhereUniqueInput;
};
export type VehicleUpdateOneRequiredWithoutWorkflowsNestedInput = {
    create?: Prisma.XOR<Prisma.VehicleCreateWithoutWorkflowsInput, Prisma.VehicleUncheckedCreateWithoutWorkflowsInput>;
    connectOrCreate?: Prisma.VehicleCreateOrConnectWithoutWorkflowsInput;
    upsert?: Prisma.VehicleUpsertWithoutWorkflowsInput;
    connect?: Prisma.VehicleWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.VehicleUpdateToOneWithWhereWithoutWorkflowsInput, Prisma.VehicleUpdateWithoutWorkflowsInput>, Prisma.VehicleUncheckedUpdateWithoutWorkflowsInput>;
};
export type VehicleCreateWithoutWorkflowsInput = {
    id?: string;
    immatriculation: string;
    marque: string;
    modele: string;
    annee: number;
    numeroSerie: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type VehicleUncheckedCreateWithoutWorkflowsInput = {
    id?: string;
    immatriculation: string;
    marque: string;
    modele: string;
    annee: number;
    numeroSerie: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type VehicleCreateOrConnectWithoutWorkflowsInput = {
    where: Prisma.VehicleWhereUniqueInput;
    create: Prisma.XOR<Prisma.VehicleCreateWithoutWorkflowsInput, Prisma.VehicleUncheckedCreateWithoutWorkflowsInput>;
};
export type VehicleUpsertWithoutWorkflowsInput = {
    update: Prisma.XOR<Prisma.VehicleUpdateWithoutWorkflowsInput, Prisma.VehicleUncheckedUpdateWithoutWorkflowsInput>;
    create: Prisma.XOR<Prisma.VehicleCreateWithoutWorkflowsInput, Prisma.VehicleUncheckedCreateWithoutWorkflowsInput>;
    where?: Prisma.VehicleWhereInput;
};
export type VehicleUpdateToOneWithWhereWithoutWorkflowsInput = {
    where?: Prisma.VehicleWhereInput;
    data: Prisma.XOR<Prisma.VehicleUpdateWithoutWorkflowsInput, Prisma.VehicleUncheckedUpdateWithoutWorkflowsInput>;
};
export type VehicleUpdateWithoutWorkflowsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    immatriculation?: Prisma.StringFieldUpdateOperationsInput | string;
    marque?: Prisma.StringFieldUpdateOperationsInput | string;
    modele?: Prisma.StringFieldUpdateOperationsInput | string;
    annee?: Prisma.IntFieldUpdateOperationsInput | number;
    numeroSerie?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VehicleUncheckedUpdateWithoutWorkflowsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    immatriculation?: Prisma.StringFieldUpdateOperationsInput | string;
    marque?: Prisma.StringFieldUpdateOperationsInput | string;
    modele?: Prisma.StringFieldUpdateOperationsInput | string;
    annee?: Prisma.IntFieldUpdateOperationsInput | number;
    numeroSerie?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VehicleCountOutputType = {
    workflows: number;
};
export type VehicleCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    workflows?: boolean | VehicleCountOutputTypeCountWorkflowsArgs;
};
export type VehicleCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VehicleCountOutputTypeSelect<ExtArgs> | null;
};
export type VehicleCountOutputTypeCountWorkflowsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkflowWhereInput;
};
export type VehicleSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    immatriculation?: boolean;
    marque?: boolean;
    modele?: boolean;
    annee?: boolean;
    numeroSerie?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    workflows?: boolean | Prisma.Vehicle$workflowsArgs<ExtArgs>;
    _count?: boolean | Prisma.VehicleCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["vehicle"]>;
export type VehicleSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    immatriculation?: boolean;
    marque?: boolean;
    modele?: boolean;
    annee?: boolean;
    numeroSerie?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["vehicle"]>;
export type VehicleSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    immatriculation?: boolean;
    marque?: boolean;
    modele?: boolean;
    annee?: boolean;
    numeroSerie?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["vehicle"]>;
export type VehicleSelectScalar = {
    id?: boolean;
    immatriculation?: boolean;
    marque?: boolean;
    modele?: boolean;
    annee?: boolean;
    numeroSerie?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type VehicleOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "immatriculation" | "marque" | "modele" | "annee" | "numeroSerie" | "createdAt" | "updatedAt", ExtArgs["result"]["vehicle"]>;
export type VehicleInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    workflows?: boolean | Prisma.Vehicle$workflowsArgs<ExtArgs>;
    _count?: boolean | Prisma.VehicleCountOutputTypeDefaultArgs<ExtArgs>;
};
export type VehicleIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type VehicleIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $VehiclePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Vehicle";
    objects: {
        workflows: Prisma.$WorkflowPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        immatriculation: string;
        marque: string;
        modele: string;
        annee: number;
        numeroSerie: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["vehicle"]>;
    composites: {};
};
export type VehicleGetPayload<S extends boolean | null | undefined | VehicleDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$VehiclePayload, S>;
export type VehicleCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<VehicleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: VehicleCountAggregateInputType | true;
};
export interface VehicleDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Vehicle'];
        meta: {
            name: 'Vehicle';
        };
    };
    findUnique<T extends VehicleFindUniqueArgs>(args: Prisma.SelectSubset<T, VehicleFindUniqueArgs<ExtArgs>>): Prisma.Prisma__VehicleClient<runtime.Types.Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends VehicleFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, VehicleFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__VehicleClient<runtime.Types.Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends VehicleFindFirstArgs>(args?: Prisma.SelectSubset<T, VehicleFindFirstArgs<ExtArgs>>): Prisma.Prisma__VehicleClient<runtime.Types.Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends VehicleFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, VehicleFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__VehicleClient<runtime.Types.Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends VehicleFindManyArgs>(args?: Prisma.SelectSubset<T, VehicleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends VehicleCreateArgs>(args: Prisma.SelectSubset<T, VehicleCreateArgs<ExtArgs>>): Prisma.Prisma__VehicleClient<runtime.Types.Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends VehicleCreateManyArgs>(args?: Prisma.SelectSubset<T, VehicleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends VehicleCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, VehicleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends VehicleDeleteArgs>(args: Prisma.SelectSubset<T, VehicleDeleteArgs<ExtArgs>>): Prisma.Prisma__VehicleClient<runtime.Types.Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends VehicleUpdateArgs>(args: Prisma.SelectSubset<T, VehicleUpdateArgs<ExtArgs>>): Prisma.Prisma__VehicleClient<runtime.Types.Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends VehicleDeleteManyArgs>(args?: Prisma.SelectSubset<T, VehicleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends VehicleUpdateManyArgs>(args: Prisma.SelectSubset<T, VehicleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends VehicleUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, VehicleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends VehicleUpsertArgs>(args: Prisma.SelectSubset<T, VehicleUpsertArgs<ExtArgs>>): Prisma.Prisma__VehicleClient<runtime.Types.Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends VehicleCountArgs>(args?: Prisma.Subset<T, VehicleCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], VehicleCountAggregateOutputType> : number>;
    aggregate<T extends VehicleAggregateArgs>(args: Prisma.Subset<T, VehicleAggregateArgs>): Prisma.PrismaPromise<GetVehicleAggregateType<T>>;
    groupBy<T extends VehicleGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: VehicleGroupByArgs['orderBy'];
    } : {
        orderBy?: VehicleGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, VehicleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVehicleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: VehicleFieldRefs;
}
export interface Prisma__VehicleClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    workflows<T extends Prisma.Vehicle$workflowsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Vehicle$workflowsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface VehicleFieldRefs {
    readonly id: Prisma.FieldRef<"Vehicle", 'String'>;
    readonly immatriculation: Prisma.FieldRef<"Vehicle", 'String'>;
    readonly marque: Prisma.FieldRef<"Vehicle", 'String'>;
    readonly modele: Prisma.FieldRef<"Vehicle", 'String'>;
    readonly annee: Prisma.FieldRef<"Vehicle", 'Int'>;
    readonly numeroSerie: Prisma.FieldRef<"Vehicle", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Vehicle", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Vehicle", 'DateTime'>;
}
export type VehicleFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VehicleSelect<ExtArgs> | null;
    omit?: Prisma.VehicleOmit<ExtArgs> | null;
    include?: Prisma.VehicleInclude<ExtArgs> | null;
    where: Prisma.VehicleWhereUniqueInput;
};
export type VehicleFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VehicleSelect<ExtArgs> | null;
    omit?: Prisma.VehicleOmit<ExtArgs> | null;
    include?: Prisma.VehicleInclude<ExtArgs> | null;
    where: Prisma.VehicleWhereUniqueInput;
};
export type VehicleFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VehicleSelect<ExtArgs> | null;
    omit?: Prisma.VehicleOmit<ExtArgs> | null;
    include?: Prisma.VehicleInclude<ExtArgs> | null;
    where?: Prisma.VehicleWhereInput;
    orderBy?: Prisma.VehicleOrderByWithRelationInput | Prisma.VehicleOrderByWithRelationInput[];
    cursor?: Prisma.VehicleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VehicleScalarFieldEnum | Prisma.VehicleScalarFieldEnum[];
};
export type VehicleFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VehicleSelect<ExtArgs> | null;
    omit?: Prisma.VehicleOmit<ExtArgs> | null;
    include?: Prisma.VehicleInclude<ExtArgs> | null;
    where?: Prisma.VehicleWhereInput;
    orderBy?: Prisma.VehicleOrderByWithRelationInput | Prisma.VehicleOrderByWithRelationInput[];
    cursor?: Prisma.VehicleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VehicleScalarFieldEnum | Prisma.VehicleScalarFieldEnum[];
};
export type VehicleFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VehicleSelect<ExtArgs> | null;
    omit?: Prisma.VehicleOmit<ExtArgs> | null;
    include?: Prisma.VehicleInclude<ExtArgs> | null;
    where?: Prisma.VehicleWhereInput;
    orderBy?: Prisma.VehicleOrderByWithRelationInput | Prisma.VehicleOrderByWithRelationInput[];
    cursor?: Prisma.VehicleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VehicleScalarFieldEnum | Prisma.VehicleScalarFieldEnum[];
};
export type VehicleCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VehicleSelect<ExtArgs> | null;
    omit?: Prisma.VehicleOmit<ExtArgs> | null;
    include?: Prisma.VehicleInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VehicleCreateInput, Prisma.VehicleUncheckedCreateInput>;
};
export type VehicleCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.VehicleCreateManyInput | Prisma.VehicleCreateManyInput[];
    skipDuplicates?: boolean;
};
export type VehicleCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VehicleSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.VehicleOmit<ExtArgs> | null;
    data: Prisma.VehicleCreateManyInput | Prisma.VehicleCreateManyInput[];
    skipDuplicates?: boolean;
};
export type VehicleUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VehicleSelect<ExtArgs> | null;
    omit?: Prisma.VehicleOmit<ExtArgs> | null;
    include?: Prisma.VehicleInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VehicleUpdateInput, Prisma.VehicleUncheckedUpdateInput>;
    where: Prisma.VehicleWhereUniqueInput;
};
export type VehicleUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.VehicleUpdateManyMutationInput, Prisma.VehicleUncheckedUpdateManyInput>;
    where?: Prisma.VehicleWhereInput;
    limit?: number;
};
export type VehicleUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VehicleSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.VehicleOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VehicleUpdateManyMutationInput, Prisma.VehicleUncheckedUpdateManyInput>;
    where?: Prisma.VehicleWhereInput;
    limit?: number;
};
export type VehicleUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VehicleSelect<ExtArgs> | null;
    omit?: Prisma.VehicleOmit<ExtArgs> | null;
    include?: Prisma.VehicleInclude<ExtArgs> | null;
    where: Prisma.VehicleWhereUniqueInput;
    create: Prisma.XOR<Prisma.VehicleCreateInput, Prisma.VehicleUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.VehicleUpdateInput, Prisma.VehicleUncheckedUpdateInput>;
};
export type VehicleDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VehicleSelect<ExtArgs> | null;
    omit?: Prisma.VehicleOmit<ExtArgs> | null;
    include?: Prisma.VehicleInclude<ExtArgs> | null;
    where: Prisma.VehicleWhereUniqueInput;
};
export type VehicleDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VehicleWhereInput;
    limit?: number;
};
export type Vehicle$workflowsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type VehicleDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VehicleSelect<ExtArgs> | null;
    omit?: Prisma.VehicleOmit<ExtArgs> | null;
    include?: Prisma.VehicleInclude<ExtArgs> | null;
};
export {};
