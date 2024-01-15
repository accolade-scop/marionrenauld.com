import Link from 'next/link'

export default function NotFound() {
    return (<main className="">

            <article className="container">

                <section className="" style={{width: '100%', textAlign: 'center'}}>

                    <h1 className="">Page non trouvée</h1>

                    <p>Impossible de trouver la page demandée !</p>

                    <Link href="/" className="">Revenir au sommaire</Link>
                </section>

            </article>

        </main>)
}
