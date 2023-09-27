import {fakeAsync, flush, flushMicrotasks, tick} from "@angular/core/testing";

fdescribe('async testing examples', () => {
  it('Async example with done', (done) => {
    let test = false;
    setTimeout(() => {
      test = true;
      expect(test).toBeTruthy();
      done();
    }, 1_000);

  });
  it('Async example with tick', fakeAsync(() => {
    let test = false;
    setTimeout(() =>
        test = true
      , 1_000);
    tick(1_000)
    expect(test).toBeTruthy();
  }));

  it('Async example with flush', fakeAsync(() => {
    let test = false;
    setTimeout(() => {
    });
    setTimeout(() =>
        test = true
      , 1_000);
    // clears all timeouts
    flush();
    expect(test).toBeTruthy();

  }));
  it('Async example with Promise', fakeAsync(() => {
    let test = false;
    Promise.resolve().then(() => Promise.resolve()
    ).then(() => {
      test = true;
    })
    flushMicrotasks()
    expect(test).toBeTruthy();
  }));
})
