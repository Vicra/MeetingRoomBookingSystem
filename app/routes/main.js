const mainCtrl = fw.getController('main');

module.exports = 
[
  { method: 'GET', path: '/main', options: { handler: mainCtrl.render } },
  { method: 'POST', path: '/main', options: { handler: mainCtrl.render } }
];