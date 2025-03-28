'use client';
import RocketLaunch from '@mui/icons-material/RocketLaunch';
import { IconButton } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import { RichTextInput } from 'ra-input-rich-text';
import frenchMessages from 'ra-language-french';
import { useState } from 'react';
import {
    Admin,
    AppBar,
    ArrayInput,
    AutocompleteArrayInput,
    AutocompleteInput,
    BooleanField,
    BooleanInput,
    Create,
    Datagrid,
    DateField,
    DateInput,
    DeleteButton,
    Edit,
    EditButton,
    FileField,
    FileInput,
    FunctionField,
    ImageField,
    ImageInput,
    Layout,
    LayoutProps,
    List,
    Menu,
    NumberField,
    NumberInput,
    ReferenceArrayField,
    ReferenceArrayInput,
    ReferenceField,
    ReferenceInput,
    Resource,
    RichTextField,
    SearchInput,
    SelectField,
    SelectInput,
    Show,
    SimpleForm,
    SimpleFormIterator,
    SimpleShowLayout,
    TextField,
    TextInput,
    TitlePortal,
    useRecordContext,
    useShowContext,
} from 'react-admin';
import { QueryClient } from 'react-query';
import { JSX } from 'react/jsx-runtime';
import { config } from './config/config';
import { authProvider, dataProvider } from './config/firebase';
import { Field } from './config/types';
import './styles.css';

const messages = { fr: frenchMessages };

// @ts-ignore
const i18nProvider = polyglotI18nProvider((locale) => messages[locale], 'fr', [
    'fr',
]);

