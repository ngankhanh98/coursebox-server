/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "3357388aa9729d347969";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(4);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/*globals __resourceQuery */
if (true) {
	var hotPollInterval = +__resourceQuery.substr(1) || 10 * 60 * 1000;
	var log = __webpack_require__(2);

	var checkForUpdate = function checkForUpdate(fromUpdate) {
		if (module.hot.status() === "idle") {
			module.hot
				.check(true)
				.then(function(updatedModules) {
					if (!updatedModules) {
						if (fromUpdate) log("info", "[HMR] Update applied.");
						return;
					}
					__webpack_require__(3)(updatedModules, updatedModules);
					checkForUpdate(true);
				})
				.catch(function(err) {
					var status = module.hot.status();
					if (["abort", "fail"].indexOf(status) >= 0) {
						log("warning", "[HMR] Cannot apply update.");
						log("warning", "[HMR] " + log.formatError(err));
						log("warning", "[HMR] You need to restart the application!");
					} else {
						log("warning", "[HMR] Update failed: " + log.formatError(err));
					}
				});
		}
	};
	setInterval(checkForUpdate, hotPollInterval);
} else {}

/* WEBPACK VAR INJECTION */}.call(this, "?100"))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var logLevel = "info";

function dummy() {}

function shouldLog(level) {
	var shouldLog =
		(logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

function logGroup(logFn) {
	return function(level, msg) {
		if (shouldLog(level)) {
			logFn(msg);
		}
	};
}

module.exports = function(level, msg) {
	if (shouldLog(level)) {
		if (level === "info") {
			console.log(msg);
		} else if (level === "warning") {
			console.warn(msg);
		} else if (level === "error") {
			console.error(msg);
		}
	}
};

/* eslint-disable node/no-unsupported-features/node-builtins */
var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
/* eslint-enable node/no-unsupported-features/node-builtins */

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

module.exports.setLogLevel = function(level) {
	logLevel = level;
};

module.exports.formatError = function(err) {
	var message = err.message;
	var stack = err.stack;
	if (!stack) {
		return message;
	} else if (stack.indexOf(message) < 0) {
		return message + "\n" + stack;
	} else {
		return stack;
	}
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function(updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function(moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});
	var log = __webpack_require__(2);

	if (unacceptedModules.length > 0) {
		log(
			"warning",
			"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)"
		);
		unacceptedModules.forEach(function(moduleId) {
			log("warning", "[HMR]  - " + moduleId);
		});
	}

	if (!renewedModules || renewedModules.length === 0) {
		log("info", "[HMR] Nothing hot updated.");
	} else {
		log("info", "[HMR] Updated modules:");
		renewedModules.forEach(function(moduleId) {
			if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
				var parts = moduleId.split("!");
				log.groupCollapsed("info", "[HMR]  - " + parts.pop());
				log("info", "[HMR]  - " + moduleId);
				log.groupEnd("info");
			} else {
				log("info", "[HMR]  - " + moduleId);
			}
		});
		var numberIds = renewedModules.every(function(moduleId) {
			return typeof moduleId === "number";
		});
		if (numberIds)
			log(
				"info",
				"[HMR] Consider using the NamedModulesPlugin for module names."
			);
	}
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(5);
const swagger_1 = __webpack_require__(6);
const app_module_1 = __webpack_require__(7);
const http_exception_filter_1 = __webpack_require__(54);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('v1');
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Coursebox API')
        .setDescription('This APIs for Coursebox')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(process.env.PORT || 3000);
}
bootstrap();


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/core");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/swagger");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = __webpack_require__(8);
const config_1 = __webpack_require__(9);
const database_module_1 = __webpack_require__(10);
const auth_module_1 = __webpack_require__(18);
const course_controller_1 = __webpack_require__(44);
const course_module_1 = __webpack_require__(42);
const user_module_1 = __webpack_require__(21);
const participant_module_1 = __webpack_require__(43);
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            database_module_1.DatabaseModule,
            config_1.ConfigModule.forRoot(),
            course_module_1.CourseModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            participant_module_1.ParticipantModule,
        ],
        controllers: [course_controller_1.CourseController],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/common");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/config");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = __webpack_require__(8);
