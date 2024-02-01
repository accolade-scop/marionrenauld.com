import { ACMS, ACMSConfig } from '@/utils/tool';
import Link from 'next/link';

type ProjectType = ACMSConfig<'action'> | ACMSConfig<'objet'>;

export default async function Projet(params: {projet: ProjectType, type: 'action' | 'objet'}) {

    const projet: ProjectType = params.projet;
    const type = params.type;

    // on récupère la liste des projets ordonnés par date décroissante
    const projectsList = (await ACMS.getList(type)).sort((a, b) => (a.date || '') > (b.date || '') ? -1 : 1);
    const currentPosition = projectsList.findIndex(p => p.id === projet.id);
    const previousProject = currentPosition > 0 ? projectsList[currentPosition - 1] : null;
    const nextProject = currentPosition < projectsList.length ? projectsList[currentPosition + 1] : null;

    return <main className="projet">

        <article className="container">

            <h1>{projet.name}</h1>


            {/* issu de https://spider149.github.io/own-carousel/#installation */}
            {/*<div className="own-carousel__container">*/}
            {/*    <div className="own-carousel__outer">*/}
            {/*        <div className="own-carousel">*/}
            {/*            <div className="own-carousel__item">Your content</div>*/}
            {/*            <div className="own-carousel__item">Your content</div>*/}
            {/*            <div className="own-carousel__item">Your content</div>*/}
            {/*            <div className="own-carousel__item">Your content</div>*/}
            {/*            <div className="own-carousel__item">Your content</div>*/}
            {/*            <div className="own-carousel__item">Your content</div>*/}
            {/*            <div className="own-carousel__item">Your content</div>*/}
            {/*            <div className="own-carousel__item">Your content</div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className="own-carousel__control">*/}
            {/*        <button className="control__prev">«</button>*/}
            {/*        <button className="control__next">»</button>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className="slider" style={{height: '375px'}}>
                {projet.image?.map((image, key) =>
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
