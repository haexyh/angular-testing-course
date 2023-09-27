import {fakeAsync, flush, flushMicrotasks, tick} from "@angular/core/testing";
import {of} from "rxjs";
import {delay, tap} from "rxjs/operators";

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

  it('Async example with Promise and setTimeout', fakeAsync(() => {
    let counter = 0;
    Promise.resolve().then(() => Promise.resolve()
    ).then(() => {
      counter += 10
      setTimeout(() => counter++, 1_000)
    })
    expect(counter).toBe(0);
    flushMicrotasks()
    expect(counter).toBe(10);
    tick(1_000)
    expect(counter).toBe(11);
  }));

  fit('Async example with observables', fakeAsync(() => {
    let test = false;
    const test$ = of(null).pipe(
      delay(1_000),
      tap(_ => test = true));
    test$.subscribe()

    tick(1_000)
    expect(test).toBeTruthy();

  }));


})