const typeorm_1 = __webpack_require__(11);
const database_provider_1 = __webpack_require__(12);
let DatabaseModule = class DatabaseModule {
    constructor(connection) {
        this.connection = connection;
    }
};
DatabaseModule = __decorate([
    common_1.Module({
        imports: [database_provider_1.DatabaseProvider],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.Connection !== "undefined" && typeorm_1.Connection) === "function" ? _a : Object])
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("typeorm");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseProvider = void 0;
const config_1 = __webpack_require__(9);
const typeorm_1 = __webpack_require__(13);
const mysql_config_1 = __webpack_require__(14);
const course_entity_1 = __webpack_require__(15);
const user_entity_1 = __webpack_require__(16);
const user_courses_course_entity_1 = __webpack_require__(17);
exports.DatabaseProvider = typeorm_1.TypeOrmModule.forRootAsync({
    imports: [
        config_1.ConfigModule.forRoot({
            load: [mysql_config_1.remoteMySql],
        }),
    ],
    inject: [config_1.ConfigService],
    useFactory: (configService) => {
        return {
            ...configService.get('remoteMySql'),
            entities: [course_entity_1.Course, user_entity_1.User, user_courses_course_entity_1.UserCoursesCourse],
            keepConnectionAlive: true,
            synchronize: false,
            autoLoadEntities: true,
        };
    },
});


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/typeorm");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.remoteMySql = exports.localMySql = void 0;
const config_1 = __webpack_require__(9);
exports.localMySql = config_1.registerAs('localMySql', () => ({
    type: 'mysql',
    host: process.env.L_MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT, 10),
    username: process.env.L_MYSQL_USERNAME,
    password: process.env.L_MYSQL_PASSWORD,
    database: process.env.L_MYSQL_DATABASE,
}));
exports.remoteMySql = config_1.registerAs('remoteMySql', () => ({
    type: 'mysql',
    host: process.env.R_MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT, 10),
    username: process.env.R_MYSQL_USERNAME,
    password: process.env.R_MYSQL_PASSWORD,
    database: process.env.R_MYSQL_DATABASE,
}));


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const swagger_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(11);
const user_entity_1 = __webpack_require__(16);
let Course = class Course {
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], Course.prototype, "courseId", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.Index({ fulltext: true }),
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Course.prototype, "title", void 0);
__decorate([
    swagger_1.ApiProperty(),
    typeorm_1.ManyToMany(() => user_entity_1.User, user => user.courses),
    __metadata("design:type", Array)
], Course.prototype, "users", void 0);
Course = __decorate([
    typeorm_1.Entity()
], Course);
exports.Course = Course;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = __webpack_require__(11);
const course_entity_1 = __webpack_require__(15);
let User = class User {
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], User.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Index({ fulltext: true }),
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "fullname", void 0);
__decorate([
    typeorm_1.ManyToMany(() => course_entity_1.Course, course => course.users),
    typeorm_1.JoinTable({
        name: 'user_courses_course',
        joinColumn: {
            name: 'userId',
            referencedColumnName: 'userId',
        },
        inverseJoinColumn: {
            name: 'courseId',
            referencedColumnName: 'courseId',
        },
    }),
    __metadata("design:type", Array)
], User.prototype, "courses", void 0);
User = __decorate([
    typeorm_1.Entity()
], User);
exports.User = User;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCoursesCourse = void 0;
const typeorm_1 = __webpack_require__(11);
let UserCoursesCourse = class UserCoursesCourse {
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], UserCoursesCourse.prototype, "userId", void 0);
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], UserCoursesCourse.prototype, "courseId", void 0);
__decorate([
    typeorm_1.Column({
        default: 'member',
    }),
    __metadata("design:type", String)
], UserCoursesCourse.prototype, "roleId", void 0);
UserCoursesCourse = __decorate([
    typeorm_1.Entity('user_courses_course')
], UserCoursesCourse);
exports.UserCoursesCourse = UserCoursesCourse;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = __webpack_require__(8);
const config_1 = __webpack_require__(9);
const jwt_1 = __webpack_require__(19);
const passport_1 = __webpack_require__(20);
const typeorm_1 = __webpack_require__(13);
const user_module_1 = __webpack_require__(21);
const local_strategy_1 = __webpack_require__(46);
const user_entity_1 = __webpack_require__(16);
const auth_controller_1 = __webpack_require__(49);
const auth_service_1 = __webpack_require__(48);
const resetpwd_jwt_strategy_1 = __webpack_require__(53);
const jwt_config_1 = __webpack_require__(22);
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule.forRoot({ load: [jwt_config_1.jwtResetPwd] })],
                inject: [config_1.ConfigService],
                useFactory: (ConfigService) => ({
                    ...ConfigService.get('reset-password'),
                }),
            }),
            passport_1.PassportModule.register({ defaultStrategy: 'reset-password' }),
            user_module_1.UserModule,
        ],
        providers: [auth_service_1.AuthService, local_strategy_1.LocalStrategy, resetpwd_jwt_strategy_1.ResetPwdJwtStrategy],
        controllers: [auth_controller_1.AuthController],
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/passport");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = __webpack_require__(8);
const config_1 = __webpack_require__(9);
const jwt_1 = __webpack_require__(19);
const passport_1 = __webpack_require__(20);
const typeorm_1 = __webpack_require__(13);
const jwt_config_1 = __webpack_require__(22);
const jwt_strategy_1 = __webpack_require__(23);
const user_entity_1 = __webpack_require__(16);
const user_controller_1 = __webpack_require__(26);
const user_service_1 = __webpack_require__(31);
const course_module_1 = __webpack_require__(42);
const participant_module_1 = __webpack_require__(43);
let UserModule = class UserModule {
};
UserModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule.forRoot({ load: [jwt_config_1.jwtAuth] })],
                inject: [config_1.ConfigService],
                useFactory: (ConfigService) => ({
                    ...ConfigService.get('auth'),
                }),
            }),
            passport_1.PassportModule.register({ defaultStrategy: 'auth' }),
            common_1.Logger,
            course_module_1.CourseModule, participant_module_1.ParticipantModule
        ],
        providers: [user_service_1.UserService, jwt_strategy_1.JwtStrategy],
        exports: [user_service_1.UserService],
        controllers: [user_controller_1.UserController],
    })
], UserModule);
exports.UserModule = UserModule;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtResetPwd = exports.jwtAuth = void 0;
const config_1 = __webpack_require__(9);
exports.jwtAuth = config_1.registerAs('auth', () => ({
    secret: process.env.JWT_AUTH_SECRET,
    signOptions: { expiresIn: process.env.JWT_EXPIRE },
}));
exports.jwtResetPwd = config_1.registerAs('reset-password', () => ({
    secret: process.env.JWT_RESET_PWD_SECRET,
    signOptions: { expiresIn: process.env.JWT_EXPIRE },
}));


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const passport_jwt_1 = __webpack_require__(24);
const passport_1 = __webpack_require__(20);
const common_1 = __webpack_require__(8);
const constants_1 = __webpack_require__(25);
let JwtStrategy = class JwtStrategy extends passport_1.PassportStrategy(passport_jwt_1.Strategy, constants_1.passportStrategies.AUTH) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromHeader('access-token'),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_AUTH_SECRET,
        });
    }
    async validate(payload) {
        return payload.username;
    }
};
JwtStrategy = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("passport-jwt");

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.passportStrategies = exports.exceptionMessage = exports.secret = void 0;
exports.secret = {
    saltRounds: 6,
    JWT_EXPIRE: '24h',
    JWT_AUTH_SECRET: '0Z4L3E4HMWR6KMGQ6CPJ-auth',
    JWT_RESET_PWD_SECRET: '3yn4plnx0n56mt4rsozgudoi41mlg0kgzpficvz5-resetpwd',
};
exports.exceptionMessage = {
    PASSWORD_INCORRECT: 'Password incorrect.',
    INTERNAL_ERROR: 'Internal error.',
    USER_NOT_FOUND: 'User not found.',
    USER_CREATED: 'User created.',
    USER_ALREADY_EXIST: 'Username already exist.',
};
exports.passportStrategies = {
    AUTH: 'auth',
    RESET_PASSWORD: 'reset-password',
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = __webpack_require__(8);
const swagger_1 = __webpack_require__(6);
const crud_1 = __webpack_require__(27);
const jwt_auth_guard_1 = __webpack_require__(28);
const user_dto_1 = __webpack_require__(29);
const user_service_1 = __webpack_require__(31);
let UserController = class UserController {
    constructor(service) {
        this.service = service;
    }
    async getMe(req) {
        console.log('req', req['user']);
        return await this.service.findUserByUsername(req['user']);
    }
    get base() {
        return this;
    }
    updateOneUser(req, dto) {
        return this.service.updateOneUser(req['user'], dto);
    }
    getManyBase(req) {
        return this.base.getManyBase(req);
    }
    deleteOneUser(req) {
        return this.service.deleteOneUser(req['user']);
    }
    enrollCourse(req) {
        return this.service.enrollCourse(req['user'], req.query['courseId']);
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.UseInterceptors(crud_1.CrudRequestInterceptor),
    swagger_1.ApiOkResponse({
        status: 200,
        type: user_dto_1.getUserBase,
        description: 'Retrive my user information',
    }),
    swagger_1.ApiHeader({
        name: 'access-token',
    }),
    common_1.Get('/me'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getMe", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    swagger_1.ApiOkResponse({
        type: user_dto_1.getUserBase,
    }),
    swagger_1.ApiHeader({
        name: 'access-token',
    }),
    common_1.Patch('/'),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof user_dto_1.updateUser !== "undefined" && user_dto_1.updateUser) === "function" ? _a : Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateOneUser", null);
__decorate([
    crud_1.Override(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof crud_1.CrudRequest !== "undefined" && crud_1.CrudRequest) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getManyBase", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    swagger_1.ApiHeader({
        name: 'access-token',
    }),
    common_1.Delete('/'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteOneUser", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    swagger_1.ApiHeader({ name: 'access-token' }),
    swagger_1.ApiQuery({ name: 'courseId', required: true }),
    common_1.Post('/enroll'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "enrollCourse", null);
UserController = __decorate([
    swagger_1.ApiTags('User'),
    crud_1.Crud({
        model: {
            type: user_dto_1.getUserBase,
        },
        routes: {
            only: ['getManyBase', 'getOneBase'],
        },
        params: {
            username: {
                field: 'username',
                type: 'string',
                primary: true,
            },
        },
        serialize: {
            get: user_dto_1.getUserBase,
            update: user_dto_1.getUserBase,
        },
    }),
    common_1.Controller('user'),
    __metadata("design:paramtypes", [typeof (_c = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _c : Object])
], UserController);
exports.UserController = UserController;


/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("@nestjsx/crud");

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(8);
const passport_1 = __webpack_require__(20);
let JwtAuthGuard = class JwtAuthGuard extends passport_1.AuthGuard('auth') {
};
JwtAuthGuard = __decorate([
    common_1.Injectable()
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUserBase = exports.getUser = void 0;
const swagger_1 = __webpack_require__(6);
const class_transformer_1 = __webpack_require__(30);
class getUser {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], getUser.prototype, "userId", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], getUser.prototype, "username", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], getUser.prototype, "password", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], getUser.prototype, "fullname", void 0);
exports.getUser = getUser;
class getUserBase {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], getUserBase.prototype, "userId", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], getUserBase.prototype, "username", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_transformer_1.Exclude(),
    __metadata("design:type", String)
], getUserBase.prototype, "password", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], getUserBase.prototype, "fullname", void 0);
exports.getUserBase = getUserBase;
class updateUser {
}
__decorate([
    class_transformer_1.Exclude(),
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], updateUser.prototype, "userId", void 0);
__decorate([
    class_transformer_1.Exclude(),
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], updateUser.prototype, "username", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], updateUser.prototype, "password", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], updateUser.prototype, "fullname", void 0);
exports.updateUser = updateUser;


