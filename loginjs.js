  /* ---------- particle constellation ---------- */
  const canvas = document.getElementById('net');
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];
  const COUNT = 70;

  function resize(){
    const stage = canvas.parentElement.getBoundingClientRect();
    w = canvas.width = stage.width;
    h = canvas.height = stage.height;
  }
  function init(){
    particles = Array.from({length: COUNT}, () => ({
      x: Math.random()*w, y: Math.random()*h,
      vx: (Math.random()-0.5)*0.35, vy: (Math.random()-0.5)*0.35,
      r: Math.random()*1.6 + 0.6
    }));
  }
  function step(){
    ctx.clearRect(0,0,w,h);
    for(const p of particles){
      p.x += p.vx; p.y += p.vy;
      if(p.x < 0 || p.x > w) p.vx *= -1;
      if(p.y < 0 || p.y > h) p.vy *= -1;
    }
    for(let i=0;i<particles.length;i++){
      const a = particles[i];
      ctx.beginPath();
      ctx.arc(a.x, a.y, a.r, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(111,198,255,0.55)';
      ctx.fill();
      for(let j=i+1;j<particles.length;j++){
        const b = particles[j];
        const dx = a.x-b.x, dy = a.y-b.y;
        const dist = Math.sqrt(dx*dx+dy*dy);
        if(dist < 130){
          ctx.beginPath();
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(155,123,255,${0.14 * (1 - dist/130)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(step);
  }
  window.addEventListener('resize', ()=>{ resize(); init(); });
  resize(); init(); step();

  /* ---------- 3D tilt on card ---------- */
  const card = document.getElementById('tiltCard');
  const panel = document.querySelector('.panel');
  panel.addEventListener('mousemove', (e)=>{
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateY(${x*10}deg) rotateX(${-y*10}deg)`;
  });
  panel.addEventListener('mouseleave', ()=>{
    card.style.transform = 'rotateX(0) rotateY(0)';
  });

  /* ---------- form interactions ---------- */
  const form = document.getElementById('loginForm');
  const btn = document.getElementById('submitBtn');
  const errorEl = document.getElementById('error');

  btn.addEventListener('click', function(e){
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
    btn.appendChild(ripple);
    setTimeout(()=> ripple.remove(), 650);
  });

  form.addEventListener('submit', function(e){
    e.preventDefault();
    errorEl.classList.remove('show');
    btn.classList.add('loading');
    setTimeout(()=>{
      btn.classList.remove('loading');
      errorEl.classList.add('show');
    }, 900);
  });