const frame = document.getElementById( 'main_frame' );
const number_box = Array.apply( null, Array( 15 ) )
  .map( () => document.createElement( 'div' ) )
  .forEach( ( div, i ) => {
    div.id = 'box_' + ( i + 1 );
    div.className = 'number_box';
    div.textContent = i + 1;
    frame.appendChild( div ); } );
const empty_box = document.createElement( 'div' );
empty_box.id = 'box_empty';
empty_box.className = 'number_box';
empty_box.textContent = 0;
frame.appendChild( empty_box );







console.log( number_box );