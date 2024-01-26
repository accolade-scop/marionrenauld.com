import Projet from '@/components/projet/Projet';
import { ACMS } from '@/utils/tool';

const type = 'action';

export default async function DetailAction({params}: any) {
    const slug = params.slug;

    const projet = await ACMS.getBySlug(type, slug);
    if (!projet) {
        return <>not found {slug}</>;
    }

    return <Projet projet={projet} type={type}/>;
}

export async function generateStaticParams() {
    const list = await ACMS.getList(type);

    return list.map((e) => ({
        slug: ACMS.getSlug(e),
    }));
}
