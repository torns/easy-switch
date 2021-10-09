export const getPixel = (image: HTMLImageElement) => {
  const canvas = document.createElement('canvas');
  const div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.top = '50%';
  div.style.left = '50%';
  div.style.zIndex = '9999';
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.drawImage(image, 0, 0, image.width, image.height);
    let pixel: ImageData = ctx.getImageData(0, 0, image.width, image.height);
    /**
     * 灰度
     */
    for (let i = 0; i < pixel.data.length; i += 4) {
      const [r, g, b] = [pixel.data[i], pixel.data[i + 1], pixel.data[i + 2]];
      const lm = 0.299 * r + 0.587 * g + 0.114 * b;
      pixel.data[i] = lm;
      pixel.data[i + 1] = lm;
      pixel.data[i + 2] = lm;
    }
    /**
     * 二值化
     */
    var index = 255 * 0.7; //阈值
    for (var i = 0; i < pixel.data.length; i += 4) {
      var R = pixel.data[i]; //R(0-255)
      var G = pixel.data[i + 1]; //G(0-255)
      var B = pixel.data[i + 2]; //B(0-255)
      var Alpha = pixel.data[i + 3]; //Alpha(0-255)
      var sum = (R + G + B) / 3;
      if (sum > index) {
        pixel.data[i] = 255;
        pixel.data[i + 1] = 255;
        pixel.data[i + 2] = 255;
        pixel.data[i + 3] = Alpha;
      } else {
        pixel.data[i] = 0;
        pixel.data[i + 1] = 0;
        pixel.data[i + 2] = 0;
        pixel.data[i + 3] = Alpha;
      }
    }
    // erosionDIB(pixel.data, image.width, image.height, 0);
    dilationDIB(pixel.data, image.width, image.height, 0);
    // thinDIB(pixel.data, image.width, image.height);
    ctx.putImageData(pixel, 0, 0);
    div.appendChild(canvas);
    document.body.appendChild(div);
    return canvas;
  }
};
/**
 * 说明：
 * 该函数用于对图像进行细化运算
 * 要求目标图像为只有0和255两个灰度值的灰度图像
 * @param data          图像数据
 * @param lWidth        原图像宽度(像素数)
 * @param lHeight       原图像高度(像素数)
 */
function thinDIB(data: Uint8ClampedArray, lWidth: number, lHeight: number) {
  // 保存原始数据
  const dataInit = [];
  for (let i = 0, len = data.length; i < len; i++) {
    dataInit[i] = data[i];
  }
  let bModified = true;
  const neighBour = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  while (bModified) {
    bModified = false;
    for (let j = 1; j < lHeight - 1; j++) {
      for (let i = 1; i < lWidth - 1; i++) {
        let bCondition1 = false;
        let bCondition2 = false;
        let bCondition3 = false;
        let bCondition4 = false;
        const lpSrc = j * lWidth + i;
        // 如果原图像中当前点为白色，则跳过
        if (dataInit[lpSrc * 4]) {
          continue;
        }
        // 获取当前点相邻的3*3区域内像素值，0代表白色，1代表黑色
        const bourLength = 3;
        for (let m = 0; m < bourLength; m++) {
          for (let n = 0; n < bourLength; n++) {
            const pixel = lpSrc + (2 - m - 1) * lWidth + (n - 1);
            neighBour[m][n] = 255 - dataInit[pixel * 4] ? 1 : 0;
          }
        }
        const borderArr = [
          neighBour[0][1],
          neighBour[0][0],
          neighBour[1][0],
          neighBour[2][0],
          neighBour[2][1],
          neighBour[2][2],
          neighBour[1][2],
          neighBour[0][2],
        ];
        let nCount1 = 0;
        let nCount2 = 0;
        for (let i = 0, len = borderArr.length; i < len; i++) {
          nCount1 += borderArr[i];
          if (borderArr[i] === 0 && borderArr[(i + 1) % len] === 1) {
            nCount2++;
          }
        }
        // 判断 2<= NZ(P1)<=6
        if (nCount1 >= 2 && nCount1 <= 6) {
          bCondition1 = true;
        }
        // 判断Z0(P1) = 1
        if (nCount2 === 1) {
          bCondition2 = true;
        }
        // 判断P2*P4*P8=0
        if (borderArr[0] * borderArr[2] * borderArr[6] === 0) {
          bCondition3 = true;
        }
        // 判断P2*P4*P6=0
        if (borderArr[0] * borderArr[2] * borderArr[4] === 0) {
          bCondition4 = true;
        }
        for (let k = 0; k < 3; k++) {
          if (bCondition1 && bCondition2 && bCondition3 && bCondition4) {
            data[lpSrc * 4 + k] = 255;
            bModified = true;
          } else {
            data[lpSrc * 4 + k] = 0;
          }
        }
      }
    }
    if (bModified) {
      for (let i = 0, len = data.length; i < len; i++) {
        dataInit[i] = data[i];
      }
    }
  }
}
/**
 * 说明：
 * 该函数用于对图像进行腐蚀运算。
 * 结构元素为水平方向或垂直方向的三个点，中间点位于原点；
 * 或者由用户自己定义3*3的结构元素。
 * 要求目标图像为只有0和255两个灰度值的灰度图像
 * @param data          图像数据
 * @param lWidth        原图像宽度(像素数)
 * @param lHeight       原图像高度(像素数)
 * @param nMode         腐蚀方式，0表示水平方向，1表示垂直方向，2表示自定义结构元素
 */
