"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailableImagePaths = void 0;
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var fs_1 = require("fs");
var sharp_1 = __importDefault(require("sharp"));
var getAvailableImagePaths = function () { return __awaiter(void 0, void 0, void 0, function () {
    var availableImages;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fs_1.promises.readdir(path_1.default.join(__dirname, '../../../assets/full'))];
            case 1:
                availableImages = _a.sent();
                return [2 /*return*/, availableImages.map(function (image) { return image.split('.')[0]; })];
        }
    });
}); };
exports.getAvailableImagePaths = getAvailableImagePaths;
var images = express_1.default.Router();
images.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var imageFullPath, imageThumbPath, imageThumbPathWidthOnly, availableImagePaths, filenameErrMessgae, err_1, err_2, errMsg, err_3, err_4, errMsg;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                imageFullPath = path_1.default.join(__dirname, "../../../assets/full/".concat(req.query.filename, ".jpg"));
                imageThumbPath = path_1.default.join(__dirname, "../../../assets/thumb/".concat(req.query.filename, "-w").concat(req.query.width, "-h").concat(req.query.height, ".jpg"));
                imageThumbPathWidthOnly = path_1.default.join(__dirname, "../../../assets/thumb/".concat(req.query.filename, "-w").concat(req.query.width, ".jpg"));
                return [4 /*yield*/, (0, exports.getAvailableImagePaths)()];
            case 1:
                availableImagePaths = _a.sent();
                filenameErrMessgae = "<p>please enter a valid image name such as:</P>\n                              <p>http://localhost:3000/api/images?filename=[".concat(availableImagePaths, "]</p>");
                if (!!req.query.filename) return [3 /*break*/, 2];
                res.send(filenameErrMessgae);
                return [3 /*break*/, 24];
            case 2:
                if (!(req.query.filename && !req.query.width && !req.query.height)) return [3 /*break*/, 3];
                res.sendFile(path_1.default.join(imageFullPath), function (err) {
                    if (err) {
                        res.status(404).send("<p>".concat(err, ":</P>").concat(filenameErrMessgae));
                    }
                });
                return [3 /*break*/, 24];
            case 3:
                if (!(req.query.filename && req.query.width && req.query.height)) return [3 /*break*/, 13];
                _a.label = 4;
            case 4:
                _a.trys.push([4, 6, 11, 12]);
                return [4 /*yield*/, fs_1.promises.access(imageThumbPath)];
            case 5:
                _a.sent();
                return [3 /*break*/, 12];
            case 6:
                err_1 = _a.sent();
                _a.label = 7;
            case 7:
                _a.trys.push([7, 9, , 10]);
                return [4 /*yield*/, (0, sharp_1.default)(imageFullPath)
                        .resize(+req.query.width, +req.query.height)
                        .toFormat('jpeg')
                        .toFile(imageThumbPath)];
            case 8:
                _a.sent();
                return [3 /*break*/, 10];
            case 9:
                err_2 = _a.sent();
                errMsg = "<p>image processing failed! ".concat(err_2, "</p>");
                if (errMsg.includes('missing')) {
                    res.status(404).send("".concat(errMsg, " ").concat(filenameErrMessgae));
                }
                else {
                    res.status(404).send("image processing failed! ".concat(err_2));
                }
                return [3 /*break*/, 10];
            case 10: return [3 /*break*/, 12];
            case 11:
                res.sendFile(imageThumbPath);
                return [7 /*endfinally*/];
            case 12: return [3 /*break*/, 24];
            case 13:
                if (!(req.query.filename && req.query.width && !req.query.height)) return [3 /*break*/, 23];
                _a.label = 14;
            case 14:
                _a.trys.push([14, 16, 21, 22]);
                return [4 /*yield*/, fs_1.promises.access(imageThumbPathWidthOnly)];
            case 15:
                _a.sent();
                return [3 /*break*/, 22];
            case 16:
                err_3 = _a.sent();
                _a.label = 17;
            case 17:
                _a.trys.push([17, 19, , 20]);
                return [4 /*yield*/, (0, sharp_1.default)(imageFullPath)
                        .resize(+req.query.width)
                        .toFormat('jpeg')
                        .toFile(imageThumbPathWidthOnly)];
            case 18:
                _a.sent();
                return [3 /*break*/, 20];
            case 19:
                err_4 = _a.sent();
                errMsg = "<p>image processing failed! ".concat(err_4, "</p>");
                if (errMsg.includes('missing')) {
                    res.status(404).send("".concat(errMsg, " ").concat(filenameErrMessgae));
                }
                else {
                    res.status(404).send("image processing failed! ".concat(err_4));
                }
                return [3 /*break*/, 20];
            case 20: return [3 /*break*/, 22];
            case 21:
                res.sendFile(imageThumbPathWidthOnly);
                return [7 /*endfinally*/];
            case 22: return [3 /*break*/, 24];
            case 23:
                res.send("images route");
                _a.label = 24;
            case 24: return [2 /*return*/];
        }
    });
}); });
exports.default = images;
