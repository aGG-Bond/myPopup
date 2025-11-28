class Popup {
  baseMaskStyle = {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, .2)",
    position: "fixed",
    left: 0,
    top: 0,
    zIndex: "9999",
  };
  baseContentBoxStyle = {
    minWidth: "300px",
    backgroundColor: "#fff",
    boxShadow: "0 0 2px #999",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    borderRadius: "10px",
  };
  // 构造函数中定义公共要使用的div
  constructor() {
    this.eventListeners = [];
    this.mask = document.createElement("div");
    this.setStyle(this.mask, this.baseMaskStyle);

    this.contentBox = document.createElement("div");
    this.setStyle(this.contentBox, this.baseContentBoxStyle);

    this.mask.appendChild(this.contentBox);
    this.queue = []; // 弹窗队列
    this.isShowing = false; // 当前是否正在显示弹窗
  }
  showNext() {
    console.log("queue-showNext", this.queue);

    if (this.queue.length > 0 && !this.isShowing) {
      this.isShowing = true;
      const nextPopup = this.queue.shift();
      nextPopup();
    }
  }
  // 中间有弹框的
  middleBox(param) {
    this.contentBox.style.cssText = "";
    // 应用基础样式
    this.setStyle(this.contentBox, this.baseContentBoxStyle);
    this.contentBox.innerHTML = "";

    const {
      title = "默认标题内容",
      content = "弹窗的默认提示信息！",
      isTitleBox = true,
      isCloseSvg = true,
      closeBtnStyle = {},
      btnStyle = {},
      contentStyle = {},
      titleStyle = {},
      closePreview = () => {},
    } = param;

    // 将遮罩放在body中显示
    document.body.appendChild(this.mask);

    // 上面标题部分
    if (isTitleBox) {
      this.titleDiv = this.createStyledElement("div", {
        ...{
          width: "100%",
          height: "50px",
          // borderBottom: '1px solid #ccc',
          lineHeight: "50px",
          paddingLeft: "20px",
          boxSizing: "border-box",
          color: "#666",
          textAlign: "center",
        },
        ...titleStyle,
      });
      this.titleDiv.innerText = title;
      this.contentBox.appendChild(this.titleDiv);

      const svgString = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M6 6L18 18M18 6L6 18" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>`;
      const parser = new DOMParser();
      this.closeBtn = parser.parseFromString(
        svgString,
        "image/svg+xml"
      ).documentElement;
      // this.contentBox.appendChild(svgElement);

      this.setStyle(this.closeBtn, {
        ...{
          position: "absolute",
          right: "0",
          padding: "3vw",
          width: "24px",
          top: 0,
          // background: this.changeColor(color) || '#000'
        },
        ...closeBtnStyle,
      });
      isCloseSvg && this.contentBox.appendChild(this.closeBtn);
      this.addClickListeners([this.closeBtn], () => {
        console.log("closePreview");
        closePreview();
        this.close();
      });
    }

    this.content = this.createStyledElement("div", {
      ...{
        color: "#666",
        padding: "0 20px 20px",
        // lineHeight: '50px'
      },
      ...contentStyle,
    });
    this.content.innerHTML = content;
    this.contentBox.appendChild(this.content);
  }

  // 弹出提示框
  alert(param) {
    const { btnStyle, btns, callbacks = [] } = param;
    const defaultBtnStyle = {
      width: "100%",
      height: "10.677vw",
      lineHeight: "10.677vw",
      outline: "none",
      border: "none",
      color: "#000",
      fontSize: "4.266vw",
      padding: "0 2.4vw",
      borderTop: "1px solid #ccc",
      borderRadius: "0 0 2.4vw 2.4vw",
    };
    this.middleBox(param);
    if (btns.length > 0) {
      btns.map((item, index) => {
        const btnItem = this.createButton(
          item,
          btnStyle?.[index] || defaultBtnStyle
        );
        this.contentBox.appendChild(btnItem);
        this.addClickListeners([btnItem], () => {
          const callback = callbacks?.[index];
          callback && callback();
          this.close();
        });
      });
    }
  }

  // 弹出提示框
  tips(param, cb, color = []) {
    const affirm = cb && typeof cb === "function" ? cb : () => {};
    this.middleBox(param);
    const btn = this.createButton("确定", {
      marginTop: "8vw",
      outline: "none",
      border: "none",
      color: "#fff",
      fontSize: "4.266vw",
      borderRadius: "7.2vw",
      padding: "0 2.667vw",
      width: "40vw",
      height: "11.2vw",
      lineHeight: "11.2vw",
      backgroundColor: this.changeColor(color),
    });
    this.setStyle(this.contentBox, {
      backgroundColor: "#fff",
      fontWeight: "700",
      fontSize: "4.266vw",
      color: "#F23F3F",
      lineHeight: "5.8667vw",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      outline: "none",
      border: "none",
      borderRadius: "2.133vw",
      padding: "10.66vw 2.667vw 8vw",
    });
    // this.setStyle(this.description, { color: '#F23F3F' });
    this.contentBox.appendChild(btn);
    this.addClickListeners([btn], () => {
      affirm();
      this.close();
    });
  }

  // 预览图片框
  showImagePreview({ imgUrl, color, onClose, svgIcon }) {
    const closePreview = onClose || (() => {});
    this.middleBox({ content: "", isTitleBox: false });
    const image = this.createStyledElement("img", {
      maxWidth: "100%",
      maxHeight: "70vh",
    });
    image.src = imgUrl;
    this.contentBox.appendChild(image);

    const svgString =
      svgIcon ||
      `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M6 6L18 18M18 6L6 18" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>`;
    const parser = new DOMParser();
    const svgElement = parser.parseFromString(
      svgString,
      "image/svg+xml"
    ).documentElement;
    // this.contentBox.appendChild(svgElement);

    this.setStyle(svgElement, {
      // position: 'absolute',
      right: "0",
      padding: "3vw",
      width: "24px",
      // background: this.changeColor(color) || '#000'
    });

    this.setStyle(this.contentBox, {
      // width: '100vw',
      maxWidth: "500px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    });
    this.contentBox.appendChild(svgElement);

    this.addClickListeners([svgElement], () => {
      closePreview();
      this.close();
    });
  }
  // 底部弹窗
  showBottomPopup(paramObj) {
    const {
      title,
      content,
      cancelCallbacks = () => {},
      contentBoxStyle = {},
      contentStyle = {},
      titleStyle = {},
      closeBtnStyle = {},
      svgStyle = {},
      btnBoxStyle = "",
      btns = [],
      btnStyle = [],
      addEventListener = () => {},
      callbacks = [() => {}],
    } = paramObj;

    const defaultContentBoxStyle = {
      position: "absolute",
      bottom: 0,
      top: "auto",
      left: 0,
      maxHeight: "80vh",
      transform: "none",
      borderRadius: "10px 10px 0 0",
      width: "100vw",
      maxWidth: "500px",
      flex: 1,
      display: "flex",
      flexDirection: "column",
    };
    const defaultContentStyle = {
      boxSizing: "border-box",
      overflowY: "auto",
      overflowX: "hidden",
      borderRadius: "10px 10px 0 0",
      width: "100%",
      flex: 1,
      padding: "0 5vw, 5vw",
      display: "flex",
      flexDirection: "column",
      fontSize: "4vw",
    };
    const defaultTitleStyle = {
      fontSize: "5vw",
    };
    const defaultCloseBtnStyle = {
      color: "#000",
    };

    this.middleBox({ content, title });

    this.setStyle(this.contentBox, {
      ...defaultContentBoxStyle,
      ...contentBoxStyle,
    });
    this.setStyle(this.content, { ...defaultContentStyle, ...contentStyle });
    this.setStyle(this.titleDiv, { ...defaultTitleStyle, ...titleStyle });
    this.setStyle(this.closeBtn, { ...defaultCloseBtnStyle, closeBtnStyle });

    this.addClickListeners([this.closeBtn], () => {
      cancelCallbacks();
      this.close();
    });
    const defaultBtnBoxStyle = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    };
    const defaultBtnStyle = {
      width: "100%",
      height: "40px",
      lineHeight: "40px",
      outline: "none",
      border: "none",
      color: "#000",
      fontSize: "16px",
      padding: "0 10px",
      borderTop: "1px solid #ccc",
      borderRadius: "0 0 10px 10px",
    };
    if (btns.length > 0) {
      const btnBox = this.createStyledElement(
        "div",
        btnBoxStyle || defaultBtnBoxStyle
      );
      this.contentBox.appendChild(btnBox);
      btns.map((item, index) => {
        const btnItem = this.createButton(
          item,
          btnStyle?.[index] || defaultBtnStyle
        );
        btnBox.appendChild(btnItem);
        this.addClickListeners([btnItem], () => {
          const callback = callbacks?.[index];
          if (callback) {
            callback();
          }
          this.close.bind(this);
        });
      });
    }
    addEventListener();
  }
  changeColor(colorArr) {
    if (!Array.isArray(colorArr) || colorArr.length === 0) return "#fff";
    if (colorArr.length === 1) return colorArr[0];
    return `linear-gradient(${colorArr[0]} 0%, ${colorArr[1]} 100%), ${colorArr[1]}`;
  }

  confirm(info, obj, cb1, cb2) {
    // 调用创建中间小div的函数
    this.middleBox(info);
    // this.middleBox({
    // 	// title: 'Image Preview',
    // 	content: '',
    // 	isTitleBox: false
    // });
    this.setStyle(this.contentBox, {
      backgroundColor: "#fff",
      borderRadius: "8px",
      paddingLeft: "0",
    });

    const defaultBtn = { btn: ["确定", "取消"] };
    const affirm = cb1 && typeof cb1 === "function" ? cb1 : () => {};
    const cancel = cb2 && typeof cb2 === "function" ? cb2 : () => {};

    if (obj && typeof obj === "object") {
      Object.assign(defaultBtn, obj);
    }

    const btnBox = this.createStyledElement("div", {
      padding: "20px",
      display: "flex",
      justifyContent: "flex-end",
    });
    this.contentBox.appendChild(btnBox);

    const confirmBtn = this.createButton(defaultBtn.btn[0], {
      marginLeft: "0",
      background: this.changeColor(obj.color),
    });
    const cancelBtn = this.createButton(defaultBtn.btn[1], {
      marginLeft: "10px",
      outline: "none",
      border: "1px solid #ccc",
      color: "#666",
      background: "transparent",
    });

    btnBox.appendChild(confirmBtn);
    btnBox.appendChild(cancelBtn);

    this.addClickListeners([confirmBtn], () => {
      affirm();
      this.close();
    });
    this.addClickListeners([cancelBtn], () => {
      cancel();
      this.close();
    });
  }

  msg(str, param) {
    console.log("queue-msg", this.queue);
    this.queue.push(() => {
      this.contentBox.innerHTML = "";
      let content = "默认提示内容";
      let options = { time: 1000 };

      if (typeof str === "string") {
        content = str;
      }
      if (param && typeof param === "object") {
        Object.assign(options, param);
      }

      // 将遮罩放在body中显示
      document.body.appendChild(this.mask);
      // 给遮罩中间的div设置样式
      this.setStyle(this.contentBox, {
        width: "auto",
        backgroundColor: "rgb(255, 255, 255)",
        boxShadow: "0 0 2px #999",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
        borderRadius: "3px",
        padding: "0 30px 0",
        color: "#666",
      });

      const icon = this.createStyledElement("span");

      const text = this.createStyledElement("p", {});

      if (options.icon === 1) {
        icon.innerText = "√";
        this.setStyle(icon, {
          border: "3px solid rgb(56, 201, 177)",
          color: "rgb(56, 201, 177)",
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          display: "inline-block",
          lineHeight: "30px",
          textAlign: "center",
          margin: "0 10px",
          fontSize: "20px",
          fontWeight: "bold",
        });
      } else if (options.icon === 0) {
        // 给icon设置内容和样式
        icon.innerText = "×";
        this.setStyle(icon, {
          width: "30px",
          height: "30px",
          border: "3px solid rgb(233, 91, 76)",
          color: "rgb(233, 91, 76)",
          borderRadius: "50%",
          display: "inline-block",
          lineHeight: "30px",
          textAlign: "center",
          margin: "0 10px",
          fontSize: "20px",
          fontWeight: "bold",
        });
      } else {
        icon.innerText = "";
        this.setStyle(this.contentBox, {
          width: "auto",
          height: "auto",
          maxWidth: "90vw",
          minWidth: "280px",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          boxShadow: "0 0 2px #999",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "3px",
          padding: "10px 30px",
          color: "#fff",
          wordWrap: "break-word",
          textAlign: "center",
        });
      }

      this.contentBox.appendChild(icon);
      this.contentBox.appendChild(text);
      // 给中间小div放入内容
      // this.contentBox.innerHTML += content;
      text.innerHTML = content;

      // 延迟一会自动消失
      console.log("msgTime", options.time, content);

      // clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.close(options.time, `msg:${str}`);
        // clearTimeout(this.timer);
      }, options.time);
    });
    if (!this.isShowing) {
      this.showNext();
    }
  }

  load = (paramObj = {}) => {
    /**
     *  @param {Object} paramObj load 参数;
     *  @param {width} paramObj.width loading SVG 宽度;
     *  @param {height} paramObj.height loading SVG 高度;
     *  @param {color} paramObj.color loading SVG 颜色;
     *  @param {size} width,height 尺寸大小取最大值;
     *
     */
    console.log("queue-load", this.queue);

    this.queue.push(() => {
      this.contentBox.innerHTML = "";
      // 将遮罩放到body中显示
      document.body.appendChild(this.mask);
      // 给中间的小div设置样式
      this.setStyle(this.contentBox, {
        border: "none",
        boxShadow: "0 0 0 transparent",
        backgroundColor: "transparent",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        zIndex: "9999",
      });
      let styleObj = {
        width: 100,
        height: 100,
        color: "#201c1d",
      };
      styleObj = { ...styleObj, ...paramObj };
      const size =
        styleObj.width - styleObj.height > 0 ? styleObj.width : styleObj.height;
      const { color } = styleObj;
      const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"  preserveAspectRatio="xMidYMid" width="${size}" height="${size}" style="shape-rendering: auto; display: block;">
      <g data-idx="1">
        <rect fill="${color}" height="12" width="6" ry="6" rx="3" y="24" x="47" data-idx="3" opacity="0" >
          <animate attributeName="opacity" values="1;0;" dur="1.1s" begin="0s" repeatCount="indefinite" />
        </rect>
      </g>
      <g transform="matrix(0.8660254037844387,0.49999999999999994,-0.49999999999999994,0.8660254037844387,31.698729810778058,-18.30127018922194)" data-idx="5">
        <rect fill="${color}" height="12" width="6" ry="6" rx="3" y="24" x="47" data-idx="6" opacity="0">
          <animate attributeName="opacity" values="1;0;" dur="1.1s" begin="0.1s" repeatCount="indefinite" />
        </rect>
      </g>
      <g transform="matrix(0.5000000000000001,0.8660254037844386,-0.8660254037844386,0.5000000000000001,68.30127018922192,-18.30127018922194)" data-idx="8">
        <rect fill="${color}" height="12" width="6" ry="6" rx="3" y="24" x="47" data-idx="9" opacity="0">
          <animate attributeName="opacity" values="1;0;" dur="1.1s" begin="0.2s" repeatCount="indefinite" />
        </rect>
      </g>
      <g transform="matrix(6.123233995736766e-17,1,-1,6.123233995736766e-17,100,0)" data-idx="11">
        <rect fill="${color}" height="12" width="6" ry="6" rx="3" y="24" x="47" data-idx="12" opacity="0">
          <animate attributeName="opacity" values="1;0;" dur="1.1s" begin="0.3s" repeatCount="indefinite" />
        </rect>
      </g>
      <g transform="matrix(-0.4999999999999998,0.8660254037844387,-0.8660254037844387,-0.4999999999999998,118.30127018922192,31.69872981077805)" data-idx="14">
        <rect fill="${color}" height="12" width="6" ry="6" rx="3" y="24" x="47" data-idx="15" opacity="0">
          <animate attributeName="opacity" values="1;0;" dur="1.1s" begin="0.4s" repeatCount="indefinite" />
        </rect>
      </g>
      <g transform="matrix(-0.8660254037844387,0.49999999999999994,-0.49999999999999994,-0.8660254037844387,118.30127018922194,68.30127018922194)" data-idx="17">
        <rect fill="${color}" height="12" width="6" ry="6" rx="3" y="24" x="47" data-idx="18" opacity="0">
          <animate attributeName="opacity" values="1;0;" dur="1.1s" begin="0.5s" repeatCount="indefinite" />
        </rect>
      </g>
      <g transform="matrix(-1,1.2246467991473532e-16,-1.2246467991473532e-16,-1,100,100)" data-idx="20">
        <rect fill="${color}" height="12" width="6" ry="6" rx="3" y="24" x="47" data-idx="21" opacity="0">
          <animate attributeName="opacity" values="1;0;" dur="1.1s" begin="0.6s" repeatCount="indefinite" />
        </rect>
      </g>
      <g transform="matrix(-0.8660254037844386,-0.5000000000000001,0.5000000000000001,-0.8660254037844386,68.30127018922192,118.30127018922194)" data-idx="23">
        <rect fill="${color}" height="12" width="6" ry="6" rx="3" y="24" x="47" data-idx="24" opacity="0">
          <animate attributeName="opacity" values="1;0;" dur="1.1s" begin="0.7s" repeatCount="indefinite" />
        </rect>
      </g>
      <g transform="matrix(-0.5000000000000004,-0.8660254037844385,0.8660254037844385,-0.5000000000000004,31.698729810778097,118.30127018922195)" data-idx="26">
        <rect fill="${color}" height="12" width="6" ry="6" rx="3" y="24" x="47" data-idx="27" opacity="0">
          <animate attributeName="opacity" values="1;0;" dur="1.1s" begin="0.8s" repeatCount="indefinite" />
        </rect>
      </g>
      <g transform="matrix(-1.8369701987210297e-16,-1,1,-1.8369701987210297e-16,7.105427357601002e-15,100)" data-idx="29">
        <rect fill="${color}" height="12" width="6" ry="6" rx="3" y="24" x="47" data-idx="30" opacity="0">
          <animate attributeName="opacity" values="1;0;" dur="1.1s" begin="0.9s" repeatCount="indefinite" />
        </rect>
      </g>
      <g transform="matrix(0.5000000000000001,-0.8660254037844386,0.8660254037844386,0.5000000000000001,-18.30127018922194,68.30127018922192)" data-idx="32">
        <rect fill="${color}" height="12" width="6" ry="6" rx="3" y="24" x="47" data-idx="33" opacity="0">
          <animate attributeName="opacity" values="1;0;" dur="1.1s" begin="1.0s" repeatCount="indefinite"/>
        </rect>
      </g>
      <g transform="matrix(0.8660254037844384,-0.5000000000000004,0.5000000000000004,0.8660254037844384,-18.30127018922194,31.698729810778104)" data-idx="35">
        <rect fill="${color}" height="12" width="6" ry="6" rx="3" y="24" x="47" data-idx="36" opacity="0">
          <animate attributeName="opacity" values="1;0;" dur="1.1s" begin="1.1s" repeatCount="indefinite" />
        </rect>
      </g>
      <g data-idx="38"></g>
    </svg>`;
      const parser = new DOMParser();
      const svgElement = parser.parseFromString(
        svgString,
        "image/svg+xml"
      ).documentElement;
      this.contentBox.appendChild(svgElement);
    });
    // 如果没有正在显示的弹窗，立即显示
    if (!this.isShowing) {
      this.showNext();
    }
  };

  close(form = "") {
    console.log("close", form);
    if (this.mask.parentElement) {
      document.body.removeChild(this.mask);
      this.contentBox.innerHTML = "";
    }
    // 关闭后显示下一个弹窗
    this.isShowing = false;
    this.showNext();

    this.removeEventListeners();
  }

  debounce(func, delay, immediate) {
    let timeoutId;
    return function (...args) {
      const context = this;
      const later = () => {
        timeoutId = null;
        if (!immediate) {
          func.apply(context, args);
        }
      };
      const callNow = immediate && !timeoutId;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(later, delay);
      if (callNow) {
        func.apply(context, args);
      }
    };
  }

  // 设置样式的函数
  setStyle(ele, styleObj) {
    Object.assign(ele.style, styleObj);
  }

  createStyledElement(tag, styleObj) {
    const ele = document.createElement(tag);
    this.setStyle(ele, styleObj);
    return ele;
  }

  createButton(text, additionalStyles = {}) {
    const btn = this.createStyledElement("button", {
      backgroundColor: "#fff",
      outline: "none",
      border: "none",
      color: "#fff",
      fontSize: "16px",
      borderRadius: "2px",
      padding: "0 15px",
      height: "30px",
      lineHeight: "30px",
      ...additionalStyles,
    });
    btn.innerText = text;
    return btn;
  }

  addClickListeners(elements, callback) {
    elements.forEach((element) => {
      const listener = element.addEventListener("click", callback);
      this.eventListeners.push({ element, callback });
    });
  }

  removeEventListeners() {
    this.eventListeners.forEach(({ element, callback }) => {
      element.removeEventListener("click", callback);
    });
    this.eventListeners = []; // 清空事件监听器列表
  }
}
export default Popup;
