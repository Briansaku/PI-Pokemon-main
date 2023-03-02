const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Pokemon.create({ name: 'Pikachu' });
      });
    });
  });
});

//TESTING

describe("Pokemon model", () => {
  beforeEach(async () => {
    await Pokemon.sync({ force: true });
  });

  describe("model validators", () => {
    it("should throw an error if height is null", async () => {
      await expect(Pokemon.create({})).to.be.rejectedWith("It requires a valid height");
    });

    it("should work when its a valid height", async () => {
      await Pokemon.create({ height: 3 });
    });

    it("should throw an error if weight is null", async () => {
      await expect(Pokemon.create({})).to.be.rejectedWith("It requires a valid weight");
    });

    it("should work when its a valid weight", async () => {
      await Pokemon.create({ weight: 10 });
    });

    it("should throw an error if image is null", async () => {
      await expect(Pokemon.create({})).to.be.rejectedWith("It requires a valid link image");
    });

    it("should work when its a valid link image", async () => {
      await Pokemon.create({
        image:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg",
      });
    });
  });
});

describe("Type model", () => {
  beforeEach(async () => {
    await Type.sync({ force: true });
  });

  it("should not be created without all required fields completed", async () => {
    await expect(Type.create({ id: "1" })).to.be.rejected;
  });

  it("should have a name property that is a string", async () => {
    const type = await Type.create({ name: "Fire" });
    expect(typeof type.name).to.equal("string");
  });
});

