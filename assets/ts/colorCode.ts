// 配置支持的颜色格式正则
const COLOR_PATTERNS = {
	hex: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
	rgb: /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
	rgba: /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([\d.]+)\s*\)$/,
};

// 初始化函数
function initColorCode() {
	document.querySelectorAll("code").forEach((code) => {
		const text = code.textContent || "";

		// 检查是否是颜色代码
		if (isColorCode(text)) {
			code.classList.add("color-code");
			code.setAttribute("data-color", text);

			// 创建一个box并设置颜色
			const colorBox = document.createElement("span");
			colorBox.classList.add("color-box");
			colorBox.style.backgroundColor = text;
			code.insertBefore(colorBox, code.firstChild);

			// 点击复制颜色代码
			code.addEventListener("click", () => {
				navigator.clipboard.writeText(text).then(() => {
					code.classList.add("copied");
					setTimeout(() => {
						code.classList.remove("copied");
					}, 1000);
				});
			});
		}
	});
}

// 判断是否是支持的颜色格式
function isColorCode(text: string): boolean {
	return Object.values(COLOR_PATTERNS).some((pattern) =>
		pattern.test(text.trim())
	);
}

// 在页面加载完成后执行初始化
document.addEventListener("DOMContentLoaded", initColorCode);
