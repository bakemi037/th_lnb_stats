// セルが非空ならTrue（数値0も非空）
function isNonEmpty(v) {
  if (v === null || v === undefined) return false;
  if (typeof v === 'number') return true;
  return String(v).trim() !== "";
}

// セルが「0または空欄」ならTrue
function isZeroOrBlank(v) {
  if (v === null || v === undefined) return true;
  if (typeof v === 'number') return v === 0;
  var s = String(v).trim();
  if (s === "") return true;
  var n = Number(s);
  return !isNaN(n) && n === 0;
}

/**
 * 【平均最小化版】全空列出現直前の列インデックスを返す（0始まり）
 * 前提：データ列は左から連続していて、以降は全部空列（=最初の全空列で打ち切れる）
 * 全空なら-1
 * 先頭から続く全空列のみ許容
 */
function lastNonEmptyColIdx_contiguous(data) {
  var R = data.length;
  var C = (data[0] ? data[0].length : 0);
  if (R === 0 || C === 0) return -1;

  var lastCol = -1;

  for (var c = 0; c < C; c++) {
    var hasNonEmpty = false;
    for (var r = 0; r < R; r++) {
      if (isNonEmpty(data[r][c])) { hasNonEmpty = true; break; }
    }

    if (hasNonEmpty) {
      lastCol = c;
    } else {
      // 既に一度でも非空列が出ていて、その次が全空列なら、以降も空と見なして終了
      if (lastCol !== -1) break;
      // 先頭から全空が続いている場合は、もう少し先で初めて非空が来る可能性があるので続行
    }
  }
  return lastCol;
}

/**
 * [0,lastCol]の各列について、最終非空行（0始まり）を返す（全空列は-1）
 * lastColが-1の場合は空配列
 */
function lastNonEmptyRowIdxPerCol_uptoLastCol(data, lastCol) {
  if (lastCol < 0) return [];
  var R = data.length;
  var out = new Array(lastCol + 1).fill(-1);

  for (var c = 0; c <= lastCol; c++) {
    for (var r = R - 1; r >= 0; r--) {
      if (isNonEmpty(data[r][c])) { out[c] = r; break; }
    }
  }
  return out;
}