export function MyAppBar() {
    const [loading, setLoading] = useState(false);

    // eslint-disable-next-line no-undef
    const pat = process.env.PAT;
    const url =
        'https://api.github.com/repos/accolade-scop/marionrenauld.com/dispatches';

    function triggerDeploy() {
        setLoading(true);
        console.log('trigger deploy');
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${pat}`,
            },
            body: JSON.stringify({ event_type: 'webhook' }),
        };
        fetch(url, requestOptions).then(() => {
            setTimeout(() => setLoading(false), 120000);
        });
    }

    return (
        <AppBar>
            <TitlePortal />
            {loading ? (
                <CircularProgress title='chargement en cours' />
            ) : (
                <IconButton color='inherit' onClick={() => triggerDeploy()}>
                    <RocketLaunch />
                </IconButton>
            )}
        </AppBar>
    );
}

export const MyLayout = (props: JSX.IntrinsicAttributes & LayoutProps) => (
    <Layout {...props} appBar={MyAppBar} />
);

const collections = config['collections'];
export const MyMenu = () => (
    <Menu>
        {/*<Menu.DashboardItem/>*/}
        {Object.keys(collections)
            // @ts-ignore
            .sort((a: any, b: any) => collections[a].order > collections[b].order ? 1 : -1)
            .map((c: any) => (
                <Menu.ResourceItem name={c} key={c} />
            ))}
    </Menu>
);
export const App = () => {
    const collections = config['collections'];
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 10 * 1000, // 30 secondes
            },
        },
    });
    return (
        <Admin
            layout={MyLayout}
            menu={MyMenu}
            authProvider={authProvider}
            i18nProvider={i18nProvider}
            queryClient={queryClient}
            dataProvider={dataProvider}
        >
            <>
                {Object.keys(collections)
                    // @ts-ignore
                    .sort((a: any, b: any) => collections[a].order > collections[b].order ? 1 : -1)
                    .map((c: any) => (
                        <Resource
                            key={c}
                            name={c}
                            // @ts-ignore
                            options={{ label: collections[c].label }}
                            recordRepresentation='name'
                            list={getList(c)}
                            show={getShow(c)}
                            create={getCreate(c)}
                            edit={getEdit(c)}
                        />
                    ))}
            </>
        </Admin>
    );
};

type col = keyof (typeof config)['collections'];

const postFilters = [
    <SearchInput source='name' alwaysOn key='name' name='name' />,
];

const getList = (c: col) => {
    const collection = config['collections'][c];
    // @ts-ignore
    if (collection.custom?.list) {
        // @ts-ignore
        return collection.custom.list;
    }
    const fields = collection['fields'];
    const components = Object.keys(fields)
        .filter((k) => {
            // @ts-ignore
            if (fields[k].hide?.includes('list')) {
                return false;
            }
            return true;
        })
        // @ts-ignore
        .map((k) => guessViewField(k, fields[k]));

    // @ts-ignore
    const getLabel = (key: any, defaultLabel: string) => key in collection && collection[key as any] !== ''
        ? // @ts-ignore
        collection[key]
        : defaultLabel;
    const editLabel: any = getLabel('editLabel', 'Modifier');
    // const showLabel: any = getLabel('showLabel', 'Voir');
    const sort: any =
        'defaultSort' in collection ? collection.defaultSort : undefined;
    return (
        <List
            title={'liste: ' + collection.label}
            sort={sort}
            filters={postFilters}
        >
            {/* TODO mettre 'show' a la place quand ca marchera  */}
            <Datagrid rowClick='edit'>
                {components}
                {/*<ShowButton label={showLabel}/>*/}

                {'protected' in collection && collection.protected !== true ? (
                    <>
                        <EditButton label={editLabel} />
                        <DeleteButton mutationMode='pessimistic' />
                    </>
                ) : (
                    ''
                )}
            </Datagrid>
        </List>
    );
};

const getCreate = (c: col) => {
    const collection = config['collections'][c];
    // @ts-ignore
    if (collection.custom?.create) {
        // @ts-ignore
        return collection.custom.create;
    }
    const fields = collection['fields'];
    const components = Object.keys(fields)
        // @ts-ignore
        .filter((k) => !fields[k].hide?.includes('create'))
        // @ts-ignore
        .map((k) => guessCreateField(k, fields[k]));

    return (
        <Create redirect='list' title={'Créer: ' + config['collections'][c].label}>
            <SimpleForm>{components}</SimpleForm>
        </Create>
    );
};

const getShow = (c: col) => {
    const collection = config['collections'][c];
    // @ts-ignore
    if (collection.custom?.show) {
        // @ts-ignore
        return collection.custom.show;
    }
    const fields = collection['fields'];
    // @ts-ignore
    const components = Object.keys(fields).map((k: keyof typeof fields) => {
        const field: any = fields[k];
        const component = guessShowField(k, field);

        if (field.condition) {
            return ConditionalEmailField(field.condition, component);
        }
        return component;
    });
    return (
        <Show title={'Détail: ' + config['collections'][c].label} actions={false}>
            <SimpleShowLayout>{components}</SimpleShowLayout>
        </Show>
    );
};

const getEdit = (c: col) => {
    const collection = config['collections'][c];
    // @ts-ignore
    if (collection.custom?.edit) {
        // @ts-ignore
        return collection.custom.edit;
    }
    const fields = collection['fields'];
    // @ts-ignore
    const components = Object.keys(fields)
        // @ts-ignore
        .filter((k) => !fields[k].hide?.includes('edit'))
        // @ts-ignore
        .map((k) => guessCreateField(k, fields[k]));

    return (
        <Edit title={'Créer: ' + config['collections'][c].label}>
            <SimpleForm>{components}</SimpleForm>
        </Edit>
    );
};

const guessViewField = (key: string, field: Field) => {
    const params = { source: key, label: field.label };

    if (field.reference) {
        if (field.multiple) {
            return (
                // @ts-ignore
                <ReferenceArrayField label={config.collections[field.reference].label}
                                     reference={field.reference}
                                     key={key}
                                     source={key}
                />
            );
        } else {
            return (
                // @ts-ignore
                <ReferenceField label={config.collections[field.reference].label}
                                reference={field.reference}
                                key={key}
                                source={key}
                />
            );
        }
    }
    
    const customField = field.custom;

    if (customField) {
        return <FunctionField key={key} {...params} render={(value: Record<string, unknown>) => customField(value)}/>
    }

    switch (field.type) {
        case 'checkbox':
            return <BooleanField key={key} {...params} />;
        case 'string':
            return <TextField key={key} {...params} />;
        case 'text':
            return <TextField key={key} {...params} />;
        case 'date':
            return <DateField key={key} {...params} />;
        case 'number':
            return <NumberField key={key} {...params} />;
        case 'select':
            return (
                <SelectField
                    key={key}
                    {...params}
                    optionText={field.transformer}
                    choices={field.list.map((i) => ({ id: i, name: i }))}
                />
            );
    }
    return <TextField key={key} {...params} />;
};

const guessShowField = (key: string, field: Field) => {
    const params = { source: key, label: field.label, fullWidth: true };

    // nested
    // if(field.nested?.length) {
    //     return (
    //         <NestedInput key={key}  {...params} />
    //     )
    // }

    // reference
    if (field.reference) {
        if (field.multiple) {
            return (
                <ReferenceArrayField
                    reference={field.reference}
                    key={key}
                    {...params}
                />
            );
        }
        return <ReferenceField reference={field.reference} key={key} {...params} />;
    }

    // standard
    switch (field.type) {
        case 'image':
            return (
                <ImageField key={key} {...params} title='title' source={key + '.src'} />
            );
        case 'checkbox':
            return <BooleanField key={key} {...params} />;
        case 'string':
            return <TextField key={key} {...params} />;
        case 'text':
            return (
                <RichTextField key={key} {...params} height='500' minHeight='500' />
            );
        case 'date':
            return <DateField key={key} {...params} />;
        case 'number':
            return <NumberField key={key} {...params} />;
        case 'select':
            return (
                <SelectField
                    key={key}
                    {...params}
                    optionText={field.transformer}
                    choices={field.list.map((i) => ({ id: i, name: i }))}
                />
            );
        case 'json':
            return <ShowJson key={key} {...params} />;
    }
    return <TextField key={key} {...params} />;
};

const ShowJson = () => {
    const {
        record, // record fetched via dataProvider.getOne() based on the id from the location
    } = useShowContext();

    return (
        <div>
            <TextField defaultValue={record?.mode} />
        </div>
    );
};

const guessCreateField = (key: string, field: Field, fullWidth = true) => {
    const params = {
        source: key,
        label: field.label,
        fullWidth,
        inputProps: field.inputProps
    };

    // nested
    if (field.nested && Object.keys(field.nested).length > 0) {
        const components = Object.keys(field.nested).map((k) =>
            guessCreateField(k, field.nested[k], false)
        );
        return (
            <ArrayInput key={key} source={key + 'lol'}>
                <SimpleFormIterator inline>{components}</SimpleFormIterator>
            </ArrayInput>
        );
    }

    // reference
    if (field.reference) {
        const filterToQuery = (searchText: any) => ({ name: searchText });
        if (field.multiple) {
            return (
                <ReferenceArrayInput reference={field.reference} key={key} {...params}>
                    <AutocompleteArrayInput
                        label={field.label}
                        filterToQuery={filterToQuery}
                        fullWidth
                        optionText='name'
                        name={key}
                    />
                </ReferenceArrayInput>
            );
        }
        return (
            <ReferenceInput reference={field.reference} key={key} {...params}>
                <AutocompleteInput
                    label={field.label}
                    filterToQuery={filterToQuery}
                    fullWidth
                    optionText='name'
                    name={key}
                />
            </ReferenceInput>
        );
    }

    // standard
    switch (field.type) {
        case 'image':
            return (
                <ImageInput
                    key={key}
                    {...params}
                    maxSize={5_000_000}
                    multiple={field.multiple || false}
                >
                    <ImageField source='src' title='title' />
                </ImageInput>
            );
        case 'file':
            return (
                <FileInput key={key} {...params} maxSize={20_000_000}>
                    <FileField source='src' title='title' />
                </FileInput>
            );

        case 'checkbox':
            return <BooleanInput key={key} {...params} />;
        case 'string':
            return <TextInput key={key} value="Bonjour" {...params}/>
        case 'text':
            return (
                <RichTextInput key={key} {...params} height='500' minHeight={500} />
            );
        case 'date':
            return (
                <DateInput
                    key={key}
                    parse={(date: Date | string) => {
                        const newDate = new Date(date);
                        if (isNaN(newDate.getTime()) || newDate.getFullYear() < 1900) {
                            return date;
                        }
                        return newDate;
                    }}
                    {...params}
                />
            );
        case 'number':
            return <NumberInput key={key} {...params} />;
        case 'select':
            return (
                <SelectInput
                    key={key}
                    {...params}
                    optionText={field.transformer}
                    choices={field.list.map((i) => ({ id: i, name: i }))}
                />
            );
        case 'images':
            return <OrderedImagesField key={key} {...params} />;
    }
    return <TextInput key={key} {...params} />;
};

const ConditionalEmailField = (
    // eslint-disable-next-line no-unused-vars
    condition: (record: any) => boolean,
    component: JSX.Element
) => {
    const record = useRecordContext();
    return condition(record) ? component : null;
};

const OrderedImagesField = (parameters: any) => {
    return (
        <ArrayInput source={parameters.source}>
            <SimpleFormIterator inline disableClear={true}>
                <ImageInput source='element' label='' maxSize={5_000_000}>
                    <ImageField source='src' title='title' label='' />
                </ImageInput>
            </SimpleFormIterator>
        </ArrayInput>
    );
};
