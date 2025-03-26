import { ICollection, IConfig } from './types';

export const projetTypesList = ['action', 'objet'];
export type ProjetType = typeof projetTypesList[number];

const projectFields: ICollection['fields'] = {
    name: {
        label: 'Titre'
    },
    date: {
        label: 'Date',
        type: 'date'
    },
    period: {
        label: 'Période',
    },
    location: {
        label: 'Lieu',
        hide: ['list']
    },
    descriptif: {
        label: 'Descriptif',
        hide: ['list']
    },
    contenu: {
        label: 'Contenu',
        type: 'text',
        hide: ['list']
    },
    fichier: {
        label: 'Fichier',
        type: 'file',
        hide: ['list']
    },
    images: {
        label: 'images',
        type: 'images',
        hide: ['list']
    },
} as const;

export const config = {
    collections: {
        action: {
            label: 'Action',
            order: 0,
            fields: projectFields
        },
        langage: {
            label: 'Langage',
            order: 1,
            fields: {
                name: {
                    label: 'Titre'
                },
                date: {
                    label: 'Date',
                    type: 'date'
                },
                fichier: {
                    label: 'Fichier',
                    type: 'file',
                    hide: ['list']
                },
            }
        },
        objet: {
            label: 'Objet',
            order: 2,
            fields: projectFields
        },
        cv: {
            defaultSort: {
                field: 'lastupdate',
                order: 'DESC'
            },
            label: 'CV',
            order: 1,
            fields: {
                name: {
                    label: 'Titre',
                    hide: ['create', 'edit'],
                    custom: (value: {lastupdate: Date}) => new Date(value.lastupdate).toLocaleString()
                },
                fichier: {
                    label: 'Fichier',
                    type: 'file',
                    hide: ['list']
                }
            }
        }
    }
} as const satisfies IConfig;
