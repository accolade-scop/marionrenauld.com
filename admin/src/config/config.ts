import { IConfig } from './types';

export const projetTypesList = ['action', 'langage', 'objet'];
export type ProjetType = typeof projetTypesList[number];

export const config = {
    collections: {
        projet: {
            label: 'Projet',
            order: 0,
            fields: {
                name: {
                    label: 'Titre'
                },
                type: {
                    label: 'Type',
                    type: 'select',
                    list: projetTypesList,
                },
                date: {
                    label: 'Date',
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
                image: {
                    label: 'image',
                    type: 'image',
                    hide: ['list']
                }
            }
        }
    }
} as const satisfies IConfig;
