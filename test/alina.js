describe("Alina", function() {

  var validateDescriptor = function(obj) {
    expect(obj.setter).to.be.a("function");
    expect(obj.binder).to.be.a("object");
    // expect(obj.easing).to.be.a("function");
    expect(obj.update).to.be.a("function");
    expect(obj.forceUpdate).to.be.a("function");
    expect(obj.bind).to.be.a("function");
    expect(obj.unbind).to.be.a("function");
    expect(obj.remove).to.be.a("function");
  }

  var validateDefaultState = function(anim, from, to) {
    anim.forceUpdate();
    expect(anim.from).to.eql(from);
    expect(anim.to).to.eql(to);
    expect(anim.res).to.eql(from);
    expect(anim.state).to.eql(0);
  }

  var validateCalc = function(force, anim, from, to) {
    force.set(0);
    anim.forceUpdate();
    expect(anim.res).to.eql(from);
    expect(anim.state).to.eql(0);

    //force.set(0.5);
    //anim.forceUpdate();
    //expect(anim.res).to.be(15);
    //expect(anim.state).to.be(0.5);

    force.set(1);
    anim.forceUpdate();
    expect(anim.res).to.eql(to);
    expect(anim.state).to.eql(1);
  };

  var validateByParams = function(from, to) {
      var forceBinder = Alina.force();
      var anim = Alina(from, to, function () {}, forceBinder);

      validateDescriptor(anim);
      validateDefaultState(anim, from, to);
      validateCalc(forceBinder, anim, from, to);

      anim.remove();
  };

  describe("animation object", function() {
    it("default state", function() {
      var from = 10;
      var to = 20;
      var anim = Alina(from, to, function () {});

      validateDescriptor(anim);
      validateDefaultState(anim, from, to);

      anim.remove();
    });

    it("bind / unbind", function() {
      var from = 10;
      var to = 20;
      var forceBinder = Alina.force();
      var anim = Alina(from, to, function () {}, forceBinder);

      validateDescriptor(anim);
      validateDefaultState(anim, from, to);
      validateCalc(forceBinder, anim, from, to);

      anim.unbind();
      anim.remove();
    });
  });

  describe("from / to", function() {
    it("from > to", function() {
      validateByParams(5, 2);
    });

    it("from < to", function() {
      validateByParams(-10, 1000);
    });

    it("from < 0 && to < 0", function() {
      validateByParams(-10, -50);
    });

    it("from is array && to is array", function() {
      validateByParams([0, -10], [100, -50]);
    });
  });

  describe("constructor overload", function() {
    it("(from, to, setter)", function() {
      var anim = Alina(10, 20, function () {});
      validateDescriptor(anim);
      validateDefaultState(anim, 10, 20);
    });

    it("(from, to, setter, binder)", function() {
      var anim = Alina(10, 20, function () {}, Alina.time());
      validateDescriptor(anim);
      validateDefaultState(anim, 10, 20);
    });

    it("(from, to, setter, binder, easing)", function() {
      var anim = Alina(10, 20, function () {}, Alina.time(), Alina.linear);
      validateDescriptor(anim);
      validateDefaultState(anim, 10, 20);
    });

    it("(from, to, setter, binder, easings)", function() {
      var anim = Alina(10, 20, function () {}, Alina.time(), [Alina.linear, Alina.easeInOutCubic]);
      validateDescriptor(anim);
      validateDefaultState(anim, 10, 20);
      expect(anim.easing).to.be.an('array');
    });
  });
});
