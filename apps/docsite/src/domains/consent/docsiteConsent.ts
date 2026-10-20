import { CookieConsentCategory } from '@almacareer/cookie-consent-manager';

const ENGLISH = 'en';

const VISIBLE_CATEGORIES = new Set<string>([CookieConsentCategory.NECESSARY, CookieConsentCategory.ANALYTICS]);

// One line, so the soft banner can stay on screen without covering the page.
const COMPACT_ENGLISH_CONSENT_DESCRIPTION =
  'Necessary cookies keep the site working. "Accept all" also allows analytics cookies. <a href="" data-cc="show-preferencesModal">Cookie settings</a>';

type ConsentSection = {
  description?: string;
  linkedCategory?: string;
  title?: string;
};

type ConsentTranslation = {
  consentModal?: {
    description?: string;
    [key: string]: unknown;
  };
  preferencesModal?: {
    sections?: ConsentSection[];
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

type ConsentCategoryConfig = {
  autoClear?: {
    cookies: { name: RegExp | string }[];
  };
  enabled?: boolean;
  readOnly?: boolean;
};

const DOCSITE_CONSENT_CATEGORIES: Record<string, ConsentCategoryConfig> = {
  [CookieConsentCategory.NECESSARY]: {
    enabled: true,
    readOnly: true,
  },
  [CookieConsentCategory.ANALYTICS]: {
    autoClear: {
      cookies: [{ name: /^_ga/ }],
    },
  },
};

const isVisibleSection = (section: ConsentSection) =>
  section.linkedCategory == null || VISIBLE_CATEGORIES.has(section.linkedCategory);

const trimTranslation = (language: string, translation: ConsentTranslation) => {
  if (language === ENGLISH) {
    translation.consentModal = {
      ...translation.consentModal,
      description: COMPACT_ENGLISH_CONSENT_DESCRIPTION,
    };
  }

  if (translation.preferencesModal?.sections) {
    translation.preferencesModal.sections = translation.preferencesModal.sections.filter(isVisibleSection);
  }
};

// The consent manager deep-merges `config.categories`, so a plain object cannot
// remove advertising, functionality, or personalization. This getter is copied
// through that merge and replaces the map with technical and analytics only.
export const createDocsiteConsentConfig = () => {
  const config = {
    guiOptions: {
      consentModal: {
        layout: 'bar inline' as const,
      },
    },
  };

  Object.defineProperty(config, 'categories', {
    configurable: true,
    enumerable: true,
    get: () => DOCSITE_CONSENT_CATEGORIES,
  });

  return config;
};

const isConsentTranslation = (value: unknown): value is ConsentTranslation =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

// Drops every category except technical and analytics, including translations
// the manager rebuilds when the preferences modal opens.
export const limitConsentToTechnicalAndAnalytics = (translations: object) => {
  const record = translations as Record<string, unknown>;

  for (const language of Object.keys(record)) {
    const initial = record[language];

    if (isConsentTranslation(initial)) {
      let current = initial;

      trimTranslation(language, current);

      Object.defineProperty(record, language, {
        configurable: true,
        enumerable: true,
        get: () => current,
        set: (value: unknown) => {
          if (!isConsentTranslation(value)) {
            return;
          }

          trimTranslation(language, value);
          current = value;
        },
      });
    }
  }
};