/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("class-transformer");

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UserService_1, _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = __webpack_require__(8);
const jwt_1 = __webpack_require__(19);
const typeorm_1 = __webpack_require__(13);
const crud_typeorm_1 = __webpack_require__(32);
const utils_1 = __webpack_require__(33);
const user_entity_1 = __webpack_require__(16);
const course_service_1 = __webpack_require__(40);
const participant_service_1 = __webpack_require__(41);
let UserService = UserService_1 = class UserService extends crud_typeorm_1.TypeOrmCrudService {
    constructor(userRepository, jwtService, courseService, participantService) {
        super(userRepository);
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.courseService = courseService;
        this.participantService = participantService;
        this.logger = new common_1.Logger(UserService_1.name);
    }
    async findUserByUsername(username) {
        return await this.userRepository.findOne({ username: username });
    }
    async getAccessToken(user) {
        const payload = { username: user.username };
        const accessToken = this.jwtService.sign(payload);
        this.logger.debug(accessToken);
        this.logger.debug(this.jwtService);
        return await { accessToken: accessToken };
    }
    async updateOneUser(username, user) {
        const oldUser = await this.findUserByUsername(username);
        if (!oldUser)
            throw new common_1.NotFoundException();
        const newPwd = utils_1.hash(user === null || user === void 0 ? void 0 : user.password);
        const newUser = (user === null || user === void 0 ? void 0 : user.password) ? { ...oldUser, ...user, password: newPwd }
            : { ...oldUser, ...user };
        return await this.userRepository.save(newUser);
    }
    async deleteOneUser(username) {
        console.log('username', username);
        const oldUser = await this.findUserByUsername(username);
        if (!oldUser)
            throw new common_1.NotFoundException();
        return await this.userRepository.delete({ username: username });
    }
    async enrollCourse(username, courseId) {
        try {
            let user = await this.findUserByUsername(username);
            if (!user)
                throw new common_1.NotFoundException();
            const course = await this.courseService.findCourseById(courseId);
            user = { ...user, courses: [{ ...course }] };
            return await this.userRepository.save(user);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async findByFilter(filters) {
        const keys = Object.keys(filters);
        const values = Object.values(filters);
        const promises = keys.map((key, index) => new Promise(resolve => {
            resolve(this.repo
                .createQueryBuilder()
                .select()
                .where(`MATCH (${key}) AGAINST ('${values[index]}' IN BOOLEAN MODE)`)
                .getMany());
        }));
        return Promise.all(promises).then(value => {
            console.log(value);
            return value;
        });
    }
};
UserService = UserService_1 = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof course_service_1.CourseService !== "undefined" && course_service_1.CourseService) === "function" ? _b : Object, typeof (_c = typeof participant_service_1.ParticipantService !== "undefined" && participant_service_1.ParticipantService) === "function" ? _c : Object])
], UserService);
exports.UserService = UserService;


