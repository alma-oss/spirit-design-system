import React from 'react';
import { ControlButton } from '../../ControlButton';
import { HelperText } from '../../HelperText';
import { Icon } from '../../Icon';
import { Link } from '../../Link';
import { Stack, StackItem } from '../../Stack';
import { Text } from '../../Text';
import Item from '../Item';

const ItemSearchSuggestions = () => (
  <>
    <div>
      <h3>Last Searches</h3>
      <Stack elementType="ul" aria-label="Last searches" spacing="space-300">
        <Item
          alignmentY="top"
          startSlot={<Icon name="search" />}
          endSlot={
            <ControlButton isSymmetrical size="small" aria-label="Remove Malíř pokojů">
              <Icon name="close" />
            </ControlButton>
          }
          isSelected
        >
          <Stack elementType="span" spacing="space-300">
            <Link href="#malir-pokoj" color="inherit" underlined="never" isStretched>
              Malíř pokojů
            </Link>
            <HelperText helperText="Plný úvazek" />
            <Text elementType="span" size="small" textColor="emotion-success-basic">
              4 nové nabídky
            </Text>
          </Stack>
        </Item>
        <Item
          alignmentY="top"
          startSlot={<Icon name="search" />}
          endSlot={
            <ControlButton isSymmetrical size="small" aria-label="Remove Malíř pokojů">
              <Icon name="close" />
            </ControlButton>
          }
        >
          <Stack elementType="span" spacing="space-300">
            <Link href="#umelecky-malir" color="inherit" underlined="never" isStretched>
              Umělecký malíř
            </Link>
            <HelperText helperText="Poloviční úvazek" />
          </Stack>
        </Item>
        <Item
          alignmentY="top"
          startSlot={<Icon name="search" />}
          endSlot={
            <ControlButton isSymmetrical size="small" aria-label="Remove Skladník">
              <Icon name="close" />
            </ControlButton>
          }
          isDisabled
        >
          <Stack elementType="span" spacing="space-300">
            <Link href="#skladnik" color="inherit" underlined="never" isStretched>
              Skladník
            </Link>
            <HelperText helperText="Nábor ukončen" />
          </Stack>
        </Item>
      </Stack>
    </div>

    <div>
      <h3>Last Searches with Grid Accessible Markup</h3>
      <Stack aria-label="Last searches" spacing="space-300" role="grid">
        <Item
          alignmentY="top"
          startSlot={<Icon name="search" />}
          endSlot={
            <span role="gridcell">
              <ControlButton isSymmetrical size="small" aria-label="Remove Malíř pokojů">
                <Icon name="close" />
              </ControlButton>
            </span>
          }
          isSelected
          role="row"
        >
          <Stack elementType="span" spacing="space-300" role="gridcell">
            <Link href="#malir-pokoj" color="inherit" underlined="never" isStretched>
              Malíř pokojů
            </Link>
            <HelperText helperText="Plný úvazek" />
            <Text elementType="span" size="small" textColor="emotion-success-basic">
              4 nové nabídky
            </Text>
          </Stack>
        </Item>
        <Item
          alignmentY="top"
          startSlot={<Icon name="search" />}
          endSlot={
            <span role="gridcell">
              <ControlButton isSymmetrical size="small" aria-label="Remove Malíř pokojů">
                <Icon name="close" />
              </ControlButton>
            </span>
          }
          role="row"
        >
          <Stack elementType="span" spacing="space-300" role="gridcell">
            <Link href="#umelecky-malir" color="inherit" underlined="never" isStretched>
              Umělecký malíř
            </Link>
            <HelperText helperText="Poloviční úvazek" />
          </Stack>
        </Item>
      </Stack>
    </div>

    <div>
      <h3>Search Results</h3>

      <Stack elementType="ul" aria-label="Search results" spacing="space-300" role="listbox">
        <StackItem role="presentation">
          <Item startSlot={<Icon name="placeholder" />} onClick={() => console.log('Admin')} role="option">
            <Text elementType="span">&quot;Admin&quot; hledat klíčové slovo</Text>
          </Item>
        </StackItem>

        <StackItem role="presentation">
          <Item
            startSlot={<Icon name="folder-dualtone" />}
            role="option"
            onClick={() => console.log('Admininstrativa')}
          >
            <Text elementType="span">
              Admin<strong>istrativa</strong>
            </Text>
          </Item>
        </StackItem>

        <StackItem role="presentation">
          <Item
            startSlot={<Icon name="shield-dualtone" />}
            role="option"
            onClick={() => console.log('Admininstrátorka')}
          >
            <Text elementType="span">
              Admin<strong>instrátorka</strong>
            </Text>
          </Item>
        </StackItem>
      </Stack>
    </div>

    <div>
      <h3>Location Results</h3>

      <Stack elementType="ul" aria-label="Location results" spacing="space-300" role="listbox">
        <StackItem role="presentation">
          <Item role="option" onClick={() => console.log('Kobylisy, Praha')} isSelected aria-selected="true">
            <Text elementType="span">Kobylisy, Praha</Text>
          </Item>
        </StackItem>
        <StackItem role="presentation">
          <Item role="option" onClick={() => console.log('Malešice, Praha')}>
            <Text elementType="span">Malešice, Praha</Text>
          </Item>
        </StackItem>
      </Stack>
    </div>
  </>
);

export default ItemSearchSuggestions;
