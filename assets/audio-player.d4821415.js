var e=Object.defineProperty,n=Object.prototype.hasOwnProperty,t=Object.getOwnPropertySymbols,o=Object.prototype.propertyIsEnumerable,r=(n,t,o)=>t in n?e(n,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):n[t]=o,a=(e,a)=>{for(var i in a||(a={}))n.call(a,i)&&r(e,i,a[i]);if(t)for(var i of t(a))o.call(a,i)&&r(e,i,a[i]);return e};import{B as i,C as u,J as d,K as s,b as _,t as l}from"./vendor.c8bf7c27.js";import{r as c}from"./index.31a01206.js";
/*!
 *  howler.js v2.2.1
 *  howlerjs.com
 *
 *  (c) 2013-2020, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */var p=i((function(e,n){!function(){var e=function(){this.init()};e.prototype={init:function(){var e=this||t;return e._counter=1e3,e._html5AudioPool=[],e.html5PoolSize=10,e._codecs={},e._howls=[],e._muted=!1,e._volume=1,e._canPlayEvent="canplaythrough",e._navigator="undefined"!=typeof window&&window.navigator?window.navigator:null,e.masterGain=null,e.noAudio=!1,e.usingWebAudio=!0,e.autoSuspend=!0,e.ctx=null,e.autoUnlock=!0,e._setup(),e},volume:function(e){var n=this||t;if(e=parseFloat(e),n.ctx||l(),void 0!==e&&e>=0&&e<=1){if(n._volume=e,n._muted)return n;n.usingWebAudio&&n.masterGain.gain.setValueAtTime(e,t.ctx.currentTime);for(var o=0;o<n._howls.length;o++)if(!n._howls[o]._webAudio)for(var r=n._howls[o]._getSoundIds(),a=0;a<r.length;a++){var i=n._howls[o]._soundById(r[a]);i&&i._node&&(i._node.volume=i._volume*e)}return n}return n._volume},mute:function(e){var n=this||t;n.ctx||l(),n._muted=e,n.usingWebAudio&&n.masterGain.gain.setValueAtTime(e?0:n._volume,t.ctx.currentTime);for(var o=0;o<n._howls.length;o++)if(!n._howls[o]._webAudio)for(var r=n._howls[o]._getSoundIds(),a=0;a<r.length;a++){var i=n._howls[o]._soundById(r[a]);i&&i._node&&(i._node.muted=!!e||i._muted)}return n},stop:function(){for(var e=this||t,n=0;n<e._howls.length;n++)e._howls[n].stop();return e},unload:function(){for(var e=this||t,n=e._howls.length-1;n>=0;n--)e._howls[n].unload();return e.usingWebAudio&&e.ctx&&void 0!==e.ctx.close&&(e.ctx.close(),e.ctx=null,l()),e},codecs:function(e){return(this||t)._codecs[e.replace(/^x-/,"")]},_setup:function(){var e=this||t;if(e.state=e.ctx&&e.ctx.state||"suspended",e._autoSuspend(),!e.usingWebAudio)if("undefined"!=typeof Audio)try{void 0===(new Audio).oncanplaythrough&&(e._canPlayEvent="canplay")}catch(n){e.noAudio=!0}else e.noAudio=!0;try{(new Audio).muted&&(e.noAudio=!0)}catch(n){}return e.noAudio||e._setupCodecs(),e},_setupCodecs:function(){var e=this||t,n=null;try{n="undefined"!=typeof Audio?new Audio:null}catch(i){return e}if(!n||"function"!=typeof n.canPlayType)return e;var o=n.canPlayType("audio/mpeg;").replace(/^no$/,""),r=e._navigator&&e._navigator.userAgent.match(/OPR\/([0-6].)/g),a=r&&parseInt(r[0].split("/")[1],10)<33;return e._codecs={mp3:!(a||!o&&!n.canPlayType("audio/mp3;").replace(/^no$/,"")),mpeg:!!o,opus:!!n.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),ogg:!!n.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),oga:!!n.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),wav:!!(n.canPlayType('audio/wav; codecs="1"')||n.canPlayType("audio/wav")).replace(/^no$/,""),aac:!!n.canPlayType("audio/aac;").replace(/^no$/,""),caf:!!n.canPlayType("audio/x-caf;").replace(/^no$/,""),m4a:!!(n.canPlayType("audio/x-m4a;")||n.canPlayType("audio/m4a;")||n.canPlayType("audio/aac;")).replace(/^no$/,""),m4b:!!(n.canPlayType("audio/x-m4b;")||n.canPlayType("audio/m4b;")||n.canPlayType("audio/aac;")).replace(/^no$/,""),mp4:!!(n.canPlayType("audio/x-mp4;")||n.canPlayType("audio/mp4;")||n.canPlayType("audio/aac;")).replace(/^no$/,""),weba:!!n.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,""),webm:!!n.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,""),dolby:!!n.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/,""),flac:!!(n.canPlayType("audio/x-flac;")||n.canPlayType("audio/flac;")).replace(/^no$/,"")},e},_unlockAudio:function(){var e=this||t;if(!e._audioUnlocked&&e.ctx){e._audioUnlocked=!1,e.autoUnlock=!1,e._mobileUnloaded||44100===e.ctx.sampleRate||(e._mobileUnloaded=!0,e.unload()),e._scratchBuffer=e.ctx.createBuffer(1,1,22050);var n=function(t){for(;e._html5AudioPool.length<e.html5PoolSize;)try{var o=new Audio;o._unlocked=!0,e._releaseHtml5Audio(o)}catch(s){e.noAudio=!0;break}for(var r=0;r<e._howls.length;r++)if(!e._howls[r]._webAudio)for(var a=e._howls[r]._getSoundIds(),i=0;i<a.length;i++){var u=e._howls[r]._soundById(a[i]);u&&u._node&&!u._node._unlocked&&(u._node._unlocked=!0,u._node.load())}e._autoResume();var d=e.ctx.createBufferSource();d.buffer=e._scratchBuffer,d.connect(e.ctx.destination),void 0===d.start?d.noteOn(0):d.start(0),"function"==typeof e.ctx.resume&&e.ctx.resume(),d.onended=function(){d.disconnect(0),e._audioUnlocked=!0,document.removeEventListener("touchstart",n,!0),document.removeEventListener("touchend",n,!0),document.removeEventListener("click",n,!0);for(var t=0;t<e._howls.length;t++)e._howls[t]._emit("unlock")}};return document.addEventListener("touchstart",n,!0),document.addEventListener("touchend",n,!0),document.addEventListener("click",n,!0),e}},_obtainHtml5Audio:function(){var e=this||t;if(e._html5AudioPool.length)return e._html5AudioPool.pop();var n=(new Audio).play();return n&&"undefined"!=typeof Promise&&(n instanceof Promise||"function"==typeof n.then)&&n.catch((function(){console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.")})),new Audio},_releaseHtml5Audio:function(e){var n=this||t;return e._unlocked&&n._html5AudioPool.push(e),n},_autoSuspend:function(){var e=this;if(e.autoSuspend&&e.ctx&&void 0!==e.ctx.suspend&&t.usingWebAudio){for(var n=0;n<e._howls.length;n++)if(e._howls[n]._webAudio)for(var o=0;o<e._howls[n]._sounds.length;o++)if(!e._howls[n]._sounds[o]._paused)return e;return e._suspendTimer&&clearTimeout(e._suspendTimer),e._suspendTimer=setTimeout((function(){if(e.autoSuspend){e._suspendTimer=null,e.state="suspending";var n=function(){e.state="suspended",e._resumeAfterSuspend&&(delete e._resumeAfterSuspend,e._autoResume())};e.ctx.suspend().then(n,n)}}),3e4),e}},_autoResume:function(){var e=this;if(e.ctx&&void 0!==e.ctx.resume&&t.usingWebAudio)return"running"===e.state&&"interrupted"!==e.ctx.state&&e._suspendTimer?(clearTimeout(e._suspendTimer),e._suspendTimer=null):"suspended"===e.state||"running"===e.state&&"interrupted"===e.ctx.state?(e.ctx.resume().then((function(){e.state="running";for(var n=0;n<e._howls.length;n++)e._howls[n]._emit("resume")})),e._suspendTimer&&(clearTimeout(e._suspendTimer),e._suspendTimer=null)):"suspending"===e.state&&(e._resumeAfterSuspend=!0),e}};var t=new e,o=function(e){e.src&&0!==e.src.length?this.init(e):console.error("An array of source files must be passed with any new Howl.")};o.prototype={init:function(e){var n=this;return t.ctx||l(),n._autoplay=e.autoplay||!1,n._format="string"!=typeof e.format?e.format:[e.format],n._html5=e.html5||!1,n._muted=e.mute||!1,n._loop=e.loop||!1,n._pool=e.pool||5,n._preload="boolean"!=typeof e.preload&&"metadata"!==e.preload||e.preload,n._rate=e.rate||1,n._sprite=e.sprite||{},n._src="string"!=typeof e.src?e.src:[e.src],n._volume=void 0!==e.volume?e.volume:1,n._xhr={method:e.xhr&&e.xhr.method?e.xhr.method:"GET",headers:e.xhr&&e.xhr.headers?e.xhr.headers:null,withCredentials:!(!e.xhr||!e.xhr.withCredentials)&&e.xhr.withCredentials},n._duration=0,n._state="unloaded",n._sounds=[],n._endTimers={},n._queue=[],n._playLock=!1,n._onend=e.onend?[{fn:e.onend}]:[],n._onfade=e.onfade?[{fn:e.onfade}]:[],n._onload=e.onload?[{fn:e.onload}]:[],n._onloaderror=e.onloaderror?[{fn:e.onloaderror}]:[],n._onplayerror=e.onplayerror?[{fn:e.onplayerror}]:[],n._onpause=e.onpause?[{fn:e.onpause}]:[],n._onplay=e.onplay?[{fn:e.onplay}]:[],n._onstop=e.onstop?[{fn:e.onstop}]:[],n._onmute=e.onmute?[{fn:e.onmute}]:[],n._onvolume=e.onvolume?[{fn:e.onvolume}]:[],n._onrate=e.onrate?[{fn:e.onrate}]:[],n._onseek=e.onseek?[{fn:e.onseek}]:[],n._onunlock=e.onunlock?[{fn:e.onunlock}]:[],n._onresume=[],n._webAudio=t.usingWebAudio&&!n._html5,void 0!==t.ctx&&t.ctx&&t.autoUnlock&&t._unlockAudio(),t._howls.push(n),n._autoplay&&n._queue.push({event:"play",action:function(){n.play()}}),n._preload&&"none"!==n._preload&&n.load(),n},load:function(){var e=this,n=null;if(t.noAudio)e._emit("loaderror",null,"No audio support.");else{"string"==typeof e._src&&(e._src=[e._src]);for(var o=0;o<e._src.length;o++){var a,u;if(e._format&&e._format[o])a=e._format[o];else{if("string"!=typeof(u=e._src[o])){e._emit("loaderror",null,"Non-string found in selected audio sources - ignoring.");continue}(a=/^data:audio\/([^;,]+);/i.exec(u))||(a=/\.([^.]+)$/.exec(u.split("?",1)[0])),a&&(a=a[1].toLowerCase())}if(a||console.warn('No file extension was found. Consider using the "format" property or specify an extension.'),a&&t.codecs(a)){n=e._src[o];break}}if(n)return e._src=n,e._state="loading","https:"===window.location.protocol&&"http:"===n.slice(0,5)&&(e._html5=!0,e._webAudio=!1),new r(e),e._webAudio&&i(e),e;e._emit("loaderror",null,"No codec support for selected audio sources.")}},play:function(e,n){var o=this,r=null;if("number"==typeof e)r=e,e=null;else{if("string"==typeof e&&"loaded"===o._state&&!o._sprite[e])return null;if(void 0===e&&(e="__default",!o._playLock)){for(var a=0,i=0;i<o._sounds.length;i++)o._sounds[i]._paused&&!o._sounds[i]._ended&&(a++,r=o._sounds[i]._id);1===a?e=null:r=null}}var u=r?o._soundById(r):o._inactiveSound();if(!u)return null;if(r&&!e&&(e=u._sprite||"__default"),"loaded"!==o._state){u._sprite=e,u._ended=!1;var d=u._id;return o._queue.push({event:"play",action:function(){o.play(d)}}),d}if(r&&!u._paused)return n||o._loadQueue("play"),u._id;o._webAudio&&t._autoResume();var s=Math.max(0,u._seek>0?u._seek:o._sprite[e][0]/1e3),_=Math.max(0,(o._sprite[e][0]+o._sprite[e][1])/1e3-s),l=1e3*_/Math.abs(u._rate),c=o._sprite[e][0]/1e3,p=(o._sprite[e][0]+o._sprite[e][1])/1e3;u._sprite=e,u._ended=!1;var f=function(){u._paused=!1,u._seek=s,u._start=c,u._stop=p,u._loop=!(!u._loop&&!o._sprite[e][2])};if(!(s>=p)){var m=u._node;if(o._webAudio){var v=function(){o._playLock=!1,f(),o._refreshBuffer(u);var e=u._muted||o._muted?0:u._volume;m.gain.setValueAtTime(e,t.ctx.currentTime),u._playStart=t.ctx.currentTime,void 0===m.bufferSource.start?u._loop?m.bufferSource.noteGrainOn(0,s,86400):m.bufferSource.noteGrainOn(0,s,_):u._loop?m.bufferSource.start(0,s,86400):m.bufferSource.start(0,s,_),l!==1/0&&(o._endTimers[u._id]=setTimeout(o._ended.bind(o,u),l)),n||setTimeout((function(){o._emit("play",u._id),o._loadQueue()}),0)};"running"===t.state&&"interrupted"!==t.ctx.state?v():(o._playLock=!0,o.once("resume",v),o._clearTimer(u._id))}else{var h=function(){m.currentTime=s,m.muted=u._muted||o._muted||t._muted||m.muted,m.volume=u._volume*t.volume(),m.playbackRate=u._rate;try{var r=m.play();if(r&&"undefined"!=typeof Promise&&(r instanceof Promise||"function"==typeof r.then)?(o._playLock=!0,f(),r.then((function(){o._playLock=!1,m._unlocked=!0,n||(o._emit("play",u._id),o._loadQueue())})).catch((function(){o._playLock=!1,o._emit("playerror",u._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."),u._ended=!0,u._paused=!0}))):n||(o._playLock=!1,f(),o._emit("play",u._id),o._loadQueue()),m.playbackRate=u._rate,m.paused)return void o._emit("playerror",u._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");"__default"!==e||u._loop?o._endTimers[u._id]=setTimeout(o._ended.bind(o,u),l):(o._endTimers[u._id]=function(){o._ended(u),m.removeEventListener("ended",o._endTimers[u._id],!1)},m.addEventListener("ended",o._endTimers[u._id],!1))}catch(a){o._emit("playerror",u._id,a)}};"data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA"===m.src&&(m.src=o._src,m.load());var y=window&&window.ejecta||!m.readyState&&t._navigator.isCocoonJS;if(m.readyState>=3||y)h();else{o._playLock=!0;var A=function(){h(),m.removeEventListener(t._canPlayEvent,A,!1)};m.addEventListener(t._canPlayEvent,A,!1),o._clearTimer(u._id)}}return u._id}o._ended(u)},pause:function(e){var n=this;if("loaded"!==n._state||n._playLock)return n._queue.push({event:"pause",action:function(){n.pause(e)}}),n;for(var t=n._getSoundIds(e),o=0;o<t.length;o++){n._clearTimer(t[o]);var r=n._soundById(t[o]);if(r&&!r._paused&&(r._seek=n.seek(t[o]),r._rateSeek=0,r._paused=!0,n._stopFade(t[o]),r._node))if(n._webAudio){if(!r._node.bufferSource)continue;void 0===r._node.bufferSource.stop?r._node.bufferSource.noteOff(0):r._node.bufferSource.stop(0),n._cleanBuffer(r._node)}else isNaN(r._node.duration)&&r._node.duration!==1/0||r._node.pause();arguments[1]||n._emit("pause",r?r._id:null)}return n},stop:function(e,n){var t=this;if("loaded"!==t._state||t._playLock)return t._queue.push({event:"stop",action:function(){t.stop(e)}}),t;for(var o=t._getSoundIds(e),r=0;r<o.length;r++){t._clearTimer(o[r]);var a=t._soundById(o[r]);a&&(a._seek=a._start||0,a._rateSeek=0,a._paused=!0,a._ended=!0,t._stopFade(o[r]),a._node&&(t._webAudio?a._node.bufferSource&&(void 0===a._node.bufferSource.stop?a._node.bufferSource.noteOff(0):a._node.bufferSource.stop(0),t._cleanBuffer(a._node)):isNaN(a._node.duration)&&a._node.duration!==1/0||(a._node.currentTime=a._start||0,a._node.pause(),a._node.duration===1/0&&t._clearSound(a._node))),n||t._emit("stop",a._id))}return t},mute:function(e,n){var o=this;if("loaded"!==o._state||o._playLock)return o._queue.push({event:"mute",action:function(){o.mute(e,n)}}),o;if(void 0===n){if("boolean"!=typeof e)return o._muted;o._muted=e}for(var r=o._getSoundIds(n),a=0;a<r.length;a++){var i=o._soundById(r[a]);i&&(i._muted=e,i._interval&&o._stopFade(i._id),o._webAudio&&i._node?i._node.gain.setValueAtTime(e?0:i._volume,t.ctx.currentTime):i._node&&(i._node.muted=!!t._muted||e),o._emit("mute",i._id))}return o},volume:function(){var e,n,o,r=this,a=arguments;if(0===a.length)return r._volume;if(1===a.length||2===a.length&&void 0===a[1]){var i=r._getSoundIds(),u=i.indexOf(a[0]);u>=0?n=parseInt(a[0],10):e=parseFloat(a[0])}else a.length>=2&&(e=parseFloat(a[0]),n=parseInt(a[1],10));if(!(void 0!==e&&e>=0&&e<=1))return(o=n?r._soundById(n):r._sounds[0])?o._volume:0;if("loaded"!==r._state||r._playLock)return r._queue.push({event:"volume",action:function(){r.volume.apply(r,a)}}),r;void 0===n&&(r._volume=e),n=r._getSoundIds(n);for(var d=0;d<n.length;d++)(o=r._soundById(n[d]))&&(o._volume=e,a[2]||r._stopFade(n[d]),r._webAudio&&o._node&&!o._muted?o._node.gain.setValueAtTime(e,t.ctx.currentTime):o._node&&!o._muted&&(o._node.volume=e*t.volume()),r._emit("volume",o._id));return r},fade:function(e,n,o,r){var a=this;if("loaded"!==a._state||a._playLock)return a._queue.push({event:"fade",action:function(){a.fade(e,n,o,r)}}),a;e=Math.min(Math.max(0,parseFloat(e)),1),n=Math.min(Math.max(0,parseFloat(n)),1),o=parseFloat(o),a.volume(e,r);for(var i=a._getSoundIds(r),u=0;u<i.length;u++){var d=a._soundById(i[u]);if(d){if(r||a._stopFade(i[u]),a._webAudio&&!d._muted){var s=t.ctx.currentTime,_=s+o/1e3;d._volume=e,d._node.gain.setValueAtTime(e,s),d._node.gain.linearRampToValueAtTime(n,_)}a._startFadeInterval(d,e,n,o,i[u],void 0===r)}}return a},_startFadeInterval:function(e,n,t,o,r,a){var i=this,u=n,d=t-n,s=Math.abs(d/.01),_=Math.max(4,s>0?o/s:o),l=Date.now();e._fadeTo=t,e._interval=setInterval((function(){var r=(Date.now()-l)/o;l=Date.now(),u+=d*r,u=Math.round(100*u)/100,u=d<0?Math.max(t,u):Math.min(t,u),i._webAudio?e._volume=u:i.volume(u,e._id,!0),a&&(i._volume=u),(t<n&&u<=t||t>n&&u>=t)&&(clearInterval(e._interval),e._interval=null,e._fadeTo=null,i.volume(t,e._id),i._emit("fade",e._id))}),_)},_stopFade:function(e){var n=this,o=n._soundById(e);return o&&o._interval&&(n._webAudio&&o._node.gain.cancelScheduledValues(t.ctx.currentTime),clearInterval(o._interval),o._interval=null,n.volume(o._fadeTo,e),o._fadeTo=null,n._emit("fade",e)),n},loop:function(){var e,n,t,o=this,r=arguments;if(0===r.length)return o._loop;if(1===r.length){if("boolean"!=typeof r[0])return!!(t=o._soundById(parseInt(r[0],10)))&&t._loop;e=r[0],o._loop=e}else 2===r.length&&(e=r[0],n=parseInt(r[1],10));for(var a=o._getSoundIds(n),i=0;i<a.length;i++)(t=o._soundById(a[i]))&&(t._loop=e,o._webAudio&&t._node&&t._node.bufferSource&&(t._node.bufferSource.loop=e,e&&(t._node.bufferSource.loopStart=t._start||0,t._node.bufferSource.loopEnd=t._stop)));return o},rate:function(){var e,n,o,r=this,a=arguments;if(0===a.length)n=r._sounds[0]._id;else if(1===a.length){var i=r._getSoundIds(),u=i.indexOf(a[0]);u>=0?n=parseInt(a[0],10):e=parseFloat(a[0])}else 2===a.length&&(e=parseFloat(a[0]),n=parseInt(a[1],10));if("number"!=typeof e)return(o=r._soundById(n))?o._rate:r._rate;if("loaded"!==r._state||r._playLock)return r._queue.push({event:"rate",action:function(){r.rate.apply(r,a)}}),r;void 0===n&&(r._rate=e),n=r._getSoundIds(n);for(var d=0;d<n.length;d++)if(o=r._soundById(n[d])){r.playing(n[d])&&(o._rateSeek=r.seek(n[d]),o._playStart=r._webAudio?t.ctx.currentTime:o._playStart),o._rate=e,r._webAudio&&o._node&&o._node.bufferSource?o._node.bufferSource.playbackRate.setValueAtTime(e,t.ctx.currentTime):o._node&&(o._node.playbackRate=e);var s=r.seek(n[d]),_=(r._sprite[o._sprite][0]+r._sprite[o._sprite][1])/1e3-s,l=1e3*_/Math.abs(o._rate);!r._endTimers[n[d]]&&o._paused||(r._clearTimer(n[d]),r._endTimers[n[d]]=setTimeout(r._ended.bind(r,o),l)),r._emit("rate",o._id)}return r},seek:function(){var e,n,o=this,r=arguments;if(0===r.length)n=o._sounds[0]._id;else if(1===r.length){var a=o._getSoundIds(),i=a.indexOf(r[0]);i>=0?n=parseInt(r[0],10):o._sounds.length&&(n=o._sounds[0]._id,e=parseFloat(r[0]))}else 2===r.length&&(e=parseFloat(r[0]),n=parseInt(r[1],10));if(void 0===n)return o;if("number"==typeof e&&("loaded"!==o._state||o._playLock))return o._queue.push({event:"seek",action:function(){o.seek.apply(o,r)}}),o;var u=o._soundById(n);if(u){if(!("number"==typeof e&&e>=0)){if(o._webAudio){var d=o.playing(n)?t.ctx.currentTime-u._playStart:0,s=u._rateSeek?u._rateSeek-u._seek:0;return u._seek+(s+d*Math.abs(u._rate))}return u._node.currentTime}var _=o.playing(n);_&&o.pause(n,!0),u._seek=e,u._ended=!1,o._clearTimer(n),o._webAudio||!u._node||isNaN(u._node.duration)||(u._node.currentTime=e);var l=function(){o._emit("seek",n),_&&o.play(n,!0)};if(_&&!o._webAudio){var c=function(){o._playLock?setTimeout(c,0):l()};setTimeout(c,0)}else l()}return o},playing:function(e){var n=this;if("number"==typeof e){var t=n._soundById(e);return!!t&&!t._paused}for(var o=0;o<n._sounds.length;o++)if(!n._sounds[o]._paused)return!0;return!1},duration:function(e){var n=this,t=n._duration,o=n._soundById(e);return o&&(t=n._sprite[o._sprite][1]/1e3),t},state:function(){return this._state},unload:function(){for(var e=this,n=e._sounds,o=0;o<n.length;o++)n[o]._paused||e.stop(n[o]._id),e._webAudio||(e._clearSound(n[o]._node),n[o]._node.removeEventListener("error",n[o]._errorFn,!1),n[o]._node.removeEventListener(t._canPlayEvent,n[o]._loadFn,!1),n[o]._node.removeEventListener("ended",n[o]._endFn,!1),t._releaseHtml5Audio(n[o]._node)),delete n[o]._node,e._clearTimer(n[o]._id);var r=t._howls.indexOf(e);r>=0&&t._howls.splice(r,1);var i=!0;for(o=0;o<t._howls.length;o++)if(t._howls[o]._src===e._src||e._src.indexOf(t._howls[o]._src)>=0){i=!1;break}return a&&i&&delete a[e._src],t.noAudio=!1,e._state="unloaded",e._sounds=[],e=null,null},on:function(e,n,t,o){var r=this["_on"+e];return"function"==typeof n&&r.push(o?{id:t,fn:n,once:o}:{id:t,fn:n}),this},off:function(e,n,t){var o=this,r=o["_on"+e],a=0;if("number"==typeof n&&(t=n,n=null),n||t)for(a=0;a<r.length;a++){var i=t===r[a].id;if(n===r[a].fn&&i||!n&&i){r.splice(a,1);break}}else if(e)o["_on"+e]=[];else{var u=Object.keys(o);for(a=0;a<u.length;a++)0===u[a].indexOf("_on")&&Array.isArray(o[u[a]])&&(o[u[a]]=[])}return o},once:function(e,n,t){return this.on(e,n,t,1),this},_emit:function(e,n,t){for(var o=this,r=o["_on"+e],a=r.length-1;a>=0;a--)r[a].id&&r[a].id!==n&&"load"!==e||(setTimeout(function(e){e.call(this,n,t)}.bind(o,r[a].fn),0),r[a].once&&o.off(e,r[a].fn,r[a].id));return o._loadQueue(e),o},_loadQueue:function(e){var n=this;if(n._queue.length>0){var t=n._queue[0];t.event===e&&(n._queue.shift(),n._loadQueue()),e||t.action()}return n},_ended:function(e){var n=this,o=e._sprite;if(!n._webAudio&&e._node&&!e._node.paused&&!e._node.ended&&e._node.currentTime<e._stop)return setTimeout(n._ended.bind(n,e),100),n;var r=!(!e._loop&&!n._sprite[o][2]);if(n._emit("end",e._id),!n._webAudio&&r&&n.stop(e._id,!0).play(e._id),n._webAudio&&r){n._emit("play",e._id),e._seek=e._start||0,e._rateSeek=0,e._playStart=t.ctx.currentTime;var a=1e3*(e._stop-e._start)/Math.abs(e._rate);n._endTimers[e._id]=setTimeout(n._ended.bind(n,e),a)}return n._webAudio&&!r&&(e._paused=!0,e._ended=!0,e._seek=e._start||0,e._rateSeek=0,n._clearTimer(e._id),n._cleanBuffer(e._node),t._autoSuspend()),n._webAudio||r||n.stop(e._id,!0),n},_clearTimer:function(e){var n=this;if(n._endTimers[e]){if("function"!=typeof n._endTimers[e])clearTimeout(n._endTimers[e]);else{var t=n._soundById(e);t&&t._node&&t._node.removeEventListener("ended",n._endTimers[e],!1)}delete n._endTimers[e]}return n},_soundById:function(e){for(var n=this,t=0;t<n._sounds.length;t++)if(e===n._sounds[t]._id)return n._sounds[t];return null},_inactiveSound:function(){var e=this;e._drain();for(var n=0;n<e._sounds.length;n++)if(e._sounds[n]._ended)return e._sounds[n].reset();return new r(e)},_drain:function(){var e=this,n=e._pool,t=0,o=0;if(!(e._sounds.length<n)){for(o=0;o<e._sounds.length;o++)e._sounds[o]._ended&&t++;for(o=e._sounds.length-1;o>=0;o--){if(t<=n)return;e._sounds[o]._ended&&(e._webAudio&&e._sounds[o]._node&&e._sounds[o]._node.disconnect(0),e._sounds.splice(o,1),t--)}}},_getSoundIds:function(e){if(void 0===e){for(var n=[],t=0;t<this._sounds.length;t++)n.push(this._sounds[t]._id);return n}return[e]},_refreshBuffer:function(e){return e._node.bufferSource=t.ctx.createBufferSource(),e._node.bufferSource.buffer=a[this._src],e._panner?e._node.bufferSource.connect(e._panner):e._node.bufferSource.connect(e._node),e._node.bufferSource.loop=e._loop,e._loop&&(e._node.bufferSource.loopStart=e._start||0,e._node.bufferSource.loopEnd=e._stop||0),e._node.bufferSource.playbackRate.setValueAtTime(e._rate,t.ctx.currentTime),this},_cleanBuffer:function(e){var n=t._navigator&&t._navigator.vendor.indexOf("Apple")>=0;if(t._scratchBuffer&&e.bufferSource&&(e.bufferSource.onended=null,e.bufferSource.disconnect(0),n))try{e.bufferSource.buffer=t._scratchBuffer}catch(o){}return e.bufferSource=null,this},_clearSound:function(e){/MSIE |Trident\//.test(t._navigator&&t._navigator.userAgent)||(e.src="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA")}};var r=function(e){this._parent=e,this.init()};r.prototype={init:function(){var e=this,n=e._parent;return e._muted=n._muted,e._loop=n._loop,e._volume=n._volume,e._rate=n._rate,e._seek=0,e._paused=!0,e._ended=!0,e._sprite="__default",e._id=++t._counter,n._sounds.push(e),e.create(),e},create:function(){var e=this,n=e._parent,o=t._muted||e._muted||e._parent._muted?0:e._volume;return n._webAudio?(e._node=void 0===t.ctx.createGain?t.ctx.createGainNode():t.ctx.createGain(),e._node.gain.setValueAtTime(o,t.ctx.currentTime),e._node.paused=!0,e._node.connect(t.masterGain)):t.noAudio||(e._node=t._obtainHtml5Audio(),e._errorFn=e._errorListener.bind(e),e._node.addEventListener("error",e._errorFn,!1),e._loadFn=e._loadListener.bind(e),e._node.addEventListener(t._canPlayEvent,e._loadFn,!1),e._endFn=e._endListener.bind(e),e._node.addEventListener("ended",e._endFn,!1),e._node.src=n._src,e._node.preload=!0===n._preload?"auto":n._preload,e._node.volume=o*t.volume(),e._node.load()),e},reset:function(){var e=this,n=e._parent;return e._muted=n._muted,e._loop=n._loop,e._volume=n._volume,e._rate=n._rate,e._seek=0,e._rateSeek=0,e._paused=!0,e._ended=!0,e._sprite="__default",e._id=++t._counter,e},_errorListener:function(){var e=this;e._parent._emit("loaderror",e._id,e._node.error?e._node.error.code:0),e._node.removeEventListener("error",e._errorFn,!1)},_loadListener:function(){var e=this,n=e._parent;n._duration=Math.ceil(10*e._node.duration)/10,0===Object.keys(n._sprite).length&&(n._sprite={__default:[0,1e3*n._duration]}),"loaded"!==n._state&&(n._state="loaded",n._emit("load"),n._loadQueue()),e._node.removeEventListener(t._canPlayEvent,e._loadFn,!1)},_endListener:function(){var e=this,n=e._parent;n._duration===1/0&&(n._duration=Math.ceil(10*e._node.duration)/10,n._sprite.__default[1]===1/0&&(n._sprite.__default[1]=1e3*n._duration),n._ended(e)),e._node.removeEventListener("ended",e._endFn,!1)}};var a={},i=function(e){var n=e._src;if(a[n])return e._duration=a[n].duration,void _(e);if(/^data:[^;]+;base64,/.test(n)){for(var t=atob(n.split(",")[1]),o=new Uint8Array(t.length),r=0;r<t.length;++r)o[r]=t.charCodeAt(r);s(o.buffer,e)}else{var i=new XMLHttpRequest;i.open(e._xhr.method,n,!0),i.withCredentials=e._xhr.withCredentials,i.responseType="arraybuffer",e._xhr.headers&&Object.keys(e._xhr.headers).forEach((function(n){i.setRequestHeader(n,e._xhr.headers[n])})),i.onload=function(){var n=(i.status+"")[0];"0"===n||"2"===n||"3"===n?s(i.response,e):e._emit("loaderror",null,"Failed loading audio file with status: "+i.status+".")},i.onerror=function(){e._webAudio&&(e._html5=!0,e._webAudio=!1,e._sounds=[],delete a[n],e.load())},d(i)}},d=function(e){try{e.send()}catch(n){e.onerror()}},s=function(e,n){var o=function(){n._emit("loaderror",null,"Decoding audio data failed.")},r=function(e){e&&n._sounds.length>0?(a[n._src]=e,_(n,e)):o()};"undefined"!=typeof Promise&&1===t.ctx.decodeAudioData.length?t.ctx.decodeAudioData(e).then(r).catch(o):t.ctx.decodeAudioData(e,r,o)},_=function(e,n){n&&!e._duration&&(e._duration=n.duration),0===Object.keys(e._sprite).length&&(e._sprite={__default:[0,1e3*e._duration]}),"loaded"!==e._state&&(e._state="loaded",e._emit("load"),e._loadQueue())},l=function(){if(t.usingWebAudio){try{"undefined"!=typeof AudioContext?t.ctx=new AudioContext:"undefined"!=typeof webkitAudioContext?t.ctx=new webkitAudioContext:t.usingWebAudio=!1}catch(a){t.usingWebAudio=!1}t.ctx||(t.usingWebAudio=!1);var e=/iP(hone|od|ad)/.test(t._navigator&&t._navigator.platform),n=t._navigator&&t._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),o=n?parseInt(n[1],10):null;if(e&&o&&o<9){var r=/safari/.test(t._navigator&&t._navigator.userAgent.toLowerCase());t._navigator&&!r&&(t.usingWebAudio=!1)}t.usingWebAudio&&(t.masterGain=void 0===t.ctx.createGain?t.ctx.createGainNode():t.ctx.createGain(),t.masterGain.gain.setValueAtTime(t._muted?0:t._volume,t.ctx.currentTime),t.masterGain.connect(t.ctx.destination)),t._setup()}};n.Howler=t,n.Howl=o,void 0!==u?(u.HowlerGlobal=e,u.Howler=t,u.Howl=o,u.Sound=r):"undefined"!=typeof window&&(window.HowlerGlobal=e,window.Howler=t,window.Howl=o,window.Sound=r)}(),
/*!
   *  Spatial Plugin - Adds support for stereo and 3D audio where Web Audio is supported.
   *  
   *  howler.js v2.2.1
   *  howlerjs.com
   *
   *  (c) 2013-2020, James Simpson of GoldFire Studios
   *  goldfirestudios.com
   *
   *  MIT License
   */
function(){var e;HowlerGlobal.prototype._pos=[0,0,0],HowlerGlobal.prototype._orientation=[0,0,-1,0,1,0],HowlerGlobal.prototype.stereo=function(e){var n=this;if(!n.ctx||!n.ctx.listener)return n;for(var t=n._howls.length-1;t>=0;t--)n._howls[t].stereo(e);return n},HowlerGlobal.prototype.pos=function(e,n,t){var o=this;return o.ctx&&o.ctx.listener?(n="number"!=typeof n?o._pos[1]:n,t="number"!=typeof t?o._pos[2]:t,"number"!=typeof e?o._pos:(o._pos=[e,n,t],void 0!==o.ctx.listener.positionX?(o.ctx.listener.positionX.setTargetAtTime(o._pos[0],Howler.ctx.currentTime,.1),o.ctx.listener.positionY.setTargetAtTime(o._pos[1],Howler.ctx.currentTime,.1),o.ctx.listener.positionZ.setTargetAtTime(o._pos[2],Howler.ctx.currentTime,.1)):o.ctx.listener.setPosition(o._pos[0],o._pos[1],o._pos[2]),o)):o},HowlerGlobal.prototype.orientation=function(e,n,t,o,r,a){var i=this;if(!i.ctx||!i.ctx.listener)return i;var u=i._orientation;return n="number"!=typeof n?u[1]:n,t="number"!=typeof t?u[2]:t,o="number"!=typeof o?u[3]:o,r="number"!=typeof r?u[4]:r,a="number"!=typeof a?u[5]:a,"number"!=typeof e?u:(i._orientation=[e,n,t,o,r,a],void 0!==i.ctx.listener.forwardX?(i.ctx.listener.forwardX.setTargetAtTime(e,Howler.ctx.currentTime,.1),i.ctx.listener.forwardY.setTargetAtTime(n,Howler.ctx.currentTime,.1),i.ctx.listener.forwardZ.setTargetAtTime(t,Howler.ctx.currentTime,.1),i.ctx.listener.upX.setTargetAtTime(o,Howler.ctx.currentTime,.1),i.ctx.listener.upY.setTargetAtTime(r,Howler.ctx.currentTime,.1),i.ctx.listener.upZ.setTargetAtTime(a,Howler.ctx.currentTime,.1)):i.ctx.listener.setOrientation(e,n,t,o,r,a),i)},Howl.prototype.init=(e=Howl.prototype.init,function(n){var t=this;return t._orientation=n.orientation||[1,0,0],t._stereo=n.stereo||null,t._pos=n.pos||null,t._pannerAttr={coneInnerAngle:void 0!==n.coneInnerAngle?n.coneInnerAngle:360,coneOuterAngle:void 0!==n.coneOuterAngle?n.coneOuterAngle:360,coneOuterGain:void 0!==n.coneOuterGain?n.coneOuterGain:0,distanceModel:void 0!==n.distanceModel?n.distanceModel:"inverse",maxDistance:void 0!==n.maxDistance?n.maxDistance:1e4,panningModel:void 0!==n.panningModel?n.panningModel:"HRTF",refDistance:void 0!==n.refDistance?n.refDistance:1,rolloffFactor:void 0!==n.rolloffFactor?n.rolloffFactor:1},t._onstereo=n.onstereo?[{fn:n.onstereo}]:[],t._onpos=n.onpos?[{fn:n.onpos}]:[],t._onorientation=n.onorientation?[{fn:n.onorientation}]:[],e.call(this,n)}),Howl.prototype.stereo=function(e,t){var o=this;if(!o._webAudio)return o;if("loaded"!==o._state)return o._queue.push({event:"stereo",action:function(){o.stereo(e,t)}}),o;var r=void 0===Howler.ctx.createStereoPanner?"spatial":"stereo";if(void 0===t){if("number"!=typeof e)return o._stereo;o._stereo=e,o._pos=[e,0,0]}for(var a=o._getSoundIds(t),i=0;i<a.length;i++){var u=o._soundById(a[i]);if(u){if("number"!=typeof e)return u._stereo;u._stereo=e,u._pos=[e,0,0],u._node&&(u._pannerAttr.panningModel="equalpower",u._panner&&u._panner.pan||n(u,r),"spatial"===r?void 0!==u._panner.positionX?(u._panner.positionX.setValueAtTime(e,Howler.ctx.currentTime),u._panner.positionY.setValueAtTime(0,Howler.ctx.currentTime),u._panner.positionZ.setValueAtTime(0,Howler.ctx.currentTime)):u._panner.setPosition(e,0,0):u._panner.pan.setValueAtTime(e,Howler.ctx.currentTime)),o._emit("stereo",u._id)}}return o},Howl.prototype.pos=function(e,t,o,r){var a=this;if(!a._webAudio)return a;if("loaded"!==a._state)return a._queue.push({event:"pos",action:function(){a.pos(e,t,o,r)}}),a;if(t="number"!=typeof t?0:t,o="number"!=typeof o?-.5:o,void 0===r){if("number"!=typeof e)return a._pos;a._pos=[e,t,o]}for(var i=a._getSoundIds(r),u=0;u<i.length;u++){var d=a._soundById(i[u]);if(d){if("number"!=typeof e)return d._pos;d._pos=[e,t,o],d._node&&(d._panner&&!d._panner.pan||n(d,"spatial"),void 0!==d._panner.positionX?(d._panner.positionX.setValueAtTime(e,Howler.ctx.currentTime),d._panner.positionY.setValueAtTime(t,Howler.ctx.currentTime),d._panner.positionZ.setValueAtTime(o,Howler.ctx.currentTime)):d._panner.setPosition(e,t,o)),a._emit("pos",d._id)}}return a},Howl.prototype.orientation=function(e,t,o,r){var a=this;if(!a._webAudio)return a;if("loaded"!==a._state)return a._queue.push({event:"orientation",action:function(){a.orientation(e,t,o,r)}}),a;if(t="number"!=typeof t?a._orientation[1]:t,o="number"!=typeof o?a._orientation[2]:o,void 0===r){if("number"!=typeof e)return a._orientation;a._orientation=[e,t,o]}for(var i=a._getSoundIds(r),u=0;u<i.length;u++){var d=a._soundById(i[u]);if(d){if("number"!=typeof e)return d._orientation;d._orientation=[e,t,o],d._node&&(d._panner||(d._pos||(d._pos=a._pos||[0,0,-.5]),n(d,"spatial")),void 0!==d._panner.orientationX?(d._panner.orientationX.setValueAtTime(e,Howler.ctx.currentTime),d._panner.orientationY.setValueAtTime(t,Howler.ctx.currentTime),d._panner.orientationZ.setValueAtTime(o,Howler.ctx.currentTime)):d._panner.setOrientation(e,t,o)),a._emit("orientation",d._id)}}return a},Howl.prototype.pannerAttr=function(){var e,t,o,r=this,a=arguments;if(!r._webAudio)return r;if(0===a.length)return r._pannerAttr;if(1===a.length){if("object"!=typeof a[0])return(o=r._soundById(parseInt(a[0],10)))?o._pannerAttr:r._pannerAttr;e=a[0],void 0===t&&(e.pannerAttr||(e.pannerAttr={coneInnerAngle:e.coneInnerAngle,coneOuterAngle:e.coneOuterAngle,coneOuterGain:e.coneOuterGain,distanceModel:e.distanceModel,maxDistance:e.maxDistance,refDistance:e.refDistance,rolloffFactor:e.rolloffFactor,panningModel:e.panningModel}),r._pannerAttr={coneInnerAngle:void 0!==e.pannerAttr.coneInnerAngle?e.pannerAttr.coneInnerAngle:r._coneInnerAngle,coneOuterAngle:void 0!==e.pannerAttr.coneOuterAngle?e.pannerAttr.coneOuterAngle:r._coneOuterAngle,coneOuterGain:void 0!==e.pannerAttr.coneOuterGain?e.pannerAttr.coneOuterGain:r._coneOuterGain,distanceModel:void 0!==e.pannerAttr.distanceModel?e.pannerAttr.distanceModel:r._distanceModel,maxDistance:void 0!==e.pannerAttr.maxDistance?e.pannerAttr.maxDistance:r._maxDistance,refDistance:void 0!==e.pannerAttr.refDistance?e.pannerAttr.refDistance:r._refDistance,rolloffFactor:void 0!==e.pannerAttr.rolloffFactor?e.pannerAttr.rolloffFactor:r._rolloffFactor,panningModel:void 0!==e.pannerAttr.panningModel?e.pannerAttr.panningModel:r._panningModel})}else 2===a.length&&(e=a[0],t=parseInt(a[1],10));for(var i=r._getSoundIds(t),u=0;u<i.length;u++)if(o=r._soundById(i[u])){var d=o._pannerAttr;d={coneInnerAngle:void 0!==e.coneInnerAngle?e.coneInnerAngle:d.coneInnerAngle,coneOuterAngle:void 0!==e.coneOuterAngle?e.coneOuterAngle:d.coneOuterAngle,coneOuterGain:void 0!==e.coneOuterGain?e.coneOuterGain:d.coneOuterGain,distanceModel:void 0!==e.distanceModel?e.distanceModel:d.distanceModel,maxDistance:void 0!==e.maxDistance?e.maxDistance:d.maxDistance,refDistance:void 0!==e.refDistance?e.refDistance:d.refDistance,rolloffFactor:void 0!==e.rolloffFactor?e.rolloffFactor:d.rolloffFactor,panningModel:void 0!==e.panningModel?e.panningModel:d.panningModel};var s=o._panner;s?(s.coneInnerAngle=d.coneInnerAngle,s.coneOuterAngle=d.coneOuterAngle,s.coneOuterGain=d.coneOuterGain,s.distanceModel=d.distanceModel,s.maxDistance=d.maxDistance,s.refDistance=d.refDistance,s.rolloffFactor=d.rolloffFactor,s.panningModel=d.panningModel):(o._pos||(o._pos=r._pos||[0,0,-.5]),n(o,"spatial"))}return r},Sound.prototype.init=function(e){return function(){var n=this,t=n._parent;n._orientation=t._orientation,n._stereo=t._stereo,n._pos=t._pos,n._pannerAttr=t._pannerAttr,e.call(this),n._stereo?t.stereo(n._stereo):n._pos&&t.pos(n._pos[0],n._pos[1],n._pos[2],n._id)}}(Sound.prototype.init),Sound.prototype.reset=function(e){return function(){var n=this,t=n._parent;return n._orientation=t._orientation,n._stereo=t._stereo,n._pos=t._pos,n._pannerAttr=t._pannerAttr,n._stereo?t.stereo(n._stereo):n._pos?t.pos(n._pos[0],n._pos[1],n._pos[2],n._id):n._panner&&(n._panner.disconnect(0),n._panner=void 0,t._refreshBuffer(n)),e.call(this)}}(Sound.prototype.reset);var n=function(e,n){"spatial"===(n=n||"spatial")?(e._panner=Howler.ctx.createPanner(),e._panner.coneInnerAngle=e._pannerAttr.coneInnerAngle,e._panner.coneOuterAngle=e._pannerAttr.coneOuterAngle,e._panner.coneOuterGain=e._pannerAttr.coneOuterGain,e._panner.distanceModel=e._pannerAttr.distanceModel,e._panner.maxDistance=e._pannerAttr.maxDistance,e._panner.refDistance=e._pannerAttr.refDistance,e._panner.rolloffFactor=e._pannerAttr.rolloffFactor,e._panner.panningModel=e._pannerAttr.panningModel,void 0!==e._panner.positionX?(e._panner.positionX.setValueAtTime(e._pos[0],Howler.ctx.currentTime),e._panner.positionY.setValueAtTime(e._pos[1],Howler.ctx.currentTime),e._panner.positionZ.setValueAtTime(e._pos[2],Howler.ctx.currentTime)):e._panner.setPosition(e._pos[0],e._pos[1],e._pos[2]),void 0!==e._panner.orientationX?(e._panner.orientationX.setValueAtTime(e._orientation[0],Howler.ctx.currentTime),e._panner.orientationY.setValueAtTime(e._orientation[1],Howler.ctx.currentTime),e._panner.orientationZ.setValueAtTime(e._orientation[2],Howler.ctx.currentTime)):e._panner.setOrientation(e._orientation[0],e._orientation[1],e._orientation[2])):(e._panner=Howler.ctx.createStereoPanner(),e._panner.pan.setValueAtTime(e._stereo,Howler.ctx.currentTime)),e._panner.connect(e._node),e._paused||e._parent.pause(e._id,!0).play(e._id,!0)}}()}));const f=_({key:null,timer:0,current:void 0,queue:[]});function m(e,n){return`${c}${e}/audio/${n}.m4a`}function v(e){f.current&&(f.current.seek=0);const n=f.queue[e+1];f.current=n,(null==n?void 0:n.howl)?n.error?v(e+1):n.howl.play():y()}function h(){var e;if(!(null==(e=f.current)?void 0:e.howl))return;const n=f.current.howl;f.current.seek=n.seek()/n.duration()}function y(){p.Howler.unload(),f.key=null,clearInterval(f.timer),f.current=void 0,f.queue.length=0}var A=d(a(a({},s(f)),{canPlay:function(e,n,t){t.forEach(((t,o)=>{if(!t)return;const r=m(n,t);fetch(r).then((e=>e.blob())).then((({type:e})=>e.includes("audio"))).then((n=>e.value[o]=n?r:""))}))},play:function(e,n,t){var o;y(),f.key=null!=(o=null!=t?t:e)?o:n[0],f.timer=setInterval(h,50),f.queue=n.map((n=>e?m(e,n):n)).map(((e,n)=>{const t={i:n,src:e,seek:0};return e&&(t.howl=new p.Howl({src:[e],format:["m4a"],onplay:()=>f.current=t,onend:()=>v(n),onplayerror:()=>v(n),onloaderror:()=>{f.current&&l(f.current)!==t?t.error=!0:v(n)}})),t})),v(-1)},stop:y}));export{A as p};
