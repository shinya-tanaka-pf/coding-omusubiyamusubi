// ↓ハンバーガーメニュー

let bodyElement = document.querySelector('.nav-page');
let hamBtn = document.getElementById('btn01');

if (hamBtn) {
    hamBtn.addEventListener('click', function(){
        bodyElement.classList.toggle('open');
    });
}
// ↑ハンバーガーメニュー

// ↓ハンバーガーメニューボタンアニメーション
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.btn-trigger');

    if (btn) {
        btn.addEventListener('click', () => {
          btn.classList.toggle('active');
        });
    }
});
// ↑ハンバーガーメニューボタンアニメーション

// ↓ハンバーガーメニュー展開後のスクロール

let lastY = 0;
const wrapper = document.querySelector('.nav-page-wrapper');

document.addEventListener('scroll', () => {
 const currentY = window.scrollY;
 if (window.innerWidth <= 800){
   if (currentY > lastY) {
     wrapper.style.transform = 'translateY(-400px)';//スクロールすると400px分動く
   } else {
     wrapper.style.transform = 'translateY(0)';
   }
   lastY = currentY;
 }
 else{
     wrapper.style.transform = 'translateY(0)';
 }
 lastY = currentY;
});

// ↑ハンバーガーメニュー展開後のスクロール

// クリッカブルマップ
window.addEventListener('resize', resizeMap);
window.addEventListener('load', resizeMap);

function resizeMap() {
  const img = document.querySelector('.menu-main img');
  const map = document.querySelector('map[name="menu-click-top"]');
  const areas = map.querySelectorAll('area');

  const naturalWidth = img.naturalWidth;
  const currentWidth = img.clientWidth;
  const scale = currentWidth / naturalWidth;

  areas.forEach(area => {
    if (!area.dataset.coords) {
      area.dataset.coords = area.coords;
    }
    const coords = area.dataset.coords
      .split(',')
      .map(c => Math.round(c * scale));
    area.coords = coords.join(',');
  });

  window.addEventListener('click', (e) => {
    modals.forEach(modal => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  })};

// モーダルウィンドウ
const openButtons = document.querySelectorAll('.modalOpen');
const modals = document.querySelectorAll('.easyModal');
const closeButtons = document.querySelectorAll('.modalClose');

openButtons.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    modals[index].style.display = 'block';
  });
});

closeButtons.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    modals[index].style.display = 'none';
  });
});

window.addEventListener('click', (e) => {
  modals.forEach(modal => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});



document.addEventListener('DOMContentLoaded', () => {
  const path = document.querySelector('#mask path');
  const pathSp = document.querySelector('#mask-sp path');

  const pathLength = path ? path.getTotalLength() : 0;
  const pathSpLength = pathSp ? pathSp.getTotalLength() : 0;

  if (path) {
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;
  }
  if (pathSp) {
    pathSp.style.strokeDasharray = pathSpLength;
    pathSp.style.strokeDashoffset = pathSpLength;
  }

  // PC版しきい値
  const pc_s1 = 0.275, pc_s2 = 0.375, pc_s3 = 0.55, pc_s4 = 0.65, pc_s5 = 0.725, pc_s6 = 0.9;

  // スマホ版区間しきい値
  const s1 = 0.175, s2 = 0.29, s3 = 0.55, s4 = 0.60, s5 = 0.85, s6 = 0.925;

  // スマホ版倍率（ΔP＋倍率＋加速方式）
  const multSp = [15, 7.5, 15, 7.5, 15, 7.5, 30];

  const secSp = [
    { start: 0,   end: s1, mult: multSp[0] },
    { start: s1,  end: s2, mult: multSp[1] },
    { start: s2,  end: s3, mult: multSp[2] },
    { start: s3,  end: s4, mult: multSp[3] },
    { start: s4,  end: s5, mult: multSp[4] },
    { start: s5,  end: s6, mult: multSp[5] },
    { start: s6,  end: 1,  mult: multSp[6] },
  ];

  let prevP = 0;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.body.scrollHeight - window.innerHeight;
    const p = scrollHeight > 0 ? Math.min(scrollTop / scrollHeight, 1) : 0;

    // ----------------------
    // PC版（既存）
    // ----------------------
    if (path) {
      let progressPC;
      const baseExp = 0.3;

      if (p < pc_s1) {
        progressPC = Math.pow(pc_s1, 0.2) * (p / pc_s1);
      } else if (p < pc_s2) {
        const t = (p - pc_s1) / (pc_s2 - pc_s1);
        progressPC = Math.pow(pc_s1, baseExp)
                   + (Math.pow(pc_s2, baseExp) - Math.pow(pc_s1, baseExp)) * t * 0.99;
      } else if (p < pc_s3) {
        const t = (p - pc_s2) / (pc_s3 - pc_s2);
        progressPC =
          Math.pow(pc_s2, baseExp)
        + (Math.pow(pc_s3, baseExp) - Math.pow(pc_s2, baseExp)) * Math.pow(t, 1/0.2);
      } else if (p < pc_s4) {
        const t = (p - pc_s3) / (pc_s4 - pc_s3);
        progressPC =
          Math.pow(pc_s3, baseExp)
        + (Math.pow(pc_s4, baseExp) - Math.pow(pc_s3, baseExp)) * Math.pow(t, 1/0.2);
      } else if (p < pc_s5) {
        const t = (p - pc_s4) / (pc_s5 - pc_s4);
        progressPC =
          Math.pow(pc_s4, baseExp)
        + (Math.pow(pc_s5, baseExp) - Math.pow(pc_s4, baseExp)) * Math.pow(t, 1/0.2);
      } else if (p < pc_s6) {
        const t = (p - pc_s5) / (pc_s6 - pc_s5);
        progressPC =
          Math.pow(pc_s5, 0.2)
        + (Math.pow(pc_s6, 0.2) - Math.pow(pc_s5, 0.2)) * t;
      } else {
        const t = (p - pc_s6) / (1 - pc_s6);
        progressPC =
          Math.pow(pc_s6, 0.2)
        + (1 - Math.pow(pc_s6, 0.2)) * t;
      }
      path.style.strokeDashoffset = pathLength * (1 - progressPC);
    }

    // ----------------------
    // スマホ版（ΔP＋倍率＋加速方式）
    // ----------------------
    if (pathSp) {
      let deltaP = p - prevP;
      prevP = p;

      let spProgress = 0;
      for (let i = 0; i < secSp.length; i++) {
        const s = secSp[i];
        if (p >= s.end) {
          spProgress += (s.end - s.start);
        } else if (p > s.start) {
          spProgress += (p - s.start) * s.mult;
          break;
        } else {
          break;
        }
      }

      // ΔPに倍率をかけて加速
      const speedFactor = 1 + 3 * Math.abs(deltaP);
      spProgress = Math.min(spProgress * speedFactor, 1);

      pathSp.style.strokeDashoffset = pathSpLength * (1 - spProgress);
    }
  });

  window.dispatchEvent(new Event('scroll'));
});


// ↑一筆書き