// App script for the multi-page demo
(function(){
  // Simple router: show/hide pages
  const pages = {
    envelope: document.getElementById('page-envelope'),
    camera: document.getElementById('page-camera'),
    flip: document.getElementById('page-flip')
  };

  const state = { photos: [], allowedCards: 0, cardAssignment: [null, null, null] };

  function show(page){
    // remove active from all and show the requested page
    Object.values(pages).forEach(p=>p.classList.remove('active'));
    pages[page].classList.add('active');
    // no internal login page any more; auth is handled by login.html
    // If leaving envelope page, make sure envelope is closed and letter hidden so it won't overlap other pages
    if(page !== 'envelope'){
      try{
        const envEl = document.getElementById('envelope');
        const letterEl = document.getElementById('letter');
        if(envEl){ envEl.classList.remove('open'); envEl.classList.add('closed'); }
        if(letterEl){ letterEl.classList.remove('show'); letterEl.classList.add('hidden'); }
      }catch(e){ /* ignore */ }
    }
  }

  // login behavior moved to login.html/login.js. app.js now expects an auth flag in localStorage.

  // ===== Page 2: Envelope =====
  const env = document.getElementById('envelope');
  const letter = document.getElementById('letter');
  const typedEl = document.getElementById('typed-text');
  const nextBtn = document.getElementById('next-from-envelope');

  env.addEventListener('click', ()=>{
    if(env.classList.contains('open')) return;
    env.classList.remove('closed'); env.classList.add('open');
    // reveal letter after flap opens, with a pull-out animation; typing only starts after pull finishes
    setTimeout(()=>{
      letter.classList.remove('hidden'); letter.classList.add('show');
      // compute horizontal centering relative to envelope and trigger pull animation
      try{
        // ensure letter is appended inside env and compute left offset
        const envRect = env.getBoundingClientRect();
        const letterRect = letter.getBoundingClientRect();
        // position letter absolutely inside env: center it
        const leftPx = Math.max(0, (env.clientWidth - letter.offsetWidth) / 2);
        letter.style.left = leftPx + 'px';
      }catch(e){}
      // trigger pull animation
      letter.classList.remove('pull'); // reset
      // force reflow so animation can replay
      void letter.offsetWidth;
      letter.classList.add('pull');
      // when pull animation ends, start typing
      const onEnd = (ev)=>{
        if(ev.animationName && ev.animationName.indexOf('pullOut')===-1) return; // ignore other animations
        letter.removeEventListener('animationend', onEnd);
        // ensure left is final (recompute in case sizes changed)
        try{ const leftPx = Math.max(0, (env.clientWidth - letter.offsetWidth) / 2); letter.style.left = leftPx + 'px'; }catch(e){}
        startTyping("Dear my True love, người anh thương! Chúc mừng sinh nhật ebe iuuu nhé, đây là năm thứ 2 anh ở cạnh bé cùng nhau đón sinh nhật tuổi 21 của ebe iuuu nà, abe vui lắm ạ, Chúc ebe tuổi mới, đón sinh nhật dịu dàng luôn tươi cười như chính ánh mắt của bé và nụ cười của bé. Anh không giỏi lời hoa mỹ, nhưng anh luôn mong muốn bé luôn hạnh phúc không chỉ ngày hôm nay mà còn những ngày sau nữa. Và anh biết cuộc sống cũng chả dễ dàng gì, đặc biệt là ebe iuuu của anh. Nhưng ebe cố lên nhé, cố gắng tiếp tục ước mơ, sở thích, vươn tới những mục tiêu lớn lao và luôn cảm thấy hạnh phúc với những gì mình có, abe sẽ luôn ở bên ebe iuuu, hỗ trợ và yêu thương em không chỉ trong nhưng ngày vui mà còn trong những lúc khó khăn, để chúng ta cùng nhau vượt qua tất cả hôm nay là ngày đặc biệt abe chỉ mong ebe cảm nhận được tình yêu anh dành cho em không chỉ trong nhưng lời nói mà còn trong từng hành động. Ebe biết không, anh muốn mỗi ngày có em, mỗi giờ có em, mỗi phút có em và mỗi giây đều có em. Anh muốn được mãi gọi em là ebe iuuu, anh không muốn mất bé vì anh thương bé rất nhiều, thương đến nỗi muốn cùng em đi qua 4 mùa, muốn em sẽ là người năm cạnh bên sau này, muốn thấy được dáng vẻ hạnh phúc của em, muốn được ở bên ebe lâu thật lâu. Anh biết, anh còn những thiếu sót, những vụn về trong cách cử sử với bé. Nhưng ebe thấy, anh cũng đã cố gắng để thay đổi và cố gắng rất nhiều để hiểu ebe hơn, anh chỉ muốn được cạnh bé và chăm sóc cho bé và anh luôn sẳn sàng để đến bên cạnh ebe để bù đắp cho bé những gì bé xứng đáng có được. Vì Tình cảm của anh dành cho bé anh chưa từng đùa giởn, anh luôn là thật lòng, mong ebe nhẹ nhàng nhắc nhở và đưa ra lời khuyên để giúp anh sửa lỗi. Đơn giản vì anh muốn được ở cạnh ebe, che chở ebe và yêu thương ebe trọn vẹn từng ngày. Anh yêu bé 💗💗💗");
        // start ambient effects and music on first user gesture
        try{ startHearts(); startBgm(); }catch(e){}
      };
      letter.addEventListener('animationend', onEnd);
    }, 650);
  });

  function startTyping(text){
    typedEl.textContent = '';
    nextBtn.classList.add('hidden');
    // ensure the typed container starts scrolled to top
    try{ typedEl.scrollTop = 0; }catch(e){}
    let i=0; const speed=48;
    const t = setInterval(()=>{
      if(i < text.length){
  typedEl.textContent += text[i++];
  // auto-scroll to keep the newest text visible (use smooth scrolling)
  try{ if(typeof typedEl.scrollTo === 'function') typedEl.scrollTo({ top: typedEl.scrollHeight, behavior: 'smooth' }); else typedEl.scrollTop = typedEl.scrollHeight; }catch(e){}
        return;
      }
      // finished typing
      clearInterval(t);
  try{ if(typeof typedEl.scrollTo === 'function') typedEl.scrollTo({ top: typedEl.scrollHeight, behavior: 'smooth' }); else typedEl.scrollTop = typedEl.scrollHeight; }catch(e){}
      nextBtn.classList.remove('hidden');
    }, speed);
  }

  nextBtn.addEventListener('click', ()=>{ show('camera'); initCamera(); });

  // ===== Page 3: Camera / Upload =====
  const video = document.getElementById('video');
  const captureBtn = document.getElementById('capture-btn');
  const fileInput = document.getElementById('file-input');
  const thumbs = document.getElementById('thumbs');
  const photoCount = document.getElementById('photo-count');
  const finishBtn = document.getElementById('finish-btn');

  let stream = null;
  async function initCamera(){
    try{
      stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio:false });
      video.srcObject = stream;
    }catch(e){
      console.warn('Camera not available, you can still upload images.');
    }
  }

  function updateUI(){
    photoCount.textContent = state.photos.length;
    thumbs.innerHTML = '';
    state.photos.forEach((d,idx)=>{
      const wrap = document.createElement('div');
      wrap.className = 'thumb-item' + (idx === state.photos.length-1 ? ' latest' : '');
      const img = document.createElement('img'); img.src = d; img.alt = `Photo ${idx+1}`;
      const badge = document.createElement('span'); badge.className = 'badge'; badge.textContent = `${idx+1}/6`;
      wrap.appendChild(img);
      wrap.appendChild(badge);
      thumbs.appendChild(wrap);
    });
    finishBtn.disabled = state.photos.length < 4;
    // if 6 photos reached, auto-direct to flip page with 3 cards
    if(state.photos.length >= 6){
      state.allowedCards = 3; show('flip'); renderFlipPage();
      // stop camera
      stopCamera();
    }
    // if currently on flip page, re-render it so assignments/thumbnails update
    if(pages.flip.classList.contains('active')) renderFlipPage();
  }

  captureBtn.addEventListener('click', ()=>{
    if(!stream){ alert('Camera chưa sẵn sàng. Hãy tải ảnh lên thay thế.'); return; }
    // create an offscreen canvas dynamically (canvas element was removed from DOM)
    const w = video.videoWidth, h = video.videoHeight;
    const off = document.createElement('canvas'); off.width = w; off.height = h;
    const ctx = off.getContext('2d'); ctx.drawImage(video, 0,0,w,h);
    const data = off.toDataURL('image/jpeg', 0.9);
    if(state.photos.length < 6){ state.photos.push(data); updateUI(); }
  });

  fileInput.addEventListener('change', (ev)=>{
    const files = Array.from(ev.target.files).slice(0, 6-state.photos.length);
    files.forEach(f=>{
      const r = new FileReader(); r.onload = ()=>{ state.photos.push(r.result); updateUI(); }; r.readAsDataURL(f);
    });
    fileInput.value = '';
  });

  finishBtn.addEventListener('click', ()=>{
    // If user has 4-5 photos -> allow 1 card; if less than 4 can't proceed (button disabled)
    if(state.photos.length >=4 && state.photos.length < 6){ state.allowedCards = 1; show('flip'); renderFlipPage(); stopCamera(); }
  });

  function stopCamera(){ if(stream){ stream.getTracks().forEach(t=>t.stop()); stream=null; video.srcObject=null; } }

  // ===== Page 4: Flip cards =====
  const cardsWrap = document.getElementById('cards');
  const flipInfo = document.getElementById('flip-info');
  const backToCamera = document.getElementById('back-to-camera');
  const heartsRoot = document.getElementById('hearts-root');
  let heartsInterval = null;
  let bgmState = { started: false, intervalId: null, audioCtx: null };
  const logoutBtn = null; // removed — login is separate

  backToCamera.addEventListener('click', ()=>{
    // allow user to retake: clear photos and reset allow
    state.photos = [];
    state.allowedCards = 0;
    state.cardAssignment = [null, null, null];
    updateUI();
    show('camera');
    initCamera();
  });

  // Start falling hearts (mưa trái tim)
  function startHearts(){
    if(!heartsRoot) return;
    if(heartsInterval) return;
    heartsInterval = setInterval(()=>{
      const h = document.createElement('div');
      h.className = 'heart';
      const size = 12 + Math.round(Math.random()*20);
      h.style.width = size + 'px'; h.style.height = size + 'px';
      h.style.left = (Math.random()*90) + '%';
      h.style.opacity = (0.6 + Math.random()*0.4).toString();
      heartsRoot.appendChild(h);
      h.addEventListener('animationend', ()=>{ h.remove(); });
    }, 700);
  }

  // Simple background music using WebAudio (starts on first user gesture)
  function startBgm(){
    if(bgmState.started) return; bgmState.started = true;
    try{
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext(); bgmState.audioCtx = ctx;
      const master = ctx.createGain(); master.gain.value = 0.04; master.connect(ctx.destination);
      const playChord = ()=>{
        const now = ctx.currentTime;
        const freqs = [261.63, 329.63, 392.00]; // C major
        freqs.forEach((f, i)=>{
          const o = ctx.createOscillator(); const g = ctx.createGain();
          o.type = 'sine'; o.frequency.value = f * (i===1?1.0: (i===2?0.5:1));
          g.gain.value = 0.0001; g.gain.linearRampToValueAtTime(0.06, now+0.02); g.gain.exponentialRampToValueAtTime(0.0001, now+1.6);
          o.connect(g); g.connect(master);
          o.start(now); o.stop(now+1.6);
        });
      };
      playChord();
      bgmState.intervalId = setInterval(playChord, 1800);
    }catch(e){ console.warn('BGM not available', e); }
  }

  // login/logout is handled by login.html; back-to-camera button remains below as footer

  function renderFlipPage(){
    cardsWrap.innerHTML = '';
    const allowed = state.allowedCards || 0;
    if(allowed === 1){
      flipInfo.textContent = 'Vì thiếu cup nên ebe chỉ được 1 món quà.';
    } else {
      flipInfo.textContent = `Ebe được phép lật ${allowed} thẻ.`;
    }
  // Always render 3 cards visually.
  // If the user has uploaded exactly 4 photos, enter "cake mode":
  // when a card is flipped it will reveal the cake icon (but we still show 3 cards).
  // Also treat the 5-photo case similarly: when 5 photos are present, flipping any card should reveal the cake only.
  const numCards = 3;
  const specialCakeMode = (state.photos.length === 4 || state.photos.length === 5);
  const icons = ['💐','🎂','💄'];

  for(let i=0;i<numCards;i++){
      const cardWrap = document.createElement('div'); cardWrap.style.display='flex'; cardWrap.style.flexDirection='column'; cardWrap.style.alignItems='center';
      const card = document.createElement('div'); card.className='card';
      const inner = document.createElement('div'); inner.className='card-inner';
      const front = document.createElement('div'); front.className='card-face card-front'; front.textContent = '??';
      const back = document.createElement('div'); back.className='card-face card-back';

      const span = document.createElement('div'); span.className = 'card-emoji'; span.textContent = icons[i] || '🎁'; span.style.fontSize='34px'; back.appendChild(span);

      inner.appendChild(front); inner.appendChild(back); card.appendChild(inner);

      ((idx)=>{
        card.addEventListener('click', ()=>{
              const currentlyFlipped = cardsWrap.querySelectorAll('.card.flipped').length;
              // If in full-flip mode (allowed === 3) allow toggling both ways.
              if(allowed === 3){
                // In special cake mode, when a card is flipped to show its back,
                // ensure the back displays the cake icon for that card (auto-reveal cake on flip).
                if(specialCakeMode && !card.classList.contains('flipped')){
                  // set the back content to cake before flipping
                  const backFace = card.querySelector('.card-back');
                  if(backFace){ backFace.textContent = ''; const cake = document.createElement('div'); cake.className='card-emoji'; cake.textContent='🎂'; cake.style.fontSize='34px'; backFace.appendChild(cake); }
                }
                card.classList.toggle('flipped');
                checkAllFlipped();
                return;
              }
              // Single-flip mode: allow one permanent flip
              if(allowed === 1){
                if(card.classList.contains('flipped')){ return; }
                if(currentlyFlipped === 0){
                  if(specialCakeMode){
                    const backFace = card.querySelector('.card-back');
                    if(backFace){ backFace.textContent = ''; const cake = document.createElement('div'); cake.className='card-emoji'; cake.textContent='🎂'; cake.style.fontSize='34px'; backFace.appendChild(cake); }
                  }
                  card.classList.add('flipped'); card.dataset.opened='1';
                  Array.from(cardsWrap.querySelectorAll('.card')).forEach((c,ci)=>{ if(ci !== idx) { c.classList.add('locked'); } });
                  checkAllFlipped();
                } else {
                  card.classList.add('locked'); setTimeout(()=>card.classList.remove('locked'), 300);
                }
                return;
              }
              // default: no flips allowed
              card.classList.add('locked'); setTimeout(()=>card.classList.remove('locked'), 300);
        });
      })(i);

      cardWrap.appendChild(card);
      cardsWrap.appendChild(cardWrap);
    }
    // after initial render, check if auto-flipped made all flipped
    setTimeout(checkAllFlipped, 40);
  }

  function checkAllFlipped(){
    const cards = cardsWrap.querySelectorAll('.card');
    if(!cards || cards.length===0) return;
    const flipped = cardsWrap.querySelectorAll('.card.flipped').length;
    const total = cards.length;
    const footer = document.querySelector('.flip-footer');
    if(flipped >= total){
      // all flipped -> show message and hide back button
      flipInfo.textContent = 'Vui lòng liên hệ Abe để được nhận thẻ';
      if(backToCamera) backToCamera.style.display = 'none';
      if(footer && !footer.querySelector('.flip-done-msg')){
        const m = document.createElement('div'); m.className = 'flip-done-msg muted'; m.style.textAlign='center'; m.style.padding='10px 0'; m.textContent = 'Vui lòng liên hệ Abe để được nhận thẻ'; footer.appendChild(m);
      }
    } else {
      // not all flipped -> ensure back button visible and remove done message
      if(backToCamera) backToCamera.style.display = '';
      if(footer){ const m = footer.querySelector('.flip-done-msg'); if(m) m.remove(); }
    }
  }

  // Expose simple nav for development
  window.app = { show, state };
  // Safe initialization: require auth (login.html) and prepare app
  function initApp(){
    // if not authed, redirect to login page
    if(!localStorage.getItem('authed')){ window.location.href = 'login.html'; return; }
    stopCamera();
    state.photos = [];
    state.allowedCards = 0;
    state.cardAssignment = [null, null, null];
    try{ selectedPhotoIndex = null; }catch(e){}
    if(document.querySelectorAll('.assign-thumbs').length) document.querySelectorAll('.assign-thumbs').forEach(n=>n.remove());
    // move letter inside envelope so absolute positioning centers relative to the envelope
    try{
      if(env && letter && letter.parentElement !== env){ env.appendChild(letter); }
    }catch(e){}
    // ensure envelope is in closed/hidden state when starting
    try{ if(env){ env.classList.remove('open'); env.classList.add('closed'); } if(letter){ letter.classList.remove('show'); letter.classList.remove('pull'); letter.classList.add('hidden'); } }catch(e){}
    updateUI();
    // start on envelope screen
    show('envelope');
  }

  // Start the app
  initApp();

})();
