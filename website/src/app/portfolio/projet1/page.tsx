import Link from 'next/link';

export default function Projet() {

    return (<main className="projet">

        <article className="container">

            <h1>Titre du projet</h1>

            <div className="slider"> SLIDER ici ... </div>

            <h2>Titre du descriptif</h2>

            <h5>Coulounieix-Chamiers (24) / Résidence Ça déménage</h5>

            <p>Nam eget lorem non enim ultricies fringilla. Duis venenatis quis nunc ac lobortis. Nullam nisi augue,
                posuere eu risus sit amet, tristique hendrerit nulla. In sed interdum ligula. Quisque bibendum, leo sed
                euismod tincidunt, est metus posuere nunc, sed consequat odio erat cursus erat. Duis nisl erat, faucibus
                at ullamcorper vel, finibus ut est. Cras placerat turpis mauris, vel hendrerit neque auctor at.</p>

            <Link className="download" href="/">
                <span className="material-icons">file_download</span>
            </Link>

            <nav className="pager">
                <Link href="/">
                    <span className="material-icons">arrow_circle_left</span>
                </Link>
                <Link href="/">
                    <span className="material-icons">arrow_circle_right</span>
                </Link>
            </nav>

        </article>

    </main>)
}
