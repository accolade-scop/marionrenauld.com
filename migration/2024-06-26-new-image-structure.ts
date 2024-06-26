// Lancer la commande avec export GOOGLE_APPLICATION_CREDENTIALS="sa.json" ts-node file.ts

import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';


const app = initializeApp();
const firestore = getFirestore()

async function start() {
    const collection = 'objet';
    const data = await firestore.collection(collection).get();
    for (const doc of data.docs) {
        const image: any[] = doc.data().image || [];
        if(image.length>0) {
            console.log(doc.id, doc.data().name)
            const imagesNewVersion = image.map((i: any) => {
                return {element: i}
            })

            const ref = firestore.collection(collection).doc(doc.id);
            const res = await ref.update({images: imagesNewVersion});
        }
    }
}

start().catch(console.error);
