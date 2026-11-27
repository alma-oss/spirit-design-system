export const SITE_TITLE = 'Spirit Design System';

export const SITE_DESCRIPTION = 'Documentation for the Spirit Design System';

/**
 * Identity stored with a new consent record.
 * The consent cookie name stays `almacareer_ccm`, so changing this does not
 * ask visitors who already consented again.
 */
export const SITE_SERVICE_NAME = process.env.NEXT_PUBLIC_SITE_SERVICE_NAME?.trim() || 'spirit.design';
