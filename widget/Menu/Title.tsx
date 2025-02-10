import { memo } from 'react';
import Label, { LabelProps } from '@/widget/Menu/Title/Label';

export type TitleProps = {} & LabelProps;

function Title(props: TitleProps) {
  const {} = props;
  return (
    <div
      className={
        'flex text-[inherit] h-11 rounded hover:bg-white items-center px-1'
      }
    >
      <div className={'flex gap-3 items-center flex-auto'}>完成就喊话</div>
      <Label />
    </div>
  );
}

export default memo(Title);
