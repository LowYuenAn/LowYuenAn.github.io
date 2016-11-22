function buildFrame() {
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
  return frame;
}

function addEvent( target, type, func ) {
  target.addEventListener( type, func )
}

function keydownPuzzle( data ) {
  return function swaping( e ) {
    let direction = e.keyCode || e; 
    if ( [37, 38, 39, 40].indexOf( direction ) == -1 ) {
      return;
    }
    if ( typeof e != 'number' ) {
      e.preventDefault();
    }
    swap( direction )
  }
}

function swap( pos ) {
  let data = collectData( frame );
  switch ( pos ) {
    case 37:
      display(frame, swap_pos( data, 'left' ) );
      break;
    case 38:
      display(frame, swap_pos( data, 'up' ) );
      break
    case 39:
      display(frame, swap_pos( data, 'right' ) );
      break;
    case 40:
      display(frame, swap_pos( data, 'down' ) );
      break;
  }
}

function collectData( frame ) {
  const number_elem = frame.getElementsByClassName('number_box');
  return Array.prototype.map.call( number_elem, elem => elem.innerText );
}

function swapData( data, a, b ){
  data[a] = data.splice(b, 1, data[a])[0];
  return data;
}


function swap_pos( data, pos ) {
  const blank_pos = data.indexOf( '0' );
  if ( pos == 'left' && [3, 7, 11, 15].indexOf( blank_pos ) == -1 ) {
    return swapData( data, blank_pos, blank_pos + 1 );
  } else if ( pos == 'up' && [12, 13, 14, 15].indexOf( blank_pos ) == -1 ) {
    return swapData( data, blank_pos, blank_pos + 4 );
  } else if ( pos == 'right' && [0, 4, 8, 12].indexOf( blank_pos ) == -1 ) {
    return swapData( data, blank_pos, blank_pos - 1 );
  } else if ( pos == 'down' && [0, 1, 2, 3].indexOf( blank_pos ) == -1 ) {
    return swapData( data, blank_pos, blank_pos - 4 );
  } else {
    return data;
  }
}

function display( frame, data ) {
  const number_elem = frame.getElementsByClassName('number_box');
  Array.prototype.forEach.call( number_elem, ( elem, i ) => {
    elem.innerText = data[i];
    if ( data[i] == '0' ) {
      elem.style.backgroundColor = 'rgba(155, 155, 155, 1)';
      elem.style.color = 'rgba(155, 155, 155, 1)';

    } else {
      elem.style.backgroundColor = 'rgba(155, 155, 155, 0.5)';
      elem.style.color = '#000000';
    }
  } );
  check( data );
}

function createPuzzle( frame ) {
  const random_move = Array.apply( null, Array( 1000 ) )
    .map( n => Math.round( Math.random() * 3 ) + 37 )
    .forEach( swap );
}

// complex
// function createPuzzle( frame ) {
//   const random_move = Array.apply( null, Array( 1000 ) )
//     .map( n => Array.apply( null, Array( Math.round( Math.random() * 3 ) ) ) )
//     .map( ns => ns.map( n => Math.round( Math.random() * 3 ) + 37 ) )
//     .reduce( ( arr, curr ) => arr.concat( curr ), [] )
//     .forEach( swap );
// }

function check( data ) {
  const final = Array.apply( null, Array( 15 ) )
    .map( ( n, i ) => ( i + 1 ) + '' )
    .concat( '0' )
    .filter( ( n, i ) => n == data[i] );
  if ( final.length == 16 ) {
    document.getElementById( 'completed' ).innerText = "Congratulation, You Have Completed The Puzzle!!!"
  }

}

const frame = buildFrame();
const data = collectData( frame );
createPuzzle( frame )
// frame.focus();
addEvent( window, 'keydown', keydownPuzzle( data ) );
addEvent( document.getElementById( 'left_btn' ), 'click', e => keydownPuzzle( data )( 37 ) );
addEvent( document.getElementById( 'top_btn' ), 'click', e => keydownPuzzle( data )( 38 ) );
addEvent( document.getElementById( 'bottom_btn' ), 'click', e => keydownPuzzle( data )( 40 ) );
addEvent( document.getElementById( 'right_btn' ), 'click', e => keydownPuzzle( data )( 39 ) );

// addEvent( window, 'click', alwaysFocus);

// Math.round( Math.random() * 3 )


