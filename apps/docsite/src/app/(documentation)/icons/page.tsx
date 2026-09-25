import { Flex, Grid, Icon, Section, Text } from '@alma-oss/spirit-web-react';
import Cover from '@local/domains/content/ui/Cover';
import { fetchAllIcons } from '@local/domains/icons/repositories/iconsRepository';
import { routes } from '@local/domains/routing/routes';
import React from 'react';

const IconsPage = () => {
  const icons = fetchAllIcons();

  return (
    <>
      <Cover title="Icons" crumbs={[{ name: 'Icons', href: routes.icons }]} />
      <Section size="xlarge">
        <Grid elementType="ul" cols={{ mobile: 2, tablet: 4, desktop: 6 }} spacingY="space-1200" alignmentX="center">
          {icons.map((icon) => (
            <Flex key={icon} elementType="li" alignmentX="center" direction="vertical">
              <Icon name={icon} />
              <Text fontWeight="semibold" textAlignment="center">
                {icon}
              </Text>
            </Flex>
          ))}
        </Grid>
      </Section>
    </>
  );
};

export default IconsPage;
