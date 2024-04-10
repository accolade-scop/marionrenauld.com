import Link from 'next/link'

export default function MentionsLegales() {
    return (<main className="mentions">

        <article className="container">

            <section className="" style={{width: '100%'}}>

                <h1 className="">Mentions légales</h1>

                <h2>Propriétaire du site</h2>
                <p>
                    Marion Renauld<br/>
                    marion.renauld1@gmail.com<br/>
                    SIRET : 810 399 568 00015<br/>
                </p>

                <h2>Conception du site</h2>
                <p>
                    ACCOLADE<br/>
                    contact@accolade.coop<br/>
                    SIRET : 922 155 833 00010<br/>
                    Site internet : accolade.coop<br/>
                </p>

                <h2>Responsable de publication</h2>
                <p>Marion Renauld<br/>
                    marion.renauld1@gmail.com<br/>
                </p>

                <p><em>Les informations de ce site peuvent contenir des inexactitudes techniques ou des erreurs
                    typographiques. Ces informations peuvent être périodiquement modifiées. Nous sommes susceptibles
                    d’apporter des améliorations ou des changements à ce site et ce sans préavis. Pour toute remarque
                    sur le contenu et le fonctionnement du site, s’adresser au Webmaster : marion.renauld1@gmail.com
                </em></p>

                <h2>Hébergement du site</h2>
                <p>
                    FIREBASE<br/>
                    188 King ST, San Francisco, CA 94107, United States<br/>
                    <Link href="https://firebase.google.com/" target="_blank" style={{display: 'inline-block'}}>https://firebase.google.com</Link><br/>
                </p>

                <h2>Droits d auteur - Copyright</h2>
                <p>Les informations, photographies, images, textes et autres documents présents sur le site Internet
                    sont protégés par le droit de la propriété intellectuelle.</p>

                <h2>Informatique et liberté – Protection des données personnelles.</h2>

                <p>Les informations collectées par le biais du présent site sont exclusivement destinées à notre propre
                    utilisation. Conformément aux dispositions contenues dans la loi n° 78-17 du 6 Janvier 1978 modifiée
                    relative à l’informatique, aux fichiers et aux libertés, vous disposez d’un droit d’accès, de
                    rectification, de modification et de suppression concernant les données qui vous concernent.</p>

                <Link href="/" className=""> --- Revenir au sommaire --- </Link>

            </section>

        </article>

    </main>)
}

