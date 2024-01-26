import { ACMS } from '@/utils/tool';
import Link from 'next/link';

export default async function ObjetAccueil() {
    const projectsList = (await ACMS.getList('objet')).sort((a, b) => (a.date || '') > (b.date || '') ? -1 : 1);
    const firstProject = projectsList[0];

    if(!firstProject) {
        return <>not found</>
    }
    return (<main className="theme">

        <article className="container">

            <h1>Objet</h1>

            <p>Ou ce qui touche une page, la frappe, la plie, la noircit ou la colore.</p>

            <p>2D : des images, des traits, de la couleur et du fil, ce qui donc, plat, cogne les pupilles.</p>

            <p>3D : du papier qui prend du volume, des livres à construire, une façon d’entrer dans la forme.</p>

            <p>4D : toujours en plus du temps, ça va de soi tout en ne sachant pas vraiment comment ça développe.</p>

            <Link href={ACMS.getLink('objet', firstProject)}>
                <img src="/img/read.svg" className="picto" alt="Lire"/>
            </Link>

        </article>

    </main>)
}
