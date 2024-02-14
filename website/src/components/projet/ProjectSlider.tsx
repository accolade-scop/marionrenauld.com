'use client';
import { ACMSConfig } from '@/utils/tool';
import '@splidejs/react-splide/css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Options } from '@splidejs/splide';

type ProjectType = ACMSConfig<'action'> | ACMSConfig<'objet'>;

export default function ProjectSlider(params: { project: ProjectType }) {
    const {project} = params;

    // pas de projet ou pas d'images
    if (!project || !project.image?.length) {
        return '';
    }

    const options: Options = {
        width: '100%',
        arrows: false,
        gap: 10,
        keyboard: 'global',
        autoplay: true,
        drag: true,
        type: 'loop',
        perPage: 2,
        breakpoints: {
            1000: {
                perPage: 1
            }
        }
    };


    return (
        <Splide aria-label="Images" options={options} onVisible={(ref) => console.log('plop', ref.refresh())}>
            {project.image.map((image, key) =>
                <SplideSlide key={key} style={{textAlign: 'center'}}>
                    <img src={image.src} alt={image.title}/>
                </SplideSlide>
            )}
        </Splide>
    );
}
