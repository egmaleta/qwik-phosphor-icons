import { QwikDOMAttributes } from '@builder.io/qwik';

export interface IconProps extends QwikDOMAttributes {
  size?: number | string;
  color?: string;
  mirrored?: boolean;
  title?: string;
}
