export type PolymorphEscapeHatch<T> = T & {
  polymorph?: ('mantine' | 'styled') & {};
};