/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("@nestjsx/crud-typeorm");

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.hash = exports.compare = exports.generateId = exports.verify = exports.sign = void 0;
const jwt_utils_1 = __webpack_require__(34);
Object.defineProperty(exports, "sign", { enumerable: true, get: function () { return jwt_utils_1.sign; } });
Object.defineProperty(exports, "verify", { enumerable: true, get: function () { return jwt_utils_1.verify; } });
const id_generator_utils_1 = __webpack_require__(36);
Object.defineProperty(exports, "generateId", { enumerable: true, get: function () { return id_generator_utils_1.generateId; } });
const password_utils_1 = __webpack_require__(38);
Object.defineProperty(exports, "compare", { enumerable: true, get: function () { return password_utils_1.compare; } });
Object.defineProperty(exports, "hash", { enumerable: true, get: function () { return password_utils_1.hash; } });


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.sign = void 0;
const jsonwebtoken_1 = __webpack_require__(35);
function sign(payload, secretkey) {
    return jsonwebtoken_1.default.sign(payload, secretkey);
}
exports.sign = sign;
function verify(token, secretkey) {
    var _a;
    return (_a = jsonwebtoken_1.default.verify(token, secretkey)) !== null && _a !== void 0 ? _a : false;
}
exports.verify = verify;


/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.generateId = void 0;
const crypto = __webpack_require__(37);
function generateId(text) {
    const hmac = crypto.createHmac('sha1', process.env.JWT_ID_SECRET);
    hmac.update(text);
    return hmac.digest('hex');
}
exports.generateId = generateId;


