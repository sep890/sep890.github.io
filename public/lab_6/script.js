// You may wish to find an effective randomizer function on MDN.

function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

function sortByKey(a, b, key) {
  if (a[key] < b[key]) {
    return 1;
  } if (a[key] > b[key]) {
    return -1;
  }
  return 0;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  // both min and max are inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray(); // here we're using jQuery to serialize the form
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((fromServer) => {
      // You're going to do your lab work in here. Replace this comment.
      if (document.querySelector('.flex-inner')){
        document.querySelector('.flex-inner').remove();
      }
      const arr1 = range(10);
      const arr2 = arr1.map(() => {
        const num = getRandomIntInclusive(0, 243);
        return fromServer[num];
      });
      
      const reverseList = arr2.sort((org, compare) => sortByKey(org, compare, 'name'));
      const ol = document.createElement('ol');
      ol.className = 'flex-inner';
      $('form').prepend(ol) ;

      reverseList.forEach((el, i) => {
        const li = document.createElement('li');
        $(li).append(`<input type="checkbox" value=${el.code} id=${el.code} />`);
        $(li).append(`<label for=${el.code}> ${el.name} </label>`);
        $(ol).append(li);

      });

    })
    .catch((err) => console.log(err));
});