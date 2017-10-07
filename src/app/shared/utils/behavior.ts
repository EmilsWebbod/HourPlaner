import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export class Behavior<T> {

  private __ = new BehaviorSubject<T>(null);
  public $ = this.__.asObservable();

  constructor(x: T) {
    this.__.next(x);
  }

  static of(x: any): Behavior<any> {
    return new Behavior<any>(x);
  }

  public set prop(x: T) {
    if (x === null || x === undefined) {return; }
    this.__.next(x);
  }

  public get prop(): T {
    return this.__.getValue();
  }

  public map(f: Function): Behavior<T> {
    this.prop =  f( this.prop );
    return this;
  }
}
