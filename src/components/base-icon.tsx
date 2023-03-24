import { component$, Slot } from '@builder.io/qwik';
import defaultProps from '../lib/default-props';
import { IconProps } from '../lib/types';

export default component$((props: IconProps) => {
  const { color, size, mirrored, title, ...rest } = {
    ...defaultProps,
    ...props,
  };

  return (
    <svg
      {...rest}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 256 256'
      fill={color}
      height={size}
      width={size}
      transform={mirrored ? 'scale(-1, 1)' : undefined}
    >
      {title.length > 0 && <title>{title}</title>}
      <Slot />
    </svg>
  );
});
