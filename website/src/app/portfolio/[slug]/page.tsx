import { ACMS } from '@/utils/tool';
import Link from 'next/link';

export default async function DetailProjet({params}: any) {
    const slug = params.slug;

    const projet = await ACMS.getBySlug('projet', slug);
    if (!projet) {
        return <>not found {slug}</>;
    }

    return <main className="projet">

        <article className="container">

            <h1>{projet.name}</h1>

            <div className="slider"> SLIDER ici ...</div>

            <h2>{projet.descriptif}</h2>

            <h5>{projet.location}</h5>

            <div dangerouslySetInnerHTML={{__html: projet.contenu || ''}}/>

            {projet.fichier?.src
                ? <Link className="download" href={projet.fichier.src} target="_blank">
                    <img src="/img/download.svg" className="picto" alt="Télécharger"/>
                </Link>
                : ''}

            <nav className="pager">
                <Link href="/">
                    <img src="/img/left.svg" className="picto" alt="Précédent"/>
                </Link>
                <Link href="/">
                    <img src="/img/right.svg" className="picto" alt="Suivant"/>
                </Link>
            </nav>

        </article>

    </main>;

}

export async function generateStaticParams() {
    const list = await ACMS.getList('projet');

    return list.map((e) => ({
        slug: ACMS.getSlug(e),
    }));
}