/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = exports.hash = void 0;
const bcrypt = __webpack_require__(39);
function hash(text) {
    return bcrypt.hashSync(text, 6, async function (err, hash) {
        if (err)
            throw Error(err.message);
        return hash;
    });
}
exports.hash = hash;
async function compare(password, hash) {
    return await bcrypt.compare(password, hash);
}
exports.compare = compare;


/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
const common_1 = __webpack_require__(8);
const typeorm_1 = __webpack_require__(13);
const crud_typeorm_1 = __webpack_require__(32);
const utils_1 = __webpack_require__(33);
const course_entity_1 = __webpack_require__(15);
let CourseService = class CourseService extends crud_typeorm_1.TypeOrmCrudService {
    constructor(repo) {
        super(repo);
    }
    createCourse(dto) {
        const course = new course_entity_1.Course();
        course.title = dto.title;
        course.courseId = utils_1.generateId(course.title + new Date().toUTCString()).slice(0, 9);
        return this.repo.save(course);
    }
    async findCourseById(courseId) {
        const result = await this.repo.findOne({ courseId: courseId });
        if (!result) {
            throw new common_1.NotFoundException();
        }
        return result;
    }
    findByFilter(filters) {
        const keys = Object.keys(filters);
        const values = Object.values(filters);
        console.log('keys', keys);
        console.log('values', values);
        const promises = keys.map((key, index) => new Promise(resolve => {
            Object.keys(this.repo.metadata.propertiesMap).includes(key)
                ? resolve(this.repo
                    .createQueryBuilder()
                    .select()
                    .where(`MATCH (${key}) AGAINST ('${values[index]}' IN BOOLEAN MODE)`)
                    .getMany())
                : resolve(null);
        }));
        return Promise.all(promises).then(value => {
            console.log(value);
            return value;
        });
    }
    async findByTeacherName(fullname) {
        return;
    }
};
CourseService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(course_entity_1.Course)),
    __metadata("design:paramtypes", [Object])
], CourseService);
exports.CourseService = CourseService;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantService = void 0;
const common_1 = __webpack_require__(8);
const typeorm_1 = __webpack_require__(13);
const user_courses_course_entity_1 = __webpack_require__(17);
let ParticipantService = class ParticipantService {
    constructor(participantRepository) {
        this.participantRepository = participantRepository;
    }
    async getParticipantByCourseId(courseId) {
        const result = await this.participantRepository.find({
            courseId: courseId,
        });
        return result;
    }
    async removeEntry(userId, courseId) {
        return await this.participantRepository.delete({
            userId: userId,
            courseId: courseId,
        });
    }
};
ParticipantService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_courses_course_entity_1.UserCoursesCourse)),
    __metadata("design:paramtypes", [Object])
], ParticipantService);
exports.ParticipantService = ParticipantService;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModule = void 0;
const common_1 = __webpack_require__(8);
const typeorm_1 = __webpack_require__(13);
const course_entity_1 = __webpack_require__(15);
const participant_module_1 = __webpack_require__(43);
const course_controller_1 = __webpack_require__(44);
const course_service_1 = __webpack_require__(40);
let CourseModule = class CourseModule {
};
CourseModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([course_entity_1.Course]), participant_module_1.ParticipantModule],
        providers: [course_service_1.CourseService],
        exports: [course_service_1.CourseService],
        controllers: [course_controller_1.CourseController],
    })
], CourseModule);
exports.CourseModule = CourseModule;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantModule = void 0;
const common_1 = __webpack_require__(8);
const typeorm_1 = __webpack_require__(13);
const user_courses_course_entity_1 = __webpack_require__(17);
const participant_service_1 = __webpack_require__(41);
let ParticipantModule = class ParticipantModule {
};
ParticipantModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_courses_course_entity_1.UserCoursesCourse])],
        providers: [participant_service_1.ParticipantService],
        exports: [participant_service_1.ParticipantService],
    })
], ParticipantModule);
exports.ParticipantModule = ParticipantModule;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseController = void 0;
const common_1 = __webpack_require__(8);
const swagger_1 = __webpack_require__(6);
const crud_1 = __webpack_require__(27);
const course_entity_1 = __webpack_require__(15);
const participant_service_1 = __webpack_require__(41);
const course_service_1 = __webpack_require__(40);
const course_dto_1 = __webpack_require__(45);
let CourseController = class CourseController {
    constructor(service, participantService) {
        this.service = service;
        this.participantService = participantService;
    }
    get base() {
        return this;
    }
    updateOneBase(req, dto) {
        return this.base.updateOneBase(req, dto);
    }
    async createOneCourse(req) {
        return await this.service.createCourse(req['body']);
    }
    async find(filters) {
        return this.service.findByFilter(filters);
    }
    getParticipantByCourseId(param) {
        return this.participantService.getParticipantByCourseId(param['courseId']);
    }
    async removeByCourseIdAndUserId(param) {
        return await this.participantService.removeEntry(param['userId'], param['courseId']);
    }
};
__decorate([
    crud_1.Override(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof crud_1.CrudRequest !== "undefined" && crud_1.CrudRequest) === "function" ? _a : Object, typeof (_b = typeof course_dto_1.updateCourseDto !== "undefined" && course_dto_1.updateCourseDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], CourseController.prototype, "updateOneBase", null);
__decorate([
    common_1.Post('/'),
    swagger_1.ApiOperation({ summary: 'Create a course' }),
    swagger_1.ApiBody({ type: course_entity_1.Course }),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof course_dto_1.updateCourseDto !== "undefined" && course_dto_1.updateCourseDto) === "function" ? _d : Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], CourseController.prototype, "createOneCourse", null);
