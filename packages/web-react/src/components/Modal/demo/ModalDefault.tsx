import React, { type ChangeEvent, useState } from 'react';
import {
  Button,
  Checkbox,
  Dropdown,
  DropdownPopover,
  DropdownTrigger,
  Item,
  Label,
  Modal,
  ModalBody,
  ModalDialog,
  ModalFooter,
  ModalHeader,
  Radio,
  Stack,
  TextField,
} from '../..';
import { AlignmentX, type AlignmentXDictionaryType, AlignmentY, type AlignmentYDictionaryType } from '../../..';

const ModalDefault = () => {
  const [isModalBasicOpen, setModalBasicOpen] = useState(false);
  const [isModalFormOpen, setModalFormOpen] = useState(false);
  const [isModalWithDropdownOpen, setModalWithDropdownOpen] = useState(false);
  const [modalAlign, setModalAlign] = useState<AlignmentYDictionaryType>(AlignmentY.CENTER);
  const [footerAlign, setFooterAlign] = useState<AlignmentXDictionaryType>(AlignmentX.RIGHT);
  const [isDockedOnMobile, setIsDockedOnMobile] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isExpandedOnMobile, setIsExpandedOnMobile] = useState(true);
  const [isScrollable, setIsScrollable] = useState(false);

  const toggleModalBasic = () => setModalBasicOpen(!isModalBasicOpen);
  const toggleModalForm = () => setModalFormOpen(!isModalFormOpen);
  const toggleModalWithDropdown = () => setModalWithDropdownOpen(!isModalWithDropdownOpen);
  const handleModalBasicClose = () => setModalBasicOpen(false);
  const handleModalFormClose = () => setModalFormOpen(false);
  const handleModalWithDropdownClose = () => setModalWithDropdownOpen(false);
  const handleModalAlignChange = (event: ChangeEvent<HTMLInputElement>) => {
    setModalAlign(event.target.value as AlignmentYDictionaryType);
  };
  const handleFooterAlignChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFooterAlign(event.target.value as AlignmentXDictionaryType);
  };
  const handleDockedOnMobileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsDockedOnMobile(event.target.checked);
  };
  const handleExpandedOnMobileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsExpandedOnMobile(event.target.checked);
  };
  const handleScrollableChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsScrollable(event.target.checked);
  };
  const handleDropdownToggle = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <>
      <Button onClick={toggleModalBasic} data-test-id="modal-basic">
        Open Modal
      </Button>

      <Modal alignmentY={modalAlign} id="example-basic" isOpen={isModalBasicOpen} onClose={handleModalBasicClose}>
        <ModalDialog
          isDockedOnMobile={isDockedOnMobile}
          isExpandedOnMobile={isExpandedOnMobile}
          isScrollable={isScrollable}
        >
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam at excepturi laudantium magnam mollitia
              perferendis reprehenderit, voluptate. Cum delectus dicta ducimus eligendi excepturi natus perferendis
              provident unde. Eveniet, iste, molestiae?
            </p>
            <form className="mb-600">
              <div>Modal alignment:</div>
              <div className="my-500">
                <Radio
                  id="modal-alignment-top"
                  marginRight="space-600"
                  label="Top"
                  value="top"
                  name="modal-alignment"
                  autoComplete="off"
                  isChecked={modalAlign === AlignmentY.TOP}
                  onChange={handleModalAlignChange}
                />{' '}
                <Radio
                  id="modal-alignment-center"
                  marginRight="space-600"
                  label="Center"
                  value="center"
                  name="modal-alignment"
                  autoComplete="off"
                  isChecked={modalAlign === AlignmentY.CENTER}
                  onChange={handleModalAlignChange}
                />{' '}
                <Radio
                  id="modal-alignment-bottom"
                  marginRight="space-600"
                  label="Bottom"
                  value="bottom"
                  name="modal-alignment"
                  autoComplete="off"
                  isChecked={modalAlign === AlignmentY.BOTTOM}
                  onChange={handleModalAlignChange}
                />
              </div>
            </form>
            <form className="d-none d-tablet-block mb-600">
              <div>Footer alignment (from tablet up):</div>
              <div className="my-500">
                <Radio
                  id="footer-alignment-left"
                  marginRight="space-600"
                  label="Left"
                  value="left"
                  name="footer-alignment"
                  autoComplete="off"
                  isChecked={footerAlign === AlignmentX.LEFT}
                  onChange={handleFooterAlignChange}
                />{' '}
                <Radio
                  id="footer-alignment-center"
                  marginRight="space-600"
                  label="Center"
                  value="center"
                  name="footer-alignment"
                  autoComplete="off"
                  isChecked={footerAlign === AlignmentX.CENTER}
                  onChange={handleFooterAlignChange}
                />{' '}
                <Radio
                  id="footer-alignment-right"
                  marginRight="space-600"
                  label="Right"
                  value="right"
                  name="footer-alignment"
                  autoComplete="off"
                  isChecked={footerAlign === AlignmentX.RIGHT}
                  onChange={handleFooterAlignChange}
                />
              </div>
            </form>
            <Stack elementType="form">
              <Checkbox
                autoComplete="off"
                id="modal-uniform-docked"
                isChecked={isDockedOnMobile}
                label="Dock on mobile"
                name="modal-uniform-docked"
                onChange={handleDockedOnMobileChange}
              />
              <Checkbox
                autoComplete="off"
                id="modal-uniform-expanded"
                isChecked={isExpandedOnMobile}
                isDisabled={!isDockedOnMobile}
                label="Expand on mobile (docked only)"
                name="modal-uniform-expanded"
                onChange={handleExpandedOnMobileChange}
              />
              <Checkbox
                autoComplete="off"
                id="modal-uniform-non-scrolling"
                isChecked={isScrollable}
                label="Scrolling inside"
                name="modal-uniform-non-scrolling"
                onChange={handleScrollableChange}
              />
            </Stack>
          </ModalBody>
          <ModalFooter alignmentX={footerAlign} description="Optional description">
            <Button onClick={handleModalBasicClose}>Primary action</Button>
            <Button color="secondary" onClick={handleModalBasicClose}>
              Secondary action
            </Button>
          </ModalFooter>
        </ModalDialog>
      </Modal>

      <Button onClick={toggleModalForm} data-test-id="modal-with-form">
        Open Modal with Form
      </Button>

      <Modal id="example-form" isOpen={isModalFormOpen} onClose={handleModalFormClose}>
        <ModalDialog elementType="form" method="dialog">
          <ModalHeader>Modal with a Form</ModalHeader>
          <ModalBody>
            <TextField marginBottom="space-400" label="Label" id="textfield" placeholder="TextField" />
            <p>
              The primary action is a button with <code>type=&quot;submit&quot;</code> and closes the dialog on
              submission.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button type="submit">Primary action</Button>
            <Button color="secondary" onClick={handleModalFormClose}>
              Secondary action
            </Button>
          </ModalFooter>
        </ModalDialog>
      </Modal>

      <Button onClick={toggleModalWithDropdown} data-test-id="modal-with-dropdown">
        Open Modal with Dropdown
      </Button>

      <Modal id="example-dropdown" isOpen={isModalWithDropdownOpen} onClose={handleModalWithDropdownClose}>
        <ModalDialog>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam at excepturi laudantium magnam mollitia
              perferendis reprehenderit, voluptate. Cum delectus dicta ducimus eligendi excepturi natus perferendis
              provident unde. Eveniet, iste, molestiae?
            </p>
            <Dropdown id="dropdown-in-modal" isOpen={isDropdownOpen} onToggle={handleDropdownToggle}>
              <DropdownTrigger elementType={Button} color="secondary">
                Dropdown
              </DropdownTrigger>
              <DropdownPopover>
                <Item elementType="a" href="#">
                  <Label>Action</Label>
                </Item>
                <Item elementType="a" href="#">
                  <Label>Another action</Label>
                </Item>
                <Item elementType="a" href="#">
                  <Label>Something else here</Label>
                </Item>
              </DropdownPopover>
            </Dropdown>
          </ModalBody>
          <ModalFooter description="Optional description">
            <Button onClick={handleModalWithDropdownClose}>Primary action</Button>
            <Button color="secondary" onClick={handleModalWithDropdownClose}>
              Secondary action
            </Button>
          </ModalFooter>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default ModalDefault;
