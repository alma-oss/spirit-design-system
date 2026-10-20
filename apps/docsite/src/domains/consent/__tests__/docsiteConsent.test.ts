import { createDocsiteConsentConfig, limitConsentToTechnicalAndAnalytics } from '../docsiteConsent';

describe('createDocsiteConsentConfig', () => {
  it('should offer only technical and analytics cookies in a compact bar', () => {
    const config = createDocsiteConsentConfig() as {
      categories: Record<string, unknown>;
      guiOptions: { consentModal: { layout: string } };
    };

    expect(Object.keys(config.categories)).toEqual(['necessary', 'analytics']);
    expect(config.guiOptions.consentModal.layout).toBe('bar inline');
  });
});

describe('limitConsentToTechnicalAndAnalytics', () => {
  const translation = () => ({
    consentModal: { description: 'Cookies for personalisation, analytics and targeted marketing.' },
    preferencesModal: {
      sections: [
        { description: 'Intro' },
        { linkedCategory: 'necessary', title: 'Technically necessary cookies' },
        { linkedCategory: 'ad', title: 'Marketing cookies' },
        { linkedCategory: 'analytics', title: 'Analytical cookies' },
        { linkedCategory: 'functionality', title: 'Functional cookies' },
        { linkedCategory: 'personalization', title: 'Personalisation cookies' },
      ],
    },
  });

  it('should keep technical and analytics sections and shorten the English banner', () => {
    const translations = { en: translation(), cs: translation() };

    limitConsentToTechnicalAndAnalytics(translations);

    expect(translations.en.preferencesModal.sections.map((section) => section.linkedCategory)).toEqual([
      undefined,
      'necessary',
      'analytics',
    ]);
    expect(translations.en.consentModal.description).toContain('analytics cookies');
    expect(translations.en.consentModal.description).not.toContain('targeted marketing');
    expect(translations.cs.preferencesModal.sections.map((section) => section.linkedCategory)).toEqual([
      undefined,
      'necessary',
      'analytics',
    ]);
    expect(translations.cs.consentModal.description).toContain('targeted marketing');
  });

  it('should keep the limit when the manager replaces a translation', () => {
    const translations = { en: translation() };

    limitConsentToTechnicalAndAnalytics(translations);
    translations.en = translation();

    expect(translations.en.preferencesModal.sections.map((section) => section.linkedCategory)).toEqual([
      undefined,
      'necessary',
      'analytics',
    ]);
    expect(translations.en.consentModal.description).not.toContain('targeted marketing');
  });
});
