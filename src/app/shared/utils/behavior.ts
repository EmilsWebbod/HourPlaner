import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

export class Behavior<T> {

  private __ = new BehaviorSubject<T>(null);
  public $: Observable<T> = this.__.asObservable();

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
