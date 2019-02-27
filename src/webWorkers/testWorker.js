export default () => {
  // дождаться запроса
  self.addEventListener('message', (e) => { // eslint-disable-line no-restricted-globals
    if (!e) return;
  
    switch (e.data.cmd) {
      case 'test':
        setTimeout(() => {
          // отдать ответ
          // esling-disable-line
          postMessage({ data: 'money? noop' });
        }, 1500);
        break;
        
      case 'error':
        postMessage({ data: 'response before error' });
        throw new Error('EEERROROOR');
  
      case 'onload':
        postMessage('onload response');
        break;
        
      default:
        postMessage('Unknown command');
    }
  }, false);
};
