import { FirebaseAuthProvider, FirebaseDataProvider, RAFirebaseOptions } from 'react-admin-firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBQIKVHHMxmUlPAF2LHeBJJPQSn1bsK0Yc",
    authDomain: "marion-renauld.firebaseapp.com",
    projectId: "marion-renauld",
    storageBucket: "marion-renauld.appspot.com",
    messagingSenderId: "284289925099",
    appId: "1:284289925099:web:a083fed3abae891d89a3ae"
};

const config: RAFirebaseOptions = {
    associateUsersById: true,
    // logging: true,
    watch: [],
    lazyLoading: {
        enabled: false
    },
    // firestoreCostsLogger: {
    //     enabled: true,
    //     persistCount: true
    // },
    transformToDb: (resourceName: any, documentData: any) => {
        // remove undefined fields from the document, since firestore does not accept undefined as a field value
        return Object.fromEntries(
            Object.entries(documentData).filter(([, val]) => val !== undefined)
        );
    }
}


export const authProvider = FirebaseAuthProvider(firebaseConfig, config);

export const dataProvider = FirebaseDataProvider(firebaseConfig, config);

