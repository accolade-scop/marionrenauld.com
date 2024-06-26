'use client';
import { ACMSConfig } from '@/utils/tool';
import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay'
import { EmblaCarouselType } from 'embla-carousel'

type ProjectType = ACMSConfig<'action'> | ACMSConfig<'objet'>;

export default function ProjectSlider(params: { project: ProjectType }) {
    const {project} = params;
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay({stopOnInteraction: false})]);

    const { selectedIndex, selectImage } = useImageSelection(emblaApi);

    // pas de projet ou pas d'images
    if (!project?.images?.length) {
        return '';
    }

    // @ts-ignore
    const imagesList: any[] = project.images;

    return (
        <div className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {imagesList.map((image, key) =>
                        <div key={key} className="embla__slide">
                            <img src={image.element.fields.src.stringValue} alt={image.element.fields.title.stringValue}/>
                        </div>
                    )}
                </div>
            </div>

            <div className="embla__dots">
                {imagesList.map((_, index) => (
                    <ImageSelection
                        onClick={() => selectImage(index)}
                        key={index}
                        className={'embla__dot'.concat(
                            index === selectedIndex ? ' embla__dot--selected' : ''
                        )}
                    />
                ))}
            </div>
        </div>

    );
}

type UseImageSelectionType = {
    selectedIndex: number
    scrollSnaps: number[]
    selectImage: (index: number) => void
}

export const useImageSelection = (
    emblaApi: EmblaCarouselType | undefined
): UseImageSelectionType => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

    const selectImage = useCallback(
        (index: number) => {
            if (!emblaApi) return
            emblaApi.scrollTo(index)
        },
        [emblaApi]
    )

    const onInit = useCallback((emblaApi: EmblaCarouselType) => {
        setScrollSnaps(emblaApi.scrollSnapList())
    }, [])

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [])

    useEffect(() => {
        if (!emblaApi) return

        onInit(emblaApi)
        onSelect(emblaApi)
        emblaApi.on('reInit', onInit)
        emblaApi.on('reInit', onSelect)
        emblaApi.on('select', onSelect)
    }, [emblaApi, onInit, onSelect])

    return {
        selectedIndex,
        scrollSnaps,
        selectImage
    }
}

type PropType = PropsWithChildren<
    React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >
>

export const ImageSelection: React.FC<PropType> = (props) => {
    const { children, ...restProps } = props

    return (
        <button type="button" {...restProps}>
            {children}
        </button>
    )
}
