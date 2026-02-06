'use client';

import React from 'react';
import { Sizes } from '../../constants';
import { useI18n } from '../../hooks';
import { type SpiritTextFieldBasePasswordToggleProps } from '../../types';
import { Icon } from '../Icon';
import { useTextFieldBasePasswordToggleStyleProps } from './useTextFieldBasePasswordToggleStyleProps';

const TextFieldBasePasswordToggle = (props: SpiritTextFieldBasePasswordToggleProps): JSX.Element => {
  const { t } = useI18n();
  const { children, isPasswordShown, onToggleClick, isDisabled, size } = props;
  const { classProps } = useTextFieldBasePasswordToggleStyleProps();
  const ariaLabel = isPasswordShown ? t('textField.password.hide') : t('textField.password.show');

  return (
    <div className={classProps.passwordToggle}>
      {children}
      <button
        className={classProps.passwordToggleButton}
        type="button"
        role="switch"
        aria-checked={!!isPasswordShown}
        aria-label={ariaLabel}
        onClick={() => onToggleClick()}
        disabled={isDisabled}
      >
        <span className={classProps.passwordToggleIcon}>
          <Icon name={`visibility-${isPasswordShown ? 'off' : 'on'}`} boxSize={size === Sizes.SMALL ? 16 : 20} />
        </span>
      </button>
    </div>
  );
};

TextFieldBasePasswordToggle.spiritComponent = 'TextFieldBasePasswordToggle';

export default TextFieldBasePasswordToggle;
