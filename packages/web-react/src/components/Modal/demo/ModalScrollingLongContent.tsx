import React, { type ChangeEvent, createRef, useState } from 'react';
import {
  Button,
  Checkbox,
  Grid,
  GridItem,
  Label,
  Modal,
  ModalBody,
  ModalDialog,
  ModalFooter,
  ModalHeader,
  ScrollView,
  Stack,
} from '../..';
import { type BreakpointToken, type SpaceToken } from '../../../types';

const breakpointControls = {
  mobile: { marginBottom: { mobile: 'space-800' }, className: 'border-0' },
  tablet: { marginBottom: { tablet: 'space-800' }, className: 'd-none d-tablet-grid border-0' },
  desktop: { marginBottom: {}, className: 'd-none d-desktop-grid border-0' },
};

const setVerticalDimensionValueForProp = (
  prevState: { height: Record<BreakpointToken, number>; maxHeight: Record<BreakpointToken, number> },
  breakpoint: BreakpointToken,
  event: ChangeEvent<HTMLInputElement>,
  propName: 'height' | 'maxHeight',
) => ({
  ...prevState,
  [propName]: {
    ...prevState[propName],
    [breakpoint]: Number(event.target.value),
  },
});

const ModalScrollingLongContent = () => {
  const [isModalLongContentOpen, setModalLongContentOpen] = useState(false);
  const [isModalScrollViewOpen, setModalScrollViewOpen] = useState(false);
  const [isModalScrollingInsideOpen, setModalScrollingInsideOpen] = useState(false);
  const [isModalCustomHeightOpen, setModalCustomHeightOpen] = useState(false);
  const modalCustomHeightRef = createRef<HTMLDivElement>();
  const [isCustomHeightEnabled, setIsCustomHeightEnabled] = useState<Record<BreakpointToken, boolean>>({
    mobile: true,
    tablet: true,
    desktop: true,
  });
  const [heightValue, setHeightValue] = useState<{
    height: Record<BreakpointToken, number>;
    maxHeight: Record<BreakpointToken, number>;
  }>({
    height: {
      mobile: 400,
      tablet: 500,
      desktop: 600,
    },
    maxHeight: {
      mobile: 600,
      tablet: 600,
      desktop: 600,
    },
  });

  const toggleModalLongContent = () => setModalLongContentOpen(!isModalLongContentOpen);
  const toggleModalScrollView = () => setModalScrollViewOpen(!isModalScrollViewOpen);
  const toggleModalScrollingInside = () => setModalScrollingInsideOpen(!isModalScrollingInsideOpen);
  const toggleModalCustomHeight = () => setModalCustomHeightOpen(!isModalCustomHeightOpen);
  const handleModalLongContentClose = () => setModalLongContentOpen(false);
  const handleModalScrollViewClose = () => setModalScrollViewOpen(false);
  const handleModalScrollingInsideClose = () => setModalScrollingInsideOpen(false);
  const handleModalCustomHeightClose = () => setModalCustomHeightOpen(false);

  const handleMaxHeightChange = (event: ChangeEvent<HTMLInputElement>, breakpoint: BreakpointToken) => {
    setHeightValue((prevState) => setVerticalDimensionValueForProp(prevState, breakpoint, event, 'maxHeight'));
  };

  const handleHeightChange = (event: ChangeEvent<HTMLInputElement>, breakpoint: BreakpointToken) => {
    setHeightValue((prevState) => setVerticalDimensionValueForProp(prevState, breakpoint, event, 'height'));
  };

  const generateHeightObject = (isMax = false) =>
    (['mobile', 'tablet', 'desktop'] as BreakpointToken[]).reduce(
      (acc, breakpoint) => ({
        ...acc,
        [breakpoint]: isCustomHeightEnabled[breakpoint]
          ? `${heightValue[isMax ? 'maxHeight' : 'height'][breakpoint]}px`
          : null,
      }),
      {} as Record<BreakpointToken, string | null>,
    );

  return (
    <>
      <Button onClick={toggleModalLongContent} data-test-id="modal-with-long-content">
        Open Modal with Long Content
      </Button>

      <Modal id="example-long-content" isOpen={isModalLongContentOpen} onClose={handleModalLongContentClose}>
        <ModalDialog>
          <ModalHeader>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam at excepturi laudantium magnam mollitia
            perferendis reprehenderit, voluptate. Cum delectus dicta
          </ModalHeader>
          <ModalBody>
            {[...Array(9)].map((_, index) => {
              const key = `paragraph-${index}`;

              return (
                <p key={key}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam at excepturi laudantium magnam
                  mollitia perferendis reprehenderit, voluptate. Cum delectus dicta ducimus eligendi excepturi natus
                  perferendis provident unde. Eveniet, iste, molestiae?
                </p>
              );
            })}
          </ModalBody>
          <ModalFooter>
            <Button data-spirit-dismiss="modal" onClick={handleModalLongContentClose}>
              Primary action
            </Button>
            <Button color="secondary" onClick={handleModalLongContentClose}>
              Secondary action
            </Button>
          </ModalFooter>
        </ModalDialog>
      </Modal>

      <Button onClick={toggleModalScrollingInside} data-test-id="modal-with-scrolling-inside">
        Open Modal with Scrolling Inside
      </Button>

      <Modal id="example-scrolling-modal" isOpen={isModalScrollingInsideOpen} onClose={handleModalScrollingInsideClose}>
        <ModalDialog isScrollable>
          <ModalHeader>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam at excepturi laudantium magnam mollitia
            perferendis reprehenderit, voluptate. Cum delectus dicta
          </ModalHeader>
          <ModalBody>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam at excepturi laudantium magnam mollitia
              perferendis reprehenderit, voluptate. Cum delectus dicta ducimus eligendi excepturi natus perferendis
              provident unde. Eveniet, iste, molestiae?
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam at excepturi laudantium magnam mollitia
              perferendis reprehenderit, voluptate. Cum delectus dicta ducimus eligendi excepturi natus perferendis
              provident unde. Eveniet, iste, molestiae?
            </p>
            <p style={{ marginBottom: '100vh' }}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam at excepturi laudantium magnam mollitia
              perferendis reprehenderit, voluptate. Cum delectus dicta ducimus eligendi excepturi natus perferendis
              provident unde. Eveniet, iste, molestiae?
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam at excepturi laudantium magnam mollitia
              perferendis reprehenderit, voluptate. Cum delectus dicta ducimus eligendi excepturi natus perferendis
              provident unde. Eveniet, iste, molestiae?
            </p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleModalScrollingInsideClose}>Primary action</Button>
            <Button color="secondary" onClick={handleModalScrollingInsideClose}>
              Secondary action
            </Button>
          </ModalFooter>
        </ModalDialog>
      </Modal>

      <Button onClick={toggleModalScrollView} data-test-id="modal-with-scrollview">
        Open Modal with ScrollView
      </Button>

      <Modal id="example-scroll-view" isOpen={isModalScrollViewOpen} onClose={handleModalScrollViewClose}>
        <ModalDialog isScrollable>
          <ModalHeader>Modal with ScrollView</ModalHeader>
          <ScrollView data-spirit-toggle="scrollView" overflowDecorators="borders">
            <ModalBody>
              {[...Array(8)].map((_, index) => {
                const key = `paragraph-${index}`;

                return (
                  <p key={key}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam at excepturi laudantium magnam
                    mollitia perferendis reprehenderit, voluptate. Cum delectus dicta ducimus eligendi excepturi natus
                    perferendis provident unde. Eveniet, iste, molestiae?
                  </p>
                );
              })}
            </ModalBody>
          </ScrollView>
          <ModalFooter>
            <Button onClick={handleModalScrollViewClose}>Primary action</Button>
            <Button color="secondary" onClick={handleModalScrollViewClose}>
              Secondary action
            </Button>
          </ModalFooter>
        </ModalDialog>
      </Modal>

      <Button onClick={toggleModalCustomHeight} data-test-id="modal-with-custom-height">
        Open Modal with Custom Height
      </Button>

      <Modal id="example-custom-height" isOpen={isModalCustomHeightOpen} onClose={handleModalCustomHeightClose}>
        <ModalDialog
          height={generateHeightObject()}
          isExpandedOnMobile={false}
          isScrollable
          maxHeight={generateHeightObject(true)}
          ref={modalCustomHeightRef}
        >
          <ModalHeader>Modal with Custom Height</ModalHeader>
          <ModalBody>
            <form>
              {(
                Object.entries(breakpointControls) as [
                  BreakpointToken,
                  {
                    marginBottom: Partial<Record<string, SpaceToken>>;
                    className: string;
                  },
                ][]
              ).map(([breakpoint, { marginBottom, className }]) => (
                <Stack
                  elementType="fieldset"
                  hasSpacing
                  key={breakpoint}
                  marginBottom={marginBottom as Partial<Record<string, SpaceToken>>}
                  UNSAFE_className={className}
                >
                  <legend hidden>{breakpoint.charAt(0).toUpperCase() + breakpoint.slice(1)}</legend>
                  <Checkbox
                    id={`custom-height-${breakpoint}-enabled`}
                    isChecked={isCustomHeightEnabled[breakpoint]}
                    label={breakpoint.charAt(0).toUpperCase() + breakpoint.slice(1)}
                    onChange={(event) =>
                      setIsCustomHeightEnabled((prevState) => ({
                        ...prevState,
                        [breakpoint]: (event.target as HTMLInputElement).checked,
                      }))
                    }
                  />
                  <Grid spacingX="space-600">
                    <Label
                      UNSAFE_className="GridItem"
                      htmlFor={`custom-height-${breakpoint}`}
                      UNSAFE_style={{
                        ['--grid-item-column-start' as string]: 1,
                        ['--grid-item-column-end' as string]: 6,
                        ['--grid-item-column-end-tablet' as string]: 4,
                      }}
                    >
                      Height
                    </Label>
                    <GridItem
                      columnStart={{ mobile: 6, tablet: 4 }}
                      columnEnd={{ mobile: 13, tablet: 7 }}
                      elementType="span"
                    >
                      {isCustomHeightEnabled[breakpoint] ? `${heightValue.height[breakpoint]} px` : '—'}
                    </GridItem>
                    <input
                      autoComplete="off"
                      className="GridItem"
                      defaultValue={heightValue.height[breakpoint]}
                      disabled={!isCustomHeightEnabled[breakpoint]}
                      id="custom-height-mobile"
                      max="1000"
                      min="200"
                      onChange={(event) => handleHeightChange(event, breakpoint)}
                      step="100"
                      style={{
                        ['--grid-item-column-end' as string]: 13,
                        ['--grid-item-column-start' as string]: 1,
                        ['--grid-item-column-start-tablet' as string]: 7,
                      }}
                      type="range"
                    />
                  </Grid>
                  <Grid spacingX="space-600">
                    <Label
                      UNSAFE_className="GridItem"
                      htmlFor={`custom-max-height-${breakpoint}`}
                      UNSAFE_style={{
                        ['--grid-item-column-start' as string]: 1,
                        ['--grid-item-column-end' as string]: 6,
                        ['--grid-item-column-end-tablet' as string]: 4,
                      }}
                    >
                      Max height
                    </Label>
                    <GridItem
                      columnStart={{ mobile: 6, tablet: 4 }}
                      columnEnd={{ mobile: 13, tablet: 7 }}
                      elementType="span"
                      id={`custom-max-height-${breakpoint}-value`}
                    >
                      {isCustomHeightEnabled[breakpoint] ? `${heightValue.maxHeight[breakpoint]} px` : '—'}
                    </GridItem>
                    <input
                      autoComplete="off"
                      className="GridItem"
                      defaultValue={heightValue.maxHeight[breakpoint]}
                      disabled={!isCustomHeightEnabled[breakpoint]}
                      id={`custom-max-height-${breakpoint}`}
                      max="1000"
                      min="200"
                      onChange={(event) => handleMaxHeightChange(event, breakpoint)}
                      step="100"
                      style={{
                        ['--grid-item-column-end' as string]: 13,
                        ['--grid-item-column-start' as string]: 1,
                        ['--grid-item-column-start-tablet' as string]: 7,
                      }}
                      type="range"
                    />
                  </Grid>
                </Stack>
              ))}
            </form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleModalCustomHeightClose}>Primary action</Button>
            <Button color="secondary" onClick={handleModalCustomHeightClose}>
              Secondary action
            </Button>
          </ModalFooter>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default ModalScrollingLongContent;
