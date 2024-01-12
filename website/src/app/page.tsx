import Link from 'next/link';
import {actionsList, objetsList, langagesList} from '@/data';

export default function Home() {
    return (
        <main className="sommaire">
            <article className="container">
                <nav>
                    <h1>Action</h1>
                    {actionsList.map((a, index)=> <Link href={'/portfolio/' + a.slug} key={index}>{a.title}</Link>)}
                </nav>
                <nav>
                    <h1>Langage</h1>
                    {langagesList.map((a, index)=> <Link href={a.slug} key={index}>{a.title}</Link>)}
                </nav>
                <nav>
                    <h1>Objet</h1>
                    {objetsList.map((a, index)=> <Link href={'/portfolio/' + a.slug} key={index}>{a.title}</Link>)}
                </nav>

            </article>

        </main>
    )
}
