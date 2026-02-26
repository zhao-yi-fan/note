// 版本号对比方法, 加入只考虑如下几种版本号命名方式，请写出一个方法：输入 curVersion, nextVersion, 输出 -1（没有新版本），0（当前版本就是新版本），1（有新版本，需要更新）
// ```
// 1.0.0
// 1.0.0.20190926
// 1.0.0.20190926_base
// 1.0.0.20190926_alpha
// 1.0.0.20190926_beta
// 1.0.0.20190926_rc
// 1.0.0.20190926_release
//

function compareVersion(curVersion, nextVersion) {
  const NO_NEW_VERSION = -1; // 没有新版本
  const NOT_PUBLISH = 0; // （当前版本就是新版本）
  const HAS_NEW_VERSION = 1; // 有新版本，需要更新
  const MODIFY_TYPES = ["base", "alpha", "beta", "rc", "release"];

  if (curVersion && nextVersion && curVersion === nextVersion) {
    return NOT_PUBLISH;
  }

  const [curMain, curSecond, curThree, curModify] = curVersion.split(".");
  const [nextMain, nextSecond, nextThree, nextModify] = nextVersion.split(".");

  if (
    nextMain > curMain ||
    (nextMain === curMain && nextSecond > curSecond) ||
    (nextMain === curMain && nextSecond === curSecond && nextThree > curThree)
  ) {
    return HAS_NEW_VERSION;
  }

  const currType = curModify.split("_")[1]; // base
  const nextType = nextModify.split("_")[1]; // release

  const currTypeIndex = MODIFY_TYPES.findIndex(currType);
  const nextTypeIndex = MODIFY_TYPES.findIndex(nextType);
  if (nextTypeIndex > currTypeIndex) {
    return HAS_NEW_VERSION;
  }

  return NO_NEW_VERSION;
}
console.log(compareVersion("1.0.0", "1.1.0"));
