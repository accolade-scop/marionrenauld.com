import { ACMS, ACMSConfig } from '@/utils/tool';
import Link from 'next/link';

export default async function Home() {

    const projetsList = await ACMS.getList('projet');
    const actionsList = projetsList.filter(p => p.type === 'action')
    const langagesList = projetsList.filter(p => p.type === 'langage')
    const objetsList = projetsList.filter(p => p.type === 'objet')

    const link = (p: ACMSConfig<'projet'>) => ACMS.getLink('projet', p);

    return (
        <main className="sommaire">
            <article className="container">
                <nav>
                    <h1>Action</h1>
                    {actionsList.map((a, index)=> <Link href={link(a)} key={index}>{a.name}</Link>)}
                </nav>
                <nav>
                    <h1>Langage</h1>
                    {langagesList.map((a, index)=> <Link href={ACMS.getSlug(a)} key={index}>{a.name}</Link>)}
                </nav>
                <nav>
                    <h1>Objet</h1>
                    {objetsList.map((a, index)=> <Link href={link(a)} key={index}>{a.name}</Link>)}
                </nav>

            </article>

        </main>
    )
}
