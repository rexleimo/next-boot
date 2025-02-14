import { memo, ReactNode, ReactElement, useContext } from 'react';
import Label, { LabelProps } from '@/widget/Menu/Title/Label';
import { MenuContext } from '@/widget/Menu/context';

export type TitleProps = {
  label: string | ReactNode | ReactElement;
  icon?: ReactNode | ReactElement;
} & LabelProps;

function Title(props: TitleProps) {
  const { label, icon } = props;
  const { isExpanded } = useContext(MenuContext);
  return (
    <div
      className={
        'flex text-[inherit] h-11 rounded hover:bg-white items-center px-1'
      }
    >
      <div className={'flex gap-3 items-center flex-auto'}>
        <div className={'flex items-center justify-center'}>{icon}</div>
        {isExpanded && <div className={'flex-auto'}>{label}</div>}
      </div>
      {isExpanded && <Label />}
    </div>
  );
}

export default memo(Title);
