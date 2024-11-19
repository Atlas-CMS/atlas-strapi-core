import { createSelector } from 'reselect';

import { createAttributesLayout, getCustomFieldUidsFromLayout } from './utils';

const selectCurrentLayout = createSelector(
  (state) => {
    console.log('selectCurrentLayout', state);
    return state['content-manager_editViewLayoutManager'].currentLayout;
  },
  (currentLayout) => currentLayout
);

const selectAttributesLayout = createSelector(selectCurrentLayout, (layout) => {
  console.log('selectAttributesLayout', layout);
  return createAttributesLayout(layout?.contentType ?? {});
});

const selectCustomFieldUids = createSelector(selectCurrentLayout, (layout) => {
  console.log('selectCustomFieldUids', layout);
  return getCustomFieldUidsFromLayout(layout);
});

export { selectAttributesLayout, selectCurrentLayout, selectCustomFieldUids };
