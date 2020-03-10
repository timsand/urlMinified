process.env.dbtesting = 'dbtesting';
const app = require('../server/index.js');
const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = require('chai');
chai.use(chaiHttp);
//Flushing the database may require these tests to be changed...
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

  it('should redirect to a good URL', (done) => {
    //will use entry created in above test
    chai
      .request(app)
      .get("/sh/9c0e6b2a8baa01f").redirects(0)
      .end((err, res) => {
        expect(res).to.have.status(302)
        expect(res).to.redirectTo("https://www.youtube.com/watch?v=71sj1LVELoc")
        done();
      })
  })
});