__decorate([
    common_1.UseInterceptors(crud_1.CrudRequestInterceptor),
    common_1.Get('/search'),
    swagger_1.ApiQuery({ name: 'title', required: false }),
    swagger_1.ApiQuery({ name: 'teacher', required: false }),
    swagger_1.ApiOperation({ summary: 'Search course' }),
    swagger_1.ApiOkResponse({
        status: 200,
        type: course_dto_1.getCourseDto,
        isArray: true,
        description: 'Found results',
    }),
    __param(0, common_1.Query('')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], CourseController.prototype, "find", null);
__decorate([
    common_1.Get('/:courseId/participant'),
    swagger_1.ApiParam({ name: 'courseId' }),
    swagger_1.ApiOperation({ summary: 'Get participant in courseId' }),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "getParticipantByCourseId", null);
__decorate([
    common_1.Delete('/:courseId/:userId'),
    swagger_1.ApiParam({ name: 'courseId' }),
    swagger_1.ApiParam({ name: 'userId' }),
    swagger_1.ApiOperation({
        summary: 'Unenroll or reject user from course',
    }),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "removeByCourseIdAndUserId", null);
CourseController = __decorate([
    crud_1.Crud({
        model: {
            type: course_entity_1.Course,
        },
        params: {
            courseId: {
                field: 'courseId',
                type: 'string',
                primary: true,
            },
        },
        routes: {
            only: [
                'updateOneBase',
                'getOneBase',
                'replaceOneBase',
                'deleteOneBase',
                'getManyBase',
            ],
        },
        serialize: {
            create: course_dto_1.updateCourseDto,
            update: course_dto_1.updateCourseDto,
        },
    }),
    swagger_1.ApiTags('Course'),
    common_1.Controller('course'),
    __metadata("design:paramtypes", [typeof (_g = typeof course_service_1.CourseService !== "undefined" && course_service_1.CourseService) === "function" ? _g : Object, typeof (_h = typeof participant_service_1.ParticipantService !== "undefined" && participant_service_1.ParticipantService) === "function" ? _h : Object])
], CourseController);
exports.CourseController = CourseController;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourseDto = exports.updateCourseDto = void 0;
const swagger_1 = __webpack_require__(6);
class updateCourseDto {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], updateCourseDto.prototype, "title", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Array)
], updateCourseDto.prototype, "users", void 0);
exports.updateCourseDto = updateCourseDto;
class getCourseDto {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], getCourseDto.prototype, "courseId", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], getCourseDto.prototype, "title", void 0);
exports.getCourseDto = getCourseDto;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStrategy = void 0;
const common_1 = __webpack_require__(8);
const passport_1 = __webpack_require__(20);
const passport_local_1 = __webpack_require__(47);
const auth_service_1 = __webpack_require__(48);
let LocalStrategy = class LocalStrategy extends passport_1.PassportStrategy(passport_local_1.Strategy) {
    constructor(authService) {
        super();
        this.authService = authService;
    }
    async validate(username, password) {
        const user = await this.authService.validateUser(username, password);
        if (!user)
            throw new common_1.UnauthorizedException();
        return user;
    }
};
LocalStrategy = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], LocalStrategy);
exports.LocalStrategy = LocalStrategy;


