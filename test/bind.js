describe("Binders", function() {

  var validateBinderDescriptor = function(obj) {
    expect(obj.bind).to.be.a("function");
    expect(obj.unbind).to.be.a("function");
  }

  describe("force", function() {
    var anim;
    var binder;

    after(function () {
      anim.remove();
    });

    it("isset", function() {
      expect(Alina).to.have.property("force");
    });

    it("binder is valid", function() {
      binder = Alina.force();
      anim = Alina(10, 20, function() {}, binder);

      validateBinderDescriptor(binder);
      expect(binder.set).to.be.a("function");
    });

    it("set has working", function() {
      anim.binder.set(1);
      anim.forceUpdate();
      expect(anim.res).to.eql(20);
      expect(anim.state).to.eql(1);
    });
  });

  describe("time", function() {
    var binder;
    var anim;

    after(function () {
      anim.remove();
    });

    it("isset", function() {
      expect(Alina).to.have.property("time");
    });

    it("binder is valid", function() {
      binder = Alina.time(100);
      anim = Alina(10, 20, function(val) {
        expect(val >= 10 && val <= 20).to.be.ok;
      }, binder, Alina.linear);

      validateBinderDescriptor(binder);

      expect(binder.start).to.be.a("function");
      expect(binder.stop).to.be.a("function");
      expect(binder.pause).to.be.a("function");
      expect(binder.resume).to.be.a("function");
      expect(binder.isStarted).to.be.a("function");
      expect(binder.isPaused).to.be.a("function");

      binder.start();
    });

    it("pause/resume has working", function(done) {
      expect(binder.isPaused).to.be.false;

      binder.pause();
      expect(binder.isPaused).to.be.true;

      var state = anim.state;
      var timer = setTimeout(function() {
        expect(anim.state).to.be.equal(state);

        binder.resume();
        expect(binder.isPaused).to.be.false;

        done();
      }, 500);

    });

    it("stop/start has working", function(done) {
      expect(binder.isStarted).to.be.true;

      binder.stop();
      expect(binder.isStarted).to.be.false;

      var state = anim.state;
      var timer = setTimeout(function() {
        expect(anim.state).to.be.equal(state);

        binder.start();
        expect(binder.isStarted).to.be.true;

        done();
      }, 500);

    });
  });

  describe("interval", function() {
    var binder;
    var anim;

    after(function () {
      anim.remove();
    });

    it("isset", function() {
      expect(Alina).to.have.property("interval");
    });

    it("binder is valid", function() {
      binder = Alina.interval(0, 100);
      anim = Alina(0, 20, function() {}, binder);

      validateBinderDescriptor(binder);

      expect(binder.setBegin).to.be.a("function");
      expect(binder.setEnd).to.be.a("function");
      expect(binder.setCurrent).to.be.a("function");

      expect(anim.state).to.be(0);
    });

    it("setCurrent has working", function() {
      binder.setBegin(0);
      binder.setCurrent(50);
      binder.setEnd(100);

      anim.forceUpdate();
      expect(anim.state).to.be(0.5);
      expect(anim.res).to.be(10);

      binder.setCurrent(-100);
      anim.forceUpdate();
      expect(anim.state).to.be(-1);
      expect(anim.res).to.be(-20);

      binder.setCurrent(200);
      anim.forceUpdate();
      expect(anim.state).to.be(2);
      expect(anim.res).to.be(40);
    });

    it("setBegin has working", function() {
      binder.setBegin(-100);
      binder.setCurrent(0);
      binder.setEnd(100);

      anim.forceUpdate();
      expect(anim.state).to.be(0.5);
      expect(anim.res).to.be(10);
    });

    it("setEnd has working", function() {
      binder.setBegin(0);
      binder.setCurrent(100);
      binder.setEnd(200);

      anim.forceUpdate();
      expect(anim.state).to.be(0.5);
      expect(anim.res).to.be(10);
    });

    it("end < begin", function() {
      binder.setBegin(200);
      binder.setCurrent(100);
      binder.setEnd(0);

      anim.forceUpdate();
      expect(anim.state).to.be(0.5);
      expect(anim.res).to.be(10);

      binder.setCurrent(0);
      anim.forceUpdate();
      expect(anim.state).to.be(1);
      expect(anim.res).to.be(20);

      binder.setCurrent(200);
      anim.forceUpdate();
      expect(anim.state).to.be(0);
      expect(anim.res).to.be(0);
    });
  });
});
