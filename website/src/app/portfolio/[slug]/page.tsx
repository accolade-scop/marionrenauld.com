import { ACMS } from '@/utils/tool';
import Image from 'next/image';
import Link from 'next/link';

export default async function DetailProjet({params}: any) {
    const slug = params.slug;

    const projet = await ACMS.getBySlug('projet', slug);
    if (!projet) {
        return <>not found {slug}</>;
    }

    // on récupère la liste des projets ordonnés par date décroissante
    const projectsList = (await ACMS.getList('projet')).sort((a, b) => (a.date || '') > (b.date || '') ? -1 : 1);
    const currentPosition = projectsList.findIndex(p => p.id === projet.id);
    const previousProject = currentPosition > 0 ? projectsList[currentPosition - 1] : null;
    const nextProject = currentPosition < projectsList.length ? projectsList[currentPosition + 1] : null;

    return <main className="projet">

        <article className="container">

            <h1>{projet.name}</h1>

            <div className="slider">
                {projet.image?.map((image, key) =>
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={key} src={image.src} alt={image.title}/>
                )}
            </div>

            <h2>{projet.period}</h2>

            <h5>{projet.location}</h5>

            <div dangerouslySetInnerHTML={{__html: projet.contenu || ''}}/>

            {projet.fichier?.src
                ? <Link className="download" href={projet.fichier.src} target="_blank">
                    <img src="/img/download.svg" className="picto" alt="Télécharger"/>
                </Link>
                : ''}

            <nav className="pager">
                {previousProject
                    ? <Link href={ACMS.getLink('projet', previousProject)}>
                        <img src="/img/left.svg" className="picto" alt="Précédent"/>
                    </Link>
                    : ''
                }
                {nextProject
                    ? <Link href={ACMS.getLink('projet', nextProject)}>
                        <img src="/img/right.svg" className="picto" alt="Suivant"/>
                    </Link>
                    : ''
                }
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
