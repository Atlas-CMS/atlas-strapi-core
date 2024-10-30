import React from 'react';

import { Status } from '@atlas/design-system';
import { Typography } from '@atlas/design-system';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { getTrad } from '../../../../utils';

export function PublicationState({ isPublished }) {
  const { formatMessage } = useIntl();
  const variant = isPublished ? 'success' : 'secondary';

  return (
    <Status showBullet={false} variant={variant} size="S" width="min-content">
      <Typography fontWeight="bold" textColor={`${variant}700`}>
        {formatMessage({
          id: getTrad(`containers.List.${isPublished ? 'published' : 'draft'}`),
          defaultMessage: isPublished ? 'Published' : 'Draft',
        })}
      </Typography>
    </Status>
  );
}

PublicationState.propTypes = {
  isPublished: PropTypes.bool.isRequired,
};
