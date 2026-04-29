import ProjectSlider from '@/components/projet/ProjectSlider';
import { ACMS, ACMSConfig } from '@/utils/tool';
import Link from 'next/link';

type ProjectType = ACMSConfig<'action'> | ACMSConfig<'objet'>;

export default async function Projet(params: { projet: ProjectType, type: 'action' | 'objet' }) {

    const projet = params.projet;
    const type = params.type;


    // on récupère la liste des projets ordonnés par date décroissante
    const projectsList = (await ACMS.getList(type)).sort((a, b) => (a.date || '') > (b.date || '') ? -1 : 1);
    const currentPosition = projectsList.findIndex(p => p.id === projet.id);
    const previousProject = currentPosition > 0 ? projectsList[currentPosition - 1] : null;
    const nextProject = currentPosition < projectsList.length ? projectsList[currentPosition + 1] : null;

    const fichiersList: any[] = projet.fichier ? (Array.isArray(projet.fichier) ? projet.fichier : [projet.fichier]) : [];

    return <main className="projet">

        <article className="container">

            <h1>{projet.name}</h1>

            <ProjectSlider project={projet} />

            <h2>{projet.period}</h2>

            <h5>{projet.location}</h5>

            <div dangerouslySetInnerHTML={{__html: projet.contenu || ''}}/>

            <div style={{display: 'flex', justifyContent: 'center', gap: '1rem', alignSelf: 'center'}}>
            {fichiersList.map((f, key) => f?.src
                ? <Link key={key} className="download" href={f.src} target="_blank">
                    <img src="/img/download.svg" className="picto" alt="Télécharger"/>
                </Link>
                : '')}
            </div>
            <nav className="pager">
                {previousProject
                    ? <Link href={ACMS.getLink(type, previousProject)}>
                        <img src="/img/left.svg" className="picto" alt="Précédent"/>
                    </Link>
                    : ''
                }
                {nextProject
                    ? <Link href={ACMS.getLink(type, nextProject)}>
                        <img src="/img/right.svg" className="picto" alt="Suivant"/>
                    </Link>
                    : ''
                }
            </nav>

        </article>

    </main>;
}
