
import { config } from './config';

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
type DualXOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;
type XOR<T extends any[]> =
    T extends [infer Only] ? Only :
        T extends [infer A, infer B, ...infer Rest] ? XOR<[DualXOR<A, B>, ...Rest]> :
            never;

export type SimpleField = {
    label: string;
    type?: 'string' | 'number' | 'text' | 'date' | 'checkbox' | 'image' | 'file';
    condition?: (record: any) => boolean
};

export type ReferenceField = { label?: string, reference: string, multiple?: boolean };
export type GroupField = { label: string, nested: Record<string, Field> }
export type SelectField = { label: string; type: 'select', list: ReadonlyArray<string> }
export type JsonField = {label: string, type: 'json' }
export type Field = XOR<[SimpleField, ReferenceField, SelectField, GroupField, JsonField]>
    & {
    hide?: ReadonlyArray<'list' | 'edit' | 'create'>,
    order?: number,
    transformer?: (v: any) => any,
    inputProps?: any,
}


export interface ICollection {
    order?: number;
    label: string;
    icon?: string;
    protected?: boolean;
    editLabel?: string;
    defaultSort?: any;
    // composant custom pour certaines actions
    custom?: {
        edit?: any,
        show?: any,
        list?: any,
        create?: any,
    },
    fields: Readonly<Record<string, Field>>;
}

export interface IConfig {
    collections: Readonly<Record<string, ICollection>>;
}

export type AFieldList<Coll extends collection> = keyof typeof config['collections'][Coll]['fields']

export type AField<
    Coll extends collection,
    Field extends AFieldList<Coll>
> = typeof config['collections'][Coll]['fields'][Field];

// @ts-ignore
export type getFieldType<
    Coll extends collection,
    Field extends AFieldList<Coll>
> = AField<Coll, Field> extends { readonly reference: any, multiple: true } ? string[]
    : AField<Coll, Field> extends { readonly reference: any } ? string
        // @ts-ignore
        : AField<Coll, Field> extends { readonly list: infer U } ? U[number]
            : AField<Coll, Field> extends {readonly type: 'json'} ? Record<string, any>
                : AField<Coll, Field> extends {readonly type: 'date'} ? string
                    : AField<Coll, Field> extends {readonly type: 'number'} ? number
                        : AField<Coll, Field> extends {readonly type: 'image'} ? { src: string, title: string }
                            : AField<Coll, Field> extends {readonly type: 'file'} ? { src: string, title: string }
                                : AField<Coll, Field> extends {readonly type: 'checkbox'} ? boolean
                                    : string;

export type collection = keyof typeof config['collections'];
export type ACMSConfig<Coll extends collection> = {
    -readonly [Field in AFieldList<Coll>]?: getFieldType<Coll, Field>;
} & { id: string }

