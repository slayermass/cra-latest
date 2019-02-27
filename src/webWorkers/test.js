export default () => {
  // дождаться запроса
  self.addEventListener('message', (e) => { // eslint-disable-line no-restricted-globals
    if (!e) return;
    console.log('пришло', e.data);
  
    switch (e.data.cmd) {
      case 'test':
        setTimeout(() => {
          // отдать ответ
          // esling-disable-line
          postMessage({ data: 'money? noop' });
        }, 1500);
        break;
        
      case 'error':
        throw new Error('EEERROROOR');
        
      default:
        postMessage('Unknown command');
    }
  }, false);
};
