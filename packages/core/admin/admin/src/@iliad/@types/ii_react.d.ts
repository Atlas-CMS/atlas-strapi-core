type ComponentBaseProps = Partial<{
  style: React.CSSProperties;
  children: React.ReactNode;
  ref: React.Ref<any>;
  className: string;
  // id: string;
}>;

type ChildlessComponentBaseProps = Omit<ComponentBaseProps, 'children'>;
