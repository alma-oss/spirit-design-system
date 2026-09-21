import React, { type ReactNode } from 'react';
import { I18nProvider } from '../../../src/context';

const cvExampleTranslations = {
  breadcrumbs: {
    ariaLabel: 'Drobečková navigace',
    back: 'Zpět',
  },
};

const CvExampleI18n = ({ children }: { children: ReactNode }) => (
  <I18nProvider translations={cvExampleTranslations}>{children}</I18nProvider>
);

export default CvExampleI18n;
