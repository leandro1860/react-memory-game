import React, {useState, useEffect} from 'react';

import './styles/global.css';
import './App.css';

function App() {
  const [items, setItems] = useState();
  const turned = [];
  const corrects = [];
  let canClick = true;

  let colors = [
    '#7e40e29d',
    '#7e40e29d',
    '#4086e29d',
    '#4086e29d',
    '#4de2409d',
    '#4de2409d',
    '#dcec00ce',
    '#dcec00ce',
    '#ec8600b9',
    '#ec8600b9',
    '#002c12b7',
    '#002c12b7',
    '#2c0000b7',
    '#2c0000b7',
    '#af00a6b7',
    '#af00a6b7',
    '#04cec3b7',
    '#04cec3b7',
    '#fbfbfbb7',
    '#fbfbfbb7'
  ];

  useEffect(() => {
    const array = [];

    for (let key = 0; key < 20; key++) {
      const index = Math.floor(Math.random() * colors.length);
      const color = colors[index];
      colors.splice(index, 1);
      console.log(colors);

      array.push({
        key,
        color
      });
    }
    setItems(array);
  }, []);

  function handleClick({key, color}) {
    const element = document.getElementById(key);

    if (element.classList.contains('turned')) {
      element.removeAttribute('style');
      element.classList.remove('turned');
    } else {
      element.style.backgroundColor = color;
      element.setAttribute('class', 'turned');

      if (turned.length === 0) {
        turned.push({key, color});
      } else {
        canClick = false;

        turned.push({key, color});

        const turned1 = document.getElementById(turned[0].key);
        const turned2 = document.getElementById(turned[1].key);

        setTimeout(() => {
          if (
            turned[0].color === turned[1].color &&
            turned[0].key !== turned[1].key
          ) {
            turned1.style.background = '#fff';
            turned2.style.background = '#fff';
            turned1.style.cursor = 'default';
            turned2.style.cursor = 'default';
            corrects.push(turned[0].key, turned[1].key);
          } else {
            turned1.removeAttribute('style');
            turned1.classList.remove('turned');
            turned2.removeAttribute('style');
            turned2.classList.remove('turned');
          }
          turned.shift();
          turned.shift();

          canClick = true;
        }, 500);
      }
    }
  }

  if (!items) return null;

  return (
    <div className='container'>
      <div className='game-container'>
        {items.map(item => (
          <div
            id={item.key}
            key={item.key}
            onClick={() =>
              !corrects.includes(item.key) && canClick
                ? handleClick(item)
                : null
            }
          ></div>
        ))}
      </div>
    </div>
  );
}

export default App;
