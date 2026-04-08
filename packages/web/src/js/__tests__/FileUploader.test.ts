import { clearFixture, getFixture } from '../../../tests/helpers/fixture';
import { SelectorEngine } from '../dom';
import FileUploader from '../FileUploader';

describe('FileUploader', () => {
  let fixtureEl: Element;
  let container: HTMLElement;
  let input: HTMLInputElement;
  let instance: FileUploader;

  beforeEach(() => {
    container = document.createElement('div');
    input = document.createElement('input');
    input.type = 'file';
    container.appendChild(input);
    instance = new FileUploader(container);
    fixtureEl = getFixture();
  });

  afterEach(() => {
    instance.clearFileQueue();
    clearFixture();
  });

  it('should be an instance of FileUploader', () => {
    expect(instance).toBeInstanceOf(FileUploader);
  });

  it('NAME should be "fileUploader"', () => {
    expect(FileUploader.NAME).toBe('fileUploader');
  });

  it('should generate unique id', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789);

    expect(FileUploader.getUid()).toBe('xjylrx');

    jest.spyOn(global.Math, 'random').mockRestore();
  });

  it('should generate updated filename', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789);

    fixtureEl.innerHTML = `
      <div class="FileUploader" data-spirit-toggle="fileUploader">
        <template data-spirit-snippet="item"></template>
        <div class="FileUploaderInput" data-spirit-element="wrapper">
          <label for="fileUploadMultiple" class="FileUploaderInput__label">Label</label>
          <div class="FileUploaderInput__dropZone" data-spirit-element="dropZone"></div>
        </div>
        <h3 id="attachments-multiple-file" hidden>Attachments</h3>
        <ul class="FileUploaderList" aria-labelledby="attachments-multiple-file" data-spirit-element="list"></ul>
      </div>
    `;

    const fileUploaderEl = fixtureEl.querySelector('[data-spirit-toggle="fileUploader"]') as HTMLElement;

    const fileUploader = new FileUploader(fileUploaderEl);

    expect(fileUploader.getUpdatedFileName('test')).toBe('file_xjylrx_test');

    jest.spyOn(global.Math, 'random').mockRestore();
  });

  it('isDraggable should be true', () => {
    expect(instance.isDragAndDropSupported).toBeTruthy();
  });

  it('clearFileQueue should remove all files from the queue', () => {
    const file1 = new File([''], 'test1.txt', { type: 'text/plain', lastModified: 1684228128062 });
    const file2 = new File([''], 'test2.txt', { type: 'text/plain', lastModified: 1684228128062 });
    instance.addToQueue(file1);
    instance.addToQueue(file2);
    instance.clearFileQueue();

    expect(instance.getFileQueue.size).toBe(0);
  });

  describe('constructor', () => {
    it('should take care of element passed as a CSS selector', () => {
      fixtureEl.innerHTML = `
        <div class="FileUploader" data-spirit-toggle="fileUploader">
          <template data-spirit-snippet="item"></template>
          <div class="FileUploaderInput" data-spirit-element="wrapper">
            <label for="fileUploadMultiple" class="FileUploaderInput__label">Label</label>
            <div class="FileUploaderInput__dropZone" data-spirit-element="dropZone"></div>
          </div>
          <h3 id="attachments-multiple-file" hidden>Attachments</h3>
          <ul class="FileUploaderList" aria-labelledby="attachments-multiple-file" data-spirit-element="list"></ul>
        </div>
      `;

      const fileUploaderEl = fixtureEl.querySelector('[data-spirit-toggle="fileUploader"]') as HTMLElement;
      const fileUploaderBySelector = new FileUploader(fileUploaderEl);

      expect(fileUploaderBySelector.element).toEqual(fileUploaderEl);
    });
  });

  describe('data attributes', () => {
    beforeEach(() => {
      fixtureEl.innerHTML = `
        <div class="FileUploader" data-spirit-toggle="fileUploader">
            <div data-spirit-element="wrapper" data-spirit-max-file-size="5000000" data-spirit-file-queue-limit="5">
                <input type="file" data-spirit-element="input" />
            </div>
        </div>
      `;
    });

    it('should read data-spirit-max-file-size attribute and set fileSizeLimit', () => {
      const fileUploaderEl = fixtureEl.querySelector('[data-spirit-toggle="fileUploader"]') as HTMLElement;
      const fileUploaderInstance = new FileUploader(fileUploaderEl);

      expect(fileUploaderInstance.fileSizeLimit).toBe(5000000);
    });

    it('should read data-spirit-file-queue-limit attribute and set fileQueueLimit', () => {
      const fileUploaderEl = fixtureEl.querySelector('[data-spirit-toggle="fileUploader"]') as HTMLElement;
      const fileUploaderInstance = new FileUploader(fileUploaderEl);

      expect(fileUploaderInstance.fileQueueLimit).toBe(5);
    });

    it('should use default values when data attributes are not provided', () => {
      fixtureEl.innerHTML = `
        <div class="FileUploader" data-spirit-toggle="fileUploader">
          <input type="file" data-spirit-element="input" />
        </div>
      `;
      const fileUploaderEl = fixtureEl.querySelector('[data-spirit-toggle="fileUploader"]') as HTMLElement;
      const fileUploaderInstance = new FileUploader(fileUploaderEl);

      expect(fileUploaderInstance.fileSizeLimit).toBe(10000000); // Default file size limit
      expect(fileUploaderInstance.fileQueueLimit).toBe(1); // Default file queue limit
    });
  });

  describe('Supported and Unsupported files', () => {
    let fileUploader: FileUploader;

    beforeEach(() => {
      fixtureEl.innerHTML = `
      <div class="file-uploader">
        <div class="file-uploader__wrapper" data-spirit-element="wrapper" data-spirit-max-file-size="10000000" data-spirit-file-queue-limit="10">
          <ul class="file-uploader__list" data-spirit-element="list"></ul>
          <input type="file" name="attachment" multiple data-spirit-element="input" accept="image/*" />
          <div class="file-uploader__drop-zone" data-spirit-element="dropZone">Drag and drop files here</div>
        </div>
      </div>
    `;

      fileUploader = new FileUploader(SelectorEngine.findOne('.file-uploader') as HTMLDivElement);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    describe('checkAllowedFileType()', () => {
      it('should allow a supported file type', () => {
        const file = new File(['content'], 'example.jpg', { type: 'image/jpeg' });

        expect(() => fileUploader.checkAllowedFileType(file)).not.toThrow();
      });

      it('should throw an error for an unsupported file type', () => {
        const file = new File(['content'], 'example.txt', { type: 'text/plain' });

        expect(() => fileUploader.checkAllowedFileType(file)).toThrow(
          `example.txt: is not a supported file. Please ensure you are uploading a supported file format`,
        );
      });
    });
  });

  describe('File Queue Limit', () => {
    let fileUploader: FileUploader;

    beforeEach(() => {
      fixtureEl.innerHTML = `
      <div class="file-uploader">
        <div class="file-uploader__wrapper" data-spirit-element="wrapper" data-spirit-file-queue-limit="2" data-spirit-queue-limit-behavior="hide">
          <ul class="file-uploader__list" data-spirit-element="list"></ul>
          <input type="file" name="attachment" multiple data-spirit-element="input" />
          <div class="file-uploader__drop-zone" data-spirit-element="dropZone">Drag and drop files here</div>
        </div>
      </div>
    `;

      fileUploader = new FileUploader(SelectorEngine.findOne('.file-uploader') as HTMLDivElement);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should hide the drop zone when the file queue limit is reached', async () => {
      const dropZone = fixtureEl.querySelector('[data-spirit-element="dropZone"]') as HTMLElement;
      const file1 = new File([''], 'test1.txt', { type: 'text/plain', lastModified: 1684228128062 });
      const file2 = new File([''], 'test2.txt', { type: 'text/plain', lastModified: 1684228128062 });
      const file3 = new File([''], 'test3.txt', { type: 'text/plain', lastModified: 1684228128062 });

      fileUploader.addToQueue(file1);
      fileUploader.addToQueue(file2);

      expect(dropZone).toHaveClass('file-uploader__drop-zone');

      fileUploader.addToQueue(file3);

      await setTimeout(() => {
        expect(dropZone).toHaveClass('file-uploader__drop-zone d-none');
      }, 10);
    });
  });

  describe('createValidationTextElement', () => {
    it('should create a ul element with the correct data-spirit-element attribute', () => {
      const validationElement = FileUploader.createValidationTextElement();

      expect(validationElement instanceof HTMLUListElement).toBeTruthy();
      expect(validationElement.getAttribute('data-spirit-element')).toBe('validation_text');
    });
  });

  describe('getValidationTextElement', () => {
    let fileUploader: FileUploader;

    beforeEach(() => {
      fixtureEl.innerHTML = `
      <div class="file-uploader">
        <div class="file-uploader__wrapper" data-spirit-element="wrapper" data-spirit-file-queue-limit="2" data-spirit-queue-limit-behavior="hide">
          <ul class="file-uploader__list" data-spirit-element="list"></ul>
          <input type="file" name="attachment" multiple data-spirit-element="input" />
          <div class="file-uploader__drop-zone" data-spirit-element="dropZone">Drag and drop files here</div>
        </div>
      </div>
    `;

      fileUploader = new FileUploader(SelectorEngine.findOne('.file-uploader') as HTMLDivElement);
    });

    it('should create a new validation text element and append the validation text', () => {
      const validationText = 'File size is too large';
      const validationTextElement = fileUploader.getValidationTextElement(validationText);

      expect(validationTextElement instanceof HTMLUListElement).toBeTruthy();
      expect(validationTextElement.innerHTML).toContain(`<li>${validationText}</li>`);
    });

    it('should append the validation text to the existing validation text element', () => {
      const validationText = 'Invalid file format';
      const existingValidationElement = FileUploader.createValidationTextElement();
      fileUploader.wrapper.appendChild(existingValidationElement);

      const validationTextElement = fileUploader.getValidationTextElement(validationText);

      expect(validationTextElement).toBe(existingValidationElement);
      expect(validationTextElement.innerHTML).toContain(`<li>${validationText}</li>`);
    });
  });

  describe('checkAllowedFileSize', () => {
    it('should not throw an error when the file size is within the limit', () => {
      const file = { name: 'test.txt', size: 1024 } as File; // 1024 bytes (1 KB)

      instance.fileSizeLimit = 2048; // 2048 bytes (2 KB)

      expect(() => instance.checkAllowedFileSize(file)).not.toThrow();
    });

    it('should throw an error when the file size exceeds the limit', () => {
      const file = { name: 'large_file.jpg', size: 5120 } as File; // 5120 bytes (5 KB)
      instance.fileSizeLimit = 3072; // 3072 bytes (3 KB)

      expect(() => instance.checkAllowedFileSize(file)).toThrow(`${file.name}: ${instance.errors.errorMaxFileSize}`);
    });
  });

  describe('checkFileQueueDuplicity', () => {
    it('should not throw an error when the file does not exist in the file queue', () => {
      const file = { name: 'file1.txt' } as File;
      instance.fileQueue = new Map();
      instance.getUpdatedFileName = jest.fn().mockReturnValue('file1.txt');

      expect(() => instance.checkFileQueueDuplicity(file)).not.toThrow();
    });

    it('should throw an error when the file already exists in the file queue', () => {
      const file = { name: 'file1.txt' } as File;
      instance.fileQueue = new Map().set('file1_updated', ['file1.txt']);
      instance.getUpdatedFileName = jest.fn().mockReturnValue('file1_updated');

      expect(() => instance.checkFileQueueDuplicity(file)).toThrow(
        `${file.name}: ${instance.errors.errorFileDuplicity}`,
      );
    });
  });

  describe('isValidationTextInElement', () => {
    let listElement: HTMLElement;

    beforeEach(() => {
      listElement = document.createElement('div');
      listElement.innerHTML = `
      <ul>
        <li>Validation Text 1</li>
        <li>Validation Text 2</li>
        <li>Validation Text 3</li>
      </ul>`;
    });

    it('should return true if validation text is found in any <li> element', () => {
      const validationText = 'Validation Text 2';

      expect(FileUploader.isValidationTextInElement(validationText, listElement)).toBe(true);
    });

    it('should return false if validation text is not found in any <li> element', () => {
      const validationText = 'Not Found';

      expect(FileUploader.isValidationTextInElement(validationText, listElement)).toBe(false);
    });

    it('should return false for an empty element', () => {
      const emptyElement = document.createElement('div');

      const validationText = 'Validation Text';

      expect(FileUploader.isValidationTextInElement(validationText, emptyElement)).toBe(false);
    });
  });

  describe('getFileFromQueue', () => {
    it('should return the file from the file queue', () => {
      const file = { name: 'test.txt' } as File;
      instance.fileQueue = new Map().set('test', file);

      expect(instance.getFileFromQueue('test')).toBe(file);
    });

    it('should return undefined if the file does not exist in the file queue', () => {
      instance.fileQueue = new Map();

      expect(instance.getFileFromQueue('test')).toBeUndefined();
    });
  });

  describe('updateQueue', () => {
    it('should update the file in the queue without meta and callback', () => {
      const name = 'test';
      const file = { name: 'test.txt' } as File;
      instance.fileQueue = new Map().set(name, { file: null });

      instance.updateQueue(name, file);

      expect(instance.fileQueue.get(name)).toEqual({ file });
    });

    it('should update the file in the queue with meta data and trigger callback', () => {
      const name = 'test';
      const file = { name: 'test.txt' } as File;
      const meta = { y: 10, x: 20, width: 100, height: 50 };
      const callback = jest.fn();
      instance.fileQueue = new Map().set(name, { file: null });

      instance.updateQueue(name, file, meta, callback);

      expect(instance.fileQueue.get(name)).toEqual({ file, meta });
      expect(callback).toHaveBeenCalledWith(name, file, meta);
    });
  });
});
