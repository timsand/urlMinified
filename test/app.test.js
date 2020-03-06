const app = require('../server/index.js');
const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = require('chai');
chai.use(chaiHttp);
describe('Server', () => {
  it('should hit default route successfully', (done) => {
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
        //need a better way to test this
        expect(res.text).to.contain('/sh/');
        done();
      })
  })

  xit('should redirect to a good URL', (done) => {
    //http://www.localhost:3000/sh/3yPTeeom
    //will use entry created in above test
    //current test is broken and needs fixing
    chai
      .request(app)
      .get("/sh/3yPTeeom").redirects(1)
      .end((err, res) => {
        res.should.redirectTo("https://www.youtube.com/watch?v=71sj1LVELoc")
        done();
      })
  })
});