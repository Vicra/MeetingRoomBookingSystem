const indexCtrl = fw.getController('main');

module.exports = 
[
  { method: 'GET', path: '/', options: { handler: indexCtrl.render } },
  { method: 'POST', path: '/', options: { handler: indexCtrl.render } }
];