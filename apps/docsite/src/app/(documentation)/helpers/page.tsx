import { Grid, Section } from '@alma-oss/spirit-web-react';
import Cover from '@local/domains/content/ui/Cover';
import { type HelperItem, fetchAllHelpers } from '@local/domains/helpers/repositories/helpersRepository';
import HelperCard from '@local/domains/helpers/ui/HelperCard';
import { routes } from '@local/domains/routing/routes';
import React from 'react';

const { error: logError } = console;

const HelpersPage = () => {
  let helpers: HelperItem[];

  try {
    helpers = fetchAllHelpers();
  } catch (error) {
    logError('[HelpersPage] Failed to load helpers:', error);
    throw error;
  }

  return (
    <>
      <Cover title="Helpers" crumbs={[{ name: 'Helpers', href: routes.helpers }]} />
      <Section size="xlarge">
        <Grid elementType="ul" cols={{ mobile: 1, tablet: 2, desktop: 3 }}>
          {helpers.map((helper) => (
            <HelperCard key={helper.name} helper={helper.name} title={helper.title} />
          ))}
        </Grid>
      </Section>
    </>
  );
};

export default HelpersPage;
