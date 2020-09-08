export const SYSTEM = {
  '/api/getDepTreeData': [{
    title: 'parent 1',
    key: '0-0',
    children: [{
      title: 'parent 1-0',
      key: '0-0-0',
      disabled: true,
      children: [{
        title: 'leaf',
        key: '0-0-0-0',
        disableCheckbox: true,
      },
      {
        title: 'leaf',
        key: '0-0-0-1',
      }],
    }, {
      title: 'parent 1-1',
      key: '0-0-1',
      children: [{ title: 'sss', key: '0-0-1-0' }],
    }],
  },
  ]
};