/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AuthService_1, _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = __webpack_require__(8);
const jwt_1 = __webpack_require__(19);
const typeorm_1 = __webpack_require__(13);
const constants_1 = __webpack_require__(25);
const user_entity_1 = __webpack_require__(16);
const user_service_1 = __webpack_require__(31);
const typeorm_2 = __webpack_require__(11);
const utils_1 = __webpack_require__(33);
let AuthService = AuthService_1 = class AuthService {
    constructor(authRepository, jwtService, userService) {
        this.authRepository = authRepository;
        this.jwtService = jwtService;
        this.userService = userService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async validateUser(username, password) {
        const user = await this.userService.findUserByUsername(username);
        const verify = user ? await utils_1.compare(password, user.password) : false;
        if (user && verify) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async register(user) {
        const newUser = new user_entity_1.User();
        const { username, password } = user;
        const existedUser = await this.userService.findUserByUsername(user.username);
        if (!existedUser)
            try {
                newUser.userId = utils_1.generateId(username).slice(0, 9);
                console.log('newUser.userId', newUser.userId);
                newUser.password = utils_1.hash(password);
                newUser.username = username;
                return await this.authRepository.save(newUser);
            }
            catch (error) {
                throw new common_1.InternalServerErrorException(error.message);
            }
        throw new common_1.ConflictException(constants_1.exceptionMessage.USER_ALREADY_EXIST);
    }
    async login(user) {
        return await this.userService.getAccessToken(user);
    }
    async getResetPwdToken(username) {
        const existedUser = await this.userService.findUserByUsername(username);
        const payload = { username: username };
        this.logger.debug(this.jwtService);
        if (!existedUser)
            throw new common_1.NotFoundException(constants_1.exceptionMessage.USER_NOT_FOUND);
        return await this.jwtService.sign(payload);
    }
    async setPassword(username, newPassword) {
        console.log(this.authRepository.manager);
        return await this.authRepository.update({ username: username }, { password: utils_1.hash(newPassword) });
    }
};
AuthService = AuthService_1 = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object, typeof (_c = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _c : Object])
], AuthService);
exports.AuthService = AuthService;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AuthController_1, _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = __webpack_require__(8);
const swagger_1 = __webpack_require__(6);
const jwt_resetpwd_guard_1 = __webpack_require__(50);
const user_service_1 = __webpack_require__(31);
const local_auth_guard_1 = __webpack_require__(51);
const constants_1 = __webpack_require__(25);
const auth_service_1 = __webpack_require__(48);
const auth_dto_1 = __webpack_require__(52);
let AuthController = AuthController_1 = class AuthController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
        this.logger = new common_1.Logger(AuthController_1.name);
    }
    async login(req) {
        this.logger.debug(req);
        return await this.authService.login(req);
    }
    async register(user) {
        this.logger.debug(user);
        await this.authService.register(user);
    }
    async getURLToken(req) {
        const username = req.headers['username'].toString();
        return await this.authService.getResetPwdToken(username);
    }
    async resetPassword(req, request) {
        const username = req['user'];
        const password = req.body['password'];
        return await this.authService.setPassword(username, password);
    }
};
__decorate([
    common_1.UseGuards(local_auth_guard_1.LocalAuthGuard),
    common_1.Post('/login'),
    swagger_1.ApiOkResponse({
        description: 'Authenticated',
    }),
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.FORBIDDEN,
        description: constants_1.exceptionMessage.PASSWORD_INCORRECT,
    }),
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: constants_1.exceptionMessage.INTERNAL_ERROR,
    }),
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.NOT_FOUND,
        description: constants_1.exceptionMessage.USER_NOT_FOUND,
    }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_dto_1.authDTO !== "undefined" && auth_dto_1.authDTO) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    common_1.Post('/register'),
    swagger_1.ApiOkResponse({
        status: common_1.HttpStatus.CREATED,
        description: constants_1.exceptionMessage.USER_CREATED,
    }),
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: constants_1.exceptionMessage.INTERNAL_ERROR,
    }),
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.CONFLICT,
        description: constants_1.exceptionMessage.USER_ALREADY_EXIST,
    }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof auth_dto_1.createUserDTO !== "undefined" && auth_dto_1.createUserDTO) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    common_1.Get('/forgot-password'),
    swagger_1.ApiHeader({ name: 'username' }),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof common_1.Request !== "undefined" && common_1.Request) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getURLToken", null);
