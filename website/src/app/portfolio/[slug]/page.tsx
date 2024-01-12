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
                    <span className="material-icons">file_download</span>
                </Link>
                : ''}

            <nav className="pager">
                <Link href="/">
                    <span className="material-icons">arrow_circle_left</span>
                </Link>
                <Link href="/">
                    <span className="material-icons">arrow_circle_right</span>
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
