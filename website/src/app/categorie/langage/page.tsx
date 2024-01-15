import Link from 'next/link';

export default function Action() {
    return (<main className="theme">

        <article className="container">

            <h1>Langage</h1>

            <p>
                Ou ce que dit une page, ou plusieurs, au crayon ou aux claviers, et puis aimer la liberté de celles qui
                sont volantes, le rythme des condensés, le plaisir des plages et des renversements.
            </p>

            <p>Gratter frapper taper silence & papier. Doigts ongles mains encre et rubans encreurs cartouches et
                touches bois plastique feuille. Accords désordres mouvements, quantités de non-sens, de mots doux, de
                sentences. Donc regarder devant, baisser le nez, aligner des lettres.
            </p>

            <p>Chaque titre correspond à des textes plus ou moins longs, ce qui paraît évident. Certains ont été
            grattés au crayon sur carnet ou feuille simple, d’autres ont été frappés à la machine à écrire, d’autres
            encore directement tapés sur un clavier d’ordinateur. Il n’y a ni brouillon ni demi-tour, et jamais de plan
            d’ensemble. Les textes à la machine, uniques et sensiblement graphiques, sont ici disponibles en impressions
            multiples. Et parfois aussi l’inverse s’est produit, de l’écran au papier glissé sous les marteaux.
            </p>

            <p>Après ça raconte ce que ça raconte.</p>

            <Link href="/portfolio/projet1">
                <img src="/img/read.svg" className="picto" alt="Lire"/>
            </Link>

        </article>

    </main>)
}
