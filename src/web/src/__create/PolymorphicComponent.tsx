import React from 'react';

type PolymorphicComponentProps<T extends React.ElementType> = {
  as?: T;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;

const PolymorphicComponent = <T extends React.ElementType = 'div'>({
  as,
  children,
  ...props
}: PolymorphicComponentProps<T>) => {
  const Component = as || 'div';
  return <Component {...props}>{children}</Component>;
};

export default PolymorphicComponent;