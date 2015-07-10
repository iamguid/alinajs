describe("Easing", function() {
  it("linear", function() {
    expect(Alina["linear"]).to.be.a("function");
    expect(Alina.linear(0)).to.be(0);
    expect(Alina.linear(1)).to.be(1);
  });
});
