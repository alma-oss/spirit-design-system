export const createFigmaFetch = () => async (input) => {
  const url = String(input);

  if (url.includes('/files/figma-file?depth=3')) {
    return Response.json({
      document: {
        id: '0:0',
        name: 'Document',
        type: 'DOCUMENT',
        children: [
          {
            id: '0:1',
            name: '📁 Icons',
            type: 'CANVAS',
            children: [
              {
                id: '1:1',
                name: 'Icons/Add Item',
                type: 'COMPONENT_SET',
                children: [
                  { id: '1:2', name: 'Brand=Spirit', type: 'COMPONENT' },
                  { id: '1:3', name: 'Brand=Jobs', type: 'COMPONENT' },
                ],
              },
              {
                id: '2:1',
                name: 'Icons/logo-colored',
                type: 'COMPONENT_SET',
                children: [
                  {
                    id: '2:2',
                    name: 'Brand=Spirit',
                    type: 'COMPONENT',
                    componentProperties: { Brand: { value: 'Spirit' } },
                  },
                ],
              },
              {
                id: '3:1',
                name: 'Icons/benefit-health',
                type: 'COMPONENT',
                children: [{ id: '3:2', name: 'Vector', type: 'VECTOR' }],
              },
            ],
          },
        ],
      },
    });
  }

  if (url.includes('/images/figma-file?')) {
    return Response.json({
      err: null,
      images: {
        '1:2': 'https://assets.example/add.svg',
        '2:2': 'https://assets.example/logo.svg',
        '3:1': 'https://assets.example/benefit.svg',
      },
    });
  }

  if (url === 'https://assets.example/add.svg') {
    return new Response('<svg viewBox="0 0 24 24"><path /></svg>');
  }

  if (url === 'https://assets.example/logo.svg') {
    return new Response('<svg viewBox="0 0 24 24"><path fill="#123456" /></svg>');
  }

  if (url === 'https://assets.example/benefit.svg') {
    return new Response('<svg viewBox="0 0 24 24"><circle /></svg>');
  }

  return new Response('Not found', { status: 404 });
};

export const createExportFetch = ({
  file = {
    document: {
      id: '0:0',
      name: 'Document',
      type: 'DOCUMENT',
      children: [
        {
          id: '1:1',
          name: 'Icons/Test',
          type: 'COMPONENT_SET',
          children: [{ id: '1:2', name: 'Brand=Spirit', type: 'COMPONENT' }],
        },
      ],
    },
  },
  images = { err: null, images: { '1:2': 'https://assets.example/test.svg' } },
  svg = new Response('<svg />'),
} = {}) => {
  return async (input) => {
    const url = String(input);

    if (url.includes('/files/')) {
      return file instanceof Response ? file : Response.json(file);
    }

    if (url.includes('/images/')) {
      return images instanceof Response ? images : Response.json(images);
    }

    return typeof svg === 'function' ? svg(url) : svg;
  };
};
