'use client';

import { useEffect } from 'react';
import { useTheme } from '@/atoms';

function Button() {
  useEffect(() => {}, []);
  const { theme } = useTheme();
  console.log(theme);

  return (
    <div>
      <button>ok</button>
    </div>
  );
}

export default Button;
