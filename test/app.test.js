const app = require('../server/index.js');
const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = require('chai');
chai.use(chaiHttp);
describe('Server', () => {
  it('should do basic test thing', (done) => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return 400 for bad input', (done) => {
    chai
      .request(app)
      .post("/miniurl")
      .send({ destination: "bad" })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      })
  })

  it('should return 400 for empty input', (done) => {
    chai
      .request(app)
      .post("/miniurl")
      .send({ destination: "" })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      })
  })

  it('should return 200 for a good input/should have the correct URL format', (done) => {
    chai
      .request(app)
      .post("/miniurl")
      .send({ destination: "https://www.youtube.com/watch?v=71sj1LVELoc" })
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res.text).to.contain('rebrand.ly')
        done();
      })
  })
});