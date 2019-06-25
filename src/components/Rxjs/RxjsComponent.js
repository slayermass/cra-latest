import React, { useRef } from 'react';
import { Observable, merge } from 'rxjs';
import { delay } from 'rxjs/operators';
import axios from 'axios';

export const RxjsComponent = () => {
  let subscription = useRef();

  const onClick = () => {
    console.log('start ajax');
    let observable$ = new Observable( ( observer ) => {
      axios.get( 'https://jsonplaceholder.typicode.com/users' )
        .then( ( response ) => {
          observer.next( response.data );
          observer.complete();
        } )
        .catch( ( error ) => {
          observer.error( error );
        } );
    } );
    const a = merge(
      observable$.pipe(delay(1000)),
    );

    subscription = a.subscribe( {
      next: data => console.log( '[data] => ', data ),
      complete: data => console.log( '[complete]', data),
    } );
  };

  const onCancel = () => {
    console.log('cancel ajax');
    subscription.unsubscribe();
  };

  return (
    <>
      <button onClick={onClick}>do ajax</button>
      <button onClick={onCancel}>cancel ajax</button>
    </>
  );
};
