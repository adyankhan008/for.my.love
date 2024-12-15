window.requestAnimationFrame =
  window.__requestAnimationFrame ||
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  (function () {
    return function (callback, element) {
      const currTime = Date.now();
      const timeToCall = Math.max(1, 33 - (currTime - (element?.___lastTime || 0)));
      window.setTimeout(callback, timeToCall);
      element.___lastTime = currTime + timeToCall;
    };
  })();

window.isDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  (navigator.userAgent || navigator.vendor || window.opera).toLowerCase()
);

let loaded = false;
const init = function () {
  if (loaded) return;
  loaded = true;

  const mobile = window.isDevice;
  const koef = mobile ? 0.5 : 1;

  const canvas = document.getElementById('heart');
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = koef * window.innerWidth);
  let height = (canvas.height = koef * window.innerHeight);
  const rand = Math.random;

  ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  ctx.fillRect(0, 0, width, height);

  const heartPosition = function (rad) {
    return [
      Math.pow(Math.sin(rad), 3),
      -(15 * Math.cos(rad) - 5 * Math.cos(2 * rad) - 2 * Math.cos(3 * rad) - Math.cos(4 * rad)),
    ];
  };

  const scaleAndTranslate = function (pos, sx, sy, dx, dy) {
    return [dx + pos[0] * sx, dy + pos[1] * sy];
  };

  window.addEventListener('resize', function () {
    width = canvas.width = koef * window.innerWidth;
    height = canvas.height = koef * window.innerHeight;
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(0, 0, width, height);
  });

  const traceCount = mobile ? 20 : 50;
  const pointsOrigin = [];
  let dr = mobile ? 0.3 : 0.1;

  for (let i = 0; i < Math.PI * 2; i += dr) {
    pointsOrigin.push(scaleAndTranslate(heartPosition(i), 210, 13, 0, 0));
  }

  const heartPositionCount = pointsOrigin.length;
  const targetPoints = [];
  const pulse = function (kx, ky) {
    for (let i = 0; i < pointsOrigin.length; i++) {
      targetPoints[i] = [];
      targetPoints[i][0] = kx * pointsOrigin[i][0] + width / 2;
      targetPoints[i][1] = ky * pointsOrigin[i][1] + height / 2;
    }
  };

  const e = [];
  for (let i = 0; i < heartPositionCount; i++) {
    const x = rand() * width;
    const y = rand() * height;
    e[i] = {
      vx: 0,
      vy: 0,
      r: 2,
      speed: rand() + 5,
      q: ~~(rand() * heartPositionCount),
      d: 2 * (i % 2) - 1,
      force: 0.2 * rand() + 0.7,
      f: `hsla(0, ${~~(40 * rand() + 60)}%, ${~~(60 * rand() + 20)}%, .3)`,
      trace: [],
    };
    for (let k = 0; k < traceCount; k++) e[i].trace[k] = { x, y };
  }

  const config = {
    traceK: 0.4,
    timeDelta: 0.01,
  };

  let time = 0;
  const loop = function () {
    const n = -Math.cos(time);
    pulse((1 + n) * 0.5, (1 + n) * 0.5);

    time += ((Math.sin(time) < 0 ? 1 : n > 0.8 ? 0.2 : 1) * config.timeDelta);

    ctx.fillStyle = 'rgba(0, 0, 0, .1)';
    ctx.fillRect(0, 0, width, height);

    for (let i = e.length; i--;) {
      const u = e[i];
      const q = targetPoints[u.q];
      const dx = u.trace[0].x - q[0];
      const dy = u.trace[0].y - q[1];
      const length = Math.sqrt(dx * dx + dy * dy);

      if (10 > length) {
        if (0.95 < rand()) {
          u.q = ~~(rand() * heartPositionCount);
        } else if (0.99 < rand()) {
          u.d *= -1;
        }
        u.q += u.d;
        u.q %= heartPositionCount;
        if (u.q < 0) u.q += heartPositionCount;
      }

      u.vx += (-dx / length) * u.speed;
      u.vy += (-dy / length) * u.speed;
      u.trace[0].x += u.vx;
      u.trace[0].y += u.vy;
      u.vx *= u.force;
      u.vy *= u.force;

      for (let k = 0; k < u.trace.length - 1; k++) {
        const t = u.trace[k];
        const n = u.trace[k + 1];
        n.x -= config.traceK * (n.x - t.x);
        n.y -= config.traceK * (n.y - t.y);
      }

      ctx.fillStyle = u.f;
      for (let k = 0; k < u.trace.length; k++) {
        ctx.fillRect(u.trace[k].x, u.trace[k].y, 1, 1);
      }
    }
    window.requestAnimationFrame(loop);
  };

  loop();
};

if (document.readyState === 'complete') init();
else document.addEventListener('DOMContentLoaded', init, false);
