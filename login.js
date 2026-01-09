// login.js — handles PIN entry on login.html
(function(){
  const pinDisplay = document.getElementById('pin-display');
  const err = document.getElementById('login-error');
  const keys = Array.from(document.querySelectorAll('.key'));
  const DEMO_PWD = '2102';
  let pin = '';

  function render(){
    pinDisplay.innerHTML = '';
    for(let i=0;i<pin.length;i++){ const d = document.createElement('span'); d.className='dot'; pinDisplay.appendChild(d); }
  }

  keys.forEach(k=>{
    k.addEventListener('click', ()=>{
      const v = k.textContent.trim();
      if(v === 'C'){ pin = ''; err.textContent=''; render(); return; }
      if(v === '←'){ pin = pin.slice(0,-1); render(); return; }
      if(pin.length < DEMO_PWD.length) pin += v;
      render();
      if(pin.length === DEMO_PWD.length){
        if(pin === DEMO_PWD){ localStorage.setItem('authed','1'); window.location.href = 'index.html'; }
        else { err.textContent = 'Mã không đúng'; setTimeout(()=>{ pin=''; err.textContent=''; render(); },800); }
      }
    });
  });

  render();
})();
