import { memo, useMemo } from 'react';
import { CustomImage } from '@/components/CustomImage';
import clsx from 'clsx';
import { ImageCardProps } from '@/components/ImageCard/types';

function isRemoteAddress(addressString: string) {
  return (
    addressString.startsWith('http://') || addressString.startsWith('https://')
  );
}

type SrcProps = {
  src: string;
  remote?: string;
};

function ImageCard(props: ImageCardProps) {
  const { width = 1080, height = 1920, src, name } = props;

  const srcProps = useMemo((): SrcProps => {
    if (src) {
      // 是否远程地址
      if (isRemoteAddress(src)) {
        const url = new URL(src);
        console.log({
          remote: url.origin,
          src: url.pathname,
        });
        return {
          remote: url.origin,
          src: url.pathname,
        };
      } else {
        return {
          remote: undefined,
          src,
        };
      }
    } else {
      return {
        remote: undefined,
        src: '',
      };
    }
  }, [src]);

  return (
    <div className={'w-full'}>
      <div className={'relative mb-2 w-full'}>
        <CustomImage
          width={width}
          height={height}
          {...srcProps}
          className={'rounded-2xl'}
          alt={''}
        />
        <div
          className={clsx(
            'absolute right-0 bottom-4 rounded-l-2xl',
            'bg-blue-700 text-white',
            'px-10 py-1'
          )}
        >
          8张
        </div>
      </div>
      {/*Info*/}
      <div className={'text-sm text-ellipsis text-nowrap overflow-hidden'}>
        {name}
      </div>
    </div>
  );
}

export default memo(ImageCard);
