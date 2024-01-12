import Link from 'next/link';

export default function Action() {
    return (<main className="theme">

        <article className="container">

            <h1>Action</h1>

            <p>Ou ce qui sort de la page, va faire un tour dehors</p>

            <p>Pour un seul : à une seule personne s’adresser, s’arrêter sur un seul humain, forcément voir l’univers
                entier dans une goutte d’eau.</p>

            <p>Pour quelques-uns : savoir que le contexte est partiel et partial, être technique et ne pas croire aux
                frontières pour autant.</p>

            <p>Pour tous : décrire ce qui est, chercher ce qui se devine, inventer le reste.</p>

            <Link href="/portfolio/projet1">
            <span className="material-icons">expand_circle_down</span>
            </Link>

        </article>

    </main>)
}
