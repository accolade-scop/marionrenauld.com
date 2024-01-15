
const cache: Record<string, { date: Date, data: any[] }> = {};

export async function getData<T = any>(name: string): Promise<T[]> {
    if (false && cache[name]) {
        const cacheCreatedAt = new Date(cache[name].date).getTime();
        const now = new Date().getTime();
        if(cacheCreatedAt+30000 > now && cache[name].data.length > 0) {
            console.log('get from cache for ' +name, 'cache size: '+cache[name].data.length, cache[name].date);
            return cache[name].data;
        } else {
            console.log('cache updated for '+name);
        }
    }
    const url = 'https://firestore.googleapis.com/v1/projects/marion-renauld/databases/(default)/documents/' + name + '?pageSize=200';
    return fetch(url)
        .then( res => {
            return res.json()
        })
        .then(res => {
            return res.documents
        })
        .then(documents => {
                const docsList = (documents || []).map((doc: any) => {
                    return cleanDoc(doc.fields);
                });

                cache[name] = {date: new Date(), data: docsList};

                return docsList;
            }
        );
}


function cleanDoc(fields: any) {
    const rtr: any = {};
    for (const fieldElement of Object.keys(fields)) {
        const definition = fields[fieldElement];
        const valueType = Object.keys(definition)[0];
        const value = definition[valueType];

        // est ce qu'on est dans le cas d'une données nichée ?
        if (valueType === 'arrayValue') {
            if (Object.keys(value).length === 0) {
                rtr[fieldElement] = [];
            } else {
                rtr[fieldElement] = value.values.map((v: any) => {
                    let data = v[Object.keys(v)[0]];
                    if(data.fields) {
                        const fields = data.fields;
                        data = {};
                        Object.keys(fields).forEach(k => {
                            data[k] = fields[k][Object.keys(fields[k])[0]]
                        });

                    }
                    return data;
                });
            }
        } else if (
            value &&
            typeof value === 'object'
            && Object.keys(value).length > 0
            && Object.keys(value)[0] === 'fields') {
            rtr[fieldElement] = cleanDoc(value[Object.keys(value)[0]]);
        } else {
            rtr[fieldElement] = value;
        }
    }

    // on rajoute les dates de mise à jour et de création
    if (fields.createTime) {
        rtr.createTime = fields.createTime;
    }
    if (fields.updateTime) {
        rtr.updateTime = fields.updateTime;
    }

    return rtr;
}
