
import { ACMSConfig, Collection } from '@/../../admin/src/config/types';
import { getData } from '@/utils/get-information';
import { config } from '../../../admin/src/config/config';
export type { ACMSConfig, Collection } from '@/../../admin/src/config/types';

export const slugify = (text: string = '') => {
    return text
        .toString()                   // Cast to string (optional)
        .normalize('NFKD')            // The normalize() using NFKD method returns the Unicode Normalization Form of a
        // given string.
        .toLowerCase()                // Convert the string to lowercase letters
        .trim()                       // Remove whitespace from both sides of a string (optional)
        .replace(/\s+/g, '-')         // Replace spaces with -
        .replace(/[^\w\-]+/g, '')     // Remove all non-word chars
        .replace(/\_/g, '-')           // Replace _ with -
        .replace(/\-\-+/g, '-')       // Replace multiple - with single -
        .replace(/\-$/g, '');         // Remove trailing -
};


const entityToBaseUrlMap: Partial<{ [key in Collection]: string }> = {
    action: 'projet/action',
    langage: 'projet/langage',
    objet: 'projet/objet',
};


export class ACMS {
    static async getList<T extends Collection>(type: T): Promise<ACMSConfig<T>[]> {
        let list = await getData(type);

        // si y'a un filtre spécifié
        if ('filterList' in config.collections[type]) {
            list = list.filter((config.collections[type] as any).filterList);
        }

        if (list.some(e => e.order)) {
            list = list.sort((a, b) => +a.order > +b.order ? 1 : -1);
        }
        if (list.some(e => e.publication)) {
            list = list.sort((a, b) => b.publication > a.publication ? 1 : -1);
        }
        if (list.some(e => e.start_date)) {
            list = list.sort((a, b) => b.start_date < a.start_date ? 1 : -1);
        }
        return list;
    }

    static async getByID<T extends Collection>(type: T, id: string): Promise<ACMSConfig<T> | undefined> {
        const list = await this.getList(type);
        return list.find(e => e.id === id);
    }

    static async getBySlug<T extends Collection>(type: T, slug: string, withoutId = false) {
        const list = await this.getList(type);
        return list.find(j => this.getSlug(j, withoutId) === slug);
    }


    static getSlug<T extends Collection>(entity: ACMSConfig<T>, withoutId = false): string {
        const slugsPart = [];

        if (entity?.name && typeof entity.name === 'string') {
            slugsPart.push(slugify(entity.name));
        }
        if (entity?.id && !withoutId) {
            slugsPart.push(entity.id);
        }
        return slugsPart.join('-');
    }

    static getLink<T extends Collection>(type: T, entity: ACMSConfig<T>): string {
        const baseUrl = entityToBaseUrlMap[type];
        if (baseUrl) {
            return '/' + baseUrl + '/' + this.getSlug(entity);
        }
        return '';
    }
}
