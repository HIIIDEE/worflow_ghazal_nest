import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type TechnicienModel = runtime.Types.Result.DefaultSelection<Prisma.$TechnicienPayload>;
export type AggregateTechnicien = {
    _count: TechnicienCountAggregateOutputType | null;
    _min: TechnicienMinAggregateOutputType | null;
    _max: TechnicienMaxAggregateOutputType | null;
};
export type TechnicienMinAggregateOutputType = {
    id: string | null;
    nom: string | null;
    prenom: string | null;
    telephone: string | null;
    email: string | null;
    specialite: string | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type TechnicienMaxAggregateOutputType = {
    id: string | null;
    nom: string | null;
    prenom: string | null;
    telephone: string | null;
    email: string | null;
    specialite: string | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type TechnicienCountAggregateOutputType = {
    id: number;
    nom: number;
    prenom: number;
    telephone: number;
    email: number;
    specialite: number;
    isActive: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type TechnicienMinAggregateInputType = {
    id?: true;
    nom?: true;
    prenom?: true;
    telephone?: true;
    email?: true;
    specialite?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type TechnicienMaxAggregateInputType = {
    id?: true;
    nom?: true;
    prenom?: true;
    telephone?: true;
    email?: true;
    specialite?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type TechnicienCountAggregateInputType = {
    id?: true;
    nom?: true;
    prenom?: true;
    telephone?: true;
    email?: true;
    specialite?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type TechnicienAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TechnicienWhereInput;
    orderBy?: Prisma.TechnicienOrderByWithRelationInput | Prisma.TechnicienOrderByWithRelationInput[];
    cursor?: Prisma.TechnicienWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TechnicienCountAggregateInputType;
    _min?: TechnicienMinAggregateInputType;
    _max?: TechnicienMaxAggregateInputType;
};
export type GetTechnicienAggregateType<T extends TechnicienAggregateArgs> = {
    [P in keyof T & keyof AggregateTechnicien]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTechnicien[P]> : Prisma.GetScalarType<T[P], AggregateTechnicien[P]>;
};
export type TechnicienGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TechnicienWhereInput;
    orderBy?: Prisma.TechnicienOrderByWithAggregationInput | Prisma.TechnicienOrderByWithAggregationInput[];
    by: Prisma.TechnicienScalarFieldEnum[] | Prisma.TechnicienScalarFieldEnum;
    having?: Prisma.TechnicienScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TechnicienCountAggregateInputType | true;
    _min?: TechnicienMinAggregateInputType;
    _max?: TechnicienMaxAggregateInputType;
};
export type TechnicienGroupByOutputType = {
    id: string;
    nom: string;
    prenom: string;
    telephone: string | null;
    email: string | null;
    specialite: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: TechnicienCountAggregateOutputType | null;
    _min: TechnicienMinAggregateOutputType | null;
    _max: TechnicienMaxAggregateOutputType | null;
};
type GetTechnicienGroupByPayload<T extends TechnicienGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TechnicienGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TechnicienGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TechnicienGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TechnicienGroupByOutputType[P]>;
}>>;
export type TechnicienWhereInput = {
    AND?: Prisma.TechnicienWhereInput | Prisma.TechnicienWhereInput[];
    OR?: Prisma.TechnicienWhereInput[];
    NOT?: Prisma.TechnicienWhereInput | Prisma.TechnicienWhereInput[];
    id?: Prisma.StringFilter<"Technicien"> | string;
    nom?: Prisma.StringFilter<"Technicien"> | string;
    prenom?: Prisma.StringFilter<"Technicien"> | string;
    telephone?: Prisma.StringNullableFilter<"Technicien"> | string | null;
    email?: Prisma.StringNullableFilter<"Technicien"> | string | null;
    specialite?: Prisma.StringNullableFilter<"Technicien"> | string | null;
    isActive?: Prisma.BoolFilter<"Technicien"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Technicien"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Technicien"> | Date | string;
};
export type TechnicienOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    nom?: Prisma.SortOrder;
    prenom?: Prisma.SortOrder;
    telephone?: Prisma.SortOrderInput | Prisma.SortOrder;
    email?: Prisma.SortOrderInput | Prisma.SortOrder;
    specialite?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TechnicienWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.TechnicienWhereInput | Prisma.TechnicienWhereInput[];
    OR?: Prisma.TechnicienWhereInput[];
    NOT?: Prisma.TechnicienWhereInput | Prisma.TechnicienWhereInput[];
    nom?: Prisma.StringFilter<"Technicien"> | string;
    prenom?: Prisma.StringFilter<"Technicien"> | string;
    telephone?: Prisma.StringNullableFilter<"Technicien"> | string | null;
    email?: Prisma.StringNullableFilter<"Technicien"> | string | null;
    specialite?: Prisma.StringNullableFilter<"Technicien"> | string | null;
    isActive?: Prisma.BoolFilter<"Technicien"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Technicien"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Technicien"> | Date | string;
}, "id">;
export type TechnicienOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    nom?: Prisma.SortOrder;
    prenom?: Prisma.SortOrder;
    telephone?: Prisma.SortOrderInput | Prisma.SortOrder;
    email?: Prisma.SortOrderInput | Prisma.SortOrder;
    specialite?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.TechnicienCountOrderByAggregateInput;
    _max?: Prisma.TechnicienMaxOrderByAggregateInput;
    _min?: Prisma.TechnicienMinOrderByAggregateInput;
};
export type TechnicienScalarWhereWithAggregatesInput = {
    AND?: Prisma.TechnicienScalarWhereWithAggregatesInput | Prisma.TechnicienScalarWhereWithAggregatesInput[];
    OR?: Prisma.TechnicienScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TechnicienScalarWhereWithAggregatesInput | Prisma.TechnicienScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Technicien"> | string;
    nom?: Prisma.StringWithAggregatesFilter<"Technicien"> | string;
    prenom?: Prisma.StringWithAggregatesFilter<"Technicien"> | string;
    telephone?: Prisma.StringNullableWithAggregatesFilter<"Technicien"> | string | null;
    email?: Prisma.StringNullableWithAggregatesFilter<"Technicien"> | string | null;
    specialite?: Prisma.StringNullableWithAggregatesFilter<"Technicien"> | string | null;
    isActive?: Prisma.BoolWithAggregatesFilter<"Technicien"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Technicien"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Technicien"> | Date | string;
};
export type TechnicienCreateInput = {
    id?: string;
    nom: string;
    prenom: string;
    telephone?: string | null;
    email?: string | null;
    specialite?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TechnicienUncheckedCreateInput = {
    id?: string;
    nom: string;
    prenom: string;
    telephone?: string | null;
    email?: string | null;
    specialite?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TechnicienUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nom?: Prisma.StringFieldUpdateOperationsInput | string;
    prenom?: Prisma.StringFieldUpdateOperationsInput | string;
    telephone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    specialite?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TechnicienUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nom?: Prisma.StringFieldUpdateOperationsInput | string;
    prenom?: Prisma.StringFieldUpdateOperationsInput | string;
    telephone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    specialite?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TechnicienCreateManyInput = {
    id?: string;
    nom: string;
    prenom: string;
    telephone?: string | null;
    email?: string | null;
    specialite?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TechnicienUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nom?: Prisma.StringFieldUpdateOperationsInput | string;
    prenom?: Prisma.StringFieldUpdateOperationsInput | string;
    telephone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    specialite?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TechnicienUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nom?: Prisma.StringFieldUpdateOperationsInput | string;
    prenom?: Prisma.StringFieldUpdateOperationsInput | string;
    telephone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    specialite?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TechnicienCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    nom?: Prisma.SortOrder;
    prenom?: Prisma.SortOrder;
    telephone?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    specialite?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TechnicienMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    nom?: Prisma.SortOrder;
    prenom?: Prisma.SortOrder;
    telephone?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    specialite?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TechnicienMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    nom?: Prisma.SortOrder;
    prenom?: Prisma.SortOrder;
    telephone?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    specialite?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type TechnicienSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    nom?: boolean;
    prenom?: boolean;
    telephone?: boolean;
    email?: boolean;
    specialite?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["technicien"]>;
export type TechnicienSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    nom?: boolean;
    prenom?: boolean;
    telephone?: boolean;
    email?: boolean;
    specialite?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["technicien"]>;
export type TechnicienSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    nom?: boolean;
    prenom?: boolean;
    telephone?: boolean;
    email?: boolean;
    specialite?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["technicien"]>;
export type TechnicienSelectScalar = {
    id?: boolean;
    nom?: boolean;
    prenom?: boolean;
    telephone?: boolean;
    email?: boolean;
    specialite?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type TechnicienOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "nom" | "prenom" | "telephone" | "email" | "specialite" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["technicien"]>;
export type $TechnicienPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Technicien";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        nom: string;
        prenom: string;
        telephone: string | null;
        email: string | null;
        specialite: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["technicien"]>;
    composites: {};
};
export type TechnicienGetPayload<S extends boolean | null | undefined | TechnicienDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TechnicienPayload, S>;
export type TechnicienCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TechnicienFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TechnicienCountAggregateInputType | true;
};
export interface TechnicienDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Technicien'];
        meta: {
            name: 'Technicien';
        };
    };
    findUnique<T extends TechnicienFindUniqueArgs>(args: Prisma.SelectSubset<T, TechnicienFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TechnicienClient<runtime.Types.Result.GetResult<Prisma.$TechnicienPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TechnicienFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TechnicienFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TechnicienClient<runtime.Types.Result.GetResult<Prisma.$TechnicienPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TechnicienFindFirstArgs>(args?: Prisma.SelectSubset<T, TechnicienFindFirstArgs<ExtArgs>>): Prisma.Prisma__TechnicienClient<runtime.Types.Result.GetResult<Prisma.$TechnicienPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TechnicienFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TechnicienFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TechnicienClient<runtime.Types.Result.GetResult<Prisma.$TechnicienPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TechnicienFindManyArgs>(args?: Prisma.SelectSubset<T, TechnicienFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TechnicienPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TechnicienCreateArgs>(args: Prisma.SelectSubset<T, TechnicienCreateArgs<ExtArgs>>): Prisma.Prisma__TechnicienClient<runtime.Types.Result.GetResult<Prisma.$TechnicienPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TechnicienCreateManyArgs>(args?: Prisma.SelectSubset<T, TechnicienCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends TechnicienCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TechnicienCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TechnicienPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends TechnicienDeleteArgs>(args: Prisma.SelectSubset<T, TechnicienDeleteArgs<ExtArgs>>): Prisma.Prisma__TechnicienClient<runtime.Types.Result.GetResult<Prisma.$TechnicienPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TechnicienUpdateArgs>(args: Prisma.SelectSubset<T, TechnicienUpdateArgs<ExtArgs>>): Prisma.Prisma__TechnicienClient<runtime.Types.Result.GetResult<Prisma.$TechnicienPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TechnicienDeleteManyArgs>(args?: Prisma.SelectSubset<T, TechnicienDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TechnicienUpdateManyArgs>(args: Prisma.SelectSubset<T, TechnicienUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends TechnicienUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TechnicienUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TechnicienPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends TechnicienUpsertArgs>(args: Prisma.SelectSubset<T, TechnicienUpsertArgs<ExtArgs>>): Prisma.Prisma__TechnicienClient<runtime.Types.Result.GetResult<Prisma.$TechnicienPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TechnicienCountArgs>(args?: Prisma.Subset<T, TechnicienCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TechnicienCountAggregateOutputType> : number>;
    aggregate<T extends TechnicienAggregateArgs>(args: Prisma.Subset<T, TechnicienAggregateArgs>): Prisma.PrismaPromise<GetTechnicienAggregateType<T>>;
    groupBy<T extends TechnicienGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TechnicienGroupByArgs['orderBy'];
    } : {
        orderBy?: TechnicienGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TechnicienGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTechnicienGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TechnicienFieldRefs;
}
export interface Prisma__TechnicienClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TechnicienFieldRefs {
    readonly id: Prisma.FieldRef<"Technicien", 'String'>;
    readonly nom: Prisma.FieldRef<"Technicien", 'String'>;
    readonly prenom: Prisma.FieldRef<"Technicien", 'String'>;
    readonly telephone: Prisma.FieldRef<"Technicien", 'String'>;
    readonly email: Prisma.FieldRef<"Technicien", 'String'>;
    readonly specialite: Prisma.FieldRef<"Technicien", 'String'>;
    readonly isActive: Prisma.FieldRef<"Technicien", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"Technicien", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Technicien", 'DateTime'>;
}
export type TechnicienFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TechnicienSelect<ExtArgs> | null;
    omit?: Prisma.TechnicienOmit<ExtArgs> | null;
    where: Prisma.TechnicienWhereUniqueInput;
};
export type TechnicienFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TechnicienSelect<ExtArgs> | null;
    omit?: Prisma.TechnicienOmit<ExtArgs> | null;
    where: Prisma.TechnicienWhereUniqueInput;
};
export type TechnicienFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TechnicienSelect<ExtArgs> | null;
    omit?: Prisma.TechnicienOmit<ExtArgs> | null;
    where?: Prisma.TechnicienWhereInput;
    orderBy?: Prisma.TechnicienOrderByWithRelationInput | Prisma.TechnicienOrderByWithRelationInput[];
    cursor?: Prisma.TechnicienWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TechnicienScalarFieldEnum | Prisma.TechnicienScalarFieldEnum[];
};
export type TechnicienFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TechnicienSelect<ExtArgs> | null;
    omit?: Prisma.TechnicienOmit<ExtArgs> | null;
    where?: Prisma.TechnicienWhereInput;
    orderBy?: Prisma.TechnicienOrderByWithRelationInput | Prisma.TechnicienOrderByWithRelationInput[];
    cursor?: Prisma.TechnicienWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TechnicienScalarFieldEnum | Prisma.TechnicienScalarFieldEnum[];
};
export type TechnicienFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TechnicienSelect<ExtArgs> | null;
    omit?: Prisma.TechnicienOmit<ExtArgs> | null;
    where?: Prisma.TechnicienWhereInput;
    orderBy?: Prisma.TechnicienOrderByWithRelationInput | Prisma.TechnicienOrderByWithRelationInput[];
    cursor?: Prisma.TechnicienWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TechnicienScalarFieldEnum | Prisma.TechnicienScalarFieldEnum[];
};
export type TechnicienCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TechnicienSelect<ExtArgs> | null;
    omit?: Prisma.TechnicienOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TechnicienCreateInput, Prisma.TechnicienUncheckedCreateInput>;
};
export type TechnicienCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TechnicienCreateManyInput | Prisma.TechnicienCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TechnicienCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TechnicienSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TechnicienOmit<ExtArgs> | null;
    data: Prisma.TechnicienCreateManyInput | Prisma.TechnicienCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TechnicienUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TechnicienSelect<ExtArgs> | null;
    omit?: Prisma.TechnicienOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TechnicienUpdateInput, Prisma.TechnicienUncheckedUpdateInput>;
    where: Prisma.TechnicienWhereUniqueInput;
};
export type TechnicienUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TechnicienUpdateManyMutationInput, Prisma.TechnicienUncheckedUpdateManyInput>;
    where?: Prisma.TechnicienWhereInput;
    limit?: number;
};
export type TechnicienUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TechnicienSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TechnicienOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TechnicienUpdateManyMutationInput, Prisma.TechnicienUncheckedUpdateManyInput>;
    where?: Prisma.TechnicienWhereInput;
    limit?: number;
};
export type TechnicienUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TechnicienSelect<ExtArgs> | null;
    omit?: Prisma.TechnicienOmit<ExtArgs> | null;
    where: Prisma.TechnicienWhereUniqueInput;
    create: Prisma.XOR<Prisma.TechnicienCreateInput, Prisma.TechnicienUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TechnicienUpdateInput, Prisma.TechnicienUncheckedUpdateInput>;
};
export type TechnicienDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TechnicienSelect<ExtArgs> | null;
    omit?: Prisma.TechnicienOmit<ExtArgs> | null;
    where: Prisma.TechnicienWhereUniqueInput;
};
export type TechnicienDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TechnicienWhereInput;
    limit?: number;
};
export type TechnicienDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TechnicienSelect<ExtArgs> | null;
    omit?: Prisma.TechnicienOmit<ExtArgs> | null;
};
export {};