__decorate([
    common_1.UseGuards(jwt_resetpwd_guard_1.JwtResetPwdGuard),
    swagger_1.ApiQuery({ name: 'token' }),
    common_1.Post('/reset-password'),
    __param(0, common_1.Request()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_d = typeof auth_dto_1.resetPwdDTO !== "undefined" && auth_dto_1.resetPwdDTO) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
AuthController = AuthController_1 = __decorate([
    swagger_1.ApiTags('Authentication'),
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [typeof (_e = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _e : Object, typeof (_f = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _f : Object])
], AuthController);
exports.AuthController = AuthController;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtResetPwdGuard = void 0;
const common_1 = __webpack_require__(8);
const passport_1 = __webpack_require__(20);
let JwtResetPwdGuard = class JwtResetPwdGuard extends passport_1.AuthGuard('reset-password') {
};
JwtResetPwdGuard = __decorate([
    common_1.Injectable()
], JwtResetPwdGuard);
exports.JwtResetPwdGuard = JwtResetPwdGuard;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalAuthGuard = void 0;
const common_1 = __webpack_require__(8);
const passport_1 = __webpack_require__(20);
let LocalAuthGuard = class LocalAuthGuard extends passport_1.AuthGuard('local') {
};
LocalAuthGuard = __decorate([
    common_1.Injectable()
], LocalAuthGuard);
exports.LocalAuthGuard = LocalAuthGuard;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPwdDTO = exports.createUserDTO = exports.authDTO = void 0;
const swagger_1 = __webpack_require__(6);
class authDTO {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], authDTO.prototype, "username", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], authDTO.prototype, "password", void 0);
exports.authDTO = authDTO;
class createUserDTO {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], createUserDTO.prototype, "username", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], createUserDTO.prototype, "password", void 0);
exports.createUserDTO = createUserDTO;
class resetPwdDTO {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], resetPwdDTO.prototype, "password", void 0);
exports.resetPwdDTO = resetPwdDTO;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPwdJwtStrategy = void 0;
const passport_jwt_1 = __webpack_require__(24);
const passport_1 = __webpack_require__(20);
const common_1 = __webpack_require__(8);
const constants_1 = __webpack_require__(25);
let ResetPwdJwtStrategy = class ResetPwdJwtStrategy extends passport_1.PassportStrategy(passport_jwt_1.Strategy, constants_1.passportStrategies.RESET_PASSWORD) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                passport_jwt_1.ExtractJwt.fromUrlQueryParameter('token'),
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_RESET_PWD_SECRET,
        });
    }
    async validate(payload) {
        return payload.username;
    }
};
ResetPwdJwtStrategy = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], ResetPwdJwtStrategy);
exports.ResetPwdJwtStrategy = ResetPwdJwtStrategy;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = __webpack_require__(8);
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        const message = exception.message;
        response.status(status).json({
            statusCode: status,
            message: message,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
};
HttpExceptionFilter = __decorate([
    common_1.Catch(common_1.HttpException)
], HttpExceptionFilter);
exports.HttpExceptionFilter = HttpExceptionFilter;


/***/ })
/******/ ]);