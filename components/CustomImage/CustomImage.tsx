'use client';
import Image, { ImageProps } from 'next/image';
import { useCallback } from 'react';

interface CustomImageProps extends ImageProps {
  remote?: string;
}

function CustomImage(props: CustomImageProps) {
  const { alt, src, remote, ...restProps } = props;

  const imageLoader = useCallback(
    ({
      src,
      width,
      quality,
    }: {
      src: string;
      width: number;
      quality?: number;
    }) => {
      if (!remote) {
        return `/_next/image?url=${src}&w=${width}&q=${quality || 75}`;
      }
      return `${remote}/${src}?w=${width}&q=${quality || 75}`;
    },
    [remote]
  );

  return (
    <Image
      loader={imageLoader}
      src={`${src}`}
      alt={alt}
      loading={'lazy'}
      fetchPriority={'low'}
      placeholder={'blur'}
      blurDataURL={
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg=='
      }
      {...restProps}
    />
  );
}

export default CustomImage;
