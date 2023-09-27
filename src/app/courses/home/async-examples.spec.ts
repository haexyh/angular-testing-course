fdescribe('async testing examples', () =>{
  it('should show simple done function', (done) => {
    let test = false;
    setTimeout(() => {
      test = true;
      expect(test).toBeTruthy();
      done();
    }, 1_000);

  });
})
