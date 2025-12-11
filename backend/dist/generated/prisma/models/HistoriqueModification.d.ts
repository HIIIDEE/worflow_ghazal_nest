import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type HistoriqueModificationModel = runtime.Types.Result.DefaultSelection<Prisma.$HistoriqueModificationPayload>;
export type AggregateHistoriqueModification = {
    _count: HistoriqueModificationCountAggregateOutputType | null;
    _min: HistoriqueModificationMinAggregateOutputType | null;
    _max: HistoriqueModificationMaxAggregateOutputType | null;
};
export type HistoriqueModificationMinAggregateOutputType = {
    id: string | null;
    entite: string | null;
    entiteId: string | null;
    action: string | null;
    modifiePar: string | null;
    dateModification: Date | null;
    commentaire: string | null;
};
export type HistoriqueModificationMaxAggregateOutputType = {
    id: string | null;
    entite: string | null;
    entiteId: string | null;
    action: string | null;
    modifiePar: string | null;
    dateModification: Date | null;
    commentaire: string | null;
};
export type HistoriqueModificationCountAggregateOutputType = {
    id: number;
    entite: number;
    entiteId: number;
    action: number;
    modifiePar: number;
    dateModification: number;
    anciennesValeurs: number;
    nouvellesValeurs: number;
    commentaire: number;
    _all: number;
};
export type HistoriqueModificationMinAggregateInputType = {
    id?: true;
    entite?: true;
    entiteId?: true;
    action?: true;
    modifiePar?: true;
    dateModification?: true;
    commentaire?: true;
};
export type HistoriqueModificationMaxAggregateInputType = {
    id?: true;
    entite?: true;
    entiteId?: true;
    action?: true;
    modifiePar?: true;
    dateModification?: true;
    commentaire?: true;
};
export type HistoriqueModificationCountAggregateInputType = {
    id?: true;
    entite?: true;
    entiteId?: true;
    action?: true;
    modifiePar?: true;
    dateModification?: true;
    anciennesValeurs?: true;
    nouvellesValeurs?: true;
    commentaire?: true;
    _all?: true;
};
export type HistoriqueModificationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HistoriqueModificationWhereInput;
    orderBy?: Prisma.HistoriqueModificationOrderByWithRelationInput | Prisma.HistoriqueModificationOrderByWithRelationInput[];
    cursor?: Prisma.HistoriqueModificationWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | HistoriqueModificationCountAggregateInputType;
    _min?: HistoriqueModificationMinAggregateInputType;
    _max?: HistoriqueModificationMaxAggregateInputType;
};
export type GetHistoriqueModificationAggregateType<T extends HistoriqueModificationAggregateArgs> = {
    [P in keyof T & keyof AggregateHistoriqueModification]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateHistoriqueModification[P]> : Prisma.GetScalarType<T[P], AggregateHistoriqueModification[P]>;
};
export type HistoriqueModificationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HistoriqueModificationWhereInput;
    orderBy?: Prisma.HistoriqueModificationOrderByWithAggregationInput | Prisma.HistoriqueModificationOrderByWithAggregationInput[];
    by: Prisma.HistoriqueModificationScalarFieldEnum[] | Prisma.HistoriqueModificationScalarFieldEnum;
    having?: Prisma.HistoriqueModificationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: HistoriqueModificationCountAggregateInputType | true;
    _min?: HistoriqueModificationMinAggregateInputType;
    _max?: HistoriqueModificationMaxAggregateInputType;
};
export type HistoriqueModificationGroupByOutputType = {
    id: string;
    entite: string;
    entiteId: string;
    action: string;
    modifiePar: string;
    dateModification: Date;
    anciennesValeurs: runtime.JsonValue | null;
    nouvellesValeurs: runtime.JsonValue | null;
    commentaire: string | null;
    _count: HistoriqueModificationCountAggregateOutputType | null;
    _min: HistoriqueModificationMinAggregateOutputType | null;
    _max: HistoriqueModificationMaxAggregateOutputType | null;
};
type GetHistoriqueModificationGroupByPayload<T extends HistoriqueModificationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<HistoriqueModificationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof HistoriqueModificationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], HistoriqueModificationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], HistoriqueModificationGroupByOutputType[P]>;
}>>;
export type HistoriqueModificationWhereInput = {
    AND?: Prisma.HistoriqueModificationWhereInput | Prisma.HistoriqueModificationWhereInput[];
    OR?: Prisma.HistoriqueModificationWhereInput[];
    NOT?: Prisma.HistoriqueModificationWhereInput | Prisma.HistoriqueModificationWhereInput[];
    id?: Prisma.StringFilter<"HistoriqueModification"> | string;
    entite?: Prisma.StringFilter<"HistoriqueModification"> | string;
    entiteId?: Prisma.StringFilter<"HistoriqueModification"> | string;
    action?: Prisma.StringFilter<"HistoriqueModification"> | string;
    modifiePar?: Prisma.StringFilter<"HistoriqueModification"> | string;
    dateModification?: Prisma.DateTimeFilter<"HistoriqueModification"> | Date | string;
    anciennesValeurs?: Prisma.JsonNullableFilter<"HistoriqueModification">;
    nouvellesValeurs?: Prisma.JsonNullableFilter<"HistoriqueModification">;
    commentaire?: Prisma.StringNullableFilter<"HistoriqueModification"> | string | null;
};
export type HistoriqueModificationOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    entite?: Prisma.SortOrder;
    entiteId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    modifiePar?: Prisma.SortOrder;
    dateModification?: Prisma.SortOrder;
    anciennesValeurs?: Prisma.SortOrderInput | Prisma.SortOrder;
    nouvellesValeurs?: Prisma.SortOrderInput | Prisma.SortOrder;
    commentaire?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type HistoriqueModificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.HistoriqueModificationWhereInput | Prisma.HistoriqueModificationWhereInput[];
    OR?: Prisma.HistoriqueModificationWhereInput[];
    NOT?: Prisma.HistoriqueModificationWhereInput | Prisma.HistoriqueModificationWhereInput[];
    entite?: Prisma.StringFilter<"HistoriqueModification"> | string;
    entiteId?: Prisma.StringFilter<"HistoriqueModification"> | string;
    action?: Prisma.StringFilter<"HistoriqueModification"> | string;
    modifiePar?: Prisma.StringFilter<"HistoriqueModification"> | string;
    dateModification?: Prisma.DateTimeFilter<"HistoriqueModification"> | Date | string;
    anciennesValeurs?: Prisma.JsonNullableFilter<"HistoriqueModification">;
    nouvellesValeurs?: Prisma.JsonNullableFilter<"HistoriqueModification">;
    commentaire?: Prisma.StringNullableFilter<"HistoriqueModification"> | string | null;
}, "id">;
export type HistoriqueModificationOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    entite?: Prisma.SortOrder;
    entiteId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    modifiePar?: Prisma.SortOrder;
    dateModification?: Prisma.SortOrder;
    anciennesValeurs?: Prisma.SortOrderInput | Prisma.SortOrder;
    nouvellesValeurs?: Prisma.SortOrderInput | Prisma.SortOrder;
    commentaire?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.HistoriqueModificationCountOrderByAggregateInput;
    _max?: Prisma.HistoriqueModificationMaxOrderByAggregateInput;
    _min?: Prisma.HistoriqueModificationMinOrderByAggregateInput;
};
export type HistoriqueModificationScalarWhereWithAggregatesInput = {
    AND?: Prisma.HistoriqueModificationScalarWhereWithAggregatesInput | Prisma.HistoriqueModificationScalarWhereWithAggregatesInput[];
    OR?: Prisma.HistoriqueModificationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.HistoriqueModificationScalarWhereWithAggregatesInput | Prisma.HistoriqueModificationScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"HistoriqueModification"> | string;
    entite?: Prisma.StringWithAggregatesFilter<"HistoriqueModification"> | string;
    entiteId?: Prisma.StringWithAggregatesFilter<"HistoriqueModification"> | string;
    action?: Prisma.StringWithAggregatesFilter<"HistoriqueModification"> | string;
    modifiePar?: Prisma.StringWithAggregatesFilter<"HistoriqueModification"> | string;
    dateModification?: Prisma.DateTimeWithAggregatesFilter<"HistoriqueModification"> | Date | string;
    anciennesValeurs?: Prisma.JsonNullableWithAggregatesFilter<"HistoriqueModification">;
    nouvellesValeurs?: Prisma.JsonNullableWithAggregatesFilter<"HistoriqueModification">;
    commentaire?: Prisma.StringNullableWithAggregatesFilter<"HistoriqueModification"> | string | null;
};
export type HistoriqueModificationCreateInput = {
    id?: string;
    entite: string;
    entiteId: string;
    action: string;
    modifiePar: string;
    dateModification?: Date | string;
    anciennesValeurs?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    nouvellesValeurs?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    commentaire?: string | null;
};
export type HistoriqueModificationUncheckedCreateInput = {
    id?: string;
    entite: string;
    entiteId: string;
    action: string;
    modifiePar: string;
    dateModification?: Date | string;
    anciennesValeurs?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    nouvellesValeurs?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    commentaire?: string | null;
};
export type HistoriqueModificationUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    entite?: Prisma.StringFieldUpdateOperationsInput | string;
    entiteId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    modifiePar?: Prisma.StringFieldUpdateOperationsInput | string;
    dateModification?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    anciennesValeurs?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    nouvellesValeurs?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    commentaire?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type HistoriqueModificationUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    entite?: Prisma.StringFieldUpdateOperationsInput | string;
    entiteId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    modifiePar?: Prisma.StringFieldUpdateOperationsInput | string;
    dateModification?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    anciennesValeurs?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    nouvellesValeurs?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    commentaire?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type HistoriqueModificationCreateManyInput = {
    id?: string;
    entite: string;
    entiteId: string;
    action: string;
    modifiePar: string;
    dateModification?: Date | string;
    anciennesValeurs?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    nouvellesValeurs?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    commentaire?: string | null;
};
export type HistoriqueModificationUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    entite?: Prisma.StringFieldUpdateOperationsInput | string;
    entiteId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    modifiePar?: Prisma.StringFieldUpdateOperationsInput | string;
    dateModification?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    anciennesValeurs?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    nouvellesValeurs?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    commentaire?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type HistoriqueModificationUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    entite?: Prisma.StringFieldUpdateOperationsInput | string;
    entiteId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    modifiePar?: Prisma.StringFieldUpdateOperationsInput | string;
    dateModification?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    anciennesValeurs?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    nouvellesValeurs?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    commentaire?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type HistoriqueModificationCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    entite?: Prisma.SortOrder;
    entiteId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    modifiePar?: Prisma.SortOrder;
    dateModification?: Prisma.SortOrder;
    anciennesValeurs?: Prisma.SortOrder;
    nouvellesValeurs?: Prisma.SortOrder;
    commentaire?: Prisma.SortOrder;
};
export type HistoriqueModificationMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    entite?: Prisma.SortOrder;
    entiteId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    modifiePar?: Prisma.SortOrder;
    dateModification?: Prisma.SortOrder;
    commentaire?: Prisma.SortOrder;
};
export type HistoriqueModificationMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    entite?: Prisma.SortOrder;
    entiteId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    modifiePar?: Prisma.SortOrder;
    dateModification?: Prisma.SortOrder;
    commentaire?: Prisma.SortOrder;
};
export type HistoriqueModificationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    entite?: boolean;
    entiteId?: boolean;
    action?: boolean;
    modifiePar?: boolean;
    dateModification?: boolean;
    anciennesValeurs?: boolean;
    nouvellesValeurs?: boolean;
    commentaire?: boolean;
}, ExtArgs["result"]["historiqueModification"]>;
export type HistoriqueModificationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    entite?: boolean;
    entiteId?: boolean;
    action?: boolean;
    modifiePar?: boolean;
    dateModification?: boolean;
    anciennesValeurs?: boolean;
    nouvellesValeurs?: boolean;
    commentaire?: boolean;
}, ExtArgs["result"]["historiqueModification"]>;
export type HistoriqueModificationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    entite?: boolean;
    entiteId?: boolean;
    action?: boolean;
    modifiePar?: boolean;
    dateModification?: boolean;
    anciennesValeurs?: boolean;
    nouvellesValeurs?: boolean;
    commentaire?: boolean;
}, ExtArgs["result"]["historiqueModification"]>;
export type HistoriqueModificationSelectScalar = {
    id?: boolean;
    entite?: boolean;
    entiteId?: boolean;
    action?: boolean;
    modifiePar?: boolean;
    dateModification?: boolean;
    anciennesValeurs?: boolean;
    nouvellesValeurs?: boolean;
    commentaire?: boolean;
};
export type HistoriqueModificationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "entite" | "entiteId" | "action" | "modifiePar" | "dateModification" | "anciennesValeurs" | "nouvellesValeurs" | "commentaire", ExtArgs["result"]["historiqueModification"]>;
export type $HistoriqueModificationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "HistoriqueModification";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        entite: string;
        entiteId: string;
        action: string;
        modifiePar: string;
        dateModification: Date;
        anciennesValeurs: runtime.JsonValue | null;
        nouvellesValeurs: runtime.JsonValue | null;
        commentaire: string | null;
    }, ExtArgs["result"]["historiqueModification"]>;
    composites: {};
};
export type HistoriqueModificationGetPayload<S extends boolean | null | undefined | HistoriqueModificationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$HistoriqueModificationPayload, S>;
export type HistoriqueModificationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<HistoriqueModificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: HistoriqueModificationCountAggregateInputType | true;
};
export interface HistoriqueModificationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['HistoriqueModification'];
        meta: {
            name: 'HistoriqueModification';
        };
    };
    findUnique<T extends HistoriqueModificationFindUniqueArgs>(args: Prisma.SelectSubset<T, HistoriqueModificationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__HistoriqueModificationClient<runtime.Types.Result.GetResult<Prisma.$HistoriqueModificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends HistoriqueModificationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, HistoriqueModificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__HistoriqueModificationClient<runtime.Types.Result.GetResult<Prisma.$HistoriqueModificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends HistoriqueModificationFindFirstArgs>(args?: Prisma.SelectSubset<T, HistoriqueModificationFindFirstArgs<ExtArgs>>): Prisma.Prisma__HistoriqueModificationClient<runtime.Types.Result.GetResult<Prisma.$HistoriqueModificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends HistoriqueModificationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, HistoriqueModificationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__HistoriqueModificationClient<runtime.Types.Result.GetResult<Prisma.$HistoriqueModificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends HistoriqueModificationFindManyArgs>(args?: Prisma.SelectSubset<T, HistoriqueModificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HistoriqueModificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends HistoriqueModificationCreateArgs>(args: Prisma.SelectSubset<T, HistoriqueModificationCreateArgs<ExtArgs>>): Prisma.Prisma__HistoriqueModificationClient<runtime.Types.Result.GetResult<Prisma.$HistoriqueModificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends HistoriqueModificationCreateManyArgs>(args?: Prisma.SelectSubset<T, HistoriqueModificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends HistoriqueModificationCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, HistoriqueModificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HistoriqueModificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends HistoriqueModificationDeleteArgs>(args: Prisma.SelectSubset<T, HistoriqueModificationDeleteArgs<ExtArgs>>): Prisma.Prisma__HistoriqueModificationClient<runtime.Types.Result.GetResult<Prisma.$HistoriqueModificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends HistoriqueModificationUpdateArgs>(args: Prisma.SelectSubset<T, HistoriqueModificationUpdateArgs<ExtArgs>>): Prisma.Prisma__HistoriqueModificationClient<runtime.Types.Result.GetResult<Prisma.$HistoriqueModificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends HistoriqueModificationDeleteManyArgs>(args?: Prisma.SelectSubset<T, HistoriqueModificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends HistoriqueModificationUpdateManyArgs>(args: Prisma.SelectSubset<T, HistoriqueModificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends HistoriqueModificationUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, HistoriqueModificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HistoriqueModificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends HistoriqueModificationUpsertArgs>(args: Prisma.SelectSubset<T, HistoriqueModificationUpsertArgs<ExtArgs>>): Prisma.Prisma__HistoriqueModificationClient<runtime.Types.Result.GetResult<Prisma.$HistoriqueModificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends HistoriqueModificationCountArgs>(args?: Prisma.Subset<T, HistoriqueModificationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], HistoriqueModificationCountAggregateOutputType> : number>;
    aggregate<T extends HistoriqueModificationAggregateArgs>(args: Prisma.Subset<T, HistoriqueModificationAggregateArgs>): Prisma.PrismaPromise<GetHistoriqueModificationAggregateType<T>>;
    groupBy<T extends HistoriqueModificationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: HistoriqueModificationGroupByArgs['orderBy'];
    } : {
        orderBy?: HistoriqueModificationGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, HistoriqueModificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHistoriqueModificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: HistoriqueModificationFieldRefs;
}
export interface Prisma__HistoriqueModificationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface HistoriqueModificationFieldRefs {
    readonly id: Prisma.FieldRef<"HistoriqueModification", 'String'>;
    readonly entite: Prisma.FieldRef<"HistoriqueModification", 'String'>;
    readonly entiteId: Prisma.FieldRef<"HistoriqueModification", 'String'>;
    readonly action: Prisma.FieldRef<"HistoriqueModification", 'String'>;
    readonly modifiePar: Prisma.FieldRef<"HistoriqueModification", 'String'>;
    readonly dateModification: Prisma.FieldRef<"HistoriqueModification", 'DateTime'>;
    readonly anciennesValeurs: Prisma.FieldRef<"HistoriqueModification", 'Json'>;
    readonly nouvellesValeurs: Prisma.FieldRef<"HistoriqueModification", 'Json'>;
    readonly commentaire: Prisma.FieldRef<"HistoriqueModification", 'String'>;
}
export type HistoriqueModificationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HistoriqueModificationSelect<ExtArgs> | null;
    omit?: Prisma.HistoriqueModificationOmit<ExtArgs> | null;
    where: Prisma.HistoriqueModificationWhereUniqueInput;
};
export type HistoriqueModificationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HistoriqueModificationSelect<ExtArgs> | null;
    omit?: Prisma.HistoriqueModificationOmit<ExtArgs> | null;
    where: Prisma.HistoriqueModificationWhereUniqueInput;
};
export type HistoriqueModificationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HistoriqueModificationSelect<ExtArgs> | null;
    omit?: Prisma.HistoriqueModificationOmit<ExtArgs> | null;
    where?: Prisma.HistoriqueModificationWhereInput;
    orderBy?: Prisma.HistoriqueModificationOrderByWithRelationInput | Prisma.HistoriqueModificationOrderByWithRelationInput[];
    cursor?: Prisma.HistoriqueModificationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.HistoriqueModificationScalarFieldEnum | Prisma.HistoriqueModificationScalarFieldEnum[];
};
export type HistoriqueModificationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HistoriqueModificationSelect<ExtArgs> | null;
    omit?: Prisma.HistoriqueModificationOmit<ExtArgs> | null;
    where?: Prisma.HistoriqueModificationWhereInput;
    orderBy?: Prisma.HistoriqueModificationOrderByWithRelationInput | Prisma.HistoriqueModificationOrderByWithRelationInput[];
    cursor?: Prisma.HistoriqueModificationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.HistoriqueModificationScalarFieldEnum | Prisma.HistoriqueModificationScalarFieldEnum[];
};
export type HistoriqueModificationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HistoriqueModificationSelect<ExtArgs> | null;
    omit?: Prisma.HistoriqueModificationOmit<ExtArgs> | null;
    where?: Prisma.HistoriqueModificationWhereInput;
    orderBy?: Prisma.HistoriqueModificationOrderByWithRelationInput | Prisma.HistoriqueModificationOrderByWithRelationInput[];
    cursor?: Prisma.HistoriqueModificationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.HistoriqueModificationScalarFieldEnum | Prisma.HistoriqueModificationScalarFieldEnum[];
};
export type HistoriqueModificationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HistoriqueModificationSelect<ExtArgs> | null;
    omit?: Prisma.HistoriqueModificationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.HistoriqueModificationCreateInput, Prisma.HistoriqueModificationUncheckedCreateInput>;
};
export type HistoriqueModificationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.HistoriqueModificationCreateManyInput | Prisma.HistoriqueModificationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type HistoriqueModificationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HistoriqueModificationSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.HistoriqueModificationOmit<ExtArgs> | null;
    data: Prisma.HistoriqueModificationCreateManyInput | Prisma.HistoriqueModificationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type HistoriqueModificationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HistoriqueModificationSelect<ExtArgs> | null;
    omit?: Prisma.HistoriqueModificationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.HistoriqueModificationUpdateInput, Prisma.HistoriqueModificationUncheckedUpdateInput>;
    where: Prisma.HistoriqueModificationWhereUniqueInput;
};
export type HistoriqueModificationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.HistoriqueModificationUpdateManyMutationInput, Prisma.HistoriqueModificationUncheckedUpdateManyInput>;
    where?: Prisma.HistoriqueModificationWhereInput;
    limit?: number;
};
export type HistoriqueModificationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HistoriqueModificationSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.HistoriqueModificationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.HistoriqueModificationUpdateManyMutationInput, Prisma.HistoriqueModificationUncheckedUpdateManyInput>;
    where?: Prisma.HistoriqueModificationWhereInput;
    limit?: number;
};
export type HistoriqueModificationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HistoriqueModificationSelect<ExtArgs> | null;
    omit?: Prisma.HistoriqueModificationOmit<ExtArgs> | null;
    where: Prisma.HistoriqueModificationWhereUniqueInput;
    create: Prisma.XOR<Prisma.HistoriqueModificationCreateInput, Prisma.HistoriqueModificationUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.HistoriqueModificationUpdateInput, Prisma.HistoriqueModificationUncheckedUpdateInput>;
};
export type HistoriqueModificationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HistoriqueModificationSelect<ExtArgs> | null;
    omit?: Prisma.HistoriqueModificationOmit<ExtArgs> | null;
    where: Prisma.HistoriqueModificationWhereUniqueInput;
};
export type HistoriqueModificationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HistoriqueModificationWhereInput;
    limit?: number;
};
export type HistoriqueModificationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HistoriqueModificationSelect<ExtArgs> | null;
    omit?: Prisma.HistoriqueModificationOmit<ExtArgs> | null;
};
export {};
