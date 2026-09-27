/* Generator — "Production line": slabs travel a conveyor through six stations; the camera tracks alongside. */
import { THREE, makeRenderer, disposeAll, damp, smooth, makeEnvironment, dotTexture } from './util.js';

export async function create({ host, canvas, quality, env, width, height }) {
  const renderer = makeRenderer(canvas, quality, { exposure: 1.05 });
  const scene = new THREE.Scene(); scene.fog = new THREE.Fog(0x050505, 9, 30); scene.environment = makeEnvironment(renderer, { red: .6 }); scene.environmentIntensity = .7;
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(140, 80), new THREE.MeshBasicMaterial({ color: 0x070709 })); ground.rotation.x = -Math.PI / 2; ground.position.y = -1.3; scene.add(ground);
  const grid = new THREE.GridHelper(140, 70, 0x1c1c22, 0x111115); grid.position.y = -1.29; scene.add(grid);
  const camera = new THREE.PerspectiveCamera(36, width / height, .1, 60);

  const LEN = 36; // conveyor length along x
  // belt
  const belt = new THREE.Mesh(new THREE.BoxGeometry(LEN + 6, .12, 2.2), new THREE.MeshStandardMaterial({ color: 0x0f0f11, metalness: .9, roughness: .5 })); belt.position.y = -.06; scene.add(belt);
  const frameMat = new THREE.MeshStandardMaterial({ color: 0x242429, metalness: .82, roughness: .38 });
  [-.82, .82].forEach((z) => { const beam = new THREE.Mesh(new THREE.BoxGeometry(LEN + 4, .1, .1), frameMat); beam.position.set(0, -.28, z); scene.add(beam); });
  for (let s = 0; s < 6; s++) {
    const x = -LEN / 2 + 2 + s * (LEN - 4) / 5;
    [-.82, .82].forEach((z) => {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(.1, 1.0, .1), frameMat); leg.position.set(x, -.78, z); scene.add(leg);
      const foot = new THREE.Mesh(new THREE.BoxGeometry(.38, .06, .3), frameMat); foot.position.set(x, -1.24, z); scene.add(foot);
    });
  }
  const rails = [-1.15, 1.15].map((z) => { const r = new THREE.Mesh(new THREE.BoxGeometry(LEN + 6, .06, .06), new THREE.MeshStandardMaterial({ color: 0xff2438, emissive: 0xff2438, emissiveIntensity: .8 })); r.position.set(0, .05, z); scene.add(r); return r; });
  // belt texture: ridge lines
  const ridges = new THREE.InstancedMesh(new THREE.BoxGeometry(.03, .02, 2.1), new THREE.MeshBasicMaterial({ color: 0x232328 }), 90);
  { const m = new THREE.Matrix4(); for (let i = 0; i < 90; i++) { m.setPosition(-LEN / 2 - 3 + i * (LEN + 6) / 90, .01, 0); ridges.setMatrixAt(i, m); } }
  scene.add(ridges);
  // stations: gantries
  const STATIONS = 6; const gantries = [];
  const gMat = new THREE.MeshStandardMaterial({ color: 0x34343b, metalness: .72, roughness: .34 });
  for (let s = 0; s < STATIONS; s++) {
    const g = new THREE.Group(); const x = -LEN / 2 + 2 + s * (LEN - 4) / (STATIONS - 1);
    const l = new THREE.Mesh(new THREE.BoxGeometry(.14, 2.4, .14), gMat); l.position.set(0, 1.2, -1.5);
    const r = l.clone(); r.position.z = 1.5;
    const top = new THREE.Mesh(new THREE.BoxGeometry(.6, .14, 3.2), gMat); top.position.set(0, 2.4, 0);
    const lamp = new THREE.Mesh(new THREE.BoxGeometry(.4, .04, .9), new THREE.MeshBasicMaterial({ color: 0xffffff })); lamp.position.set(0, 2.3, 0);
    const pool = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 3.2), new THREE.MeshBasicMaterial({ map: dotTexture(), color: 0xffffff, transparent: true, opacity: .0, blending: THREE.AdditiveBlending, depthWrite: false })); pool.rotation.x = -Math.PI / 2; pool.position.y = .02;
    g.add(l, r, top, lamp, pool); g.position.x = x; g.userData = { lamp, pool, s }; scene.add(g); gantries.push(g);
  }
  // items: slabs
  const N = (env.small || quality.tier <= 1) ? 20 : 42; // owner 30: mobile/tier cost
  const slabGeo = new THREE.BoxGeometry(.78, .07, 1.0); slabGeo.translate(0, .08, 0);
  const slabMat = new THREE.MeshStandardMaterial({ color: 0xa8a8ae, metalness: .18, roughness: .48 });
  const slabs = new THREE.InstancedMesh(slabGeo, slabMat, N); slabs.instanceMatrix.setUsage(THREE.DynamicDrawUsage); scene.add(slabs);
  const accentGeo = new THREE.BoxGeometry(.58, .012, .06); accentGeo.translate(0, .12, -.34);
  const accents = new THREE.InstancedMesh(accentGeo, new THREE.MeshBasicMaterial({ color: 0xff2438 }), N); accents.instanceMatrix.setUsage(THREE.DynamicDrawUsage); scene.add(accents);
  const markGeoA = new THREE.BoxGeometry(.3, .008, .025); markGeoA.translate(0, .122, -.12);
  const markGeoB = new THREE.BoxGeometry(.2, .008, .025); markGeoB.translate(0, .122, .01);
  const marksA = new THREE.InstancedMesh(markGeoA, new THREE.MeshBasicMaterial({ color: 0x53535a }), N); marksA.instanceMatrix.setUsage(THREE.DynamicDrawUsage); scene.add(marksA);
  const marksB = new THREE.InstancedMesh(markGeoB, new THREE.MeshBasicMaterial({ color: 0x53535a }), N); marksB.instanceMatrix.setUsage(THREE.DynamicDrawUsage); scene.add(marksB);
  const items = []; for (let i = 0; i < N; i++) items.push({ x: -LEN / 2 - 4 + (i / N) * (LEN + 8), seed: Math.random() });
  const m4 = new THREE.Matrix4(); const q = new THREE.Quaternion(); const v = new THREE.Vector3(); const sc = new THREE.Vector3(1, 1, 1);
  const key = new THREE.DirectionalLight(0xffffff, 1.55); key.position.set(-3, 8, 6); scene.add(key);
  const dustN = 500; const dust = new Float32Array(dustN * 3); for (let i = 0; i < dustN; i++) { dust[i * 3] = (Math.random() - .5) * (LEN + 10); dust[i * 3 + 1] = Math.random() * 5; dust[i * 3 + 2] = (Math.random() - .5) * 10; }
  const dustPts = new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(dust, 3)), new THREE.PointsMaterial({ size: .04, color: 0xff6677, transparent: true, opacity: .5, depthWrite: false })); scene.add(dustPts);
  scene.add(new THREE.AmbientLight(0xffffff, .18));
  const redFill = new THREE.PointLight(0xff2438, 20, 12); redFill.position.set(0, 1, 3); scene.add(redFill);
  const lampLight = new THREE.PointLight(0xffffff, 14, 7, 1.6); lampLight.position.set(0, 2.2, 0); scene.add(lampLight);

  const counterEl = host.closest('.sec') && host.closest('.sec').querySelector('[data-prod-counter]');
  let produced = 0, camX = -LEN / 2, lastEmit = 0;
  function render(state) {
    const p = state.progress, dt = state.dt, t = state.t;
    const target = -LEN / 2 + 2 + p * (LEN - 4);
    camX = damp(camX, target, 3, dt);
    const side = env.finePointer ? state.global.nx : Math.sin(t * .2);
    const far = camera.aspect < 1 ? 1.5 : 1; camera.position.set(camX + 6.4 * far + side * .6, 4.3 + (env.finePointer ? state.global.ny * .35 : 0), 7.4 * far); camera.lookAt(camX + 1.2, .28, 0);
    redFill.position.x = camX;
    // items advance; each gantry stamps when an item passes
    const speed = 1.6 + smooth(0.5, 0.75, p) * 2.2;
    for (let i = 0; i < N; i++) {
      const it = items[i]; const px = it.x; it.x += speed * dt; if (it.x > LEN / 2 + 4) { it.x -= LEN + 8; produced++; }
      const bob = Math.sin(it.x * 3 + it.seed * 6) * .01;
      v.set(it.x, bob, 0); q.setFromEuler(new THREE.Euler(0, (it.seed - .5) * .06, 0)); m4.compose(v, q, sc); slabs.setMatrixAt(i, m4); accents.setMatrixAt(i, m4); marksA.setMatrixAt(i, m4); marksB.setMatrixAt(i, m4);
      gantries.forEach((g) => { if (px < g.position.x && it.x >= g.position.x) g.userData.flash = 1; });
    }
    slabs.instanceMatrix.needsUpdate = true; accents.instanceMatrix.needsUpdate = true; marksA.instanceMatrix.needsUpdate = true; marksB.instanceMatrix.needsUpdate = true;
    let nearest = gantries[0], nd = 1e9;
    gantries.forEach((g) => { g.userData.flash = Math.max(0, (g.userData.flash || 0) - dt * 3); const d = Math.abs(g.position.x - camX); if (d < nd) { nd = d; nearest = g; } const near = Math.max(0, 1 - d / 6); g.userData.pool.material.opacity = .12 * near + g.userData.flash * .5; g.userData.pool.material.color.setRGB(1, 1 - g.userData.flash * .8, 1 - g.userData.flash * .75); g.userData.lamp.material.color.setRGB(1, 1 - g.userData.flash * .85, 1 - g.userData.flash * .8); });
    lampLight.position.x = damp(lampLight.position.x, nearest.position.x, 6, dt); lampLight.intensity = 12 + (nearest.userData.flash || 0) * 30;
    if (counterEl && t - lastEmit > .12) { lastEmit = t; counterEl.textContent = String(Math.floor(produced + p * 100)).padStart(4, '0'); }
    renderer.render(scene, camera);
  }
  function resize(w, h) { renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); }
  function dispose() { disposeAll(scene, renderer); }
  return { render, resize, dispose };
}
