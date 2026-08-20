import React, { useContext } from 'react';
import { Container, Grid, Icon, Text } from '../../components';
import IconsContext, { type IconsContextType } from '../../context/IconsContext';

const Icons = () => {
  let icons;
  const iconsContext: IconsContextType = useContext(IconsContext);

  if (iconsContext !== null && iconsContext !== undefined) {
    icons = Object.keys(iconsContext);
  }

  return (
    <Container>
      <Grid
        elementType="ul"
        cols={{ mobile: 2, tablet: 4, desktop: 6 }}
        marginY="space-1300"
        UNSAFE_className="text-center"
      >
        {icons?.map((icon) => (
          <li key={icon} className="mb-700">
            <Icon name={icon} />
            <Text marginTop="space-600" fontWeight="bold">
              {icon}
            </Text>
          </li>
        ))}
      </Grid>
    </Container>
  );
};

export default Icons;
