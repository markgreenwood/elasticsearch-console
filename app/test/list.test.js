const expect = require('chai').expect;
const sinon = require('sinon');
const list = require('../lib/bank/handlers/list');

describe('list handler', () => {
  const client = { search: sinon.stub().resolves(new Array(10)) };

  const lister = list(client);

  it('list defaults to 10 records', () =>
    lister()
      .then((response) => {
        expect(client.search.calledOnce).to.be.true;
        expect(response.length).to.equal(10);
      })
  );

  it.skip('takes a size argument', () =>
    lister({ query: { size: 20 } })
      .then(() => {
        expect(client.search.calledWith({ query: { size: 20 } })).to.be.true;
      })
  );
});