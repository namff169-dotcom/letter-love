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
        startTyping("Dear Ebe,Cảm ơn ebe rất nhiều! Vì đã làm cho ngày sinh nhật của anh trở nên đặc biệt hơn bao giờ hết. Những lời chúc, sự quan tâm và tình cảm của em dành cho anh khiến anh cảm thấy thật may mắn vô cùng vì luôn có em ở bên cạnh. Anh luôn trân trọng từng khảnh khắc mà ebe mang đến, từ những điều nhỏ nhất đến những điều ebe đã âm thầm chuẩn bị vì anh. Nhờ có ebe mà ngày hôm nay không chỉ là sinh nhật, mà còn là một ngày kỷ niệm đẹp, ấm áp và đầy yêu thương. Cảm ơn ebe vì đã xuất hiện trong cuộc đời anh. Anh mong rằng từ đây cho tới 1000 tuổi, lúc nào anh cũng được đón sinh nhật cùng ebe. Anh yêu ebe nhiều vô cùng. Và ebe nè, nhớ hứa với anh là mỗi năm đều chuẩn bị quà sinh nhật cho anh nha, tới năm 1000 tuổi luôn đó, không được quên đâu nhaaaa. Cảm ơn ebe vì tất cả ạ Ebe ơi, abe muốn gửi tới ebe một lời xin lỗi chân thành đến em. Nhiều lúc abe hành xử không đúng thật, làm ebe buồn, làm ebe nản, nhưng abe cũng rất cố gắng và xin lỗi chân thành đến ebe ạ. Anh biết là anh làm ebe buồn gì đó sẽ khiến ebe khó quên được và sẽ khắc mãi trong lòng ạ, bản thân anh cũng không muốn như vậy đâu ạ, cũng có rất nhiều lời hứa được nói ra từ anh rồi, nhưng mà chính bản thân anh cũng biết là anh không giữ được lời hứa đó, anh thay đổi đó nhưng sau một thời gian đâu rồi cũng vào đó ạ. Những điều đó khiến ebe mất niềm tin mà còn làm tổn thương tình cảm quý giá của anh và ebe nữa. Anh rất tự trách bản thân mình ạ, anh đã biết ebe suy nghĩ nhiều nhưng vì sự vô tâm anh lại quên đi mất điều đó. Nhưng có một điều anh luôn chắc chắn rằng, đó chính là anh yêu em, nhiều hơn ebe nghĩ ạ. Ebe ơi, đừng giận anh nữa nha, anh sẽ như những ngày đầu mình mới yêu, có lại sự kiên nhẫn để chịu lắng nghe những lời ebe nói, đủ sự quan tâm để em có cảm giác luôn an toàn. Bởi vì em chính là điều đẹp nhất trong cuộc đời anh. Anh có những đêm ngồi một mình, lặng lẽ vậy đó, nhiều lúc ngồi đó tự khóc, cũng chẳng biết than thở với ai. Anh giấu đi những mệt mỏi, những tổn thương, chỉ để ebe thấy anh luôn điềm tĩnh và mạnh mẽ. Nhưng ngay cả em, người mà anh từng nghĩ em sẽ hiểu, sẽ đồng cảm cũng không bao giờ cảm nhận được những gì anh chịu đựng. Trong mắt mọi người, anh là kẻ xấu, vô duyên, là một người đáng trách. Và ngày trong mắt em, anh thấy anh cũng không ngoại lệ. Thế nhưng ebe đâu biết rằng, những cái ebe cho anh là sai, là xấu, là đáng trách lại là cả một trái tim yêu em theo cách vụng về nhất. Anh mệt mỏi, nhưng anh vẫn không thể ngừng thường, nhiều lúc anh cũng có bày tỏ với em, nhưng có lẽ em nghĩ anh kiếm cớ để mình cãi nhau, nhiều lần như vậy khiến anh không còn tự tin vào chính bản thân mình nữa, nên anh không kể lể về những uất ức và không cam lòng của anh cho em nghe nữa, anh thấy anh nên im lặng là cách tốt nhất. Ebe biết không, đôi lúc mình nên nhìn nhận lại sự việc, để mình nhìn vào đó và xem thử câu chuyện đó mình như thế nào, sẽ có nhưng lúc abe sai và cũng sẽ có nhưng lúc ebe sai, nhưng điều đó không chứng tỏ là cả hai đều sai hoàn toàn, mà cái sai nhất là mình không nhìn nhận lại, để nói ra lời xin lỗi và dỗ dành đối phương. Người yêu mình mà, một câu xin lỗi, một chút dỗ dành cũng không khiến mình chết đi, một chút quan tâm, một chút yêu thương nó không xấu mà nó làm cho tình yêu của mình trở nên gắn kết hơn. Nhưng mà sau những lời nói trên, abe muốn nói với ebe điều này, một lời nói từ tận trong lòng anh: Anh không hứa sẽ cho em cả thế giới, nhưng anh hứa anh sẽ dành cả thế giới của mình để yêu thương em. Vậy nên anh sẽ luôn là người nắm tay em, cho dù ngày đó là ngày nắng hay ngày mưa, là ngày vui hay ngày buồn, khi ebe cảm thấy mệt mỏi anh sẽ ôm ebe thật lâu để ebe biết rằng, vẫn sẽ luôn có một nơi để em trở về, hay tin rằng tình yêu của anh không phải nhưng lời nói suôn mà đó là những lời nhỏ bé nhất anh muốn dành cho em mỗi ngày. Cho dù thế giới này có thay đổi như thế nào, thì anh luôn hứa tình yêu anh dành cho em sẽ luôn vẹn nguyên như những ngày đầu. Yêu ebeee của anh nhiều nhắm ạ Anh viết lá thư này, muốn nói ra những cảm nhận của anh và để ebe hiểu anh hơn, anh không trách móc ebe, anh muốn gửi lời cảm ơn đến ebe và lời xin lỗi chân thành gửi tới ebe ạ. Yêu ebe iuuu của anh nhiều nhắm ạ. Trần Văn Sơn Nam (Abe)");
      };
      letter.addEventListener('animationend', onEnd);
    }, 650);
  });

  function startTyping(text){
    typedEl.textContent = '';
    nextBtn.classList.add('hidden');
    let i=0; const speed=28;
    const t = setInterval(()=>{
      typedEl.textContent += text[i++] || '';
      if(i>text.length){ clearInterval(t); nextBtn.classList.remove('hidden'); }
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

  // login/logout is handled by login.html; back-to-camera button remains below as footer

  function renderFlipPage(){
    cardsWrap.innerHTML = '';
    const allowed = state.allowedCards || 0;
    if(allowed === 1){
      flipInfo.textContent = 'Vì thiếu cup nên ebe chỉ được 1 món quà.';
    } else {
      flipInfo.textContent = `Ebe được phép lật ${allowed} thẻ.`;
    }
    // Always render 3 cards visually, but only 'allowed' number are flippable
    for(let i=0;i<3;i++){
      const cardWrap = document.createElement('div'); cardWrap.style.display='flex'; cardWrap.style.flexDirection='column'; cardWrap.style.alignItems='center';
      const card = document.createElement('div'); card.className='card';
      const inner = document.createElement('div'); inner.className='card-inner';
      const front = document.createElement('div'); front.className='card-face card-front'; front.textContent = '??';
      const back = document.createElement('div'); back.className='card-face card-back';

      // prefer assigned image, else fallback to photo index
      const assigned = state.cardAssignment[i];
      // show emoji icons on the back instead of photos
      const icons = ['💐','🎂','💄'];
      const span = document.createElement('div'); span.className = 'card-emoji'; span.textContent = icons[i] || '🎁'; span.style.fontSize='34px'; back.appendChild(span);

      inner.appendChild(front); inner.appendChild(back); card.appendChild(inner);

      // conditional flipping behaviour:
      // - if allowed === 3 -> any card can flip
      // - if allowed === 1 -> user may flip any single card (only one flipped at a time)
      ((idx)=>{
        card.addEventListener('click', ()=>{
              const currentlyFlipped = cardsWrap.querySelectorAll('.card.flipped').length;
              if(allowed === 3){
                // allow toggle both ways
                card.classList.toggle('flipped');
                return;
              }
              if(allowed === 1){
                // allow flipping any one card, but once flipped it becomes permanent and other cards locked
                if(card.classList.contains('flipped')){
                  // already flipped - do nothing (one-way)
                  return;
                }
                // not flipped yet
                if(currentlyFlipped === 0){
                  card.classList.add('flipped');
                  // mark as opened permanent
                  card.dataset.opened = '1';
                  // lock all other cards
                  Array.from(cardsWrap.querySelectorAll('.card')).forEach((c,ci)=>{ if(ci !== idx) { c.classList.add('locked'); } });
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
      // thumbnails under cards removed per UI request
      cardsWrap.appendChild(cardWrap);
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