function erosionDIB(data: Uint8ClampedArray, lWidth: number, lHeight: number, nMode: number) {
  // 保存原始数据
  const dataInit = [];
  for (let i = 0, len = data.length; i < len; i++) {
    dataInit[i] = data[i];
  }
  if (nMode === 0) {
    // 使用水平方向的结构元素进行腐蚀
    for (let j = 0; j < lHeight; j++) {
      // 由于使用1*3的结构元素，为防止越界，所以不处理最左边和最右边的两列像素
      for (let i = 1; i < lWidth - 1; i++) {
        const lpSrc = j * lWidth + i;
        for (let k = 0; k < 3; k++) {
          // 如果原图像中当前点自身或者左右如果有一个点不是黑色，则将目标图像中的当前点赋成白色
          for (let n = 0; n < 3; n++) {
            const pixel = lpSrc + n - 1;
            data[lpSrc * 4 + k] = 0;
            if (dataInit[pixel * 4 + k] === 255) {
              data[lpSrc * 4 + k] = 255;
              break;
            }
          }
        }
      }
    }
  } else if (nMode === 1) {
    // 使用垂直方向的结构元素进行腐蚀
    // 由于使用1*3的结构元素，为防止越界，所以不处理最上边和最下边的两列像素
    for (let j = 1; j < lHeight - 1; j++) {
      for (let i = 0; i < lWidth; i++) {
        const lpSrc = j * lWidth + i;
        for (let k = 0; k < 3; k++) {
          // 如果原图像中当前点自身或者左右如果有一个点不是黑色，则将目标图像中的当前点赋成白色
          for (let n = 0; n < 3; n++) {
            const pixel = (j + n - 1) * lWidth + i;
            data[lpSrc * 4 + k] = 0;
            if (dataInit[pixel * 4] === 255) {
              data[lpSrc * 4 + k] = 255;
              break;
            }
          }
        }
      }
    }
  }
}

/**
 * 说明：
 * 该函数用于对图像进行膨胀运算。
 * 结构元素为水平方向或垂直方向的三个点，中间点位于原点；
 * 或者由用户自己定义3*3的结构元素。
 * 要求目标图像为只有0和255两个灰度值的灰度图像
 * @param data          图像数据
 * @param lWidth        原图像宽度(像素数)
 * @param lHeight       原图像高度(像素数)
 * @param nMode         腐蚀方式，0表示水平方向，1表示垂直方向，2表示自定义结构元素
 * @param structure     自定义的3*3结构元素
 */
function dilationDIB(data: Uint8ClampedArray, lWidth: number, lHeight: number, nMode: number) {
  // 保存原始数据
  const dataInit = [];
  for (let i = 0, len = data.length; i < len; i++) {
    dataInit[i] = data[i];
  }
  if (nMode === 0) {
    // 使用水平方向的结构元素进行腐蚀
    for (let j = 0; j < lHeight; j++) {
      // 由于使用1*3的结构元素，为防止越界，所以不处理最左边和最右边的两列像素
      for (let i = 1; i < lWidth - 1; i++) {
        const lpSrc = j * lWidth + i;
        for (let k = 0; k < 3; k++) {
          // 如果原图像中当前点自身或者左右如果有一个点不是黑色，则将目标图像中的当前点赋成白色
          for (let n = 0; n < 3; n++) {
            const pixel = lpSrc + n - 1;
            data[lpSrc * 4 + k] = 255;
            if (dataInit[pixel * 4 + k] === 0) {
              data[lpSrc * 4 + k] = 0;
              break;
            }
          }
        }
      }
    }
  } else if (nMode === 1) {
    // 使用垂直方向的结构元素进行腐蚀
    // 由于使用1*3的结构元素，为防止越界，所以不处理最上边和最下边的两列像素
    for (let j = 1; j < lHeight - 1; j++) {
      for (let i = 0; i < lWidth; i++) {
        const lpSrc = j * lWidth + i;
        for (let k = 0; k < 3; k++) {
          // 如果原图像中当前点自身或者左右如果有一个点不是黑色，则将目标图像中的当前点赋成白色
          for (let n = 0; n < 3; n++) {
            const pixel = (j + n - 1) * lWidth + i;
            data[lpSrc * 4 + k] = 255;
            if (dataInit[pixel * 4] === 0) {
              data[lpSrc * 4 + k] = 0;
              break;
            }
          }
        }
      }
    }
  }
}
