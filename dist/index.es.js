/*!
 * AnimationFramer v0.0.1
 * https://github.com/ray-zero2/AnimationFramer
 * @license MIT
 * Copyright ray-zero2
 */
var animationFramer = null;
var AnimationFramer = function AnimationFramer() {
  this.time = 0;
  this.deltaTime = 0;
  this.lastTimestamp = 0; // private fps: number = 60;

  this.animationCount = 0;
  this.animationId = null;
  this.animations = [];
  if (animationFramer) { return animationFramer; }
  animationFramer = this;
};

var prototypeAccessors = { animationList: { configurable: true },currentTime: { configurable: true } };

prototypeAccessors.animationList.get = function () {
  return this.animations;
};

prototypeAccessors.currentTime.get = function () {
  return this.time;
}; // get targetFPS() { return this.fps }
// set targetFPS(value: number) { this.fps = value }


AnimationFramer.prototype.add = function add (animation) {
  var _a;

  var needsRestarting = this.animationId !== null;
  if (needsRestarting) { this.stop(); }
  var order = (_a = animation.order) !== null && _a !== void 0 ? _a : this.animationCount;
  this.animations.push(Object.assign(Object.assign({}, animation), {
    order: order
  }));
  this.sortAnimationsArray();
  if (needsRestarting) { this.start(); }
  this.animationCount++;
  return this;
};

AnimationFramer.prototype.remove = function remove (id) {
  var needsRestarting = this.animationId !== null;
  if (needsRestarting) { this.stop(); }
  var newAnimations = this.animations.filter(function (animation) { return animation.id !== id; });
  this.animations = newAnimations;
  if (needsRestarting) { this.start(); }
  return this;
};

AnimationFramer.prototype.removeAll = function removeAll () {
  this.stop();
  this.animations = [];
  this.animationCount = 0;
  return this;
};

AnimationFramer.prototype.start = function start () {
  this.lastTimestamp = performance.now();
  this.animate();
};

AnimationFramer.prototype.stop = function stop () {
  if (this.animationId) { cancelAnimationFrame(this.animationId); }
  this.lastTimestamp = 0;
  this.animationId = null;
};

AnimationFramer.prototype.reset = function reset (needsAllRemoving) {
    if ( needsAllRemoving === void 0 ) needsAllRemoving = true;

  this.stop();
  this.time = 0;
  if (needsAllRemoving) { this.removeAll(); }
};

AnimationFramer.prototype.reorder = function reorder () {
  this.sortAnimationsArray();
  var renumbered = this.animations.map(function (animation, index) { return Object.assign(Object.assign({}, animation), {
    order: index
  }); });
  this.animationCount = renumbered.length;
  this.animations = renumbered;
};

AnimationFramer.prototype.animate = function animate () {
    var this$1$1 = this;

  var timestamp = performance.now();
  this.animationId = requestAnimationFrame(this.animate.bind(this));
  this.deltaTime = (timestamp - this.lastTimestamp) * 0.001;
  this.time += this.deltaTime;
  this.animations.forEach(function (animation) {
    animation.callback({
      deltaTime: this$1$1.deltaTime,
      time: this$1$1.time
    });
  });
  this.lastTimestamp = timestamp;
};

AnimationFramer.prototype.sortAnimationsArray = function sortAnimationsArray () {
  this.animations.sort(function (a, b) { return a.order - b.order; });
};

Object.defineProperties( AnimationFramer.prototype, prototypeAccessors );

export { AnimationFramer as default };
