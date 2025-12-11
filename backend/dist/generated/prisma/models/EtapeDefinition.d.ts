import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type EtapeDefinitionModel = runtime.Types.Result.DefaultSelection<Prisma.$EtapeDefinitionPayload>;
export type AggregateEtapeDefinition = {
    _count: EtapeDefinitionCountAggregateOutputType | null;
    _avg: EtapeDefinitionAvgAggregateOutputType | null;
    _sum: EtapeDefinitionSumAggregateOutputType | null;
    _min: EtapeDefinitionMinAggregateOutputType | null;
    _max: EtapeDefinitionMaxAggregateOutputType | null;
};
export type EtapeDefinitionAvgAggregateOutputType = {
    numeroEtape: number | null;
    ordre: number | null;
};
export type EtapeDefinitionSumAggregateOutputType = {
    numeroEtape: number | null;
    ordre: number | null;
};
export type EtapeDefinitionMinAggregateOutputType = {
    id: string | null;
    numeroEtape: number | null;
    nom: string | null;
    description: string | null;
    ordre: number | null;
    estObligatoire: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type EtapeDefinitionMaxAggregateOutputType = {
    id: string | null;
    numeroEtape: number | null;
    nom: string | null;
    description: string | null;
    ordre: number | null;
    estObligatoire: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type EtapeDefinitionCountAggregateOutputType = {
    id: number;
    numeroEtape: number;
    nom: number;
    description: number;
    champsFormulaire: number;
    ordre: number;
    estObligatoire: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type EtapeDefinitionAvgAggregateInputType = {
    numeroEtape?: true;
    ordre?: true;
};
export type EtapeDefinitionSumAggregateInputType = {
    numeroEtape?: true;
    ordre?: true;
};
export type EtapeDefinitionMinAggregateInputType = {
    id?: true;
    numeroEtape?: true;
    nom?: true;
    description?: true;
    ordre?: true;
    estObligatoire?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type EtapeDefinitionMaxAggregateInputType = {
    id?: true;
    numeroEtape?: true;
    nom?: true;
    description?: true;
    ordre?: true;
    estObligatoire?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type EtapeDefinitionCountAggregateInputType = {
    id?: true;
    numeroEtape?: true;
    nom?: true;
    description?: true;
    champsFormulaire?: true;
    ordre?: true;
    estObligatoire?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type EtapeDefinitionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EtapeDefinitionWhereInput;
    orderBy?: Prisma.EtapeDefinitionOrderByWithRelationInput | Prisma.EtapeDefinitionOrderByWithRelationInput[];
    cursor?: Prisma.EtapeDefinitionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | EtapeDefinitionCountAggregateInputType;
    _avg?: EtapeDefinitionAvgAggregateInputType;
    _sum?: EtapeDefinitionSumAggregateInputType;
    _min?: EtapeDefinitionMinAggregateInputType;
    _max?: EtapeDefinitionMaxAggregateInputType;
};
export type GetEtapeDefinitionAggregateType<T extends EtapeDefinitionAggregateArgs> = {
    [P in keyof T & keyof AggregateEtapeDefinition]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateEtapeDefinition[P]> : Prisma.GetScalarType<T[P], AggregateEtapeDefinition[P]>;
};
export type EtapeDefinitionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EtapeDefinitionWhereInput;
    orderBy?: Prisma.EtapeDefinitionOrderByWithAggregationInput | Prisma.EtapeDefinitionOrderByWithAggregationInput[];
    by: Prisma.EtapeDefinitionScalarFieldEnum[] | Prisma.EtapeDefinitionScalarFieldEnum;
    having?: Prisma.EtapeDefinitionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: EtapeDefinitionCountAggregateInputType | true;
    _avg?: EtapeDefinitionAvgAggregateInputType;
    _sum?: EtapeDefinitionSumAggregateInputType;
    _min?: EtapeDefinitionMinAggregateInputType;
    _max?: EtapeDefinitionMaxAggregateInputType;
};
export type EtapeDefinitionGroupByOutputType = {
    id: string;
    numeroEtape: number;
    nom: string;
    description: string | null;
    champsFormulaire: runtime.JsonValue | null;
    ordre: number;
    estObligatoire: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: EtapeDefinitionCountAggregateOutputType | null;
    _avg: EtapeDefinitionAvgAggregateOutputType | null;
    _sum: EtapeDefinitionSumAggregateOutputType | null;
    _min: EtapeDefinitionMinAggregateOutputType | null;
    _max: EtapeDefinitionMaxAggregateOutputType | null;
};
type GetEtapeDefinitionGroupByPayload<T extends EtapeDefinitionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<EtapeDefinitionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof EtapeDefinitionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], EtapeDefinitionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], EtapeDefinitionGroupByOutputType[P]>;
}>>;
export type EtapeDefinitionWhereInput = {
    AND?: Prisma.EtapeDefinitionWhereInput | Prisma.EtapeDefinitionWhereInput[];
    OR?: Prisma.EtapeDefinitionWhereInput[];
    NOT?: Prisma.EtapeDefinitionWhereInput | Prisma.EtapeDefinitionWhereInput[];
    id?: Prisma.StringFilter<"EtapeDefinition"> | string;
    numeroEtape?: Prisma.IntFilter<"EtapeDefinition"> | number;
    nom?: Prisma.StringFilter<"EtapeDefinition"> | string;
    description?: Prisma.StringNullableFilter<"EtapeDefinition"> | string | null;
    champsFormulaire?: Prisma.JsonNullableFilter<"EtapeDefinition">;
    ordre?: Prisma.IntFilter<"EtapeDefinition"> | number;
    estObligatoire?: Prisma.BoolFilter<"EtapeDefinition"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"EtapeDefinition"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"EtapeDefinition"> | Date | string;
};
export type EtapeDefinitionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    numeroEtape?: Prisma.SortOrder;
    nom?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    champsFormulaire?: Prisma.SortOrderInput | Prisma.SortOrder;
    ordre?: Prisma.SortOrder;
    estObligatoire?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type EtapeDefinitionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    numeroEtape?: number;
    AND?: Prisma.EtapeDefinitionWhereInput | Prisma.EtapeDefinitionWhereInput[];
    OR?: Prisma.EtapeDefinitionWhereInput[];
    NOT?: Prisma.EtapeDefinitionWhereInput | Prisma.EtapeDefinitionWhereInput[];
    nom?: Prisma.StringFilter<"EtapeDefinition"> | string;
    description?: Prisma.StringNullableFilter<"EtapeDefinition"> | string | null;
    champsFormulaire?: Prisma.JsonNullableFilter<"EtapeDefinition">;
    ordre?: Prisma.IntFilter<"EtapeDefinition"> | number;
    estObligatoire?: Prisma.BoolFilter<"EtapeDefinition"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"EtapeDefinition"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"EtapeDefinition"> | Date | string;
}, "id" | "numeroEtape">;
export type EtapeDefinitionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    numeroEtape?: Prisma.SortOrder;
    nom?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    champsFormulaire?: Prisma.SortOrderInput | Prisma.SortOrder;
    ordre?: Prisma.SortOrder;
    estObligatoire?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.EtapeDefinitionCountOrderByAggregateInput;
    _avg?: Prisma.EtapeDefinitionAvgOrderByAggregateInput;
    _max?: Prisma.EtapeDefinitionMaxOrderByAggregateInput;
    _min?: Prisma.EtapeDefinitionMinOrderByAggregateInput;
    _sum?: Prisma.EtapeDefinitionSumOrderByAggregateInput;
};
export type EtapeDefinitionScalarWhereWithAggregatesInput = {
    AND?: Prisma.EtapeDefinitionScalarWhereWithAggregatesInput | Prisma.EtapeDefinitionScalarWhereWithAggregatesInput[];
    OR?: Prisma.EtapeDefinitionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.EtapeDefinitionScalarWhereWithAggregatesInput | Prisma.EtapeDefinitionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"EtapeDefinition"> | string;
    numeroEtape?: Prisma.IntWithAggregatesFilter<"EtapeDefinition"> | number;
    nom?: Prisma.StringWithAggregatesFilter<"EtapeDefinition"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"EtapeDefinition"> | string | null;
    champsFormulaire?: Prisma.JsonNullableWithAggregatesFilter<"EtapeDefinition">;
    ordre?: Prisma.IntWithAggregatesFilter<"EtapeDefinition"> | number;
    estObligatoire?: Prisma.BoolWithAggregatesFilter<"EtapeDefinition"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"EtapeDefinition"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"EtapeDefinition"> | Date | string;
};
export type EtapeDefinitionCreateInput = {
    id?: string;
    numeroEtape: number;
    nom: string;
    description?: string | null;
    champsFormulaire?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ordre?: number;
    estObligatoire?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type EtapeDefinitionUncheckedCreateInput = {
    id?: string;
    numeroEtape: number;
    nom: string;
    description?: string | null;
    champsFormulaire?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ordre?: number;
    estObligatoire?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type EtapeDefinitionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    numeroEtape?: Prisma.IntFieldUpdateOperationsInput | number;
    nom?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    champsFormulaire?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ordre?: Prisma.IntFieldUpdateOperationsInput | number;
    estObligatoire?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EtapeDefinitionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    numeroEtape?: Prisma.IntFieldUpdateOperationsInput | number;
    nom?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    champsFormulaire?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ordre?: Prisma.IntFieldUpdateOperationsInput | number;
    estObligatoire?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EtapeDefinitionCreateManyInput = {
    id?: string;
    numeroEtape: number;
    nom: string;
    description?: string | null;
    champsFormulaire?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ordre?: number;
    estObligatoire?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type EtapeDefinitionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    numeroEtape?: Prisma.IntFieldUpdateOperationsInput | number;
    nom?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    champsFormulaire?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ordre?: Prisma.IntFieldUpdateOperationsInput | number;
    estObligatoire?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EtapeDefinitionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    numeroEtape?: Prisma.IntFieldUpdateOperationsInput | number;
    nom?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    champsFormulaire?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ordre?: Prisma.IntFieldUpdateOperationsInput | number;
    estObligatoire?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EtapeDefinitionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    numeroEtape?: Prisma.SortOrder;
    nom?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    champsFormulaire?: Prisma.SortOrder;
    ordre?: Prisma.SortOrder;
    estObligatoire?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type EtapeDefinitionAvgOrderByAggregateInput = {
    numeroEtape?: Prisma.SortOrder;
    ordre?: Prisma.SortOrder;
};
export type EtapeDefinitionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    numeroEtape?: Prisma.SortOrder;
    nom?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    ordre?: Prisma.SortOrder;
    estObligatoire?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type EtapeDefinitionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    numeroEtape?: Prisma.SortOrder;
    nom?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    ordre?: Prisma.SortOrder;
    estObligatoire?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type EtapeDefinitionSumOrderByAggregateInput = {
    numeroEtape?: Prisma.SortOrder;
    ordre?: Prisma.SortOrder;
};
export type EtapeDefinitionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    numeroEtape?: boolean;
    nom?: boolean;
    description?: boolean;
    champsFormulaire?: boolean;
    ordre?: boolean;
    estObligatoire?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["etapeDefinition"]>;
export type EtapeDefinitionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    numeroEtape?: boolean;
    nom?: boolean;
    description?: boolean;
    champsFormulaire?: boolean;
    ordre?: boolean;
    estObligatoire?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["etapeDefinition"]>;
export type EtapeDefinitionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    numeroEtape?: boolean;
    nom?: boolean;
    description?: boolean;
    champsFormulaire?: boolean;
    ordre?: boolean;
    estObligatoire?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["etapeDefinition"]>;
export type EtapeDefinitionSelectScalar = {
    id?: boolean;
    numeroEtape?: boolean;
    nom?: boolean;
    description?: boolean;
    champsFormulaire?: boolean;
    ordre?: boolean;
    estObligatoire?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type EtapeDefinitionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "numeroEtape" | "nom" | "description" | "champsFormulaire" | "ordre" | "estObligatoire" | "createdAt" | "updatedAt", ExtArgs["result"]["etapeDefinition"]>;
export type $EtapeDefinitionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "EtapeDefinition";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        numeroEtape: number;
        nom: string;
        description: string | null;
        champsFormulaire: runtime.JsonValue | null;
        ordre: number;
        estObligatoire: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["etapeDefinition"]>;
    composites: {};
};
export type EtapeDefinitionGetPayload<S extends boolean | null | undefined | EtapeDefinitionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$EtapeDefinitionPayload, S>;
export type EtapeDefinitionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<EtapeDefinitionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: EtapeDefinitionCountAggregateInputType | true;
};
export interface EtapeDefinitionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['EtapeDefinition'];
        meta: {
            name: 'EtapeDefinition';
        };
    };
    findUnique<T extends EtapeDefinitionFindUniqueArgs>(args: Prisma.SelectSubset<T, EtapeDefinitionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__EtapeDefinitionClient<runtime.Types.Result.GetResult<Prisma.$EtapeDefinitionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends EtapeDefinitionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, EtapeDefinitionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__EtapeDefinitionClient<runtime.Types.Result.GetResult<Prisma.$EtapeDefinitionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends EtapeDefinitionFindFirstArgs>(args?: Prisma.SelectSubset<T, EtapeDefinitionFindFirstArgs<ExtArgs>>): Prisma.Prisma__EtapeDefinitionClient<runtime.Types.Result.GetResult<Prisma.$EtapeDefinitionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends EtapeDefinitionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, EtapeDefinitionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__EtapeDefinitionClient<runtime.Types.Result.GetResult<Prisma.$EtapeDefinitionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends EtapeDefinitionFindManyArgs>(args?: Prisma.SelectSubset<T, EtapeDefinitionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EtapeDefinitionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends EtapeDefinitionCreateArgs>(args: Prisma.SelectSubset<T, EtapeDefinitionCreateArgs<ExtArgs>>): Prisma.Prisma__EtapeDefinitionClient<runtime.Types.Result.GetResult<Prisma.$EtapeDefinitionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends EtapeDefinitionCreateManyArgs>(args?: Prisma.SelectSubset<T, EtapeDefinitionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends EtapeDefinitionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, EtapeDefinitionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EtapeDefinitionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends EtapeDefinitionDeleteArgs>(args: Prisma.SelectSubset<T, EtapeDefinitionDeleteArgs<ExtArgs>>): Prisma.Prisma__EtapeDefinitionClient<runtime.Types.Result.GetResult<Prisma.$EtapeDefinitionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends EtapeDefinitionUpdateArgs>(args: Prisma.SelectSubset<T, EtapeDefinitionUpdateArgs<ExtArgs>>): Prisma.Prisma__EtapeDefinitionClient<runtime.Types.Result.GetResult<Prisma.$EtapeDefinitionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends EtapeDefinitionDeleteManyArgs>(args?: Prisma.SelectSubset<T, EtapeDefinitionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends EtapeDefinitionUpdateManyArgs>(args: Prisma.SelectSubset<T, EtapeDefinitionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends EtapeDefinitionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, EtapeDefinitionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EtapeDefinitionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends EtapeDefinitionUpsertArgs>(args: Prisma.SelectSubset<T, EtapeDefinitionUpsertArgs<ExtArgs>>): Prisma.Prisma__EtapeDefinitionClient<runtime.Types.Result.GetResult<Prisma.$EtapeDefinitionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends EtapeDefinitionCountArgs>(args?: Prisma.Subset<T, EtapeDefinitionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], EtapeDefinitionCountAggregateOutputType> : number>;
    aggregate<T extends EtapeDefinitionAggregateArgs>(args: Prisma.Subset<T, EtapeDefinitionAggregateArgs>): Prisma.PrismaPromise<GetEtapeDefinitionAggregateType<T>>;
    groupBy<T extends EtapeDefinitionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: EtapeDefinitionGroupByArgs['orderBy'];
    } : {
        orderBy?: EtapeDefinitionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, EtapeDefinitionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEtapeDefinitionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: EtapeDefinitionFieldRefs;
}
export interface Prisma__EtapeDefinitionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface EtapeDefinitionFieldRefs {
    readonly id: Prisma.FieldRef<"EtapeDefinition", 'String'>;
    readonly numeroEtape: Prisma.FieldRef<"EtapeDefinition", 'Int'>;
    readonly nom: Prisma.FieldRef<"EtapeDefinition", 'String'>;
    readonly description: Prisma.FieldRef<"EtapeDefinition", 'String'>;
    readonly champsFormulaire: Prisma.FieldRef<"EtapeDefinition", 'Json'>;
    readonly ordre: Prisma.FieldRef<"EtapeDefinition", 'Int'>;
    readonly estObligatoire: Prisma.FieldRef<"EtapeDefinition", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"EtapeDefinition", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"EtapeDefinition", 'DateTime'>;
}
export type EtapeDefinitionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EtapeDefinitionSelect<ExtArgs> | null;
    omit?: Prisma.EtapeDefinitionOmit<ExtArgs> | null;
    where: Prisma.EtapeDefinitionWhereUniqueInput;
};
export type EtapeDefinitionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EtapeDefinitionSelect<ExtArgs> | null;
    omit?: Prisma.EtapeDefinitionOmit<ExtArgs> | null;
    where: Prisma.EtapeDefinitionWhereUniqueInput;
};
export type EtapeDefinitionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EtapeDefinitionSelect<ExtArgs> | null;
    omit?: Prisma.EtapeDefinitionOmit<ExtArgs> | null;
    where?: Prisma.EtapeDefinitionWhereInput;
    orderBy?: Prisma.EtapeDefinitionOrderByWithRelationInput | Prisma.EtapeDefinitionOrderByWithRelationInput[];
    cursor?: Prisma.EtapeDefinitionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EtapeDefinitionScalarFieldEnum | Prisma.EtapeDefinitionScalarFieldEnum[];
};
export type EtapeDefinitionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EtapeDefinitionSelect<ExtArgs> | null;
    omit?: Prisma.EtapeDefinitionOmit<ExtArgs> | null;
    where?: Prisma.EtapeDefinitionWhereInput;
    orderBy?: Prisma.EtapeDefinitionOrderByWithRelationInput | Prisma.EtapeDefinitionOrderByWithRelationInput[];
    cursor?: Prisma.EtapeDefinitionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EtapeDefinitionScalarFieldEnum | Prisma.EtapeDefinitionScalarFieldEnum[];
};
export type EtapeDefinitionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EtapeDefinitionSelect<ExtArgs> | null;
    omit?: Prisma.EtapeDefinitionOmit<ExtArgs> | null;
    where?: Prisma.EtapeDefinitionWhereInput;
    orderBy?: Prisma.EtapeDefinitionOrderByWithRelationInput | Prisma.EtapeDefinitionOrderByWithRelationInput[];
    cursor?: Prisma.EtapeDefinitionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EtapeDefinitionScalarFieldEnum | Prisma.EtapeDefinitionScalarFieldEnum[];
};
export type EtapeDefinitionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EtapeDefinitionSelect<ExtArgs> | null;
    omit?: Prisma.EtapeDefinitionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EtapeDefinitionCreateInput, Prisma.EtapeDefinitionUncheckedCreateInput>;
};
export type EtapeDefinitionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.EtapeDefinitionCreateManyInput | Prisma.EtapeDefinitionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type EtapeDefinitionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EtapeDefinitionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.EtapeDefinitionOmit<ExtArgs> | null;
    data: Prisma.EtapeDefinitionCreateManyInput | Prisma.EtapeDefinitionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type EtapeDefinitionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EtapeDefinitionSelect<ExtArgs> | null;
    omit?: Prisma.EtapeDefinitionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EtapeDefinitionUpdateInput, Prisma.EtapeDefinitionUncheckedUpdateInput>;
    where: Prisma.EtapeDefinitionWhereUniqueInput;
};
export type EtapeDefinitionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.EtapeDefinitionUpdateManyMutationInput, Prisma.EtapeDefinitionUncheckedUpdateManyInput>;
    where?: Prisma.EtapeDefinitionWhereInput;
    limit?: number;
};
export type EtapeDefinitionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EtapeDefinitionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.EtapeDefinitionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EtapeDefinitionUpdateManyMutationInput, Prisma.EtapeDefinitionUncheckedUpdateManyInput>;
    where?: Prisma.EtapeDefinitionWhereInput;
    limit?: number;
};
export type EtapeDefinitionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EtapeDefinitionSelect<ExtArgs> | null;
    omit?: Prisma.EtapeDefinitionOmit<ExtArgs> | null;
    where: Prisma.EtapeDefinitionWhereUniqueInput;
    create: Prisma.XOR<Prisma.EtapeDefinitionCreateInput, Prisma.EtapeDefinitionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.EtapeDefinitionUpdateInput, Prisma.EtapeDefinitionUncheckedUpdateInput>;
};
export type EtapeDefinitionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EtapeDefinitionSelect<ExtArgs> | null;
    omit?: Prisma.EtapeDefinitionOmit<ExtArgs> | null;
    where: Prisma.EtapeDefinitionWhereUniqueInput;
};
export type EtapeDefinitionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EtapeDefinitionWhereInput;
    limit?: number;
};
export type EtapeDefinitionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EtapeDefinitionSelect<ExtArgs> | null;
    omit?: Prisma.EtapeDefinitionOmit<ExtArgs> | null;
};
export {};
