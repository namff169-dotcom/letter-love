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
        if(pin === DEMO_PWD){
          // Success animation: floating hearts + fade, then redirect
          err.textContent = '';
          playSuccessAndRedirect();
        } else {
          err.textContent = 'Mã không đúng'; setTimeout(()=>{ pin=''; err.textContent=''; render(); },800);
        }
      }
    });
  });

  render();
})();

// --- helper: show hearts and fade the phone then navigate ---
function playSuccessAndRedirect(){
  try{
    // create hearts container (re-usable styles from styles.css)
    const hr = document.createElement('div'); hr.id = 'hearts-root'; hr.setAttribute('aria-hidden','true'); document.body.appendChild(hr);
    // spawn hearts for a short burst
    let spawned = 0; const max = 12;
    const iv = setInterval(()=>{
      const h = document.createElement('div'); h.className = 'heart';
      const size = 12 + Math.round(Math.random()*22);
      h.style.width = size + 'px'; h.style.height = size + 'px';
      h.style.left = (10 + Math.random()*80) + '%';
      h.style.opacity = (0.7 + Math.random()*0.3).toString();
      hr.appendChild(h);
      h.addEventListener('animationend', ()=>{ h.remove(); });
      if(++spawned >= max){ clearInterval(iv); }
    }, 120);

    // fade the phone wrapper for a smooth transition
    const phone = document.querySelector('.phone'); if(phone) phone.classList.add('fade-out');

    // finalize after short delay: mark authed and navigate
    setTimeout(()=>{ try{ localStorage.setItem('authed','1'); window.location.href = 'index.html'; }catch(e){ window.location.href = 'index.html'; } }, 900);
  }catch(e){ try{ localStorage.setItem('authed','1'); window.location.href = 'index.html'; }catch(_){ window.location.href = 'index.html'; } }
}
