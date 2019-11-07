A small library for storing values in browser local storage. \
There is also a preservation of the value of BehaviorSubject from rxjs

Stable: 1.1.2

```typescript
import {SaveProperty, SaveBehaviorSubject} from 'local-storage-save-decorators';
import {BehaviorSubject} from 'rxjs';

export class ExampleComponent {
  @SaveProperty('ha-ha')
  itWillSaveString: string;
  
  @SaveProperty(10)
  itWillSaveNumber: number;
  
  @SaveProperty(false)
  itWillSaveBoolean: boolean;
  
  @SaveProperty()
  itWillSaveNumberButBeUndefinedWhenInit: number;
  
  @SaveProperty(undefined)
  itWillSaveNumberButBeUndefinedWhenInit2: number;
  
  @SaveProperty({a: 54, b: '54'})
  itWillSaveObject: { a: number; b: string; };
  
  @SaveBehaviorSubject(undefined, 'string')
  public beUndefinedWhenInitBS: BehaviorSubject<string>;
  
  @SaveBehaviorSubject('btc_usd', 'string')
  public beStringBS: BehaviorSubject<string>;
  
  @SaveBehaviorSubject(43, 'number')
  public beNumberBS: BehaviorSubject<number>;
  
  @SaveBehaviorSubject(false, 'boolean')
  public beBooleanBS: BehaviorSubject<boolean>;
  
  @SaveBehaviorSubject({a: 54, b: '54'}, 'object')
  public beObjectBS: BehaviorSubject<{ a: number; b: string; }>;
  
  constructor() {
      console.log(this.itWillSaveNumber);
      // 10, but after rebooting the class will be 5
      
      this.itWillSaveNumber = 5;
  }
}

```

Version 1.0.0 prop UUID = target.constructor.name + '/' + propertyKey.toString()

Issues: antonantion@mail.ru
